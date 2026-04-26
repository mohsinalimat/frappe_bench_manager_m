<template>
  <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
    <!-- Top bar - Hidden on mobile, visible on md and above -->
    <div class="hidden md:block bg-gray-900 text-white py-2">
      <div class="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div class="max-w-[1800px] mx-auto flex items-center justify-between text-sm">
          <div class="flex items-center space-x-4">
            <router-link to="/" class="hover:text-gray-300 transition-colors">Home</router-link>
            <router-link to="/about" class="hover:text-gray-300 transition-colors">About</router-link>
            <router-link to="/contact" class="hover:text-gray-300 transition-colors">Contact</router-link>
            <router-link to="/community" class="hover:text-gray-300 transition-colors">Community</router-link>
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2 text-gray-300">
              <FeatherIcon name="phone" class="w-4 h-4" />
              <span>+91 120 492 7985</span>
            </div>
            <div class="flex items-center space-x-2 text-gray-300">
              <FeatherIcon name="mail" class="w-4 h-4" />
              <span>ping@worf.cloud</span>
            </div>
            <div class="flex items-center space-x-3">
              <template v-if="session.isLoggedIn">
                <router-link v-if="session.isDeveloper" to="/developer" class="hover:text-gray-300 transition-colors">Developer Portal</router-link>
                <router-link v-if="session.isMember" to="/dashboard" class="hover:text-gray-300 transition-colors">Dashboard</router-link>
                <Button @click="handleLogout" variant="ghost" size="sm" theme="gray" class="!text-white hover:!bg-white/10">Logout</Button>
              </template>
              <template v-else>
                <router-link to="/signin">
                  <Button variant="ghost" size="sm" theme="gray" class="!text-white hover:!bg-white/10">Sign In</Button>
                </router-link>
                <router-link to="/signup">
                  <Button variant="solid" size="sm" theme="gray" class="!bg-white !text-black hover:!bg-gray-200">Get Started</Button>
                </router-link>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main header -->
    <div class="py-3 md:py-4">
      <div class="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div class="max-w-[1800px] mx-auto flex items-center justify-between gap-4">
          <!-- Logo -->
          <router-link to="/" class="flex items-center flex-shrink-0">
            <img
              v-if="websiteSettings.data && websiteSettings.data.app_logo"
              :src="websiteSettings.data.app_logo.startsWith('/files/') ? websiteSettings.data.app_logo : `/files/${websiteSettings.data.app_logo}`"
              alt="Logo"
              class="h-10 md:h-12 w-auto max-w-40 md:max-w-48 object-contain"
            />
            <div v-else class="w-10 md:w-12 h-10 md:h-12 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center">
              <FeatherIcon name="package" class="w-5 md:w-7 h-5 md:h-7 text-white dark:text-gray-900" />
            </div>
          </router-link>

          <!-- Search bar - Hidden on mobile -->
          <div class="hidden md:flex flex-1 max-w-2xl xl:max-w-3xl">
            <SearchBar />
          </div>

          <!-- Navigation - Hidden on mobile -->
          <nav class="hidden lg:flex items-center space-x-6">
            <router-link to="/apps" class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Browse Apps</router-link>
            <router-link to="/category/featured" class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Categories</router-link>
            <router-link to="/store" class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">App Store</router-link>
            <router-link v-if="!session.isMember" to="/developer" class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">For Developers</router-link>
          </nav>

          <!-- Mobile menu button -->
          <Button @click="mobileMenuOpen = !mobileMenuOpen" variant="ghost" size="sm" theme="gray" class="lg:hidden">
            <template #icon>
              <FeatherIcon :name="mobileMenuOpen ? 'x' : 'menu'" class="w-5 h-5" />
            </template>
          </Button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div class="w-full px-4 sm:px-6 md:px-8 py-4 space-y-4">
        <!-- Mobile Navigation -->
        <router-link to="/apps" class="block py-3 text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800" @click="mobileMenuOpen = false">
          <div class="flex items-center space-x-3">
            <FeatherIcon name="grid" class="w-5 h-5" />
            <span>Browse Apps</span>
          </div>
        </router-link>
        <router-link to="/category/featured" class="block py-3 text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800" @click="mobileMenuOpen = false">
          <div class="flex items-center space-x-3">
            <FeatherIcon name="folder" class="w-5 h-5" />
            <span>Categories</span>
          </div>
        </router-link>
        <router-link to="/store" class="block py-3 text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800" @click="mobileMenuOpen = false">
          <div class="flex items-center space-x-3">
            <FeatherIcon name="shopping-bag" class="w-5 h-5" />
            <span>App Store</span>
          </div>
        </router-link>
        <router-link v-if="!session.isMember" to="/developer" class="block py-3 text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800" @click="mobileMenuOpen = false">
          <div class="flex items-center space-x-3">
            <FeatherIcon name="code" class="w-5 h-5" />
            <span>For Developers</span>
          </div>
        </router-link>

        <!-- Top bar links on mobile -->
        <div class="pt-4 border-t border-gray-200 dark:border-gray-800">
          <router-link to="/" class="block py-3 text-gray-700 dark:text-gray-300" @click="mobileMenuOpen = false">
            <div class="flex items-center space-x-3">
              <FeatherIcon name="home" class="w-5 h-5" />
              <span>Home</span>
            </div>
          </router-link>
          <router-link to="/about" class="block py-3 text-gray-700 dark:text-gray-300" @click="mobileMenuOpen = false">
            <div class="flex items-center space-x-3">
              <FeatherIcon name="info" class="w-5 h-5" />
              <span>About</span>
            </div>
          </router-link>
          <router-link to="/contact" class="block py-3 text-gray-700 dark:text-gray-300" @click="mobileMenuOpen = false">
            <div class="flex items-center space-x-3">
              <FeatherIcon name="message-circle" class="w-5 h-5" />
              <span>Contact</span>
            </div>
          </router-link>
        </div>

        <!-- Contact info on mobile -->
        <div class="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
          <a href="tel:+911204927985" class="block py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg px-3">
            <div class="flex items-center space-x-3">
              <FeatherIcon name="phone" class="w-5 h-5 text-green-600" />
              <span class="font-medium">+91 120 492 7985</span>
            </div>
          </a>
          <a href="mailto:ping@worf.cloud" class="block py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg px-3">
            <div class="flex items-center space-x-3">
              <FeatherIcon name="mail" class="w-5 h-5 text-blue-600" />
              <span class="font-medium">ping@worf.cloud</span>
            </div>
          </a>
        </div>

        <!-- Auth buttons on mobile -->
        <div class="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
          <template v-if="session.isLoggedIn">
            <router-link v-if="session.isDeveloper" to="/developer" class="block w-full" @click="mobileMenuOpen = false">
              <Button variant="outline" size="md" theme="gray" class="w-full">Developer Portal</Button>
            </router-link>
            <router-link v-if="session.isMember" to="/dashboard" class="block w-full" @click="mobileMenuOpen = false">
              <Button variant="outline" size="md" theme="gray" class="w-full">Dashboard</Button>
            </router-link>
            <Button @click="handleLogout" variant="ghost" size="md" theme="gray" class="w-full">Logout</Button>
          </template>
          <template v-else>
            <router-link to="/signin" class="block w-full" @click="mobileMenuOpen = false">
              <Button variant="outline" size="md" theme="gray" class="w-full">Sign In</Button>
            </router-link>
            <router-link to="/signup" class="block w-full" @click="mobileMenuOpen = false">
              <Button variant="solid" size="md" theme="gray" class="w-full">Get Started</Button>
            </router-link>
          </template>
        </div>

        <!-- Mobile Search -->
        <div class="pt-4 border-t border-gray-200 dark:border-gray-800">
          <Input type="text" placeholder="Search apps..." class="w-full" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import SearchBar from "@/components/SearchBar.vue"
import { session } from "@/data/session"
import { Button, FeatherIcon, Input, createResource } from "frappe-ui"
import { ref } from "vue"

const mobileMenuOpen = ref(false)

// Fetch Website Settings for logo and app name
const websiteSettings = createResource({
	url: "bench_manager.api.get_website_settings",
	auto: true,
	transform: (data) => data || null,
})

async function handleLogout() {
	await session.logout.submit()
}
</script>
