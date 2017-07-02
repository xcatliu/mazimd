import { getThemeFromId } from '../../models/themes';
import createError from '../../utils/createError';
import config from '../../config';

export default async function(ctx) {
  const id = ctx.params.id;
  if (!id) {
    return await Promise.reject(createError(400, 'id is null or undefined'));
  }

  return await new Promise((resolve, reject) => {
    getThemeFromId(id, async (err, theme) => {
      if (err) return reject(createError(400, err));
      await ctx.render('themes/id/index', {
        cdn_origin: config.cdn_origin,
        name: theme.name,
        css: theme.css
      });
      return resolve();
    });
  });
};
