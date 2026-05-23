import { t as __exportAll } from "../chunks/chunk-qL-ZPAcD.js";
import { t as _Page_exports } from "../chunks/chunk-BYoQFZ-k.js";
import { dangerouslySkipEscape, escapeInject } from "vike/server";
import { renderToString } from "vue/server-renderer";
//#region \0@oxc-project+runtime@0.127.0/helpers/taggedTemplateLiteral.js
function _taggedTemplateLiteral(e, t) {
	return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
//#endregion
//#region renderer/+onRenderHtml.js
var _onRenderHtml_exports = /* @__PURE__ */ __exportAll({ onRenderHtml: () => onRenderHtml });
var _templateObject;
function onRenderHtml(pageContext) {
	const { Page } = pageContext;
	const appHtml = dangerouslySkipEscape(renderToString(Page));
	return escapeInject(_templateObject || (_templateObject = _taggedTemplateLiteral(["<!DOCTYPE html>\n	<html lang=\"en\">\n	<head>\n		<meta charset=\"UTF-8\" />\n		<link rel=\"icon\" href=\"/favicon.png\" />\n		<link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/apple-touch-icon.png\" />\n		<link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"/favicon-32x32.png\" />\n		<link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"/favicon-16x16.png\" />\n		<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n		<meta name=\"description\" content=\"Worf delivers expert Frappe app development, ERPNext implementation, cloud hosting & DevOps. 100+ successful implementations across industries.\" />\n		<meta name=\"keywords\" content=\"Frappe, ERPNext, Frappe development, ERPNext implementation, cloud hosting, DevOps, cybersecurity, business software, enterprise software, migration services\" />\n		<meta name=\"robots\" content=\"index, follow\" />\n		<meta property=\"og:title\" content=\"Worf | Frappe & ERPNext Solutions Company\" />\n		<meta property=\"og:description\" content=\"Worf delivers expert Frappe app development, ERPNext implementation, cloud hosting & DevOps. 100+ successful implementations across industries.\" />\n		<meta property=\"og:type\" content=\"website\" />\n		<meta property=\"og:url\" content=\"https://worf.cloud\" />\n		<meta property=\"og:image\" content=\"https://worf.cloud/assets/bench_manager/frontend/favicon.png\" />\n		<meta name=\"twitter:card\" content=\"summary_large_image\" />\n		<meta name=\"twitter:title\" content=\"Worf | Frappe & ERPNext Solutions Company\" />\n		<meta name=\"twitter:description\" content=\"Worf delivers expert Frappe app development, ERPNext implementation, cloud hosting & DevOps. 100+ successful implementations across industries.\" />\n		<meta name=\"twitter:image\" content=\"https://worf.cloud/assets/bench_manager/frontend/favicon.png\" />\n		<link rel=\"canonical\" href=\"https://worf.cloud\" />\n		<title>Worf | Frappe & ERPNext Solutions Company</title>\n	</head>\n	<body>\n		<div id=\"app\">", "</div>\n		<script>window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}<\/script><script id=\"zsiqscript\" src=\"https://salesiq.zohopublic.com/widget?wc=siqbbd14ec7794e54dc4a06d0b0d06131e06896194ffe9bd9ed3093130107bc359b\" defer><\/script>\n	</body>\n	</html>"])), appHtml);
}
//#endregion
//#region \0virtual:vike:page-entry:server:/pages/index
var configValuesSerialized = {
	["isClientRuntimeLoaded"]: {
		type: "computed",
		definedAtData: null,
		valueSerialized: {
			type: "js-serialized",
			value: true
		}
	},
	["onRenderHtml"]: {
		type: "standard",
		definedAtData: {
			"filePathToShowToUser": "/renderer/+onRenderHtml.js",
			"fileExportPathToShowToUser": []
		},
		valueSerialized: {
			type: "plus-file",
			exportValues: _onRenderHtml_exports
		}
	},
	["Page"]: {
		type: "standard",
		definedAtData: {
			"filePathToShowToUser": "/pages/index/+Page.vue",
			"fileExportPathToShowToUser": []
		},
		valueSerialized: {
			type: "plus-file",
			exportValues: _Page_exports
		}
	}
};
//#endregion
export { configValuesSerialized };

//# sourceMappingURL=pages_index.mjs.map