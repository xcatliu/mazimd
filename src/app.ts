import * as path from 'path';

import * as Koa from 'koa';
import * as hbs from 'koa-hbs';
import * as mount from 'koa-mount';
import * as Router from 'koa-router';
import * as serveStatic from 'koa-static';

import config from './config';

import errorCatcher from './middlewares/errorCatcher';

import pagesId from './controllers/pages/id';
import pagesNew from './controllers/pages/new';

const router = new Router();
router.get('/', async (ctx) => await ctx.render('index'));
router.get('/pages/new', pagesNew);
router.get('/pages/:id', pagesId);

const app = new Koa();
app.use(hbs.middleware({
  viewPath: path.resolve(__dirname, 'views'),
  // partialsPath: path.resolve(__dirname, 'views/_partials'),
}));
app.use(errorCatcher());
app.use(mount('/public', serveStatic('./public')));
app.use(router.routes());

app.listen(config.port, () => {
  console.log(`Server listening on 0.0.0.0 port ${config.port}`);
});
