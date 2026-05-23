// Copyright (c) 2017, Frappe and contributors
// For license information, please see license.txt

frappe.ui.form.on('Bench Node Manager', {
	onload: function(frm) {
		if (frm.doc.__islocal !== 1) frm.save();
		let site_config_fields = ["background_workers", "shallow_clone", "admin_password",
			"auto_email_id", "auto_update", "frappe_user", "global_help_setup",
			"gunicorn_workers", "github_username",
			"github_password", "mail_login", "mail_password", "mail_port", "mail_server",
			"use_tls", "rebase_on_pull", "redis_cache", "redis_queue", "redis_socketio",
			"restart_supervisor_on_update", "root_password", "serve_default_site",
			"socketio_port", "update_bench_on_update", "webserver_port", "developer_mode",
			"file_watcher_port"];
		site_config_fields.forEach(function(val){
			frm.toggle_display(val, frm.doc[val] !== undefined);
		});
	},
	refresh: function(frm) {
		// Render related sites and apps
		if (!frm.doc.__islocal) {
			frm.call('render_related_resources');
		}

		// Auto-set status to Connected for Local Node
		if (frm.doc.node_type === 'Local Node' && frm.doc.status !== 'Connected') {
			frm.set_value('status', 'Connected');
		}

		// === NODE OVERVIEW AUTO-REFRESH ===
		if (!frm.doc.__islocal) {
			load_node_overview(frm);
			
			// Auto-refresh every 10 seconds
			if (frm.node_overview_interval) {
				clearInterval(frm.node_overview_interval);
			}
			frm.node_overview_interval = setInterval(() => {
				if (frm.doc && !frm.is_dirty()) {
					load_node_overview(frm);
				}
			}, 10000);
		}

		// === BENCH OPERATIONS GROUP (Local Node Only) ===
		if (frm.doc.node_type === 'Local Node') {
			frm.add_custom_button(__("Install App"), function(){
				var dialog = new frappe.ui.Dialog({
					title: 'App Name',
					fields: [
						{fieldname: 'app_name', fieldtype: 'Data', reqd:true, label: 'Name of the frappe repo hosted on github'}
					]
				});
				dialog.set_primary_action(__("Install App"), () => {
					let key = frappe.datetime.get_datetime_as_string();
					console_dialog(key);
					frm.call("console_command", {
						key: key,
						caller: 'get-app',
						app_name: dialog.fields_dict.app_name.value,
						name: frm.doc.name
					}, () => {
						dialog.hide();
					});
				});
				dialog.show();
			}, __('Bench Operations'));

			frm.add_custom_button(__('Add Local Website'), function(){
				// Get system info
				frappe.call({
					method: 'bench_manager.bench_manager.doctype.site.site.get_system_info',
					// eslint-disable-next-line no-unused-vars
					callback: function(_sys_info) {
						

						// Get available apps
						frappe.call({
							method: 'bench_manager.bench_manager.doctype.site.site.get_available_apps',
							// eslint-disable-next-line no-unused-vars
							callback: function(_apps_response) {
								

								// Get available domains
								frappe.call({
									method: 'bench_manager.bench_manager.doctype.site.site.get_available_domains',
									// eslint-disable-next-line no-unused-vars
									callback: function(_domains_response) {
										

										// Get password info and show dialog
										frappe.call({
											method: 'bench_manager.bench_manager.doctype.site.site.pass_exists',
											args: {
												doctype: frm.doctype
											},
											btn: this,
											callback: function(r) {
												// Step wizard setup
												let domain_name_cache = '';
												let domain_status_cache = '';
												let domain_valid = false;

												const dialog = new frappe.ui.Dialog({
													title: __('Add New Website'),
													size: 'large',
													fields: [
														{
															fieldname: 'site_domain',
															fieldtype: 'Link',
															options: 'Site Domain',
															label: __('Domain'),
															reqd: 1
														},
														{
															fieldname: 'subdomain',
															fieldtype: 'Data',
															label: __('Subdomain (Optional)'),
															description: __('Leave blank to use the root domain')
														},
														{
															fieldname: 'full_domain_preview',
															fieldtype: 'HTML',
															options: '<div id="full-domain-preview" style="display:none; margin-top:5px;"></div>'
														},
														{
															fieldname: 'domain_feedback',
															fieldtype: 'HTML',
															options: '<div id="domain-feedback" style="display:none; margin-top:5px;"></div>'
														},
														{
															fieldname: 'apps_selector',
															fieldtype: 'HTML',
															label: __('Select Apps'),
															options: '<div id="apps-selector-container"></div>'
														},
														{
															fieldname: 'selected_apps_info',
															fieldtype: 'HTML',
															options: '<div id="selected-apps-info" style="display:none;"></div>'
														},
														{
															fieldname: 'admin_password',
															fieldtype: 'Password',
															label: __('Admin Password'),
															reqd: 1
														},
														{
															fieldname: 'password_strength',
															fieldtype: 'HTML',
															options: '<div id="password-strength"></div>'
														},
														{
															fieldname: 'mysql_password',
															fieldtype: 'Password',
															label: __('MySQL Root Password'),
															reqd: 1
														}
													]
												});

												// Fetch domain details helper
												function fetch_domain_details(domain_name) {
													if (!domain_name) return;

													$('#domain-feedback').html(`
														<div style="color: #6c757d; font-size: 12px;">
															<i class="fa fa-spinner fa-spin"></i> Validating domain...
														</div>
													`).show();

													frappe.call({
														method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.get_site_domain_details',
														args: { domain_name: domain_name },
														callback: function(res) {
															if (res.message) {
																const domain = res.message;
																domain_name_cache = domain.domain_name;
																domain_status_cache = domain.status;

																if (domain.status !== 'Active' && domain.status !== 'Pending Verification') {
																	$('#domain-feedback').html(`
																		<div style="color: #dc3545; font-size: 12px;">
																			<i class="fa fa-exclamation-triangle"></i> Domain status must be Active or Pending Verification (Current: ${domain.status})
																		</div>
																	`).show();
																	domain_valid = false;
																	return;
																}

																if (domain.status === 'Pending Verification') {
																	$('#domain-feedback').html(`
																		<div style="color: #ffc107; font-size: 12px; background: #fff3cd; padding: 10px; border-radius: 4px; border-left: 3px solid #ffc107;">
																			<div style="font-weight: 600; margin-bottom: 5px;"><i class="fa fa-exclamation-triangle"></i> Domain Verification Required</div>
																			<div style="margin-bottom: 8px;">Your domain is in Pending Verification status. Please verify your domain ownership before creating the site.</div>
																			<div style="font-size: 11px;">
																				<strong>Verification Method:</strong> ${domain.verification_method}<br>
																				<strong>Verification Token:</strong> <code style="background: #fff; padding: 2px 4px; border-radius: 2px;">${domain.verification_token}</code>
																			</div>
																		</div>
																	`).show();
																}

																const preview = `
																	<div style="display: flex; align-items: center; gap: 8px;">
																		<i class="fa fa-globe" style="color: #5e64ff;"></i>
																		<span style="font-weight: 500;">${domain.domain_name}</span>
																		<span style="color: #6c757d;">|</span>
																		<span style="color: ${domain.status === 'Active' ? '#28a745' : '#ffc107'};">${domain.status}</span>
																		<span style="color: #6c757d;">|</span>
																		<span>Sites: ${domain.current_sites}/${domain.max_sites}</span>
																	</div>
																`;
																$('#full-domain-preview').html(preview).show();

																if (domain.current_sites >= domain.max_sites) {
																	$('#domain-feedback').html(`
																		<div style="color: #dc3545; font-size: 12px;">
																			<i class="fa fa-exclamation-triangle"></i> Domain has reached maximum sites limit
																		</div>
																	`).show();
																	domain_valid = false;
																} else {
																	if (domain.status === 'Active') {
																		$('#domain-feedback').html('').hide();
																	}
																	domain_valid = true;
																}
															} else {
																domain_valid = false;
																$('#domain-feedback').html(`
																	<div style="color: #dc3545; font-size: 12px;">
																		<i class="fa fa-times-circle"></i> Could not fetch domain details
																	</div>
																`).show();
															}
														}
													});
												}

												// FIX: Use Frappe's proper onchange hook for Link fields
												dialog.fields_dict.site_domain.df.onchange = function() {
													const domain_name = dialog.fields_dict.site_domain.get_value();
													fetch_domain_details(domain_name);
												};

												// Also bind the raw input for manual typing/paste as a fallback
												dialog.fields_dict.site_domain.$input.on('blur', function() {
													const domain_name = $(this).val();
													if (domain_name && domain_name !== domain_name_cache) {
														fetch_domain_details(domain_name);
													}
												});

												// Subdomain input - validate and update preview
												let subdomain_validation_timeout;
												dialog.fields_dict.subdomain.$input.on('input', function() {
													const subdomain = $(this).val().toLowerCase();
													$(this).val(subdomain);

													const domain_name = domain_name_cache;

													if (!domain_name) return;

													if (!subdomain) {
														$('#full-domain-preview').html(`
															<div style="display: flex; align-items: center; gap: 8px;">
																<i class="fa fa-globe" style="color: #5e64ff;"></i>
																<span style="font-weight: 500;">${domain_name}</span>
															</div>
														`).show();
														return;
													}

													clearTimeout(subdomain_validation_timeout);

													$('#domain-feedback').html(`
														<div style="color: #6c757d; font-size: 12px;">
															<i class="fa fa-spinner fa-spin"></i> Checking subdomain availability...
														</div>
													`).show();

													subdomain_validation_timeout = setTimeout(() => {
														frappe.call({
															method: 'bench_manager.bench_manager.doctype.site.site.validate_domain_subdomain',
															args: {
																domain_name: domain_name,
																subdomain: subdomain
															},
															callback: function(res) {
																const result = res.message;

																if (result.valid) {
																	$('#full-domain-preview').html(`
																		<div style="display: flex; align-items: center; gap: 8px;">
																			<i class="fa fa-globe" style="color: #5e64ff;"></i>
																			<span style="font-weight: 500; color: #28a745;">${result.full_domain}</span>
																		</div>
																	`).show();
																	$('#domain-feedback').html(`
																		<div style="color: #28a745; font-size: 12px;">
																			<i class="fa fa-check-circle"></i> ${result.message}
																		</div>
																	`).show();
																	domain_valid = true;
																} else {
																	$('#full-domain-preview').html(`
																		<div style="display: flex; align-items: center; gap: 8px;">
																			<i class="fa fa-globe" style="color: #5e64ff;"></i>
																			<span style="font-weight: 500;">${subdomain}.${domain_name}</span>
																		</div>
																	`).show();
																	$('#domain-feedback').html(`
																		<div style="color: #dc3545; font-size: 12px;">
																			<i class="fa fa-times-circle"></i> ${result.message}
																		</div>
																	`).show();
																	domain_valid = false;
																}
															}
														});
													}, 500);
												});

												// Password strength indicator
												if (r['message']['condition'][0] !== 'T') {
													dialog.fields_dict.admin_password.$input.on('keyup', function() {
														const password = $(this).val();
														if (!password) {
															$('#password-strength').html('');
															return;
														}

														let strength = 0;
														let feedback = [];

														if (password.length >= 8) strength++; else feedback.push('at least 8 characters');
														if (/[a-z]/.test(password)) strength++; else feedback.push('lowercase letter');
														if (/[A-Z]/.test(password)) strength++; else feedback.push('uppercase letter');
														if (/[0-9]/.test(password)) strength++; else feedback.push('number');
														if (/[^a-zA-Z0-9]/.test(password)) strength++; else feedback.push('special character');

														let color, text, barWidth;
														if (strength <= 2) {
															color = '#dc3545'; text = 'Weak'; barWidth = '33%';
														} else if (strength <= 3) {
															color = '#ffc107'; text = 'Medium'; barWidth = '66%';
														} else {
															color = '#28a745'; text = 'Strong'; barWidth = '100%';
														}

														$('#password-strength').html(`
															<div style="font-size: 12px; margin-bottom: 5px;">
																<div style="display: flex; justify-content: space-between; align-items: center;">
																	<span style="color: #6c757d;">Password Strength:</span>
																	<span style="color: ${color}; font-weight: 600;">${text}</span>
																</div>
																<div style="height: 4px; background: #e9ecef; border-radius: 2px; margin-top: 5px; overflow: hidden;">
																	<div style="height: 100%; background: ${color}; width: ${barWidth}; transition: width 0.3s;"></div>
																</div>
																${feedback.length > 0 ? '<div style="color: #6c757d; font-size: 11px; margin-top: 5px;">Add: ' + feedback.join(', ') + '</div>' : ''}
															</div>
														`);
													});
												}

												// App selection - get app name from parent card, not checkbox
												let selected_apps = [];

												$(document).on('click', '.app-card', function() {
													const card = $(this);
													const is_selected = card.hasClass('selected');

													if (is_selected) {
														card.removeClass('selected');
														const app_name = card.data('app');
														selected_apps = selected_apps.filter(a => a !== app_name);
													} else {
														card.addClass('selected');
														const app_name = card.data('app');
														if (!selected_apps.includes(app_name)) {
															selected_apps.push(app_name);
														}
													}

													if (selected_apps.length > 0) {
														$('#selected-apps-info').html(`
															<div style="font-size: 12px;">
																<strong><i class="fa fa-check-circle" style="color: #28a745;"></i> ${selected_apps.length} app${selected_apps.length > 1 ? 's' : ''} selected:</strong>
																<span style="color: #495057;"> ${selected_apps.join(', ')}</span>
															</div>
														`).show();
													} else {
														$('#selected-apps-info').hide();
													}

													// Update estimated time (2 min base + 2 min per app)
													const time = 2 + (selected_apps.length * 2);
													$('#estimated-time').text(time + ' minutes');
												});

												// Helper: proceed with site creation
												function proceed_with_site_creation(dlg, apps, domain_name) {
													const subdomain = dlg.fields_dict.subdomain.get_value();
													const site_name = subdomain ? `${subdomain}.${domain_name}` : domain_name;

													let key = frappe.datetime.get_datetime_as_string();

													frappe.call({
														method: 'bench_manager.bench_manager.doctype.site.site.verify_password',
														args: {
															site_name: site_name,
															mysql_password: dlg.fields_dict.mysql_password.value
														},
														callback: function(res){
															if (res.message === 'console'){
																if (typeof window.console_dialog === 'function') {
																	window.console_dialog(key);
																} else if (typeof console_dialog === 'function') {
																	console_dialog(key);
																} else {
																	frappe.msgprint({ message: __('console_dialog function not found'), indicator: 'red' });
																}

																frappe.call({
																	method: 'bench_manager.bench_manager.doctype.site.site.create_site',
																	args: {
																		site_name: site_name,
																		admin_password: dlg.fields_dict.admin_password.value,
																		mysql_password: dlg.fields_dict.mysql_password.value,
																		apps_to_install: JSON.stringify(apps),
																		key: key,
																		site_domain: dlg.fields_dict.site_domain.value,
																		subdomain: dlg.fields_dict.subdomain.value
																	}
																});
																dlg.hide();
															}
														}
													});
												}

												// Store primary action callback for use by wizard Create button
												let primary_action_callback = () => {
													const site_domain = dialog.fields_dict.site_domain.get_value();
													if (!site_domain) {
														frappe.msgprint({
															title: __('Invalid Domain Configuration'),
															message: __('Please select a domain'),
															indicator: 'red'
														});
														return;
													}

													if (!domain_valid) {
														frappe.call({
															method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.get_site_domain_details',
															args: { domain_name: site_domain },
															callback: function(res) {
																if (!res.message) {
																	frappe.msgprint({
																		title: __('Invalid Domain Configuration'),
																		message: __('Unable to fetch domain details'),
																		indicator: 'red'
																	});
																	return;
																}

																const domain = res.message;

																if (domain.status !== 'Active' && domain.status !== 'Pending Verification') {
																	frappe.msgprint({
																		title: __('Invalid Domain Configuration'),
																		message: __('Domain status must be Active or Pending Verification (Current: ' + domain.status + ')'),
																		indicator: 'red'
																	});
																	return;
																}

																if (domain.current_sites >= domain.max_sites) {
																	frappe.msgprint({
																		title: __('Domain Limit Reached'),
																		message: __('Domain has reached maximum sites limit'),
																		indicator: 'red'
																	});
																	return;
																}

																if (domain.status === 'Pending Verification') {
																	frappe.msgprint({
																		title: __('Domain Verification Required'),
																		message: __('Your domain is in Pending Verification status. Please verify your domain ownership before creating the site.'),
																		indicator: 'yellow'
																	});
																}

																proceed_with_site_creation(dialog, selected_apps, domain_name_cache || domain.domain_name);
															}
														});
														return;
													}

													if (domain_status_cache === 'Pending Verification') {
														frappe.msgprint({
															title: __('Domain Verification Required'),
															message: __('Your domain is in Pending Verification status. Please verify your domain ownership before creating the site.'),
															indicator: 'yellow'
														});
													}

													proceed_with_site_creation(dialog, selected_apps, domain_name_cache);
												};

												dialog.set_primary_action(__("Create"), primary_action_callback);

												dialog.show();

												// --- Wizard Navigation Logic ---
												let current_step = 1;

												const step1_fields = ['site_domain', 'subdomain', 'full_domain_preview', 'domain_feedback'];
												const step2_fields = ['apps_selector', 'selected_apps_info'];
												const step3_fields = ['admin_password', 'password_strength', 'mysql_password'];
												const all_step_fields = [...step1_fields, ...step2_fields, ...step3_fields];

												function show_step(step) {
													all_step_fields.forEach(fname => {
														if (dialog.fields_dict[fname]) {
															dialog.fields_dict[fname].df.hidden = 1;
															dialog.fields_dict[fname].refresh();
														}
													});
													const fields_to_show = step === 1 ? step1_fields : step === 2 ? step2_fields : step3_fields;
													fields_to_show.forEach(fname => {
														if (dialog.fields_dict[fname]) {
															dialog.fields_dict[fname].df.hidden = 0;
															dialog.fields_dict[fname].refresh();
														}
													});
													current_step = step;
													update_step_indicator(step);
													render_wizard_buttons();
												}

												function update_step_indicator(step) {
													dialog.$wrapper.find('.step-item').each(function() {
														const step_num = parseInt($(this).data('step'));
														const circle = $(this).find('.step-circle');
														const label = $(this).find('.step-label');
														if (step_num < step) {
															circle.css({'background': '#28a745', 'color': 'white'});
															label.css({'color': '#28a745', 'font-weight': '600'});
														} else if (step_num === step) {
															circle.css({'background': '#5e64ff', 'color': 'white'});
															label.css({'color': '#5e64ff', 'font-weight': '600'});
														} else {
															circle.css({'background': '#dee2e6', 'color': '#6c757d'});
															label.css({'color': '#6c757d', 'font-weight': 'normal'});
														}
													});
													dialog.$wrapper.find('.step-connector').each(function(index) {
														$(this).css('background', index < step - 1 ? '#28a745' : '#dee2e6');
													});
												}

												function render_wizard_buttons() {
													const footer = dialog.$wrapper.find('.modal-footer');
													footer.find('.btn-primary, .btn-secondary').hide();
													footer.find('.btn-wizard-row').remove();

													const row = $('<div class="btn-wizard-row" style="display:flex;justify-content:space-between;align-items:center;width:100%;"></div>');

													if (current_step > 1) {
														$('<button class="btn btn-default btn-wizard" style="min-width:90px;">&#8592; Back</button>')
															.on('click', function() { show_step(current_step - 1); })
															.appendTo(row);
													} else {
														$('<span></span>').appendTo(row);
													}

													if (current_step < 3) {
														$('<button class="btn btn-primary btn-wizard" style="min-width:90px;">Next &#8594;</button>')
															.on('click', function() {
																if (current_step === 1) {
																	const selected_domain = dialog.fields_dict.site_domain.get_value();
																	if (!selected_domain) {
																		frappe.show_alert({ message: __('Please select a domain first'), indicator: 'red' });
																		return;
																	}
																}
																show_step(current_step + 1);
															})
															.appendTo(row);
													} else {
														$('<button class="btn btn-primary btn-wizard" style="min-width:120px;">Create Site</button>')
															.on('click', function() { primary_action_callback && primary_action_callback(); })
															.appendTo(row);
													}

													row.appendTo(footer);
												}

												// Initialize at step 1
												show_step(1);

											} // end pass_exists callback
										}); // end pass_exists frappe.call
									} // end get_available_domains callback
								}); // end get_available_domains frappe.call
							} // end get_available_apps callback
						}); // end get_available_apps frappe.call
					} // end get_system_info callback
				}); // end get_system_info frappe.call
			}, __('Bench Operations')); // end Add Local Website button
		} // end Local Node buttons condition

		// === BENCH OPERATIONS GROUP (Local Node Only) ===
		if (frm.doc.node_type === 'Local Node') {
			frm.add_custom_button(__('Restart Bench'), function() {
				frappe.confirm(
					__('This will restart all bench services (web, workers, scheduler). Continue?'),
					() => {
						let key = frappe.datetime.get_datetime_as_string();
						console_dialog(key);
						frm.call('console_command', {
							key: key,
							caller: 'bench_restart',
							name: frm.doc.name
						});
					}
				);
			}, __('Bench Operations'));

			frm.add_custom_button(__('Bench Status'), function() {
				let key = frappe.datetime.get_datetime_as_string();
				console_dialog(key);
				frm.call('console_command', {
					key: key,
					caller: 'bench_status',
					name: frm.doc.name
				});
			}, __('Bench Operations'));

			frm.add_custom_button(__('Update Bench'), function() {
				frappe.confirm(
					__('This will update all apps and may take several minutes. Continue?'),
					() => {
						let key = frappe.datetime.get_datetime_as_string();
						console_dialog(key);
						frm.call('console_command', {
							key: key,
							caller: 'bench_update',
							name: frm.doc.name
						});
					}
				);
			}, __('Bench Operations'));

			frm.add_custom_button(__('Clear Cache'), function() {
				let key = frappe.datetime.get_datetime_as_string();
				console_dialog(key);
				frm.call('console_command', {
					key: key,
					caller: 'bench_clear_cache',
					name: frm.doc.name
				});
			}, __('Bench Operations'));

			frm.add_custom_button(__('Setup Requirements'), function() {
				frappe.confirm(
					__('This will setup Python requirements. Continue?'),
					() => {
						let key = frappe.datetime.get_datetime_as_string();
						console_dialog(key);
						frm.call('console_command', {
							key: key,
							caller: 'bench_setup_requirements',
							name: frm.doc.name
						});
					}
				);
			}, __('Bench Operations'));

			frm.add_custom_button(__('Build Assets'), function() {
				let key = frappe.datetime.get_datetime_as_string();
				console_dialog(key);
				frm.call('console_command', {
					key: key,
					caller: 'bench_build',
					name: frm.doc.name
				});
			}, __('Bench Operations'));
		}

		// === CONFIGURATION GROUP ===
		frm.add_custom_button(__('Generate SSH Keys'), () => {
			frappe.confirm(
				__('This will generate new SSH keys for GitHub authentication. Continue?'),
				() => {
					frappe.call({
						method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.generate_ssh_keys',
						freeze: true,
						freeze_message: __('Generating SSH keys...'),
						callback: function(r) {
							if (r.message && r.message.success) {
								frappe.msgprint({
									title: __('SSH Keys Generated'),
									message: `<div style="margin-bottom: 15px;">
										<strong>✓ ${r.message.message}</strong>
									</div>
									<div style="padding: 10px; background: #f8f9fa; border-radius: 4px; margin-bottom: 10px;">
										<strong>Public Key:</strong><br>
										<textarea readonly style="width: 100%; height: 80px; font-family: monospace; font-size: 11px; margin-top: 5px;">${r.message.public_key}</textarea>
									</div>
									<div style="padding: 10px; background: #fff3cd; border-radius: 4px;">
										<strong>Next Steps:</strong>
										<ol style="margin: 5px 0 0 20px; padding-left: 0;">
											<li>Copy the public key above</li>
											<li>Go to <a href="https://github.com/settings/ssh/new" target="_blank">GitHub SSH Settings</a></li>
											<li>Add the public key</li>
											<li>Click "Test SSH Connection" to verify</li>
										</ol>
									</div>`,
									indicator: 'green',
									primary_action: {
										label: __('Reload'),
										action: () => frm.reload_doc()
									}
								});
							} else {
								frappe.msgprint({
									title: __('Error'),
									message: r.message.error,
									indicator: 'red'
								});
							}
						}
					});
				}
			);
		}, __('Configuration'));

		frm.add_custom_button(__('Test SSH Connection'), () => {
			frappe.call({
				method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.test_ssh_connection',
				freeze: true,
				freeze_message: __('Testing SSH connection...'),
				callback: function(r) {
					if (r.message && r.message.success) {
						frappe.msgprint({
							title: __('Connection Successful'),
							message: `<div style="color: #28a745; margin-bottom: 10px;">
								<strong>✓ ${r.message.message}</strong>
							</div>
							<div style="padding: 10px; background: #f8f9fa; border-radius: 4px; font-family: monospace; font-size: 11px;">
								${r.message.output}
							</div>`,
							indicator: 'green',
							primary_action: {
								label: __('Reload'),
								action: () => frm.reload_doc()
							}
						});
					} else {
						frappe.msgprint({
							title: __('Connection Failed'),
							message: `<div style="color: #dc3545; margin-bottom: 10px;">
								<strong>✗ ${r.message.error}</strong>
							</div>
							${r.message.output ? '<div style="padding: 10px; background: #f8f9fa; border-radius: 4px; font-family: monospace; font-size: 11px;">' + r.message.output + '</div>' : ''}`,
							indicator: 'red'
						});
					}
				}
			});
		}, __('Configuration'));

		frm.add_custom_button(__('Search GitHub Repos'), () => {
			let currentPage = 1;
			let allRepositories = [];
			let totalCount = 0;
			let currentKeyword = '';

			const dialog = new frappe.ui.Dialog({
				title: __('Search GitHub Repositories'),
				size: 'large',
				fields: [
					{
						fieldname: 'keyword',
						fieldtype: 'Data',
						label: __('Search Keyword'),
						reqd: 1,
						description: __('Enter keyword to search repositories (e.g., frappe, ecommerce, python)')
					},
					{
						fieldname: 'language',
						fieldtype: 'Select',
						label: __('Language (Optional)'),
						options: '',
						description: __('Filter by programming language')
					},
					{
						fieldname: 'sort_by',
						fieldtype: 'Select',
						label: __('Sort By'),
						options: 'stars\nforks\nupdated',
						default: 'stars'
					},
					{
						fieldname: 'results_area',
						fieldtype: 'HTML',
						options: '<div id="github-search-results" style="max-height: 500px; overflow-y: auto; padding-right: 10px;"></div>'
					}
				],
				primary_action_label: __('Search'),
				primary_action: (values) => {
					currentPage = 1;
					allRepositories = [];
					currentKeyword = values.keyword;

					$('#github-search-results').html(`
						<div style="padding: 20px; text-align: center;">
							<i class="fa fa-spinner fa-spin" style="font-size: 24px;"></i>
							<div style="margin-top: 10px; color: #6c757d;">Searching GitHub repositories...</div>
						</div>
					`);

					loadPage(values, 1);
				}
			});

			function loadPage(values, page) {
				frappe.call({
					method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.search_github_repos',
					args: {
						keyword: values.keyword,
						language: values.language || null,
						sort: values.sort_by || 'stars',
						page: page
					},
					callback: function(r) {
						if (r.message && r.message.success) {
							const repos = r.message.repositories;
							totalCount = r.message.total_count;
							allRepositories = allRepositories.concat(repos);
							renderResults();
						} else {
							$('#github-search-results').html(`
								<div style="padding: 20px; background: #f8d7da; border-radius: 6px; color: #721c24;">
									<strong>Error:</strong> ${r.message.error}
								</div>
							`);
						}
					}
				});
			}

			function renderResults() {
				let resultsHTML = `
					<div style="padding: 15px; background: #e7f3ff; border-radius: 6px; margin-bottom: 15px;">
						<strong>Found ${totalCount.toLocaleString()} repositories for "${currentKeyword}"</strong>
						<div style="font-size: 12px; color: #6c757d; margin-top: 5px;">Showing ${allRepositories.length} results</div>
					</div>
				`;

				allRepositories.forEach(repo => {
					const stars = repo.stars.toLocaleString();
					const forks = repo.forks.toLocaleString();
					const updated = new Date(repo.updated_at).toLocaleDateString();
					const languageColors = {
						'Python': '#3572A5', 'JavaScript': '#f1e05a', 'TypeScript': '#2b7489',
						'PHP': '#4F5D95', 'Ruby': '#701516', 'Go': '#00ADD8',
						'Java': '#b07219', 'C++': '#f34b7d', 'C#': '#239120',
						'HTML': '#e34c26', 'CSS': '#563d7c', 'Shell': '#89e051',
						'Vue': '#41b883', 'React': '#61dafb', 'Rust': '#dea584'
					};
					const languageBadge = repo.language !== 'Unknown'
						? `<span style="background: ${languageColors[repo.language] || '#6c757d'}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; margin-right: 5px;">${repo.language}</span>`
						: '';

					resultsHTML += `
						<div style="padding: 15px; background: #f8f9fa; border-radius: 6px; margin-bottom: 10px; border-left: 4px solid #5e64ff;">
							<div style="display: flex; justify-content: space-between; align-items: flex-start;">
								<div style="flex: 1;">
									<a href="${repo.url}" target="_blank" style="font-size: 16px; font-weight: 600; color: #5e64ff; text-decoration: none;">
										${repo.full_name}
									</a>
									<div style="margin-top: 5px; color: #6c757d; font-size: 13px;">${repo.description}</div>
									<div style="margin-top: 10px; display: flex; align-items: center; flex-wrap: wrap; gap: 8px;">
										${languageBadge}
										<span style="font-size: 12px; color: #6c757d;">
											<i class="fa fa-star" style="color: #ffc107;"></i> ${stars}
										</span>
										<span style="font-size: 12px; color: #6c757d;">
											<i class="fa fa-code-fork" style="color: #6c757d;"></i> ${forks}
										</span>
										<span style="font-size: 12px; color: #6c757d;">
											<i class="fa fa-clock-o" style="color: #6c757d;"></i> Updated: ${updated}
										</span>
									</div>
									<div style="margin-top: 10px; padding: 8px; background: #f8f9fa; border-radius: 4px; border: 1px solid #dee2e6;">
										<div style="display: flex; align-items: center; gap: 10px;">
											<span style="font-size: 11px; color: #6c757d; font-weight: 600;">Clone URL:</span>
											<input type="text" readonly value="https://github.com/${repo.full_name}.git" style="flex: 1; padding: 4px 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 11px; background: white; font-family: monospace;">
											<button class="copy-clone-btn" data-clone-url="https://github.com/${repo.full_name}.git" style="padding: 4px 12px; background: #5e64ff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
												<i class="fa fa-copy"></i> Copy
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					`;
				});

				if (allRepositories.length < totalCount) {
					resultsHTML += `
						<div style="text-align: center; padding: 20px;">
							<button id="load-more-btn" style="padding: 10px 30px; background: #5e64ff; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600;">
								Load More (${allRepositories.length + 100} / ${totalCount.toLocaleString()})
							</button>
						</div>
					`;
				}

				$('#github-search-results').html(resultsHTML);

				$('#load-more-btn').on('click', function() {
					currentPage++;
					$(this).html('<i class="fa fa-spinner fa-spin"></i> Loading...');
					loadPage(dialog.get_values(), currentPage);
				});

				$('.copy-clone-btn').on('click', function() {
					const cloneUrl = $(this).data('clone-url');
					navigator.clipboard.writeText(cloneUrl).then(() => {
						const originalHTML = $(this).html();
						$(this).html('<i class="fa fa-check"></i> Copied!');
						setTimeout(() => { $(this).html(originalHTML); }, 2000);
					}).catch(() => {
						frappe.msgprint(__('Failed to copy to clipboard'));
					});
				});
			}

			dialog.show();
		}, __('Configuration'));

		frm.add_custom_button(__('Setup GitHub'), () => {
			const dialog = new frappe.ui.Dialog({
				title: __('GitHub Configuration'),
				fields: [
					{
						fieldname: 'info',
						fieldtype: 'HTML',
						options: `
							<div style="padding: 15px; background: #f8f9fa; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #5e64ff;">
								<div style="font-weight: 600; color: #495057; margin-bottom: 10px;">
									<i class="fa fa-github" style="font-size: 18px;"></i> Complete GitHub Integration Setup
								</div>
								<div style="font-size: 13px; color: #6c757d; line-height: 1.6; margin-bottom: 10px;">
									Configure your GitHub credentials and git identity. We recommend using SSH for secure authentication.
								</div>
								<div style="padding: 10px; background: #e7f3ff; border-radius: 4px; border-left: 3px solid #5e64ff;">
									<div style="font-size: 12px; color: #495057;">
										<strong>💡 Recommended:</strong> Use "Generate SSH Keys" button first for secure, passwordless authentication.
									</div>
								</div>
								<div style="margin-top: 10px; padding: 10px; background: #fff; border-radius: 4px;">
									<div style="font-size: 12px; color: #495057;">
										<strong>For HTTPS (fallback):</strong>
										<a href="https://github.com/settings/tokens" target="_blank" style="margin-left: 5px;">Generate GitHub Token</a>
										→ Select <code>repo</code> scope
									</div>
								</div>
							</div>
						`
					},
					{
						fieldname: 'github_username',
						fieldtype: 'Data',
						label: __('GitHub Username'),
						reqd: 1,
						default: frm.doc.github_username || '',
						description: __('Used for GitHub API and git commits (e.g., amitascra)')
					},
					{
						fieldname: 'github_token',
						fieldtype: 'Password',
						label: __('GitHub Personal Access Token'),
						reqd: 1,
						default: frm.doc.github_password || '',
						description: __('Token with repo scope for private repositories')
					},
					{
						fieldname: 'git_user_email',
						fieldtype: 'Data',
						label: __('Git User Email'),
						reqd: 1,
						default: frm.doc.git_user_email || '',
						description: __('Email for git commits (e.g., amit@example.com)')
					},
					{
						fieldname: 'test_result',
						fieldtype: 'HTML',
						options: '<div id="github-test-result"></div>'
					}
				],
				primary_action_label: __('Test & Save'),
				primary_action: (values) => {
					$('#github-test-result').html(`
						<div style="padding: 10px; background: #e7f3ff; border-radius: 4px; margin-top: 10px;">
							<i class="fa fa-spinner fa-spin"></i> Testing GitHub connection...
						</div>
					`);

					frappe.call({
						method: "bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.test_github_connection",
						args: {
							username: values.github_username,
							token: values.github_token
						},
						callback: function(r) {
							if (r.message && r.message.success) {
								if (r.message.email && !values.git_user_email) {
									dialog.set_value('git_user_email', r.message.email);
								}

								$('#github-test-result').html(`
									<div style="padding: 15px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 4px; margin-top: 10px;">
										<div style="color: #155724; font-weight: 600; margin-bottom: 10px;">
											<i class="fa fa-check-circle"></i> Connection Successful!
										</div>
										<div style="font-size: 13px; color: #155724;">
											<div><strong>Username:</strong> ${r.message.login}</div>
											<div><strong>Name:</strong> ${r.message.name || 'N/A'}</div>
											<div><strong>Email:</strong> ${r.message.email || 'Not public'}</div>
											<div><strong>Public Repos:</strong> ${r.message.public_repos || 0}</div>
											<div><strong>Private Repos:</strong> ${r.message.total_private_repos || 0}</div>
										</div>
									</div>
								`);

								frm.set_value('github_username', values.github_username);
								frm.set_value('github_password', values.github_token);
								frm.set_value('git_user_email', values.git_user_email);

								frm.save().then(() => {
									frappe.show_alert({
										message: __('GitHub credentials saved successfully'),
										indicator: 'green'
									});
									dialog.hide();
								});
							} else {
								$('#github-test-result').html(`
									<div style="padding: 15px; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; margin-top: 10px;">
										<div style="color: #721c24; font-weight: 600; margin-bottom: 10px;">
											<i class="fa fa-times-circle"></i> Connection Failed
										</div>
										<div style="font-size: 13px; color: #721c24; margin-bottom: 10px;">
											<strong>Error:</strong> ${r.message.error}
										</div>
										<div style="padding: 10px; background: #fff3cd; border-radius: 4px;">
											<div style="font-size: 12px; color: #856404;">
												<strong>Troubleshooting:</strong>
												<ul style="margin: 5px 0 0 20px; padding-left: 0; list-style-position: inside;">
													<li>Verify GitHub username is correct</li>
													<li>Ensure token is valid and not expired</li>
													<li>Token must have <code>repo</code> scope</li>
												</ul>
											</div>
										</div>
									</div>
								`);
							}
						}
					});
				},
				secondary_action_label: __('Cancel'),
				secondary_action: () => { dialog.hide(); }
			});

			dialog.show();
		}, __('Configuration'));

		frm.add_custom_button(__('Reload Nginx'), () => {
			let root_password = frm.doc.password_root;

			if (!root_password) {
				frappe.msgprint({
					title: __('Password Required'),
					message: __('Please set Root User Password in Bench Node Manager > Password Settings > Password Root field'),
					indicator: 'red'
				});
				return;
			}

			frappe.call({
				method: "bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.setup_and_restart_nginx",
				args: { "root_password": root_password },
				freeze: true,
				freeze_message: __("Reloading Nginx...")
			});
		}, __('Configuration'));

		// === SYNC GROUP (Local Node Only) ===
		if (frm.doc.node_type === 'Local Node') {
			frm.add_custom_button(__('Sync Sites & Apps'), () => {
				frappe.call({
					method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.sync_all',
					args: { bench_node: frm.doc.name },
					callback: function() {
						frappe.show_alert({
							message: __('Sites and Apps synced successfully'),
							indicator: 'green'
						});
						frm.reload_doc();
					}
				});
			}, __('Bench Operations'));
		}
	}
});

