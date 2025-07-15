"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortData = sortData;
exports.sortDeck = sortDeck;
const kardsdata_navalwarfare_json_1 = __importDefault(require("@/data/kardsdata_navalwarfare.json"));
//卡池筛选
function sortByAddable(input, data) {
    if (!input) {
        return data;
    }
    const sortCardData = data.filter((card) => card.set != 'OnlySpawnable');
    return sortCardData;
}
function sortByNation(faction, showfaction, data) {
    if (!faction || faction.length === 0) {
        return data;
    }
    const sortCardData = data.filter((card) => (card.faction.some((f) => f === faction[0]) && (showfaction == 0 || showfaction == 1)) ||
        (card.faction.some((f) => f === faction[1]) &&
            card.rarity !== 'Elite' &&
            (showfaction === 0 || showfaction === 2)));
    return sortCardData;
}
function sortByType(input, data) {
    if (input === '') {
        return data;
    }
    const sortCardData = data.filter((card) => input === card.type);
    return sortCardData;
}
function sortByCost(cost, data) {
    if (!cost || cost.length === 0) {
        return data;
    }
    const sortCardData = data.filter((card) => parseInt(card.kredits) >= cost[0] && parseInt(card.kredits) <= cost[1]);
    return sortCardData;
}
function sortByReserved(input, data) {
    if (input) {
        return data;
    }
    const sortCardData = data.filter((card) => card.reserved === 'FALSE');
    return sortCardData;
}
function sortData(input) {
    const originCardData = kardsdata_navalwarfare_json_1.default;
    const sortAddable = sortByAddable(input.addable, originCardData);
    const sortedNation = sortByNation(input.faction, input.showfaction, sortAddable);
    const sortedType = sortByType(input.type, sortedNation);
    const sortedCost = sortByCost(input.cost, sortedType);
    const sortReserved = sortByReserved(input.reserved, sortedCost);
    const sortCardData = sortReserved;
    return sortCardData;
}
function sortDeck(deck) {
    // 按 cardData 顺序排序
    const idOrderMap = new Map();
    kardsdata_navalwarfare_json_1.default.forEach((card, idx) => idOrderMap.set(card.importId, idx));
    function byCardDataOrder(a, b) {
        var _a, _b;
        return ((_a = idOrderMap.get(a.id)) !== null && _a !== void 0 ? _a : 99999) - ((_b = idOrderMap.get(b.id)) !== null && _b !== void 0 ? _b : 99999);
    }
    deck.cards.sort(byCardDataOrder);
}
