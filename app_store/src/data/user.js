import router from "@/router"
import { createResource } from "frappe-ui"

export const userResource = createResource({
	url: "bench_manager.api.get_user_info",
	cache: "User",
	auto: true,
	onError(error) {
		// Silently handle errors - user might be guest
		// Don't log to console to avoid noise
		if (error && error.exc_type === "AuthenticationError") {
			router.push({ name: "LoginPage" })
		}
	},
})
