<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
    <div class="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div class="max-w-[1800px] mx-auto">
        <!-- Loading State -->
        <div v-if="developer.loading" class="flex justify-center items-center py-24">
          <div class="flex flex-col items-center gap-4">
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
            <p class="text-gray-600 dark:text-gray-400">Loading developer profile...</p>
          </div>
        </div>

        <!-- Not Found -->
        <div v-else-if="!developer.data" class="text-center py-24">
          <div class="max-w-md mx-auto">
            <div class="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FeatherIcon name="user-x" class="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Developer Not Found</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              The developer profile you're looking for doesn't exist or has been deactivated.
            </p>
            <router-link to="/apps">
              <Button variant="solid" theme="blue">Browse Apps</Button>
            </router-link>
          </div>
        </div>

        <!-- Developer Profile -->
        <div v-else>
          <!-- Back Button -->
          <div class="mb-6">
            <router-link to="/apps" class="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <FeatherIcon name="arrow-left" class="w-4 h-4" />
              <span>Back to Apps</span>
            </router-link>
          </div>

          <!-- Profile Card -->
          <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
            <!-- Header with Animated Gradient -->
            <div class="relative h-56 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
              <div class="absolute inset-0 bg-black/10"></div>
              <div class="absolute inset-0">
                <div class="absolute top-0 left-0 w-full h-full" style="background: radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)"></div>
              </div>
              <div class="absolute bottom-4 right-4 flex gap-3">
                <div v-if="developer.data.is_verified" class="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50 rounded-full text-white text-sm font-bold transform hover:scale-105 transition-all duration-300">
                  <FeatherIcon name="check-circle" class="w-4 h-4" />
                  <span>Verified Developer</span>
                </div>
                <div class="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-400 to-green-500 shadow-lg shadow-emerald-500/50 rounded-full text-emerald-900 text-sm font-bold transform hover:scale-105 transition-all duration-300">
                  <FeatherIcon name="zap" class="w-4 h-4" />
                  <span>Active</span>
                </div>
              </div>
            </div>

            <!-- Profile Info -->
            <div class="px-6 md:px-8 pb-8">
              <div class="flex flex-col md:flex-row gap-6 -mt-24">
                <!-- Avatar with Developer Name -->
                <div class="flex-shrink-0 flex flex-col items-center">
                  <div
                    class="relative w-40 h-40 rounded-2xl border-4 border-white dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-800 shadow-2xl"
                  >
                    <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 hover:opacity-20 transition-opacity"></div>
                    <img
                      v-if="developer.data.avatar"
                      :src="getFileUrl(developer.data.avatar)"
                      :alt="developer.data.developer_name"
                      class="w-full h-full object-cover"
                    />
                    <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                      <span class="text-white text-5xl font-bold">
                        {{ (developer.data.developer_name || 'D').charAt(0).toUpperCase() }}
                      </span>
                    </div>
                  </div>
                  <div class="mt-3 text-center">
                    <h2 class="text-lg font-bold text-gray-900 dark:text-white">{{ developer.data.developer_name }}</h2>
                  </div>
                </div>

                <!-- Info -->
                <div class="flex-grow pt-8">
                  <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <div class="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                        <span v-if="developer.data.company_name && developer.data.show_company" class="flex items-center gap-2">
                          <FeatherIcon name="building" class="w-4 h-4" />
                          {{ developer.data.company_name }}
                        </span>
                        <span class="flex items-center gap-2">
                          <FeatherIcon name="calendar" class="w-4 h-4" />
                          Joined {{ formatDate(developer.data.creation) }}
                        </span>
                      </div>
                    </div>
                    <div class="flex flex-wrap gap-3">
                      <a
                        v-if="developer.data.email && developer.data.show_email"
                        :href="`mailto:${developer.data.email}`"
                        class="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-200 hover:scale-105"
                      >
                        <FeatherIcon name="mail" class="w-4 h-4" />
                        <span class="font-medium">Email</span>
                      </a>
                      <a
                        v-if="developer.data.phone && developer.data.show_phone"
                        :href="`tel:${developer.data.phone}`"
                        class="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-200 hover:scale-105"
                      >
                        <FeatherIcon name="phone" class="w-4 h-4" />
                        <span class="font-medium">Call</span>
                      </a>
                      <a
                        v-if="developer.data.website"
                        :href="developer.data.website"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-all duration-200 hover:scale-105"
                      >
                        <FeatherIcon name="globe" class="w-4 h-4" />
                        <span class="font-medium">Website</span>
                      </a>
                      <a
                        v-if="developer.data.github_username && developer.data.show_social_links"
                        :href="developer.data.github_username.startsWith('http') ? developer.data.github_username : `https://github.com/${developer.data.github_username}`"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white rounded-xl transition-all duration-200 hover:scale-105"
                      >
                        <FeatherIcon name="github" class="w-4 h-4" />
                        <span class="font-medium">GitHub</span>
                      </a>
                      <a
                        v-if="developer.data.twitter_username && developer.data.show_social_links"
                        :href="developer.data.twitter_username.startsWith('http') ? developer.data.twitter_username : `https://twitter.com/${developer.data.twitter_username}`"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition-all duration-200 hover:scale-105"
                      >
                        <FeatherIcon name="twitter" class="w-4 h-4" />
                        <span class="font-medium">Twitter</span>
                      </a>
                      <a
                        v-if="developer.data.linkedin_url && developer.data.show_social_links"
                        :href="developer.data.linkedin_url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 hover:scale-105"
                      >
                        <FeatherIcon name="linkedin" class="w-4 h-4" />
                        <span class="font-medium">LinkedIn</span>
                      </a>
                    </div>
                  </div>

                  <!-- Bio -->
                  <div v-if="developer.data.bio" class="mt-6 p-5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                    <p class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                      {{ developer.data.bio }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Horizontal Layout: Apps and GitHub Activity -->
              <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Left Side: Developer's Apps -->
                <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
                  <div class="flex items-center justify-between mb-6">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">Apps by {{ developer.data.developer_name }}</h3>
                    <span v-if="developerApps.data" class="text-sm text-gray-500 dark:text-gray-400">{{ developerApps.data.length }} apps</span>
                  </div>
                  <div v-if="developerApps.loading" class="flex justify-center py-12">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                  </div>
                  <div v-else-if="developerApps.data && developerApps.data.length > 0" class="space-y-4 max-h-[600px] overflow-y-auto">
                    <router-link
                      v-for="app in developerApps.data"
                      :key="app.name"
                      :to="`/app-store/${app.name}`"
                      class="block bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all group"
                    >
                      <div class="flex items-start gap-4">
                        <div class="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <img v-if="app.app_logo" :src="getFileUrl(app.app_logo)" :alt="app.app_title" class="w-full h-full object-cover" />
                          <div v-else class="text-white text-3xl">{{ app.app_icon || '📦' }}</div>
                        </div>
                        <div class="flex-1 min-w-0">
                          <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                            {{ app.app_title || app.app_name }}
                          </h4>
                          <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {{ app.app_description || 'No description' }}
                          </p>
                        </div>
                      </div>
                      <div class="flex items-center justify-between pt-4 mt-4 border-t border-gray-200 dark:border-gray-600">
                        <div class="flex items-center gap-3">
                          <Badge variant="subtle" theme="blue" class="font-medium">{{ app.pricing_model }}</Badge>
                        </div>
                        <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <FeatherIcon name="download" class="w-4 h-4" />
                          <span>{{ app.total_downloads || 0 }}</span>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div v-else class="text-center py-16">
                    <div class="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FeatherIcon name="package" class="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 text-lg">No apps published yet.</p>
                    <p class="text-gray-500 dark:text-gray-500 text-sm mt-2">Check back later for new releases!</p>
                  </div>
                </div>

                <!-- Right Side: GitHub Activity -->
                <div v-if="githubData.data" class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">GitHub Activity</h3>

                  <!-- GitHub Stats -->
                  <div class="grid grid-cols-3 gap-4 mb-6">
                    <div class="bg-white dark:bg-gray-700 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-600">
                      <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ githubData.data.public_repos || 0 }}</div>
                      <div class="text-sm text-gray-600 dark:text-gray-400">Repositories</div>
                    </div>
                    <div class="bg-white dark:bg-gray-700 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-600">
                      <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ githubData.data.followers || 0 }}</div>
                      <div class="text-sm text-gray-600 dark:text-gray-400">Followers</div>
                    </div>
                    <div class="bg-white dark:bg-gray-700 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-600">
                      <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ githubData.data.following || 0 }}</div>
                      <div class="text-sm text-gray-600 dark:text-gray-400">Following</div>
                    </div>
                  </div>

                  <!-- Recent Repositories -->
                  <div v-if="githubData.data.repos && githubData.data.repos.length > 0" class="mb-6">
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Recent Repositories</h4>
                    <div class="space-y-3 max-h-[250px] overflow-y-auto">
                      <div
                        v-for="repo in githubData.data.repos"
                        :key="repo.name"
                        class="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                      >
                        <div class="flex items-start justify-between">
                          <div class="flex-1">
                            <a :href="repo.html_url" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                              {{ repo.name }}
                            </a>
                            <p v-if="repo.description" class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{{ repo.description }}</p>
                            <div class="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                              <span v-if="repo.language" class="flex items-center gap-1">
                                <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                                {{ repo.language }}
                              </span>
                              <span class="flex items-center gap-1">
                                <FeatherIcon name="star" class="w-3 h-3" />
                                {{ repo.stars }}
                              </span>
                              <span class="flex items-center gap-1">
                                <FeatherIcon name="git-branch" class="w-3 h-3" />
                                {{ repo.forks }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Recent Activity -->
                  <div v-if="githubData.data.recent_activity && githubData.data.recent_activity.length > 0">
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Recent Activity</h4>
                    <div class="space-y-3 max-h-[250px] overflow-y-auto">
                      <div
                        v-for="(activity, index) in githubData.data.recent_activity"
                        :key="index"
                        class="flex items-start gap-3 text-sm"
                      >
                        <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                          <FeatherIcon :name="getActivityIcon(activity.type)" class="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div class="flex-1">
                          <div class="text-gray-900 dark:text-white">
                            {{ getActivityDescription(activity) }}
                          </div>
                          <div class="text-gray-500 dark:text-gray-400 text-xs">
                            {{ formatDate(activity.created_at) }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <a
                    v-if="githubData.data.html_url"
                    :href="githubData.data.html_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                  >
                    View Full Profile on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Badge, Button, Card, FeatherIcon, createResource } from "frappe-ui"
import { onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const developerId = ref(route.params.developerId)

const developer = createResource({
	url: "bench_manager.api.get_developer_details",
	makeParams: () => ({
		developer_id: developerId.value,
	}),
	auto: true,
	transform: (data) => data || null,
})

const developerApps = createResource({
	url: "bench_manager.api.search_apps",
	makeParams: () => ({
		query: "",
		developer: developer.data?.name,
		limit: 50,
	}),
	auto: false,
	transform: (data) => data || [],
})

const githubData = createResource({
	url: "bench_manager.api.get_github_profile_data",
	makeParams: () => ({
		github_url: developer.data?.github_username,
	}),
	auto: false,
	transform: (data) => data || null,
})

// Load developer's apps after developer data is loaded
watch(
	() => developer.data,
	(newData) => {
		if (newData) {
			developerApps.fetch()
			// Fetch GitHub data if github_username is available
			if (newData.github_username) {
				githubData.fetch()
			}
		}
	},
)

const getFileUrl = (filePath) => {
	if (!filePath) return ""
	// If it already starts with /files/, use it directly
	if (filePath.startsWith("/files/")) {
		return filePath
	}
	// Otherwise, add /files/ prefix
	const path = filePath.startsWith("/") ? filePath.slice(1) : filePath
	return `/files/${path}`
}

const formatDate = (dateString) => {
	if (!dateString) return ""
	const date = new Date(dateString)
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	})
}

