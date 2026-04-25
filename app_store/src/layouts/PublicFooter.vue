<template>
  <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
    <div class="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12">
      <div class="max-w-[1600px] mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center mb-4">
            <img
              v-if="websiteSettings.data && websiteSettings.data.app_logo"
              :src="websiteSettings.data.app_logo.startsWith('/files/') ? websiteSettings.data.app_logo : `/files/${websiteSettings.data.app_logo}`"
              alt="Logo"
              class="h-10 w-auto max-w-40 object-contain"
            />
            <div v-else class="w-10 h-10 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center">
              <FeatherIcon name="package" class="w-6 h-6 text-white dark:text-gray-900" />
            </div>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Discover, purchase, and manage Frappe applications for your business needs.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <FeatherIcon name="github" class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <FeatherIcon name="twitter" class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <FeatherIcon name="linkedin" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Marketplace -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Marketplace</h3>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li><router-link to="/apps" class="hover:text-gray-900 dark:hover:text-white transition-colors">Browse Apps</router-link></li>
            <li><router-link to="/category/featured" class="hover:text-gray-900 dark:hover:text-white transition-colors">Categories</router-link></li>
            <li><router-link to="/search" class="hover:text-gray-900 dark:hover:text-white transition-colors">Search</router-link></li>
            <li><router-link to="/developer" class="hover:text-gray-900 dark:hover:text-white transition-colors">For Developers</router-link></li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li><router-link to="/about" class="hover:text-gray-900 dark:hover:text-white transition-colors">About Us</router-link></li>
            <li><router-link to="/contact" class="hover:text-gray-900 dark:hover:text-white transition-colors">Contact</router-link></li>
            <li><a href="#" class="hover:text-gray-900 dark:hover:text-white transition-colors">Documentation</a></li>
            <li><a href="#" class="hover:text-gray-900 dark:hover:text-white transition-colors">API Reference</a></li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li><router-link to="/terms" class="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</router-link></li>
            <li><router-link to="/privacy" class="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</router-link></li>
            <li><router-link to="/developer-policy" class="hover:text-gray-900 dark:hover:text-white transition-colors">Developer Policy</router-link></li>
            <li><router-link to="/buyer-policy" class="hover:text-gray-900 dark:hover:text-white transition-colors">Buyer Policy</router-link></li>
            <li><router-link to="/refunds" class="hover:text-gray-900 dark:hover:text-white transition-colors">Refunds & Cancellations</router-link></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; {{ currentYear }} {{ websiteSettings.data?.app_name || 'Frappe App Store' }}. All rights reserved.</p>
      </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { FeatherIcon, createResource } from "frappe-ui"
import { computed } from "vue"

const currentYear = computed(() => new Date().getFullYear())

// Fetch Website Settings for logo and app name
const websiteSettings = createResource({
	url: "bench_manager.api.get_website_settings",
	auto: true,
	transform: (data) => data || null,
})
</script>
