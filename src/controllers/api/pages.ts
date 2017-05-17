import Page from '../../models/page';
import createError from '../../utils/createError';

const post = async function (ctx) {
  if (!ctx.request.body) {
    return await Promise.reject(createError(400, 'Request body is null or undefined'));
  }
  const content = ctx.request.body.content;
  if (typeof content === 'undefined') {
    return await Promise.reject(createError(400, 'content is undefined'));
  }
  if (typeof content !== 'string') {
    return await Promise.reject(createError(400, 'content is not a string'));
  }
  if (content === '') {
    return await Promise.reject(createError(400, 'content is empty'))
  }

  const page = new Page({
    content: ctx.request.body.content,
  });
  const id = page.contentToMd5();
  page.id = id;

  return await new Promise((resolve, reject) => {
    Page.find({ id }, (err, pages) => {
      if (err) {
        return reject(err);
      }
      if (Array.isArray(pages) && pages.length > 0) {
        ctx.body = {
          id,
          content: pages[0].content,
        };
        return resolve();
      }
      
      page.save((err) => {
        if (err) {
          return reject(err);
        }
        ctx.body = {
          id,
          content: page.content,
        }
        return resolve();
      })
    });
  });
};

export { post };