const getActivityIcon = (type) => {
	const icons = {
		PushEvent: "upload",
		CreateEvent: "plus-circle",
		DeleteEvent: "trash-2",
		WatchEvent: "star",
		ForkEvent: "git-branch",
		IssuesEvent: "message-square",
		IssueCommentEvent: "message-circle",
		PullRequestEvent: "git-pull-request",
		PullRequestReviewEvent: "eye",
		ReleaseEvent: "tag",
		CommitCommentEvent: "message-circle",
	}
	return icons[type] || "activity"
}

const getActivityDescription = (activity) => {
	const descriptions = {
		PushEvent: `Pushed to ${activity.repo_name}`,
		CreateEvent: `Created ${activity.repo_name}`,
		DeleteEvent: `Deleted from ${activity.repo_name}`,
		WatchEvent: `Starred ${activity.repo_name}`,
		ForkEvent: `Forked ${activity.repo_name}`,
		IssuesEvent: `Opened an issue in ${activity.repo_name}`,
		IssueCommentEvent: `Commented on issue in ${activity.repo_name}`,
		PullRequestEvent: `Opened a pull request in ${activity.repo_name}`,
		PullRequestReviewEvent: `Reviewed a pull request in ${activity.repo_name}`,
		ReleaseEvent: `Released a new version of ${activity.repo_name}`,
		CommitCommentEvent: `Commented on a commit in ${activity.repo_name}`,
	}
	return descriptions[activity.type] || `Activity in ${activity.repo_name}`
}
</script>
