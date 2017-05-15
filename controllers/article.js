const Article = require('./models').Article;

exports.create = async function (ctx) {
  if (!ctx.request.body) {
    return await new Promise.reject(new Error('Request body is null or undefined'))
  }
  if (typeof ctx.request.body.content !== 'string') {
    return await new Promise.reject(new Error('content is not a string'))
  }
  const content = ctx.request.body.content.trim();
  if (content === '') {
    return await new Promise.reject(new Error('content is empty'))
  }

  const article = new Article({
    content: ctx.request.body.content,
  });

  const id = article.contentToMd5();

  return await new Promise((resolve, reject) => {
    Article.find({ id }, (err, articles) => {
      if (err) {
        return reject(err);
      }
      if (Array.isArray(articles) && articles.length > 0) {
        ctx.status = 204;
        ctx.body = {
          id,
        };
        return resolve();
      }
      
      article.save((err) => {
        if (err) {
          return reject(err);
        }
        ctx.body = 'success';
        return resolve();
      })
    });
  });
};
