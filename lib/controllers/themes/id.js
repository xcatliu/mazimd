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
const themes_1 = require("../../models/themes");
const createError_1 = require("../../utils/createError");
const config_1 = require("../../config");
function default_1(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = ctx.params.id;
        if (!id) {
            return yield Promise.reject(createError_1.default(400, 'id is null or undefined'));
        }
        return yield new Promise((resolve, reject) => {
            themes_1.getThemeFromId(id, (err, theme) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    return reject(createError_1.default(400, err));
                yield ctx.render('themes/id/index', {
                    cdn_origin: config_1.default.cdn_origin,
                    name: theme.name,
                    css: theme.css
                });
                return resolve();
            }));
        });
    });
}
exports.default = default_1;
;
