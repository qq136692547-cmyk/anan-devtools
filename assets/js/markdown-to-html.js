// Lightweight Markdown to HTML
(function(){
  function escapeHtml(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function md(src) {
    var lines = src.split(/\r?\n/);
    var html = [];
    var inCode = false, inList = false, codeLang = '';
    function flushList(){ if (inList) { html.push('</ul>'); inList = false; } }
    for (var i=0;i<lines.length;i++) {
      var line = lines[i];
      if (/^```/.test(line)) {
        if (inCode) { html.push('</code></pre>'); inCode = false; }
        else { codeLang = line.replace(/^```/, '').trim(); html.push('<pre><code' + (codeLang ? ' class="lang-'+codeLang+'"' : '') + '>'); inCode = true; }
        continue;
      }
      if (inCode) { html.push(escapeHtml(line)); continue; }
      if (/^#{1,6}\s/.test(line)) {
        flushList();
        var m = line.match(/^(#{1,6})\s+(.*)$/);
        html.push('<' + 'h' + m[1].length + '>' + inline(m[2]) + '</' + 'h' + m[1].length + '>');
        continue;
      }
      if (/^[-*+]\s/.test(line)) {
        if (!inList) { html.push('<ul>'); inList = true; }
        html.push('<li>' + inline(line.replace(/^[-*+]\s/, '')) + '</li>');
        continue;
      } else flushList();
      if (/^>\s/.test(line)) { html.push('<blockquote>' + inline(line.replace(/^>\s/, '')) + '</blockquote>'); continue; }
      if (/^---+$/.test(line.trim())) { html.push('<hr>'); continue; }
      if (line.trim() === '') { html.push(''); continue; }
      html.push('<p>' + inline(line) + '</p>');
    }
    flushList(); if (inCode) html.push('</code></pre>');
    return html.join('\n');
  }
  function inline(s) {
    var orig = s;
    s = s.replace(/`([^`]+)`/g, function(_,c){ return '<code>'+escapeHtml(c)+'</code>'; });
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    return s;
  }
  var input = document.getElementById('input');
  var output = document.getElementById('output');
  var preview = document.getElementById('preview');
  function process(){
    var src = input.value;
    var html = md(src);
    output.value = html;
    if (preview) preview.innerHTML = html;
  }
  input.addEventListener('input', process);
  process();
})();