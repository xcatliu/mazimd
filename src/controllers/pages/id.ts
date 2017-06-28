import { getPageFromId } from '../../models/pages';
import createError from '../../utils/createError';

export default async function(ctx) {
  const id = ctx.params.id;
  if (!id) {
    return await Promise.reject(createError(400, 'id is null or undefined'));
  }

  return await new Promise((resolve, reject) => {
    getPageFromId(id, (err, data) => {
      if (err) return reject(createError(400, err));
      ctx.render('pages/id/index', data);
      return resolve();
    });
  });
};
