import * as request from 'superagent';
import config from '../config';

export function getAllThemes(callback) {
  request
    .get(`${config.api_origin}/themes`)
    .end((err, res) => {
      if (err) {
        return callback(err);
      }
      callback(null, res.body);
    });
}
