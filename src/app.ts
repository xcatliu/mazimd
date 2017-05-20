import * as path from 'path';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as renderer from 'koa-hbs-renderer';
import * as bodyParser from 'koa-bodyparser';
import * as serveStatic from 'koa-static';
import * as mount from 'koa-mount';

import config from './config';

import connectMongoose from './utils/connectMongoose';

import errorCatcher from './middlewares/errorCatcher';
import { get as getPagesId } from './controllers/pages/id';
import { post as postApiPages } from './controllers/api/pages';

connectMongoose();

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
router.get('/pages/:id', getPagesId);

router.post('/api/pages', bodyParser(), postApiPages);

router.get('/public')

app.use(errorCatcher());

app.use(mount('/public', serveStatic('./public')));

app.use(router.routes());

app.listen(config.port);
