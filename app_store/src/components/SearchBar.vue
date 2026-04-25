<template>
  <div class="relative w-full">
    <Input
      v-model="searchQuery"
      type="text"
      placeholder="Search apps..."
      class="w-full"
      @focus="showResults = true"
      ref="searchInput"
    >
      <template #prefix>
        <FeatherIcon name="search" class="w-4 h-4" />
      </template>
    </Input>

    <!-- Search Results Dropdown -->
    <div
      v-if="showResults && (searchResults.length > 0 || searchQuery.length >= 2)"
      class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[500px] overflow-hidden z-50"
    >
      <!-- Tabs -->
      <div class="flex border-b border-gray-200 dark:border-gray-700">
        <button
          @click="searchType = 'apps'"
          :class="[
            'flex-1 px-4 py-3 text-sm font-medium transition-colors',
            searchType === 'apps'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          ]"
        >
          Apps
        </button>
        <button
          @click="searchType = 'developers'"
          :class="[
            'flex-1 px-4 py-3 text-sm font-medium transition-colors',
            searchType === 'developers'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          ]"
        >
          Developers
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="p-6 text-center text-gray-600 dark:text-gray-400">
        <FeatherIcon name="loader" class="w-6 h-6 animate-spin inline-block mr-2" />
        <span class="text-sm">Searching {{ searchType }}...</span>
      </div>

      <!-- No Results -->
      <div v-else-if="searchResults.length === 0 && searchQuery.length >= 2" class="p-8 text-center">
        <FeatherIcon name="search" class="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
        <p class="text-gray-600 dark:text-gray-400">No {{ searchType }} found for "{{ searchQuery }}"</p>
      </div>

      <!-- Results -->
      <div v-else class="overflow-y-auto max-h-[400px]">
        <!-- App Results -->
        <template v-if="searchType === 'apps'">
          <router-link
            v-for="app in searchResults"
            :key="app.name"
            :to="`/app-store/${app.name}`"
            class="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0"
            @click="showResults = false; searchQuery = ''"
          >
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm"
              :style="{ backgroundColor: app.app_color || '#3b82f6' }"
            >
              <img
                v-if="app.app_logo"
                :src="getFileUrl(app.app_logo)"
                :alt="app.app_title"
                class="w-full h-full object-cover"
              />
              <div v-else class="text-white text-xl">{{ app.app_icon || '📦' }}</div>
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-gray-900 dark:text-white truncate">{{ app.app_title || app.app_name }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ app.app_description || 'No description' }}</div>
              <div class="flex items-center gap-2 mt-1">
                <Badge variant="subtle" theme="blue" size="sm">{{ app.pricing_model }}</Badge>
                <span class="text-xs text-gray-400">★ {{ app.rating || '0' }}</span>
              </div>
            </div>
          </router-link>
        </template>

        <!-- Developer Results -->
        <template v-else>
          <router-link
            v-for="developer in searchResults"
            :key="developer.name"
            :to="`/developer/${developer.name}`"
            class="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0"
            @click="showResults = false; searchQuery = ''"
          >
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 shadow-sm"
            >
              <img
                v-if="developer.avatar"
                :src="getFileUrl(developer.avatar)"
                :alt="developer.full_name"
                class="w-full h-full object-cover"
              />
              <div v-else class="text-white text-lg font-semibold">
                {{ (developer.full_name || developer.developer_name || 'D').charAt(0).toUpperCase() }}
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <div class="font-semibold text-gray-900 dark:text-white truncate">
                  {{ developer.full_name || developer.developer_name }}
                </div>
                <FeatherIcon v-if="developer.is_verified" name="check-circle" class="w-4 h-4 text-blue-500 flex-shrink-0" />
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ developer.company_name || 'Independent Developer' }}</div>
              <div class="flex items-center gap-3 mt-1 text-xs text-gray-400">
                <span>{{ developer.total_apps || 0 }} apps</span>
                <span>•</span>
                <span>{{ developer.total_downloads || 0 }} downloads</span>
              </div>
            </div>
          </router-link>
        </template>
      </div>

      <!-- View All Link -->
      <router-link
        v-if="searchResults.length > 0"
        :to="`/search?type=${searchType}&q=${searchQuery}`"
        class="block p-4 text-center text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-t border-gray-200 dark:border-gray-700 font-medium text-sm"
        @click="showResults = false"
      >
        View all {{ searchType }} for "{{ searchQuery }}" →
      </router-link>
    </div>

    <!-- Click outside to close -->
    <div
      v-if="showResults"
      class="fixed inset-0 z-40"
      @click="showResults = false"
    ></div>
  </div>
</template>

<script setup>
import { Badge, FeatherIcon, Input, createResource } from "frappe-ui"
import { computed, onMounted, onUnmounted, ref, watch } from "vue"

const searchQuery = ref("")
const searchType = ref("apps")
const showResults = ref(false)
const searchInput = ref(null)

const searchApps = createResource({
	url: "bench_manager.api.search_apps",
	makeParams: () => ({
		query: searchQuery.value,
		limit: 5,
	}),
	auto: false,
	transform: (data) => data || [],
})

const searchDevelopers = createResource({
	url: "bench_manager.api.search_developers",
	makeParams: () => ({
		query: searchQuery.value,
		limit: 5,
	}),
	auto: false,
	transform: (data) => data || [],
})

let debounceTimer = null

const handleSearch = () => {
	clearTimeout(debounceTimer)

	if (searchQuery.value.length < 2) {
		searchResults.value = []
		return
	}

	debounceTimer = setTimeout(() => {
		if (searchType.value === "apps") {
			searchApps.fetch()
		} else {
			searchDevelopers.fetch()
		}
	}, 300)
}

const searchResults = ref([])

const isLoading = computed(() => {
	return searchType.value === "apps"
		? searchApps.loading
		: searchDevelopers.loading
})

watch(
	() => searchApps.data,
	(newData) => {
		if (searchType.value === "apps") {
			searchResults.value = newData
		}
	},
)

watch(
	() => searchDevelopers.data,
	(newData) => {
		if (searchType.value === "developers") {
			searchResults.value = newData
		}
	},
)

watch(searchType, () => {
	searchResults.value = []
	if (searchQuery.value.length >= 2) {
		handleSearch()
	}
})

watch(searchQuery, () => {
	handleSearch()
})

const getFileUrl = (filePath) => {
	if (!filePath) return ""
	const path = filePath.startsWith("/") ? filePath.slice(1) : filePath
	return `/files/${path}`
}

const handleKeydown = (e) => {
	if (e.key === "Escape") {
		showResults.value = false
	}
}

onMounted(() => {
	document.addEventListener("keydown", handleKeydown)
})

onUnmounted(() => {
	document.removeEventListener("keydown", handleKeydown)
	clearTimeout(debounceTimer)
})
</script>
