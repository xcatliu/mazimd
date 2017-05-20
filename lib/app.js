"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const Koa = require("koa");
const Router = require("koa-router");
const renderer = require("koa-hbs-renderer");
const bodyParser = require("koa-bodyparser");
const serveStatic = require("koa-static");
const mount = require("koa-mount");
const config_1 = require("./config");
const connectMongoose_1 = require("./utils/connectMongoose");
const errorCatcher_1 = require("./middlewares/errorCatcher");
const id_1 = require("./controllers/pages/id");
const pages_1 = require("./controllers/api/pages");
connectMongoose_1.default();
const app = new Koa();
app.use(renderer({
    paths: {
        views: path.resolve(__dirname, 'views'),
        partials: path.resolve(__dirname, 'views/partials')
    }
}));
const router = new Router();
router.get('/', ctx => ctx.render('index'));
router.get('/pages/new', ctx => ctx.render('pages/new'));
router.get('/pages/:id', id_1.get);
router.post('/api/pages', bodyParser(), pages_1.post);
router.get('/public');
app.use(errorCatcher_1.default());
app.use(mount('/public', serveStatic('./public')));
app.use(router.routes());
app.listen(config_1.default.port);
