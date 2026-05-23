import { useHead } from "@vueuse/head"

export function useOrganizationSchema() {
	const schema = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Worf",
		url: "https://worf.cloud",
		logo: "https://worf.cloud/assets/bench_manager/frontend/logo.png",
		description:
			"Transform your business with comprehensive Frappe solutions. We offer Frappe app development, ERPNext implementation, cloud hosting, DevOps services, security, and migrations.",
		contactPoint: {
			"@type": "ContactPoint",
			telephone: "+1-800-WORF-FRAPPE",
			contactType: "sales",
			email: "contact@worf.cloud",
			areaServed: "US",
			availableLanguage: ["en"],
		},
		sameAs: [
			"https://twitter.com/worffrappe",
			"https://linkedin.com/company/worffrappe",
			"https://github.com/worffrappe",
		],
		address: {
			"@type": "PostalAddress",
			streetAddress: "123 Tech Street",
			addressLocality: "San Francisco",
			addressRegion: "CA",
			postalCode: "94105",
			addressCountry: "US",
		},
	}

	useHead({
		script: [
			{
				type: "application/ld+json",
				innerHTML: JSON.stringify(schema),
			},
		],
	})
}

export function useLocalBusinessSchema() {
	const schema = {
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		name: "Worf - Frappe Solutions Company",
		image: "https://worf.cloud/assets/bench_manager/frontend/logo.png",
		description:
			"Transform your business with comprehensive Frappe solutions. We offer Frappe app development, ERPNext implementation, cloud hosting, DevOps services, security, and migrations.",
		address: {
			"@type": "PostalAddress",
			streetAddress: "123 Tech Street",
			addressLocality: "San Francisco",
			addressRegion: "CA",
			postalCode: "94105",
			addressCountry: "US",
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: 37.7749,
			longitude: -122.4194,
		},
		url: "https://worf.cloud",
		telephone: "+1-800-WORF-FRAPPE",
		openingHoursSpecification: {
			"@type": "OpeningHoursSpecification",
			dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
			opens: "09:00",
			closes: "18:00",
		},
		priceRange: "$$$",
	}

	useHead({
		script: [
			{
				type: "application/ld+json",
				innerHTML: JSON.stringify(schema),
			},
		],
	})
}

export function useProductSchema(appData) {
	if (!appData) return

	const schema = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: appData.app_title || appData.app_name,
		description: appData.app_description,
		applicationCategory: appData.category,
		operatingSystem: "Frappe Framework, ERPNext",
		offers: {
			"@type": "Offer",
			price: appData.price || 0,
			priceCurrency: appData.currency || "USD",
			availability: appData.is_published
				? "https://schema.org/InStock"
				: "https://schema.org/OutOfStock",
			seller: {
				"@type": "Organization",
				name: "Worf",
				url: "https://worf.cloud",
			},
		},
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: appData.rating || 0,
			reviewCount: appData.review_count || 0,
		},
		url: `https://worf.cloud/app-store/${appData.name}`,
	}

	useHead({
		script: [
			{
				type: "application/ld+json",
				innerHTML: JSON.stringify(schema),
			},
		],
	})
}

export function useBreadcrumbSchema(items) {
	const schema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	}

	useHead({
		script: [
			{
				type: "application/ld+json",
				innerHTML: JSON.stringify(schema),
			},
		],
	})
}
