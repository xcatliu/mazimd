import Page from '../../models/page';
import createError from '../../utils/createError';

const get = async function (ctx) {
  const id = ctx.params.id;
  if (!id) {
    return await Promise.reject(createError(400, 'id is null or undefined'));
  }

  return await new Promise((resolve, reject) => {
    Page.find({ id }, async (err, pages) => {
      if (err) {
        return reject(err);
      }
      if (Array.isArray(pages) && pages.length > 0) {
        ctx.state = {
          content: pages[0].content,
        };
        await ctx.render('pages/id.hbs')
        return resolve();
      }
      return reject(createError(404, 'Not Found'));
    });
  });
}

export { get };
