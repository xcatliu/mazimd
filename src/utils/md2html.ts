import * as xss from 'xss';

export default (Prism) => {
  const md = require('markdown-it')({
    html: true,
    highlight: (str, lang) => {
      const prismLang = Prism.languages[lang] || Prism.languages.autoit;
      const classNameLang = lang || 'autoit';
      return `<pre class="language-${classNameLang}"><code class="language-${classNameLang}">${Prism.highlight(str, prismLang)}</code></pre>`;
    },
  })
  .use(require('markdown-it-anchor'))
  .use(require('markdown-it-title'));

  return (markdown) => {
    /**
     * Use markdown-it-title to get the title of the page
     * https://github.com/valeriangalliat/markdown-it-title
     */
    const env = {
      title: '',
    };
    const htmlContent = xss(md.render(markdown, env));

    return {
      title: env.title,
      html: htmlContent
    };
  };
};
