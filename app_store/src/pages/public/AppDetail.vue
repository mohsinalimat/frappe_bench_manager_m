<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <router-link to="/" class="hover:text-gray-900 dark:hover:text-white">Home</router-link>
          <FeatherIcon name="chevron-right" class="w-3.5 h-3.5" />
          <router-link to="/apps" class="hover:text-gray-900 dark:hover:text-white">Apps</router-link>
          <FeatherIcon name="chevron-right" class="w-3.5 h-3.5" />
          <span class="text-gray-900 dark:text-white font-medium">{{ app.data?.app_title || 'Loading...' }}</span>
        </div>
      </div>
    </div>
    <div v-if="app.loading" class="flex justify-center py-24">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
    </div>
    <div v-else-if="app.error" class="text-center py-24">
      <FeatherIcon name="alert-circle" class="w-12 h-12 text-red-500 mx-auto mb-3" />
      <p class="text-red-600 dark:text-red-400 text-lg">Failed to load app</p>
      <p class="text-gray-500 dark:text-gray-400">{{ app.error }}</p>
    </div>
    <div v-else-if="app.data">
      <div class="relative bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-400/20 to-violet-400/20 blur-3xl"></div>
          <div class="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-br from-fuchsia-400/20 to-rose-400/20 blur-3xl"></div>
        </div>
        <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
          <div class="flex flex-col lg:flex-row gap-8 items-start">
            <div class="flex-shrink-0">
              <div class="w-28 h-28 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden ring-4 ring-white dark:ring-gray-700" :style="{ backgroundColor: app.data.app_color || '#06b6d4' }">
                <img v-if="app.data.app_logo" :src="getFileUrl(app.data.app_logo)" class="w-full h-full object-cover" />
                <div v-else class="text-white text-5xl">{{ app.data.app_icon || '📦' }}</div>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <div v-if="app.data?.tags && app.data.tags.length > 0" class="flex flex-wrap gap-2 mb-3">
                <span v-for="tag in app.data.tags" :key="tag.name" class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gradient-to-r from-cyan-50 to-violet-50 dark:from-cyan-900/30 dark:to-violet-900/30 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                  <FeatherIcon name="hash" class="w-3 h-3 mr-1" />{{ tag.tag }}
                </span>
              </div>
              <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">{{ app.data.app_title || app.data.app_name }}</h1>
              <p class="text-gray-600 dark:text-gray-400 text-lg mb-5">{{ app.data.app_description }}</p>
              <div class="flex flex-wrap items-center gap-3 mb-5">
                <Button variant="solid" size="lg" class="!bg-gradient-to-r !from-cyan-500 !to-violet-500 !text-white !border-0 hover:!from-cyan-600 hover:!to-violet-600 !shadow-lg !shadow-cyan-500/30 inline-flex items-center gap-2" @click="purchaseApp">
                  <FeatherIcon name="shopping-cart" class="w-4 h-4" />Purchase Now
                </Button>
                <Button variant="outline" size="lg" class="dark:border-gray-600 dark:text-gray-300 inline-flex items-center gap-2" @click="addToWishlist">
                  <FeatherIcon name="heart" class="w-4 h-4" />Add to Wishlist
                </Button>
                <Button v-if="app.data.demo_url" variant="outline" size="lg" class="dark:border-gray-600 dark:text-gray-300 inline-flex items-center gap-2" @click="openDemo">
                  <FeatherIcon name="external-link" class="w-4 h-4" />Live Preview
                </Button>
              </div>
              <div class="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <div class="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">{{ (app.data.developer_name || 'D')[0] }}</div>
                  <span class="font-medium text-gray-900 dark:text-white">{{ app.data.developer_name || 'Developer' }}</span>
                </div>
                <div class="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                  <FeatherIcon name="star" class="w-4 h-4 text-yellow-500" fill="currentColor" />
                  <span class="font-bold text-gray-900 dark:text-white">{{ app.data.rating || '0.0' }}</span>
                  <span class="text-gray-400 dark:text-gray-500">({{ app.data.review_count || 0 }})</span>
                </div>
                <div class="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                  <FeatherIcon name="download" class="w-4 h-4" />{{ app.data.total_downloads || 0 }}
                </div>
                <div class="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                  <FeatherIcon name="box" class="w-4 h-4" />v{{ app.data.version || '1.0.0' }}
                </div>
                <Badge variant="subtle" theme="cyan">{{ app.data.pricing_model }}</Badge>
              </div>
              <!-- Quick Info Bar -->
              <div class="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-sm">
                <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <span>Last Update</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ formatDate(app.data.modified) }}</span>
                </div>
                <div class="hidden sm:block w-px h-4 bg-gray-200 dark:bg-gray-700"></div>
                <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <span>Downloads</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ app.data.total_downloads || 0 }}</span>
                </div>
                <div class="hidden sm:block w-px h-4 bg-gray-200 dark:border-gray-700"></div>
                <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <span>License</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ app.data.license_type || 'Standard' }}</span>
                </div>
              </div>
            </div>
            <div class="hidden lg:block flex-shrink-0 text-right">
              <div class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">{{ formatPrice(app.data.price, app.data.currency) }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ app.data.pricing_model }}</div>
            </div>
          </div>
          <div class="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
            <div class="flex flex-wrap items-center gap-4">
              <div v-if="app.data?.compatibility && app.data.compatibility.length > 0" class="flex items-center gap-2">
                <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Works with</span>
                <div class="flex gap-1.5">
                  <span v-for="version in app.data.compatibility" :key="version.name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <FeatherIcon name="check-circle" class="w-3 h-3 mr-1" />{{ version.version }}
                  </span>
                </div>
              </div>
              <div v-if="app.data?.compatibility?.length && app.data?.dependencies?.length" class="hidden sm:block w-px h-5 bg-gray-200 dark:bg-gray-700"></div>
              <div v-if="app.data?.dependencies && app.data.dependencies.length > 0" class="flex items-center gap-2">
                <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Requires</span>
                <div class="flex gap-1.5">
                  <span v-for="dep in app.data.dependencies" :key="dep.name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    <FeatherIcon name="package" class="w-3 h-3 mr-1" />{{ dep.app_name }} {{ dep.required_version }}
                  </span>
                </div>
              </div>
              <div v-if="app.data?.license_type" class="hidden sm:block w-px h-5 bg-gray-200 dark:bg-gray-700"></div>
              <div v-if="app.data?.license_type" class="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                <FeatherIcon name="shield" class="w-4 h-4 text-violet-500" />
                <span class="text-sm">{{ app.data.license_type }} License</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div class="grid grid-cols-1 gap-6">

          <!-- Tabbed Content -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
              <button v-for="tab in availableTabs" :key="tab.id" @click="activeTab = tab.id" class="px-6 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap" :class="activeTab === tab.id ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 bg-cyan-50/50 dark:bg-cyan-900/10' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'">
                <span class="flex items-center gap-2"><FeatherIcon :name="tab.icon" class="w-4 h-4" />{{ tab.label }}</span>
              </button>
            </div>
            <div class="p-6">
              <!-- Overview -->
              <div v-if="activeTab === 'overview'" class="space-y-6">
                <div>
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">About this app</h3>
                  <div class="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed" v-html="renderedDescription"></div>
                </div>
                <div v-if="app.data.features">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Key Features</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div v-for="(feature, index) in parseFeatures(app.data.features)" :key="index" class="flex items-start gap-3 p-3 bg-gradient-to-r from-emerald-50/50 to-green-50/50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                      <div class="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5"><FeatherIcon name="check" class="w-3.5 h-3.5 text-white" /></div>
                      <span class="text-gray-700 dark:text-gray-300 text-sm">{{ feature }}</span>
                    </div>
                  </div>
                </div>
                <div v-if="app.data.technologies">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Technologies</h3>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="tech in parseTechnologies(app.data.technologies)" :key="tech" class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">{{ tech }}</span>
                  </div>
                </div>
              </div>
              <!-- Screenshots -->
              <div v-if="activeTab === 'screenshots'" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div v-for="(screenshot, index) in app.data.screenshots" :key="screenshot.name" class="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer ring-1 ring-gray-200 dark:ring-gray-700" @click="openLightbox(index)">
                    <img :src="getFileUrl(screenshot.image)" class="w-full object-cover aspect-video group-hover:scale-105 transition-transform duration-500" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div v-if="screenshot.caption" class="p-3 text-white text-sm font-medium">{{ screenshot.caption }}</div>
                    </div>
                    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                      <FeatherIcon name="maximize-2" class="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              <!-- Requirements -->
              <div v-if="activeTab === 'requirements'" class="space-y-6">
                <div v-if="app.data.requirements">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">System Requirements</h3>
                  <div class="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl" v-html="app.data.requirements"></div>
                </div>
                <div v-if="app.data?.compatibility && app.data.compatibility.length > 0">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Compatible Versions</h3>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div v-for="version in app.data.compatibility" :key="version.name" class="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                      <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center flex-shrink-0"><FeatherIcon name="check-circle" class="w-5 h-5 text-white" /></div>
                      <div><div class="font-semibold text-gray-900 dark:text-white">{{ version.version }}</div><div class="text-xs text-emerald-600 dark:text-emerald-400">Fully Supported</div></div>
                    </div>
                  </div>
                </div>
                <div v-if="app.data?.dependencies && app.data.dependencies.length > 0">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Dependencies</h3>
                  <div class="space-y-3">
                    <div v-for="dep in app.data.dependencies" :key="dep.name" class="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                      <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0"><FeatherIcon name="package" class="w-5 h-5 text-white" /></div>
                      <div class="flex-1"><div class="font-semibold text-gray-900 dark:text-white">{{ dep.app_name }}</div><div class="text-xs text-amber-600 dark:text-amber-400">Required: {{ dep.required_version }}</div></div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Changelog -->
              <div v-if="activeTab === 'changelog'" class="space-y-4">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Version History</h3>
                <div class="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl" v-html="app.data.changelog"></div>
              </div>
              <!-- Developer -->
              <div v-if="activeTab === 'developer'" class="space-y-6">
                <div class="flex items-center gap-6">
                  <div class="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                    {{ (app.data.developer_name || 'D')[0] }}
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ app.data.developer_name || 'Developer' }}</h3>
                    <p class="text-gray-500 dark:text-gray-400">{{ app.data.total_apps || 0 }} apps published</p>
                  </div>
                </div>
                <router-link v-if="app.data.developer" :to="`/developer/${app.data.developer}`">
                  <Button variant="outline" size="lg" class="dark:border-gray-600 dark:text-gray-300">View Full Profile</Button>
                </router-link>
              </div>
              <!-- What's Included -->
              <div v-if="activeTab === 'included'" class="space-y-6">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">What's Included</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div class="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50/50 to-green-50/50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center flex-shrink-0"><FeatherIcon name="clock" class="w-6 h-6 text-white" /></div>
                    <div><div class="font-semibold text-gray-900 dark:text-white">6 months support</div><div class="text-sm text-emerald-600 dark:text-emerald-400">Get help when you need it</div></div>
                  </div>
                  <div class="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50/50 to-green-50/50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center flex-shrink-0"><FeatherIcon name="check-circle" class="w-6 h-6 text-white" /></div>
                    <div><div class="font-semibold text-gray-900 dark:text-white">Quality checked</div><div class="text-sm text-emerald-600 dark:text-emerald-400">Verified by Frappe</div></div>
                  </div>
                  <div class="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50/50 to-green-50/50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center flex-shrink-0"><FeatherIcon name="refresh-cw" class="w-6 h-6 text-white" /></div>
                    <div><div class="font-semibold text-gray-900 dark:text-white">Future updates</div><div class="text-sm text-emerald-600 dark:text-emerald-400">Free updates included</div></div>
                  </div>
                </div>
              </div>
              <!-- Reviews -->
              <div v-if="activeTab === 'reviews'" class="space-y-6">
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white">Customer Reviews</h3>
                  <div class="flex items-center gap-2">
                    <div class="flex items-center text-yellow-500"><FeatherIcon name="star" class="w-5 h-5" fill="currentColor" /><span class="ml-2 font-bold text-gray-900 dark:text-white">{{ app.data.rating || '0.0' }}</span></div>
                    <span class="text-gray-400 dark:text-gray-500">({{ app.data.review_count || 0 }})</span>
                  </div>
                </div>
                
                <!-- Review Form -->
                <div class="bg-gradient-to-r from-cyan-50 to-violet-50 dark:from-cyan-900/20 dark:to-violet-900/20 rounded-xl p-6 border border-cyan-200 dark:border-cyan-800">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-4">
                    {{ app.data.user_review ? 'Update Your Review' : 'Write a Review' }}
                  </h4>
                  
                  <!-- Not Logged In -->
                  <div v-if="!isUserLoggedIn" class="text-center py-4">
                    <p class="text-gray-600 dark:text-gray-400 mb-3">Please login to write a review</p>
                    <Button @click="router.push('/login')" variant="solid" class="!bg-gradient-to-r !from-cyan-500 !to-violet-500 !text-white !border-0">
                      Login to Review
                    </Button>
                  </div>
                  
                  <!-- Not Member -->
                  <div v-else-if="!isMember" class="text-center py-4">
                    <div class="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400 mb-3">
                      <FeatherIcon name="alert-circle" class="w-5 h-5" />
                      <p class="font-medium">Only Members can Review Apps</p>
                    </div>
                  </div>
                  
                  <!-- Hasn't Purchased -->
                  <div v-else-if="!hasPurchasedApp" class="text-center py-4">
                    <p class="text-gray-600 dark:text-gray-400 mb-3">Purchase this app to write a review</p>
                    <Button @click="purchaseApp" variant="solid" class="!bg-gradient-to-r !from-cyan-500 !to-violet-500 !text-white !border-0">
                      Purchase App
                    </Button>
                  </div>
                  
                  <!-- Can Write Review -->
                  <div v-else class="space-y-4">
                    <!-- Star Rating Input -->
                    <div class="flex items-center gap-2">
                      <span class="text-sm text-gray-600 dark:text-gray-400">Rating:</span>
                      <div class="flex gap-1">
                        <button v-for="star in 5" :key="star" 
                          @click="setRating(star)"
                          class="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                          :class="star <= (newRating || app.data.user_review?.rating || 0) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'">
                          <FeatherIcon name="star" :class="star <= (newRating || app.data.user_review?.rating || 0) ? 'fill-current' : ''" class="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <!-- Review Text -->
                    <div>
                      <textarea 
                        v-model="reviewText"
                        placeholder="Share your experience with this app..."
                        class="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                        rows="3"
                      ></textarea>
                    </div>
                    
                    <!-- Submit Buttons -->
                    <div class="flex gap-3">
                      <Button v-if="!app.data.user_review || !app.data.user_review.name" @click="submitReview" variant="solid" class="!bg-gradient-to-r !from-cyan-500 !to-violet-500 !text-white !border-0">
                        Submit Review
                      </Button>
                      <Button v-else @click="updateReview" variant="solid" class="!bg-gradient-to-r !from-cyan-500 !to-violet-500 !text-white !border-0">
                        Update Review
                      </Button>
                      <Button v-if="app.data.user_review && app.data.user_review.name" @click="deleteReview" variant="outline" class="dark:border-gray-600 dark:text-gray-300">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
                
                <!-- Reviews List -->
                <div v-if="app.data.reviews && app.data.reviews.length > 0" class="space-y-4">
                  <div v-for="review in app.data.reviews" :key="review.name" class="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div class="flex items-start justify-between mb-3">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold">
                          {{ (review.member_name || 'U')[0].toUpperCase() }}
                        </div>
                        <div>
                          <div class="font-medium text-gray-900 dark:text-white">{{ review.member_name }}</div>
                          <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <span>{{ formatDate(review.review_date) }}</span>
                            <span v-if="review.is_verified_purchase" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                              <FeatherIcon name="check-circle" class="w-3 h-3 mr-1" />Verified Purchase
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="flex items-center gap-1 text-yellow-400">
                        <FeatherIcon v-for="star in review.rating" :key="star" name="star" class="w-4 h-4 fill-current" />
                      </div>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 mb-3">{{ review.review_text || 'No text provided' }}</p>
                    <div class="flex items-center justify-between">
                      <button @click="markHelpful(review.name)" class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                        <FeatherIcon name="thumbs-up" class="w-4 h-4" />
                        <span>Helpful ({{ review.helpful_count || 0 }})</span>
                      </button>
                      <Button v-if="review.is_owner" @click="deleteReview" variant="ghost" size="sm" class="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center py-12 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                  <FeatherIcon name="message-circle" class="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p class="text-gray-500 dark:text-gray-400">No reviews yet. Be the first to review!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div v-if="showLightbox && app.data?.screenshots" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" @click.self="closeLightbox">
      <div class="relative max-w-5xl w-full">
        <!-- Close Button -->
        <button @click="closeLightbox" class="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors">
          <FeatherIcon name="x" class="w-8 h-8" />
        </button>

        <!-- Image -->
        <div class="relative bg-black rounded-xl overflow-hidden">
          <img :src="getFileUrl(app.data.screenshots[selectedImageIndex].image)" :alt="app.data.screenshots[selectedImageIndex].caption || 'Screenshot'" class="w-full max-h-[80vh] object-contain" />
          
          <!-- Caption -->
          <div v-if="app.data.screenshots[selectedImageIndex].caption" class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p class="text-white text-sm font-medium">{{ app.data.screenshots[selectedImageIndex].caption }}</p>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <button v-if="app.data.screenshots.length > 1" @click.stop="prevImage" class="absolute left-0 top-1/2 -translate-y-1/2 -ml-14 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:scale-110">
          <FeatherIcon name="chevron-left" class="w-6 h-6" />
        </button>
        <button v-if="app.data.screenshots.length > 1" @click.stop="nextImage" class="absolute right-0 top-1/2 -translate-y-1/2 -mr-14 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:scale-110">
          <FeatherIcon name="chevron-right" class="w-6 h-6" />
        </button>

        <!-- Image Counter -->
        <div v-if="app.data.screenshots.length > 1" class="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white text-sm">
          {{ selectedImageIndex + 1 }} / {{ app.data.screenshots.length }}
        </div>
      </div>
    </div>
  </div>

  <!-- Error Dialog -->
  <Dialog v-model="showErrorDialog">
    <template #body-title>
      <h3 class="text-xl font-semibold text-red-600">Error</h3>
    </template>
    <template #body-content>
      <p class="text-gray-700">{{ errorMessage }}</p>
    </template>
    <template #actions="{ close }">
      <Button variant="solid" @click="close">OK</Button>
    </template>
  </Dialog>

  <!-- Confirm Dialog -->
  <Dialog v-model="showConfirmDialog">
    <template #body-title>
      <h3 class="text-xl font-semibold text-gray-900">Confirm</h3>
    </template>
    <template #body-content>
      <p class="text-gray-700">{{ confirmMessage }}</p>
    </template>
    <template #actions="{ close }">
      <div class="flex gap-2">
        <Button variant="solid" @click="() => { onConfirmAction(); close() }">Yes</Button>
        <Button variant="outline" @click="close">No</Button>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { Button, Dialog, createResource } from "frappe-ui"
