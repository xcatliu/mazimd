"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = require("../../models/page");
const createError_1 = require("../../utils/createError");
const get = async function (ctx) {
    const id = ctx.params.id;
    if (!id) {
        return await Promise.reject(createError_1.default(400, 'id is null or undefined'));
    }
    return await new Promise((resolve, reject) => {
        page_1.default.find({ id }, async (err, pages) => {
            if (err) {
                return reject(err);
            }
            if (Array.isArray(pages) && pages.length > 0) {
                ctx.state = {
                    content: pages[0].content,
                };
                await ctx.render('pages/id.hbs');
                return resolve();
            }
            return reject(createError_1.default(404, 'Not Found'));
        });
    });
};
exports.get = get;
