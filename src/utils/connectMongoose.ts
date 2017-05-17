import * as mongoose from 'mongoose';
import config from '../config';

export default function() {
  (<any>mongoose).Promise = global.Promise;
  mongoose.connect(config.db, (err) => {
    if (err) {
      console.error(`connect to ${config.db} error: ${err.message}`);
      process.exit(1);
    }
  });
}
