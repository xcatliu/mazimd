"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("superagent");
function createNewPage(content, callback) {
    request
        .post('/api/pages')
        .send({ content })
        .set('Accept', 'application/json')
        .end(function (err, res) {
        if (err) {
            return callback(err);
        }
        console.log(res);
        callback(null, `/pages/${res.body.id}`);
    });
}
var submit = document.getElementById('submit');
var textarea = (document.getElementById('textarea'));
submit.addEventListener('click', function (e) {
    e.preventDefault();
    var content = textarea.value;
    createNewPage(content, function (err, url) {
        if (err) {
            return alert(err.message);
        }
        location.href = url;
    });
});