import { marked } from "marked"
import { computed, onMounted, onUnmounted, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
const activeTab = ref("overview")
const selectedImageIndex = ref(0)
const showLightbox = ref(false)
const newRating = ref(0)
const reviewText = ref("")

// Dialog states
const showErrorDialog = ref(false)
const errorMessage = ref("")
const showConfirmDialog = ref(false)
const confirmMessage = ref("")
const onConfirmAction = ref(null)

const user = createResource({
	url: "bench_manager.api.get_user_info",
	auto: true,
})

const app = createResource({
	url: "bench_manager.api.get_app_details",
	makeParams: () => ({ app_id: route.params.id }),
	auto: true,
})

const userPurchases = createResource({
	url: "bench_manager.api.get_my_apps",
	auto: false, // Don't auto-fetch
})

const isUserLoggedIn = computed(() => user.data !== null)
const isMember = computed(
	() =>
		user.data && (user.data.is_member || user.data.roles?.includes("Member")),
)
const hasPurchasedApp = computed(() => {
	if (!userPurchases.data) return false
	return userPurchases.data.some((p) => p.name === route.params.id)
})
const canWriteReview = computed(() => {
	return isUserLoggedIn.value && isMember.value && hasPurchasedApp.value
})

// Convert markdown to HTML
const renderedDescription = computed(() => {
	const description =
		app.data?.long_description || app.data?.app_description || ""
	if (!description) return ""
	try {
		return marked.parse(description)
	} catch (e) {
		console.error("Error parsing markdown:", e)
		return description
	}
})

// Fetch user purchases only if user is logged in AND has Member role
watch(
	() => [user.data, isMember.value],
	([userData, isMember]) => {
		if (userData !== null && isMember) {
			userPurchases.fetch()
		}
	},
)

const availableTabs = computed(() => {
	const tabs = [{ id: "overview", label: "Overview", icon: "file-text" }]
	if (app.data?.screenshots && app.data.screenshots.length > 0) {
		tabs.push({ id: "screenshots", label: "Screenshots", icon: "image" })
	}
	if (
		app.data?.requirements ||
		app.data?.compatibility?.length ||
		app.data?.dependencies?.length
	) {
		tabs.push({ id: "requirements", label: "Requirements", icon: "cpu" })
	}
	tabs.push({ id: "developer", label: "Developer", icon: "user" })
	tabs.push({ id: "included", label: "What's Included", icon: "check-square" })
	if (app.data?.changelog) {
		tabs.push({ id: "changelog", label: "Changelog", icon: "git-commit" })
	}
	tabs.push({ id: "reviews", label: "Reviews", icon: "message-square" })
	return tabs
})

function purchaseApp() {
	router.push(`/purchase/${route.params.id}`)
}

function addToWishlist() {
	createResource({
		url: "bench_manager.api.add_to_wishlist",
		makeParams: () => ({ app_id: route.params.id }),
		onSuccess: (response) => {
			alert(response.message)
		},
	}).fetch()
}

function openDemo() {
	if (app.data?.demo_url) window.open(app.data.demo_url, "_blank")
}

function formatPrice(price, currency = "USD") {
	if (!price) return "Free"
	const symbols = { USD: "$", EUR: "€", GBP: "£", INR: "₹" }
	return `${symbols[currency] || "$"}${price}`
}

function formatDate(dateString) {
	if (!dateString) return "N/A"
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	})
}