// Sync Remote Sites button handler
frappe.ui.form.on('Bench Node Manager', {
	sync_remote_sites: function(frm) {
		frappe.confirm(
			__('This will sync all sites from the remote bench to the child table. Continue?'),
			() => {
				frappe.call({
					method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.sync_remote_sites_to_child_table',
					args: { name: frm.doc.name },
					freeze: true,
					freeze_message: __('Syncing remote sites...'),
					callback: function(r) {
						if (r.message && r.message.success) {
							frappe.msgprint({
								title: __('Sync Successful'),
								message: r.message.message || __('Successfully synced {0} sites', [r.message.sites_synced]),
								indicator: 'green'
							});
							frm.reload_doc();
						} else {
							frappe.msgprint({
								title: __('Sync Failed'),
								message: r.message.message || __('Failed to sync remote sites'),
								indicator: 'red'
							});
						}
					}
				});
			}
		);
	}
});

// Test SSH Connection button handler
frappe.ui.form.on('Bench Node Manager', {
	test_ssh_connection_btn: function(frm) {
		frappe.call({
			method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.ping_remote_bench',
			args: { name: frm.doc.name },
			freeze: true,
			freeze_message: __('Testing SSH connection...'),
			callback: function(r) {
				if (r.message && r.message.success) {
					frappe.msgprint({
						title: __('Connection Successful'),
						message: `<div style="color: #28a745;">
							<strong>✓ ${r.message.message}</strong>
						</div>`,
						indicator: 'green'
					});
					frm.reload_doc();
				} else {
					frappe.msgprint({
						title: __('Connection Failed'),
						message: `<div style="color: #dc3545;">
							<strong>✗ ${r.message.message}</strong>
						</div>`,
						indicator: 'red'
					});
				}
			}
		});
	}
});

