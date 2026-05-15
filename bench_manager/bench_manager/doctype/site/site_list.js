frappe.listview_settings['Site'] = {
	add_fields: ['status'],
	formatters: {
		app_list: function(val) {
			return val.split('\n').join(', ');
		},
		site_alias: function(val) {
			return val.split('\n').join(', ');
		}	
	},
	get_indicator: function(doc) {
		if (doc.status === 'Online') {
			return [__('Online'), 'green', 'status,=,Online'];
		} else if (doc.status === 'Offline') {
			return [__('Offline'), 'red', 'status,=,Offline'];
		} else if (doc.status === 'Error') {
			return [__('Error'), 'orange', 'status,=,Error'];
		} else {
			return [__('Unknown'), 'gray', 'status,=,Unknown'];
		}
	},
	refresh: () => {
		setTimeout( () => {
			$("input.list-select-all.hidden-xs").hide()
		}, 500);
		setTimeout( () => {
			$("input.list-row-checkbox.hidden-xs").hide()
		}, 500);
	}
};