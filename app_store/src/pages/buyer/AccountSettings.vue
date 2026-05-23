<template>
  <div class="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white dark:from-gray-900 dark:via-amber-900/20 dark:to-gray-900 py-8">
    <div class="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-600 dark:text-amber-400 text-sm font-medium mb-4">
            <FeatherIcon name="settings" class="w-4 h-4 mr-2" />
            Settings
          </div>
          <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-amber-700 dark:from-white dark:to-amber-300 bg-clip-text text-transparent mb-2">Account Settings</h1>
          <p class="text-gray-600 dark:text-gray-400">Manage your account information and preferences</p>
        </div>

        <!-- Loading State -->
        <div v-if="accountSettings.loading" class="flex justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
        </div>

        <!-- Form -->
        <div v-else-if="accountSettings.data">
          <Card class="border border-gray-100 dark:border-gray-700">
            <div class="p-6 space-y-6">
              <!-- Profile Image -->
              <div class="flex items-center gap-6">
                <div class="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/40">
                  <img v-if="accountSettings.data.profile_image" :src="getFileUrl(accountSettings.data.profile_image)" class="w-full h-full rounded-full object-cover" alt="Profile" />
                  <FeatherIcon v-else name="user" class="w-12 h-12 text-white" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">{{ accountSettings.data.member_name }}</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ accountSettings.data.email }}</p>
                </div>
              </div>

              <!-- Personal Information -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FeatherIcon name="user" class="w-5 h-5 text-amber-500" />
                  Personal Information
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    <input v-model="formData.member_name" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input v-model="accountSettings.data.email" type="email" disabled class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                    <input v-model="formData.phone" type="tel" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company</label>
                    <input v-model="formData.company" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Designation</label>
                    <input v-model="formData.designation" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                </div>
              </div>

              <!-- Billing Information -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FeatherIcon name="credit-card" class="w-5 h-5 text-amber-500" />
                  Billing Information
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GSTIN</label>
                    <input v-model="formData.gstin" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                </div>
              </div>

              <!-- Notes -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                <textarea v-model="formData.notes" rows="3" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"></textarea>
              </div>

              <!-- Account Stats -->
              <div class="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4">
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Account Statistics</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div class="text-center">
                    <div class="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{{ formatDate(accountSettings.data.member_since) }}</div>
                    <div class="text-xs text-gray-600 dark:text-gray-400">Member Since</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{{ accountSettings.data.member_status }}</div>
                    <div class="text-xs text-gray-600 dark:text-gray-400">Status</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{{ accountSettings.data.total_purchases || 0 }}</div>
                    <div class="text-xs text-gray-600 dark:text-gray-400">Total Purchases</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{{ accountSettings.data.purchased_apps?.length || 0 }}</div>
                    <div class="text-xs text-gray-600 dark:text-gray-400">Apps Owned</div>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button @click="resetForm" variant="outline">Cancel</Button>
                <Button @click="saveSettings" :loading="saving" class="!bg-gradient-to-r !from-amber-500 !to-orange-500 !text-white !border-0 hover:!from-amber-600 hover:!to-orange-600 !shadow-lg !shadow-amber-500/40">
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { createResource } from "frappe-ui"
import { Button, Card, FeatherIcon } from "frappe-ui"
import { ref, watch } from "vue"

const accountSettings = createResource({
	url: "bench_manager.api.get_account_settings",
	auto: true,
})

const formData = ref({})
const saving = ref(false)

// Initialize form data when account settings load
watch(
	() => accountSettings.data,
	(newData) => {
		if (newData) {
			formData.value = {
				member_name: newData.member_name || "",
				phone: newData.phone || "",
				company: newData.company || "",
				designation: newData.designation || "",
				gstin: newData.gstin || "",
				notes: newData.notes || "",
			}
		}
	},
	{ immediate: true },
)

function getFileUrl(filePath) {
	if (!filePath) return ""
	if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
		return filePath
	}
	if (filePath.startsWith("/files/")) {
		return filePath
	}
	return `/files/${filePath}`
}

function formatDate(date) {
	if (!date) return "N/A"
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	})
}

function resetForm() {
	if (accountSettings.data) {
		formData.value = {
			member_name: accountSettings.data.member_name || "",
			phone: accountSettings.data.phone || "",
			company: accountSettings.data.company || "",
			designation: accountSettings.data.designation || "",
			gstin: accountSettings.data.gstin || "",
			notes: accountSettings.data.notes || "",
		}
	}
}

function saveSettings() {
	saving.value = true
	createResource({
		url: "bench_manager.api.update_account_settings",
		makeParams: () => ({ data: formData.value }),
		onSuccess: () => {
			accountSettings.reload()
			saving.value = false
		},
		onError: () => {
			saving.value = false
		},
	}).fetch()
}
</script>
