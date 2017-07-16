import { getPageFromId } from '../../models/pages';
import createError from '../../utils/createError';
import md2html from '../../utils/md2html';
import * as Prism from 'node-prismjs';
import config from '../../config';

export default async function(ctx) {
  const id = ctx.params.id;
  if (!id) {
    return await Promise.reject(createError(400, 'id is null or undefined'));
  }

  return await new Promise((resolve, reject) => {
    getPageFromId(id, async (err, data) => {
      if (err) return reject(createError(400, err));
      await ctx.render('pages/id/index', {
        id,
        cdn_origin: config.cdn_origin,
        content: md2html(Prism)(data.content).html
      });
      return resolve();
    });
  });
};
