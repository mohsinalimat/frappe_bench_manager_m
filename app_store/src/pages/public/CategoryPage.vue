<template>
  <div class="min-h-screen bg-gradient-to-b from-violet-50 via-fuchsia-50 to-white dark:from-gray-900 dark:via-violet-900/20 dark:to-gray-900 py-8">
    <div class="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div class="max-w-[1600px] mx-auto">
        <!-- Show Categories List -->
        <div v-if="!selectedCategory">
          <!-- Header -->
          <div class="mb-8">
            <div class="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-cyan-100 to-fuchsia-100 dark:from-cyan-900/30 dark:to-fuchsia-900/30 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-4">
              <FeatherIcon name="layers" class="w-4 h-4 mr-2" />
              Explore
            </div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-violet-700 dark:from-white dark:to-violet-300 bg-clip-text text-transparent mb-2">Browse Categories</h1>
            <p class="text-gray-600 dark:text-gray-400">Explore apps by category</p>
          </div>

          <!-- Loading State -->
          <div v-if="categories.loading" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
          </div>

          <!-- Categories Grid -->
          <div v-else-if="categories.data && categories.data.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <router-link
              v-for="(category, index) in categories.data"
              :key="category.name"
              :to="`/category/${category.slug || category.name}`"
              class="group"
            >
              <Card class="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100 dark:border-gray-700 cursor-pointer">
                <div class="p-6">
                  <!-- Icon -->
                  <div
                    class="w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform"
                    :class="getCategoryGradient(index)"
                  >
                    <FeatherIcon :name="category.icon || 'folder'" class="w-7 h-7 text-white" />
                  </div>

                  <!-- Category Name -->
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {{ category.category_name }}
                  </h3>

                  <!-- Description -->
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {{ category.description || 'No description' }}
                  </p>

                  <!-- App Count -->
                  <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FeatherIcon name="package" class="w-4 h-4 mr-1" />
                    <span>{{ category.app_count || 0 }} apps</span>
                  </div>
                </div>
              </Card>
            </router-link>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <FeatherIcon name="folder" class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Categories Found</h3>
            <p class="text-gray-600 dark:text-gray-400">Check back later for new categories.</p>
          </div>
        </div>

        <!-- Show Apps for Selected Category -->
        <div v-else>
          <!-- Header -->
          <div class="mb-8">
            <router-link to="/category/featured" class="inline-flex items-center text-cyan-600 hover:text-cyan-700 mb-4 font-medium">
              <FeatherIcon name="arrow-left" class="w-4 h-4 mr-2" />
              Back to Categories
            </router-link>
            <div class="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 dark:from-violet-900/30 dark:to-fuchsia-900/30 text-violet-600 dark:text-violet-400 text-sm font-medium mb-4">
              <FeatherIcon name="folder" class="w-4 h-4 mr-2" />
              {{ selectedCategory.category_name }}
            </div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-fuchsia-700 dark:from-white dark:to-fuchsia-300 bg-clip-text text-transparent mb-2">{{ selectedCategory.category_name }}</h1>
            <p class="text-gray-600 dark:text-gray-400">{{ selectedCategory.description }}</p>
          </div>

          <!-- Loading State -->
          <div v-if="apps.loading" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
          </div>

          <!-- Apps Grid -->
          <div v-else-if="apps.data && apps.data.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <router-link
              v-for="app in apps.data"
              :key="app.name"
              :to="`/app-store/${app.name}`"
              class="group"
            >
              <Card class="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer border border-gray-100 dark:border-gray-700">
                <div class="relative w-full h-32 rounded-lg mb-4 flex items-center justify-center overflow-hidden" :style="{ backgroundColor: app.app_color || '#3b82f6' }">
                  <img v-if="app.app_logo" :src="getFileUrl(app.app_logo)" :alt="app.app_title" class="w-full h-full object-cover" />
                  <div v-else class="text-white text-4xl">{{ app.app_icon || '📦' }}</div>
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                    <FeatherIcon name="arrow-right" class="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 class="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">{{ app.app_title || app.app_name }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{{ app.app_description || 'No description available' }}</p>
                <div class="flex items-center justify-between mb-2">
                  <Badge variant="subtle" theme="violet">{{ app.pricing_model }}</Badge>
                  <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <FeatherIcon name="star" class="w-4 h-4 mr-1 text-yellow-500" />
                    {{ app.rating || 'N/A' }}
                  </div>
                </div>
                <div class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span class="font-bold text-gray-900 dark:text-white">{{ formatPrice(app.price, app.currency) }}</span>
                  <Button variant="solid" size="sm" class="!bg-gradient-to-r !from-violet-600 !to-fuchsia-600 !text-white hover:!from-violet-700 hover:!to-fuchsia-700">View</Button>
                </div>
              </Card>
            </router-link>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <FeatherIcon name="package" class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Apps Found</h3>
            <p class="text-gray-600 dark:text-gray-400">No apps in this category yet.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Badge, Card, FeatherIcon, createResource } from "frappe-ui"
import { computed, onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const selectedCategory = ref(null)

const categories = createResource({
	url: "bench_manager.api.get_category_list",
	auto: true,
	transform: (data) => data || [],
})

const apps = createResource({
	url: "bench_manager.api.get_app_list",
	makeParams: () => ({
		filters: {
			category: selectedCategory.value?.name,
			is_published: 1,
			moderation_status: "Approved",
		},
		order_by: "rating desc, total_downloads desc",
		limit: 50,
	}),
	auto: false,
	transform: (data) => data || [],
})

watch(
	() => route.params.slug,
	(newSlug) => {
		if (newSlug && newSlug !== "featured") {
			const category = categories.data?.find(
				(c) => c.slug === newSlug || c.name === newSlug,
			)
			if (category) {
				selectedCategory.value = category
				apps.fetch()
			}
		} else {
			selectedCategory.value = null
		}
	},
	{ immediate: true },
)

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

function getCategoryGradient(index) {
	const gradients = [
		"bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30",
		"bg-gradient-to-br from-fuchsia-500 to-pink-600 shadow-lg shadow-fuchsia-500/30",
		"bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30",
		"bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30",
		"bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/30",
		"bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg shadow-rose-500/30",
	]
	return gradients[index % gradients.length]
}
</script>
