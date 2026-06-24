(function(){
  var input = document.getElementById('input');
  var output = document.getElementById('output');
  var mode = document.getElementById('mode');
  function process(){
    try {
      var v = input.value;
      if (mode.value === 'encode-component') output.value = encodeURIComponent(v);
      else if (mode.value === 'decode-component') output.value = decodeURIComponent(v);
      else if (mode.value === 'encode-url') output.value = encodeURI(v);
      else if (mode.value === 'decode-url') output.value = decodeURI(v);
      output.classList.remove('err');
    } catch(e) { output.value = 'Error: ' + e.message; output.classList.add('err'); }
  }
  mode.addEventListener('change', process);
  input.addEventListener('input', process);
  process();
})();