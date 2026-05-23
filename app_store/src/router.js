import { userResource } from "@/data/user"
import { createRouter, createWebHistory } from "vue-router"
import { session } from "./data/session"

const routes = [
	// Public routes (No auth required)
	{
		path: "/",
		name: "Home",
		component: () => import("@/pages/public/Home.vue"),
		meta: {
			requiresAuth: false,
			layout: "public",
			title:
				"Worf - Frappe Solutions Company | End-to-End Frappe Ecosystem Services",
			description:
				"Transform your business with comprehensive Frappe solutions. We offer Frappe app development, ERPNext implementation, cloud hosting, DevOps services, security, and migrations.",
			robots: "index, follow",
		},
	},
	{
		path: "/store",
		name: "Store",
		component: () => import("@/pages/public/Store.vue"),
		meta: {
			requiresAuth: false,
			layout: "public",
			title: "Frappe App Store | Browse Frappe Applications",
			description:
				"Browse and discover powerful Frappe applications for your business. Find apps for ERPNext, HRMS, and more.",
			robots: "index, follow",
		},
	},
	{
		path: "/apps",
		name: "AppListing",
		component: () => import("@/pages/public/AppListing.vue"),
		meta: {
			requiresAuth: false,
			layout: "public",
			title: "Browse All Frappe Apps | Worf App Store",
			description:
				"Explore our complete catalog of Frappe applications. Find the perfect app for your business needs.",
			robots: "index, follow",
		},
	},
	{
		path: "/app-store/:id",
		name: "AppDetail",
		component: () => import("@/pages/public/AppDetail.vue"),
		meta: {
			requiresAuth: false,
			layout: "public",
			title: "Frappe App Details | Worf App Store",
			description:
				"View detailed information about this Frappe application including features, pricing, and reviews.",
			robots: "index, follow",
		},
	},
	{
		path: "/category/:slug",
		name: "CategoryPage",
		component: () => import("@/pages/public/CategoryPage.vue"),
		meta: {
			requiresAuth: false,
			layout: "public",
			title: "Frappe Apps by Category | Worf App Store",
			description:
				"Browse Frappe applications by category. Find apps tailored to your industry or use case.",
			robots: "index, follow",
		},
	},
	{
		path: "/search",
		name: "Search",
		component: () => import("@/pages/public/Search.vue"),
		meta: {
			requiresAuth: false,
			layout: "public",
			title: "Search Frappe Apps | Worf App Store",
			description:
				"Search for Frappe applications by name, category, or developer. Find the perfect app for your needs.",
			robots: "noindex, follow",
		},
	},
	{
		path: "/developer/:developerId",
		name: "DeveloperProfile",
		component: () => import("@/pages/public/DeveloperProfile.vue"),
		meta: {
			requiresAuth: false,
			layout: "public",
			title: "Developer Profile | Worf App Store",
			description:
				"View developer profile and their published Frappe applications.",
			robots: "index, follow",
		},
	},
	{
		path: "/about",
		name: "About",
		component: () => import("@/pages/public/About.vue"),
		meta: {
			requiresAuth: false,
			layout: "public",
			title: "About Worf | Frappe Solutions Company",
			description:
				"Learn about Worf, your trusted partner for Frappe ecosystem solutions. Our mission, team, and values.",
			robots: "index, follow",
		},
	},
	{
		path: "/contact",
		name: "Contact",
		component: () => import("@/pages/public/Contact.vue"),
		meta: {
			requiresAuth: false,
			layout: "public",
			title: "Contact Worf | Frappe Solutions Company",
			description:
				"Get in touch with Worf for Frappe development, implementation, and consulting services.",
			robots: "index, follow",
		},
	},
	{
		path: "/terms",
		name: "Terms",
		component: () => import("@/pages/public/Terms.vue"),
		meta: {
			requiresAuth: false,
			layout: "public",
			title: "Terms of Service | Worf App Store",
			description:
				"Read our terms of service for using the Worf App Store and purchasing Frappe applications.",
			robots: "noindex, follow",
		},
	},
	{
		path: "/privacy",
		name: "Privacy",
		component: () => import("@/pages/public/Privacy.vue"),
		meta: {
			requiresAuth: false,
			layout: "public",
			title: "Privacy Policy | Worf App Store",
			description:
				"Learn how Worf protects your privacy and handles your data.",
			robots: "noindex, follow",
		},
	},
	{
		path: "/developer-policy",
		name: "DeveloperPolicy",
		component: () => import("@/pages/public/DeveloperPolicy.vue"),
		meta: {
			requiresAuth: false,
			layout: "public",
			title: "Developer Policy | Worf App Store",
			description:
				"Guidelines and policies for developers publishing apps on the Worf App Store.",
			robots: "noindex, follow",
		},
	},
	{
		path: "/buyer-policy",
		name: "BuyerPolicy",
		component: () => import("@/pages/public/BuyerPolicy.vue"),
		meta: {
			requiresAuth: false,
			layout: "public",
			title: "Buyer Policy | Worf App Store",
			description:
				"Terms and conditions for purchasing apps on the Worf App Store.",
			robots: "noindex, follow",
		},
	},
	{
		path: "/refunds",
		name: "Refunds",
		component: () => import("@/pages/public/Refunds.vue"),
		meta: {
			requiresAuth: false,
			layout: "public",
			title: "Refund Policy | Worf App Store",
			description:
				"Our refund policy for Frappe app purchases on the Worf App Store.",
			robots: "noindex, follow",
		},
	},
	// Auth routes
	{
		name: "Login",
		path: "/signin",
		component: () => import("@/pages/Login.vue"),
		meta: {
			requiresAuth: false,
			layout: "public",
			title: "Sign In | Worf App Store",
			description:
				"Sign in to your Worf App Store account to manage your apps and purchases.",
			robots: "noindex, follow",
		},
	},
	{
		name: "Signup",
		path: "/signup",
		component: () => import("@/pages/Signup.vue"),
		meta: {
			requiresAuth: false,
			layout: "public",
			title: "Sign Up | Worf App Store",
			description:
				"Create an account on the Worf App Store to browse and purchase Frappe applications.",
			robots: "noindex, follow",
		},
	},
	{
		name: "Dashboard",
		path: "/dashboard",
		component: () => import("@/pages/Dashboard.vue"),
		meta: {
			requiresAuth: true,
			layout: "public",
			title: "Dashboard | Worf App Store",
			description:
				"Your personal dashboard for managing your Worf App Store account.",
			robots: "noindex, nofollow",
		},
	},
	{
		name: "Community",
		path: "/community",
		component: () => import("@/pages/Community.vue"),
		meta: {
			requiresAuth: false,
			layout: "public",
			title: "Community | Worf App Store",
			description: "Join the Worf community of Frappe developers and users.",
			robots: "index, follow",
		},
	},
	// Buyer routes (Auth required)
	{
		path: "/my-apps",
		name: "MyApps",
		component: () => import("@/pages/buyer/MyApps.vue"),
		meta: {
			requiresAuth: true,
			layout: "public",
			title: "My Apps | Worf App Store",
			description: "View and manage your purchased Frappe applications.",
			robots: "noindex, nofollow",
		},
	},
	{
		path: "/purchases",
		name: "PurchaseHistory",
		component: () => import("@/pages/buyer/PurchaseHistory.vue"),
		meta: {
			requiresAuth: true,
			layout: "public",
			title: "Purchase History | Worf App Store",
			description: "View your purchase history and invoices.",
			robots: "noindex, nofollow",
		},
	},
	{
		path: "/wishlist",
		name: "Wishlist",
		component: () => import("@/pages/buyer/Wishlist.vue"),
		meta: {
			requiresAuth: true,
			layout: "public",
			title: "Wishlist | Worf App Store",
			description: "View your wishlist of Frappe applications.",
			robots: "noindex, nofollow",
		},
	},
	{
		path: "/settings",
		name: "AccountSettings",
		component: () => import("@/pages/buyer/AccountSettings.vue"),
		meta: {
			requiresAuth: true,
			layout: "public",
			title: "Account Settings | Worf App Store",
			description: "Manage your account settings and preferences.",
			robots: "noindex, nofollow",
		},
	},
	// Developer routes (Auth required)
	{
		path: "/developer",
		name: "DeveloperDashboard",
		component: () => import("@/pages/developer/Dashboard.vue"),
		meta: {
			requiresAuth: true,
			layout: "developer",
			title: "Developer Dashboard | Worf App Store",
			description:
				"Developer dashboard for managing your published Frappe applications.",
			robots: "noindex, nofollow",
		},
	},
	{
		path: "/developer/apps",
		name: "MyPublishedApps",
		component: () => import("@/pages/developer/MyApps.vue"),
		meta: {
			requiresAuth: true,
			layout: "developer",
			title: "My Published Apps | Worf App Store",
			description: "Manage your published Frappe applications.",
			robots: "noindex, nofollow",
		},
	},
	{
		path: "/developer/submit",
		name: "SubmitApp",
		component: () => import("@/pages/developer/SubmitApp.vue"),
		meta: {
			requiresAuth: true,
			layout: "developer",
			title: "Submit App | Worf App Store",
			description: "Submit your Frappe application to the Worf App Store.",
			robots: "noindex, nofollow",
		},
	},
	{
		path: "/developer/apps/:id/analytics",
		name: "AppAnalytics",
		component: () => import("@/pages/developer/AppAnalytics.vue"),
		meta: {
			requiresAuth: true,
			layout: "developer",
			title: "App Analytics | Worf App Store",
			description: "View analytics for your published Frappe application.",
			robots: "noindex, nofollow",
		},
	},
	{
		path: "/developer/earnings",
		name: "Earnings",
		component: () => import("@/pages/developer/Earnings.vue"),
		meta: {
			requiresAuth: true,
			layout: "developer",
			title: "Earnings | Worf App Store",
			description: "View your earnings from app sales.",
			robots: "noindex, nofollow",
		},
	},
	{
		path: "/developer/payouts",
		name: "Payouts",
		component: () => import("@/pages/developer/Payouts.vue"),
		meta: {
			requiresAuth: true,
			layout: "developer",
			title: "Payouts | Worf App Store",
			description: "Manage your payout requests and history.",
			robots: "noindex, nofollow",
		},
	},
	// Admin routes (Auth required)
	{
		path: "/admin",
		name: "AdminDashboard",
		component: () => import("@/pages/admin/Dashboard.vue"),
		meta: {
			requiresAuth: true,
			layout: "admin",
			title: "Admin Dashboard | Worf App Store",
			description: "Admin dashboard for managing the Worf App Store.",
			robots: "noindex, nofollow",
		},
	},
	{
		path: "/admin/moderation",
		name: "ModerationQueue",
		component: () => import("@/pages/admin/ModerationQueue.vue"),
		meta: {
			requiresAuth: true,
			layout: "admin",
			title: "Moderation Queue | Worf App Store",
			description: "Moderate submitted Frappe applications.",
			robots: "noindex, nofollow",
		},
	},
	{
		path: "/admin/users",
		name: "UserManagement",
		component: () => import("@/pages/admin/UserManagement.vue"),
		meta: {
			requiresAuth: true,
			layout: "admin",
			title: "User Management | Worf App Store",
			description: "Manage users on the Worf App Store.",
			robots: "noindex, nofollow",
		},
	},
	{
		path: "/admin/reports",
		name: "Reports",
		component: () => import("@/pages/admin/Reports.vue"),
		meta: {
			requiresAuth: true,
			layout: "admin",
			title: "Reports | Worf App Store",
			description: "View reports and analytics for the Worf App Store.",
			robots: "noindex, nofollow",
		},
	},
]

const router = createRouter({
	history: createWebHistory("/"),
	routes,
})

router.beforeEach(async (to, from, next) => {
	const requiresAuth = to.meta.requiresAuth !== false

	let isLoggedIn = session.isLoggedIn
	try {
		await userResource.promise
	} catch (error) {
		isLoggedIn = false
	}

	if (to.name === "Login" && isLoggedIn) {
		next({ name: "Home" })
	} else if (requiresAuth && !isLoggedIn) {
		next({ name: "Login" })
	} else {
		next()
	}
})

export default router
