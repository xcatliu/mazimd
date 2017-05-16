const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const md5 = require('md5');

const PageSchema = new Schema({
  id: String,
  content: String
});

PageSchema.methods.contentToMd5 = function () {
  return md5(this.content);
}

module.exports = mongoose.model('Page', PageSchema);
