// Copyright (c) 2026, Frappe Technologies and contributors
// License: MIT. See LICENSE

frappe.ui.form.on('Site Domain', {
	refresh: function(frm) {
		// Add Cloudflare Settings menu when Cloudflare is selected
		if (frm.doc.dns_provider === 'Cloudflare') {
			// Add Test Connection button
			if (!frm.custom_buttons['Hi Cloudflare']) {
				frm.add_custom_button(__('Hi Cloudflare'), function() {
					frm.events.test_cloudflare_connection(frm);
				}, __('Cloudflare Settings'));
			}

			// Add Sync from Cloudflare button if API token is provided
			if (frm.doc.cloudflare_api_token && !frm.custom_buttons['Fetch DNS Entry']) {
				frm.add_custom_button(__('Fetch DNS Entry'), function() {
					frm.events.sync_cloudflare_dns_records(frm);
				}, __('Cloudflare Settings'));
			}

			// Add Sync Selected Record button if API token is provided
			if (frm.doc.cloudflare_api_token && !frm.custom_buttons['New DNS Entry']) {
				frm.add_custom_button(__('New DNS Entry'), function() {
					frm.events.sync_selected_dns_record(frm);
				}, __('Cloudflare Settings'));
			}

			// Add Delete Selected Record button if API token is provided
			if (frm.doc.cloudflare_api_token && !frm.custom_buttons['Delete DNS Entry']) {
				frm.add_custom_button(__('Delete DNS Entry'), function() {
					frm.events.delete_selected_dns_record(frm);
				}, __('Cloudflare Settings'));
			}
		}
	},

	verification_method: function(frm) {
		// Auto-trigger verification when verification_method is changed
		if (frm.doc.verification_method && frm.doc.domain_name && !frm.doc.verified) {
			frappe.msgprint(__('Verifying domain ownership...'));
			frm.events.verify_domain(frm);
		}
	},

	dns_provider: function(frm) {
		// Refresh form to show/hide Cloudflare fields
		frm.refresh_fields();

		// Clear Cloudflare credentials if not Cloudflare
		if (frm.doc.dns_provider !== 'Cloudflare') {
			frm.set_value('cloudflare_api_token', '');
			frm.set_value('cloudflare_zone_id', '');
		}
	},

	cloudflare_api_token: function(frm) {
		// Refresh form to show/hide Sync button
		frm.refresh_fields();
	},
	
	verify_domain: function(frm) {
		frappe.call({
			method: 'verify_domain_ownership',
			doc: frm.doc,
			args: {
				verification_method: frm.doc.verification_method
			},
			callback: function(r) {
				if (r.message) {
					frappe.msgprint({
						title: __('Success'),
						message: r.message.message,
						indicator: 'green'
					});
					frm.reload_doc();
				}
			},
			error: function(r) {
				frappe.msgprint({
					title: __('Error'),
					message: r.message || __('Verification failed'),
					indicator: 'red'
				});
			}
		});
	},

	test_cloudflare_connection: function(frm) {
		frappe.call({
			method: 'test_cloudflare_connection',
			doc: frm.doc,
			callback: function(r) {
				if (r.message) {
					frappe.msgprint({
						title: __('Cloudflare Connection'),
						message: r.message.message,
						indicator: 'green'
					});
				}
			},
			error: function(r) {
				frappe.msgprint({
					title: __('Connection Failed'),
					message: r.message || __('Failed to connect to Cloudflare'),
					indicator: 'red'
				});
			}
		});
	},

	sync_cloudflare_dns_records: function(frm) {
		frappe.confirm(
			__('This will fetch all DNS records from Cloudflare and replace existing records. Continue?'),
			function() {
				frappe.call({
					method: 'sync_cloudflare_dns_records',
					doc: frm.doc,
					callback: function(r) {
						if (r.message) {
							frappe.msgprint({
								title: __('DNS Sync'),
								message: r.message.message,
								indicator: 'green'
							});
							frm.reload_doc();
						}
					},
					error: function(r) {
						frappe.msgprint({
							title: __('Sync Failed'),
							message: r.message || __('Failed to sync DNS records'),
							indicator: 'red'
						});
					}
				});
			}
		);
	},

	delete_selected_dns_record: function(frm) {
		// Get selected row from DNS records child table
		if (!frm.fields_dict['dns_records'] || !frm.fields_dict['dns_records'].grid) {
			frappe.msgprint(__('DNS records table not found'));
			return;
		}

		const grid = frm.fields_dict['dns_records'].grid;
		
		// Get selected rows
		const selected_rows = grid.get_selected();
		if (!selected_rows || selected_rows.length === 0) {
			frappe.msgprint(__('Please select a DNS record to delete'));
			return;
		}

		// Get the row data from the grid's data array
		const row_name = selected_rows[0];
		const row_doc = grid.data.find(row => row.name === row_name);
		
		if (!row_doc || !row_doc.dns_name) {
			frappe.msgprint(__('Invalid DNS record selected'));
			return;
		}

		frappe.confirm(
			__('Do you want to delete this DNS record from Cloudflare as well?'),
			function() {
				// User wants to delete from Cloudflare as well
				frappe.call({
					method: 'delete_dns_record_from_cloudflare',
					doc: frm.doc,
					args: {
						dns_record_name: row_doc.dns_name,
						record_type: row_doc.record_type
					},
					callback: function(r) {
						if (r.message && r.message.success) {
							frappe.msgprint(r.message.message);
							// Now delete from local table by removing the row
							const grid_row = grid.grid_rows_by_docname[row_doc.name];
							if (grid_row) {
								grid_row.remove();
								delete grid.grid_rows_by_docname[row_doc.name];
								grid.data = grid.data.filter(d => d.name !== row_doc.name);
								grid.refresh();
							}
						}
					},
					error: function(r) {
						frappe.msgprint({
							title: __('Cloudflare Delete Failed'),
							message: r.message || __('Failed to delete DNS record from Cloudflare'),
							indicator: 'red'
						});
						// Still delete locally even if Cloudflare delete failed
						const grid_row = grid.grid_rows_by_docname[row_doc.name];
						if (grid_row) {
							grid_row.remove();
							delete grid.grid_rows_by_docname[row_doc.name];
							grid.data = grid.data.filter(d => d.name !== row_doc.name);
							grid.refresh();
						}
					}
				});
			},
			function() {
				// User cancelled, only delete locally
				const grid_row = grid.grid_rows_by_docname[row_doc.name];
				if (grid_row) {
					grid_row.remove();
					delete grid.grid_rows_by_docname[row_doc.name];
					grid.data = grid.data.filter(d => d.name !== row_doc.name);
					grid.refresh();
				}
			}
		);
	},

	sync_selected_dns_record: function(frm) {
		// Get selected row from DNS records child table
		if (!frm.fields_dict['dns_records'] || !frm.fields_dict['dns_records'].grid) {
			frappe.msgprint(__('DNS records table not found'));
			return;
		}

		const grid = frm.fields_dict['dns_records'].grid;
		
		// Get selected rows
		const selected_rows = grid.get_selected();
		if (!selected_rows || selected_rows.length === 0) {
			frappe.msgprint(__('Please select a DNS record to sync'));
			return;
		}

		// Get the row data from the grid's data array
		const row_name = selected_rows[0];
		const row_doc = grid.data.find(row => row.name === row_name);
		
		console.log('Selected row name:', row_name);
		console.log('Grid data:', grid.data);
		
		if (!row_doc || !row_doc.dns_name) {
			frappe.msgprint(__('Invalid DNS record selected - no dns_name found'));
			return;
		}

		frappe.confirm(
			__('This will sync the selected DNS record to Cloudflare. Continue?'),
			function() {
				frappe.call({
					method: 'sync_single_dns_record_to_cloudflare',
					doc: frm.doc,
					args: {
						dns_record_name: row_doc.dns_name
					},
					callback: function(r) {
						if (r.message) {
							frappe.msgprint({
								title: __('DNS Record Sync'),
								message: r.message.message,
								indicator: 'green'
							});
						}
					},
					error: function(r) {
						frappe.msgprint({
							title: __('Sync Failed'),
							message: r.message || __('Failed to sync DNS record to Cloudflare'),
							indicator: 'red'
						});
					}
				});
			}
		);
	},

	sync_to_cloudflare: function(frm) {
		frappe.confirm(
			__('This will sync your local DNS records to Cloudflare. Records in Cloudflare that are not in the local table will be deleted. Continue?'),
			function() {
				frappe.call({
					method: 'sync_to_cloudflare',
					doc: frm.doc,
					callback: function(r) {
						if (r.message) {
							frappe.msgprint({
								title: __('Cloudflare Sync'),
								message: r.message.message,
								indicator: 'green'
							});
						}
					},
					error: function(r) {
						frappe.msgprint({
							title: __('Sync Failed'),
							message: r.message || __('Failed to sync to Cloudflare'),
							indicator: 'red'
						});
					}
				});
			}
		);
	},

	install_ssl: function(frm) {
		frappe.confirm(
			__('This will install an SSL certificate for your domain using Let\'s Encrypt. Make sure your domain is pointing to this server. Continue?'),
			function() {
				frappe.call({
					method: 'install_ssl_certificate',
					doc: frm.doc,
					callback: function(r) {
						if (r.message) {
							frappe.msgprint({
								title: __('SSL Installation'),
								message: r.message.message,
								indicator: 'green'
							});
							frm.reload_doc();
						}
					},
					error: function(r) {
						frappe.msgprint({
							title: __('Error'),
							message: r.message || __('SSL installation failed'),
							indicator: 'red'
						});
					}
				});
			}
		);
	}
});

// Client script for domain validation in Site form
frappe.ui.form.on('Site', {
	site_domain: function(frm) {
		if (frm.doc.site_domain) {
			// Get domain details
			frappe.call({
				method: 'frappe.get_doc',
				args: {
					doctype: 'Site Domain',
					name: frm.doc.site_domain
				},
				callback: function(r) {
					if (r.message) {
						const domain = r.message;
						frm.dashboard.set_message(
							`Domain: ${domain.domain_name} | Status: ${domain.status} | Sites: ${domain.current_sites}/${domain.max_sites}`
						);
					}
				}
			});
		}
	},
	
	subdomain: function(frm) {
		// Auto-generate full domain
		if (frm.doc.site_domain && frm.doc.subdomain) {
			frappe.call({
				method: 'frappe.get_doc',
				args: {
					doctype: 'Site Domain',
					name: frm.doc.site_domain
				},
				callback: function(r) {
					if (r.message) {
						const domain = r.message.domain_name;
						frm.set_value('full_domain', `${frm.doc.subdomain}.${domain}`);
					}
				}
			});
		}
	}
});
