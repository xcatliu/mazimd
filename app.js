const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

const Document = require('./models').Document;

router
  .get('/p/:id', async (ctx) => {
    await new Promise((resolve, reject) => {
      Document.find({
        id: ctx.params.id
      }, (err, documents) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        ctx.body = documents[0].content;
        console.log(ctx.body);
        resolve();
      });
    });
  })
  .post('/api/p', bodyParser(), async (ctx) => {
    const document = new Document({
      content: ctx.request.body.content,
    });
    document.id = document.md5Content();
    await document.save().then(() => {
      ctx.body = 'success'
    });
  })

app
  .use(router.routes());

app.listen(3000);