<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div class="max-w-[1600px] mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Browse Apps</h1>
        
        <!-- Search and Filters -->
        <div class="bg-white rounded-lg shadow p-6 mb-8">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <TextInput
                v-model="searchQuery"
                placeholder="Search apps..."
                @input="debouncedSearch"
              />
            </div>
            <select
              v-model="selectedCategory"
              class="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
              @change="fetchApps"
            >
              <option value="">All Categories</option>
              <option v-for="cat in categories.data || []" :key="cat.name" :value="cat.name">
                {{ cat.category_name }}
              </option>
            </select>
            <select
              v-model="selectedPricingModel"
              class="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
              @change="fetchApps"
            >
              <option value="">All Pricing Models</option>
              <option value="One-time">One-time</option>
              <option value="Subscription">Subscription</option>
            </select>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="apps.loading" class="text-center py-12">
          <p class="text-gray-600">Loading apps...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="apps.error" class="text-center py-12">
          <p class="text-red-600">Failed to load apps: {{ apps.error }}</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="!apps.data || apps.data.length === 0" class="text-center py-12">
          <p class="text-gray-600">No apps found</p>
        </div>

        <!-- App Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          <Card v-for="app in apps.data" :key="app.name" class="hover:shadow-lg transition-shadow cursor-pointer" @click="goToApp(app.name)">
            <div class="w-full h-32 rounded-lg mb-4 flex items-center justify-center overflow-hidden" :style="{ backgroundColor: app.app_color || '#3b82f6' }">
              <img v-if="app.app_logo" :src="getFileUrl(app.app_logo)" :alt="app.app_title" class="w-full h-full object-cover" />
              <div v-else class="text-white text-4xl">{{ app.app_icon || '📦' }}</div>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">{{ app.app_title || app.app_name }}</h3>
            <p class="text-sm text-gray-600 mb-4 line-clamp-2">{{ app.app_description || 'No description available' }}</p>
            <div class="flex items-center justify-between mb-2">
              <Badge variant="subtle" theme="blue">{{ app.pricing_model }}</Badge>
              <div class="flex items-center text-sm text-gray-600">
                <FeatherIcon name="star" class="w-4 h-4 mr-1 text-yellow-500" />
                {{ app.rating || 'N/A' }}
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="font-bold text-gray-900">{{ formatPrice(app.price, app.currency) }}</span>
              <Button variant="solid" size="sm" @click.stop="goToApp(app.name)">View Details</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Badge, Button, TextInput, createResource } from "frappe-ui"
import { ref, watch } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const searchQuery = ref("")
const selectedCategory = ref("")
const selectedPricingModel = ref("")

// Fetch categories using custom whitelisted API
const categories = createResource({
	url: "bench_manager.api.get_category_list",
	makeParams: () => ({
		order_by: "display_order",
	}),
	auto: true,
	transform: (data) => data || [],
})

// Fetch apps using custom whitelisted API with dynamic filters
const apps = createResource({
	url: "bench_manager.api.get_app_list",
	makeParams: () => ({
		filters: buildFilters(),
		order_by: "total_downloads desc",
	}),
	auto: true,
	transform: (data) => data || [],
})

// Watch for filter changes and refetch
watch([searchQuery, selectedCategory, selectedPricingModel], () => {
	apps.fetch()
})

function buildFilters() {
	const filters = {
		is_published: 1,
		moderation_status: "Approved",
	}

	if (selectedCategory.value) {
		filters.category = selectedCategory.value
	}

	if (selectedPricingModel.value) {
		filters.pricing_model = selectedPricingModel.value
	}

	return filters
}

// Debounced search
let searchTimeout
function debouncedSearch() {
	clearTimeout(searchTimeout)
	searchTimeout = setTimeout(() => {
		apps.fetch()
	}, 500)
}

function goToApp(appId) {
	router.push(`/app-store/${appId}`)
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

function getFileUrl(filePath) {
	if (!filePath) return ""
	// If it's already a full URL, return as is
	if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
		return filePath
	}
	// If it starts with /files/, return as is (Frappe serves files at /files/)
	if (filePath.startsWith("/files/")) {
		return filePath
	}
	// Otherwise, assume it's a relative path and prepend /files/
	return `/files/${filePath}`
}
</script>
