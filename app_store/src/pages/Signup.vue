<template>
  <div class="min-h-screen flex overflow-hidden">
    <!-- Left Side - Form -->
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
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h2>
            <p class="text-gray-600 dark:text-gray-400">Join the {{ websiteSettings.data?.app_name || 'App Store' }} community</p>
          </div>

          <form class="space-y-5" @submit.prevent="submit">
            <div>
              <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Full Name</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FeatherIcon name="user" class="w-5 h-5 text-gray-400" />
                </div>
                <input
                  v-model="fullName"
                  type="text"
                  required
                  placeholder="John Doe"
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

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

            <div>
              <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">I want to</label>
              <div class="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  @click="role = 'buyer'"
                  :class="[
                    'p-4 rounded-xl border-2 transition-all text-center',
                    role === 'buyer' 
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-300 dark:border-gray-700 hover:border-blue-400'
                  ]"
                >
                  <FeatherIcon name="shopping-bag" class="w-6 h-6 mx-auto mb-2" :class="role === 'buyer' ? 'text-blue-600' : 'text-gray-400'" />
                  <span class="text-sm font-medium" :class="role === 'buyer' ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'">Buy Apps</span>
                </button>
                <button
                  type="button"
                  @click="role = 'developer'"
                  :class="[
                    'p-4 rounded-xl border-2 transition-all text-center',
                    role === 'developer' 
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20' 
                      : 'border-gray-300 dark:border-gray-700 hover:border-purple-400'
                  ]"
                >
                  <FeatherIcon name="code" class="w-6 h-6 mx-auto mb-2" :class="role === 'developer' ? 'text-purple-600' : 'text-gray-400'" />
                  <span class="text-sm font-medium" :class="role === 'developer' ? 'text-purple-600' : 'text-gray-600 dark:text-gray-400'">Sell Apps</span>
                </button>
                <button
                  type="button"
                  @click="role = 'both'"
                  :class="[
                    'p-4 rounded-xl border-2 transition-all text-center',
                    role === 'both' 
                      ? 'border-pink-600 bg-pink-50 dark:bg-pink-900/20' 
                      : 'border-gray-300 dark:border-gray-700 hover:border-pink-400'
                  ]"
                >
                  <FeatherIcon name="layers" class="w-6 h-6 mx-auto mb-2" :class="role === 'both' ? 'text-pink-600' : 'text-gray-400'" />
                  <span class="text-sm font-medium" :class="role === 'both' ? 'text-pink-600' : 'text-gray-600 dark:text-gray-400'">Both</span>
                </button>
              </div>
            </div>

            <div v-if="errorMessage" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3">
              <FeatherIcon name="alert-circle" class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p class="text-sm text-red-800 dark:text-red-300">{{ errorMessage }}</p>
            </div>

            <Button
              type="submit"
              :loading="signup.loading"
              class="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Create Account
            </Button>

            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Already have an account?</span>
              </div>
            </div>

            <router-link
              to="/signin"
              class="block w-full py-3 text-center border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all"
            >
              Sign In Instead
            </router-link>
          </form>

          <p class="mt-8 text-center text-xs text-gray-500">
            By creating an account, you agree to our 
            <a href="#" class="text-blue-600 hover:underline">Terms of Service</a> and 
            <a href="#" class="text-blue-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>

    <!-- Right Side - 3D Animated Branding -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <!-- Animated Gradient Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500">
        <!-- Animated Orbs -->
        <div class="absolute top-1/3 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style="animation-duration: 5s;"></div>
        <div class="absolute bottom-1/3 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style="animation-duration: 7s;"></div>
        <div class="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style="animation-duration: 6s;"></div>
      </div>
      
      <!-- 3D Floating Elements -->
      <div class="absolute inset-0 perspective-1000">
        <div class="absolute top-24 right-24 w-36 h-36 bg-white/10 backdrop-blur-lg rounded-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-700 animate-float" style="animation-delay: 0.5s;"></div>
        <div class="absolute bottom-40 right-40 w-28 h-28 bg-white/10 backdrop-blur-lg rounded-full transform rotate-12 hover:rotate-0 transition-transform duration-700 animate-float" style="animation-delay: 1.5s;"></div>
        <div class="absolute top-60 left-32 w-32 h-32 bg-white/10 backdrop-blur-lg rounded-xl transform -rotate-6 hover:rotate-0 transition-transform duration-700 animate-float" style="animation-delay: 2.5s;"></div>
        <div class="absolute bottom-60 left-48 w-24 h-24 bg-white/10 backdrop-blur-lg rounded-full transform rotate-6 hover:rotate-0 transition-transform duration-700 animate-float" style="animation-delay: 2s;"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col justify-center px-16 text-white">
        <div class="mb-12">
          <div class="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-6 transform hover:scale-110 transition-transform duration-300">
            <FeatherIcon name="package" class="w-10 h-10" />
          </div>
          <h1 class="text-5xl font-bold mb-4 tracking-tight">Join Us Today</h1>
          <p class="text-xl text-white/80">Start your journey with the {{ websiteSettings.data?.app_name || 'App Store' }}</p>
        </div>
        
        <div class="space-y-6">
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
            <div class="flex items-center space-x-4 mb-3">
              <div class="bg-white/20 rounded-full p-3">
                <FeatherIcon name="shopping-cart" class="w-6 h-6" />
              </div>
              <h3 class="text-xl font-semibold">For Buyers</h3>
            </div>
            <p class="text-white/70">Discover, purchase, and manage apps for your business</p>
          </div>

          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
            <div class="flex items-center space-x-4 mb-3">
              <div class="bg-white/20 rounded-full p-3">
                <FeatherIcon name="code" class="w-6 h-6" />
              </div>
              <h3 class="text-xl font-semibold">For Developers</h3>
            </div>
            <p class="text-white/70">Publish your apps and reach thousands of users</p>
          </div>

          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
            <div class="flex items-center space-x-4 mb-3">
              <div class="bg-white/20 rounded-full p-3">
                <FeatherIcon name="zap" class="w-6 h-6" />
              </div>
              <h3 class="text-xl font-semibold">Both Roles</h3>
            </div>
            <p class="text-white/70">Get the best of both worlds - buy and sell apps</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Button, FeatherIcon, createResource } from "frappe-ui"
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const fullName = ref("")
const email = ref("")
const password = ref("")
const role = ref("buyer")
const errorMessage = ref("")

// Fetch Website Settings for logo and app name
const websiteSettings = createResource({
	url: "bench_manager.api.get_website_settings",
	auto: true,
	transform: (data) => data || null,
})

const signup = createResource({
	url: "bench_manager.api.signup",
	makeParams: (values) => values,
})

async function submit() {
	errorMessage.value = ""

	try {
		await signup.submit(
			{
				full_name: fullName.value,
				email: email.value,
				password: password.value,
				role: role.value,
			},
			{
				onSuccess: (data) => {
					router.push("/signin")
				},
				onError: (error) => {
					errorMessage.value =
						error.message || "Signup failed. Please try again."
				},
			},
		)
	} catch (err) {
		errorMessage.value = err.message || "Signup failed. Please try again."
	}
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
