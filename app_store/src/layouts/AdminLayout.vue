<template>
  <div class="min-h-screen flex bg-appstore-bg-base">
    <!-- Sidebar -->
    <aside class="w-64 bg-appstore-bg-surface border-r border-appstore-border flex-shrink-0">
      <div class="p-4">
        <router-link to="/admin" class="flex items-center space-x-2 mb-6">
          <div class="w-8 h-8 bg-appstore-orange rounded-lg flex items-center justify-center">
            <Icon icon="lucide:shield" class="w-5 h-5 text-white" />
          </div>
          <span class="font-bold text-appstore-ink">Admin Panel</span>
        </router-link>

        <nav class="space-y-1">
          <router-link
            to="/admin"
            class="flex items-center space-x-3 px-3 py-2 rounded-appstore-md text-sm transition-colors"
            :class="isActive('/admin') && !isActive('/admin/') ? 'bg-appstore-orange text-white' : 'text-appstore-body hover:bg-appstore-bg-raised hover:text-appstore-ink'"
          >
            <Icon icon="lucide:layout-dashboard" class="w-5 h-5" />
            <span>Dashboard</span>
          </router-link>

          <router-link
            to="/admin/moderation"
            class="flex items-center space-x-3 px-3 py-2 rounded-appstore-md text-sm transition-colors"
            :class="isActive('/admin/moderation') ? 'bg-appstore-orange text-white' : 'text-appstore-body hover:bg-appstore-bg-raised hover:text-appstore-ink'"
          >
            <Icon icon="lucide:check-square" class="w-5 h-5" />
            <span>Moderation Queue</span>
          </router-link>

          <router-link
            to="/admin/users"
            class="flex items-center space-x-3 px-3 py-2 rounded-appstore-md text-sm transition-colors"
            :class="isActive('/admin/users') ? 'bg-appstore-orange text-white' : 'text-appstore-body hover:bg-appstore-bg-raised hover:text-appstore-ink'"
          >
            <Icon icon="lucide:users" class="w-5 h-5" />
            <span>User Management</span>
          </router-link>

          <router-link
            to="/admin/reports"
            class="flex items-center space-x-3 px-3 py-2 rounded-appstore-md text-sm transition-colors"
            :class="isActive('/admin/reports') ? 'bg-appstore-orange text-white' : 'text-appstore-body hover:bg-appstore-bg-raised hover:text-appstore-ink'"
          >
            <Icon icon="lucide:bar-chart-3" class="w-5 h-5" />
            <span>Reports</span>
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
              <div class="w-8 h-8 bg-appstore-orange rounded-full flex items-center justify-center text-white font-medium">
                A
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
import { computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const pageTitle = computed(() => {
	const titles = {
		"/admin": "Admin Dashboard",
		"/admin/moderation": "Moderation Queue",
		"/admin/users": "User Management",
		"/admin/reports": "Reports",
	}
	return titles[route.path] || "Admin Panel"
})

function isActive(path) {
	return route.path.startsWith(path)
}
</script>
