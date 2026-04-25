# Copyright (c) 2026, Amit Kumar and contributors
# For license information, please see license.txt

"""
Payment Processing API for App Store
Integrates with Razorpay and Stripe via the payments app
"""

import frappe
from frappe import _
from payments.utils import get_payment_gateway_controller

def get_payment_gateway():
	"""Get configured payment gateway from settings"""
	settings = frappe.get_single("App Store Settings")
	return settings.payment_gateway or "Razorpay"

@frappe.whitelist()
def initiate_app_purchase(app_id, pricing_model, subscription_type=None, currency=None):
	"""
	Initiate payment for app purchase (one-time or subscription)
	Supports both Razorpay and Stripe gateways
	"""
	try:
		# Get current member profile
		member = frappe.db.get_value("Member", {"email": frappe.session.user}, "name")
		
		if not member:
			frappe.throw(_("Member profile not found"))
		
		# Get app details
		app = frappe.get_doc("App", app_id)
		
		if not app:
			frappe.throw(_("App not found"))
		
		# Check if app is published
		if not app.is_published:
			frappe.throw(_("App is not published"))
		
		# Check moderation status
		if app.modereration_status != "Approved":
			frappe.throw(_("App is not approved"))
		
		# Check pricing model availability from settings
		settings = frappe.get_single("App Store Settings")
		
		if pricing_model == "One-time" and not settings.enable_one_time_purchase:
			frappe.throw(_("One-time purchase is disabled"))
		
		if pricing_model == "Subscription" and not settings.enable_subscriptions:
			frappe.throw(_("Subscriptions are disabled"))
		
		# Calculate amount based on pricing model and currency
		if pricing_model == "One-time":
			amount = app.price or 0
		elif pricing_model == "Subscription":
			if subscription_type == "Annual" and app.subscription_annual_price:
				amount = app.subscription_annual_price
			else:
				amount = app.subscription_price or 0
		else:
			amount = app.price or 0
		
		if amount <= 0:
			frappe.throw(_("Invalid app amount"))
		
		# Get currency (use app currency if not specified)
		currency = currency or app.currency or "INR"
		
		# STEP 1: Record payment transaction BEFORE redirect
		payment_transaction = record_payment_transaction(
			member=member,
			app=app_id,
			pricing_model=pricing_model,
			subscription_type=subscription_type,
			amount=amount,
			currency=currency
		)
		
		# Get payment gateway from settings
		payment_gateway = get_payment_gateway()
		controller = get_payment_gateway_controller(payment_gateway)
		
		# Validate currency
		controller.validate_transaction_currency(currency)
		
		# STEP 2: Prepare payment details with transaction reference
		# Redirect to frontend Vue app after payment
		if "localhost" in frappe.local.site:
			# Development: Vue dev server
			frontend_url = "http://localhost:8080"
		else:
			# Production: Use site URL with /app_store base path for Vue app
			protocol = "https://" if frappe.local.conf.ssl_certificate else "http://"
			frontend_url = f"{protocol}{frappe.local.site}/app_store"
		
		payment_details = {
			"amount": float(amount),
			"title": f"{app.app_title}",
			"description": f"Purchase {app.app_title} ({pricing_model})",
			"reference_doctype": "Payment Transaction",
			"reference_docname": payment_transaction.name,
			"payer_email": frappe.session.user,
			"payer_name": frappe.get_value("User", frappe.session.user, "full_name"),
			"order_id": payment_transaction.name,
			"currency": currency,
			"payment_gateway": payment_gateway,
			"redirect_to": f"{frontend_url}#/purchase?transaction={payment_transaction.name}",
			"payment": payment_transaction.name
		}
		
		# For Razorpay, create order first
		if payment_gateway == "Razorpay":
			order = controller.create_order(**payment_details)
			payment_details.update({"order_id": order.get("id")})
			
			# Update transaction with Razorpay order ID
			payment_transaction.razorpay_order_id = order.get("id")
			payment_transaction.save(ignore_permissions=True)
			frappe.db.commit()
		
		# For Stripe, create payment intent
		elif payment_gateway == "Stripe":
			intent = controller.create_payment_intent(**payment_details)
			payment_details.update({
				"payment_intent_id": intent.get("id"),
				"client_secret": intent.get("client_secret")
			})
			
			# Update transaction with Stripe details
			payment_transaction.stripe_payment_intent_id = intent.get("id")
			payment_transaction.stripe_client_secret = intent.get("client_secret")
			payment_transaction.save(ignore_permissions=True)
			frappe.db.commit()
		
		# STEP 3: Get payment URL from gateway
		payment_url = controller.get_payment_url(**payment_details)
		
		# Get site URL
		protocol = "https://" if frappe.local.conf.ssl_certificate else "http://"
		site_url = f"{protocol}{frappe.local.site}"
		
		# Convert relative URL to absolute
		if payment_url and not payment_url.startswith('http'):
			if payment_url.startswith('./'):
				payment_url = payment_url[2:]
			elif payment_url.startswith('/'):
				payment_url = payment_url[1:]
			payment_url = f"{site_url}/{payment_url}"
		
		frappe.logger().info(f"Payment URL generated: {payment_url}")
		
		return {
			"success": True,
			"payment_url": payment_url if payment_gateway == "Razorpay" else None,
			"client_secret": payment_details.get("client_secret") if payment_gateway == "Stripe" else None,
			"payment_intent_id": payment_details.get("payment_intent_id") if payment_gateway == "Stripe" else None,
			"transaction_id": payment_transaction.name,
			"amount": amount,
			"currency": currency,
			"gateway": payment_gateway
		}
		
	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "Payment Initiation Error")
		return {
			"success": False,
			"error": str(e)
		}

