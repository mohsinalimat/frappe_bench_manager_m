# Copyright (c) 2026, Amit Kumar and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class AppDeveloper(Document):
	def validate(self):
		self.validate_email()
		self.populate_from_user()
	
	def populate_from_user(self):
		"""Auto-populate email and developer_name from linked user"""
		if self.user:
			user_data = frappe.db.get_value("User", self.user, ["email", "full_name"])
			if user_data:
				email, full_name = user_data
				self.email = email
				# Use full_name if available, otherwise generate from email
				if full_name:
					self.developer_name = full_name
				else:
					# Generate from email username part
					email_username = email.split('@')[0]
					self.developer_name = email_username.replace('.', ' ').replace('_', ' ').title()
	
	def validate_email(self):
		if self.email:
			# Check if email is unique
			existing = frappe.db.exists("App Developer", {"email": self.email})
			if existing and existing != self.name:
				frappe.throw(f"Email {self.email} already registered by another developer")
	
	def before_save(self):
		if self.is_verified and not self.verification_date:
			self.verification_date = frappe.utils.today()
	
	def on_update(self):
		self.update_statistics()
	
	def update_statistics(self):
		"""Update total apps and downloads"""
		# Count total apps
		total_apps = frappe.db.count("App", {
			"developer": self.name,
			"is_published": 1,
			"moderation_status": "Approved"
		})
		self.db_set("total_apps", total_apps, update_modified=False)

		# Sum total downloads
		total_downloads = frappe.db.get_value("App", {
			"developer": self.name,
			"is_published": 1,
			"moderation_status": "Approved"
		}, "sum(total_downloads)") or 0
		self.db_set("total_downloads", total_downloads, update_modified=False)
	
	def on_trash(self):
		# Prevent deletion if developer has published apps
		app_count = frappe.db.count("App", {"developer": self.name})
		if app_count > 0:
			frappe.throw(f"Cannot delete developer with {app_count} published apps. Please delete or transfer apps first.")
