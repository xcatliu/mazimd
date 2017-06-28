import * as request from 'superagent';
import config from '../config';

export function getPageFromId(id, callback) {
  request
    .get(`${config.api_origin}/pages/${id}`)
    .end((err, res) => {
      if (err) {
        return callback(err);
      }
      callback(null, res.body);
    });
}
