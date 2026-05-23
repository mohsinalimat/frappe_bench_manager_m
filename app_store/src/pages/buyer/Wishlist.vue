<template>
  <div class="min-h-screen bg-gradient-to-b from-violet-50 via-fuchsia-50 to-white dark:from-gray-900 dark:via-violet-900/20 dark:to-gray-900 py-8">
    <div class="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div class="max-w-[1600px] mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 text-pink-600 dark:text-pink-400 text-sm font-medium mb-4">
            <FeatherIcon name="heart" class="w-4 h-4 mr-2" />
            Wishlist
          </div>
          <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-pink-700 dark:from-white dark:to-pink-300 bg-clip-text text-transparent mb-2">My Wishlist</h1>
          <p class="text-gray-600 dark:text-gray-400">Apps you've saved for later</p>
        </div>

        <!-- Loading State -->
        <div v-if="wishlist.loading" class="flex justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </div>

        <!-- Empty State -->
        <div v-else-if="wishlist.data && wishlist.data.length === 0" class="text-center py-20">
          <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 rounded-full flex items-center justify-center">
            <FeatherIcon name="heart" class="w-12 h-12 text-pink-400" />
          </div>
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">Save apps you love by clicking the heart icon</p>
          <router-link to="/apps">
            <Button variant="solid" class="!bg-gradient-to-r !from-pink-500 !to-rose-500 !text-white !border-0 hover:!from-pink-600 hover:!to-rose-600 !shadow-lg !shadow-pink-500/40">
              Browse Apps
            </Button>
          </router-link>
        </div>

        <!-- Wishlist Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <Card v-for="app in wishlist.data" :key="app.name" class="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <div class="relative">
              <!-- App Image/Icon -->
              <div class="relative w-full h-40 rounded-t-xl flex items-center justify-center overflow-hidden" :style="{ backgroundColor: app.app_color || '#ec4899' }">
                <img v-if="app.app_logo" :src="getFileUrl(app.app_logo)" :alt="app.app_title" class="w-full h-full object-cover" />
                <div v-else class="text-white text-5xl">{{ app.app_icon || '📦' }}</div>
                <!-- Remove Button -->
                <button @click="removeFromWishlist(app.name)" class="absolute top-3 right-3 w-10 h-10 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors group-hover:scale-110">
                  <FeatherIcon name="trash-2" class="w-5 h-5 text-rose-500" />
                </button>
              </div>
              
              <!-- Content -->
              <div class="p-4">
                <h3 class="font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                  {{ app.app_title || app.app_name }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 h-10">{{ app.app_description || 'No description available' }}</p>
                
                <!-- Meta -->
                <div class="flex items-center justify-between mb-3">
                  <Badge variant="subtle" theme="pink">{{ app.pricing_model }}</Badge>
                  <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FeatherIcon name="star" class="w-4 h-4 mr-1 text-yellow-500" />
                    {{ app.rating || 'N/A' }}
                  </div>
                </div>
                
                <!-- Footer -->
                <div class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span class="font-bold text-gray-900 dark:text-white">{{ formatPrice(app.price, app.currency) }}</span>
                  <router-link :to="`/app-store/${app.name}`">
                    <Button variant="solid" size="sm" class="!bg-gradient-to-r !from-pink-500 !to-rose-500 !text-white hover:!from-pink-600 hover:!to-rose-600">
                      View
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

const wishlist = createResource({
	url: "bench_manager.api.get_wishlist",
	auto: true,
	transform: (data) => data || [],
})

function removeFromWishlist(appId) {
	if (confirm("Remove this app from your wishlist?")) {
		createResource({
			url: "bench_manager.api.remove_from_wishlist",
			makeParams: () => ({ app_id: appId }),
			onSuccess: () => {
				wishlist.reload()
			},
		}).fetch()
	}
}

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
</script>
