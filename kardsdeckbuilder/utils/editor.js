"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeCard = changeCard;
const kardsdata_navalwarfare_json_1 = __importDefault(require("@/data/kardsdata_navalwarfare.json"));
const deck_1 = require("@/utils/deck");
function changeCard(id, deck, mode) {
    const cardInfo = kardsdata_navalwarfare_json_1.default.find((card) => card.importId === id);
    if (!cardInfo || !id)
        return;
    // 先查找是否已存在该卡牌
    for (const card of deck.cards) {
        if (card.id === id) {
            if (card.qty < card.rty && mode) {
                card.qty++;
            }
            if (card.qty > 0 && !mode) {
                card.qty--;
            }
            if (card.qty === 0) {
                deck.cards = deck.cards.filter((i) => i.id !== id);
            }
            return;
        }
    }
    if (mode) {
        (0, deck_1.addCard)(id, 1, deck.cards);
    }
}
