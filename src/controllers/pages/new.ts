import { getPageFromId } from '../../models/pages';
import createError from '../../utils/createError';
import config from '../../config';

export default async function(ctx) {
  const fork_id = ctx.query.fork_id;

  if (typeof fork_id === 'undefined') {
    return ctx.render('pages/new/index', {
      cdn_origin: config.cdn_origin,
    });
  }

  return await new Promise((resolve, reject) => {
    getPageFromId(fork_id, async (err, data) => {
      if (err) return reject(createError(400, err));
      await ctx.render('pages/new/index', {
        cdn_origin: config.cdn_origin,
        md_content: data.content
      });
      return resolve();
    });
  });
};
