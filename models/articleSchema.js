const Schema = require('mongoose').Schema;
const md5 = require('md5');

const ArticleSchema = new Schema({
  id: String,
  content: String
});

ArticleSchema.methods.contentToMd5 = function () {
  return md5(this.content);
}

module.exports = ArticleSchema;
