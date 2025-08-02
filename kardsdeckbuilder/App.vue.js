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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cards_vue_1 = __importDefault(require("@/components/Cards.vue"));
const Deck_vue_1 = __importDefault(require("@/components/Deck.vue"));
const Sort_vue_1 = __importDefault(require("@/components/Sort.vue"));
const Set_vue_1 = __importDefault(require("@/components/Set.vue"));
const deck_1 = require("@/utils/deck");
const sort_1 = require("@/utils/sort");
const vue_1 = require("vue");
const core_1 = require("@vueuse/core");
const draw_1 = require("./utils/draw");
const { copy } = (0, core_1.useClipboard)();
let input = (0, vue_1.ref)('');
let currentDeck = (0, vue_1.ref)({
    name: '',
    mainFaction: 'Germany',
    alliedFaction: 'France',
    cards: [],
});
let data = (0, vue_1.ref)([]);
let viewMode = (0, vue_1.ref)('deck');
const deckVisible = (0, vue_1.computed)(() => viewMode.value === 'deck');
const sortVisible = (0, vue_1.computed)(() => viewMode.value === 'sort');
const setVisible = (0, vue_1.computed)(() => viewMode.value === 'set');
//导入
function importInput() {
    if (input.value) {
        try {
            let deckInfo = (0, deck_1.importDeck)(input.value);
            currentDeck.value = deckInfo;
            console.log('Current Deck:', currentDeck.value);
            (0, sort_1.sortDeck)(currentDeck.value);
        }
        catch (error) {
            console.error('Error importing deck:', error);
        }
    }
    input.value = '';
}
//导出
function exportInput() {
    console.log(currentDeck.value);
    if (currentDeck.value.cards.length !== 0) {
        try {
            console.log('Exporting deck:', currentDeck.value);
            showToast(`
      <div>导出方式：</div>
      <button class="copyascode">复制为代码</button><button class="copyasimg">下载为图片</button>
      `, 0);
        }
        catch (error) {
            console.error('Error exporting deck:', error);
            showToast(`导出失败:${error}`, 3000);
        }
    }
    else {
        showToast('卡组中没有任何牌', 1000);
    }
}
//呼出弹窗
function showToast(message, time) {
    const container = document.querySelector('.toast-container');
    container.replaceChildren();
    const toast = document.createElement('div');
    toast.className = `toast`;
    toast.innerHTML = `
    ${message}
    <button class="toast-close">&times;</button>
  `;
    container.appendChild(toast);
    container.classList.add('show');
    let timer;
    if (time != 0) {
        timer = setTimeout(() => {
            container.classList.remove('show');
            toast.remove();
        }, time);
    }
    if (toast.querySelector('.toast-close')) {
        toast.querySelector('.toast-close').addEventListener('click', () => {
            if (time != 0)
                clearTimeout(timer);
            container.classList.remove('show');
            toast.remove();
        });
    }
    if (toast.querySelector('.copyascode')) {
        toast.querySelector('.copyascode').addEventListener('click', () => {
            copy((0, deck_1.exportDeck)(currentDeck.value));
            showToast('复制成功', 3000);
        });
    }
    if (toast.querySelector('.copyasimg')) {
        toast.querySelector('.copyasimg').addEventListener('click', () => {
            (0, draw_1.combineImages)(currentDeck.value, '');
            showToast('正在下载', 3000);
        });
    }
}
//边栏控制
function setView(type) {
    if (viewMode.value === type)
        viewMode.value = 'deck';
    else
        viewMode.value = type;
}
//检查更新
function onDeckUpdate(newDeck) {
    currentDeck.value = newDeck;
    (0, sort_1.sortDeck)(currentDeck.value);
    console.log(currentDeck.value);
}
function onDataUpdate(newData) {
    if (JSON.stringify(data.value) !== JSON.stringify(newData)) {
        data.value = newData;
        console.log('Data updated:', data.value);
    }
}
function factionAble(faction) {
    const able = faction == currentDeck.value.mainFaction || faction == currentDeck.value.alliedFaction;
    return able;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "toast-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "iapp",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "title",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ id: "ui" }, { class: "row" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "cards",
});
/** @type {[typeof Cards, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Cards_vue_1.default, new Cards_vue_1.default(Object.assign({ 'onUpdate:deck': {} }, { deck: (__VLS_ctx.currentDeck), data: (__VLS_ctx.data) })));
const __VLS_1 = __VLS_0(Object.assign({ 'onUpdate:deck': {} }, { deck: (__VLS_ctx.currentDeck), data: (__VLS_ctx.data) }), ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    'onUpdate:deck': (__VLS_ctx.onDeckUpdate)
};
var __VLS_2;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "sidebar",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "toolbar" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)(Object.assign({ onChange: (...[$event]) => {
        __VLS_ctx.sortDeck(__VLS_ctx.currentDeck);
    } }, { name: "mainFaction", value: (__VLS_ctx.currentDeck.mainFaction) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "Germany",
    disabled: (__VLS_ctx.factionAble('Germany')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "Britain",
    disabled: (__VLS_ctx.factionAble('Britain')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "Japan",
    disabled: (__VLS_ctx.factionAble('Japan')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "Soviet",
    disabled: (__VLS_ctx.factionAble('Soviet')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "USA",
    disabled: (__VLS_ctx.factionAble('USA')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)(Object.assign({ onChange: (...[$event]) => {
        __VLS_ctx.sortDeck(__VLS_ctx.currentDeck);
    } }, { name: "mainFaction", value: (__VLS_ctx.currentDeck.alliedFaction) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "Germany",
    disabled: (__VLS_ctx.factionAble('Germany')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "Britain",
    disabled: (__VLS_ctx.factionAble('Britain')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "Japan",
    disabled: (__VLS_ctx.factionAble('Japan')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "Soviet",
    disabled: (__VLS_ctx.factionAble('Soviet')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "USA",
    disabled: (__VLS_ctx.factionAble('USA')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "France",
    disabled: (__VLS_ctx.factionAble('France')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "Italy",
    disabled: (__VLS_ctx.factionAble('Italy')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "Poland",
    disabled: (__VLS_ctx.factionAble('Poland')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "Finland",
    disabled: (__VLS_ctx.factionAble('Finland')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign({ onClick: (...[$event]) => {
        __VLS_ctx.setView('sort');
    } }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign({ onClick: (...[$event]) => {
        __VLS_ctx.setView('set');
    } }));
/** @type {[typeof Deck, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(Deck_vue_1.default, new Deck_vue_1.default(Object.assign(Object.assign({ 'onUpdate:deck': {} }, { deck: (__VLS_ctx.currentDeck) }), { class: "sidecontent" })));
const __VLS_8 = __VLS_7(Object.assign(Object.assign({ 'onUpdate:deck': {} }, { deck: (__VLS_ctx.currentDeck) }), { class: "sidecontent" }), ...__VLS_functionalComponentArgsRest(__VLS_7));
let __VLS_10;
let __VLS_11;
let __VLS_12;
const __VLS_13 = {
    'onUpdate:deck': (__VLS_ctx.onDeckUpdate)
};
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, Object.assign(Object.assign({}, __VLS_directiveBindingRestFields), { value: (__VLS_ctx.deckVisible) }), null, null);
var __VLS_9;
/** @type {[typeof Sort, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(Sort_vue_1.default, new Sort_vue_1.default(Object.assign(Object.assign({ 'onUpdate:options': {} }, { data: (__VLS_ctx.data), nation: ([__VLS_ctx.currentDeck.mainFaction, __VLS_ctx.currentDeck.alliedFaction]) }), { class: "sidecontent" })));
const __VLS_15 = __VLS_14(Object.assign(Object.assign({ 'onUpdate:options': {} }, { data: (__VLS_ctx.data), nation: ([__VLS_ctx.currentDeck.mainFaction, __VLS_ctx.currentDeck.alliedFaction]) }), { class: "sidecontent" }), ...__VLS_functionalComponentArgsRest(__VLS_14));
let __VLS_17;
let __VLS_18;
let __VLS_19;
const __VLS_20 = {
    'onUpdate:options': (__VLS_ctx.onDataUpdate)
};
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, Object.assign(Object.assign({}, __VLS_directiveBindingRestFields), { value: (__VLS_ctx.sortVisible) }), null, null);
var __VLS_16;
/** @type {[typeof Set, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(Set_vue_1.default, new Set_vue_1.default(Object.assign({ class: "sidecontent" })));
const __VLS_22 = __VLS_21(Object.assign({ class: "sidecontent" }), ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, Object.assign(Object.assign({}, __VLS_directiveBindingRestFields), { value: (__VLS_ctx.setVisible) }), null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "toolbar" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    value: (__VLS_ctx.input),
    type: "text",
    size: "12",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign({ onClick: (__VLS_ctx.importInput) }, { id: "import" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign({ onClick: (__VLS_ctx.exportInput) }, { id: "export" }));
/** @type {__VLS_StyleScopedClasses['toast-container']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['sidecontent']} */ ;
/** @type {__VLS_StyleScopedClasses['sidecontent']} */ ;
/** @type {__VLS_StyleScopedClasses['sidecontent']} */ ;
/** @type {__VLS_StyleScopedClasses['toolbar']} */ ;
var __VLS_dollars;
const __VLS_self = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {
            Cards: Cards_vue_1.default,
            Deck: Deck_vue_1.default,
            Sort: Sort_vue_1.default,
            Set: Set_vue_1.default,
            sortDeck: sort_1.sortDeck,
            input: input,
            currentDeck: currentDeck,
            data: data,
            deckVisible: deckVisible,
            sortVisible: sortVisible,
            setVisible: setVisible,
            importInput: importInput,
            exportInput: exportInput,
            setView: setView,
            onDeckUpdate: onDeckUpdate,
            onDataUpdate: onDataUpdate,
            factionAble: factionAble,
        };
    },
});
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
