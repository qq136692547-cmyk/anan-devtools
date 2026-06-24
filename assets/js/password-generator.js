(function(){
  var length = document.getElementById('length');
  var upper = document.getElementById('upper');
  var lower = document.getElementById('lower');
  var digits = document.getElementById('digits');
  var symbols = document.getElementById('symbols');
  var count = document.getElementById('count');
  var output = document.getElementById('output');
  var strength = document.getElementById('strength');
  function gen() {
    var len = parseInt(length.value, 10) || 16;
    var n = parseInt(count.value, 10) || 1;
    var charset = '';
    if (upper.checked) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lower.checked) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (digits.checked) charset += '0123456789';
    if (symbols.checked) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (!charset) { output.value = '(select at least one character set)'; return; }
    var arr = new Uint8Array(len * n);
    crypto.getRandomValues(arr);
    var list = [];
    for (var k=0;k<n;k++) {
      var s = '';
      for (var i=0;i<len;i++) s += charset[arr[k*len+i] % charset.length];
      list.push(s);
    }
    output.value = list.join('\n');
    var entropy = Math.log2(charset.length) * len;
    var s = '';
    if (entropy < 40) s = 'Weak'; else if (entropy < 60) s = 'Fair'; else if (entropy < 80) s = 'Strong'; else s = 'Very strong';
    strength.textContent = 'Entropy: ' + entropy.toFixed(0) + ' bits · ' + s;
  }
  [length, upper, lower, digits, symbols, count].forEach(function(el){ el.addEventListener('input', gen); el.addEventListener('change', gen); });
  gen();
})();