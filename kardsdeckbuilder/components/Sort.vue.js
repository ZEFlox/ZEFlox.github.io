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
const sort_1 = require("@/utils/sort");
const vue_1 = require("vue");
const props = defineProps();
const types = ['infantry', 'tank', 'fighter', 'bomber', 'artillery', 'order', 'countermeasure'];
const rarities = ['Standard', 'Limited', 'Special', 'Elite'];
const sortOptions = (0, vue_1.ref)({
    addable: true,
    faction: props.nation,
    showfaction: 0,
    cost: -1,
    type: '',
    rarity: '',
    reserved: false,
});
(0, vue_1.watch)(() => props.nation, (newNation) => {
    if (JSON.stringify(newNation) !== JSON.stringify(sortOptions.value.faction)) {
        sortOptions.value.faction = newNation;
    }
}, { deep: true });
(0, vue_1.watch)(() => (Object.assign({}, sortOptions.value)), () => {
    apply();
}, { deep: true });
const emit = defineEmits(['update:options']);
function apply() {
    console.log(sortOptions.value);
    const updatedoption = (0, sort_1.sortData)(sortOptions.value);
    console.log(updatedoption);
    // 触发更新事件
    emit('update:options', updatedoption);
}
apply();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['sort']} */ ;
/** @type {__VLS_StyleScopedClasses['sort']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "sort" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "checkbox",
});
(__VLS_ctx.sortOptions.reserved);
__VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.sortOptions.cost),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "-1",
});
for (const [i] of __VLS_getVForSourceType(([0, 1, 2, 3, 4, 5, 6, 7]))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: (i),
    });
    (i);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "8",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.sortOptions.showfaction),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "0",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "1",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "2",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.sortOptions.type),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "",
});
for (const [type] of __VLS_getVForSourceType((__VLS_ctx.types))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: (type),
    });
    (type);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.sortOptions.rarity),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "",
});
for (const [rarity] of __VLS_getVForSourceType((__VLS_ctx.rarities))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: (rarity),
    });
    (rarity);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
/** @type {__VLS_StyleScopedClasses['sort']} */ ;
var __VLS_dollars;
const __VLS_self = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {
            types: types,
            rarities: rarities,
            sortOptions: sortOptions,
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
