# Copyright (c) 2026, Frappe Technologies and contributors
# License: MIT. See LICENSE

from frappe.model.document import Document


class SiteDomainLink(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		site: DF.Link
		subdomain: DF.Data
		full_domain: DF.Data
		status: DF.Select
	# end: auto-generated types

	pass
