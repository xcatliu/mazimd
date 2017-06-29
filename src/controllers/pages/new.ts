import { getPageFromId } from '../../models/pages';
import createError from '../../utils/createError';
import config from '../../config';

export default async function(ctx) {
  await ctx.render('pages/new/index', {
    cdn_origin: config.cdn_origin,
  });
};