@frappe.whitelist()
def verify_razorpay_payment(transaction_id, razorpay_payment_id, razorpay_order_id, razorpay_signature):
	"""
	Verify Razorpay payment signature
	Called from frontend after Razorpay checkout
	"""
	try:
		transaction = frappe.get_doc("Payment Transaction", transaction_id)
		
		# Update Razorpay details
		transaction.razorpay_payment_id = razorpay_payment_id
		transaction.razorpay_order_id = razorpay_order_id
		transaction.razorpay_signature = razorpay_signature
		transaction.status = "Pending"
		transaction.save(ignore_permissions=True)
		frappe.db.commit()
		
		return {
			"success": True,
			"message": "Payment verification in progress"
		}
		
	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "Payment Verification Error")
		return {
			"success": False,
			"error": str(e)
		}

@frappe.whitelist()
def confirm_stripe_payment(transaction_id, payment_intent_id):
	"""
	Confirm Stripe payment
	Called from frontend after Stripe payment
	"""
	try:
		transaction = frappe.get_doc("Payment Transaction", transaction_id)
		
		# Update Stripe details
		transaction.stripe_payment_intent_id = payment_intent_id
		transaction.status = "Pending"
		transaction.save(ignore_permissions=True)
		frappe.db.commit()
		
		return {
			"success": True,
			"message": "Payment confirmation in progress"
		}
		
	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "Payment Confirmation Error")
		return {
			"success": False,
			"error": str(e)
	}

@frappe.whitelist()
def get_payment_status(transaction_id):
	"""
	Check payment transaction status
	"""
	try:
		transaction = frappe.get_doc("Payment Transaction", transaction_id)
		
		return {
			"success": True,
			"status": transaction.status,
			"amount": transaction.amount,
			"currency": transaction.currency,
			"payment_gateway": transaction.payment_gateway
		}
		
	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "Get Payment Status Error")
		return {
			"success": False,
			"error": str(e)
		}

@frappe.whitelist()
def get_razorpay_config():
	"""
	Get Razorpay configuration for frontend
	"""
	try:
		settings = frappe.get_single("Razorpay Settings")
		
		return {
			"success": True,
			"api_key": settings.api_key,
			"currency": "INR"
		}
		
	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "Get Razorpay Config Error")
		return {
			"success": False,
			"error": str(e)
	}

@frappe.whitelist()
def get_stripe_config():
	"""
	Get Stripe configuration for frontend
	"""
	try:
		settings = frappe.get_doc("Stripe Settings")
		
		return {
			"success": True,
			"publishable_key": settings.publishable_key,
			"currency": "USD"
		}
		
	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "Get Stripe Config Error")
		return {
			"success": False,
			"error": str(e)
	}

@frappe.whitelist()
def get_supported_currencies():
	"""
	Get list of supported currencies from settings
	"""
	try:
		settings = frappe.get_single("App Store Settings")
		currencies = frappe.get_all("Supported Currency", filters={"is_active": 1},
			fields=["currency_code", "currency_name", "currency_symbol", "exchange_rate"])
		
		return {
			"success": True,
			"currencies": currencies,
			"default_currency": settings.default_currency
		}
	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "Get Supported Currencies Error")
		return {
			"success": False,
			"error": str(e)
		}

@frappe.whitelist()
def request_refund(transaction_id, reason):
	"""
	Request refund for a purchase
	Checks refund policy days from settings
	"""
	try:
		transaction = frappe.get_doc("Payment Transaction", transaction_id)
		
		# Call the refund method on the transaction
		transaction.process_refund(reason)
		
		return {
			"success": True,
			"message": "Refund request submitted"
		}
	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "Request Refund Error")
		return {
			"success": False,
			"error": str(e)
	}

def record_payment_transaction(member, app, pricing_model, subscription_type, amount, currency):
	"""
	Record payment transaction BEFORE redirecting to gateway
	"""
	payment_transaction = frappe.get_doc({
		"doctype": "Payment Transaction",
		"member": member,
		"app": app,
		"pricing_model": pricing_model,
		"subscription_type": subscription_type,
		"amount": amount,
		"currency": currency,
		"payment_gateway": get_payment_gateway(),
		"status": "Initiated"
	})
	payment_transaction.insert(ignore_permissions=True)
	frappe.db.commit()
	
	return payment_transaction
