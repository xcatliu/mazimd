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
const path = require("path");
const Koa = require("koa");
const hbs = require("koa-hbs");
const mount = require("koa-mount");
const Router = require("koa-router");
const serveStatic = require("koa-static");
const config_1 = require("./config");
const errorCatcher_1 = require("./middlewares/errorCatcher");
const id_1 = require("./controllers/pages/id");
const new_1 = require("./controllers/pages/new");
const themes_1 = require("./controllers/themes");
const id_2 = require("./controllers/themes/id");
const router = new Router();
router.get('/', (ctx) => __awaiter(this, void 0, void 0, function* () { return yield ctx.render('index'); }));
router.get('/pages/new', new_1.default);
router.get('/pages/:id', id_1.default);
router.get('/themes', themes_1.default);
router.get('/themes/:id', id_2.default);
const app = new Koa();
app.use(hbs.middleware({
    viewPath: path.resolve(__dirname, 'views'),
}));
app.use(errorCatcher_1.default());
if (process.env.NODE_ENV === 'development') {
    app.use(mount('/public', serveStatic('./docs')));
}
app.use(router.routes());
app.listen(config_1.default.port, () => {
    console.log(`Server listening on 0.0.0.0 port ${config_1.default.port}`);
});
