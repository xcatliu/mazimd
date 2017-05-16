const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const pagesId = require('./controllers/pages-id');
const pagesNew = require('./controllers/pages/new');
const apiPages = require('./controllers/api/pages');

const app = new Koa();

app.use(views('views', {
  map: { hbs: 'handlebars' },
}));

const router = new Router();

router.get('/pages/new', pagesNew.get);
router.get('/pages/:id', pagesId.get);

router.post('/api/pages', bodyParser(), apiPages.post);

app.use(async function (ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
});

app.use(router.routes());

app.listen(3000);