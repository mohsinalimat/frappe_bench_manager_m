<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 via-fuchsia-800 to-pink-900 text-white">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0">
        <div class="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>
        <div class="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s"></div>
        <div class="absolute bottom-40 right-1/4 w-64 h-64 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 3s"></div>
      </div>

      <!-- Grid Pattern Overlay -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
      </div>

      <div class="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-24 lg:py-32">
        <div class="max-w-7xl mx-auto">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <!-- Left Content -->
            <div class="text-center lg:text-left">
              <!-- Badge -->
              <div class="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <span class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                <span class="text-sm font-medium">500+ Apps Available</span>
              </div>

              <!-- Main Heading -->
              <h1 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                Discover
                <span class="block bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
                  Frappe Apps
                </span>
              </h1>

              <!-- Subtitle -->
              <p class="text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
                Browse, purchase, and manage powerful applications for your Frappe ecosystem. Build faster with pre-built solutions.
              </p>

              <!-- Search Bar -->
              <div class="mb-8 max-w-xl mx-auto lg:mx-0">
                <div class="relative">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search apps, categories, or developers..."
                    class="w-full px-6 py-4 pl-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    @keyup.enter="handleSearch"
                  />
                  <FeatherIcon name="search" class="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <router-link to="/apps">
                  <Button variant="solid" size="lg" class="!bg-gradient-to-r !from-cyan-500 !via-fuchsia-500 !to-rose-500 !text-white !border-0 hover:!from-cyan-600 hover:!via-fuchsia-600 hover:!to-rose-600 !shadow-lg !shadow-fuchsia-500/40 transform hover:scale-105 transition-all">
                    <template #prefix>
                      <FeatherIcon name="grid" class="w-5 h-5" />
                    </template>
                    Browse Apps
                  </Button>
                </router-link>
                <router-link to="/developer/submit">
                  <Button variant="solid" size="lg" class="!bg-gradient-to-r !from-violet-500 !to-purple-500 !text-white !border-0 hover:!from-violet-600 hover:!to-purple-600 !shadow-lg !shadow-violet-500/40 transform hover:scale-105 transition-all">
                    <template #prefix>
                      <FeatherIcon name="upload" class="w-5 h-5" />
                    </template>
                    Submit Your App
                  </Button>
                </router-link>
              </div>

              <!-- Quick Stats -->
              <div class="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start">
                <div class="flex items-center space-x-2">
                  <div class="w-10 h-10 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-lg flex items-center justify-center">
                    <FeatherIcon name="package" class="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div class="text-sm font-semibold">500+</div>
                    <div class="text-xs text-gray-400">Apps</div>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-10 h-10 bg-gradient-to-br from-emerald-500/30 to-green-500/30 rounded-lg flex items-center justify-center">
                    <FeatherIcon name="download" class="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div class="text-sm font-semibold">10K+</div>
                    <div class="text-xs text-gray-400">Downloads</div>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-10 h-10 bg-gradient-to-br from-fuchsia-500/30 to-pink-500/30 rounded-lg flex items-center justify-center">
                    <FeatherIcon name="users" class="w-5 h-5 text-fuchsia-400" />
                  </div>
                  <div>
                    <div class="text-sm font-semibold">200+</div>
                    <div class="text-xs text-gray-400">Developers</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Content - 3D Floating Elements -->
            <div class="relative hidden lg:block">
              <!-- Floating App Cards -->
              <div class="relative h-96">
                <!-- Card 1 -->
                <div class="absolute top-0 left-0 w-64 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 transform rotate-6 hover:rotate-0 transition-transform duration-500 shadow-xl">
                  <div class="w-full h-32 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-xl mb-3"></div>
                  <div class="h-3 bg-white/30 rounded mb-2"></div>
                  <div class="h-2 bg-white/20 rounded w-3/4 mb-3"></div>
                  <div class="flex justify-between items-center">
                    <div class="h-6 bg-white/20 rounded-full w-16"></div>
                    <div class="h-6 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-full w-8"></div>
                  </div>
                </div>

                <!-- Card 2 -->
                <div class="absolute top-20 right-0 w-64 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 transform -rotate-3 hover:rotate-0 transition-transform duration-500 shadow-xl">
                  <div class="w-full h-32 bg-gradient-to-br from-fuchsia-400 via-pink-500 to-rose-600 rounded-xl mb-3"></div>
                  <div class="h-3 bg-white/30 rounded mb-2"></div>
                  <div class="h-2 bg-white/20 rounded w-3/4 mb-3"></div>
                  <div class="flex justify-between items-center">
                    <div class="h-6 bg-white/20 rounded-full w-16"></div>
                    <div class="h-6 bg-gradient-to-r from-fuchsia-500/50 to-pink-500/50 rounded-full w-8"></div>
                  </div>
                </div>

                <!-- Card 3 -->
                <div class="absolute bottom-10 left-20 w-64 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 transform rotate-3 hover:rotate-0 transition-transform duration-500 shadow-xl">
                  <div class="w-full h-32 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 rounded-xl mb-3"></div>
                  <div class="h-3 bg-white/30 rounded mb-2"></div>
                  <div class="h-2 bg-white/20 rounded w-3/4 mb-3"></div>
                  <div class="flex justify-between items-center">
                    <div class="h-6 bg-white/20 rounded-full w-16"></div>
                    <div class="h-6 bg-gradient-to-r from-emerald-500/50 to-green-500/50 rounded-full w-8"></div>
                  </div>
                </div>

                <!-- Floating Badge -->
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-rose-500 rounded-full px-6 py-3 shadow-2xl animate-bounce">
                  <span class="text-sm font-bold">✨ New Apps Added Daily</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Wave -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" class="w-full h-20 lg:h-32">
          <path fill="#f9fafb" fill-opacity="1" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>

    <!-- Featured Apps Section -->
    <section class="py-20 bg-gradient-to-b from-violet-50 via-fuchsia-50 to-white relative overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>

      <div class="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div class="max-w-[1600px] mx-auto">
          <!-- Section Header -->
          <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <div class="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 dark:from-violet-900/30 dark:to-fuchsia-900/30 text-violet-600 dark:text-violet-400 text-sm font-medium mb-3">
                <span class="w-2 h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full mr-2 animate-pulse"></span>
                Trending
              </div>
              <h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-violet-700 dark:from-white dark:to-violet-300 bg-clip-text text-transparent mb-2">
                Featured Apps
              </h2>
              <p class="text-gray-600 dark:text-gray-400">Hand-picked applications for your business</p>
            </div>
            <div class="flex gap-4 mt-6 md:mt-0">
              <router-link to="/category/featured" class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <FeatherIcon name="grid" class="w-4 h-4 mr-2" />
                Categories
              </router-link>
              <router-link to="/apps" class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white rounded-lg hover:from-violet-700 hover:via-fuchsia-700 hover:to-pink-700 transition-all shadow-lg shadow-fuchsia-500/40">
                View All
                <FeatherIcon name="arrow-right" class="w-4 h-4 ml-2" />
              </router-link>
            </div>
          </div>

          <!-- Apps Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            <!-- Loading State -->
            <div v-if="featuredApps.loading" class="col-span-full flex justify-center py-20">
              <div class="flex flex-col items-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
                <p class="text-gray-600 dark:text-gray-400">Loading featured apps...</p>
              </div>
            </div>
            <!-- Error State -->
            <div v-else-if="featuredApps.error" class="col-span-full text-center py-20">
              <div class="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FeatherIcon name="alert-circle" class="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Failed to load apps</h3>
              <p class="text-gray-600 dark:text-gray-400">{{ featuredApps.error }}</p>
            </div>
            <!-- Empty State -->
            <div v-else-if="!featuredApps.data || featuredApps.data.length === 0" class="col-span-full text-center py-20">
              <div class="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FeatherIcon name="package" class="w-10 h-10 text-gray-400" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No featured apps</h3>
              <p class="text-gray-600 dark:text-gray-400">Check back later for new additions</p>
            </div>
            <!-- App Cards -->
            <Card v-else v-for="app in featuredApps.data" :key="app.name" class="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100 dark:border-gray-700" @click="goToApp(app.name)">
              <div class="relative">
                <!-- App Icon/Logo -->
                <div class="w-full h-40 rounded-xl mb-4 flex items-center justify-center overflow-hidden relative" :style="{ backgroundColor: app.app_color || '#3b82f6' }">
                  <img v-if="app.app_logo" :src="getFileUrl(app.app_logo)" :alt="app.app_title" class="w-full h-full object-cover" />
                  <div v-else class="text-white text-5xl">{{ app.app_icon || '📦' }}</div>
                  <!-- Overlay on hover -->
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <FeatherIcon name="arrow-right" class="w-8 h-8 text-white" />
                  </div>
                </div>

                <!-- Content -->
                <div class="px-4 pb-4">
                  <h3 class="font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {{ app.app_title || app.app_name }}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 h-10">{{ app.app_description || 'No description available' }}</p>

                  <!-- Meta -->
                  <div class="flex items-center justify-between mb-3">
                    <Badge variant="subtle" theme="violet" class="text-xs">{{ app.pricing_model }}</Badge>
                    <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FeatherIcon name="star" class="w-4 h-4 mr-1 text-yellow-500" />
                      {{ app.rating || 'N/A' }}
                    </div>
                  </div>

                  <!-- Footer -->
                  <div class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                    <span class="font-bold text-gray-900 dark:text-white">{{ formatPrice(app.price, app.currency) }}</span>
                    <Button variant="solid" size="sm" class="!bg-gradient-to-r !from-violet-600 !to-fuchsia-600 !text-white hover:!from-violet-700 hover:!to-fuchsia-700" @click.stop="goToApp(app.name)">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-20 bg-gradient-to-b from-white via-cyan-50 to-white dark:from-gray-900 dark:via-violet-900/20 dark:to-gray-900 relative overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 via-fuchsia-500/5 to-violet-500/5 rounded-full blur-3xl"></div>

      <div class="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div class="max-w-[1600px] mx-auto">
          <!-- Section Header -->
          <div class="text-center mb-12">
            <div class="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-cyan-100 to-fuchsia-100 dark:from-cyan-900/30 dark:to-fuchsia-900/30 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-3">
              <FeatherIcon name="layers" class="w-4 h-4 mr-2" />
              Explore
            </div>
            <h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-cyan-700 to-fuchsia-700 dark:from-white dark:via-cyan-300 dark:to-fuchsia-300 bg-clip-text text-transparent mb-2">
              Browse by Category
            </h2>
            <p class="text-gray-600 dark:text-gray-400">Find the perfect app for your needs</p>
          </div>

          <!-- Categories Grid -->
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            <router-link v-for="(category, index) in categories.data || []" :key="category.name" :to="`/category/${category.slug || category.name}`">
              <Card class="group text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 cursor-pointer">
                <div class="p-6">
                  <div class="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg" :class="getCategoryGradient(index)">
                    <FeatherIcon :name="category.icon || 'briefcase'" class="w-8 h-8 text-white" />
                  </div>
                  <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {{ category.category_name }}
                  </h3>
                  <p v-if="category.app_count" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {{ category.app_count }} apps
                  </p>
                </div>
              </Card>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-gradient-to-br from-violet-900 via-fuchsia-900 to-pink-900 text-white relative overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0">
        <div class="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>
        <div class="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s"></div>
      </div>

      <!-- Grid Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
      </div>

      <div class="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div class="max-w-[1600px] mx-auto">
          <!-- Section Header -->
          <div class="text-center mb-12">
            <div class="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-3">
              <span class="w-2 h-2 bg-gradient-to-r from-cyan-400 to-fuchsia-400 rounded-full mr-2 animate-pulse"></span>
              Live Stats
            </div>
            <h2 class="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
              Growing Community
            </h2>
            <p class="text-white/70">Join thousands of developers and businesses</p>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="text-center group">
              <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/40 group-hover:scale-110 transition-transform">
                <FeatherIcon name="package" class="w-10 h-10 text-white" />
              </div>
              <div class="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">500+</div>
              <div class="text-white/70">Apps Available</div>
            </div>
            <div class="text-center group">
              <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/40 group-hover:scale-110 transition-transform">
                <FeatherIcon name="download" class="w-10 h-10 text-white" />
              </div>
              <div class="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-emerald-300 via-green-400 to-teal-400 bg-clip-text text-transparent">10K+</div>
              <div class="text-white/70">Downloads</div>
            </div>
            <div class="text-center group">
              <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-fuchsia-400 via-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-fuchsia-500/40 group-hover:scale-110 transition-transform">
                <FeatherIcon name="users" class="w-10 h-10 text-white" />
              </div>
              <div class="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-fuchsia-300 via-pink-400 to-rose-400 bg-clip-text text-transparent">200+</div>
              <div class="text-white/70">Developers</div>
            </div>
            <div class="text-center group">
              <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/40 group-hover:scale-110 transition-transform">
                <FeatherIcon name="star" class="w-10 h-10 text-white" />
              </div>
              <div class="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent">4.8</div>
              <div class="text-white/70">Avg Rating</div>
            </div>
          </div>

          <!-- CTA -->
          <div class="text-center mt-12">
            <router-link to="/apps" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-rose-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:via-fuchsia-600 hover:to-rose-600 transition-all transform hover:scale-105 shadow-xl shadow-fuchsia-500/40">
              Explore All Apps
              <FeatherIcon name="arrow-right" class="w-5 h-5 ml-2" />
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Badge, Button, FeatherIcon, createResource } from "frappe-ui"
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const searchQuery = ref("")

