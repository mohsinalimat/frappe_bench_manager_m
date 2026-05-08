# Copyright (c) 2026, Frappe and contributors
# For license information, please see license.txt

import re
from packaging import version


def parse_version(version_string):
	"""Parse version string and return normalized version"""
	if not version_string:
		return None
	
	# Remove 'v' prefix if present
	version_string = version_string.lstrip('v')
	
	try:
		return version.parse(version_string)
	except Exception:
		return None


def compare_versions(version1, version2):
	"""
	Compare two version strings
	Returns: 1 if version1 > version2, -1 if version1 < version2, 0 if equal
	"""
	v1 = parse_version(version1)
	v2 = parse_version(version2)
	
	if v1 is None or v2 is None:
		return 0
	
	if v1 > v2:
		return 1
	elif v1 < v2:
		return -1
	else:
		return 0


def is_valid_version(version_string):
	"""Check if version string is valid"""
	return parse_version(version_string) is not None


def extract_version_from_tag(tag_name):
	"""Extract version number from git tag"""
	# Handle formats: v1.0.0, version-15, 15.0.0, etc.
	patterns = [
		r'v?(\d+\.\d+\.\d+)',  # v1.0.0 or 1.0.0
		r'version-(\d+)',       # version-15
		r'v?(\d+\.\d+)',        # v1.0 or 1.0
	]
	
	for pattern in patterns:
		match = re.search(pattern, tag_name)
		if match:
			return match.group(1)
	
	return tag_name


def is_prerelease(version_string):
	"""Check if version is a pre-release (alpha, beta, rc, etc.)"""
	if not version_string:
		return False
	
	prerelease_keywords = ['alpha', 'beta', 'rc', 'dev', 'pre', 'preview']
	version_lower = version_string.lower()
	
	return any(keyword in version_lower for keyword in prerelease_keywords)


def get_latest_version(versions):
	"""Get the latest version from a list of version strings"""
	if not versions:
		return None
	
	valid_versions = []
	for v in versions:
		parsed = parse_version(v)
		if parsed:
			valid_versions.append((v, parsed))
	
	if not valid_versions:
		return None
	
	# Sort by parsed version and return the original string of the latest
	valid_versions.sort(key=lambda x: x[1], reverse=True)
	return valid_versions[0][0]
