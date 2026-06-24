// CSS formatter
(function(){
  function fmt(css, ind) {
    css = css.replace(/\/\*[\s\S]*?\*\//g, '');
    var pad = function(n){ var r=''; for (var i=0;i<n*ind;i++) r+=' '; return r; };
    var out = '';
    var depth = 0;
    for (var i=0;i<css.length;i++) {
      var c = css[i];
      if (c === '{') {
        out += ' {\n' + pad(depth+1);
        depth++;
      } else if (c === '}') {
        depth--;
        out = out.replace(/[ \t]+$/, '');
        out += '\n' + pad(depth) + '}\n\n';
        if (depth === 0) out += pad(0);
      } else if (c === ';') {
        out += ';\n' + pad(depth);
      } else if (c === ',') {
        out += ',\n' + pad(depth);
      } else {
        out += c;
      }
    }
    return out.replace(/\n\s*\n/g, '\n\n').trim();
  }
  function min(css) {
    return css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{};,:])\s*/g, '$1').trim();
  }
  var input = document.getElementById('input');
  var output = document.getElementById('output');
  var indent = document.getElementById('indent');
  var mode = document.getElementById('mode');
  function process(){
    if (mode.value === 'minify') output.value = min(input.value);
    else output.value = fmt(input.value, parseInt(indent.value, 10) || 2);
  }
  [input, indent, mode].forEach(function(el){ el.addEventListener('input', process); el.addEventListener('change', process); });
  process();
})();