function parseFeatures(featuresString) {
	if (!featuresString) return []
	return featuresString
		.split(/\n|,|•/)
		.map((f) => f.trim())
		.filter((f) => f.length > 0)
}

function parseTechnologies(techString) {
	if (!techString) return []
	return techString
		.split(/,|\n/)
		.map((t) => t.trim())
		.filter((t) => t.length > 0)
}

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

function openLightbox(index) {
	selectedImageIndex.value = index
	showLightbox.value = true
}

function closeLightbox() {
	showLightbox.value = false
}

function nextImage() {
	if (!app.data?.screenshots) return
	selectedImageIndex.value =
		(selectedImageIndex.value + 1) % app.data.screenshots.length
}

function prevImage() {
	if (!app.data?.screenshots) return
	selectedImageIndex.value =
		(selectedImageIndex.value - 1 + app.data.screenshots.length) %
		app.data.screenshots.length
}

function handleKeydown(e) {
	if (!showLightbox.value) return
	if (e.key === "Escape") closeLightbox()
	if (e.key === "ArrowRight") nextImage()
	if (e.key === "ArrowLeft") prevImage()
}

// Review functions
// Helper functions for dialogs
function showError(message) {
	errorMessage.value = message
	showErrorDialog.value = true
}

function showConfirm(message, action) {
	confirmMessage.value = message
	onConfirmAction.value = action
	showConfirmDialog.value = true
}

