require('superagent/lib/client')

function createNewPage(content, callback) {
  request
    .post('/api/pages')
    .send({ content })
    .set('Accept', 'application/json')
    .end(function(err, res){
      if (err) {
        return callback(err);
      }
      console.log(res);
      callback(null, '');
    });
}

window.M = {
  createNewPage,
};
