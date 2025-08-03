"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineImages = combineImages;
function combineImages(deck, name) {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. 获取所有图片
        function getCardImg(importName) {
            return `./kards_cn/${importName.toUpperCase().replace(/\//g, '')}.png`;
        }
        let urls = [];
        deck.cards.forEach((card) => {
            for (let i = 0; i < card.qty; i++) {
                urls.push(getCardImg(card.name));
            }
        });
        const imgs = yield Promise.all(urls.map((url) => new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(img);
            img.onerror = (e) => reject(`图片加载失败: ${url} - ${e}`);
        })));
        // 2. 画布尺寸
        const height = 351 * 4 + 400 + 200;
        const width = 250 * 10 + 100 * 2;
        // 3. 创建画布并绘制
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            throw new Error('无法获取2D上下文');
        const bg = yield new Promise((resolve, reject) => {
            const img = new Image();
            img.src = './bg.png';
            img.onload = () => resolve(img);
            img.onerror = (e) => reject(`图片加载失败: ${e}`);
        });
        ctx.drawImage(bg, (width - bg.width * 1.5) / 2, (height - bg.height * 1.5) / 2, bg.width * 1.5, bg.height * 1.5);
        ctx.font = 'bold 200px Arial';
        ctx.fillStyle = '#dddddd';
        ctx.fillText(deck.name || `${deck.mainFaction} Deck`, 100, 350);
        let xPosition = 100;
        let yPosition = 500;
        imgs.forEach((img) => {
            ctx.drawImage(img, xPosition, yPosition, img.width / 2, img.height / 2);
            xPosition += img.width / 2;
            if (xPosition >= width - 100) {
                xPosition = 100;
                yPosition += img.height / 2;
            }
        });
        const bc = yield new Promise((resolve, reject) => {
            const img = new Image();
            img.src = './back.png';
            img.onload = () => resolve(img);
            img.onerror = (e) => reject(`图片加载失败: ${e}`);
        });
        ctx.drawImage(bc, xPosition, yPosition, 500 / 2, 702 / 2);
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = '#999999';
        ctx.fillText('Made by Kards Deck Builder', 2400, 1980);
        // 4. 导出结果
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'combined-image.png';
        link.click();
    });
}
