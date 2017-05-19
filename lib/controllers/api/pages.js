"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = require("../../models/page");
const createError_1 = require("../../utils/createError");
const post = async function (ctx) {
    if (!ctx.request.body) {
        return await Promise.reject(createError_1.default(400, 'Request body is null or undefined'));
    }
    const content = ctx.request.body.content;
    if (typeof content === 'undefined') {
        return await Promise.reject(createError_1.default(400, 'content is undefined'));
    }
    if (typeof content !== 'string') {
        return await Promise.reject(createError_1.default(400, 'content is not a string'));
    }
    if (content === '') {
        return await Promise.reject(createError_1.default(400, 'content is empty'));
    }
    const page = new page_1.default({
        content: ctx.request.body.content,
    });
    const id = page.contentToMd5();
    page.id = id;
    return await new Promise((resolve, reject) => {
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
};
exports.post = post;
