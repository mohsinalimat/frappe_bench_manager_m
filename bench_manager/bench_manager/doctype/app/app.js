// Copyright (c) 2017, Frappé and contributors
// For license information, please see license.txt

frappe.ui.form.on('App', {
	onload: function(frm) {
		if (frm.doc.__islocal != 1) frm.save();
		frappe.realtime.on("Bench-Manager:reload-page", () => frm.reload_doc());
	},
	refresh: function(frm) {
		if (frm.doc.version == undefined) $('div.form-inner-toolbar').hide();
		else $('div.form-inner-toolbar').show();
		let app_fields = ["app_title", "version", "app_description", "app_publisher", "app_email",
			"app_icon", "app_color", "app_license"];
		app_fields.forEach(function(app_field) {
			frm.set_df_property(app_field, "read_only", frm.doc.__islocal ? 0 : 1);
		});
		
		// Show update available indicator
		if (frm.doc.update_available && frm.doc.latest_version) {
			frm.dashboard.add_indicator(
				__('Update Available: {0}', [frm.doc.latest_version]), 
				'orange'
			);
		}
		
		// Show current version badge
		if (frm.doc.current_version) {
			frm.dashboard.add_indicator(
				__('Current: {0}', [frm.doc.current_version]), 
				'blue'
			);
		}
		if (frm.doc.is_git_repo != true) {
			frm.add_custom_button(__("Git Init"), function(){
				let key = frappe.datetime.get_datetime_as_string();
				console_dialog(key);
				frm.doc.is_git_repo = true;
				frm.call("console_command", {
					key: key,
					caller: "git_init"
				}, () => {
					setTimeout(() => { frm.save(); }, 5000);
				});
			});
		} else {
			// === GIT OPERATIONS GROUP ===
			frm.add_custom_button(__('Commit'), function(){
				var dialog = new frappe.ui.Dialog({
					title: 'Commit Message',
					fields: [
						{fieldname: 'commit_msg', fieldtype: 'Small Text', 'reqd':1, 'label':'Type in the commit message'}
					],
				});
				dialog.set_primary_action(__("Commit"), () => {
					let key = frappe.datetime.get_datetime_as_string();
					console_dialog(key);
					frm.call("console_command", {
						key: key,
						commit_msg: dialog.fields_dict.commit_msg.value,
						caller: "commit"
					}, () => {
						dialog.hide();
					});
				});
				dialog.show();
			}, __('Git Operations'));
			
			frm.add_custom_button(__('Push'), function(){
				frappe.confirm(
					__('This will push your commits to the remote repository. Continue?'),
					() => {
						let key = frappe.datetime.get_datetime_as_string();
						console_dialog(key);
						frm.call("console_command", {
							key: key,
							caller: "push"
						});
					}
				);
			}, __('Git Operations'));
			
			frm.add_custom_button(__('Stash'), function(){
				let key = frappe.datetime.get_datetime_as_string();
				console_dialog(key);
				frm.call("console_command", {
					key: key,
					caller: "stash"
				});
			}, __('Git Operations'));
			
			frm.add_custom_button(__('Apply Stash'), function(){
				let key = frappe.datetime.get_datetime_as_string();
				console_dialog(key);
				frm.call("console_command", {
					key: key,
					caller: "apply-stash"
				});
			}, __('Git Operations'));
			
			frm.add_custom_button(__('Status'), function(){
				let key = frappe.datetime.get_datetime_as_string();
				console_dialog(key);
				frm.call("console_command", {
					key: key,
					caller: "status"
				});
			}, __('Git Operations'));
			
			frm.add_custom_button(__('Fetch'), function(){
				let key = frappe.datetime.get_datetime_as_string();
				console_dialog(key);
				frm.call("console_command", {
					key: key,
					caller: "git_fetch"
				});
			}, __('Git Operations'));
			
			// === REMOTE OPERATIONS GROUP ===
			frm.add_custom_button(__('Pull & Rebase'), function(){
				frappe.call({
					method: 'bench_manager.bench_manager.doctype.app.app.get_remotes',
					args: {
						docname: frm.doc.name,
					},
					btn: this,
					callback: function(r) {
						var dialog = new frappe.ui.Dialog({
							title: 'Select Remote',
							fields: [
								{fieldname: 'remote_name', fieldtype: 'Select', 'options': r.message, 'reqd':1, 'label':'Select remote to pull and rebase from'}
							],
						});
						dialog.set_primary_action(__("Pull & Rebase"), () => {
							let key = frappe.datetime.get_datetime_as_string();
							console_dialog(key);
							frm.call("pull_rebase", {
								key: key,
								remote: dialog.fields_dict.remote_name.value
							}, () => {
								dialog.hide();
							});
						});
						dialog.show();
					}
				});
			}, __('Remote Operations'));
			
			frm.add_custom_button(__('Track Remote'), function(){
				frappe.call({
					method: 'bench_manager.bench_manager.doctype.app.app.get_remotes',
					args: {
						docname: frm.doc.name,
					},
					btn: this,
					callback: function(r) {
						var dialog = new frappe.ui.Dialog({
							title: 'Select Remote',
							fields: [
								{fieldname: 'branch_name', fieldtype: 'Data', 'reqd':1, 'label':'New branch name'},
								{fieldname: 'remote_name', fieldtype: 'Select', 'options': r.message, 'reqd':1, 'label':'Select remote to track'}
							],
						});
						dialog.set_primary_action(__("Track"), () => {
							let key = frappe.datetime.get_datetime_as_string();
							console_dialog(key);
							frm.call("console_command", {
								key: key,
								branch_name: dialog.fields_dict.branch_name.value,
								remote: dialog.fields_dict.remote_name.value,
								caller: "track-remote"
							}, () => {
								dialog.hide();
							});
						});
						dialog.show();
					}
				});
			}, __('Remote Operations'));
			
			// === BRANCH OPERATIONS GROUP ===
			frm.add_custom_button(__('Switch Branch'), function(){
				frappe.call({
					method: 'bench_manager.bench_manager.doctype.app.app.get_branches',
					args: {
						doctype: frm.doctype,
						docname: frm.doc.name,
						current_branch: frm.doc.current_git_branch
					},
					btn: this,
					callback: function(r) {
						if(!r.message) frappe.msgprint('This app has just one branch');
						else {
							var dialog = new frappe.ui.Dialog({
								title: 'Select Branch',
								fields: [
									{'fieldname': 'switchable_branches', 'fieldtype': 'Select', 'options': r.message, 'reqd':1, 'label':'Switchable branches'}
								],
							});
							dialog.set_primary_action(__("Switch"), () => {
								let key = frappe.datetime.get_datetime_as_string();
								console_dialog(key);
								frm.call("console_command", {
									key: key,
									branch_name: dialog.fields_dict.switchable_branches.value,
									caller: "switch_branch"
								}, () => {
									dialog.hide();
								});
							});
							dialog.show();
						}
					}
				});
			}, __('Branch Operations'));
			
			frm.add_custom_button(__('New Branch'), function(){
				var dialog = new frappe.ui.Dialog({
					title: 'Create New Branch',
					fields: [
						{'fieldname': 'new_branch_name', 'fieldtype': 'Data'}
					],
				});
				dialog.set_primary_action(__("Create"), () => {
					let key = frappe.datetime.get_datetime_as_string();
					console_dialog(key);
					frm.call("console_command", {
						key: key,
						branch_name: dialog.fields_dict.new_branch_name.value,
						caller: "new_branch"
					}, () => {
						dialog.hide();
					});
				});
				dialog.show();
			}, __('Branch Operations'));
			
			frm.add_custom_button(__('Delete Branch'), function(){
				frappe.call({
					method: 'bench_manager.bench_manager.doctype.app.app.get_branches',
					args: {
						doctype: frm.doctype,
						docname: frm.doc.name,
						current_branch: frm.doc.current_git_branch
					},
					btn: this,
					callback: function(r) {
						if(!r.message) frappe.msgprint('This app has just one branch');
						else {						
							var dialog = new frappe.ui.Dialog({
								title: 'Select Branch',
								fields: [
									{'fieldname': 'delete_branch_name', 'fieldtype': 'Select', options: r.message, label: 'Branch Name'}
								],
							});
							dialog.set_primary_action(__("Delete"), () => {
								let key = frappe.datetime.get_datetime_as_string();
								console_dialog(key);
								frm.call("console_command", {
									key: key,
									branch_name: dialog.fields_dict.delete_branch_name.value,
									caller: "delete_branch"
								}, () => {
									dialog.hide();
								});
							});
							dialog.show();
						}
					}
				});
			}, __('Branch Operations'));
		
		// === VERSION MANAGEMENT GROUP ===
		if (frm.doc.repository_url) {
			frm.add_custom_button(__('Sync Versions'), function(){
				frappe.confirm(
					__('Fetch latest versions and releases from GitHub?'),
					() => {
						frm.call('sync_versions_from_github').then(() => {
							frm.reload_doc();
						});
					}
				);
			}, __('Version Management'));
			
			frm.add_custom_button(__('Sync Branches'), function(){
				frm.call('sync_branches_from_github').then(() => {
					frm.reload_doc();
				});
			}, __('Version Management'));
		}
		
		if (frm.doc.versions && frm.doc.versions.length > 0) {
			frm.add_custom_button(__('Update to Version'), function(){
				let version_options = frm.doc.versions.map(v => ({
					label: `${v.version} ${v.is_current ? '(Current)' : ''} ${v.is_latest ? '(Latest)' : ''} ${v.is_prerelease ? '(Pre-release)' : ''}`,
					value: v.version,
					description: v.release_notes ? v.release_notes.substring(0, 100) + '...' : '',
					version_data: v
				}));
				
				let d = new frappe.ui.Dialog({
					title: __('Select Version to Install'),
					fields: [
						{
							fieldname: 'target_version',
							fieldtype: 'Select',
							label: 'Target Version',
							options: version_options.map(v => v.label),
							reqd: 1,
							onchange: function() {
								let selected = this.get_value();
								let version_data = version_options.find(v => v.label === selected);
								if (version_data && version_data.version_data.release_notes) {
									d.set_df_property('release_notes', 'options', 
										`<div class="form-message blue">${version_data.version_data.release_notes}</div>`);
								}
							}
						},
						{
							fieldname: 'release_notes',
							fieldtype: 'HTML',
							label: 'Release Notes'
						}
					],
					primary_action_label: __('Update'),
					primary_action: function(values) {
						let selected_label = values.target_version;
						let version_data = version_options.find(v => v.label === selected_label);
						
						if (!version_data) {
							frappe.msgprint(__('Please select a version'));
							return;
						}
						
						frappe.confirm(
							__('Update {0} to version {1}? This will restart the bench.', [frm.doc.name, version_data.value]),
							() => {
								let key = frappe.datetime.get_datetime_as_string();
								console_dialog(key);
								d.hide();
								frm.call('update_to_version', {
									key: key,
									target_version: version_data.value,
									target_tag: version_data.version_data.git_tag
								}).then(() => {
									setTimeout(() => {
										frappe.msgprint({
											title: __('Update Started'),
											message: __('Updating to version {0}...', [version_data.value]),
											indicator: 'green'
										});
										setTimeout(() => frm.reload_doc(), 5000);
									}, 2000);
								});
							}
						);
					}
				});
				d.show();
			}, __('Version Management'));
			
			frm.add_custom_button(__('Rollback'), function(){
				let installed_versions = frm.doc.versions.filter(v => v.status === 'Installed');
				if (installed_versions.length === 0) {
					frappe.msgprint(__('No previous versions available for rollback'));
					return;
				}
				
				let version_options = installed_versions.map(v => 
					`${v.version} (${v.git_hash.substring(0, 7)})`
				);
				
				frappe.prompt([
					{
						fieldname: 'rollback_version',
						fieldtype: 'Select',
						label: 'Rollback to Version',
						options: version_options,
						reqd: 1
					}
				], (values) => {
					let selected_version = installed_versions.find(v => 
						values.rollback_version.includes(v.version)
					);
					
					frappe.confirm(
						__('Rollback to version {0}? This will restart the bench.', [selected_version.version]),
						() => {
							let key = frappe.datetime.get_datetime_as_string();
							console_dialog(key);
							frm.call('rollback_to_version', {
								key: key,
								version_hash: selected_version.git_hash
							});
						}
					);
				}, __('Rollback to Previous Version'));
			}, __('Version Management'));
		}
		
		if (frm.doc.branches && frm.doc.branches.length > 0) {
			frm.add_custom_button(__('Switch Branch'), function(){
				let branch_options = frm.doc.branches.map(b => 
					`${b.branch_name} ${b.is_active ? '(Active)' : ''}`
				);
				
				frappe.prompt([
					{
						fieldname: 'target_branch',
						fieldtype: 'Select',
						label: 'Target Branch',
						options: branch_options,
						reqd: 1
					}
				], (values) => {
					let branch_name = values.target_branch.replace(' (Active)', '');
					
					frappe.confirm(
						__('Switch to branch {0}? This will restart the bench.', [branch_name]),
						() => {
							let key = frappe.datetime.get_datetime_as_string();
							console_dialog(key);
							frm.call('switch_branch_and_update', {
								key: key,
								branch_name: branch_name
							});
						}
					);
				}, __('Switch Branch'));
			}, __('Version Management'));
		}
		
		// === APP OPERATIONS GROUP ===
		frm.add_custom_button(__('Update App'), function(){
			frappe.confirm(
				__('This will pull the latest code from the current branch ({0}), rebuild assets, and restart the bench. Continue?', [frm.doc.current_git_branch]),
				() => {
					let key = frappe.datetime.get_datetime_as_string();
					console_dialog(key);
					frm.call("console_command", {
						key: key,
						caller: "update_app"
					}).then(() => {
						setTimeout(() => {
							frappe.msgprint({
								title: __('App Updated'),
								message: __('App {0} has been updated successfully. Reloading...', [frm.doc.name]),
								indicator: 'green'
							});
							setTimeout(() => frm.reload_doc(), 2000);
						}, 5000);
					});
				}
			);
		}, __('App Operations'));
		
		frm.add_custom_button(__('Install to Site'), function(){
			frappe.prompt([
				{
					fieldname: 'site',
					fieldtype: 'Link',
					options: 'Site',
					label: 'Select Site',
					reqd: 1
				}
			], (values) => {
				let key = frappe.datetime.get_datetime_as_string();
				console_dialog(key);
				frm.call("install_to_site", {
					key: key,
					site_name: values.site
				}).then(() => {
					setTimeout(() => {
						frappe.msgprint({
							title: __('App Installed'),
							message: __('App {0} has been installed to site {1}', [frm.doc.name, values.site]),
							indicator: 'green'
						});
					}, 3000);
				});
			}, __('Install App to Site'));
		}, __('App Operations'));
		
		frm.add_custom_button(__('Remove App'), function(){
			var dialog = new frappe.ui.Dialog({
				title: 'Remove App - Warning',
				fields: [
					{
						fieldname: 'warning',
						fieldtype: 'HTML',
						options: '<div style="padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107; margin-bottom: 15px;"><strong>⚠️ Warning:</strong> This will permanently remove the app <strong>' + frm.doc.name + '</strong> from the bench. This action cannot be undone!</div>'
					},
					{
						fieldname: 'force',
						fieldtype: 'Check',
						label: 'Force Remove (--force)',
						description: 'Use --force flag to bypass dependency checks'
					}
				]
			});
			dialog.set_primary_action(__('Remove'), () => {
				let key = frappe.datetime.get_datetime_as_string();
				console_dialog(key);
				dialog.hide();
				
				// Execute remove app command
				frm.call("console_command", {
					key: key,
					caller: "remove_app",
					force: dialog.fields_dict.force.value ? 1 : 0
				}).then(() => {
					// Wait for command to complete, then delete the doc
					setTimeout(() => {
						frappe.msgprint({
							title: __('App Removed'),
							message: __('App {0} has been removed from the bench. Deleting the document...', [frm.doc.name]),
							indicator: 'green'
						});
						// Delete the App document
						frappe.call({
							method: 'frappe.client.delete',
							args: {
								doctype: 'App',
								name: frm.doc.name
							},
							callback: function() {
								frappe.set_route('List', 'App');
							}
						});
					}, 3000); // Wait 3 seconds for remove command to complete
				});
			});
			dialog.show();
		}, __('App Operations'));
		}
	}
});
