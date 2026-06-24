// Simple line-by-line diff
(function(){
  function diff(a, b) {
    var aL = a.split('\n');
    var bL = b.split('\n');
    var m = aL.length, n = bL.length;
    var dp = [];
    for (var i=0;i<=m;i++) { dp.push(new Array(n+1).fill(0)); }
    for (var i=1;i<=m;i++) for (var j=1;j<=n;j++) {
      if (aL[i-1] === bL[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    }
    var ops = [];
    var i=m, j=n;
    while (i>0 && j>0) {
      if (aL[i-1] === bL[j-1]) { ops.unshift({op:' ', a:aL[i-1]}); i--; j--; }
      else if (dp[i-1][j] >= dp[i][j-1]) { ops.unshift({op:'-', a:aL[i-1]}); i--; }
      else { ops.unshift({op:'+', b:bL[j-1]}); j--; }
    }
    while (i>0) { ops.unshift({op:'-', a:aL[i-1]}); i--; }
    while (j>0) { ops.unshift({op:'+', b:bL[j-1]}); j--; }
    return ops;
  }
  var a = document.getElementById('a');
  var b = document.getElementById('b');
  var out = document.getElementById('out');
  function esc(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function process(){
    var ops = diff(a.value, b.value);
    out.innerHTML = ops.map(function(o){
      if (o.op === ' ') return '<div class="d-same">' + esc(o.a) + '</div>';
      if (o.op === '-') return '<div class="d-del">- ' + esc(o.a) + '</div>';
      if (o.op === '+') return '<div class="d-add">+ ' + esc(o.b) + '</div>';
    }).join('');
  }
  [a, b].forEach(function(el){ el.addEventListener('input', process); });
  process();
})();