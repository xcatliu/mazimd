"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Router = require("koa-router");
const views = require("koa-views");
const bodyParser = require("koa-bodyparser");
const config_1 = require("./config");
const connectMongoose_1 = require("./utils/connectMongoose");
const errorCatcher_1 = require("./middlewares/errorCatcher");
const pages_id_1 = require("./controllers/pages-id");
const new_1 = require("./controllers/pages/new");
const pages_1 = require("./controllers/api/pages");
connectMongoose_1.default();
const app = new Koa();
app.use(views('lib/views', {
    map: { hbs: 'handlebars' },
}));
const router = new Router();
router.get('/pages/new', new_1.get);
router.get('/pages/:id', pages_id_1.get);
router.post('/api/pages', bodyParser(), pages_1.post);
app.use(errorCatcher_1.default());
app.use(router.routes());
app.listen(config_1.default.port);