// Bench Doctor button handler
frappe.ui.form.on('Bench Node Manager', {
	discover_benches: function(frm) {
		frappe.call({
			method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.discover_benches',
			args: { name: frm.doc.name },
			freeze: true,
			freeze_message: __('Running bench doctor...'),
			callback: function(r) {
				if (r.message && r.message.success) {
					let output = r.message.output || '';
					let error = r.message.error || '';

					let content = '<div style="font-family: monospace; white-space: pre-wrap; background: #1a1a1a; color: #00ff00; padding: 15px; border-radius: 4px; max-height: 400px; overflow-y: auto;">';
					if (output) {
						content += '<div>' + output + '</div>';
					}
					if (error) {
						content += '<div style="color: #ff6b6b; margin-top: 10px;"><strong>Errors:</strong><br>' + error + '</div>';
					}
					content += '</div>';

					frappe.msgprint({
						title: __('Bench Doctor Results'),
						message: content,
						indicator: 'green',
						width: 800
					});
				} else {
					frappe.msgprint({
						title: __('Bench Doctor Failed'),
						message: `<div style="color: #dc3545;">
							<strong>✗ ${r.message.message}</strong>
						</div>`,
						indicator: 'red'
					});
				}
			}
		});
	}
});

// Ping Remote Bench button handler
frappe.ui.form.on('Bench Node Manager', {
	ping_remote_bench_btn: function(frm) {
		frappe.call({
			method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.ping_remote_bench',
			args: { name: frm.doc.name },
			freeze: true,
			freeze_message: __('Testing connection to remote server...'),
			callback: function(r) {
				if (r.message && r.message.success) {
					frappe.msgprint({
						title: __('Connection Successful'),
						message: `<div style="color: #28a745;">
							<strong>✓ ${r.message.message}</strong>
						</div>`,
						indicator: 'green'
					});
					frm.reload_doc();
				} else {
					frappe.msgprint({
						title: __('Connection Failed'),
						message: `<div style="color: #dc3545;">
							<strong>✗ ${r.message.message}</strong>
						</div>`,
						indicator: 'red'
					});
				}
			}
		});
	}
});

