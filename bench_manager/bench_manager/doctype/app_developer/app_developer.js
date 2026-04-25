// Copyright (c) 2026, Amit Kumar and contributors
// For license information, please see license.txt

frappe.ui.form.on('App Developer', {
	refresh: function(frm) {
		// Add custom refresh logic if needed
	},
	
	user: function(frm) {
		// Auto-populate email and developer_name when user is selected
		if (frm.doc.user) {
			frappe.call({
				method: 'frappe.client.get_value',
				args: {
					doctype: 'User',
					name: frm.doc.user,
					fieldname: ['email', 'full_name']
				},
				callback: function(r) {
					if (r.message) {
						frm.set_value('email', r.message.email);
						// Use full_name if available, otherwise generate from email
						if (r.message.full_name) {
							frm.set_value('developer_name', r.message.full_name);
						} else {
							// Generate from email username part
							let email_username = r.message.email.split('@')[0];
							let generated_name = email_username.replace(/\./g, ' ').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
							frm.set_value('developer_name', generated_name);
						}
					}
				}
			});
		}
	},
	
	payment_method: function(frm) {
		// Show/hide payment fields based on selection
		const payment_method = frm.doc.payment_method;
		
		frm.toggle_display(['paypal_email'], payment_method === 'PayPal');
		frm.toggle_display(['stripe_account_id'], payment_method === 'Stripe');
		frm.toggle_display(['bank_account_number', 'bank_ifsc', 'bank_account_name'], payment_method === 'Bank Transfer');
	}
});
