(function(){
  var input = document.getElementById('input');
  var output = document.getElementById('output');
  var indent = document.getElementById('indent');
  var mode = document.getElementById('mode');
  function process(){
    try {
      var v = input.value;
      if (mode.value === 'format' || mode.value === 'minify' || mode.value === 'validate') {
        var obj = JSON.parse(v);
        if (mode.value === 'minify') output.value = JSON.stringify(obj);
        else if (mode.value === 'validate') {
          output.value = '✓ Valid JSON\n\nKeys: ' + countKeys(obj) + '\nDepth: ' + depth(obj);
        } else {
          output.value = JSON.stringify(obj, null, parseInt(indent.value, 10) || 2);
        }
        output.classList.remove('err');
      }
    } catch(e) {
      if (mode.value === 'format' || mode.value === 'minify') {
        output.value = '✗ Parse error: ' + e.message;
        output.classList.add('err');
      } else {
        output.value = '✗ Invalid JSON: ' + e.message;
        output.classList.add('err');
      }
    }
  }
  function countKeys(o) { if (typeof o !== 'object' || o === null) return 0; var c=0; for (var k in o) { c++; if (typeof o[k]==='object') c += countKeys(o[k]) - 1; } return c; }
  function depth(o) { if (typeof o !== 'object' || o === null) return 0; var d=0; for (var k in o) d = Math.max(d, depth(o[k])); return d + 1; }
  [input, indent, mode].forEach(function(el){ el.addEventListener('input', process); el.addEventListener('change', process); });
  process();
})();