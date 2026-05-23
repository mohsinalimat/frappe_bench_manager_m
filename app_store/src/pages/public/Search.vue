<template>
  <div class="py-8">
    <div class="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div class="max-w-[1600px] mx-auto">
        <!-- Search Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Search</h1>
          <p class="text-gray-600 dark:text-gray-400">Find apps and developers</p>
        </div>

        <!-- Search Input -->
        <div class="mb-8">
          <Input
            v-model="searchQuery"
            type="text"
            placeholder="Search apps or developers..."
            class="w-full max-w-2xl"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <FeatherIcon name="search" class="w-4 h-4" />
            </template>
          </Input>
        </div>

        <!-- Tabs -->
        <div class="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            @click="searchType = 'apps'"
            :class="[
              'px-4 py-3 text-sm font-medium transition-colors',
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
              'px-4 py-3 text-sm font-medium transition-colors',
              searchType === 'developers'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            ]"
          >
            Developers
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="search.loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
        </div>

        <!-- No Results -->
        <div v-else-if="searchResults.length === 0 && hasSearched" class="text-center py-12">
          <FeatherIcon name="search" class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Results Found</h3>
          <p class="text-gray-600 dark:text-gray-400">
            {{ searchQuery ? `No ${searchType} found for "${searchQuery}"` : 'Enter a search term to find apps or developers' }}
          </p>
        </div>

        <!-- Results -->
        <div v-else-if="hasSearched">
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Found {{ searchResults.length }} {{ searchType }} for "{{ searchQuery }}"
          </p>

          <!-- App Results -->
          <div v-if="searchType === 'apps'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <router-link
              v-for="app in searchResults"
              :key="app.name"
              :to="`/app-store/${app.name}`"
              class="group"
            >
              <Card class="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <div class="p-6">
                  <!-- Icon -->
                  <div
                    class="w-16 h-16 rounded-xl flex items-center justify-center mb-4 overflow-hidden"
                    :style="{ backgroundColor: app.app_color || '#3b82f6' }"
                  >
                    <img
                      v-if="app.app_logo"
                      :src="getFileUrl(app.app_logo)"
                      :alt="app.app_title"
                      class="w-full h-full object-cover"
                    />
                    <div v-else class="text-white text-2xl">{{ app.app_icon || '📦' }}</div>
                  </div>

                  <!-- Title -->
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {{ app.app_title || app.app_name }}
                  </h3>

                  <!-- Description -->
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {{ app.app_description || 'No description' }}
                  </p>

                  <!-- Meta -->
                  <div class="flex items-center gap-3 text-sm">
                    <Badge variant="subtle" theme="blue">{{ app.pricing_model }}</Badge>
                    <span class="text-gray-400">★ {{ app.rating || '0' }}</span>
                    <span class="text-gray-400">↓ {{ app.total_downloads || 0 }}</span>
                  </div>
                </div>
              </Card>
            </router-link>
          </div>

          <!-- Developer Results -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <router-link
              v-for="developer in searchResults"
              :key="developer.name"
              :to="`/developer/${developer.developer_name}`"
              class="group"
            >
              <Card class="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <div class="p-6">
                  <!-- Avatar -->
                  <div
                    class="w-16 h-16 rounded-full flex items-center justify-center mb-4 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 mx-auto"
                  >
                    <img
                      v-if="developer.avatar"
                      :src="getFileUrl(developer.avatar)"
                      :alt="developer.developer_name"
                      class="w-full h-full object-cover"
                    />
                    <div v-else class="text-white text-2xl font-semibold">
                      {{ (developer.developer_name || 'D').charAt(0).toUpperCase() }}
                    </div>
                  </div>

                  <!-- Name -->
                  <div class="flex items-center gap-2 mb-2">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {{ developer.developer_name }}
                    </h3>
                    <FeatherIcon v-if="developer.is_verified" name="check-circle" class="w-4 h-4 text-blue-500 flex-shrink-0" />
                  </div>

                  <!-- Company -->
                  <p v-if="developer.company_name" class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {{ developer.company_name }}
                  </p>

                  <!-- Stats -->
                  <div class="flex items-center gap-4 text-sm text-gray-400">
                    <span>{{ developer.total_apps || 0 }} apps</span>
                    <span>•</span>
                    <span>{{ developer.total_downloads || 0 }} downloads</span>
                  </div>
                </div>
              </Card>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Badge, Card, FeatherIcon, Input, createResource } from "frappe-ui"
import { onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const searchQuery = ref("")
const searchType = ref("apps")
const hasSearched = ref(false)

const search = createResource({
	url: "bench_manager.api.search_apps",
	makeParams: () => ({
		query: searchQuery.value,
		limit: 50,
	}),
	auto: false,
	transform: (data) => data || [],
})

const searchDevelopers = createResource({
	url: "bench_manager.api.search_developers",
	makeParams: () => ({
		query: searchQuery.value,
		limit: 50,
	}),
	auto: false,
	transform: (data) => data || [],
})

const searchResults = ref([])

const isLoading = ref(false)

const handleSearch = () => {
	if (!searchQuery.value || searchQuery.value.length < 2) {
		searchResults.value = []
		hasSearched.value = false
		return
	}

	hasSearched.value = true
	isLoading.value = true

	if (searchType.value === "apps") {
		search.fetch()
	} else {
		searchDevelopers.fetch()
	}
}

watch(
	() => search.data,
	(newData) => {
		searchResults.value = newData
		isLoading.value = false
	},
)

watch(
	() => searchDevelopers.data,
	(newData) => {
		searchResults.value = newData
		isLoading.value = false
	},
)

watch(searchType, () => {
	if (searchQuery.value.length >= 2) {
		handleSearch()
	}
})

onMounted(() => {
	// Read from URL params
	const query = route.query.q
	const type = route.query.type

	if (query) {
		searchQuery.value = query
	}

	if (type) {
		searchType.value = type
	}

	if (query && query.length >= 2) {
		handleSearch()
	}
})

const getFileUrl = (filePath) => {
	if (!filePath) return ""
	const path = filePath.startsWith("/") ? filePath.slice(1) : filePath
	return `/files/${path}`
}
</script>