function setRating(rating) {
	newRating.value = rating
}

function submitReview() {
	if (!newRating.value) {
		showError("Please select a rating")
		return
	}

	createResource({
		url: "bench_manager.api.add_review",
		makeParams: () => ({
			app_id: route.params.id,
			rating: newRating.value,
			review_text: reviewText.value,
		}),
		onSuccess: (response) => {
			if (response.success) {
				newRating.value = 0
				reviewText.value = ""
				app.reload()
			} else {
				showError(response.error || "Failed to submit review")
			}
		},
		onError: (error) => {
			showError(error.message || "Failed to submit review")
		},
	}).submit()
}

function updateReview() {
	if (!app.data.user_review || !app.data.user_review.name) {
		showError("No review found to update")
		return
	}

	if (!newRating.value && !reviewText.value) {
		showError("Please update rating or review text")
		return
	}

	const rating = newRating.value || null
	const text = reviewText.value || null

	createResource({
		url: "bench_manager.api.update_review",
		makeParams: () => ({
			review_id: app.data.user_review.name,
			rating: rating,
			review_text: text,
		}),
		onSuccess: (response) => {
			if (response.success) {
				newRating.value = 0
				reviewText.value = ""
				app.reload()
			} else {
				showError(response.error || "Failed to update review")
			}
		},
		onError: (error) => {
			showError(error.message || "Failed to update review")
		},
	}).submit()
}

function deleteReview() {
	if (!app.data.user_review || !app.data.user_review.name) {
		showError("No review found to delete")
		return
	}

	showConfirm("Are you sure you want to delete your review?", () => {
		const reviewId = app.data.user_review.name

		createResource({
			url: "bench_manager.api.delete_review",
			makeParams: () => ({ review_id: reviewId }),
			onSuccess: (response) => {
				if (response.success) {
					newRating.value = 0
					reviewText.value = ""
					app.reload()
				} else {
					showError(response.error || "Failed to delete review")
				}
			},
			onError: (error) => {
				showError(error.message || "Failed to delete review")
			},
		}).submit()
	})
}

function markHelpful(reviewId) {
	createResource({
		url: "bench_manager.api.mark_review_helpful",
		makeParams: () => ({ review_id: reviewId }),
		onSuccess: (response) => {
			if (response.success) {
				app.reload()
			}
		},
		onError: (error) => {
			console.error("Failed to mark review as helpful", error)
		},
	}).submit()
}

onMounted(() => {
	window.addEventListener("keydown", handleKeydown)
})

onUnmounted(() => {
	window.removeEventListener("keydown", handleKeydown)
})
</script>
