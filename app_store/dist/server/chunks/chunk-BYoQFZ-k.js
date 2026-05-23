import { t as __exportAll } from "./chunk-qL-ZPAcD.js";
import { i as _sfc_main$1, r as Button_default } from "./chunk-DFeanm8o.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { createTextVNode, createVNode, mergeProps, unref, useSSRContext, withCtx } from "vue";
import { useHead } from "@vueuse/head";
//#region src/composables/useSchema.js
function useOrganizationSchema() {
	useHead({ script: [{
		type: "application/ld+json",
		innerHTML: JSON.stringify({
			"@context": "https://schema.org",
			"@type": "Organization",
			name: "Worf",
			url: "https://worf.cloud",
			logo: "https://worf.cloud/assets/bench_manager/frontend/logo.png",
			description: "Transform your business with comprehensive Frappe solutions. We offer Frappe app development, ERPNext implementation, cloud hosting, DevOps services, security, and migrations.",
			contactPoint: {
				"@type": "ContactPoint",
				telephone: "+1-800-WORF-FRAPPE",
				contactType: "sales",
				email: "contact@worf.cloud",
				areaServed: "US",
				availableLanguage: ["en"]
			},
			sameAs: [
				"https://twitter.com/worffrappe",
				"https://linkedin.com/company/worffrappe",
				"https://github.com/worffrappe"
			],
			address: {
				"@type": "PostalAddress",
				streetAddress: "123 Tech Street",
				addressLocality: "San Francisco",
				addressRegion: "CA",
				postalCode: "94105",
				addressCountry: "US"
			}
		})
	}] });
}
function useLocalBusinessSchema() {
	useHead({ script: [{
		type: "application/ld+json",
		innerHTML: JSON.stringify({
			"@context": "https://schema.org",
			"@type": "LocalBusiness",
			name: "Worf - Frappe Solutions Company",
			image: "https://worf.cloud/assets/bench_manager/frontend/logo.png",
			description: "Transform your business with comprehensive Frappe solutions. We offer Frappe app development, ERPNext implementation, cloud hosting, DevOps services, security, and migrations.",
			address: {
				"@type": "PostalAddress",
				streetAddress: "123 Tech Street",
				addressLocality: "San Francisco",
				addressRegion: "CA",
				postalCode: "94105",
				addressCountry: "US"
			},
			geo: {
				"@type": "GeoCoordinates",
				latitude: 37.7749,
				longitude: -122.4194
			},
			url: "https://worf.cloud",
			telephone: "+1-800-WORF-FRAPPE",
			openingHoursSpecification: {
				"@type": "OpeningHoursSpecification",
				dayOfWeek: [
					"Monday",
					"Tuesday",
					"Wednesday",
					"Thursday",
					"Friday"
				],
				opens: "09:00",
				closes: "18:00"
			},
			priceRange: "$$$"
		})
	}] });
}
//#endregion
//#region pages/index/+Page.vue
var _Page_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main });
var _sfc_main = {
	__name: "+Page",
	__ssrInlineRender: true,
	setup(__props) {
		useOrganizationSchema();
		useLocalBusinessSchema();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white" }, _attrs))}><!-- Hero Section --><section class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white"><!-- Animated Background Elements --><div class="absolute inset-0"><div class="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse"></div><div class="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" style="${ssrRenderStyle({ "animation-delay": "1s" })}"></div><div class="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse" style="${ssrRenderStyle({ "animation-delay": "2s" })}"></div></div><!-- Grid Pattern Overlay --><div class="absolute inset-0 opacity-5"><div class="absolute inset-0" style="${ssrRenderStyle({
				"background-image": "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
				"background-size": "50px 50px"
			})}"></div></div><div class="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-24 lg:py-32"><div class="max-w-7xl mx-auto"><div class="grid lg:grid-cols-2 gap-12 items-center"><!-- Left Content --><div class="text-center lg:text-left"><!-- Badge --><div class="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 mb-6"><span class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span><span class="text-sm font-semibold">100+ Businesses Trust Us</span></div><!-- Main Heading --><h1 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"> Transform Your Business with <span class="block text-white"> End-to-End Frappe Solutions </span></h1><!-- Subtitle --><p class="text-lg md:text-xl text-blue-50 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"> From development to deployment, hosting to security — we deliver complete Frappe ecosystem services. Build, scale, and manage your business applications with confidence. </p><!-- CTA Buttons --><div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"><a href="/contact">`);
			_push(ssrRenderComponent(unref(Button_default), {
				variant: "solid",
				size: "lg",
				class: "!bg-white !text-blue-700 !border-0 hover:!bg-gray-100 !shadow-xl transform hover:scale-105 transition-all font-semibold"
			}, {
				prefix: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(unref(_sfc_main$1), {
						name: "calendar",
						class: "w-5 h-5"
					}, null, _parent, _scopeId));
					else return [createVNode(unref(_sfc_main$1), {
						name: "calendar",
						class: "w-5 h-5"
					})];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Book Free Consultation `);
					else return [createTextVNode(" Book Free Consultation ")];
				}),
				_: 1
			}, _parent));
			_push(`</a><a href="/store">`);
			_push(ssrRenderComponent(unref(Button_default), {
				variant: "solid",
				size: "lg",
				class: "!bg-blue-800/50 !text-white !border-blue-600 hover:!bg-blue-800/70 !shadow-lg transform hover:scale-105 transition-all font-semibold"
			}, {
				prefix: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(unref(_sfc_main$1), {
						name: "grid",
						class: "w-5 h-5"
					}, null, _parent, _scopeId));
					else return [createVNode(unref(_sfc_main$1), {
						name: "grid",
						class: "w-5 h-5"
					})];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Explore Our Services `);
					else return [createTextVNode(" Explore Our Services ")];
				}),
				_: 1
			}, _parent));
			_push(`</a></div><!-- Quick Stats --><div class="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start"><div class="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3"><div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "check-circle",
				class: "w-5 h-5 text-blue-600"
			}, null, _parent));
			_push(`</div><div><div class="text-lg font-bold text-white">100+</div><div class="text-xs text-blue-200">Projects</div></div></div><div class="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3"><div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "globe",
				class: "w-5 h-5 text-emerald-600"
			}, null, _parent));
			_push(`</div><div><div class="text-lg font-bold text-white">15+</div><div class="text-xs text-blue-200">Industries</div></div></div><div class="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3"><div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "clock",
				class: "w-5 h-5 text-violet-600"
			}, null, _parent));
			_push(`</div><div><div class="text-lg font-bold text-white">24/7</div><div class="text-xs text-blue-200">Support</div></div></div></div></div><!-- Right Content - Services Preview --><div class="relative hidden lg:block"><div class="relative h-96"><!-- Service Cards --><div class="absolute top-0 left-0 w-64 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-5 transform rotate-3 hover:rotate-0 transition-transform duration-500 shadow-xl"><div class="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center mb-3">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "code",
				class: "w-6 h-6 text-white"
			}, null, _parent));
			_push(`</div><h3 class="font-semibold text-white mb-1">Development</h3><p class="text-sm text-blue-100">Custom Frappe apps</p></div><div class="absolute top-20 right-0 w-64 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-5 transform -rotate-2 hover:rotate-0 transition-transform duration-500 shadow-xl"><div class="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center mb-3">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "cloud",
				class: "w-6 h-6 text-white"
			}, null, _parent));
			_push(`</div><h3 class="font-semibold text-white mb-1">Cloud Hosting</h3><p class="text-sm text-blue-100">Managed infrastructure</p></div><div class="absolute bottom-10 left-20 w-64 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-5 transform rotate-2 hover:rotate-0 transition-transform duration-500 shadow-xl"><div class="w-12 h-12 bg-gradient-to-br from-violet-400 to-purple-600 rounded-xl flex items-center justify-center mb-3">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "shield",
				class: "w-6 h-6 text-white"
			}, null, _parent));
			_push(`</div><h3 class="font-semibold text-white mb-1">Security</h3><p class="text-sm text-blue-100">Enterprise-grade</p></div></div></div></div></div></div><!-- Bottom Wave --><div class="absolute bottom-0 left-0 right-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" class="w-full h-20 lg:h-32"><path fill="#ffffff" fill-opacity="1" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path></svg></div></section><!-- Pain Points Section --><section class="py-20 bg-gray-50"><div class="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"><div class="max-w-7xl mx-auto"><!-- Section Header --><div class="text-center mb-16"><div class="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-semibold mb-4">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "alert-circle",
				class: "w-4 h-4 mr-2"
			}, null, _parent));
			_push(` Common Challenges </div><h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> Struggling with Fragmented IT Solutions? </h2><p class="text-gray-600 max-w-2xl mx-auto text-lg"> These challenges cost businesses time, money, and opportunities. Let us help you overcome them. </p></div><!-- Pain Points Grid --><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><div class="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-shadow"><div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "layers",
				class: "w-6 h-6 text-red-600"
			}, null, _parent));
			_push(`</div><h3 class="font-bold text-gray-900 mb-2">Multiple Vendors</h3><p class="text-gray-600 text-sm">Integration headaches from working with different vendors for different needs</p></div><div class="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-shadow"><div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "shield-off",
				class: "w-6 h-6 text-orange-600"
			}, null, _parent));
			_push(`</div><h3 class="font-bold text-gray-900 mb-2">Security Vulnerabilities</h3><p class="text-gray-600 text-sm">Self-hosted deployments with inadequate security measures and compliance gaps</p></div><div class="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-shadow"><div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "clock",
				class: "w-6 h-6 text-yellow-600"
			}, null, _parent));
			_push(`</div><h3 class="font-bold text-gray-900 mb-2">Downtime During Updates</h3><p class="text-gray-600 text-sm">Business disruption during system updates and maintenance windows</p></div><div class="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-shadow"><div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "cpu",
				class: "w-6 h-6 text-purple-600"
			}, null, _parent));
			_push(`</div><h3 class="font-bold text-gray-900 mb-2">Lack of DevOps Expertise</h3><p class="text-gray-600 text-sm">No in-house team for CI/CD, automation, and infrastructure management</p></div><div class="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-shadow"><div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "file-text",
				class: "w-6 h-6 text-blue-600"
			}, null, _parent));
			_push(`</div><h3 class="font-bold text-gray-900 mb-2">Complex Compliance</h3><p class="text-gray-600 text-sm">Difficulty meeting industry regulations and data protection requirements</p></div><div class="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-shadow"><div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "trending-up",
				class: "w-6 h-6 text-green-600"
			}, null, _parent));
			_push(`</div><h3 class="font-bold text-gray-900 mb-2">Scaling Challenges</h3><p class="text-gray-600 text-sm">Legacy systems that can&#39;t scale with business growth and demand</p></div></div></div></div></section><!-- Services Overview Section --><section class="py-20 bg-white"><div class="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"><div class="max-w-7xl mx-auto"><!-- Section Header --><div class="text-center mb-16"><div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "briefcase",
				class: "w-4 h-4 mr-2"
			}, null, _parent));
			_push(` Our Services </div><h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> Comprehensive Frappe Ecosystem Services </h2><p class="text-gray-600 max-w-2xl mx-auto text-lg"> Everything you need to build, deploy, and manage your Frappe applications — all from one trusted partner </p></div><!-- Services Grid --><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!-- Service 1 --><div class="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500 hover:shadow-2xl transition-all duration-300"><div class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "code",
				class: "w-7 h-7 text-white"
			}, null, _parent));
			_push(`</div><h3 class="text-xl font-bold text-gray-900 mb-3">Frappe App Development</h3><p class="text-gray-600 mb-4 text-sm leading-relaxed"> Custom app development on Frappe Framework including ERPNext, HRMS, Payroll, Helpdesk, and LMS implementations with industry-specific solutions </p><ul class="space-y-2 text-sm text-gray-600"><li class="flex items-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "check",
				class: "w-4 h-4 mr-2 text-cyan-600"
			}, null, _parent));
			_push(`Custom app development</li><li class="flex items-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "check",
				class: "w-4 h-4 mr-2 text-cyan-600"
			}, null, _parent));
			_push(`API integrations</li><li class="flex items-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "check",
				class: "w-4 h-4 mr-2 text-cyan-600"
			}, null, _parent));
			_push(`Custom workflows</li></ul></div><!-- Service 2 --><div class="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-emerald-500 hover:shadow-2xl transition-all duration-300"><div class="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "settings",
				class: "w-7 h-7 text-white"
			}, null, _parent));
			_push(`</div><h3 class="text-xl font-bold text-gray-900 mb-3">Implementation &amp; Customization</h3><p class="text-gray-600 mb-4 text-sm leading-relaxed"> End-to-end ERPNext implementation with module configuration, custom reports, dashboards, and business process automation </p><ul class="space-y-2 text-sm text-gray-600"><li class="flex items-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "check",
				class: "w-4 h-4 mr-2 text-emerald-600"
			}, null, _parent));
			_push(`ERPNext implementation</li><li class="flex items-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "check",
				class: "w-4 h-4 mr-2 text-emerald-600"
			}, null, _parent));
			_push(`Custom reports &amp; dashboards</li><li class="flex items-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "check",
				class: "w-4 h-4 mr-2 text-emerald-600"
			}, null, _parent));
			_push(`Business automation</li></ul></div><!-- Service 3 --><div class="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-violet-500 hover:shadow-2xl transition-all duration-300"><div class="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "cloud",
				class: "w-7 h-7 text-white"
			}, null, _parent));
			_push(`</div><h3 class="text-xl font-bold text-gray-900 mb-3">Cloud Hosting Management</h3><p class="text-gray-600 mb-4 text-sm leading-relaxed"> Managed Frappe cloud hosting with automatic updates, backups, monitoring, multi-environment setup, and 99.9% uptime SLA </p><ul class="space-y-2 text-sm text-gray-600"><li class="flex items-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "check",
				class: "w-4 h-4 mr-2 text-violet-600"
			}, null, _parent));
			_push(`Managed hosting</li><li class="flex items-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "check",
				class: "w-4 h-4 mr-2 text-violet-600"
			}, null, _parent));
			_push(`Auto backups &amp; updates</li><li class="flex items-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "check",
				class: "w-4 h-4 mr-2 text-violet-600"
			}, null, _parent));
			_push(`99.9% uptime SLA</li></ul></div><!-- Service 4 --><div class="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-orange-500 hover:shadow-2xl transition-all duration-300"><div class="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "cpu",
				class: "w-7 h-7 text-white"
			}, null, _parent));
			_push(`</div><h3 class="text-xl font-bold text-gray-900 mb-3">Frappe DevOps Services</h3><p class="text-gray-600 mb-4 text-sm leading-relaxed"> CI/CD pipeline setup, GitHub integration, container orchestration, Infrastructure as Code, and automated testing </p><ul class="space-y-2 text-sm text-gray-600"><li class="flex items-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "check",
				class: "w-4 h-4 mr-2 text-orange-600"
			}, null, _parent));
			_push(`CI/CD pipelines</li><li class="flex items-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "check",
				class: "w-4 h-4 mr-2 text-orange-600"
			}, null, _parent));
			_push(`Docker &amp; Kubernetes</li><li class="flex items-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "check",
				class: "w-4 h-4 mr-2 text-orange-600"
			}, null, _parent));
			_push(`Infrastructure as Code</li></ul></div><!-- Service 5 --><div class="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-red-500 hover:shadow-2xl transition-all duration-300"><div class="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "shield",
				class: "w-7 h-7 text-white"
			}, null, _parent));
			_push(`</div><h3 class="text-xl font-bold text-gray-900 mb-3">Security &amp; Compliance</h3><p class="text-gray-600 mb-4 text-sm leading-relaxed"> Security audits, penetration testing, ISO 27001 &amp; GDPR compliance, access control, and managed security patches </p><ul class="space-y-2 text-sm text-gray-600"><li class="flex items-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "check",
				class: "w-4 h-4 mr-2 text-red-600"
			}, null, _parent));
			_push(`Security audits</li><li class="flex items-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "check",
				class: "w-4 h-4 mr-2 text-red-600"
			}, null, _parent));
			_push(`ISO 27001 &amp; GDPR</li><li class="flex items-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "check",
				class: "w-4 h-4 mr-2 text-red-600"
			}, null, _parent));
			_push(`Penetration testing</li></ul></div><!-- Service 6 --><div class="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500 hover:shadow-2xl transition-all duration-300"><div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "server",
				class: "w-7 h-7 text-white"
			}, null, _parent));
			_push(`</div><h3 class="text-xl font-bold text-gray-900 mb-3">On-Site Deployment &amp; Migrations</h3><p class="text-gray-600 mb-4 text-sm leading-relaxed"> On-premise deployment, legacy ERP to ERPNext migration, cloud-to-cloud migration, and zero-downtime transitions </p><ul class="space-y-2 text-sm text-gray-600"><li class="flex items-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "check",
				class: "w-4 h-4 mr-2 text-blue-600"
			}, null, _parent));
			_push(`On-premise deployment</li><li class="flex items-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "check",
				class: "w-4 h-4 mr-2 text-blue-600"
			}, null, _parent));
			_push(`Legacy migration</li><li class="flex items-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "check",
				class: "w-4 h-4 mr-2 text-blue-600"
			}, null, _parent));
			_push(`Zero-downtime migration</li></ul></div></div></div></div></section><!-- Industries Section --><section class="py-20 bg-gray-50"><div class="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"><div class="max-w-7xl mx-auto"><!-- Section Header --><div class="text-center mb-16"><div class="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "globe",
				class: "w-4 h-4 mr-2"
			}, null, _parent));
			_push(` Industries </div><h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> Industries We Serve </h2><p class="text-gray-600 max-w-2xl mx-auto text-lg"> Tailored Frappe solutions for diverse industry verticals </p></div><!-- Industries Grid --><div class="grid grid-cols-2 md:grid-cols-4 gap-6"><div class="bg-white rounded-xl p-6 text-center border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-shadow"><div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "box",
				class: "w-8 h-8 text-white"
			}, null, _parent));
			_push(`</div><h3 class="font-bold text-gray-900">Manufacturing</h3></div><div class="bg-white rounded-xl p-6 text-center border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-shadow"><div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "shopping-cart",
				class: "w-8 h-8 text-white"
			}, null, _parent));
			_push(`</div><h3 class="font-bold text-gray-900">Retail &amp; E-commerce</h3></div><div class="bg-white rounded-xl p-6 text-center border-2 border-gray-200 hover:border-red-500 hover:shadow-xl transition-shadow"><div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "heart",
				class: "w-8 h-8 text-white"
			}, null, _parent));
			_push(`</div><h3 class="font-bold text-gray-900">Healthcare</h3></div><div class="bg-white rounded-xl p-6 text-center border-2 border-gray-200 hover:border-violet-500 hover:shadow-xl transition-shadow"><div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "book",
				class: "w-8 h-8 text-white"
			}, null, _parent));
			_push(`</div><h3 class="font-bold text-gray-900">Education &amp; EdTech</h3></div><div class="bg-white rounded-xl p-6 text-center border-2 border-gray-200 hover:border-orange-500 hover:shadow-xl transition-shadow"><div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "briefcase",
				class: "w-8 h-8 text-white"
			}, null, _parent));
			_push(`</div><h3 class="font-bold text-gray-900">Services</h3></div><div class="bg-white rounded-xl p-6 text-center border-2 border-gray-200 hover:border-pink-500 hover:shadow-xl transition-shadow"><div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "heart",
				class: "w-8 h-8 text-white"
			}, null, _parent));
			_push(`</div><h3 class="font-bold text-gray-900">Non-profit</h3></div><div class="bg-white rounded-xl p-6 text-center border-2 border-gray-200 hover:border-cyan-500 hover:shadow-xl transition-shadow"><div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "truck",
				class: "w-8 h-8 text-white"
			}, null, _parent));
			_push(`</div><h3 class="font-bold text-gray-900">Logistics</h3></div><div class="bg-white rounded-xl p-6 text-center border-2 border-gray-200 hover:border-amber-500 hover:shadow-xl transition-shadow"><div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "dollar-sign",
				class: "w-8 h-8 text-white"
			}, null, _parent));
			_push(`</div><h3 class="font-bold text-gray-900">Financial Services</h3></div></div></div></div></section><!-- Why Choose Us Section --><section class="py-20 bg-white"><div class="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"><div class="max-w-7xl mx-auto"><!-- Section Header --><div class="text-center mb-16"><div class="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "star",
				class: "w-4 h-4 mr-2"
			}, null, _parent));
			_push(` Why Worf </div><h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> Why Businesses Choose Worf </h2><p class="text-gray-600 max-w-2xl mx-auto text-lg"> Your trusted partner for complete Frappe ecosystem solutions </p></div><!-- Features Grid --><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"><div class="text-center"><div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "layers",
				class: "w-8 h-8 text-white"
			}, null, _parent));
			_push(`</div><h3 class="font-bold text-gray-900 mb-2">End-to-End Expertise</h3><p class="text-sm text-gray-600">Single partner for development, hosting, security, and DevOps</p></div><div class="text-center"><div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "code",
				class: "w-8 h-8 text-white"
			}, null, _parent));
			_push(`</div><h3 class="font-bold text-gray-900 mb-2">Frappe Specialists</h3><p class="text-sm text-gray-600">Deep expertise in Frappe Framework and entire ecosystem</p></div><div class="text-center"><div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "award",
				class: "w-8 h-8 text-white"
			}, null, _parent));
			_push(`</div><h3 class="font-bold text-gray-900 mb-2">Proven Track Record</h3><p class="text-sm text-gray-600">100+ successful implementations across industries</p></div><div class="text-center"><div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">`);
			_push(ssrRenderComponent(unref(_sfc_main$1), {
				name: "headphones",
				class: "w-8 h-8 text-white"
			}, null, _parent));
			_push(`</div><h3 class="font-bold text-gray-900 mb-2">24/7 Support</h3><p class="text-sm text-gray-600">Round-the-clock technical support and monitoring</p></div></div></div></div></section><!-- CTA Section --><section class="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden"><!-- Animated Background --><div class="absolute inset-0"><div class="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" style="${ssrRenderStyle({ "animation-delay": "1s" })}"></div></div><div class="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"><div class="max-w-4xl mx-auto text-center"><h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"> Ready to Transform Your Business? </h2><p class="text-xl text-blue-50 mb-8"> Let&#39;s discuss how our comprehensive Frappe solutions can help you achieve your business goals. </p><div class="flex flex-col sm:flex-row gap-4 justify-center"><a href="/contact">`);
			_push(ssrRenderComponent(unref(Button_default), {
				variant: "solid",
				size: "lg",
				class: "!bg-white !text-blue-700 !border-0 hover:!bg-gray-100 !shadow-xl transform hover:scale-105 transition-all font-semibold"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Schedule Your Free Consultation `);
					else return [createTextVNode(" Schedule Your Free Consultation ")];
				}),
				_: 1
			}, _parent));
			_push(`</a><a href="/store">`);
			_push(ssrRenderComponent(unref(Button_default), {
				variant: "solid",
				size: "lg",
				class: "!bg-blue-800/50 !text-white !border-blue-600 hover:!bg-blue-800/70 !shadow-lg transform hover:scale-105 transition-all font-semibold"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Browse App Store `);
					else return [createTextVNode(" Browse App Store ")];
				}),
				_: 1
			}, _parent));
			_push(`</a></div></div></div></section></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/+Page.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _Page_exports as t };

//# sourceMappingURL=chunk-BYoQFZ-k.js.map