<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-violet-900 via-fuchsia-900 to-pink-900 text-white py-24 overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>
        <div class="absolute bottom-20 left-1/3 w-96 h-96 bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s"></div>
      </div>
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
      </div>
      <div class="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div class="max-w-5xl mx-auto text-center">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <span class="w-2 h-2 bg-gradient-to-r from-cyan-400 to-fuchsia-400 rounded-full mr-2 animate-pulse"></span>
            <span class="text-sm font-medium">About Us</span>
          </div>
          <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-fade-in bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
            Empowering the Frappe Ecosystem
          </h1>
          <p class="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            The premier marketplace for Frappe applications, connecting developers with businesses worldwide
          </p>
          <div class="flex justify-center gap-4">
            <router-link to="/apps">
              <Button variant="solid" size="lg" class="!bg-gradient-to-r !from-cyan-500 !via-fuchsia-500 !to-rose-500 !text-white !border-0 hover:!from-cyan-600 hover:!via-fuchsia-600 hover:!to-rose-600 !shadow-lg !shadow-fuchsia-500/40 transform hover:scale-105 transition-all">
                Explore Apps
              </Button>
            </router-link>
            <router-link to="/developer/submit">
              <Button variant="solid" size="lg" class="!bg-gradient-to-r !from-violet-500 !to-purple-500 !text-white !border-0 hover:!from-violet-600 hover:!to-purple-600 !shadow-lg !shadow-violet-500/40 transform hover:scale-105 transition-all">
                Become a Developer
              </Button>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-20 bg-gradient-to-b from-violet-50 via-fuchsia-50 to-white dark:from-gray-900 dark:via-violet-900/20 dark:to-gray-900 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      <div class="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <div class="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-cyan-100 to-fuchsia-100 dark:from-cyan-900/30 dark:to-fuchsia-900/30 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-4">
              <FeatherIcon name="target" class="w-4 h-4 mr-2" />
              Our Mission
            </div>
            <h2 class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-violet-700 dark:from-white dark:to-violet-300 bg-clip-text text-transparent mb-4">Our Mission</h2>
            <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              To democratize access to enterprise-grade Frappe applications and foster a thriving open-source ecosystem
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center p-8 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-100 dark:border-cyan-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                <FeatherIcon name="zap" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Innovation</h3>
              <p class="text-gray-600 dark:text-gray-400">Pushing the boundaries of what's possible with Frappe</p>
            </div>
            <div class="text-center p-8 rounded-2xl bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20 border border-fuchsia-100 dark:border-fuchsia-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-fuchsia-500/30 group-hover:scale-110 transition-transform">
                <FeatherIcon name="users" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">Community</h3>
              <p class="text-gray-600 dark:text-gray-400">Building a global network of Frappe developers</p>
            </div>
            <div class="text-center p-8 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border border-violet-100 dark:border-violet-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:scale-110 transition-transform">
                <FeatherIcon name="shield" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">Quality</h3>
              <p class="text-gray-600 dark:text-gray-400">Ensuring every app meets the highest standards</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-gradient-to-br from-violet-900 via-fuchsia-900 to-pink-900 text-white relative overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>
        <div class="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s"></div>
      </div>
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
      </div>
      <div class="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <div class="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-4">
              <span class="w-2 h-2 bg-gradient-to-r from-cyan-400 to-fuchsia-400 rounded-full mr-2 animate-pulse"></span>
              Our Impact
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="text-center group">
              <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/40 group-hover:scale-110 transition-transform">
                <FeatherIcon name="package" class="w-10 h-10 text-white" />
              </div>
              <div class="text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">500+</div>
              <div class="text-white/70">Applications</div>
            </div>
            <div class="text-center group">
              <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/40 group-hover:scale-110 transition-transform">
                <FeatherIcon name="download" class="w-10 h-10 text-white" />
              </div>
              <div class="text-5xl font-bold mb-2 bg-gradient-to-r from-emerald-300 via-green-400 to-teal-400 bg-clip-text text-transparent">10K+</div>
              <div class="text-white/70">Downloads</div>
            </div>
            <div class="text-center group">
              <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-fuchsia-400 via-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-fuchsia-500/40 group-hover:scale-110 transition-transform">
                <FeatherIcon name="users" class="w-10 h-10 text-white" />
              </div>
              <div class="text-5xl font-bold mb-2 bg-gradient-to-r from-fuchsia-300 via-pink-400 to-rose-400 bg-clip-text text-transparent">200+</div>
              <div class="text-white/70">Developers</div>
            </div>
            <div class="text-center group">
              <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/40 group-hover:scale-110 transition-transform">
                <FeatherIcon name="globe" class="w-10 h-10 text-white" />
              </div>
              <div class="text-5xl font-bold mb-2 bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent">50+</div>
              <div class="text-white/70">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="py-20 bg-gradient-to-b from-white via-cyan-50 to-white dark:from-gray-900 dark:via-cyan-900/20 dark:to-gray-900 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-fuchsia-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      <div class="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div class="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 dark:from-violet-900/30 dark:to-fuchsia-900/30 text-violet-600 dark:text-violet-400 text-sm font-medium mb-4">
                <FeatherIcon name="book-open" class="w-4 h-4 mr-2" />
                Our Story
              </div>
              <h2 class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-fuchsia-700 dark:from-white dark:to-fuchsia-300 bg-clip-text text-transparent mb-6">Our Story</h2>
              <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Founded in 2024, the Frappe App Store emerged from a simple idea: to make Frappe applications easily accessible to everyone. What started as a small project has grown into a thriving marketplace that serves businesses worldwide.
              </p>
              <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
                We believe that great software should be discoverable, accessible, and supported by a vibrant community. Our platform connects talented developers with businesses seeking innovative solutions.
              </p>
              <p class="text-lg text-gray-600 dark:text-gray-400">
                Today, we continue to innovate, adding new features and improving the experience for both developers and users. Our commitment to the open-source community remains unwavering.
              </p>
            </div>
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-rose-500 rounded-3xl transform rotate-3 shadow-2xl shadow-fuchsia-500/40"></div>
              <div class="relative bg-gray-900 dark:bg-gray-800 rounded-3xl p-8 border border-cyan-100 dark:border-cyan-800">
                <div class="text-white text-center">
                  <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/40">
                    <FeatherIcon name="code" class="w-10 h-10 text-white" />
                  </div>
                  <p class="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">Built with Frappe</p>
                  <p class="text-gray-400">Powered by the framework we love</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20 bg-gradient-to-br from-violet-900 via-fuchsia-900 to-pink-900 text-white relative overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>
        <div class="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s"></div>
      </div>
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
      </div>
      <div class="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div class="max-w-6xl mx-auto text-center">
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
            <span class="w-2 h-2 bg-gradient-to-r from-cyan-400 to-fuchsia-400 rounded-full mr-2 animate-pulse"></span>
            Our Values
          </div>
          <h2 class="text-4xl font-bold mb-12 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">Our Values</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="p-6 group">
              <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-fuchsia-500/40 group-hover:scale-110 transition-transform">
                <FeatherIcon name="heart" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Passion</h3>
              <p class="text-white/80">We love what we do and it shows</p>
            </div>
            <div class="p-6 group">
              <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/40 group-hover:scale-110 transition-transform">
                <FeatherIcon name="star" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Excellence</h3>
              <p class="text-white/80">Quality is never compromised</p>
            </div>
            <div class="p-6 group">
              <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/40 group-hover:scale-110 transition-transform">
                <FeatherIcon name="users" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Community</h3>
              <p class="text-white/80">Together we achieve more</p>
            </div>
            <div class="p-6 group">
              <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/40 group-hover:scale-110 transition-transform">
                <FeatherIcon name="eye" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Vision</h3>
              <p class="text-white/80">Always looking forward</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20 bg-gradient-to-b from-white via-emerald-50 to-white dark:from-gray-900 dark:via-emerald-900/20 dark:to-gray-900 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      <div class="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <div class="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
              <FeatherIcon name="users" class="w-4 h-4 mr-2" />
              Our Team
            </div>
            <h2 class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-emerald-700 dark:from-white dark:to-emerald-300 bg-clip-text text-transparent mb-4">Meet the Team</h2>
            <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A passionate team dedicated to building the best Frappe ecosystem
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center group">
              <div class="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/40 group-hover:scale-110 transition-transform">
                <FeatherIcon name="user" class="w-12 h-12 text-white" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">John Doe</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-2">Founder & CEO</p>
              <div class="flex justify-center gap-3">
                <a href="#" class="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"><FeatherIcon name="twitter" class="w-5 h-5" /></a>
                <a href="#" class="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"><FeatherIcon name="linkedin" class="w-5 h-5" /></a>
              </div>
            </div>
            <div class="text-center group">
              <div class="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-fuchsia-500/40 group-hover:scale-110 transition-transform">
                <FeatherIcon name="user" class="w-12 h-12 text-white" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">Jane Smith</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-2">Lead Developer</p>
              <div class="flex justify-center gap-3">
                <a href="#" class="text-fuchsia-600 hover:text-fuchsia-700 dark:text-fuchsia-400 dark:hover:text-fuchsia-300"><FeatherIcon name="twitter" class="w-5 h-5" /></a>
                <a href="#" class="text-fuchsia-600 hover:text-fuchsia-700 dark:text-fuchsia-400 dark:hover:text-fuchsia-300"><FeatherIcon name="linkedin" class="w-5 h-5" /></a>
              </div>
            </div>
            <div class="text-center group">
              <div class="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-violet-500/40 group-hover:scale-110 transition-transform">
                <FeatherIcon name="user" class="w-12 h-12 text-white" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">Mike Johnson</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-2">Product Manager</p>
              <div class="flex justify-center gap-3">
                <a href="#" class="text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"><FeatherIcon name="twitter" class="w-5 h-5" /></a>
                <a href="#" class="text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"><FeatherIcon name="linkedin" class="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline Section -->
    <section class="py-20 bg-gradient-to-b from-violet-50 via-fuchsia-50 to-white dark:from-gray-900 dark:via-fuchsia-900/20 dark:to-gray-900 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      <div class="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16">
            <div class="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 dark:from-violet-900/30 dark:to-fuchsia-900/30 text-violet-600 dark:text-violet-400 text-sm font-medium mb-4">
              <FeatherIcon name="clock" class="w-4 h-4 mr-2" />
              Timeline
            </div>
            <h2 class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-fuchsia-700 dark:from-white dark:to-fuchsia-300 bg-clip-text text-transparent mb-4">Our Journey</h2>
            <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Key milestones in our growth story
            </p>
          </div>
          <div class="space-y-8">
            <div class="flex gap-6 items-start group">
              <div class="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/40 flex-shrink-0 group-hover:scale-110 transition-transform">
                <FeatherIcon name="rocket" class="w-8 h-8 text-white" />
              </div>
              <div class="flex-1">
                <div class="inline-block px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-2">2024</div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Foundation</h3>
                <p class="text-gray-600 dark:text-gray-400">Frappe App Store was founded with a vision to democratize access to Frappe applications.</p>
              </div>
            </div>
            <div class="flex gap-6 items-start group">
              <div class="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-fuchsia-500/40 flex-shrink-0 group-hover:scale-110 transition-transform">
                <FeatherIcon name="users" class="w-8 h-8 text-white" />
              </div>
              <div class="flex-1">
                <div class="inline-block px-3 py-1 rounded-full bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-600 dark:text-fuchsia-400 text-sm font-medium mb-2">2024 Q2</div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">First 100 Apps</h3>
                <p class="text-gray-600 dark:text-gray-400">Reached our first milestone of 100 applications listed on the platform.</p>
              </div>
            </div>
            <div class="flex gap-6 items-start group">
              <div class="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/40 flex-shrink-0 group-hover:scale-110 transition-transform">
                <FeatherIcon name="globe" class="w-8 h-8 text-white" />
              </div>
              <div class="flex-1">
                <div class="inline-block px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-sm font-medium mb-2">2024 Q3</div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Global Expansion</h3>
                <p class="text-gray-600 dark:text-gray-400">Expanded to serve businesses in over 50 countries worldwide.</p>
              </div>
            </div>
            <div class="flex gap-6 items-start group">
              <div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/40 flex-shrink-0 group-hover:scale-110 transition-transform">
                <FeatherIcon name="star" class="w-8 h-8 text-white" />
              </div>
              <div class="flex-1">
                <div class="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-2">2024 Q4</div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">500+ Apps</h3>
                <p class="text-gray-600 dark:text-gray-400">Celebrated reaching 500 applications with 10,000+ downloads.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-br from-violet-900 via-fuchsia-900 to-pink-900 text-white relative overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>
        <div class="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s"></div>
      </div>
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
      </div>
      <div class="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <span class="w-2 h-2 bg-gradient-to-r from-cyan-400 to-fuchsia-400 rounded-full mr-2 animate-pulse"></span>
            <span class="text-sm font-medium">Join Us</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">Join Our Journey</h2>
          <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Whether you're a developer or a business, there's a place for you in the Frappe App Store ecosystem.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <router-link to="/signup">
              <Button variant="solid" size="lg" class="!bg-gradient-to-r !from-cyan-500 !via-fuchsia-500 !to-rose-500 !text-white !border-0 hover:!from-cyan-600 hover:!via-fuchsia-600 hover:!to-rose-600 !shadow-lg !shadow-fuchsia-500/40 transform hover:scale-105 transition-all">
                Get Started
                <FeatherIcon name="arrow-right" class="w-5 h-5 ml-2" />
              </Button>
            </router-link>
            <router-link to="/contact">
              <Button variant="solid" size="lg" class="!bg-white/10 !text-white !border !border-white/20 backdrop-blur-sm hover:!bg-white/20 transform hover:scale-105 transition-all">
                Contact Us
                <FeatherIcon name="mail" class="w-5 h-5 ml-2" />
              </Button>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Button, FeatherIcon } from "frappe-ui"
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}
</style>
