# Copyright (c) 2026, Frappe Technologies and contributors
# License: MIT. See LICENSE

import frappe
from frappe.model.document import Document


class DNSRecord(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		record_type: DF.Select
		name: DF.Data
		value: DF.Data
		priority: DF.Int
		ttl: DF.Int
		status: DF.Select
	# end: auto-generated types

	def validate(self):
		self.validate_record_type()
		self.validate_value()

	def before_save(self):
		"""Check if this is a new record or if it's being modified"""
		pass

	def validate_record_type(self):
		"""Validate record type specific requirements"""
		if self.record_type in ['MX', 'SRV'] and not self.priority:
			self.priority = 10

	def validate_value(self):
		"""Validate value based on record type"""
		if self.record_type == 'A':
			# Validate IPv4
			import ipaddress
			try:
				ipaddress.IPv4Address(self.value)
			except ValueError:
				frappe.throw(f"Invalid IPv4 address: {self.value}")
		
		elif self.record_type == 'AAAA':
			# Validate IPv6
			import ipaddress
			try:
				ipaddress.IPv6Address(self.value)
			except ValueError:
				frappe.throw(f"Invalid IPv6 address: {self.value}")
		
		elif self.record_type == 'CNAME':
			# Validate domain format
			import re
			if not re.match(r'^[a-z0-9.-]+\.[a-z]{2,}$', self.value.lower()):
				frappe.throw(f"Invalid CNAME value: {self.value}")

