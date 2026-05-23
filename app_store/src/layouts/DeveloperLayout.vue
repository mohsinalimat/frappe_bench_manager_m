<template>
  <div class="min-h-screen flex bg-appstore-bg-base">
    <!-- Sidebar -->
    <aside class="w-64 bg-appstore-bg-surface border-r border-appstore-border flex-shrink-0">
      <div class="p-4">
        <router-link to="/developer" class="flex items-center space-x-2 mb-6">
          <div class="w-8 h-8 bg-appstore-blue rounded-lg flex items-center justify-center">
            <Icon icon="lucide:store" class="w-5 h-5 text-white" />
          </div>
          <span class="font-bold text-appstore-ink">Developer Portal</span>
        </router-link>

        <nav class="space-y-1">
          <router-link
            to="/developer"
            class="flex items-center space-x-3 px-3 py-2 rounded-appstore-md text-sm transition-colors"
            :class="isActive('/developer') ? 'bg-appstore-blue text-white' : 'text-appstore-body hover:bg-appstore-bg-raised hover:text-appstore-ink'"
          >
            <Icon icon="lucide:layout-dashboard" class="w-5 h-5" />
            <span>Dashboard</span>
          </router-link>

          <router-link
            to="/developer/apps"
            class="flex items-center space-x-3 px-3 py-2 rounded-appstore-md text-sm transition-colors"
            :class="isActive('/developer/apps') ? 'bg-appstore-blue text-white' : 'text-appstore-body hover:bg-appstore-bg-raised hover:text-appstore-ink'"
          >
            <Icon icon="lucide:package" class="w-5 h-5" />
            <span>My Apps</span>
          </router-link>

          <router-link
            to="/developer/submit"
            class="flex items-center space-x-3 px-3 py-2 rounded-appstore-md text-sm transition-colors"
            :class="isActive('/developer/submit') ? 'bg-appstore-blue text-white' : 'text-appstore-body hover:bg-appstore-bg-raised hover:text-appstore-ink'"
          >
            <Icon icon="lucide:plus-circle" class="w-5 h-5" />
            <span>Submit App</span>
          </router-link>

          <router-link
            to="/developer/earnings"
            class="flex items-center space-x-3 px-3 py-2 rounded-appstore-md text-sm transition-colors"
            :class="isActive('/developer/earnings') ? 'bg-appstore-blue text-white' : 'text-appstore-body hover:bg-appstore-bg-raised hover:text-appstore-ink'"
          >
            <Icon icon="lucide:dollar-sign" class="w-5 h-5" />
            <span>Earnings</span>
          </router-link>

          <router-link
            to="/developer/payouts"
            class="flex items-center space-x-3 px-3 py-2 rounded-appstore-md text-sm transition-colors"
            :class="isActive('/developer/payouts') ? 'bg-appstore-blue text-white' : 'text-appstore-body hover:bg-appstore-bg-raised hover:text-appstore-ink'"
          >
            <Icon icon="lucide:banknote" class="w-5 h-5" />
            <span>Payouts</span>
          </router-link>
        </nav>
      </div>

      <div class="absolute bottom-0 w-64 p-4 border-t border-appstore-border">
        <router-link to="/" class="flex items-center space-x-3 text-sm text-appstore-body hover:text-appstore-ink transition-colors">
          <Icon icon="lucide:arrow-left" class="w-5 h-5" />
          <span>Back to Store</span>
        </router-link>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <!-- Top bar -->
      <header class="bg-appstore-bg-surface border-b border-appstore-border px-6 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-semibold text-appstore-ink">{{ pageTitle }}</h1>
          <div class="flex items-center space-x-4">
            <button class="p-2 text-appstore-body hover:text-appstore-ink transition-colors">
              <Icon icon="lucide:bell" class="w-5 h-5" />
            </button>
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-appstore-purple rounded-full flex items-center justify-center text-white font-medium">
                {{ userInitial }}
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 p-6 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { userResource } from "@/data/user"
import { computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const pageTitle = computed(() => {
	const titles = {
		"/developer": "Dashboard",
		"/developer/apps": "My Apps",
		"/developer/submit": "Submit App",
		"/developer/earnings": "Earnings",
		"/developer/payouts": "Payouts",
	}
	return titles[route.path] || "Developer Portal"
})

const userInitial = computed(() => {
	return userResource.data?.full_name?.charAt(0).toUpperCase() || "U"
})

function isActive(path) {
	return route.path.startsWith(path)
}
</script>
