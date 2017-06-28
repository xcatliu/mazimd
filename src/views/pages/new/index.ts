import * as SimpleMDE from 'simplemde';
import * as request from 'superagent';

function createNewPage(content, callback) {
  request
    .post('/api/pages')
    .send({ content })
    .set('Accept', 'application/json')
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
    'table',
    '|',
    {
      name: 'about',
      action: function customFunction(editor){
          window.open('http://github.com/xcatliu/mazimd', '_blank');
      },
      className: "fa fa-info",
      title: "关于 码字 md",
    }
  ]
});

// var submit = document.getElementById('submit');
// var textarea = <HTMLTextAreaElement>(document.getElementById('textarea'));

// submit.addEventListener('click', function(e) {
//   e.preventDefault();
//   var content = textarea.value;

//   createNewPage(content, function(err, url) {
//     if (err) {
//       return alert(err.message);
//     }
//     location.href = url;
//   });
// });
