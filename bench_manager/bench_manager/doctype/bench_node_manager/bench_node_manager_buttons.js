// Grouped button additions for Bench Settings
// Add these buttons in the refresh function

// === BENCH OPERATIONS GROUP ===
frm.add_custom_button(__('Restart Bench'), function() {
	frappe.confirm(
		__('This will restart all bench services (web, workers, scheduler). Continue?'),
		() => {
			let key = frappe.datetime.get_datetime_as_string();
			console_dialog(key);
			frm.call('console_command', {
				key: key,
				caller: 'bench_restart'
			});
		}
	);
}, __('Bench Operations'));

frm.add_custom_button(__('Update Bench'), function() {
	frappe.confirm(
		__('This will update all apps and may take several minutes. Continue?'),
		() => {
			let key = frappe.datetime.get_datetime_as_string();
			console_dialog(key);
			frm.call('console_command', {
				key: key,
				caller: 'bench_update'
			});
		}
	);
}, __('Bench Operations'));

frm.add_custom_button(__('Clear Cache'), function() {
	frappe.call({
		method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.get_local_sites',
		freeze: true,
		freeze_message: __('Fetching sites...'),
		callback: function(r) {
			if (r.message && r.message.success && r.message.sites && r.message.sites.length > 0) {
				const dialog = new frappe.ui.Dialog({
					title: __('Select Site to Clear Cache'),
					fields: [
						{
							fieldname: 'site',
							label: __('Site'),
							fieldtype: 'Select',
							options: r.message.sites,
							reqd: 1
						}
					],
					primary_action_label: __('Clear Cache'),
					primary_action: function() {
						const site = dialog.fields_dict.site.value;
						dialog.hide();

						frappe.confirm(
							__('This will clear cache for {0}. Continue?', [site]),
							() => {
								let key = frappe.datetime.get_datetime_as_string();
								console_dialog(key);
								frm.call('console_command', {
									key: key,
									caller: 'bench_clear_cache',
									site_name: site
								});
							}
						);
					}
				});
				dialog.show();
			} else {
				frappe.msgprint({
					title: __('No Sites Found'),
					message: __('No sites found on the local bench'),
					indicator: 'red'
				});
			}
		}
	});
}, __('Bench Operations'));

frm.add_custom_button(__('Setup Requirements'), function() {
	frappe.confirm(
		__('This will install/update Python dependencies. Continue?'),
		() => {
			let key = frappe.datetime.get_datetime_as_string();
			console_dialog(key);
			frm.call('console_command', {
				key: key,
				caller: 'bench_setup_requirements'
			});
		}
	);
}, __('Bench Operations'));

frm.add_custom_button(__('Build Assets'), function() {
	let key = frappe.datetime.get_datetime_as_string();
	console_dialog(key);
	frm.call('console_command', {
		key: key,
		caller: 'bench_build'
	});
}, __('Bench Operations'));

// === SYNC GROUP ===
frm.add_custom_button(__('Sync Sites & Apps'), () => {
	frappe.call({
		method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.sync_all',
		callback: function(r) {
			frappe.show_alert({
				message: __('Sites and Apps synced successfully'),
				indicator: 'green'
			});
			frm.reload_doc();
		}
	});
}, __('Sync'));
