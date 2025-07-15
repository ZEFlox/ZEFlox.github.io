"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCard = addCard;
exports.importDeck = importDeck;
exports.exportDeck = exportDeck;
const kardsdata_navalwarfare_json_1 = __importDefault(require("@/data/kardsdata_navalwarfare.json"));
const faction_json_1 = __importDefault(require("@/data/faction.json"));
const sort_1 = require("@/utils/sort");
//解析代码
function idParse(input) {
    // 整理格式
    input = input.replace(/\r|\n/g, '');
    const index = input.indexOf('%%');
    if (index === -1)
        throw new Error('未找到卡组代码');
    let str = input.substring(index + 2);
    // 提取国家
    const pipeIndex = str.indexOf('|');
    if (pipeIndex < 2)
        throw new Error('国家信息格式错误');
    const faction1 = parseInt(str.substring(0, 1), 10);
    const faction2 = parseInt(str.substring(1, 2), 10);
    if (isNaN(faction1) || isNaN(faction2))
        throw new Error('国家编号解析失败');
    // 提取卡组
    const rest = str.substring(pipeIndex + 1);
    if (!rest)
        throw new Error('卡组中没有任何卡牌');
    const groupStrs = rest.split(';');
    const deck = groupStrs.map((g) => {
        const arr = [];
        for (let i = 0; i < g.length; i += 2) {
            const id = g.substring(i, i + 2);
            arr.push(id);
        }
        return arr;
    });
    return [faction1, faction2, deck];
}
function addCard(cardId, idx, cardCount) {
    const cardInfo = kardsdata_navalwarfare_json_1.default.find((c) => c.importId === cardId);
    let name = `Unknown Card Id: ${cardId}`;
    let cost = 0;
    let faction = ['Unknown'];
    let spawn = [];
    let type = 'Unknown';
    let rty = 1;
    let qty = 1;
    if (cardInfo) {
        name = cardInfo.title_zh_Hans;
        cost = parseInt(cardInfo.kredits);
        faction = cardInfo.faction;
        spawn = cardInfo.spawn;
        type = cardInfo.type;
        rty =
            cardInfo.rarity === 'Standard'
                ? 4
                : cardInfo.rarity === 'Limited'
                    ? 3
                    : cardInfo.rarity === 'Special'
                        ? 2
                        : 1;
        qty = idx;
    }
    cardCount.push({
        name,
        cost,
        qty,
        rty,
        type,
        faction,
        spawn,
        id: cardId,
    });
}
//解析卡组
function getDeckInfo([faction1, faction2, deck]) {
    // 获取主国和盟国名称
    const mainFaction = faction_json_1.default[faction1 - 1];
    const alliedFaction = faction_json_1.default[faction2 - 1];
    // 查找卡牌信息
    const cardCount = [];
    deck.forEach((group, idx) => {
        group.forEach((cardId) => {
            addCard(cardId, idx + 1, cardCount);
        });
    });
    return {
        mainFaction,
        alliedFaction,
        cards: cardCount,
    };
}
//导入卡组
function importDeck(input) {
    let deckInfo = getDeckInfo(idParse(input));
    (0, sort_1.sortDeck)(deckInfo);
    return deckInfo;
}
//导出卡组
function exportDeck(deck) {
    if (deck.cards.length === 0)
        throw new Error('卡组数据无效或为空');
    let str = ``;
    let arr = [[], [], [], []];
    // 国家代码
    const mainFactionIndex = faction_json_1.default.indexOf(deck.mainFaction) + 1;
    const alliedFactionIndex = faction_json_1.default.indexOf(deck.alliedFaction) + 1;
    if (mainFactionIndex < 1 || alliedFactionIndex < 1)
        throw new Error('国家名称无效');
    // 卡组代码
    deck.cards.forEach((card) => {
        const idx = card.qty - 1;
        arr[idx].push(card.id);
    });
    str += `%%${mainFactionIndex}${alliedFactionIndex}|`;
    str += arr.map((group) => group.join('')).join(';');
    return str;
}