// Bench Status button handler for Remote Node
frappe.ui.form.on('Bench Node Manager', {
	bench_status_btn: function(frm) {
		frappe.call({
			method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.run_remote_command',
			args: {
				name: frm.doc.name,
				command: 'sudo supervisorctl status all'
			},
			freeze: true,
			freeze_message: __('Getting bench status...'),
			callback: function(r) {
				if (r.message && r.message.success) {
					let output = r.message.output || '';
					let error = r.message.error || '';

					let content = '<div style="font-family: monospace; white-space: pre-wrap; background: #1a1a1a; color: #00ff00; padding: 15px; border-radius: 4px; max-height: 400px; overflow-y: auto;">';
					if (output) {
						content += '<div>' + output + '</div>';
					}
					if (error) {
						content += '<div style="color: #ff6b6b; margin-top: 10px;"><strong>Errors:</strong><br>' + error + '</div>';
					}
					content += '</div>';

					frappe.msgprint({
						title: __('Bench Status'),
						message: content,
						indicator: 'green',
						width: 800
					});
				} else {
					frappe.msgprint({
						title: __('Status Check Failed'),
						message: `<div style="color: #dc3545;">
							<strong>✗ ${r.message.message}</strong><br><br>
							<small>The SSH user may need sudo privileges to run supervisorctl.
							Configure sudo to allow the user to run supervisorctl without a password.</small>
						</div>`,
						indicator: 'red'
					});
				}
			}
		});
	}
});

