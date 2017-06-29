"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimpleMDE = require("simplemde");
const request = require("superagent");
const md2html_1 = require("../../../utils/md2html");
const config_1 = require("../../../config");
function createNewPage(content, callback) {
    request
        .post(`${config_1.default.api_origin}/pages`)
        .send({ content, expire_in: '1h' })
        .end((err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, res.body);
    });
}
const simplemde = new SimpleMDE({
    autoDownloadFontAwesome: false,
    autofocus: true,
    autosave: {
        enabled: true,
        uniqueId: 'mazimd',
    },
    element: document.getElementById('mazimd-textarea'),
    indentWithTabs: false,
    initialValue: 'Hello World',
    insertTexts: {
        image: ['![](http://', ')']
    },
    placeholder: 'Hello World',
    spellChecker: false,
    status: false,
    styleSelectedText: false,
    toolbar: [
        'bold',
        'italic',
        'strikethrough',
        '|',
        'heading',
        'code',
        'quote',
        'unordered-list',
        'ordered-list',
        '|',
        'link',
        'image',
        'table'
    ]
});
document.getElementById('mazimd-preview-button').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('mazimd-preview-content').innerHTML = md2html_1.default(window.Prism)(simplemde.value()).html;
    document.body.classList.add('mazimd-preview-mode');
});
document.getElementById('mazimd-preview-back-button').addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.remove('mazimd-preview-mode');
});
document.getElementById('mazimd-publish-button').addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('确定发布吗？')) {
        createNewPage(simplemde.value(), (err, data) => {
            if (err) {
                return alert(err.message);
            }
            location.href = data.html_url;
        });
    }
});
