// SHA-1, SHA-256, SHA-512 via Web Crypto
(function(){
  var input = document.getElementById('input');
  var output = document.getElementById('output');
  var algo = document.getElementById('algo');
  var hmacKey = document.getElementById('hmac');
  function process(){
    var data = new TextEncoder().encode(input.value);
    var a = algo.value;
    var promise;
    if (hmacKey.value) {
      var keyData = new TextEncoder().encode(hmacKey.value);
      var algo2 = (a === 'SHA-1') ? {name:'HMAC',hash:'SHA-1'} : {name:'HMAC',hash:a};
      promise = crypto.subtle.importKey('raw', keyData, algo2, false, ['sign']).then(function(k){
        return crypto.subtle.sign(algo2, k, data);
      });
    } else {
      promise = crypto.subtle.digest(a, data);
    }
    promise.then(function(buf){
      var arr = new Uint8Array(buf);
      var hex = '';
      for (var i=0;i<arr.length;i++) hex += arr[i].toString(16).padStart(2,'0');
      output.value = hex;
    }).catch(function(e){ output.value = 'Error: ' + e.message; });
  }
  [input, algo, hmacKey].forEach(function(el){ el.addEventListener('input', process); el.addEventListener('change', process); });
  process();
})();