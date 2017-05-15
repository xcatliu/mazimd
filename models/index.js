const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;
mongoose.connect(config.db, (err) => {
  if (err) {
    console.error(`connect to ${config.db} error: ${err.message}`);
    process.exit(1);
  }
});

exports.Article = mongoose.model('Article', require('./articleSchema'));
