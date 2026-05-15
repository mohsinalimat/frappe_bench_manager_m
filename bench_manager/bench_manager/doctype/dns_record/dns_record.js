// Copyright (c) 2026, Frappe Technologies and contributors
// License: MIT. See LICENSE

frappe.ui.form.on('DNS Record', {
	record_type: function(frm) {
		// Show/hide priority field based on record type
		frm.refresh_fields('priority');
	}
});