// Restart Bench button handler for Remote Node
frappe.ui.form.on('Bench Node Manager', {
	restart_bench_btn: function(frm) {
		frappe.confirm(
			__('This will restart all bench services (web, workers, scheduler). Continue?'),
			() => {
				frappe.call({
					method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.run_remote_command',
					args: {
						name: frm.doc.name,
						command: 'bench restart'
					},
					freeze: true,
					freeze_message: __('Restarting bench services...'),
					callback: function(r) {
						if (r.message && r.message.success) {
							frappe.msgprint({
								title: __('Bench Restarted'),
								message: `<div style="color: #28a745;">
									<strong>✓ Bench services restarted successfully</strong>
								</div>`,
								indicator: 'green'
							});
						} else {
							frappe.msgprint({
								title: __('Restart Failed'),
								message: `<div style="color: #dc3545;">
									<strong>✗ ${r.message.message}</strong>
								</div>`,
								indicator: 'red'
							});
						}
					}
				});
			}
		);
	}
});

// Update Bench button handler for Remote Node
frappe.ui.form.on('Bench Node Manager', {
	update_bench_btn: function(frm) {
		frappe.confirm(
			__('This will update all apps and may take several minutes. Continue?'),
			() => {
				frappe.call({
					method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.run_remote_command',
					args: {
						name: frm.doc.name,
						command: 'bench update'
					},
					freeze: true,
					freeze_message: __('Updating bench...'),
					callback: function(r) {
						if (r.message && r.message.success) {
							let output = r.message.output || '';
							let error = r.message.error || '';

							let content = '<div style="font-family: monospace; white-space: pre-wrap; background: #1a1a1a; color: #00ff00; padding: 15px; border-radius: 4px; max-height: 400px; overflow-y: auto;">';
							if (output) {
								content += '<div>' + output + '</div>';
							}
							if (error) {
								content += '<div style="color: #ff6b6b; margin-top: 10px;"><strong>Errors:</strong><br>' + error + '</div>';
							}
							content += '</div>';

							frappe.msgprint({
								title: __('Bench Updated'),
								message: content,
								indicator: 'green',
								width: 800
							});
						} else {
							frappe.msgprint({
								title: __('Update Failed'),
								message: `<div style="color: #dc3545;">
									<strong>✗ ${r.message.message}</strong>
								</div>`,
								indicator: 'red'
							});
						}
					}
				});
			}
		);
	}
});

