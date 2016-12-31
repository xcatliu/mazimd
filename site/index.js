var initialValue = `# 码字 md

> 干净精致的 Markdown 编辑器。

## 介绍

- 基于 [SimpleMDE][] 和 [Mobi.css](http://getmobicss.com/zh-cn/)，加入了中文适配
- 精致的预览页，可以直接拷贝到 word 或导出为 pdf（开发中）
- 主题可单独使用，配合 [SimpleMDE][] 的 API，可以很方便的将此编辑器嵌入到你的网站上

### 功能

- 工具栏
- 预览
- 自动保存
- [快捷键](https://github.com/NextStepWebs/simplemde-markdown-editor#keyboard-shortcuts)

## TODOs

- [ ] 导出为 pdf
- [ ] 代码高亮
- [ ] 修复中文标题的 id 渲染

## 开源协议

MIT

## 了解更多

- 访问[码字 md 的 GitHub](http://github.com/xcatliu/mazimd)

## 下面是 Markdown 演示

*斜体*，**粗体**，~~被删除的文本~~。

标题：

# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

行内代码：\`alert('Hello World')\`

块级代码：

\`\`\`js
var str = 'Hello World';
alert(str);
\`\`\`

块级引用：

> 码字 md —— 干净精致的 Markdown 编辑器

无序列表：

- 无序列表
- 无序列表
  - 二级无序列表
  - 二级无序列表
- 无序列表

有序列表：

1. 有序列表
2. 有序列表
  1. 二级有序列表
  2. 二级有序列表
3. 有序列表

水平分割线：

---

超链接：[Mobi.css](http://getmobicss.com/zh-cn/) 是一个轻量灵活的移动端 CSS 框架。

图片：

![Xcat](http://blog.xcatliu.com/assets/about/xcatliu_512.png)

表格：

| 第一列 | 第二列 | 第三列 |
| -------- | -------- | -------- |
| 1.1     | 1.2     | 1.3     |
| 2.1     | 2.2     | 2.3     |

HTML 代码：

<p style="color:red;">红色的字</p>

[SimpleMDE]: https://simplemde.com/
`;

var simplemde = new SimpleMDE({
  autofocus: true,
  autosave: {
    enabled: true,
    uniqueId: 'mazimd'
  },
  element: document.getElementById('mazimd-textarea'),
  indentWithTabs: false,
  initialValue: initialValue,
  insertTexts: {
    image: ['![](http://', ')']
  },
  placeholder: 'Hello World',
  renderingConfig: {
    codeSyntaxHighlighting: false
  },
  shortcuts: {
    togglePreview: null,
    toggleSideBySide: null,
    toggleFullScreen: null
  },
  spellChecker: false,
  status: false,
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
      name: "preview",
      action: (editor) => {
        editor.togglePreview();

        var mazimdContainer = document.getElementById('mazimd-container');

        setTimeout(() => {
          if (editor.isPreviewActive()) {
            mazimdContainer.classList.add('mazimd-preview');
          } else {
            mazimdContainer.classList.remove('mazimd-preview');
          }
        }, 0);
      },
      className: "fa fa-eye no-disable",
      title: "Toggle Preview"
    },
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