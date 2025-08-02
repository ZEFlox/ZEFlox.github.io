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
const editor_1 = require("@/utils/editor");
const vue_1 = require("vue");
const props = defineProps();
const mainlength = (0, vue_1.computed)(() => {
    var _a;
    return ((_a = props.deck.cards) === null || _a === void 0 ? void 0 : _a.reduce((sum, card) => card.faction.some((f) => f === props.deck.mainFaction) ? sum + card.qty : sum, 1)) || 1;
});
const alliedlength = (0, vue_1.computed)(() => {
    var _a;
    return ((_a = props.deck.cards) === null || _a === void 0 ? void 0 : _a.reduce((sum, card) => !card.faction.some((f) => f === props.deck.mainFaction) &&
        card.faction.some((f) => f === props.deck.alliedFaction)
        ? sum + card.qty
        : sum, 0)) || 0;
});
const length = (0, vue_1.computed)(() => mainlength.value + alliedlength.value);
function getCardImg(importName) {
    return `./kards_cn/${importName.toUpperCase().replace(/\//g, '')}.png`;
}
function cleanDeck() {
    props.deck.cards = [];
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "deck" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "name" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)(Object.assign({ type: "text", maxlength: "6", value: (props.deck.name), size: "9", placeholder: "输入卡组名称" }, { style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "decklist" }));
for (const [card] of __VLS_getVForSourceType((props.deck.cards))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "card" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "cropper" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)(Object.assign({ class: "view" }, { src: (__VLS_ctx.getCardImg(card.name)) }));
    (card.cost);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ onClick: (...[$event]) => {
            __VLS_ctx.changeCard(card.id, props.deck, false);
        } }, { class: "cardname" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
    (card.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ onClick: (...[$event]) => {
            __VLS_ctx.changeCard(card.id, props.deck, true);
        } }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
    (card.qty);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "count" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.mainlength);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.alliedlength);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.length);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign({ onClick: (__VLS_ctx.cleanDeck) }));
/** @type {__VLS_StyleScopedClasses['deck']} */ ;
/** @type {__VLS_StyleScopedClasses['name']} */ ;
/** @type {__VLS_StyleScopedClasses['decklist']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['cropper']} */ ;
/** @type {__VLS_StyleScopedClasses['view']} */ ;
/** @type {__VLS_StyleScopedClasses['cardname']} */ ;
/** @type {__VLS_StyleScopedClasses['count']} */ ;
var __VLS_dollars;
const __VLS_self = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {
            changeCard: editor_1.changeCard,
            mainlength: mainlength,
            alliedlength: alliedlength,
            length: length,
            getCardImg: getCardImg,
            cleanDeck: cleanDeck,
        };
    },
    __typeProps: {},
});
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
