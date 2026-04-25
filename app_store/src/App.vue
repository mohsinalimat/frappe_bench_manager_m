<template>
  <Loader v-if="isLoading" />
  <component v-else :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useHead } from "@vueuse/head"
import { computed, watch } from "vue"
import { useRoute } from "vue-router"
import AdminLayout from "./layouts/AdminLayout.vue"
import DeveloperLayout from "./layouts/DeveloperLayout.vue"
import PublicLayout from "./layouts/PublicLayout.vue"
import Loader from "./components/Loader.vue"

const isLoading = ref(true)

onMounted(() => {
	// Hide loader after a brief delay to ensure smooth transition
	setTimeout(() => {
		isLoading.value = false
	}, 300)
})

// Show loader during route transitions
watch(
	() => route.path,
	() => {
		isLoading.value = true
		setTimeout(() => {
			isLoading.value = false
		}, 200)
	},
)

const route = useRoute()

const layout = computed(() => {
	const layoutType = route.meta.layout
	if (layoutType === "public") {
		return PublicLayout
	} else if (layoutType === "developer") {
		return DeveloperLayout
	} else if (layoutType === "admin") {
		return AdminLayout
	}
	// Default layout
	return "div"
})

// Default SEO meta tags
const defaultMeta = {
	title: "Worf | Frappe & ERPNext Solutions Company",
	meta: [
		{
			name: "description",
			content:
				"Worf delivers expert Frappe app development, ERPNext implementation, cloud hosting & DevOps. 100+ successful implementations across industries.",
		},
		{
			name: "keywords",
			content:
				"Frappe, ERPNext, Frappe development, ERPNext implementation, cloud hosting, DevOps, cybersecurity, business software, enterprise software, migration services",
		},
		{
			name: "robots",
			content: "index, follow",
		},
		{
			property: "og:title",
			content: "Worf | Frappe & ERPNext Solutions Company",
		},
		{
			property: "og:description",
			content:
				"Worf delivers expert Frappe app development, ERPNext implementation, cloud hosting & DevOps. 100+ successful implementations across industries.",
		},
		{
			property: "og:type",
			content: "website",
		},
		{
			property: "og:url",
			content: "https://worf.cloud",
		},
		{
			property: "og:image",
			content: "https://worf.cloud/assets/bench_manager/frontend/favicon.png",
		},
		{
			name: "twitter:card",
			content: "summary_large_image",
		},
		{
			name: "twitter:title",
			content: "Worf | Frappe & ERPNext Solutions Company",
		},
		{
			name: "twitter:description",
			content:
				"Worf delivers expert Frappe app development, ERPNext implementation, cloud hosting & DevOps. 100+ successful implementations across industries.",
		},
		{
			name: "twitter:image",
			content: "https://worf.cloud/assets/bench_manager/frontend/favicon.png",
		},
	],
	link: [
		{
			rel: "canonical",
			href: "https://worf.cloud",
		},
	],
}

// Apply default meta tags
useHead(defaultMeta)

// Update meta tags based on route
watch(
	() => route.meta,
	(newMeta) => {
		const headUpdates = {}

		if (newMeta.title) {
			headUpdates.title = newMeta.title
		}

		if (newMeta.description) {
			headUpdates.meta = headUpdates.meta || []
			headUpdates.meta.push({
				name: "description",
				content: newMeta.description,
			})
		}

		if (newMeta.robots) {
			headUpdates.meta = headUpdates.meta || []
			headUpdates.meta.push({
				name: "robots",
				content: newMeta.robots,
			})
		}

		// Update OG tags for social media
		if (newMeta.title) {
			headUpdates.meta = headUpdates.meta || []
			headUpdates.meta.push({
				property: "og:title",
				content: newMeta.title,
			})
		}

		if (newMeta.description) {
			headUpdates.meta = headUpdates.meta || []
			headUpdates.meta.push({
				property: "og:description",
				content: newMeta.description,
			})
		}

		if (Object.keys(headUpdates).length > 0) {
			useHead(headUpdates)
		}
	},
	{ immediate: true, deep: true },
)
</script>
