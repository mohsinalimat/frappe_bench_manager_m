# Copyright (c) 2026, Amit Kumar and contributors
# For license information, please see license.txt

import frappe
from frappe.tests.utils import FrappeTestCase


class TestAppDeveloper(FrappeTestCase):
	def test_developer_creation(self):
		developer = frappe.get_doc({
			"doctype": "App Developer",
			"developer_name": "test_dev",
			"full_name": "Test Developer",
			"email": "test@example.com"
		})
		developer.insert()
		self.assertTrue(developer.name)
	
	def test_duplicate_email(self):
		developer1 = frappe.get_doc({
			"doctype": "App Developer",
			"developer_name": "test_dev1",
			"full_name": "Test Developer 1",
			"email": "duplicate@example.com"
		})
		developer1.insert()
		
		developer2 = frappe.get_doc({
			"doctype": "App Developer",
			"developer_name": "test_dev2",
			"full_name": "Test Developer 2",
			"email": "duplicate@example.com"
		})
		
		with self.assertRaises(frappe.ValidationError):
			developer2.insert()