// Clear Cache button handler for Remote Node
frappe.ui.form.on('Bench Node Manager', {
	clear_cache_btn: function(frm) {
		frappe.call({
			method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.get_remote_sites',
			args: { name: frm.doc.name },
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

							frappe.call({
								method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.run_remote_command',
								args: {
									name: frm.doc.name,
									command: `bench --site ${site} clear-cache`
								},
								freeze: true,
								freeze_message: __('Clearing cache...'),
								callback: function(res) {
									if (res.message && res.message.success) {
										frappe.msgprint({
											title: __('Cache Cleared'),
											message: `<div style="color: #28a745;">
												<strong>✓ Cache cleared for ${site}</strong>
											</div>`,
											indicator: 'green'
										});
									} else {
										frappe.msgprint({
											title: __('Clear Cache Failed'),
											message: `<div style="color: #dc3545;">
												<strong>✗ ${res.message.message}</strong>
											</div>`,
											indicator: 'red'
										});
									}
								}
							});
						}
					});
					dialog.show();
				} else {
					frappe.msgprint({
						title: __('No Sites Found'),
						message: __('No sites found on the remote bench'),
						indicator: 'red'
					});
				}
			}
		});
	}
});

// Add Site button handler for Remote Node
frappe.ui.form.on('Bench Node Manager', {
	add_site_btn: function(frm) {
		const dialog = new frappe.ui.Dialog({
			title: __('Add New Site'),
			fields: [
				{
					fieldname: 'site_name',
					label: __('Site Name'),
					fieldtype: 'Data',
					reqd: 1,
					description: __('Enter domain or sub-domain (e.g., site1.local or mysite.example.com)')
				},
				{
					fieldname: 'mysql_root_password',
					label: __('MySQL Root Password'),
					fieldtype: 'Password',
					reqd: 1,
					description: __('Enter MySQL root password for the remote bench')
				},
				{
					fieldname: 'admin_password',
					label: __('Site Admin Password'),
					fieldtype: 'Password',
					reqd: 1,
					description: __('Enter admin password for the new site'),
					default: 'admin'
				}
			],
			primary_action_label: __('Create Site'),
			primary_action: function() {
				const site_name = dialog.fields_dict.site_name.value;
				const mysql_root_password = dialog.fields_dict.mysql_root_password.value;
				const admin_password = dialog.fields_dict.admin_password.value;
				dialog.hide();

				let key = frappe.datetime.get_datetime_as_string();
				console_dialog(key);

				frappe.call({
					method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.console_command',
					args: {
						key: key,
						caller: 'new_site',
						name: frm.doc.name,
						site_name: site_name,
						mysql_root_password: mysql_root_password,
						admin_password: admin_password
					}
				});
			}
		});
		dialog.show();
	}
});

// Add App button handler for Remote Node
frappe.ui.form.on('Bench Node Manager', {
	add_app_btn: function(frm) {
		const dialog = new frappe.ui.Dialog({
			title: __('Add New App'),
			fields: [
				{
					fieldname: 'git_url',
					label: __('Git Repository URL'),
					fieldtype: 'Data',
					reqd: 1,
					description: __('Enter git repository URL (e.g., https://github.com/frappe/erpnext)')
				}
			],
			primary_action_label: __('Get App'),
			primary_action: function() {
				const git_url = dialog.fields_dict.git_url.value;
				dialog.hide();

				let key = frappe.datetime.get_datetime_as_string();
				console_dialog(key);

				frappe.call({
					method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.console_command',
					args: {
						key: key,
						caller: 'add_app',
						name: frm.doc.name,
						app_name: git_url
					}
				});
			}
		});
		dialog.show();
	}
});

// Install App button handler for Remote Node
frappe.ui.form.on('Bench Node Manager', {
	install_app_btn: function(frm) {
		frappe.call({
			method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.get_remote_sites',
			args: { name: frm.doc.name },
			freeze: true,
			freeze_message: __('Fetching sites...'),
			callback: function(r) {
				if (r.message && r.message.success && r.message.sites && r.message.sites.length > 0) {
					const site_dialog = new frappe.ui.Dialog({
						title: __('Select Site'),
						fields: [
							{
								fieldname: 'site',
								label: __('Site'),
								fieldtype: 'Select',
								options: r.message.sites,
								reqd: 1
							}
						],
						primary_action_label: __('Next'),
						primary_action: function() {
							const site = site_dialog.fields_dict.site.value;
							site_dialog.hide();

							frappe.call({
								method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.get_remote_apps',
								args: { name: frm.doc.name },
								freeze: true,
								freeze_message: __('Fetching apps...'),
								callback: function(app_r) {
									if (app_r.message && app_r.message.success && app_r.message.apps && app_r.message.apps.length > 0) {
										const app_dialog = new frappe.ui.Dialog({
											title: __('Select App to Install'),
											fields: [
												{
													fieldname: 'app',
													label: __('App'),
													fieldtype: 'Select',
													options: app_r.message.apps,
													reqd: 1
												}
											],
											primary_action_label: __('Install App'),
											primary_action: function() {
												const app = app_dialog.fields_dict.app.value;
												app_dialog.hide();

												let key = frappe.datetime.get_datetime_as_string();
												console_dialog(key);

												frappe.call({
													method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.console_command',
													args: {
														key: key,
														caller: 'install_app',
														name: frm.doc.name,
														site_name: site,
														app_name: app
													}
												});
											}
										});
										app_dialog.show();
									} else {
										frappe.msgprint({
											title: __('No Apps Found'),
											message: __('No apps found on the remote bench'),
											indicator: 'red'
										});
									}
								}
							});
						}
					});
					site_dialog.show();
				} else {
					frappe.msgprint({
						title: __('No Sites Found'),
						message: __('No sites found on the remote bench'),
						indicator: 'red'
					});
				}
			}
		});
	}
});

// Delete Site button handler for Remote Node
frappe.ui.form.on('Bench Node Manager', {
	delete_site_btn: function(frm) {
		frappe.call({
			method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.get_remote_sites',
			args: { name: frm.doc.name },
			freeze: true,
			freeze_message: __('Fetching sites...'),
			callback: function(r) {
				if (r.message && r.message.success && r.message.sites && r.message.sites.length > 0) {
					const dialog = new frappe.ui.Dialog({
						title: __('Delete Site'),
						fields: [
							{
								fieldname: 'site',
								label: __('Site'),
								fieldtype: 'Select',
								options: r.message.sites,
								reqd: 1
							},
							{
								fieldname: 'force',
								label: __('Force Delete'),
								fieldtype: 'Check',
								description: __('Use --force flag to delete site even if it has data')
							},
							{
								fieldname: 'mysql_root_password',
								label: __('MySQL Root Password'),
								fieldtype: 'Password',
								reqd: 1,
								description: __('MySQL root password from the remote bench config')
							}
						],
						primary_action_label: __('Delete Site'),
						primary_action: function() {
							const site = dialog.fields_dict.site.value;
							const force = dialog.fields_dict.force.value;
							const mysql_root_password = dialog.fields_dict.mysql_root_password.value;
							dialog.hide();

							frappe.confirm(
								__('Are you sure you want to delete site: {0}?', [site]),
								() => {
									let key = frappe.datetime.get_datetime_as_string();
									console_dialog(key);

									const caller = force ? 'delete_site_force' : 'delete_site';
									frappe.call({
										method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.console_command',
										args: {
											key: key,
											caller: caller,
											name: frm.doc.name,
											site_name: site,
											mysql_root_password: mysql_root_password
										}
									});
								}
							);
						}
					});
					dialog.show();
				} else {
					frappe.msgprint({
						title: __('No Sites Found'),
						message: __('No sites found on the remote bench'),
						indicator: 'red'
					});
				}
			}
		});
	}
});

// Uninstall App button handler for Remote Node
frappe.ui.form.on('Bench Node Manager', {
	uninstall_app_btn: function(frm) {
		frappe.call({
			method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.get_remote_sites',
			args: { name: frm.doc.name },
			freeze: true,
			freeze_message: __('Fetching sites...'),
			callback: function(r) {
				if (r.message && r.message.success && r.message.sites && r.message.sites.length > 0) {
					const site_dialog = new frappe.ui.Dialog({
						title: __('Select Site'),
						fields: [
							{
								fieldname: 'site',
								label: __('Site'),
								fieldtype: 'Select',
								options: r.message.sites,
								reqd: 1
							}
						],
						primary_action_label: __('Next'),
						primary_action: function() {
							const site = site_dialog.fields_dict.site.value;
							site_dialog.hide();

							frappe.call({
								method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.get_remote_apps',
								args: { name: frm.doc.name },
								freeze: true,
								freeze_message: __('Fetching apps...'),
								callback: function(app_r) {
									if (app_r.message && app_r.message.success && app_r.message.apps && app_r.message.apps.length > 0) {
										const app_dialog = new frappe.ui.Dialog({
											title: __('Select App to Uninstall'),
											fields: [
												{
													fieldname: 'app',
													label: __('App'),
													fieldtype: 'Select',
													options: app_r.message.apps,
													reqd: 1
												}
											],
											primary_action_label: __('Uninstall App'),
											primary_action: function() {
												const app = app_dialog.fields_dict.app.value;
												app_dialog.hide();

												frappe.confirm(
													__('Are you sure you want to uninstall app: {0} from site: {1}?', [app, site]),
													() => {
														let key = frappe.datetime.get_datetime_as_string();
														console_dialog(key);

														frappe.call({
															method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.console_command',
															args: {
																key: key,
																caller: 'uninstall_app',
																name: frm.doc.name,
																site_name: site,
																app_name: app
															}
														});
													}
												);
											}
										});
										app_dialog.show();
									} else {
										frappe.msgprint({
											title: __('No Apps Found'),
											message: __('No apps found on the remote bench'),
											indicator: 'red'
										});
									}
								}
							});
						}
					});
					site_dialog.show();
				} else {
					frappe.msgprint({
						title: __('No Sites Found'),
						message: __('No sites found on the remote bench'),
						indicator: 'red'
					});
				}
			}
		});
	}
});

