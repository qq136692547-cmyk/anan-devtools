// XML formatter
(function(){
  function fmt(xml) {
    xml = xml.replace(/>\s+</g, '><').trim();
    var out = '';
    var depth = 0;
    var pad = function(n){ return '  '.repeat(n); };
    var i = 0;
    while (i < xml.length) {
      if (xml[i] === '<') {
        var end = xml.indexOf('>', i);
        var tag = xml.substring(i, end+1);
        if (tag.startsWith('</')) {
          depth--;
          out += pad(depth) + tag + '\n';
        } else if (tag.endsWith('/>') || tag.startsWith('<?') || tag.startsWith('<!')) {
          out += pad(depth) + tag + '\n';
        } else {
          var selfClose = false;
          var openTag = tag.replace(/\s+[^>]*$/, '');
          if (openTag === tag) { /* no attrs, could be <br> etc. */ }
          out += pad(depth) + tag;
          // self-closing? skip
          if (tag.endsWith('/>')) { out += '\n'; }
          else { out += '\n'; depth++; }
        }
        i = end + 1;
      } else {
        var textEnd = xml.indexOf('<', i);
        var text = xml.substring(i, textEnd);
        if (text.trim()) {
          out += pad(depth) + text.trim() + '\n';
        }
        i = textEnd;
      }
    }
    return out.replace(/\n{3,}/g, '\n\n').trim();
  }
  var input = document.getElementById('input');
  var output = document.getElementById('output');
  function process(){
    try { output.value = fmt(input.value); output.classList.remove('err'); }
    catch(e) { output.value = 'Error: ' + e.message; output.classList.add('err'); }
  }
  input.addEventListener('input', process);
  process();
})();