function handleSearch() {
	if (searchQuery.value && searchQuery.value.length >= 2) {
		router.push({
			path: "/search",
			query: { q: searchQuery.value, type: "apps" },
		})
	}
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

// Fetch featured apps using custom whitelisted API
const featuredApps = createResource({
	url: "bench_manager.api.get_app_list",
	makeParams: () => ({
		filters: {
			is_published: 1,
			is_featured: 1,
			moderation_status: "Approved",
		},
		order_by: "total_downloads desc",
		limit: 10,
	}),
	auto: true,
	transform: (data) => data || [],
})

// Fetch categories using custom whitelisted API
const categories = createResource({
	url: "bench_manager.api.get_category_list",
	makeParams: () => ({
		order_by: "display_order",
	}),
	auto: true,
	transform: (data) => data || [],
})

function goToApp(appId) {
	router.push(`/app-store/${appId}`)
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

function getFileUrl(filePath) {
	if (!filePath) return ""
	// If it's already a full URL, return as is
	if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
		return filePath
	}
	// If it starts with /files/, return as is (Frappe serves files at /files/)
	if (filePath.startsWith("/files/")) {
		return filePath
	}
	// Otherwise, assume it's a relative path and prepend /files/
	return `/files/${filePath}`
}

function formatNumber(num) {
	if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
	if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
	return num.toString()
}

function formatCurrency(num) {
	if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`
	if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`
	return `$${num.toString()}`
}
</script>
