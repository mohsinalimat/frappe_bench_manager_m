import path from "node:path"
import vue from "@vitejs/plugin-vue"
import frappeui from "frappe-ui/vite"
import Icons from "unplugin-icons/vite"
import { defineConfig } from "vite"

// Plugin to transform CSS links to async loading
function asyncCssPlugin() {
	return {
		name: 'async-css',
		transformIndexHtml: {
			order: 'post',
			handler(html) {
				// Transform stylesheet links to preload with onload
				return html.replace(
					/<link rel="stylesheet" crossorigin href="([^"]+)">/g,
					(match, href) => {
						return `<link rel="preload" crossorigin href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" crossorigin href="${href}"></noscript>`
					}
				)
			}
		}
	}
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		Icons({
			compiler: "vue3",
			autoInstall: true,
		}),
		frappeui({
			buildConfig: {
				indexHtmlPath: path.resolve(
					__dirname,
					"../bench_manager/www/home.html",
				),
			},
		}),
		asyncCssPlugin(),
	],
	build: {
		outDir: "../bench_manager/public/frontend",
		emptyOutDir: true,
		target: "es2015",
		commonjsOptions: {
			include: [/tailwind.config.js/, /node_modules/],
		},
		sourcemap: false,
		modulePreload: {
			polyfill: false,
		},
		cssCodeSplit: true,
		rollupOptions: {
			output: {
				manualChunks: {
					"frappe-ui": ["frappe-ui"],
					"vue-vendor": ["vue", "vue-router"],
					"@vueuse-head": ["@vueuse/head"],
					marked: ["marked"],
				},
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	optimizeDeps: {
		include: [
			"frappe-ui",
			"showdown",
			"tailwind.config.js",
			"engine.io-client",
		],
	},
	server: {
		port: 8080,
		proxy: {
			"^/(app|login|api|assets|files|private)": {
				target: "http://localhost:8000",
				ws: true,
				router: (req) => {
					const site_name = req.headers.host.split(":")[0]
					return `http://${site_name}:8000`
				},
			},
		},
	},
})
