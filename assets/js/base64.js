// Base64 Encode / Decode
(function(){
  var input = document.getElementById('input');
  var output = document.getElementById('output');
  var enc = document.getElementById('encode');
  var dec = document.getElementById('decode');
  var urlSafe = document.getElementById('urlsafe');
  var swap = document.getElementById('swap');

  function utf8ToBytes(str) {
    return new TextEncoder().encode(str);
  }
  function bytesToUtf8(bytes) {
    return new TextDecoder().decode(bytes);
  }
  function doEncode() {
    try {
      var bytes = utf8ToBytes(input.value);
      var bin = '';
      for (var i=0;i<bytes.length;i++) bin += String.fromCharCode(bytes[i]);
      var s = btoa(bin);
      if (urlSafe.checked) s = s.replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
      output.value = s;
      output.classList.remove('err');
    } catch(e) { output.value = 'Error: ' + e.message; output.classList.add('err'); }
  }
  function doDecode() {
    try {
      var s = input.value.trim();
      if (urlSafe.checked) s = s.replace(/-/g,'+').replace(/_/g,'/');
      while (s.length % 4) s += '=';
      var bin = atob(s);
      var bytes = new Uint8Array(bin.length);
      for (var i=0;i<bin.length;i++) bytes[i] = bin.charCodeAt(i);
      output.value = bytesToUtf8(bytes);
      output.classList.remove('err');
    } catch(e) { output.value = 'Error: ' + e.message; output.classList.add('err'); }
  }
  enc.addEventListener('click', doEncode);
  dec.addEventListener('click', doDecode);
  swap.addEventListener('click', function(){ var t = input.value; input.value = output.value; output.value = t; });
  input.addEventListener('input', function(){ enc.checked ? doEncode() : doDecode(); });
  urlSafe.addEventListener('change', function(){ enc.checked ? doEncode() : doDecode(); });
  enc.checked = true; doEncode();
})();