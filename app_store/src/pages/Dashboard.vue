<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Member Dashboard</h1>
        <p class="text-gray-600 dark:text-gray-400">Welcome back, {{ dashboardData?.member_data?.member_name || 'Member' }}</p>
      </div>

      <!-- Loading State -->
      <div v-if="dashboardResource.loading" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Dashboard Content -->
      <div v-else-if="dashboardData" class="space-y-6">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Purchases</p>
                <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {{ formatCurrency(dashboardData.member_data?.total_purchases || 0) }}
                </p>
              </div>
              <div class="bg-blue-100 dark:bg-blue-900/30 rounded-full p-3">
                <FeatherIcon name="shopping-cart" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Member Status</p>
                <p class="text-3xl font-bold mt-2" :class="getStatusColor(dashboardData.member_data?.member_status)">
                  {{ dashboardData.member_data?.member_status || 'Active' }}
                </p>
              </div>
              <div class="bg-green-100 dark:bg-green-900/30 rounded-full p-3">
                <FeatherIcon name="check-circle" class="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Member Since</p>
                <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {{ formatDate(dashboardData.member_data?.member_since) }}
                </p>
              </div>
              <div class="bg-purple-100 dark:bg-purple-900/30 rounded-full p-3">
                <FeatherIcon name="calendar" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Section -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Profile Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Full Name</label>
              <p class="text-lg text-gray-900 dark:text-white">{{ dashboardData.member_data?.member_name || '-' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Email</label>
              <p class="text-lg text-gray-900 dark:text-white">{{ dashboardData.member_data?.email || '-' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Phone</label>
              <p class="text-lg text-gray-900 dark:text-white">{{ dashboardData.member_data?.phone || '-' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Company</label>
              <p class="text-lg text-gray-900 dark:text-white">{{ dashboardData.member_data?.company || '-' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Designation</label>
              <p class="text-lg text-gray-900 dark:text-white">{{ dashboardData.member_data?.designation || '-' }}</p>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <router-link to="/apps" class="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div class="bg-blue-100 dark:bg-blue-900/30 rounded-full p-3 mr-4">
                <FeatherIcon name="package" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span class="font-medium text-gray-900 dark:text-white">Browse Apps</span>
            </router-link>
            <router-link to="/my-apps" class="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div class="bg-indigo-100 dark:bg-indigo-900/30 rounded-full p-3 mr-4">
                <FeatherIcon name="download" class="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span class="font-medium text-gray-900 dark:text-white">My Apps</span>
            </router-link>
            <router-link to="/purchases" class="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div class="bg-green-100 dark:bg-green-900/30 rounded-full p-3 mr-4">
                <FeatherIcon name="credit-card" class="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <span class="font-medium text-gray-900 dark:text-white">Purchase History</span>
            </router-link>
            <router-link to="/wishlist" class="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div class="bg-pink-100 dark:bg-pink-900/30 rounded-full p-3 mr-4">
                <FeatherIcon name="heart" class="w-5 h-5 text-pink-600 dark:text-pink-400" />
              </div>
              <span class="font-medium text-gray-900 dark:text-white">Wishlist</span>
            </router-link>
            <router-link to="/category/featured" class="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div class="bg-purple-100 dark:bg-purple-900/30 rounded-full p-3 mr-4">
                <FeatherIcon name="grid" class="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span class="font-medium text-gray-900 dark:text-white">Categories</span>
            </router-link>
            <router-link to="/settings" class="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div class="bg-gray-100 dark:bg-gray-700 rounded-full p-3 mr-4">
                <FeatherIcon name="settings" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <span class="font-medium text-gray-900 dark:text-white">Account Settings</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <p class="text-red-800 dark:text-red-300">Failed to load dashboard data. Please try refreshing the page.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FeatherIcon, createResource } from "frappe-ui"
import { computed, onMounted, ref } from "vue"

const dashboardResource = createResource({
	url: "bench_manager.api.get_member_dashboard",
	auto: true,
	onError(error) {
		console.error("Dashboard API error:", error)
	},
})

const dashboardData = computed(() => dashboardResource.data)

function formatCurrency(value) {
	if (!value) return "$0.00"
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(value)
}

function formatDate(dateString) {
	if (!dateString) return "-"
	const date = new Date(dateString)
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	})
}

function getStatusColor(status) {
	switch (status) {
		case "Active":
			return "text-green-600 dark:text-green-400"
		case "Suspended":
			return "text-yellow-600 dark:text-yellow-400"
		case "Inactive":
			return "text-red-600 dark:text-red-400"
		default:
			return "text-gray-600 dark:text-gray-400"
	}
}
</script>
