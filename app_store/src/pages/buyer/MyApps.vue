<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-white dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900 py-8">
    <div class="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div class="max-w-[1600px] mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            <FeatherIcon name="grid" class="w-4 h-4 mr-2" />
            My Apps
          </div>
          <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 dark:from-white dark:to-blue-300 bg-clip-text text-transparent mb-2">My Apps</h1>
          <p class="text-gray-600 dark:text-gray-400">Apps you own and have access to</p>
        </div>

        <!-- Loading State -->
        <div v-if="myApps.loading" class="flex justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>

        <!-- Empty State -->
        <div v-else-if="myApps.data && myApps.data.length === 0" class="text-center py-20">
          <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center">
            <FeatherIcon name="grid" class="w-12 h-12 text-blue-400" />
          </div>
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">You don't have any apps yet</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">Purchase or subscribe to apps to see them here</p>
          <router-link to="/apps">
            <Button variant="solid" class="!bg-gradient-to-r !from-blue-500 !to-indigo-500 !text-white !border-0 hover:!from-blue-600 hover:!to-indigo-600 !shadow-lg !shadow-blue-500/40">
              Browse Apps
            </Button>
          </router-link>
        </div>

        <!-- Apps Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <Card v-for="app in myApps.data" :key="app.name" class="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <div class="relative">
              <!-- App Image/Icon -->
              <div class="relative w-full h-40 rounded-t-xl flex items-center justify-center overflow-hidden" :style="{ backgroundColor: app.app_color || '#3b82f6' }">
                <img v-if="app.app_logo" :src="getFileUrl(app.app_logo)" :alt="app.app_title" class="w-full h-full object-cover" />
                <div v-else class="text-white text-5xl">{{ app.app_icon || '📦' }}</div>
                <!-- Status Badge -->
                <div class="absolute top-3 left-3">
                  <Badge :variant="getStatusVariant(app.status)" :theme="getStatusTheme(app.status)" class="text-xs">{{ app.status }}</Badge>
                </div>
              </div>
              
              <!-- Content -->
              <div class="p-4">
                <h3 class="font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {{ app.app_title || app.app_name }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 h-10">{{ app.app_description || 'No description available' }}</p>
                
                <!-- Meta -->
                <div class="flex items-center justify-between mb-3">
                  <Badge variant="subtle" theme="blue">{{ app.pricing_model }}</Badge>
                  <Badge v-if="app.subscription_type" variant="subtle" theme="indigo">{{ app.subscription_type }}</Badge>
                </div>
                
                <!-- License Key -->
                <div v-if="app.license_key" class="mb-3">
                  <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">License Key</div>
                  <div class="flex items-center gap-2">
                    <div class="flex-1 font-mono text-xs text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded truncate">{{ app.license_key }}</div>
                    <button @click="copyToClipboard(app.license_key)" class="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors" title="Copy license key">
                      <FeatherIcon name="copy" class="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                </div>
                
                <!-- Footer -->
                <div class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    <span v-if="app.expiry_date">Expires: {{ formatDate(app.expiry_date) }}</span>
                    <span v-else>Purchased: {{ formatDate(app.purchase_date) }}</span>
                  </div>
                  <router-link :to="`/app-store/${app.name}`">
                    <Button variant="solid" size="sm" class="!bg-gradient-to-r !from-blue-500 !to-indigo-500 !text-white hover:!from-blue-600 hover:!to-indigo-600">
                      Open
                    </Button>
                  </router-link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { createResource } from "frappe-ui"
import { Badge, Button, Card, FeatherIcon } from "frappe-ui"

const myApps = createResource({
	url: "bench_manager.api.get_my_apps",
	auto: true,
	transform: (data) => data || [],
})

function getFileUrl(filePath) {
	if (!filePath) return ""
	if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
		return filePath
	}
	if (filePath.startsWith("/files/")) {
		return filePath
	}
	return `/files/${filePath}`
}

function formatDate(date) {
	if (!date) return "N/A"
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	})
}

function getStatusVariant(status) {
	const variants = {
		Active: "subtle",
		Expired: "subtle",
		Cancelled: "subtle",
		Suspended: "subtle",
	}
	return variants[status] || "subtle"
}

function getStatusTheme(status) {
	const themes = {
		Active: "emerald",
		Expired: "red",
		Cancelled: "gray",
		Suspended: "orange",
	}
	return themes[status] || "gray"
}

function copyToClipboard(text) {
	navigator.clipboard.writeText(text).then(() => {
		// Could add a toast notification here
	})
}
</script>
