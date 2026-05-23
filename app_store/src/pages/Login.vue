<template>
  <div class="min-h-screen flex overflow-hidden">
    <!-- Left Side - 3D Animated Branding -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <!-- Animated Gradient Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <!-- Animated Orbs -->
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style="animation-duration: 4s;"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style="animation-duration: 6s;"></div>
        <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style="animation-duration: 5s;"></div>
      </div>
      
      <!-- 3D Floating Elements -->
      <div class="absolute inset-0 perspective-1000">
        <div class="absolute top-20 left-20 w-32 h-32 bg-white/10 backdrop-blur-lg rounded-2xl transform rotate-12 hover:rotate-0 transition-transform duration-700 animate-float" style="animation-delay: 0s;"></div>
        <div class="absolute top-40 right-32 w-24 h-24 bg-white/10 backdrop-blur-lg rounded-full transform -rotate-12 hover:rotate-0 transition-transform duration-700 animate-float" style="animation-delay: 1s;"></div>
        <div class="absolute bottom-32 left-40 w-28 h-28 bg-white/10 backdrop-blur-lg rounded-xl transform rotate-6 hover:rotate-0 transition-transform duration-700 animate-float" style="animation-delay: 2s;"></div>
        <div class="absolute bottom-48 right-20 w-20 h-20 bg-white/10 backdrop-blur-lg rounded-full transform -rotate-6 hover:rotate-0 transition-transform duration-700 animate-float" style="animation-delay: 1.5s;"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col justify-center px-16 text-white">
        <div class="mb-12">
          <div class="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-6 transform hover:scale-110 transition-transform duration-300">
            <FeatherIcon name="package" class="w-10 h-10" />
          </div>
          <h1 class="text-5xl font-bold mb-4 tracking-tight">Welcome Back</h1>
          <p class="text-xl text-white/80">Sign in to access your {{ websiteSettings.data?.app_name || 'App Store' }} dashboard</p>
        </div>
        
        <div class="space-y-6">
          <div class="flex items-start space-x-4 group">
            <div class="bg-white/20 backdrop-blur-lg rounded-full p-3 group-hover:bg-white/30 transition-colors">
              <FeatherIcon name="shopping-bag" class="w-6 h-6" />
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-1">Browse Apps</h3>
              <p class="text-white/70">Discover thousands of apps across categories</p>
            </div>
          </div>
          <div class="flex items-start space-x-4 group">
            <div class="bg-white/20 backdrop-blur-lg rounded-full p-3 group-hover:bg-white/30 transition-colors">
              <FeatherIcon name="download" class="w-6 h-6" />
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-1">Manage Purchases</h3>
              <p class="text-white/70">Track your purchased apps and licenses</p>
            </div>
          </div>
          <div class="flex items-start space-x-4 group">
            <div class="bg-white/20 backdrop-blur-lg rounded-full p-3 group-hover:bg-white/30 transition-colors">
              <FeatherIcon name="code" class="w-6 h-6" />
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-1">Developer Tools</h3>
              <p class="text-white/70">Publish and manage your own applications</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Form -->
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div class="w-full max-w-md">
        <!-- Mobile Logo -->
        <div class="lg:hidden text-center mb-8">
          <img
            v-if="websiteSettings.data && websiteSettings.data.app_logo"
            :src="websiteSettings.data.app_logo.startsWith('/files/') ? websiteSettings.data.app_logo : `/files/${websiteSettings.data.app_logo}`"
            alt="Logo"
            class="w-16 h-16 rounded-2xl object-contain mx-auto mb-4"
          />
          <div v-else class="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FeatherIcon name="package" class="w-8 h-8 text-white" />
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] transition-transform duration-300">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sign In</h2>
            <p class="text-gray-600 dark:text-gray-400">Enter your credentials to continue</p>
          </div>

          <form class="space-y-6" @submit.prevent="submit">
            <div>
              <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Email Address</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FeatherIcon name="mail" class="w-5 h-5 text-gray-400" />
                </div>
                <input
                  v-model="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Password</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FeatherIcon name="lock" class="w-5 h-5 text-gray-400" />
                </div>
                <input
                  v-model="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="remember" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Remember me
                </label>
              </div>
              <a href="#" class="text-sm font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              :loading="session.login.loading"
              class="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Sign In
            </Button>

            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">New to {{ websiteSettings.data?.app_name || 'App Store' }}?</span>
              </div>
            </div>

            <router-link
              to="/signup"
              class="block w-full py-3 text-center border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all"
            >
              Create an Account
            </router-link>
          </form>
        </div>

        <p class="mt-8 text-center text-xs text-gray-500">
          By signing in, you agree to our 
          <a href="#" class="text-blue-600 hover:underline">Terms of Service</a> and 
          <a href="#" class="text-blue-600 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { session } from "@/data/session"
import { Button, FeatherIcon, createResource } from "frappe-ui"
import { ref } from "vue"

const email = ref("")
const password = ref("")

// Fetch Website Settings for logo and app name
const websiteSettings = createResource({
	url: "bench_manager.api.get_website_settings",
	auto: true,
	transform: (data) => data || null,
})

function submit() {
	session.login.submit({
		email: email.value,
		password: password.value,
	})
}
</script>

<style>
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.perspective-1000 {
  perspective: 1000px;
}
</style>
