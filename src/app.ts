import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as views from 'koa-views';
import * as bodyParser from 'koa-bodyparser';
import * as serveStatic from 'koa-static';
import * as mount from 'koa-mount';

import config from './config';

import connectMongoose from './utils/connectMongoose';

import errorCatcher from './middlewares/errorCatcher';
import { get as getPagesId } from './controllers/pages/id';
import { get as getPagesNew } from './controllers/pages/new';
import { post as postApiPages } from './controllers/api/pages';

connectMongoose();

const app = new Koa();

app.use(views('lib/views', {
  map: { hbs: 'handlebars' },
  options: {
    partials: {
      head: '/partials/head'
    }
  }
}));

const router = new Router();

router.get('/pages/new', getPagesNew);
router.get('/pages/:id', getPagesId);

router.post('/api/pages', bodyParser(), postApiPages);

router.get('/public')

app.use(errorCatcher());

app.use(mount('/public', serveStatic('./public')));

app.use(router.routes());

app.listen(config.port);
