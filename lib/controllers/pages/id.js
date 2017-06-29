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
const pages_1 = require("../../models/pages");
const createError_1 = require("../../utils/createError");
const md2html_1 = require("../../utils/md2html");
function default_1(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = ctx.params.id;
        console.log(id);
        if (!id) {
            return yield Promise.reject(createError_1.default(400, 'id is null or undefined'));
        }
        return yield new Promise((resolve, reject) => {
            pages_1.getPageFromId(id, (err, data) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    return reject(createError_1.default(400, err));
                yield ctx.render('pages/id/index', {
                    content: md2html_1.default(data.content).html
                });
                return resolve();
            }));
        });
    });
}
exports.default = default_1;
;
