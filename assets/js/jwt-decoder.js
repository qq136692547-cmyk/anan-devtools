(function(){
  var input = document.getElementById('input');
  var header = document.getElementById('header');
  var payload = document.getElementById('payload');
  var sig = document.getElementById('sig');
  var exp = document.getElementById('exp');
  function b64UrlDecode(s) {
    s = s.replace(/-/g,'+').replace(/_/g,'/');
    while (s.length % 4) s += '=';
    try {
      var bin = atob(s);
      var bytes = new Uint8Array(bin.length);
      for (var i=0;i<bin.length;i++) bytes[i] = bin.charCodeAt(i);
      return new TextDecoder().decode(bytes);
    } catch(e) { return '(decode error)'; }
  }
  function process(){
    var v = input.value.trim();
    var parts = v.split('.');
    if (parts.length !== 3) {
      header.textContent = '(not a valid JWT - expected 3 parts)';
      payload.textContent = '';
      sig.textContent = '';
      exp.textContent = '';
      return;
    }
    try {
      header.textContent = JSON.stringify(JSON.parse(b64UrlDecode(parts[0])), null, 2);
      var pj = JSON.parse(b64UrlDecode(parts[1]));
      payload.textContent = JSON.stringify(pj, null, 2);
      sig.textContent = parts[2] + ' (signature not verified)';
      if (pj.exp) {
        var d = new Date(pj.exp * 1000);
        var now = new Date();
        exp.textContent = d > now ? '✓ Expires: ' + d.toISOString() + ' (in ' + Math.round((d - now)/86400000) + ' days)' : '✗ Expired: ' + d.toISOString();
      } else if (pj.iat) {
        exp.textContent = 'Issued: ' + new Date(pj.iat * 1000).toISOString();
      } else exp.textContent = '(no exp / iat claim)';
    } catch(e) {
      header.textContent = 'Error: ' + e.message;
      payload.textContent = '';
    }
  }
  input.addEventListener('input', process);
  process();
})();