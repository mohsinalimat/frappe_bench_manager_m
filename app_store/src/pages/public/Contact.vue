<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-violet-900 via-fuchsia-900 to-pink-900 text-white py-20 overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>
        <div class="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s"></div>
      </div>
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
      </div>
      <div class="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <span class="w-2 h-2 bg-gradient-to-r from-cyan-400 to-fuchsia-400 rounded-full mr-2 animate-pulse"></span>
            <span class="text-sm font-medium">Contact Us</span>
          </div>
          <h1 class="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p class="text-xl text-white/90 mb-8">Have questions? We'd love to hear from you.</p>
        </div>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="py-20 bg-gradient-to-b from-violet-50 via-fuchsia-50 to-white dark:from-gray-900 dark:via-violet-900/20 dark:to-gray-900 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      <div class="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <!-- Contact Form -->
            <div>
              <div class="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-cyan-100 to-fuchsia-100 dark:from-cyan-900/30 dark:to-fuchsia-900/30 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-4">
                <FeatherIcon name="mail" class="w-4 h-4 mr-2" />
                Send Message
              </div>
              <h2 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-violet-700 dark:from-white dark:to-violet-300 bg-clip-text text-transparent mb-6">Send us a message</h2>
              <p class="text-gray-600 dark:text-gray-400 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
              
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <Input v-model="form.name" type="text" placeholder="John Doe" class="w-full" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <Input v-model="form.email" type="email" placeholder="john@example.com" class="w-full" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                  <Input v-model="form.subject" type="text" placeholder="How can we help?" class="w-full" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea 
                    v-model="form.message"
                    placeholder="Tell us more..."
                    rows="5"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <Button @click="submitForm" variant="solid" size="lg" class="w-full !bg-gradient-to-r !from-cyan-500 !via-fuchsia-500 !to-rose-500 !text-white !border-0 hover:!from-cyan-600 hover:!via-fuchsia-600 hover:!to-rose-600 !shadow-lg !shadow-fuchsia-500/40 transform hover:scale-105 transition-all">
                  Send Message
                </Button>
              </div>
            </div>

            <!-- Contact Info -->
            <div>
              <div class="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 dark:from-violet-900/30 dark:to-fuchsia-900/30 text-violet-600 dark:text-violet-400 text-sm font-medium mb-4">
                <FeatherIcon name="info" class="w-4 h-4 mr-2" />
                Contact Info
              </div>
              <h2 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-fuchsia-700 dark:from-white dark:to-fuchsia-300 bg-clip-text text-transparent mb-6">Contact Information</h2>
              <p class="text-gray-600 dark:text-gray-400 mb-8">Reach out to us through any of these channels.</p>
              
              <div class="space-y-6">
                <div class="flex items-start gap-4 group">
                  <div class="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                    <FeatherIcon name="mail" class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Email</h3>
                    <p class="text-gray-600 dark:text-gray-400">support@worf.cloud</p>
                  </div>
                </div>
                <div class="flex items-start gap-4 group">
                  <div class="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-fuchsia-500/30 group-hover:scale-110 transition-transform">
                    <FeatherIcon name="phone" class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">Phone</h3>
                    <p class="text-gray-600 dark:text-gray-400">+91 120 492 7985</p>
                  </div>
                </div>
                <div class="flex items-start gap-4 group">
                  <div class="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/30 group-hover:scale-110 transition-transform">
                    <FeatherIcon name="map-pin" class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">Location</h3>
                    <p class="text-gray-600 dark:text-gray-400">New Delhi, India</p>
                  </div>
                </div>
              </div>

              <!-- Social Links -->
              <div class="mt-8">
                <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Follow Us</h3>
                <div class="flex gap-4">
                  <a href="#" class="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-cyan-500/30">
                    <FeatherIcon name="github" class="w-5 h-5" />
                  </a>
                  <a href="#" class="w-10 h-10 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-fuchsia-500/30">
                    <FeatherIcon name="twitter" class="w-5 h-5" />
                  </a>
                  <a href="#" class="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-violet-500/30">
                    <FeatherIcon name="linkedin" class="w-5 h-5" />
                  </a>
                  <a href="#" class="w-10 h-10 bg-gradient-to-br from-rose-500 to-red-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-rose-500/30">
                    <FeatherIcon name="youtube" class="w-5 h-5" />
                  </a>
                </div>
              </div>

              <!-- FAQ -->
              <div class="mt-12">
                <div class="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
                  <FeatherIcon name="help-circle" class="w-4 h-4 mr-2" />
                  FAQ
                </div>
                <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h3>
                <div class="space-y-4">
                  <details class="group">
                    <summary class="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg cursor-pointer hover:from-cyan-100 hover:to-blue-100 dark:hover:from-cyan-900/30 dark:hover:to-blue-900/30 transition-all border border-cyan-100 dark:border-cyan-800">
                      <span class="font-medium text-gray-900 dark:text-white">How do I submit an app?</span>
                      <FeatherIcon name="chevron-down" class="w-5 h-5 text-cyan-600 dark:text-cyan-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <p class="p-4 text-gray-600 dark:text-gray-400 bg-cyan-50/50 dark:bg-cyan-900/10 rounded-b-lg border-x border-b border-cyan-100 dark:border-cyan-800">Create a developer account, then go to the Developer Portal and click "Submit App". Fill in the required information and submit for review.</p>
                  </details>
                  <details class="group">
                    <summary class="flex items-center justify-between p-4 bg-gradient-to-r from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20 rounded-lg cursor-pointer hover:from-fuchsia-100 hover:to-pink-100 dark:hover:from-fuchsia-900/30 dark:hover:to-pink-900/30 transition-all border border-fuchsia-100 dark:border-fuchsia-800">
                      <span class="font-medium text-gray-900 dark:text-white">What are the fees?</span>
                      <FeatherIcon name="chevron-down" class="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <p class="p-4 text-gray-600 dark:text-gray-400 bg-fuchsia-50/50 dark:bg-fuchsia-900/10 rounded-b-lg border-x border-b border-fuchsia-100 dark:border-fuchsia-800">We charge a 20% commission on paid applications. Free apps have no listing fees.</p>
                  </details>
                  <details class="group">
                    <summary class="flex items-center justify-between p-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-lg cursor-pointer hover:from-violet-100 hover:to-purple-100 dark:hover:from-violet-900/30 dark:hover:to-purple-900/30 transition-all border border-violet-100 dark:border-violet-800">
                      <span class="font-medium text-gray-900 dark:text-white">How do refunds work?</span>
                      <FeatherIcon name="chevron-down" class="w-5 h-5 text-violet-600 dark:text-violet-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <p class="p-4 text-gray-600 dark:text-gray-400 bg-violet-50/50 dark:bg-violet-900/10 rounded-b-lg border-x border-b border-violet-100 dark:border-violet-800">Refunds are available within 14 days of purchase if the app doesn't work as described. See our Refund Policy for details.</p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Modal -->
    <div v-if="showSuccess" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl border border-cyan-100 dark:border-cyan-800">
        <div class="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/40">
          <FeatherIcon name="check" class="w-8 h-8 text-white" />
        </div>
        <h3 class="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">Message Sent!</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
        <Button @click="showSuccess = false" variant="solid" class="!bg-gradient-to-r !from-cyan-500 !to-fuchsia-500 !text-white !border-0 hover:!from-cyan-600 hover:!to-fuchsia-600 !shadow-lg !shadow-cyan-500/40">Close</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Button, FeatherIcon, Input } from "frappe-ui"
import { ref } from "vue"

const form = ref({
	name: "",
	email: "",
	subject: "",
	message: "",
})

const showSuccess = ref(false)

function submitForm() {
	// Validate form
	if (
		!form.value.name ||
		!form.value.email ||
		!form.value.subject ||
		!form.value.message
	) {
		alert("Please fill in all fields")
		return
	}

	// In production, this would send to an API
	console.log("Form submitted:", form.value)

	// Show success modal
	showSuccess.value = true

	// Reset form
	form.value = {
		name: "",
		email: "",
		subject: "",
		message: "",
	}
}
</script>
