import { t as __exportAll } from "./chunk-qL-ZPAcD.js";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderSlot, ssrRenderStyle, ssrRenderVNode } from "vue/server-renderer";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, h, markRaw, mergeProps, nextTick, onMounted, onUnmounted, openBlock, reactive, ref, renderList, renderSlot, resolveComponent, resolveDynamicComponent, toDisplayString, unref, useAttrs, useSSRContext, useSlots, withCtx, withKeys } from "vue";
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, PopoverAnchor, PopoverContent, PopoverPortal, PopoverRoot, TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from "reka-ui";
import feather from "feather-icons";
import { useRouter } from "vue-router";
//#region node_modules/frappe-ui/src/utils/debounce.ts
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = void 0;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = window.setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}
//#endregion
//#region \0@oxc-project+runtime@0.127.0/helpers/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
//#endregion
//#region \0@oxc-project+runtime@0.127.0/helpers/toPrimitive.js
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
//#endregion
//#region \0@oxc-project+runtime@0.127.0/helpers/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
//#endregion
//#region \0@oxc-project+runtime@0.127.0/helpers/defineProperty.js
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
//#endregion
//#region \0@oxc-project+runtime@0.127.0/helpers/objectSpread2.js
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
//#endregion
//#region \0@oxc-project+runtime@0.127.0/helpers/asyncToGenerator.js
function asyncGeneratorStep(n, t, e, r, o, a, c) {
	try {
		var i = n[a](c), u = i.value;
	} catch (n) {
		e(n);
		return;
	}
	i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
	return function() {
		var t = this, e = arguments;
		return new Promise(function(r, o) {
			var a = n.apply(t, e);
			function _next(n) {
				asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
			}
			function _throw(n) {
				asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
			}
			_next(void 0);
		});
	};
}
//#endregion
//#region ~icons/lucide/x
var _hoisted_1 = {
	viewBox: "0 0 24 24",
	width: "1.2em",
	height: "1.2em"
};
function render(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1, [..._cache[0] || (_cache[0] = [createElementVNode("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M18 6L6 18M6 6l12 12"
	}, null, -1)])]);
}
var x_default = markRaw({
	name: "lucide-x",
	render
});
//#endregion
//#region node_modules/frappe-ui/src/components/Popover/Popover.vue?vue&type=script&setup=true&lang.ts
var Popover_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent(_objectSpread2(_objectSpread2({}, { inheritAttrs: false }), {}, {
	__name: "Popover",
	__ssrInlineRender: true,
	props: {
		show: {
			type: Boolean,
			default: void 0
		},
		trigger: { default: "click" },
		hoverDelay: { default: 0 },
		leaveDelay: { default: .5 },
		placement: { default: "bottom-start" },
		popoverClass: { default: "" },
		transition: { default: null },
		hideOnBlur: {
			type: Boolean,
			default: true
		},
		matchTargetWidth: { type: Boolean },
		offset: {},
		collisionPadding: { default: 10 }
	},
	emits: [
		"open",
		"close",
		"update:show"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		__expose({
			open,
			close
		});
		const _isOpen = ref(false);
		const pointerOverTargetOrPopup = ref(false);
		const hoverTimer = ref(null);
		const leaveTimer = ref(null);
		const anchorRef = ref(null);
		const isOpen = computed({
			get: () => isShowPropPassed.value ? props.show : _isOpen.value,
			set: (value) => {
				if (!isShowPropPassed.value) _isOpen.value = value;
				emit("update:show", value);
			}
		});
		const isShowPropPassed = computed(() => {
			return props.show !== void 0;
		});
		const placementSide = computed(() => {
			const [side] = props.placement.split("-");
			return side;
		});
		const placementAlign = computed(() => {
			const [, align] = props.placement.split("-");
			if (!align) return "center";
			return align;
		});
		function togglePopover(flag) {
			if (flag instanceof Event) flag = void 0;
			if (flag == null) flag = !isOpen.value;
			flag = Boolean(flag);
			if (flag) open();
			else close();
		}
		function updatePosition() {}
		function open() {
			isOpen.value = true;
		}
		function close() {
			isOpen.value = false;
		}
		function onUpdateOpen(value) {
			emit("update:show", value);
			if (value) emit("open");
			else emit("close");
		}
		function onMouseover() {
			pointerOverTargetOrPopup.value = true;
			if (leaveTimer.value) {
				clearTimeout(leaveTimer.value);
				leaveTimer.value = null;
			}
			if (props.trigger === "hover") if (props.hoverDelay) hoverTimer.value = setTimeout(() => {
				if (pointerOverTargetOrPopup.value) open();
			}, Number(props.hoverDelay) * 1e3);
			else open();
		}
		function onMouseleave() {
			pointerOverTargetOrPopup.value = false;
			if (hoverTimer.value) {
				clearTimeout(hoverTimer.value);
				hoverTimer.value = null;
			}
			if (props.trigger === "hover") {
				if (leaveTimer.value) clearTimeout(leaveTimer.value);
				if (props.leaveDelay) leaveTimer.value = setTimeout(() => {
					if (!pointerOverTargetOrPopup.value) close();
				}, Number(props.leaveDelay) * 1e3);
				else if (!pointerOverTargetOrPopup.value) close();
			}
		}
		function onInteractOutside(event) {
			if (!props.hideOnBlur) {
				event.preventDefault();
				return;
			}
			const target = event.target;
			if (anchorRef.value && (anchorRef.value.contains(target) || anchorRef.value === target)) {
				event.preventDefault();
				return;
			}
		}
		const hasTransition = computed(() => {
			return props.transition === "default";
		});
		onUnmounted(() => {
			if (hoverTimer.value) clearTimeout(hoverTimer.value);
			if (leaveTimer.value) clearTimeout(leaveTimer.value);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(PopoverRoot), mergeProps({
				open: isOpen.value,
				"onUpdate:open": [($event) => isOpen.value = $event, onUpdateOpen]
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(PopoverAnchor), { asChild: "" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="${ssrRenderClass(["flex", _ctx.$attrs.class])}" style="${ssrRenderStyle(_ctx.$attrs.style)}"${_scopeId}>`);
									ssrRenderSlot(_ctx.$slots, "target", {
										togglePopover,
										updatePosition,
										open,
										close,
										isOpen: isOpen.value
									}, null, _push, _parent, _scopeId);
									_push(`</div>`);
								} else return [createVNode("div", {
									ref_key: "anchorRef",
									ref: anchorRef,
									class: ["flex", _ctx.$attrs.class],
									style: _ctx.$attrs.style,
									onMouseover,
									onMouseleave
								}, [renderSlot(_ctx.$slots, "target", {
									togglePopover,
									updatePosition,
									open,
									close,
									isOpen: isOpen.value
								})], 38)];
							}),
							_: 3
						}, _parent, _scopeId));
						_push(ssrRenderComponent(unref(PopoverPortal), null, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(unref(PopoverContent), {
									side: placementSide.value,
									align: placementAlign.value,
									sideOffset: __props.offset,
									collisionPadding: __props.collisionPadding,
									style: { minWidth: __props.matchTargetWidth ? "var(--reka-popover-trigger-width)" : void 0 },
									class: ["PopoverContent", { "has-transition": hasTransition.value }],
									onMouseover: () => {
										pointerOverTargetOrPopup.value = true;
									},
									onMouseleave,
									onInteractOutside
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="${ssrRenderClass([["body-container", __props.popoverClass], "relative"])}"${_scopeId}>`);
											ssrRenderSlot(_ctx.$slots, "body", {
												togglePopover,
												updatePosition,
												open,
												close,
												isOpen: isOpen.value
											}, () => {
												_push(`<div class="rounded-lg border bg-surface-modal shadow-xl"${_scopeId}>`);
												ssrRenderSlot(_ctx.$slots, "body-main", {
													togglePopover,
													updatePosition,
													open,
													close,
													isOpen: isOpen.value
												}, null, _push, _parent, _scopeId);
												_push(`</div>`);
											}, _push, _parent, _scopeId);
											_push(`</div>`);
										} else return [createVNode("div", { class: ["relative", ["body-container", __props.popoverClass]] }, [renderSlot(_ctx.$slots, "body", {
											togglePopover,
											updatePosition,
											open,
											close,
											isOpen: isOpen.value
										}, () => [createVNode("div", { class: "rounded-lg border bg-surface-modal shadow-xl" }, [renderSlot(_ctx.$slots, "body-main", {
											togglePopover,
											updatePosition,
											open,
											close,
											isOpen: isOpen.value
										})])])], 2)];
									}),
									_: 3
								}, _parent, _scopeId));
								else return [createVNode(unref(PopoverContent), {
									side: placementSide.value,
									align: placementAlign.value,
									sideOffset: __props.offset,
									collisionPadding: __props.collisionPadding,
									style: { minWidth: __props.matchTargetWidth ? "var(--reka-popover-trigger-width)" : void 0 },
									class: ["PopoverContent", { "has-transition": hasTransition.value }],
									onMouseover: () => {
										pointerOverTargetOrPopup.value = true;
									},
									onMouseleave,
									onInteractOutside
								}, {
									default: withCtx(() => [createVNode("div", { class: ["relative", ["body-container", __props.popoverClass]] }, [renderSlot(_ctx.$slots, "body", {
										togglePopover,
										updatePosition,
										open,
										close,
										isOpen: isOpen.value
									}, () => [createVNode("div", { class: "rounded-lg border bg-surface-modal shadow-xl" }, [renderSlot(_ctx.$slots, "body-main", {
										togglePopover,
										updatePosition,
										open,
										close,
										isOpen: isOpen.value
									})])])], 2)]),
									_: 3
								}, 8, [
									"side",
									"align",
									"sideOffset",
									"collisionPadding",
									"style",
									"class",
									"onMouseover"
								])];
							}),
							_: 3
						}, _parent, _scopeId));
					} else return [createVNode(unref(PopoverAnchor), { asChild: "" }, {
						default: withCtx(() => [createVNode("div", {
							ref_key: "anchorRef",
							ref: anchorRef,
							class: ["flex", _ctx.$attrs.class],
							style: _ctx.$attrs.style,
							onMouseover,
							onMouseleave
						}, [renderSlot(_ctx.$slots, "target", {
							togglePopover,
							updatePosition,
							open,
							close,
							isOpen: isOpen.value
						})], 38)]),
						_: 3
					}), createVNode(unref(PopoverPortal), null, {
						default: withCtx(() => [createVNode(unref(PopoverContent), {
							side: placementSide.value,
							align: placementAlign.value,
							sideOffset: __props.offset,
							collisionPadding: __props.collisionPadding,
							style: { minWidth: __props.matchTargetWidth ? "var(--reka-popover-trigger-width)" : void 0 },
							class: ["PopoverContent", { "has-transition": hasTransition.value }],
							onMouseover: () => {
								pointerOverTargetOrPopup.value = true;
							},
							onMouseleave,
							onInteractOutside
						}, {
							default: withCtx(() => [createVNode("div", { class: ["relative", ["body-container", __props.popoverClass]] }, [renderSlot(_ctx.$slots, "body", {
								togglePopover,
								updatePosition,
								open,
								close,
								isOpen: isOpen.value
							}, () => [createVNode("div", { class: "rounded-lg border bg-surface-modal shadow-xl" }, [renderSlot(_ctx.$slots, "body-main", {
								togglePopover,
								updatePosition,
								open,
								close,
								isOpen: isOpen.value
							})])])], 2)]),
							_: 3
						}, 8, [
							"side",
							"align",
							"sideOffset",
							"collisionPadding",
							"style",
							"class",
							"onMouseover"
						])]),
						_: 3
					})];
				}),
				_: 3
			}, _parent));
		};
	}
}));
//#endregion
//#region node_modules/frappe-ui/src/components/Popover/Popover.vue
var _sfc_setup$8 = Popover_vue_vue_type_script_setup_true_lang_default.setup;
Popover_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/frappe-ui/src/components/Popover/Popover.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var Popover_default = Popover_vue_vue_type_script_setup_true_lang_default;
//#endregion
//#region node_modules/frappe-ui/src/components/FeatherIcon.vue
var validIcons = Object.keys(feather.icons);
var _sfc_main$1 = {
	props: {
		name: {
			type: String,
			required: true,
			validator(value) {
				const valid = validIcons.includes(value);
				if (!valid) {
					console.groupCollapsed("[frappe-ui] name property for feather-icon must be one of ");
					console.dir(validIcons);
					console.groupEnd();
				}
				return valid;
			}
		},
		color: {
			type: String,
			default: null
		},
		strokeWidth: {
			type: Number,
			default: 1.5
		}
	},
	render() {
		let icon = feather.icons[this.name];
		if (!icon) icon = feather.icons["circle"];
		return h("svg", mergeProps(icon.attrs, {
			fill: "none",
			stroke: "currentColor",
			color: this.color,
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
			"stroke-width": this.strokeWidth,
			width: null,
			height: null,
			class: [icon.attrs.class, "shrink-0"],
			innerHTML: icon.contents
		}, this.$attrs));
	}
};
var _sfc_setup$7 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/frappe-ui/src/components/FeatherIcon.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
//#endregion
//#region node_modules/frappe-ui/src/components/LoadingIndicator.vue?vue&type=script&setup=true&lang.ts
var LoadingIndicator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "LoadingIndicator",
	__ssrInlineRender: true,
	props: { scale: {
		required: false,
		default: 100
	} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<svg${ssrRenderAttrs(mergeProps({
				class: "max-w-xs animate-spin",
				xmlns: "http://www.w3.org/2000/svg",
				fill: "none",
				style: `scale: ${__props.scale}%;`,
				viewBox: "0 0 24 24"
			}, _attrs))}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
		};
	}
});
//#endregion
//#region node_modules/frappe-ui/src/components/LoadingIndicator.vue
var _sfc_setup$6 = LoadingIndicator_vue_vue_type_script_setup_true_lang_default.setup;
LoadingIndicator_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/frappe-ui/src/components/LoadingIndicator.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var LoadingIndicator_default = LoadingIndicator_vue_vue_type_script_setup_true_lang_default;
//#endregion
//#region node_modules/frappe-ui/src/components/Tooltip/Tooltip.vue?vue&type=script&setup=true&lang.ts
var Tooltip_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent(_objectSpread2(_objectSpread2({}, { inheritAttrs: false }), {}, {
	__name: "Tooltip",
	__ssrInlineRender: true,
	props: {
		text: { default: "" },
		hoverDelay: { default: .5 },
		placement: { default: "top" },
		arrowClass: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: "fill-surface-gray-7"
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const props = __props;
		const delayDuration = computed(() => props.hoverDelay * 1e3);
		return (_ctx, _push, _parent, _attrs) => {
			if (__props.disabled) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			else _push(ssrRenderComponent(unref(TooltipProvider), mergeProps({ delayDuration: delayDuration.value }, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(unref(TooltipRoot), null, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(unref(TooltipTrigger), { "as-child": "" }, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
										else return [renderSlot(_ctx.$slots, "default")];
									}),
									_: 3
								}, _parent, _scopeId));
								_push(ssrRenderComponent(unref(TooltipPortal), null, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) if (props.text || _ctx.$slots.body || _ctx.$slots.content) _push(ssrRenderComponent(unref(TooltipContent), {
											side: props.placement,
											"side-offset": 4,
											class: "z-[100]"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) {
													ssrRenderSlot(_ctx.$slots, "body", {}, () => {
														_push(`<div class="rounded bg-surface-gray-7 px-2 py-1 text-xs text-ink-white shadow-xl"${_scopeId}>`);
														ssrRenderSlot(_ctx.$slots, "content", {}, () => {
															_push(`${ssrInterpolate(props.text)}`);
														}, _push, _parent, _scopeId);
														_push(`</div>`);
													}, _push, _parent, _scopeId);
													_push(ssrRenderComponent(unref(TooltipArrow), {
														class: props.arrowClass,
														width: 8,
														height: 4
													}, null, _parent, _scopeId));
												} else return [renderSlot(_ctx.$slots, "body", {}, () => [createVNode("div", { class: "rounded bg-surface-gray-7 px-2 py-1 text-xs text-ink-white shadow-xl" }, [renderSlot(_ctx.$slots, "content", {}, () => [createTextVNode(toDisplayString(props.text), 1)])])]), createVNode(unref(TooltipArrow), {
													class: props.arrowClass,
													width: 8,
													height: 4
												}, null, 8, ["class"])];
											}),
											_: 3
										}, _parent, _scopeId));
										else _push(`<!---->`);
										else return [props.text || _ctx.$slots.body || _ctx.$slots.content ? (openBlock(), createBlock(unref(TooltipContent), {
											key: 0,
											side: props.placement,
											"side-offset": 4,
											class: "z-[100]"
										}, {
											default: withCtx(() => [renderSlot(_ctx.$slots, "body", {}, () => [createVNode("div", { class: "rounded bg-surface-gray-7 px-2 py-1 text-xs text-ink-white shadow-xl" }, [renderSlot(_ctx.$slots, "content", {}, () => [createTextVNode(toDisplayString(props.text), 1)])])]), createVNode(unref(TooltipArrow), {
												class: props.arrowClass,
												width: 8,
												height: 4
											}, null, 8, ["class"])]),
											_: 3
										}, 8, ["side"])) : createCommentVNode("v-if", true)];
									}),
									_: 3
								}, _parent, _scopeId));
							} else return [createVNode(unref(TooltipTrigger), { "as-child": "" }, {
								default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
								_: 3
							}), createVNode(unref(TooltipPortal), null, {
								default: withCtx(() => [props.text || _ctx.$slots.body || _ctx.$slots.content ? (openBlock(), createBlock(unref(TooltipContent), {
									key: 0,
									side: props.placement,
									"side-offset": 4,
									class: "z-[100]"
								}, {
									default: withCtx(() => [renderSlot(_ctx.$slots, "body", {}, () => [createVNode("div", { class: "rounded bg-surface-gray-7 px-2 py-1 text-xs text-ink-white shadow-xl" }, [renderSlot(_ctx.$slots, "content", {}, () => [createTextVNode(toDisplayString(props.text), 1)])])]), createVNode(unref(TooltipArrow), {
										class: props.arrowClass,
										width: 8,
										height: 4
									}, null, 8, ["class"])]),
									_: 3
								}, 8, ["side"])) : createCommentVNode("v-if", true)]),
								_: 3
							})];
						}),
						_: 3
					}, _parent, _scopeId));
					else return [createVNode(unref(TooltipRoot), null, {
						default: withCtx(() => [createVNode(unref(TooltipTrigger), { "as-child": "" }, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
							_: 3
						}), createVNode(unref(TooltipPortal), null, {
							default: withCtx(() => [props.text || _ctx.$slots.body || _ctx.$slots.content ? (openBlock(), createBlock(unref(TooltipContent), {
								key: 0,
								side: props.placement,
								"side-offset": 4,
								class: "z-[100]"
							}, {
								default: withCtx(() => [renderSlot(_ctx.$slots, "body", {}, () => [createVNode("div", { class: "rounded bg-surface-gray-7 px-2 py-1 text-xs text-ink-white shadow-xl" }, [renderSlot(_ctx.$slots, "content", {}, () => [createTextVNode(toDisplayString(props.text), 1)])])]), createVNode(unref(TooltipArrow), {
									class: props.arrowClass,
									width: 8,
									height: 4
								}, null, 8, ["class"])]),
								_: 3
							}, 8, ["side"])) : createCommentVNode("v-if", true)]),
							_: 3
						})]),
						_: 3
					})];
				}),
				_: 3
			}, _parent));
		};
	}
}));
//#endregion
//#region node_modules/frappe-ui/src/components/Tooltip/Tooltip.vue
var _sfc_setup$5 = Tooltip_vue_vue_type_script_setup_true_lang_default.setup;
Tooltip_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/frappe-ui/src/components/Tooltip/Tooltip.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var Tooltip_default = Tooltip_vue_vue_type_script_setup_true_lang_default;
//#endregion
//#region node_modules/frappe-ui/src/components/Button/Button.vue?vue&type=script&setup=true&lang.ts
var Button_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent(_objectSpread2(_objectSpread2({}, { inheritAttrs: false }), {}, {
	__name: "Button",
	__ssrInlineRender: true,
	props: {
		theme: { default: "gray" },
		size: { default: "sm" },
		variant: { default: "subtle" },
		label: {},
		icon: {},
		iconLeft: {},
		iconRight: {},
		tooltip: {},
		loading: {
			type: Boolean,
			default: false
		},
		loadingText: {},
		disabled: {
			type: Boolean,
			default: false
		},
		route: {},
		link: {},
		type: { default: "button" }
	},
	setup(__props, { expose: __expose }) {
		const props = __props;
		const slots = useSlots();
		const router = useRouter();
		const buttonClasses = computed(() => {
			let solidClasses = {
				gray: "text-ink-white bg-surface-gray-7 hover:bg-surface-gray-6 active:bg-surface-gray-5",
				blue: "text-ink-white bg-blue-500 hover:bg-surface-blue-3 active:bg-blue-700",
				green: "text-ink-white bg-surface-green-3 hover:bg-green-700 active:bg-green-800",
				red: "text-ink-white bg-surface-red-5 hover:bg-surface-red-6 active:bg-surface-red-7"
			}[props.theme];
			let subtleClasses = {
				gray: "text-ink-gray-8 bg-surface-gray-2 hover:bg-surface-gray-3 active:bg-surface-gray-4",
				blue: "text-ink-blue-3 bg-surface-blue-2 hover:bg-blue-200 active:bg-blue-300",
				green: "text-green-800 bg-surface-green-2 hover:bg-green-200 active:bg-green-300",
				red: "text-red-700 bg-surface-red-2 hover:bg-surface-red-3 active:bg-surface-red-4"
			}[props.theme];
			let outlineClasses = {
				gray: "text-ink-gray-8 bg-surface-white bg-surface-white border border-outline-gray-2 hover:border-outline-gray-3 active:border-outline-gray-3 active:bg-surface-gray-4",
				blue: "text-ink-blue-3 bg-surface-white border border-outline-blue-1 hover:border-blue-400 active:border-blue-400 active:bg-blue-300",
				green: "text-green-800 bg-surface-white border border-outline-green-2 hover:border-green-500 active:border-green-500 active:bg-green-300",
				red: "text-red-700 bg-surface-white border border-outline-red-1 hover:border-outline-red-2 active:border-outline-red-2 active:bg-surface-red-3"
			}[props.theme];
			let ghostClasses = {
				gray: "text-ink-gray-8 bg-transparent hover:bg-surface-gray-3 active:bg-surface-gray-4",
				blue: "text-ink-blue-3 bg-transparent hover:bg-blue-200 active:bg-blue-300",
				green: "text-green-800 bg-transparent hover:bg-green-200 active:bg-green-300",
				red: "text-red-700 bg-transparent hover:bg-surface-red-3 active:bg-surface-red-4"
			}[props.theme];
			let focusClasses = {
				gray: "focus-visible:ring focus-visible:ring-outline-gray-3",
				blue: "focus-visible:ring focus-visible:ring-blue-400",
				green: "focus-visible:ring focus-visible:ring-outline-green-2",
				red: "focus-visible:ring focus-visible:ring-outline-red-2"
			}[props.theme];
			let variantClasses = {
				subtle: subtleClasses,
				solid: solidClasses,
				outline: outlineClasses,
				ghost: ghostClasses
			}[props.variant];
			let disabledClasses = {
				"gray-solid": "bg-surface-gray-2 text-ink-gray-4",
				"gray-subtle": "bg-surface-gray-2 text-ink-gray-4",
				"gray-outline": "bg-surface-gray-2 text-ink-gray-4 border border-outline-gray-2",
				"gray-ghost": "text-ink-gray-4",
				"blue-solid": "bg-blue-300 text-ink-white",
				"blue-subtle": "bg-surface-blue-2 text-ink-blue-link",
				"blue-outline": "bg-surface-blue-2 text-ink-blue-link border border-outline-blue-1",
				"blue-ghost": "text-ink-blue-link",
				"green-solid": "bg-surface-green-2 text-ink-green-2",
				"green-subtle": "bg-surface-green-2 text-ink-green-2",
				"green-outline": "bg-surface-green-2 text-ink-green-2 border border-outline-green-2",
				"green-ghost": "text-ink-green-2",
				"red-solid": "bg-surface-red-2 text-ink-red-2",
				"red-subtle": "bg-surface-red-2 text-ink-red-2",
				"red-outline": "bg-surface-red-2 text-ink-red-2 border border-outline-red-1",
				"red-ghost": "text-ink-red-2"
			}[`${props.theme}-${props.variant}`];
			let sizeClasses = {
				sm: "h-7 text-base px-2 rounded",
				md: "h-8 text-base font-medium px-2.5 rounded",
				lg: "h-10 text-lg font-medium px-3 rounded-md",
				xl: "h-11.5 text-xl font-medium px-3.5 rounded-lg",
				"2xl": "h-13 text-2xl font-medium px-3.5 rounded-xl"
			}[props.size];
			if (isIconButton.value) sizeClasses = {
				sm: "h-7 w-7 rounded",
				md: "h-8 w-8 rounded",
				lg: "h-10 w-10 rounded-md",
				xl: "h-11.5 w-11.5 rounded-lg",
				"2xl": "h-13 w-13 rounded-xl"
			}[props.size];
			return [
				"inline-flex items-center justify-center gap-2 transition-colors focus:outline-none shrink-0",
				isDisabled.value ? disabledClasses : variantClasses,
				focusClasses,
				sizeClasses
			];
		});
		const slotClasses = computed(() => {
			return {
				sm: "h-4",
				md: "h-4.5",
				lg: "h-5",
				xl: "h-6",
				"2xl": "h-6"
			}[props.size];
		});
		const isDisabled = computed(() => {
			return props.disabled || props.loading;
		});
		const isIconButton = computed(() => {
			return props.icon || slots.icon || hasLucideIconInDefaultSlot.value;
		});
		const hasLucideIconInDefaultSlot = computed(() => {
			var _firstVNode$type, _firstVNode$type2;
			if (!slots.default) return false;
			const slotContent = slots.default();
			if (!Array.isArray(slotContent)) return false;
			let firstVNode = slotContent[0];
			if (typeof ((_firstVNode$type = firstVNode.type) === null || _firstVNode$type === void 0 ? void 0 : _firstVNode$type.name) == "string" && ((_firstVNode$type2 = firstVNode.type) === null || _firstVNode$type2 === void 0 || (_firstVNode$type2 = _firstVNode$type2.name) === null || _firstVNode$type2 === void 0 ? void 0 : _firstVNode$type2.startsWith("lucide-"))) return true;
			return false;
		});
		const handleClick = () => {
			if (props.route) return router.push(props.route);
			else if (props.link) return window.open(props.link, "_blank");
		};
		const rootRef = ref();
		__expose({ rootRef });
		return (_ctx, _push, _parent, _attrs) => {
			var _props$tooltip;
			_push(ssrRenderComponent(Tooltip_default, mergeProps({
				text: __props.tooltip,
				disabled: !((_props$tooltip = __props.tooltip) === null || _props$tooltip === void 0 ? void 0 : _props$tooltip.length)
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<button${ssrRenderAttrs(mergeProps(_ctx.$attrs, {
							class: buttonClasses.value,
							disabled: isDisabled.value,
							ariaLabel: __props.label,
							type: props.type,
							ref_key: "rootRef",
							ref: rootRef
						}))}${_scopeId}>`);
						if (__props.loading) _push(ssrRenderComponent(LoadingIndicator_default, { class: {
							"h-3 w-3": __props.size == "sm",
							"h-[13.5px] w-[13.5px]": __props.size == "md",
							"h-[15px] w-[15px]": __props.size == "lg",
							"h-4.5 w-4.5": __props.size == "xl" || __props.size == "2xl"
						} }, null, _parent, _scopeId));
						else if (_ctx.$slots["prefix"] || __props.iconLeft) ssrRenderSlot(_ctx.$slots, "prefix", {}, () => {
							if (__props.iconLeft && typeof __props.iconLeft === "string") _push(ssrRenderComponent(_sfc_main$1, {
								name: __props.iconLeft,
								class: slotClasses.value,
								"aria-hidden": "true"
							}, null, _parent, _scopeId));
							else if (__props.iconLeft) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.iconLeft), { class: slotClasses.value }, null), _parent, _scopeId);
							else _push(`<!---->`);
						}, _push, _parent, _scopeId);
						else _push(`<!---->`);
						if (__props.loading && __props.loadingText) _push(`<!--[-->${ssrInterpolate(__props.loadingText)}<!--]-->`);
						else if (isIconButton.value && !__props.loading) {
							_push(`<!--[-->`);
							if (__props.icon && typeof __props.icon === "string") _push(ssrRenderComponent(_sfc_main$1, {
								name: __props.icon,
								class: slotClasses.value
							}, null, _parent, _scopeId));
							else if (__props.icon) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.icon), { class: slotClasses.value }, null), _parent, _scopeId);
							else if (_ctx.$slots.icon) ssrRenderSlot(_ctx.$slots, "icon", {}, null, _push, _parent, _scopeId);
							else if (hasLucideIconInDefaultSlot.value) {
								_push(`<div class="${ssrRenderClass(slotClasses.value)}"${_scopeId}>`);
								ssrRenderSlot(_ctx.$slots, "default", {}, () => {
									_push(`${ssrInterpolate(__props.label)}`);
								}, _push, _parent, _scopeId);
								_push(`</div>`);
							} else _push(`<!---->`);
							_push(`<!--]-->`);
						} else {
							_push(`<span class="${ssrRenderClass([{ "sr-only": isIconButton.value }, "truncate"])}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "default", {}, () => {
								_push(`${ssrInterpolate(__props.label)}`);
							}, _push, _parent, _scopeId);
							_push(`</span>`);
						}
						ssrRenderSlot(_ctx.$slots, "suffix", {}, () => {
							if (__props.iconRight && typeof __props.iconRight === "string") _push(ssrRenderComponent(_sfc_main$1, {
								name: __props.iconRight,
								class: slotClasses.value,
								"aria-hidden": "true"
							}, null, _parent, _scopeId));
							else if (__props.iconRight) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.iconRight), { class: slotClasses.value }, null), _parent, _scopeId);
							else _push(`<!---->`);
						}, _push, _parent, _scopeId);
						_push(`</button>`);
					} else return [createVNode("button", mergeProps(_ctx.$attrs, {
						class: buttonClasses.value,
						onClick: handleClick,
						disabled: isDisabled.value,
						ariaLabel: __props.label,
						type: props.type,
						ref_key: "rootRef",
						ref: rootRef
					}), [
						__props.loading ? (openBlock(), createBlock(LoadingIndicator_default, {
							key: 0,
							class: {
								"h-3 w-3": __props.size == "sm",
								"h-[13.5px] w-[13.5px]": __props.size == "md",
								"h-[15px] w-[15px]": __props.size == "lg",
								"h-4.5 w-4.5": __props.size == "xl" || __props.size == "2xl"
							}
						}, null, 8, ["class"])) : _ctx.$slots["prefix"] || __props.iconLeft ? renderSlot(_ctx.$slots, "prefix", { key: 1 }, () => [__props.iconLeft && typeof __props.iconLeft === "string" ? (openBlock(), createBlock(_sfc_main$1, {
							key: 0,
							name: __props.iconLeft,
							class: slotClasses.value,
							"aria-hidden": "true"
						}, null, 8, ["name", "class"])) : __props.iconLeft ? (openBlock(), createBlock(resolveDynamicComponent(__props.iconLeft), {
							key: 1,
							class: slotClasses.value
						}, null, 8, ["class"])) : createCommentVNode("v-if", true)]) : createCommentVNode("v-if", true),
						__props.loading && __props.loadingText ? (openBlock(), createBlock(Fragment, { key: 2 }, [createTextVNode(toDisplayString(__props.loadingText), 1)], 64)) : isIconButton.value && !__props.loading ? (openBlock(), createBlock(Fragment, { key: 3 }, [__props.icon && typeof __props.icon === "string" ? (openBlock(), createBlock(_sfc_main$1, {
							key: 0,
							name: __props.icon,
							class: slotClasses.value
						}, null, 8, ["name", "class"])) : __props.icon ? (openBlock(), createBlock(resolveDynamicComponent(__props.icon), {
							key: 1,
							class: slotClasses.value
						}, null, 8, ["class"])) : _ctx.$slots.icon ? renderSlot(_ctx.$slots, "icon", { key: 2 }) : hasLucideIconInDefaultSlot.value ? (openBlock(), createBlock("div", {
							key: 3,
							class: slotClasses.value
						}, [renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode(toDisplayString(__props.label), 1)])], 2)) : createCommentVNode("v-if", true)], 64)) : (openBlock(), createBlock("span", {
							key: 4,
							class: [{ "sr-only": isIconButton.value }, "truncate"]
						}, [renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode(toDisplayString(__props.label), 1)])], 2)),
						renderSlot(_ctx.$slots, "suffix", {}, () => [__props.iconRight && typeof __props.iconRight === "string" ? (openBlock(), createBlock(_sfc_main$1, {
							key: 0,
							name: __props.iconRight,
							class: slotClasses.value,
							"aria-hidden": "true"
						}, null, 8, ["name", "class"])) : __props.iconRight ? (openBlock(), createBlock(resolveDynamicComponent(__props.iconRight), {
							key: 1,
							class: slotClasses.value
						}, null, 8, ["class"])) : createCommentVNode("v-if", true)])
					], 16, [
						"disabled",
						"ariaLabel",
						"type"
					])];
				}),
				_: 3
			}, _parent));
		};
	}
}));
//#endregion
//#region node_modules/frappe-ui/src/components/Button/Button.vue
var _sfc_setup$4 = Button_vue_vue_type_script_setup_true_lang_default.setup;
Button_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/frappe-ui/src/components/Button/Button.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var Button_default = Button_vue_vue_type_script_setup_true_lang_default;
//#endregion
//#region \0plugin-vue:export-helper
var _plugin_vue_export_helper_default = (sfc, props) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props) target[key] = val;
	return target;
};
//#endregion
//#region node_modules/frappe-ui/src/components/Dialog/Dialog.vue?vue&type=script&setup=true&lang.ts
var Dialog_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Dialog",
	__ssrInlineRender: true,
	props: {
		modelValue: { type: Boolean },
		options: { default: () => ({}) },
		disableOutsideClickToClose: {
			type: Boolean,
			default: false
		}
	},
	emits: [
		"update:modelValue",
		"close",
		"after-leave"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const actions = computed(() => {
			let actions = props.options.actions;
			if (!(actions === null || actions === void 0 ? void 0 : actions.length)) return [];
			return actions.map((action) => {
				let _action = reactive(_objectSpread2(_objectSpread2({}, action), {}, {
					loading: false,
					onClick: !action.onClick ? close : _asyncToGenerator(function* () {
						_action.loading = true;
						try {
							if (action.onClick) {
								let backwardsCompatibleContext = (() => {
									console.warn("Value passed to onClick is a context object. Please use context.close() instead of context() to close the dialog.");
									close();
								});
								backwardsCompatibleContext.close = close;
								yield action.onClick(backwardsCompatibleContext);
							}
						} finally {
							_action.loading = false;
						}
					})
				}));
				return _action;
			});
		});
		const isOpen = computed({
			get() {
				return props.modelValue;
			},
			set(val) {
				emit("update:modelValue", val);
				if (!val) emit("close");
			}
		});
		function handleOpenChange(open) {
			isOpen.value = open;
		}
		function close() {
			isOpen.value = false;
		}
		const icon = computed(() => {
			var _props$options;
			if (!((_props$options = props.options) === null || _props$options === void 0 ? void 0 : _props$options.icon)) return null;
			let icon = props.options.icon;
			if (typeof icon === "string") icon = { name: icon };
			return icon;
		});
		const dialogPositionClasses = computed(() => {
			var _props$options2, _props$options3;
			if ((_props$options2 = props.options) === null || _props$options2 === void 0 ? void 0 : _props$options2.paddingTop) return "";
			return {
				center: "justify-center",
				top: "pt-[20vh]"
			}[((_props$options3 = props.options) === null || _props$options3 === void 0 ? void 0 : _props$options3.position) || "center"];
		});
		const dialogPositionStyles = computed(() => {
			var _props$options4;
			if ((_props$options4 = props.options) === null || _props$options4 === void 0 ? void 0 : _props$options4.paddingTop) return { paddingTop: props.options.paddingTop };
			return {};
		});
		const dialogIconBgClasses = computed(() => {
			var _icon$value;
			const appearance = (_icon$value = icon.value) === null || _icon$value === void 0 ? void 0 : _icon$value.appearance;
			if (!appearance) return "bg-surface-gray-2";
			return {
				warning: "bg-surface-amber-2",
				info: "bg-surface-blue-2",
				danger: "bg-surface-red-2",
				success: "bg-surface-green-2"
			}[appearance];
		});
		const dialogIconClasses = computed(() => {
			var _icon$value2;
			const appearance = (_icon$value2 = icon.value) === null || _icon$value2 === void 0 ? void 0 : _icon$value2.appearance;
			if (!appearance) return "text-ink-gray-5";
			return {
				warning: "text-ink-amber-3",
				info: "text-ink-blue-3",
				danger: "text-ink-red-4",
				success: "text-ink-green-3"
			}[appearance];
		});
		useSlots();
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DialogRoot), mergeProps({
				open: isOpen.value,
				"onUpdate:open": [($event) => isOpen.value = $event, handleOpenChange]
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(unref(DialogPortal), null, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(unref(DialogOverlay), {
								class: "fixed inset-0 bg-black-overlay-200 dark:bg-black-overlay-700 overflow-y-auto dialog-overlay outline-none",
								"data-dialog": __props.options.title,
								onAfterLeave: ($event) => _ctx.$emit("after-leave")
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(`<div class="${ssrRenderClass([dialogPositionClasses.value, "flex min-h-screen flex-col items-center px-4 py-4 text-center"])}" style="${ssrRenderStyle(dialogPositionStyles.value)}" data-v-3428e46c${_scopeId}>`);
										_push(ssrRenderComponent(unref(DialogContent), {
											class: ["my-8 inline-block w-full transform overflow-hidden rounded-xl bg-surface-modal text-start align-middle shadow-xl dialog-content focus-visible:outline-none", {
												"max-w-7xl": __props.options.size === "7xl",
												"max-w-6xl": __props.options.size === "6xl",
												"max-w-5xl": __props.options.size === "5xl",
												"max-w-4xl": __props.options.size === "4xl",
												"max-w-3xl": __props.options.size === "3xl",
												"max-w-2xl": __props.options.size === "2xl",
												"max-w-xl": __props.options.size === "xl",
												"max-w-lg": __props.options.size === "lg" || !__props.options.size,
												"max-w-md": __props.options.size === "md",
												"max-w-sm": __props.options.size === "sm",
												"max-w-xs": __props.options.size === "xs"
											}],
											onEscapeKeyDown: ($event) => close(),
											onInteractOutside: (e) => {
												if (props.disableOutsideClickToClose) e.preventDefault();
											}
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) ssrRenderSlot(_ctx.$slots, "body", {}, () => {
													ssrRenderSlot(_ctx.$slots, "body-main", {}, () => {
														_push(`<div class="bg-surface-modal px-4 pb-6 pt-5 sm:px-6" data-v-3428e46c${_scopeId}><div class="flex" data-v-3428e46c${_scopeId}><div class="w-full flex-1" data-v-3428e46c${_scopeId}>`);
														ssrRenderSlot(_ctx.$slots, "body-header", {}, () => {
															_push(`<div class="mb-6 flex items-center justify-between" data-v-3428e46c${_scopeId}><div class="flex items-center space-x-2" data-v-3428e46c${_scopeId}>`);
															if (icon.value) {
																_push(`<div class="${ssrRenderClass([dialogIconBgClasses.value, "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"])}" data-v-3428e46c${_scopeId}>`);
																_push(ssrRenderComponent(_sfc_main$1, {
																	name: icon.value.name,
																	class: ["h-4 w-4", dialogIconClasses.value],
																	"aria-hidden": "true"
																}, null, _parent, _scopeId));
																_push(`</div>`);
															} else _push(`<!---->`);
															_push(ssrRenderComponent(unref(DialogTitle), { as: "header" }, {
																default: withCtx((_, _push, _parent, _scopeId) => {
																	if (_push) ssrRenderSlot(_ctx.$slots, "body-title", {}, () => {
																		_push(`<h3 class="text-2xl font-semibold leading-6 text-ink-gray-9" data-v-3428e46c${_scopeId}>${ssrInterpolate(__props.options.title || "Untitled")}</h3>`);
																	}, _push, _parent, _scopeId);
																	else return [renderSlot(_ctx.$slots, "body-title", {}, () => [createVNode("h3", { class: "text-2xl font-semibold leading-6 text-ink-gray-9" }, toDisplayString(__props.options.title || "Untitled"), 1)], true)];
																}),
																_: 3
															}, _parent, _scopeId));
															_push(`</div>`);
															_push(ssrRenderComponent(unref(DialogClose), { "as-child": "" }, {
																default: withCtx((_, _push, _parent, _scopeId) => {
																	if (_push) _push(ssrRenderComponent(unref(Button_default), {
																		variant: "ghost",
																		onClick: close
																	}, {
																		icon: withCtx((_, _push, _parent, _scopeId) => {
																			if (_push) _push(ssrRenderComponent(unref(x_default), { class: "h-4 w-4 text-ink-gray-9" }, null, _parent, _scopeId));
																			else return [createVNode(unref(x_default), { class: "h-4 w-4 text-ink-gray-9" })];
																		}),
																		_: 1
																	}, _parent, _scopeId));
																	else return [createVNode(unref(Button_default), {
																		variant: "ghost",
																		onClick: close
																	}, {
																		icon: withCtx(() => [createVNode(unref(x_default), { class: "h-4 w-4 text-ink-gray-9" })]),
																		_: 1
																	})];
																}),
																_: 1
															}, _parent, _scopeId));
															_push(`</div>`);
														}, _push, _parent, _scopeId);
														ssrRenderSlot(_ctx.$slots, "body-content", {}, () => {
															if (__props.options.message) _push(ssrRenderComponent(unref(DialogDescription), { "as-child": "" }, {
																default: withCtx((_, _push, _parent, _scopeId) => {
																	if (_push) _push(`<p class="text-p-base text-ink-gray-7" data-v-3428e46c${_scopeId}>${ssrInterpolate(__props.options.message)}</p>`);
																	else return [createVNode("p", { class: "text-p-base text-ink-gray-7" }, toDisplayString(__props.options.message), 1)];
																}),
																_: 1
															}, _parent, _scopeId));
															else _push(`<!---->`);
														}, _push, _parent, _scopeId);
														_push(`</div></div></div>`);
													}, _push, _parent, _scopeId);
													if (actions.value.length || _ctx.$slots.actions) {
														_push(`<div class="px-4 pb-7 pt-4 sm:px-6" data-v-3428e46c${_scopeId}>`);
														ssrRenderSlot(_ctx.$slots, "actions", { close }, () => {
															_push(`<div class="space-y-2" data-v-3428e46c${_scopeId}><!--[-->`);
															ssrRenderList(actions.value, (action) => {
																_push(ssrRenderComponent(unref(Button_default), mergeProps({
																	class: "w-full",
																	key: action.label,
																	disabled: action.disabled
																}, { ref_for: true }, action), {
																	default: withCtx((_, _push, _parent, _scopeId) => {
																		if (_push) _push(`${ssrInterpolate(action.label)}`);
																		else return [createTextVNode(toDisplayString(action.label), 1)];
																	}),
																	_: 2
																}, _parent, _scopeId));
															});
															_push(`<!--]--></div>`);
														}, _push, _parent, _scopeId);
														_push(`</div>`);
													} else _push(`<!---->`);
												}, _push, _parent, _scopeId);
												else return [renderSlot(_ctx.$slots, "body", {}, () => [renderSlot(_ctx.$slots, "body-main", {}, () => [createVNode("div", { class: "bg-surface-modal px-4 pb-6 pt-5 sm:px-6" }, [createVNode("div", { class: "flex" }, [createVNode("div", { class: "w-full flex-1" }, [renderSlot(_ctx.$slots, "body-header", {}, () => [createVNode("div", { class: "mb-6 flex items-center justify-between" }, [createVNode("div", { class: "flex items-center space-x-2" }, [icon.value ? (openBlock(), createBlock("div", {
													key: 0,
													class: ["flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full", dialogIconBgClasses.value]
												}, [createVNode(_sfc_main$1, {
													name: icon.value.name,
													class: ["h-4 w-4", dialogIconClasses.value],
													"aria-hidden": "true"
												}, null, 8, ["name", "class"])], 2)) : createCommentVNode("v-if", true), createVNode(unref(DialogTitle), { as: "header" }, {
													default: withCtx(() => [renderSlot(_ctx.$slots, "body-title", {}, () => [createVNode("h3", { class: "text-2xl font-semibold leading-6 text-ink-gray-9" }, toDisplayString(__props.options.title || "Untitled"), 1)], true)]),
													_: 3
												})]), createVNode(unref(DialogClose), { "as-child": "" }, {
													default: withCtx(() => [createVNode(unref(Button_default), {
														variant: "ghost",
														onClick: close
													}, {
														icon: withCtx(() => [createVNode(unref(x_default), { class: "h-4 w-4 text-ink-gray-9" })]),
														_: 1
													})]),
													_: 1
												})])], true), renderSlot(_ctx.$slots, "body-content", {}, () => [__props.options.message ? (openBlock(), createBlock(unref(DialogDescription), {
													key: 0,
													"as-child": ""
												}, {
													default: withCtx(() => [createVNode("p", { class: "text-p-base text-ink-gray-7" }, toDisplayString(__props.options.message), 1)]),
													_: 1
												})) : createCommentVNode("v-if", true)], true)])])])], true), actions.value.length || _ctx.$slots.actions ? (openBlock(), createBlock("div", {
													key: 0,
													class: "px-4 pb-7 pt-4 sm:px-6"
												}, [renderSlot(_ctx.$slots, "actions", { close }, () => [createVNode("div", { class: "space-y-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(actions.value, (action) => {
													return openBlock(), createBlock(unref(Button_default), mergeProps({
														class: "w-full",
														key: action.label,
														disabled: action.disabled
													}, { ref_for: true }, action), {
														default: withCtx(() => [createTextVNode(toDisplayString(action.label), 1)]),
														_: 2
													}, 1040, ["disabled"]);
												}), 128))])], true)])) : createCommentVNode("v-if", true)], true)];
											}),
											_: 3
										}, _parent, _scopeId));
										_push(`</div>`);
									} else return [createVNode("div", {
										class: ["flex min-h-screen flex-col items-center px-4 py-4 text-center", dialogPositionClasses.value],
										style: dialogPositionStyles.value
									}, [createVNode(unref(DialogContent), {
										class: ["my-8 inline-block w-full transform overflow-hidden rounded-xl bg-surface-modal text-start align-middle shadow-xl dialog-content focus-visible:outline-none", {
											"max-w-7xl": __props.options.size === "7xl",
											"max-w-6xl": __props.options.size === "6xl",
											"max-w-5xl": __props.options.size === "5xl",
											"max-w-4xl": __props.options.size === "4xl",
											"max-w-3xl": __props.options.size === "3xl",
											"max-w-2xl": __props.options.size === "2xl",
											"max-w-xl": __props.options.size === "xl",
											"max-w-lg": __props.options.size === "lg" || !__props.options.size,
											"max-w-md": __props.options.size === "md",
											"max-w-sm": __props.options.size === "sm",
											"max-w-xs": __props.options.size === "xs"
										}],
										onEscapeKeyDown: ($event) => close(),
										onInteractOutside: (e) => {
											if (props.disableOutsideClickToClose) e.preventDefault();
										}
									}, {
										default: withCtx(() => [renderSlot(_ctx.$slots, "body", {}, () => [renderSlot(_ctx.$slots, "body-main", {}, () => [createVNode("div", { class: "bg-surface-modal px-4 pb-6 pt-5 sm:px-6" }, [createVNode("div", { class: "flex" }, [createVNode("div", { class: "w-full flex-1" }, [renderSlot(_ctx.$slots, "body-header", {}, () => [createVNode("div", { class: "mb-6 flex items-center justify-between" }, [createVNode("div", { class: "flex items-center space-x-2" }, [icon.value ? (openBlock(), createBlock("div", {
											key: 0,
											class: ["flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full", dialogIconBgClasses.value]
										}, [createVNode(_sfc_main$1, {
											name: icon.value.name,
											class: ["h-4 w-4", dialogIconClasses.value],
											"aria-hidden": "true"
										}, null, 8, ["name", "class"])], 2)) : createCommentVNode("v-if", true), createVNode(unref(DialogTitle), { as: "header" }, {
											default: withCtx(() => [renderSlot(_ctx.$slots, "body-title", {}, () => [createVNode("h3", { class: "text-2xl font-semibold leading-6 text-ink-gray-9" }, toDisplayString(__props.options.title || "Untitled"), 1)], true)]),
											_: 3
										})]), createVNode(unref(DialogClose), { "as-child": "" }, {
											default: withCtx(() => [createVNode(unref(Button_default), {
												variant: "ghost",
												onClick: close
											}, {
												icon: withCtx(() => [createVNode(unref(x_default), { class: "h-4 w-4 text-ink-gray-9" })]),
												_: 1
											})]),
											_: 1
										})])], true), renderSlot(_ctx.$slots, "body-content", {}, () => [__props.options.message ? (openBlock(), createBlock(unref(DialogDescription), {
											key: 0,
											"as-child": ""
										}, {
											default: withCtx(() => [createVNode("p", { class: "text-p-base text-ink-gray-7" }, toDisplayString(__props.options.message), 1)]),
											_: 1
										})) : createCommentVNode("v-if", true)], true)])])])], true), actions.value.length || _ctx.$slots.actions ? (openBlock(), createBlock("div", {
											key: 0,
											class: "px-4 pb-7 pt-4 sm:px-6"
										}, [renderSlot(_ctx.$slots, "actions", { close }, () => [createVNode("div", { class: "space-y-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(actions.value, (action) => {
											return openBlock(), createBlock(unref(Button_default), mergeProps({
												class: "w-full",
												key: action.label,
												disabled: action.disabled
											}, { ref_for: true }, action), {
												default: withCtx(() => [createTextVNode(toDisplayString(action.label), 1)]),
												_: 2
											}, 1040, ["disabled"]);
										}), 128))])], true)])) : createCommentVNode("v-if", true)], true)]),
										_: 3
									}, 8, [
										"class",
										"onEscapeKeyDown",
										"onInteractOutside"
									])], 6)];
								}),
								_: 3
							}, _parent, _scopeId));
							else return [createVNode(unref(DialogOverlay), {
								class: "fixed inset-0 bg-black-overlay-200 dark:bg-black-overlay-700 overflow-y-auto dialog-overlay outline-none",
								"data-dialog": __props.options.title,
								onAfterLeave: ($event) => _ctx.$emit("after-leave")
							}, {
								default: withCtx(() => [createVNode("div", {
									class: ["flex min-h-screen flex-col items-center px-4 py-4 text-center", dialogPositionClasses.value],
									style: dialogPositionStyles.value
								}, [createVNode(unref(DialogContent), {
									class: ["my-8 inline-block w-full transform overflow-hidden rounded-xl bg-surface-modal text-start align-middle shadow-xl dialog-content focus-visible:outline-none", {
										"max-w-7xl": __props.options.size === "7xl",
										"max-w-6xl": __props.options.size === "6xl",
										"max-w-5xl": __props.options.size === "5xl",
										"max-w-4xl": __props.options.size === "4xl",
										"max-w-3xl": __props.options.size === "3xl",
										"max-w-2xl": __props.options.size === "2xl",
										"max-w-xl": __props.options.size === "xl",
										"max-w-lg": __props.options.size === "lg" || !__props.options.size,
										"max-w-md": __props.options.size === "md",
										"max-w-sm": __props.options.size === "sm",
										"max-w-xs": __props.options.size === "xs"
									}],
									onEscapeKeyDown: ($event) => close(),
									onInteractOutside: (e) => {
										if (props.disableOutsideClickToClose) e.preventDefault();
									}
								}, {
									default: withCtx(() => [renderSlot(_ctx.$slots, "body", {}, () => [renderSlot(_ctx.$slots, "body-main", {}, () => [createVNode("div", { class: "bg-surface-modal px-4 pb-6 pt-5 sm:px-6" }, [createVNode("div", { class: "flex" }, [createVNode("div", { class: "w-full flex-1" }, [renderSlot(_ctx.$slots, "body-header", {}, () => [createVNode("div", { class: "mb-6 flex items-center justify-between" }, [createVNode("div", { class: "flex items-center space-x-2" }, [icon.value ? (openBlock(), createBlock("div", {
										key: 0,
										class: ["flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full", dialogIconBgClasses.value]
									}, [createVNode(_sfc_main$1, {
										name: icon.value.name,
										class: ["h-4 w-4", dialogIconClasses.value],
										"aria-hidden": "true"
									}, null, 8, ["name", "class"])], 2)) : createCommentVNode("v-if", true), createVNode(unref(DialogTitle), { as: "header" }, {
										default: withCtx(() => [renderSlot(_ctx.$slots, "body-title", {}, () => [createVNode("h3", { class: "text-2xl font-semibold leading-6 text-ink-gray-9" }, toDisplayString(__props.options.title || "Untitled"), 1)], true)]),
										_: 3
									})]), createVNode(unref(DialogClose), { "as-child": "" }, {
										default: withCtx(() => [createVNode(unref(Button_default), {
											variant: "ghost",
											onClick: close
										}, {
											icon: withCtx(() => [createVNode(unref(x_default), { class: "h-4 w-4 text-ink-gray-9" })]),
											_: 1
										})]),
										_: 1
									})])], true), renderSlot(_ctx.$slots, "body-content", {}, () => [__props.options.message ? (openBlock(), createBlock(unref(DialogDescription), {
										key: 0,
										"as-child": ""
									}, {
										default: withCtx(() => [createVNode("p", { class: "text-p-base text-ink-gray-7" }, toDisplayString(__props.options.message), 1)]),
										_: 1
									})) : createCommentVNode("v-if", true)], true)])])])], true), actions.value.length || _ctx.$slots.actions ? (openBlock(), createBlock("div", {
										key: 0,
										class: "px-4 pb-7 pt-4 sm:px-6"
									}, [renderSlot(_ctx.$slots, "actions", { close }, () => [createVNode("div", { class: "space-y-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(actions.value, (action) => {
										return openBlock(), createBlock(unref(Button_default), mergeProps({
											class: "w-full",
											key: action.label,
											disabled: action.disabled
										}, { ref_for: true }, action), {
											default: withCtx(() => [createTextVNode(toDisplayString(action.label), 1)]),
											_: 2
										}, 1040, ["disabled"]);
									}), 128))])], true)])) : createCommentVNode("v-if", true)], true)]),
									_: 3
								}, 8, [
									"class",
									"onEscapeKeyDown",
									"onInteractOutside"
								])], 6)]),
								_: 3
							}, 8, ["data-dialog", "onAfterLeave"])];
						}),
						_: 3
					}, _parent, _scopeId));
					else return [createVNode(unref(DialogPortal), null, {
						default: withCtx(() => [createVNode(unref(DialogOverlay), {
							class: "fixed inset-0 bg-black-overlay-200 dark:bg-black-overlay-700 overflow-y-auto dialog-overlay outline-none",
							"data-dialog": __props.options.title,
							onAfterLeave: ($event) => _ctx.$emit("after-leave")
						}, {
							default: withCtx(() => [createVNode("div", {
								class: ["flex min-h-screen flex-col items-center px-4 py-4 text-center", dialogPositionClasses.value],
								style: dialogPositionStyles.value
							}, [createVNode(unref(DialogContent), {
								class: ["my-8 inline-block w-full transform overflow-hidden rounded-xl bg-surface-modal text-start align-middle shadow-xl dialog-content focus-visible:outline-none", {
									"max-w-7xl": __props.options.size === "7xl",
									"max-w-6xl": __props.options.size === "6xl",
									"max-w-5xl": __props.options.size === "5xl",
									"max-w-4xl": __props.options.size === "4xl",
									"max-w-3xl": __props.options.size === "3xl",
									"max-w-2xl": __props.options.size === "2xl",
									"max-w-xl": __props.options.size === "xl",
									"max-w-lg": __props.options.size === "lg" || !__props.options.size,
									"max-w-md": __props.options.size === "md",
									"max-w-sm": __props.options.size === "sm",
									"max-w-xs": __props.options.size === "xs"
								}],
								onEscapeKeyDown: ($event) => close(),
								onInteractOutside: (e) => {
									if (props.disableOutsideClickToClose) e.preventDefault();
								}
							}, {
								default: withCtx(() => [renderSlot(_ctx.$slots, "body", {}, () => [renderSlot(_ctx.$slots, "body-main", {}, () => [createVNode("div", { class: "bg-surface-modal px-4 pb-6 pt-5 sm:px-6" }, [createVNode("div", { class: "flex" }, [createVNode("div", { class: "w-full flex-1" }, [renderSlot(_ctx.$slots, "body-header", {}, () => [createVNode("div", { class: "mb-6 flex items-center justify-between" }, [createVNode("div", { class: "flex items-center space-x-2" }, [icon.value ? (openBlock(), createBlock("div", {
									key: 0,
									class: ["flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full", dialogIconBgClasses.value]
								}, [createVNode(_sfc_main$1, {
									name: icon.value.name,
									class: ["h-4 w-4", dialogIconClasses.value],
									"aria-hidden": "true"
								}, null, 8, ["name", "class"])], 2)) : createCommentVNode("v-if", true), createVNode(unref(DialogTitle), { as: "header" }, {
									default: withCtx(() => [renderSlot(_ctx.$slots, "body-title", {}, () => [createVNode("h3", { class: "text-2xl font-semibold leading-6 text-ink-gray-9" }, toDisplayString(__props.options.title || "Untitled"), 1)], true)]),
									_: 3
								})]), createVNode(unref(DialogClose), { "as-child": "" }, {
									default: withCtx(() => [createVNode(unref(Button_default), {
										variant: "ghost",
										onClick: close
									}, {
										icon: withCtx(() => [createVNode(unref(x_default), { class: "h-4 w-4 text-ink-gray-9" })]),
										_: 1
									})]),
									_: 1
								})])], true), renderSlot(_ctx.$slots, "body-content", {}, () => [__props.options.message ? (openBlock(), createBlock(unref(DialogDescription), {
									key: 0,
									"as-child": ""
								}, {
									default: withCtx(() => [createVNode("p", { class: "text-p-base text-ink-gray-7" }, toDisplayString(__props.options.message), 1)]),
									_: 1
								})) : createCommentVNode("v-if", true)], true)])])])], true), actions.value.length || _ctx.$slots.actions ? (openBlock(), createBlock("div", {
									key: 0,
									class: "px-4 pb-7 pt-4 sm:px-6"
								}, [renderSlot(_ctx.$slots, "actions", { close }, () => [createVNode("div", { class: "space-y-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(actions.value, (action) => {
									return openBlock(), createBlock(unref(Button_default), mergeProps({
										class: "w-full",
										key: action.label,
										disabled: action.disabled
									}, { ref_for: true }, action), {
										default: withCtx(() => [createTextVNode(toDisplayString(action.label), 1)]),
										_: 2
									}, 1040, ["disabled"]);
								}), 128))])], true)])) : createCommentVNode("v-if", true)], true)]),
								_: 3
							}, 8, [
								"class",
								"onEscapeKeyDown",
								"onInteractOutside"
							])], 6)]),
							_: 3
						}, 8, ["data-dialog", "onAfterLeave"])]),
						_: 3
					})];
				}),
				_: 3
			}, _parent));
		};
	}
});
//#endregion
//#region node_modules/frappe-ui/src/components/Dialog/Dialog.vue
var _sfc_setup$3 = Dialog_vue_vue_type_script_setup_true_lang_default.setup;
Dialog_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/frappe-ui/src/components/Dialog/Dialog.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
//#endregion
//#region node_modules/frappe-ui/src/components/Dialog/index.ts
var Dialog = /* @__PURE__ */ _plugin_vue_export_helper_default(Dialog_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-3428e46c"]]);
Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;
//#endregion
//#region node_modules/frappe-ui/src/components/Textarea/Textarea.vue?vue&type=script&setup=true&lang.ts
var Textarea_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Textarea",
	__ssrInlineRender: true,
	props: {
		size: { default: "sm" },
		variant: { default: "subtle" },
		placeholder: {},
		disabled: { type: Boolean },
		id: {},
		modelValue: {},
		debounce: {},
		rows: { default: 3 },
		label: {}
	},
	emits: ["update:modelValue"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const attrs = useAttrs();
		const textareaRef = ref(null);
		const inputClasses = computed(() => {
			let sizeClasses = {
				sm: "text-base rounded",
				md: "text-base rounded",
				lg: "text-lg rounded-md",
				xl: "text-xl rounded-md"
			}[props.size];
			let paddingClasses = {
				sm: ["py-1.5 px-2"],
				md: ["py-1.5 px-2.5"],
				lg: ["py-1.5 px-3"],
				xl: ["py-1.5 px-3"]
			}[props.size];
			let variant = props.disabled ? "disabled" : props.variant;
			return [
				sizeClasses,
				paddingClasses,
				{
					subtle: "border border-[--surface-gray-2] bg-surface-gray-2 placeholder-ink-gray-4 hover:border-outline-gray-modals hover:bg-surface-gray-3 focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
					outline: "border border-outline-gray-2 bg-surface-white placeholder-ink-gray-4 hover:border-outline-gray-3 hover:shadow-sm focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
					disabled: ["border bg-surface-gray-1 placeholder-ink-gray-3", props.variant === "outline" ? "border-outline-gray-2" : "border-transparent"]
				}[variant],
				props.disabled ? "text-ink-gray-5" : "text-ink-gray-8",
				"transition-colors w-full block"
			];
		});
		const labelClasses = computed(() => {
			return [{
				sm: "text-xs",
				md: "text-base",
				lg: "text-lg",
				xl: "text-xl"
			}[props.size], "text-ink-gray-5"];
		});
		let emitChange = (value) => {
			emit("update:modelValue", value);
		};
		if (props.debounce) emitChange = debounce(emitChange, props.debounce);
		__expose({ el: textareaRef });
		return (_ctx, _push, _parent, _attrs) => {
			let _temp0;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-1.5" }, _attrs))}>`);
			if (__props.label) _push(`<label class="${ssrRenderClass([labelClasses.value, "block"])}"${ssrRenderAttr("for", __props.id)}>${ssrInterpolate(__props.label)}</label>`);
			else _push(`<!---->`);
			_push(`<textarea${ssrRenderAttrs(_temp0 = mergeProps({
				ref_key: "textareaRef",
				ref: textareaRef,
				placeholder: __props.placeholder,
				class: inputClasses.value,
				disabled: __props.disabled,
				id: __props.id,
				value: __props.modelValue,
				rows: __props.rows
			}, unref(attrs)), "textarea")}>${ssrInterpolate("value" in _temp0 ? _temp0.value : "")}</textarea></div>`);
		};
	}
});
//#endregion
//#region node_modules/frappe-ui/src/components/Textarea/Textarea.vue
var _sfc_setup$2 = Textarea_vue_vue_type_script_setup_true_lang_default.setup;
Textarea_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/frappe-ui/src/components/Textarea/Textarea.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var Textarea_default = Textarea_vue_vue_type_script_setup_true_lang_default;
//#endregion
//#region node_modules/frappe-ui/src/components/TextEditor/extensions/iframe/utils.ts
var ALLOWED_DOMAINS = [
	"youtube.com",
	"www.youtube.com",
	"youtu.be",
	"vimeo.com",
	"player.vimeo.com",
	"codepen.io",
	"codesandbox.io",
	"figma.com",
	"www.figma.com",
	"embed.figma.com",
	"docs.google.com",
	"drive.google.com",
	"notion.so",
	"www.notion.so"
];
var PLATFORM_CONFIGS = [
	{
		name: "YouTube",
		ratio: 9 / 16,
		defaultWidth: 640,
		urlPatterns: [
			"youtube.com",
			"youtu.be",
			"youtube-nocookie.com"
		]
	},
	{
		name: "Vimeo",
		ratio: 9 / 16,
		defaultWidth: 640,
		urlPatterns: ["vimeo.com", "player.vimeo.com"]
	},
	{
		name: "CodePen",
		ratio: 3 / 2,
		defaultWidth: 500,
		urlPatterns: ["codepen.io"]
	},
	{
		name: "CodeSandbox",
		ratio: 3 / 2,
		defaultWidth: 500,
		urlPatterns: ["codesandbox.io"]
	},
	{
		name: "Figma",
		ratio: 9 / 16,
		defaultWidth: 800,
		urlPatterns: [
			"figma.com",
			"www.figma.com",
			"embed.figma.com"
		]
	},
	{
		name: "Google Docs",
		ratio: 4 / 3,
		defaultWidth: 600,
		urlPatterns: ["docs.google.com", "drive.google.com"]
	},
	{
		name: "Notion",
		ratio: 4 / 3,
		defaultWidth: 600,
		urlPatterns: ["notion.so", "www.notion.so"]
	}
];
function detectPlatform(url) {
	try {
		const domain = new URL(url).hostname.toLowerCase();
		return PLATFORM_CONFIGS.find((config) => config.urlPatterns.some((pattern) => domain.includes(pattern))) || null;
	} catch (_unused) {
		return null;
	}
}
function calculateAspectRatio(url) {
	const platform = detectPlatform(url);
	if (platform) return {
		ratio: platform.ratio,
		width: platform.defaultWidth,
		height: Math.round(platform.defaultWidth * platform.ratio),
		platform: platform.name
	};
	return {
		ratio: 9 / 16,
		width: 640,
		height: 360,
		platform: "Generic"
	};
}
function getOptimalDimensions(url, containerWidth) {
	const aspectInfo = calculateAspectRatio(url);
	if (containerWidth) {
		const maxWidth = Math.min(containerWidth - 40, aspectInfo.width);
		return {
			width: maxWidth,
			height: Math.round(maxWidth * aspectInfo.ratio)
		};
	}
	return {
		width: aspectInfo.width,
		height: aspectInfo.height
	};
}
function validateURL(url, options) {
	try {
		var _options$blockedDomai, _options$allowedDomai;
		if (url.startsWith("/")) return true;
		const domain = new URL(url).hostname.toLowerCase();
		if ((_options$blockedDomai = options.blockedDomains) === null || _options$blockedDomai === void 0 ? void 0 : _options$blockedDomai.some((blocked) => domain.includes(blocked))) return false;
		if ((_options$allowedDomai = options.allowedDomains) === null || _options$allowedDomai === void 0 ? void 0 : _options$allowedDomai.length) return options.allowedDomains.some((allowed) => domain.includes(allowed.toLowerCase()));
		return true;
	} catch (_unused2) {
		return false;
	}
}
function processURL(url) {
	try {
		const domain = new URL(url).hostname.toLowerCase();
		if (domain.includes("youtube.com") || domain.includes("youtu.be")) return convertToYouTubeEmbed(url);
		if (domain.includes("vimeo.com")) return convertToVimeoEmbed(url);
		if (domain.includes("codepen.io")) return convertToCodePenEmbed(url);
		if (domain.includes("figma.com")) return convertToFigmaEmbed(url);
		return url;
	} catch (_unused3) {
		return url;
	}
}
function convertToYouTubeEmbed(url) {
	try {
		const urlObj = new URL(url);
		let videoId = "";
		if (urlObj.hostname === "youtu.be") videoId = urlObj.pathname.slice(1);
		else if (urlObj.hostname.includes("youtube.com")) {
			videoId = urlObj.searchParams.get("v") || "";
			if (urlObj.pathname.includes("/embed/")) return url;
		}
		if (videoId) return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
	} catch (e) {
		console.warn("Failed to convert YouTube URL:", e);
	}
	return url;
}
function convertToVimeoEmbed(url) {
	try {
		if (url.includes("player.vimeo.com")) return url;
		const match = url.match(/vimeo\.com\/(?:.*\/)?(\d+)/);
		if (match === null || match === void 0 ? void 0 : match[1]) return `https://player.vimeo.com/video/${match[1]}?title=0&byline=0&portrait=0`;
	} catch (e) {
		console.warn("Failed to convert Vimeo URL:", e);
	}
	return url;
}
function convertToCodePenEmbed(url) {
	try {
		if (url.includes("/embed/")) return url;
		const match = url.match(/codepen\.io\/([^\/]+)\/pen\/([^\/\?]+)/);
		if ((match === null || match === void 0 ? void 0 : match[1]) && (match === null || match === void 0 ? void 0 : match[2])) return `https://codepen.io/${match[1]}/embed/${match[2]}?default-tab=result`;
	} catch (e) {
		console.warn("Failed to convert CodePen URL:", e);
	}
	return url;
}
function convertToFigmaEmbed(url) {
	try {
		const urlObj = new URL(url);
		if (urlObj.hostname === "www.figma.com" || urlObj.hostname === "figma.com") {
			if (urlObj.pathname.startsWith("/design/")) {
				urlObj.hostname = "embed.figma.com";
				urlObj.searchParams.set("embed-host", "share");
				return urlObj.toString();
			}
		}
		if (urlObj.hostname === "embed.figma.com") {
			if (!urlObj.searchParams.has("embed-host")) urlObj.searchParams.set("embed-host", "share");
			return urlObj.toString();
		}
		return url;
	} catch (e) {
		console.warn("Failed to convert Figma URL:", e);
	}
	return url;
}
//#endregion
//#region node_modules/frappe-ui/src/components/TextEditor/components/FontColor.vue
var FontColor_exports = /* @__PURE__ */ __exportAll({ default: () => FontColor_default });
var _sfc_main = {
	name: "FontColor",
	props: ["editor"],
	components: {
		Popover: Popover_default,
		Tooltip: Tooltip_default
	},
	methods: {
		setBackgroundColor(color) {
			if (color.name != "Default") this.editor.chain().focus().toggleHighlightByName(color.name.toLowerCase()).run();
			else this.editor.chain().focus().unsetHighlight().run();
		},
		setForegroundColor(color) {
			if (color.name != "Default") this.editor.chain().focus().setColorByName(color.name.toLowerCase()).run();
			else this.editor.chain().focus().unsetColor().run();
		}
	},
	computed: {
		foregroundColors() {
			return [
				{
					name: "Default",
					class: "text-ink-gray-9"
				},
				{
					name: "Red",
					class: "text-red-600 dark:text-dark-red-400"
				},
				{
					name: "Orange",
					class: "text-orange-600 dark:text-dark-orange-400"
				},
				{
					name: "Yellow",
					class: "text-yellow-600 dark:text-dark-yellow-400"
				},
				{
					name: "Green",
					class: "text-green-600 dark:text-dark-green-400"
				},
				{
					name: "Teal",
					class: "text-teal-600 dark:text-dark-teal-400"
				},
				{
					name: "Cyan",
					class: "text-cyan-600 dark:text-dark-cyan-400"
				},
				{
					name: "Blue",
					class: "text-blue-600 dark:text-dark-blue-400"
				},
				{
					name: "Purple",
					class: "text-purple-600 dark:text-dark-purple-400"
				},
				{
					name: "Pink",
					class: "text-pink-600 dark:text-dark-pink-400"
				},
				{
					name: "Gray",
					class: "text-gray-600 dark:text-dark-gray-400"
				}
			];
		},
		backgroundColors() {
			return [
				{
					name: "Default",
					class: "border-outline-gray-modals"
				},
				{
					name: "Red",
					class: "bg-red-100 dark:bg-dark-red-800 border-transparent"
				},
				{
					name: "Orange",
					class: "bg-orange-100 dark:bg-dark-orange-800 border-transparent"
				},
				{
					name: "Yellow",
					class: "bg-yellow-100 dark:bg-dark-yellow-800 border-transparent"
				},
				{
					name: "Green",
					class: "bg-green-100 dark:bg-dark-green-800 border-transparent"
				},
				{
					name: "Teal",
					class: "bg-teal-100 dark:bg-dark-teal-800 border-transparent"
				},
				{
					name: "Cyan",
					class: "bg-cyan-100 dark:bg-dark-cyan-800 border-transparent"
				},
				{
					name: "Blue",
					class: "bg-blue-100 dark:bg-dark-blue-800 border-transparent"
				},
				{
					name: "Purple",
					class: "bg-purple-100 dark:bg-dark-purple-800 border-transparent"
				},
				{
					name: "Pink",
					class: "bg-pink-100 dark:bg-dark-pink-800 border-transparent"
				},
				{
					name: "Gray",
					class: "bg-gray-100 dark:bg-dark-gray-800 border-transparent"
				}
			];
		}
	}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_Popover = resolveComponent("Popover");
	const _component_Tooltip = resolveComponent("Tooltip");
	_push(ssrRenderComponent(_component_Popover, mergeProps({ transition: "default" }, _attrs), {
		target: withCtx(({ togglePopover, isOpen }, _push, _parent, _scopeId) => {
			if (_push) ssrRenderSlot(_ctx.$slots, "default", {
				onClick: () => togglePopover(),
				isActive: isOpen
			}, null, _push, _parent, _scopeId);
			else return [renderSlot(_ctx.$slots, "default", {
				onClick: () => togglePopover(),
				isActive: isOpen
			})];
		}),
		"body-main": withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(`<div class="p-2"${_scopeId}><div class="text-sm text-ink-gray-7"${_scopeId}>Text Color</div><div class="mt-1 grid grid-cols-6 gap-1"${_scopeId}><!--[-->`);
				ssrRenderList($options.foregroundColors, (color) => {
					_push(ssrRenderComponent(_component_Tooltip, {
						class: "flex",
						key: color.name,
						text: color.name
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<button${ssrRenderAttr("aria-label", color.name)} class="${ssrRenderClass([color.class, "flex h-5 w-5 items-center justify-center rounded border text-base"])}"${_scopeId}> A </button>`);
							else return [createVNode("button", {
								"aria-label": color.name,
								class: ["flex h-5 w-5 items-center justify-center rounded border text-base", color.class],
								onClick: ($event) => $options.setForegroundColor(color)
							}, " A ", 10, ["aria-label", "onClick"])];
						}),
						_: 2
					}, _parent, _scopeId));
				});
				_push(`<!--]--></div><div class="mt-2 text-sm text-ink-gray-7"${_scopeId}>Background Color</div><div class="mt-1 grid grid-cols-6 gap-1"${_scopeId}><!--[-->`);
				ssrRenderList($options.backgroundColors, (color) => {
					_push(ssrRenderComponent(_component_Tooltip, {
						class: "flex",
						key: color.name,
						text: color.name
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<button${ssrRenderAttr("aria-label", color.name)} class="${ssrRenderClass([color.class, "flex h-5 w-5 items-center justify-center rounded border text-base text-ink-gray-9"])}"${_scopeId}> A </button>`);
							else return [createVNode("button", {
								"aria-label": color.name,
								class: ["flex h-5 w-5 items-center justify-center rounded border text-base text-ink-gray-9", color.class],
								onClick: ($event) => $options.setBackgroundColor(color)
							}, " A ", 10, ["aria-label", "onClick"])];
						}),
						_: 2
					}, _parent, _scopeId));
				});
				_push(`<!--]--></div></div>`);
			} else return [createVNode("div", { class: "p-2" }, [
				createVNode("div", { class: "text-sm text-ink-gray-7" }, "Text Color"),
				createVNode("div", { class: "mt-1 grid grid-cols-6 gap-1" }, [(openBlock(true), createBlock(Fragment, null, renderList($options.foregroundColors, (color) => {
					return openBlock(), createBlock(_component_Tooltip, {
						class: "flex",
						key: color.name,
						text: color.name
					}, {
						default: withCtx(() => [createVNode("button", {
							"aria-label": color.name,
							class: ["flex h-5 w-5 items-center justify-center rounded border text-base", color.class],
							onClick: ($event) => $options.setForegroundColor(color)
						}, " A ", 10, ["aria-label", "onClick"])]),
						_: 2
					}, 1032, ["text"]);
				}), 128))]),
				createVNode("div", { class: "mt-2 text-sm text-ink-gray-7" }, "Background Color"),
				createVNode("div", { class: "mt-1 grid grid-cols-6 gap-1" }, [(openBlock(true), createBlock(Fragment, null, renderList($options.backgroundColors, (color) => {
					return openBlock(), createBlock(_component_Tooltip, {
						class: "flex",
						key: color.name,
						text: color.name
					}, {
						default: withCtx(() => [createVNode("button", {
							"aria-label": color.name,
							class: ["flex h-5 w-5 items-center justify-center rounded border text-base text-ink-gray-9", color.class],
							onClick: ($event) => $options.setBackgroundColor(color)
						}, " A ", 10, ["aria-label", "onClick"])]),
						_: 2
					}, 1032, ["text"]);
				}), 128))])
			])];
		}),
		_: 3
	}, _parent));
}
var _sfc_setup$1 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/frappe-ui/src/components/TextEditor/components/FontColor.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var FontColor_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region node_modules/frappe-ui/src/components/TextEditor/extensions/iframe/InsertIframe.vue?vue&type=script&setup=true&lang.ts
var InsertIframe_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "InsertIframe",
	__ssrInlineRender: true,
	props: { editor: {} },
	setup(__props) {
		const props = __props;
		const showDialog = ref(false);
		const embedUrl = ref("");
		const urlError = ref("");
		const title = ref("");
		const alignment = ref("center");
		const customWidth = ref(640);
		const customHeight = ref(360);
		const urlInput = ref();
		const isValidUrl = computed(() => {
			if (!embedUrl.value) return false;
			try {
				if (embedUrl.value.trim().startsWith("<iframe")) {
					const srcMatch = embedUrl.value.match(/src=["']([^"']+)["']/);
					if (srcMatch === null || srcMatch === void 0 ? void 0 : srcMatch[1]) return validateURL(srcMatch[1], {
						allowedDomains: ALLOWED_DOMAINS,
						HTMLAttributes: {}
					});
					return false;
				}
				return validateURL(embedUrl.value, {
					allowedDomains: ALLOWED_DOMAINS,
					HTMLAttributes: {}
				});
			} catch (_unused) {
				return false;
			}
		});
		const processedUrl = computed(() => {
			if (!embedUrl.value) return "";
			if (embedUrl.value.trim().startsWith("<iframe")) {
				const srcMatch = embedUrl.value.match(/src=["']([^"']+)["']/);
				if (srcMatch === null || srcMatch === void 0 ? void 0 : srcMatch[1]) return processURL(srcMatch[1]);
				return embedUrl.value;
			}
			return processURL(embedUrl.value);
		});
		const platformInfo = computed(() => {
			if (!embedUrl.value || !isValidUrl.value) return {
				platform: "Generic",
				aspectRatio: 9 / 16
			};
			const platform = detectPlatform(processedUrl.value);
			const aspectInfo = calculateAspectRatio(processedUrl.value);
			return {
				platform: (platform === null || platform === void 0 ? void 0 : platform.name) || "Generic",
				aspectRatio: aspectInfo.ratio
			};
		});
		const optimalDimensions = computed(() => {
			if (!embedUrl.value || !isValidUrl.value) return {
				width: 640,
				height: 360
			};
			return getOptimalDimensions(processedUrl.value, 800);
		});
		function validateUrl() {
			urlError.value = "";
			if (!embedUrl.value) return;
			if (!isValidUrl.value) urlError.value = "Please enter a supported URL or iframe embed code";
		}
		function openIframeDialog() {
			showDialog.value = true;
			embedUrl.value = "";
			urlError.value = "";
			title.value = "";
			alignment.value = "center";
			customWidth.value = 640;
			customHeight.value = 360;
			nextTick(() => {
				var _urlInput$value;
				(_urlInput$value = urlInput.value) === null || _urlInput$value === void 0 || (_urlInput$value = _urlInput$value.el) === null || _urlInput$value === void 0 || _urlInput$value.focus();
			});
		}
		computed(() => {
			if (embedUrl.value && isValidUrl.value) {
				const dimensions = optimalDimensions.value;
				customWidth.value = dimensions.width;
				customHeight.value = dimensions.height;
			}
		});
		function insertIframe() {
			if (!embedUrl.value || !isValidUrl.value) return;
			if (props.editor.commands.setIframe({
				src: processedUrl.value,
				width: customWidth.value,
				height: customHeight.value,
				title: title.value,
				align: alignment.value
			})) {
				showDialog.value = false;
				props.editor.commands.focus();
			} else urlError.value = "Failed to insert embed. Please check the URL and try again.";
		}
		function handleSlashCommandInsert(event) {
			var _event$detail;
			if (((_event$detail = event.detail) === null || _event$detail === void 0 ? void 0 : _event$detail.editor) === props.editor) openIframeDialog();
		}
		onMounted(() => {
			props.editor.view.dom.addEventListener("iframe:open-dialog", handleSlashCommandInsert);
		});
		onUnmounted(() => {
			try {
				props.editor.view.dom.removeEventListener("iframe:open-dialog", handleSlashCommandInsert);
			} catch (_unused2) {}
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			ssrRenderSlot(_ctx.$slots, "default", { onClick: openIframeDialog }, null, _push, _parent);
			_push(`<!-- Iframe URL Input Dialog -->`);
			_push(ssrRenderComponent(unref(Dialog), {
				modelValue: showDialog.value,
				"onUpdate:modelValue": ($event) => showDialog.value = $event,
				options: {
					title: "Insert Embed",
					size: "md"
				}
			}, {
				"body-content": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-ink-gray-7 mb-2"${_scopeId}> URL or Embed Code </label>`);
						_push(ssrRenderComponent(unref(Textarea_default), {
							ref_key: "urlInput",
							ref: urlInput,
							modelValue: embedUrl.value,
							"onUpdate:modelValue": ($event) => embedUrl.value = $event,
							placeholder: "https://youtube.com/watch?v=... or <iframe src=...>",
							onKeydown: insertIframe,
							onInput: validateUrl
						}, null, _parent, _scopeId));
						if (urlError.value) _push(`<p class="text-red-500 text-sm mt-1"${_scopeId}>${ssrInterpolate(urlError.value)}</p>`);
						else if (embedUrl.value && isValidUrl.value) _push(`<p class="text-ink-green-3 text-sm mt-1"${_scopeId}> ✓ Valid ${ssrInterpolate(platformInfo.value.platform)} URL </p>`);
						else _push(`<!---->`);
						_push(`</div></div>`);
					} else return [createVNode("div", { class: "space-y-4" }, [createVNode("div", null, [
						createVNode("label", { class: "block text-sm font-medium text-ink-gray-7 mb-2" }, " URL or Embed Code "),
						createVNode(unref(Textarea_default), {
							ref_key: "urlInput",
							ref: urlInput,
							modelValue: embedUrl.value,
							"onUpdate:modelValue": ($event) => embedUrl.value = $event,
							placeholder: "https://youtube.com/watch?v=... or <iframe src=...>",
							onKeydown: withKeys(insertIframe, ["enter"]),
							onInput: validateUrl
						}, null, 8, ["modelValue", "onUpdate:modelValue"]),
						urlError.value ? (openBlock(), createBlock("p", {
							key: 0,
							class: "text-red-500 text-sm mt-1"
						}, toDisplayString(urlError.value), 1)) : embedUrl.value && isValidUrl.value ? (openBlock(), createBlock("p", {
							key: 1,
							class: "text-ink-green-3 text-sm mt-1"
						}, " ✓ Valid " + toDisplayString(platformInfo.value.platform) + " URL ", 1)) : createCommentVNode("v-if", true)
					])])];
				}),
				actions: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex justify-end space-x-2"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Button_default), {
							variant: "subtle",
							onClick: ($event) => showDialog.value = false
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Cancel`);
								else return [createTextVNode("Cancel")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(unref(Button_default), {
							variant: "solid",
							disabled: !embedUrl.value || !isValidUrl.value,
							onClick: insertIframe
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Insert Embed `);
								else return [createTextVNode(" Insert Embed ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { class: "flex justify-end space-x-2" }, [createVNode(unref(Button_default), {
						variant: "subtle",
						onClick: ($event) => showDialog.value = false
					}, {
						default: withCtx(() => [createTextVNode("Cancel")]),
						_: 1
					}, 8, ["onClick"]), createVNode(unref(Button_default), {
						variant: "solid",
						disabled: !embedUrl.value || !isValidUrl.value,
						onClick: insertIframe
					}, {
						default: withCtx(() => [createTextVNode(" Insert Embed ")]),
						_: 1
					}, 8, ["disabled"])])];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region node_modules/frappe-ui/src/components/TextEditor/extensions/iframe/InsertIframe.vue
var InsertIframe_exports = /* @__PURE__ */ __exportAll({ default: () => InsertIframe_default });
var _sfc_setup = InsertIframe_vue_vue_type_script_setup_true_lang_default.setup;
InsertIframe_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/frappe-ui/src/components/TextEditor/extensions/iframe/InsertIframe.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var InsertIframe_default = InsertIframe_vue_vue_type_script_setup_true_lang_default;
//#endregion
export { _objectSpread2 as a, _sfc_main$1 as i, FontColor_exports as n, Button_default as r, InsertIframe_exports as t };

//# sourceMappingURL=chunk-DFeanm8o.js.map