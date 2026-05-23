<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-90"></div>
      <div class="absolute inset-0">
        <div class="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
            <FeatherIcon name="users" class="w-4 h-4 mr-2" />
            r/frappe_framework Community
          </div>
          <h1 class="text-5xl font-extrabold text-white mb-4 tracking-tight">
            Join the Conversation
          </h1>
          <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Connect with fellow developers, share your projects, and stay updated with the latest in the Frappe ecosystem
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.reddit.com/r/frappe_framework"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
            >
              <FeatherIcon name="external-link" class="w-5 h-5 mr-2" />
              Visit on Reddit
            </a>
            <button
              @click="redditResource.reload()"
              class="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all transform hover:scale-105 border border-white/30"
            >
              <FeatherIcon name="refresh-cw" class="w-5 h-5 mr-2" />
              Refresh Posts
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Bar -->
    <div class="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-orange-600 dark:text-orange-400">{{ allPosts.length }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Recent Posts</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600 dark:text-green-400">Active</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Community</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Support</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">Free</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Access</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Loading State -->
      <div v-if="redditResource.loading" class="space-y-6">
        <div v-for="i in 3" :key="i" class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div class="p-6">
            <div class="flex items-start space-x-4 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full animate-pulse"></div>
              <div class="flex-1 space-y-2">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/4"></div>
              </div>
            </div>
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4 mb-3"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/6"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="redditResource.error" class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
        <div class="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <FeatherIcon name="alert-circle" class="w-10 h-10 text-red-600 dark:text-red-400" />
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Unable to Load Posts</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
          Something went wrong while fetching the community posts. Please try again.
        </p>
        <button
          @click="redditResource.reload()"
          class="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <FeatherIcon name="refresh-cw" class="w-5 h-5 mr-2" />
          Try Again
        </button>
      </div>

      <!-- Posts Grid -->
      <div v-else-if="allPosts && allPosts.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(post, index) in allPosts"
          :key="post.link"
          class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700"
          :class="{ 'md:col-span-2 lg:col-span-2': index === 0 }"
        >
          <!-- Post Image/Gradient -->
          <div v-if="post.thumbnail || index === 0" class="relative h-48 overflow-hidden">
            <img
              v-if="post.thumbnail"
              :src="post.thumbnail"
              alt="Post thumbnail"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div
              v-else
              class="w-full h-full bg-gradient-to-br from-orange-400 via-red-500 to-pink-500"
            >
              <div class="absolute inset-0 bg-black/20"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <FeatherIcon name="message-square" class="w-16 h-16 text-white/80" />
              </div>
            </div>
            <!-- Featured Badge -->
            <div v-if="index === 0" class="absolute top-4 left-4">
              <span class="px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-full">
                Featured
              </span>
            </div>
            <!-- External Link Badge -->
            <div class="absolute top-4 right-4">
              <span class="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                Reddit
              </span>
            </div>
          </div>

          <!-- Post Content -->
          <div class="p-6">
            <!-- Author Info -->
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-md">
                <FeatherIcon name="user" class="w-5 h-5 text-white" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ post.author }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <FeatherIcon name="clock" class="w-3 h-3 mr-1" />
                  {{ formatDate(post.published) }}
                </p>
              </div>
            </div>

            <!-- Title -->
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
              {{ post.title }}
            </h3>

            <!-- Excerpt -->
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
              {{ post.excerpt }}
            </p>

            <!-- Actions -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <a
                :href="post.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors group/link"
              >
                Read More
                <FeatherIcon name="arrow-right" class="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
              </a>
              <div class="flex items-center space-x-2">
                <button class="p-2 text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  <FeatherIcon name="share-2" class="w-4 h-4" />
                </button>
                <button class="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                  <FeatherIcon name="heart" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More Trigger -->
      <div ref="loadTrigger" class="h-20"></div>

      <!-- Loading More Indicator -->
      <div v-if="loadingMore" class="flex justify-center items-center py-8">
        <div class="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600"></div>
          <span>Loading more posts...</span>
        </div>
      </div>

      <!-- No More Posts -->
      <div v-else-if="!hasMore && allPosts.length > 0" class="text-center py-8">
        <p class="text-gray-500 dark:text-gray-400 text-sm">
          You've reached the end of the feed
        </p>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
        <div class="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
          <FeatherIcon name="inbox" class="w-10 h-10 text-gray-400" />
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Posts Yet</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
          Check back later or visit the subreddit directly to see the latest discussions.
        </p>
        <a
          href="https://www.reddit.com/r/frappe_framework"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <FeatherIcon name="external-link" class="w-5 h-5 mr-2" />
          Visit Reddit
        </a>
      </div>
    </div>

    <!-- Footer CTA -->
    <div class="bg-gradient-to-r from-orange-600 to-red-600 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Ready to Join the Community?</h2>
        <p class="text-white/90 mb-8 max-w-2xl mx-auto">
          Connect with thousands of Frappe developers, get help with your projects, and share your knowledge with the community.
        </p>
        <a
          href="https://www.reddit.com/r/frappe_framework"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
        >
          <FeatherIcon name="users" class="w-5 h-5 mr-2" />
          Join r/frappe_framework
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { createResource } from "frappe-ui"
import { FeatherIcon } from "frappe-ui"
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue"

