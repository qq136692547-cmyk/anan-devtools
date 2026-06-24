(function(){
  var pattern = document.getElementById('pattern');
  var flags = document.getElementById('flags');
  var input = document.getElementById('input');
  var output = document.getElementById('output');
  var matches = document.getElementById('matches');
  function process(){
    try {
      var p = pattern.value;
      var f = flags.value;
      if (!p) { output.innerHTML = ''; matches.textContent = '0 matches'; return; }
      var re = new RegExp(p, f);
      var text = input.value;
      var count = 0;
      output.innerHTML = text.replace(/[&<>]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]; }).replace(re, function(m){
        count++;
        return '<mark>' + m + '</mark>';
      });
      matches.textContent = count + ' match' + (count === 1 ? '' : 'es');
    } catch(e) {
      output.innerHTML = '<span class="err">Invalid regex: ' + e.message + '</span>';
      matches.textContent = '';
    }
  }
  [pattern, flags, input].forEach(function(el){ el.addEventListener('input', process); });
  process();
})();