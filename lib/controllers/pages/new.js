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
function default_1(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(ctx.query);
        yield ctx.render('pages/new/index');
        // const id = ctx.params.id;
        // if (!id) {
        //   return await Promise.reject(createError(400, 'id is null or undefined'));
        // }
        // return await new Promise((resolve, reject) => {
        //   getPageFromId(id, async (err, data) => {
        //     if (err) return reject(createError(400, err));
        //     await ctx.render('pages/id/index', data);
        //     return resolve();
        //   });
        // });
    });
}
exports.default = default_1;
;
