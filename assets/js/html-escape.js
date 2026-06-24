(function(){
  var input = document.getElementById('input');
  var output = document.getElementById('output');
  var mode = document.getElementById('mode');
  var escMap = {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#x60;','=':'&#x3D;'};
  function process(){
    var v = input.value;
    if (mode.value === 'escape') {
      output.value = v.replace(/[&<>"'`=\/]/g, function(c){ return escMap[c]; });
    } else {
      var d = {'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'",'&#x2F;':'/','&#x60;':'`','&#x3D;':'='};
      output.value = v.replace(/&(amp|lt|gt|quot|#39|#x2F|#x60|#x3D);/g, function(m){ return d[m]; });
    }
  }
  [input, mode].forEach(function(el){ el.addEventListener('input', process); el.addEventListener('change', process); });
  process();
})();