# Copyright (c) 2026, Amit Kumar and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import slug

class AppCategory(Document):
	def before_save(self):
		self.generate_slug()
	
	def generate_slug(self):
		if not self.slug:
			base_slug = slug(self.category_name)
			self.slug = base_slug
			counter = 1
			# Ensure slug is unique
			while frappe.db.exists("App Category", {"slug": self.slug}):
				self.slug = f"{base_slug}-{counter}"
				counter += 1
	
	def on_update(self):
		self.update_app_count()
	
	def update_app_count(self):
		"""Update the count of apps in this category"""
		app_count = frappe.db.count("App", {
			"category": self.name,
			"is_published": 1,
			"moderation_status": "Approved"
		})
		self.db_set("app_count", app_count, update_modified=False)
		
		# Update total downloads
		total_downloads = frappe.db.get_value("App", {
			"category": self.name,
			"is_published": 1,
			"moderation_status": "Approved"
		}, "sum(total_downloads)") or 0
		self.db_set("total_downloads", total_downloads, update_modified=False)
	
	def after_delete(self):
		"""Update parent category if this was a child"""
		if self.parent_category:
			parent = frappe.get_doc("App Category", self.parent_category)
			parent.update_app_count()
