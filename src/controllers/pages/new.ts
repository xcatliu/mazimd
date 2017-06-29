import { getPageFromId } from '../../models/pages';
import createError from '../../utils/createError';

export default async function(ctx) {
  console.log(ctx.query);
  await ctx.render('pages/new/index');
  // const id = ctx.params.id;
  // if (!id) {
  //   return await Promise.reject(createError(400, 'id is null or undefined'));
  // }

  // return await new Promise((resolve, reject) => {
  //   getPageFromId(id, async (err, data) => {
  //     if (err) return reject(createError(400, err));
  //     await ctx.render('pages/id/index', data);
  //     return resolve();
  //   });
  // });
};
