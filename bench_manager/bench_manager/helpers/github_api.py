# Copyright (c) 2026, Frappe and contributors
# For license information, please see license.txt

import requests
import frappe
from urllib.parse import urlparse


class GitHubAPI:
	"""Helper class for GitHub API interactions"""
	
	def __init__(self, repo_url, token=None):
		self.repo_url = repo_url.rstrip('.git')
		self.token = token
		self.owner, self.repo = self.parse_repo_url()
		self.base_url = "https://api.github.com"
	
	def parse_repo_url(self):
		"""Parse GitHub URL to extract owner and repo name"""
		# Handle formats: https://github.com/owner/repo or git@github.com:owner/repo
		if 'github.com' not in self.repo_url:
			frappe.throw(f"Invalid GitHub URL: {self.repo_url}")
		
		if self.repo_url.startswith('git@'):
			# git@github.com:owner/repo.git
			parts = self.repo_url.split(':')[1].replace('.git', '').split('/')
		else:
			# https://github.com/owner/repo
			parsed = urlparse(self.repo_url)
			parts = parsed.path.strip('/').split('/')
		
		if len(parts) < 2:
			frappe.throw(f"Could not parse owner/repo from URL: {self.repo_url}")
		
		return parts[0], parts[1]
	
	def get_headers(self):
		"""Get headers for GitHub API requests"""
		headers = {
			'Accept': 'application/vnd.github.v3+json',
			'User-Agent': 'Frappe-Bench-Manager'
		}
		if self.token:
			headers['Authorization'] = f'token {self.token}'
		return headers
	
	def get_releases(self):
		"""Get all releases from GitHub"""
		url = f"{self.base_url}/repos/{self.owner}/{self.repo}/releases"
		try:
			response = requests.get(url, headers=self.get_headers(), timeout=30)
			response.raise_for_status()
			return response.json()
		except requests.exceptions.RequestException as e:
			frappe.log_error(f"GitHub API Error: {str(e)}", "GitHub Releases Fetch")
			return []
	
	def get_tags(self):
		"""Get all tags from GitHub"""
		url = f"{self.base_url}/repos/{self.owner}/{self.repo}/tags"
		try:
			response = requests.get(url, headers=self.get_headers(), timeout=30)
			response.raise_for_status()
			return response.json()
		except requests.exceptions.RequestException as e:
			frappe.log_error(f"GitHub API Error: {str(e)}", "GitHub Tags Fetch")
			return []
	
	def get_branches(self):
		"""Get all branches from GitHub"""
		url = f"{self.base_url}/repos/{self.owner}/{self.repo}/branches"
		try:
			response = requests.get(url, headers=self.get_headers(), timeout=30)
			response.raise_for_status()
			return response.json()
		except requests.exceptions.RequestException as e:
			frappe.log_error(f"GitHub API Error: {str(e)}", "GitHub Branches Fetch")
			return []
	
	def get_commit_info(self, sha):
		"""Get commit details"""
		url = f"{self.base_url}/repos/{self.owner}/{self.repo}/commits/{sha}"
		try:
			response = requests.get(url, headers=self.get_headers(), timeout=30)
			response.raise_for_status()
			return response.json()
		except requests.exceptions.RequestException as e:
			frappe.log_error(f"GitHub API Error: {str(e)}", "GitHub Commit Fetch")
			return None
	
	def get_release_by_tag(self, tag):
		"""Get release information for a specific tag"""
		url = f"{self.base_url}/repos/{self.owner}/{self.repo}/releases/tags/{tag}"
		try:
			response = requests.get(url, headers=self.get_headers(), timeout=30)
			if response.status_code == 200:
				return response.json()
			return None
		except requests.exceptions.RequestException:
			return None
	
	def check_rate_limit(self):
		"""Check GitHub API rate limit"""
		url = f"{self.base_url}/rate_limit"
		try:
			response = requests.get(url, headers=self.get_headers(), timeout=10)
			response.raise_for_status()
			data = response.json()
			return {
				'limit': data['rate']['limit'],
				'remaining': data['rate']['remaining'],
				'reset': data['rate']['reset']
			}
		except requests.exceptions.RequestException as e:
			frappe.log_error(f"GitHub API Error: {str(e)}", "GitHub Rate Limit Check")
			return None