const allPosts = ref([])
const after = ref(null)
const hasMore = ref(true)
const loadingMore = ref(false)
const loadTrigger = ref(null)

const redditResource = createResource({
	url: "bench_manager.api.get_reddit_posts",
	params: {
		subreddit: "frappe_framework",
		limit: 25,
		after: null,
	},
	auto: true,
	onSuccess(data) {
		if (data.posts && data.posts.length > 0) {
			allPosts.value = data.posts
			after.value = data.after
			hasMore.value = data.has_more
			// Setup observer after initial load
			nextTick(() => setupObserver())
		}
	},
	onError(error) {
		console.error("Reddit API error:", error)
	},
})

const loadMoreResource = createResource({
	url: "bench_manager.api.get_reddit_posts",
	params: {
		subreddit: "frappe_framework",
		limit: 25,
		after: null,
	},
	onSuccess(data) {
		if (data.posts && data.posts.length > 0) {
			allPosts.value = [...allPosts.value, ...data.posts]
			after.value = data.after
			hasMore.value = data.has_more
		}
		loadingMore.value = false
	},
	onError(error) {
		console.error("Reddit API error:", error)
		loadingMore.value = false
	},
})

function loadMore() {
	if (loadingMore.value || !hasMore.value) return
	loadingMore.value = true
	loadMoreResource.params.after = after.value
	loadMoreResource.fetch()
}

function formatDate(dateString) {
	if (!dateString) return ""
	const date = new Date(dateString)
	const now = new Date()
	const diff = now - date

	const seconds = Math.floor(diff / 1000)
	const minutes = Math.floor(seconds / 60)
	const hours = Math.floor(minutes / 60)
	const days = Math.floor(hours / 24)

	if (seconds < 60) return "just now"
	if (minutes < 60) return `${minutes}m ago`
	if (hours < 24) return `${hours}h ago`
	if (days < 7) return `${days}d ago`

	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
	})
}

// Intersection Observer for infinite scroll
let observer = null

function setupObserver() {
	if (observer) {
		observer.disconnect()
	}

	observer = new IntersectionObserver(
		(entries) => {
			if (entries[0].isIntersecting) {
				loadMore()
			}
		},
		{
			root: null,
			rootMargin: "200px",
			threshold: 0.1,
		},
	)

	if (loadTrigger.value) {
		observer.observe(loadTrigger.value)
	}
}

onMounted(() => {
	// Observer will be setup after initial data loads
})

onUnmounted(() => {
	if (observer) {
		observer.disconnect()
	}
})
</script>
