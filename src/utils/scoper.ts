function scoper(css, prefix) {
  var re = new RegExp("([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)", "g");
  css = css.replace(re, function(g0, g1, g2) {

    if (g1.match(/^\s*(@media|@keyframes|to|from|@font-face)/)) {
      return g1 + g2;
    }

    if (g1.match(/:scope/)) {
      g1 = g1.replace(/([^\s]*):scope/, function(h0, h1) {
        if (h1 === "") {
          return "> *";
        } else {
          return "> " + h1;
        }
      });
    }

    g1 = g1.replace(/^(\s*)/, "$1" + prefix + " ");

    return g1 + g2;
  });
  
  return css;
}

export { scoper };
