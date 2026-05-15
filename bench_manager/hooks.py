from . import __version__ as app_version

app_name = "bench_manager"
app_title = "Bench Manager"
app_publisher = "Frappe"
app_description = "GUI for using bench commands "
app_icon = "fa fa-gamepad"
app_color = "grey"
app_email = "info@frappe.io"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
app_include_css = "/assets/bench_manager/css/bench_manager.css"
app_include_js = "/assets/bench_manager/js/bench_manager.js"

# include js, css files in header of web template
# web_include_css = "/assets/bench_manager/css/bench_manager.css"
# web_include_js = "/assets/bench_manager/js/bench_manager.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
home_page = "home"

# website user home page (by Role)
role_home_page = {
	"System Manager": "home",
	"App Developer": "home",
	"App Buyer": "home",
	"Guest": "home",
	"Website User": "home",
}

# Website Route Rules - Frontend route rules for Vue SPA
# 
# IMPORTANT: This fixes 404 errors on page reload for Vue SPA routes.
# 
# When a user reloads a page like /apps or /category/featured, the server
# needs to know how to handle the request. Since these are client-side routes
# in the Vue router, they don't exist on the server. We map all these routes
# to the "home" page (www/home.html), which loads the Vue SPA. The Vue router
# then handles the actual routing on the client side.
#
# Pattern used: {"from_route": "/path", "to_route": "home"}
# For dynamic routes, use: {"from_route": "/path/<path:param>", "to_route": "home"}
#
# This approach is used by lending_manager and other Frappe apps with Vue SPAs.
website_route_rules = [
	# Public routes
	{"from_route": "/", "to_route": "home"},
	{"from_route": "/store", "to_route": "home"},
	{"from_route": "/apps", "to_route": "home"},
	{"from_route": "/app-store/<path:app_id>", "to_route": "home"},
	{"from_route": "/category/<path:slug>", "to_route": "home"},
	{"from_route": "/search", "to_route": "home"},
	{"from_route": "/about", "to_route": "home"},
	{"from_route": "/contact", "to_route": "home"},
	{"from_route": "/community", "to_route": "home"},
	{"from_route": "/terms", "to_route": "home"},
	{"from_route": "/privacy", "to_route": "home"},
	{"from_route": "/developer-policy", "to_route": "home"},
	{"from_route": "/buyer-policy", "to_route": "home"},
	{"from_route": "/refunds", "to_route": "home"},
	{"from_route": "/developer/<path:developerId>", "to_route": "home"},
	# SEO routes
	{"from_route": "/sitemap.xml", "to_route": "sitemap"},
	# Auth routes
	{"from_route": "/signin", "to_route": "home"},
	{"from_route": "/signup", "to_route": "home"},
	{"from_route": "/dashboard", "to_route": "home"},
	# Buyer routes
	{"from_route": "/my-apps", "to_route": "home"},
	{"from_route": "/purchases", "to_route": "home"},
	{"from_route": "/wishlist", "to_route": "home"},
	{"from_route": "/settings", "to_route": "home"},
	# Developer routes (static routes must come after dynamic routes)
	{"from_route": "/developer", "to_route": "home"},
	{"from_route": "/developer/apps", "to_route": "home"},
	{"from_route": "/developer/submit", "to_route": "home"},
	{"from_route": "/developer/apps/<path:app_id>/analytics", "to_route": "home"},
	{"from_route": "/developer/earnings", "to_route": "home"},
	{"from_route": "/developer/payouts", "to_route": "home"},
	# Admin routes
	{"from_route": "/admin", "to_route": "home"},
	{"from_route": "/admin/moderation", "to_route": "home"},
	{"from_route": "/admin/users", "to_route": "home"},
	{"from_route": "/admin/reports", "to_route": "home"},
]

# Website user home page (by function)
# get_website_user_home_page = "bench_manager.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "bench_manager.install.before_install"
# after_install = "bench_manager.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "bench_manager.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

scheduler_events = {
    "cron": {
		"*/15 * * * *": [
			"bench_manager.bench_manager.realtime_sync.check_and_sync_if_needed"
		],
		"*/5 * * * *": [
			"bench_manager.bench_manager.doctype.site.site.check_all_sites"
		],
		"*/1 * * * *": [
			"bench_manager.bench_manager.doctype.site_domain.site_domain.check_all_domain_verifications"
		]
	},
    "hourly": [
		"bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.auto_sync_all",
		"bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.cleanup_idle_ssh_connections"
	],
    "daily_long": [
		"bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.backup_sites_with_daily_option",
		"bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.dropbox_backup_sites_with_daily_option"
	],
    "monthly_long": [
		"bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.backup_sites_with_monthly_option",
		"bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.dropbox_backup_sites_with_weekly_option"
	],
    "weekly_long":[
        "bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.backup_sites_with_weekly_option",
        "bench_manager.bench_manager.doctype.bench_node_manager.bench_node_manager.dropbox_backup_sites_with_monthly_option"
	]
}

# Testing
# -------

# before_tests = "bench_manager.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "bench_manager.event.get_events"
# }
