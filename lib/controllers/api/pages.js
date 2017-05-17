"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = require("../../models/page");
const createError_1 = require("../../utils/createError");
const post = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!ctx.request.body) {
            return yield Promise.reject(createError_1.default(400, 'Request body is null or undefined'));
        }
        const content = ctx.request.body.content;
        if (typeof content === 'undefined') {
            return yield Promise.reject(createError_1.default(400, 'content is undefined'));
        }
        if (typeof content !== 'string') {
            return yield Promise.reject(createError_1.default(400, 'content is not a string'));
        }
        if (content === '') {
            return yield Promise.reject(createError_1.default(400, 'content is empty'));
        }
        const page = new page_1.default({
            content: ctx.request.body.content,
        });
        const id = page.contentToMd5();
        page.id = id;
        return yield new Promise((resolve, reject) => {
            page_1.default.find({ id }, (err, pages) => {
                if (err) {
                    return reject(err);
                }
                if (Array.isArray(pages) && pages.length > 0) {
                    ctx.body = {
                        id,
                        content: pages[0].content,
                    };
                    return resolve();
                }
                page.save((err) => {
                    if (err) {
                        return reject(err);
                    }
                    ctx.body = {
                        id,
                        content: page.content,
                    };
                    return resolve();
                });
            });
        });
    });
};
exports.post = post;
