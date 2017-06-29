import * as request from 'superagent';
import config from '../config';

export function getPageFromId(id, callback) {
  console.log(`${config.api_origin}/pages/${id}`);
  request
    .get(`${config.api_origin}/pages/${id}`)
    .end((err, res) => {
      console.log(err);
      console.log(res.body);
      if (err) {
        return callback(err);
      }
      callback(null, res.body);
    });
}