// Remove App button handler for Remote Node
frappe.ui.form.on('Bench Node Manager', {
	remove_app_btn: function(frm) {
		frappe.call({
			method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.get_remote_apps',
			args: { name: frm.doc.name },
			freeze: true,
			freeze_message: __('Fetching apps...'),
			callback: function(r) {
				if (r.message && r.message.success && r.message.apps && r.message.apps.length > 0) {
					const dialog = new frappe.ui.Dialog({
						title: __('Remove App'),
						fields: [
							{
								fieldname: 'app',
								label: __('App'),
								fieldtype: 'Select',
								options: r.message.apps,
								reqd: 1
							}
						],
						primary_action_label: __('Remove App'),
						primary_action: function() {
							const app = dialog.fields_dict.app.value;
							dialog.hide();

							frappe.confirm(
								__('Are you sure you want to remove app: {0} from the bench?', [app]),
								() => {
									let key = frappe.datetime.get_datetime_as_string();
									console_dialog(key);

									frappe.call({
										method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.console_command',
										args: {
											key: key,
											caller: 'remove_app',
											name: frm.doc.name,
											app_name: app
										}
									});
								}
							);
						}
					});
					dialog.show();
				} else {
					frappe.msgprint({
						title: __('No Apps Found'),
						message: __('No apps found on the remote bench'),
						indicator: 'red'
					});
				}
			}
		});
	}
});

// Test SSH WebSocket Connection button handler
frappe.ui.form.on('Bench Node Manager', {
	test_ssh_websocket_btn: function(frm) {
		frappe.call({
			method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.test_ssh_websocket_connection',
			args: { name: frm.doc.name },
			freeze: true,
			freeze_message: __('Testing SSH WebSocket Connection...'),
			callback: function(r) {
				if (r.message && r.message.success) {
					let content = '<div style="font-family: monospace; white-space: pre-wrap; background: #1a1a1a; color: #00ff00; padding: 15px; border-radius: 4px;">';
					content += '<div><strong>✓ SSH Connection Pool Test Successful</strong></div>';
					content += '<div style="margin-top: 10px;"><strong>Output:</strong></div>';
					content += '<div>' + (r.message.output || 'No output') + '</div>';
					if (r.message.pool_stats) {
						content += '<div style="margin-top: 10px;"><strong>Pool Stats:</strong></div>';
						content += '<div>' + JSON.stringify(r.message.pool_stats, null, 2) + '</div>';
					}
					content += '</div>';

					frappe.msgprint({
						title: __('SSH WebSocket Test Successful'),
						message: content,
						indicator: 'green',
						width: 800
					});
				} else {
					frappe.msgprint({
						title: __('SSH WebSocket Test Failed'),
						message: `<div style="color: #dc3545; font-family: monospace;">
							<strong>✗ ${r.message.message}</strong>
							${r.message.error_type ? '<br><br>Error Type: ' + r.message.error_type : ''}
						</div>`,
						indicator: 'red',
						width: 600
					});
				}
			}
		});
	}
});

// Node Overview HTML Field Function
function load_node_overview(frm) {
	frappe.call({
		method: 'get_node_overview',
		doc: frm.doc,
		callback: function(r) {
			if (r.message && r.message.success) {
				const data = r.message;
				let html = generate_overview_html(data, frm);
				
				// Populate the HTML field
				frm.fields_dict.node_overview_html.$wrapper.html(html);
				
				// Setup tab switching after HTML is rendered
				setup_tab_switching_field(frm);
			} else {
				frm.fields_dict.node_overview_html.$wrapper.html(
					`<div class="alert alert-danger">
						<strong>Error:</strong> ${r.message ? r.message.message : 'Failed to fetch node overview'}
					</div>`
				);
			}
		}
	});
}

// Setup tab switching functionality for HTML field
function setup_tab_switching_field(frm) {
	setTimeout(() => {
		frm.fields_dict.node_overview_html.$wrapper.find('[data-tab]').off('click').on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			const targetTab = $(this).attr('data-tab');
			
			// Remove active class from all tabs and hide all panes
			frm.fields_dict.node_overview_html.$wrapper.find('.nav-link').removeClass('active');
			frm.fields_dict.node_overview_html.$wrapper.find('.tab-pane-custom').hide();
			
			// Add active class to clicked tab and show corresponding pane
			$(this).addClass('active');
			frm.fields_dict.node_overview_html.$wrapper.find('#' + targetTab).show();
		});
	}, 100);
}

