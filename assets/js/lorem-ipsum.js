(function(){
  var words = ['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','aliquip','ex','ea','commodo','consequat','duis','aute','irure','in','reprehenderit','voluptate','velit','esse','cillum','fugiat','nulla','pariatur','excepteur','sint','occaecat','cupidatat','non','proident','sunt','culpa','qui','officia','deserunt','mollit','anim','id','est','laborum'];
  var input = document.getElementById('count');
  var mode = document.getElementById('mode');
  var output = document.getElementById('output');
  function gen(){
    var n = parseInt(input.value, 10) || 5;
    var m = mode.value;
    var out = [];
    if (m === 'words') {
      for (var i=0;i<n;i++) out.push(words[Math.floor(Math.random()*words.length)]);
      output.value = out.join(' ');
    } else if (m === 'sentences') {
      for (var s=0;s<n;s++) {
        var len = 8 + Math.floor(Math.random()*10);
        var sent = [];
        for (var i=0;i<len;i++) sent.push(words[Math.floor(Math.random()*words.length)]);
        sent[0] = sent[0][0].toUpperCase() + sent[0].slice(1);
        out.push(sent.join(' ') + '.');
      }
      output.value = out.join(' ');
    } else if (m === 'paragraphs') {
      for (var p=0;p<n;p++) {
        var sents = 4 + Math.floor(Math.random()*5);
        var para = [];
        for (var s=0;s<sents;s++) {
          var len = 8 + Math.floor(Math.random()*10);
          var sent = [];
          for (var i=0;i<len;i++) sent.push(words[Math.floor(Math.random()*words.length)]);
          sent[0] = sent[0][0].toUpperCase() + sent[0].slice(1);
          para.push(sent.join(' ') + '.');
        }
        out.push(para.join(' '));
      }
      output.value = out.join('\n\n');
    }
  }
  [input, mode].forEach(function(el){ el.addEventListener('input', gen); el.addEventListener('change', gen); });
  gen();
})();