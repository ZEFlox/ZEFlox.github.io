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
function sortByType(type, data) {
    if (type === '') {
        return data;
    }
    const sortCardData = data.filter((card) => type === card.type);
    return sortCardData;
}
function sortByCost(cost, data) {
    let sortCardData;
    if (cost == -1) {
        return data;
    }
    else if (cost >= 8) {
        sortCardData = data.filter((card) => parseInt(card.kredits) >= 8);
    }
    else
        sortCardData = data.filter((card) => parseInt(card.kredits) == cost);
    return sortCardData;
}
function sortByRarity(rarity, data) {
    if (rarity === '') {
        return data;
    }
    const sortCardData = data.filter((card) => rarity === card.rarity);
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
    let data = kardsdata_navalwarfare_json_1.default;
    data = sortByAddable(input.addable, data);
    data = sortByNation(input.faction, input.showfaction, data);
    data = sortByType(input.type, data);
    data = sortByCost(input.cost, data);
    data = sortByRarity(input.rarity, data);
    data = sortByReserved(input.reserved, data);
    const sortCardData = data;
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