// Function to generate HTML from overview data
function generate_overview_html(data, frm) {
	let html = `
		<div style="padding: 15px;">
			<!-- Auto-refresh controls -->
			<div class="frappe-control" style="margin-bottom: 20px; padding: 10px; border-radius: 5px; display: flex; justify-content: space-between; align-items: center;">
				<div>
					<span style="color: var(--text-muted);">
						<i class="fa fa-clock-o"></i> Auto-refreshing every 10 seconds
					</span>
				</div>
				<div>
					<button class="btn btn-sm btn-danger" onclick="reboot_node_action('${frm.doc.name}')">
						<i class="fa fa-power-off"></i> Reboot Node
					</button>
				</div>
			</div>

				<!-- System Information -->
				<div class="row">
					<div class="col-md-12">
						<h4><i class="fa fa-server"></i> System Information</h4>
						<table class="table table-bordered table-sm">
							<tr><th width="200">Node Type</th><td><span class="badge badge-info">${data.node_type}</span></td></tr>
							<tr><th>Hostname</th><td>${data.system_info.hostname || 'N/A'}</td></tr>
							<tr><th>Operating System</th><td>${data.system_info.os || 'N/A'}</td></tr>
							${data.system_info.architecture ? `<tr><th>Architecture</th><td>${data.system_info.architecture}</td></tr>` : ''}
							<tr><th>Uptime</th><td>${data.system_info.uptime || 'N/A'}</td></tr>
						</table>
					</div>
				</div>

				<!-- CPU & Memory -->
				<div class="row" style="margin-top: 20px;">
					<div class="col-md-6">
						<h4><i class="fa fa-microchip"></i> CPU</h4>
						${generate_cpu_html(data.cpu, data.node_type)}
					</div>
					<div class="col-md-6">
						<h4><i class="fa fa-memory"></i> Memory</h4>
						${generate_memory_html(data.memory, data.node_type)}
					</div>
				</div>

				<!-- Disk Usage -->
				<div class="row" style="margin-top: 20px;">
					<div class="col-md-12">
						<h4><i class="fa fa-hdd-o"></i> Disk Usage</h4>
						${generate_disk_html(data.disk, data.node_type)}
					</div>
				</div>

				<!-- Top Processes -->
				<div class="row" style="margin-top: 20px;">
					<div class="col-md-12">
						<h4><i class="fa fa-list"></i> Top Processes</h4>
						<ul class="nav nav-tabs" role="tablist" style="margin-bottom: 15px;" id="process-tabs">
							<li class="nav-item">
								<a class="nav-link active" data-tab="cpu-processes" role="tab" style="cursor: pointer;">
									<i class="fa fa-bolt"></i> Top CPU Processes
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" data-tab="memory-processes" role="tab" style="cursor: pointer;">
									<i class="fa fa-database"></i> Top Memory Processes
								</a>
							</li>
						</ul>
						<div class="tab-content">
							<div class="tab-pane-custom active" id="cpu-processes" role="tabpanel">
								${generate_processes_html(data.top_cpu_processes, 'cpu', data.node_type)}
							</div>
							<div class="tab-pane-custom" id="memory-processes" role="tabpanel" style="display: none;">
								${generate_processes_html(data.top_memory_processes, 'memory', data.node_type)}
							</div>
						</div>
					</div>
				</div>

				<!-- Bench Services -->
				${data.bench_services && data.bench_services.length > 0 ? `
				<div class="row" style="margin-top: 20px;">
					<div class="col-md-12">
						<h4><i class="fa fa-cogs"></i> Bench Services</h4>
						${generate_services_html(data.bench_services)}
					</div>
				</div>
				` : ''}
			</div>
		`;
		return html;
	}

	// Generate CPU HTML
	function generate_cpu_html(cpu, node_type) {
		if (node_type === 'Local Node') {
			return `
				<table class="table table-bordered table-sm">
					<tr><th width="200">Usage</th><td>
						<div class="progress" style="height: 25px;">
							<div class="progress-bar ${cpu.usage_percent > 80 ? 'bg-danger' : cpu.usage_percent > 60 ? 'bg-warning' : 'bg-success'}" 
								style="width: ${cpu.usage_percent}%">${cpu.usage_percent}%</div>
						</div>
					</td></tr>
					<tr><th>Cores / Threads</th><td>${cpu.core_count} cores / ${cpu.thread_count} threads</td></tr>
					<tr><th>Load Average</th><td>${cpu.load_average.join(', ')}</td></tr>
					<tr><th>Per-Core Usage</th><td>${cpu.per_core_usage.map((p, i) => `Core ${i}: ${p}%`).join(', ')}</td></tr>
				</table>
			`;
		} else {
			return `
				<table class="table table-bordered table-sm">
					<tr><th width="200">Cores</th><td>${cpu.core_count}</td></tr>
					<tr><th>Load Average</th><td>${cpu.load_average.join(', ')}</td></tr>
					<tr><th>Usage Info</th><td><code>${cpu.usage_info}</code></td></tr>
				</table>
			`;
		}
	}

	// Generate Memory HTML
	function generate_memory_html(memory, node_type) {
		if (node_type === 'Local Node') {
			return `
				<table class="table table-bordered table-sm">
					<tr><th width="200">RAM Usage</th><td>
						<div class="progress" style="height: 25px;">
							<div class="progress-bar ${memory.percent > 80 ? 'bg-danger' : memory.percent > 60 ? 'bg-warning' : 'bg-success'}" 
								style="width: ${memory.percent}%">${memory.percent}%</div>
						</div>
					</td></tr>
					<tr><th>Total / Used / Available</th><td>${memory.total_gb} GB / ${memory.used_gb} GB / ${memory.available_gb} GB</td></tr>
					<tr><th>Swap Usage</th><td>
						<div class="progress" style="height: 20px;">
							<div class="progress-bar ${memory.swap_percent > 80 ? 'bg-danger' : memory.swap_percent > 60 ? 'bg-warning' : 'bg-info'}" 
								style="width: ${memory.swap_percent}%">${memory.swap_percent}%</div>
						</div>
					</td></tr>
					<tr><th>Swap Total / Used</th><td>${memory.swap_total_gb} GB / ${memory.swap_used_gb} GB</td></tr>
				</table>
			`;
		} else {
			return `
				<table class="table table-bordered table-sm">
					<tr><th width="200">Total</th><td>${memory.total_gb} GB</td></tr>
					<tr><th>Used</th><td>${memory.used_gb} GB</td></tr>
					<tr><th>Free</th><td>${memory.free_gb} GB</td></tr>
				</table>
			`;
		}
	}

	// Generate Disk HTML
	function generate_disk_html(disk, node_type) {
		if (node_type === 'Local Node') {
			let html = '<table class="table table-bordered table-sm"><thead><tr><th>Device</th><th>Mount</th><th>Type</th><th>Total</th><th>Used</th><th>Free</th><th>Usage</th></tr></thead><tbody>';
			disk.forEach(d => {
				html += `<tr>
					<td><code>${d.device}</code></td>
					<td><code>${d.mountpoint}</code></td>
					<td>${d.fstype}</td>
					<td>${d.total_gb} GB</td>
					<td>${d.used_gb} GB</td>
					<td>${d.free_gb} GB</td>
					<td>
						<div class="progress" style="height: 20px;">
							<div class="progress-bar ${d.percent > 80 ? 'bg-danger' : d.percent > 60 ? 'bg-warning' : 'bg-success'}" 
								style="width: ${d.percent}%">${d.percent}%</div>
						</div>
					</td>
				</tr>`;
			});
			html += '</tbody></table>';
			return html;
		} else {
			let html = '<table class="table table-bordered table-sm"><thead><tr><th>Filesystem</th><th>Size</th><th>Used</th><th>Available</th><th>Use%</th><th>Mounted on</th></tr></thead><tbody>';
			disk.forEach(d => {
				html += `<tr>
					<td><code>${d.filesystem}</code></td>
					<td>${d.size}</td>
					<td>${d.used}</td>
					<td>${d.available}</td>
					<td><span class="badge ${d.percent.replace('%', '') > 80 ? 'badge-danger' : 'badge-success'}">${d.percent}</span></td>
					<td><code>${d.mountpoint}</code></td>
				</tr>`;
			});
			html += '</tbody></table>';
			return html;
		}
	}

	// Generate Processes HTML
	function generate_processes_html(processes, type, node_type) {
		if (node_type === 'Local Node') {
			let html = `
				<div style="overflow-x: auto;">
					<table class="table table-bordered table-hover" style="font-size: 14px; margin-bottom: 0;">
						<thead style="background: var(--table-header-bg); position: sticky; top: 0;">
							<tr>
								<th style="padding: 12px;">PID</th>
								<th style="padding: 12px;">User</th>
								<th style="padding: 12px;">Process Name</th>
								<th style="padding: 12px; text-align: right;">CPU %</th>
								<th style="padding: 12px; text-align: right;">Memory %</th>
							</tr>
						</thead>
						<tbody>
			`;
			processes.forEach((p, index) => {
				const cpuClass = p.cpu_percent > 50 ? 'text-danger' : p.cpu_percent > 25 ? 'text-warning' : '';
				const memClass = p.memory_percent > 50 ? 'text-danger' : p.memory_percent > 25 ? 'text-warning' : '';
				html += `
					<tr>
						<td style="padding: 10px; font-family: monospace;">${p.pid}</td>
						<td style="padding: 10px;"><span class="badge badge-secondary">${p.username}</span></td>
						<td style="padding: 10px;"><code style="font-size: 13px;">${p.name}</code></td>
						<td style="padding: 10px; text-align: right; font-weight: 600;" class="${cpuClass}">
							${p.cpu_percent ? p.cpu_percent.toFixed(2) : '0.00'}%
						</td>
						<td style="padding: 10px; text-align: right; font-weight: 600;" class="${memClass}">
							${p.memory_percent ? p.memory_percent.toFixed(2) : '0.00'}%
						</td>
					</tr>
				`;
			});
			html += '</tbody></table></div>';
			return html;
		} else {
			let html = '<div class="code-block" style="padding: 15px; border-radius: 5px; font-size: 13px; max-height: 500px; overflow-y: auto; font-family: monospace; line-height: 1.6;">';
			processes.forEach((line, index) => {
				if (index === 0) {
					// Header line
					html += `<div style="font-weight: 600; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid var(--border-color);">${frappe.utils.escape_html(line)}</div>`;
				} else {
					html += `<div style="padding: 4px 0;">${frappe.utils.escape_html(line)}</div>`;
				}
			});
			html += '</div>';
			return html;
		}
	}

	// Generate Services HTML
	function generate_services_html(services) {
		let html = '<div class="code-block" style="padding: 15px; border-radius: 5px; font-size: 13px; max-height: 500px; overflow-y: auto; font-family: monospace; line-height: 1.8;">';
		services.forEach(service => {
			// Color code based on status with icons
			if (service.includes('RUNNING')) {
				html += `<div style="padding: 4px 0;"><i class="fa fa-check-circle" style="color: var(--text-success);"></i> <span style="color: var(--text-success); font-weight: 500;">${frappe.utils.escape_html(service)}</span></div>`;
			} else if (service.includes('STOPPED') || service.includes('FATAL')) {
				html += `<div style="padding: 4px 0;"><i class="fa fa-times-circle" style="color: var(--text-danger);"></i> <span style="color: var(--text-danger); font-weight: 500;">${frappe.utils.escape_html(service)}</span></div>`;
			} else {
				html += `<div style="padding: 4px 0;"><i class="fa fa-circle-o"></i> ${frappe.utils.escape_html(service)}</div>`;
			}
		});
		html += '</div>';
		return html;
	}

// Global function for rebooting node from HTML field
window.reboot_node_action = function(doc_name) {
	frappe.confirm(
		__('Are you sure you want to reboot this node? The system will restart immediately and all services will be interrupted.'),
		() => {
			// User confirmed - execute reboot
			frappe.call({
				method: 'bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.reboot_node',
				args: {
					name: doc_name
				},
				freeze: true,
				freeze_message: __('Initiating node reboot...'),
				callback: function(r) {
					if (r.message && r.message.success) {
						frappe.show_alert({
							message: r.message.message,
							indicator: 'orange'
						}, 10);
					} else {
						frappe.msgprint({
							title: __('Reboot Failed'),
							message: r.message ? r.message.message : __('Failed to reboot node'),
							indicator: 'red'
						});
					}
				}
			});
		},
		() => {
			// User cancelled
			frappe.show_alert({
				message: __('Reboot cancelled'),
				indicator: 'blue'
			}, 3);
		}
	);
};

// Dropbox access button handler
frappe.ui.form.on('Bench Node Manager', {
	allow_dropbox_access: function(frm) {
		if (frm.doc.app_access_key && frm.doc.app_secret_key) {
			frappe.call({
				method: "bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.get_dropbox_authorize_url",
				freeze: true,
				callback: function(r) {
					if (!r.exc) {
						window.open(r.message.auth_url);
					}
				}
			});
		} else if (frm.doc.__onload && frm.doc.__onload.dropbox_setup_via_site_config) {
			frappe.call({
				method: "bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.get_redirect_url",
				freeze: true,
				callback: function(r) {
					if (!r.exc) {
						window.open(r.message.auth_url);
					}
				}
			});
		} else {
			frappe.msgprint(__("Please enter values for App Access Key and App Secret Key"));
		}
	}
});