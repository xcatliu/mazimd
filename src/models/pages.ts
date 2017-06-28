import * as request from 'superagent';
import config from '../config';

export function getPageFromId(id, callback) {
  console.log(`${config.api_origin}/pages/`);
  request
    .get(`${config.api_origin}/pages/`)
    .end((err, res) => {
      console.log(err);
      if (err) {
        return callback(err);
      }
      callback(null, res.body);
    });
}
