import { getAllThemes } from '../models/themes';
import createError from '../utils/createError';
import config from '../config';

export default async function(ctx) {
  return await new Promise((resolve, reject) => {
    getAllThemes(async (err, data) => {
      if (err) return reject(createError(400, err));
      await ctx.render('themes/index', {
        cdn_origin: config.cdn_origin,
        themes: data
      });
      return resolve();
    });
  });
};
