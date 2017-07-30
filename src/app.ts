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

import themes from './controllers/themes';
import themesId from './controllers/themes/id';

const router = new Router();

router.get('/', async (ctx) => await ctx.render('index'));

router.get('/pages/new', pagesNew);
router.get('/pages/:id', pagesId);

router.get('/themes', themes);
router.get('/themes/:id', themesId);

const app = new Koa();
app.use(hbs.middleware({
  viewPath: path.resolve(__dirname, 'views'),
  partialsPath: path.resolve(__dirname, 'views/_partials'),
}));
app.use(errorCatcher());
if (process.env.NODE_ENV === 'development') {
  app.use(mount('/public', serveStatic('./docs')));
}
app.use(router.routes());

app.listen(config.port, () => {
  console.log(`Server listening on 0.0.0.0 port ${config.port}`);
});
