<template>
  <div class="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-white dark:from-gray-900 dark:via-emerald-900/20 dark:to-gray-900 py-8">
    <div class="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div class="max-w-[1600px] mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
            <FeatherIcon name="shopping-bag" class="w-4 h-4 mr-2" />
            Purchases
          </div>
          <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-emerald-700 dark:from-white dark:to-emerald-300 bg-clip-text text-transparent mb-2">Purchase History</h1>
          <p class="text-gray-600 dark:text-gray-400">Your app purchases and subscriptions</p>
        </div>

        <!-- Loading State -->
        <div v-if="purchases.loading" class="flex justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>

        <!-- Empty State -->
        <div v-else-if="purchases.data && purchases.data.length === 0" class="text-center py-20">
          <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-full flex items-center justify-center">
            <FeatherIcon name="shopping-bag" class="w-12 h-12 text-emerald-400" />
          </div>
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No purchases yet</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">Browse our marketplace to find apps for your needs</p>
          <router-link to="/apps">
            <Button variant="solid" class="!bg-gradient-to-r !from-emerald-500 !to-green-500 !text-white !border-0 hover:!from-emerald-600 hover:!to-green-600 !shadow-lg !shadow-emerald-500/40">
              Browse Apps
            </Button>
          </router-link>
        </div>

        <!-- Purchase List -->
        <div v-else class="space-y-4">
          <Card v-for="app in purchases.data" :key="app.name" class="group hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <div class="flex flex-col md:flex-row gap-4 p-4">
              <!-- App Image/Icon -->
              <div class="w-full md:w-32 h-32 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0" :style="{ backgroundColor: app.app_color || '#10b981' }">
                <img v-if="app.app_logo" :src="getFileUrl(app.app_logo)" :alt="app.app_title" class="w-full h-full object-cover" />
                <div v-else class="text-white text-4xl">{{ app.app_icon || '📦' }}</div>
              </div>
              
              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 class="font-bold text-gray-900 dark:text-white text-lg mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {{ app.app_title || app.app_name }}
                    </h3>
                    <div class="flex flex-wrap gap-2">
                      <Badge :variant="getStatusVariant(app.status)" :theme="getStatusTheme(app.status)">{{ app.status }}</Badge>
                      <Badge variant="subtle" theme="emerald">{{ app.pricing_model }}</Badge>
                      <Badge v-if="app.subscription_type" variant="subtle" theme="green">{{ app.subscription_type }}</Badge>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="font-bold text-gray-900 dark:text-white text-lg">{{ formatPrice(app.price, app.currency) }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(app.purchase_date) }}</div>
                  </div>
                </div>

                <!-- Details -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <!-- License Key -->
                  <div v-if="app.license_key" class="flex items-center gap-2">
                    <FeatherIcon name="key" class="w-4 h-4 text-emerald-500" />
                    <div class="flex-1 min-w-0">
                      <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">License Key</div>
                      <div class="font-mono text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded truncate">{{ app.license_key }}</div>
                    </div>
                    <button @click="copyToClipboard(app.license_key)" class="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors" title="Copy license key">
                      <FeatherIcon name="copy" class="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  <!-- Expiry Date -->
                  <div v-if="app.expiry_date" class="flex items-center gap-2">
                    <FeatherIcon name="calendar" class="w-4 h-4 text-emerald-500" />
                    <div>
                      <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Expiry Date</div>
                      <div class="text-sm text-gray-900 dark:text-white">{{ formatDate(app.expiry_date) }}</div>
                    </div>
                  </div>

                  <!-- Subscription Dates -->
                  <div v-if="app.subscription_start_date && app.subscription_end_date" class="flex items-center gap-2 md:col-span-2">
                    <FeatherIcon name="clock" class="w-4 h-4 text-emerald-500" />
                    <div class="flex-1">
                      <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Subscription Period</div>
                      <div class="text-sm text-gray-900 dark:text-white">
                        {{ formatDate(app.subscription_start_date) }} - {{ formatDate(app.subscription_end_date) }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <router-link :to="`/app-store/${app.name}`">
                    <Button variant="solid" size="sm" class="!bg-gradient-to-r !from-emerald-500 !to-green-500 !text-white hover:!from-emerald-600 hover:!to-green-600">
                      View Details
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

const purchases = createResource({
	url: "bench_manager.api.get_purchase_history",
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

function formatPrice(price, currency = "USD") {
	if (!price) return "Free"
	const symbols = {
		USD: "$",
		EUR: "€",
		GBP: "£",
		INR: "₹",
	}
	const symbol = symbols[currency] || "$"
	return `${symbol}${price}`
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
