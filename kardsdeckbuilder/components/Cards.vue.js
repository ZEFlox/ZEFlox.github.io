"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const editor_1 = require("@/utils/editor");
const props = defineProps();
function getCardImg(importName) {
    return `./kards_cn/${importName.toUpperCase().replace(/\//g, '')}.png`;
}
// 图片加载处理
const imgError = (0, vue_1.ref)({});
const imgLoading = (0, vue_1.ref)({});
function onImgError(id) {
    imgError.value[id] = true;
    imgLoading.value[id] = false;
}
function onImgLoad(id) {
    imgLoading.value[id] = false;
}
(0, vue_1.onMounted)(() => {
    if (props.data) {
        props.data.forEach((card) => {
            imgError.value[card.importId] = false;
            imgLoading.value[card.importId] = true;
        });
    }
});
const emit = defineEmits(['update:deck']);
function handleCardChange(id, mode) {
    const updatedDeck = JSON.parse(JSON.stringify(props.deck));
    (0, editor_1.changeCard)(id, updatedDeck, mode);
    // 触发更新事件
    emit('update:deck', updatedDeck);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "card-gallery" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "card-list" }));
for (const [card] of __VLS_getVForSourceType((props.data))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ key: (card.importId) }, { class: "card-item" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
    if (!__VLS_ctx.imgError[card.importId] && !__VLS_ctx.imgLoading[card.importId]) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ onError: (...[$event]) => {
                if (!(!__VLS_ctx.imgError[card.importId] && !__VLS_ctx.imgLoading[card.importId]))
                    return;
                __VLS_ctx.onImgError(card.importId);
            } }, { onLoad: (...[$event]) => {
                if (!(!__VLS_ctx.imgError[card.importId] && !__VLS_ctx.imgLoading[card.importId]))
                    return;
                __VLS_ctx.onImgLoad(card.importId);
            } }), { onClick: (...[$event]) => {
                if (!(!__VLS_ctx.imgError[card.importId] && !__VLS_ctx.imgLoading[card.importId]))
                    return;
                __VLS_ctx.handleCardChange(card.importId, true);
            } }), { src: (__VLS_ctx.getCardImg(card.title_zh_Hans)), alt: (card.title_zh_Hans) }), { class: "card-img" }), { style: {} }));
    }
    else if (__VLS_ctx.imgLoading[card.importId]) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "card-img card-img-placeholder" }, { style: {} }));
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign(Object.assign({ onClick: (...[$event]) => {
                if (!!(!__VLS_ctx.imgError[card.importId] && !__VLS_ctx.imgLoading[card.importId]))
                    return;
                if (!!(__VLS_ctx.imgLoading[card.importId]))
                    return;
                __VLS_ctx.handleCardChange(card.importId, true);
            } }, { class: "card-img card-img-placeholder" }), { style: {} }));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "card-name" }, { id: (card.title_zh_Hans) }));
    (card.title_zh_Hans);
}
/** @type {__VLS_StyleScopedClasses['card-gallery']} */ ;
/** @type {__VLS_StyleScopedClasses['card-list']} */ ;
/** @type {__VLS_StyleScopedClasses['card-item']} */ ;
/** @type {__VLS_StyleScopedClasses['card-img']} */ ;
/** @type {__VLS_StyleScopedClasses['card-img']} */ ;
/** @type {__VLS_StyleScopedClasses['card-img-placeholder']} */ ;
/** @type {__VLS_StyleScopedClasses['card-img']} */ ;
/** @type {__VLS_StyleScopedClasses['card-img-placeholder']} */ ;
/** @type {__VLS_StyleScopedClasses['card-name']} */ ;
var __VLS_dollars;
const __VLS_self = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {
            getCardImg: getCardImg,
            imgError: imgError,
            imgLoading: imgLoading,
            onImgError: onImgError,
            onImgLoad: onImgLoad,
            handleCardChange: handleCardChange,
        };
    },
    emits: {},
    __typeProps: {},
});
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
