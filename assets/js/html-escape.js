// HTML Escape / Unescape
(function(){
  var input  = document.getElementById('input');
  var output = document.getElementById('output');
  var radios = document.querySelectorAll('input[name="hmode"]');
  var escMap = {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#x60;','=':'&#x3D;'};
  var decMap = {'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'",'&#x2F;':'/','&#x60;':'`','&#x3D;':'='};
  function currentMode(){
    for (var i=0;i<radios.length;i++) if (radios[i].checked) return radios[i].value;
    return 'escape';
  }
  function process(){
    var v = input.value;
    output.value = (currentMode() === 'escape')
      ? v.replace(/[&<>"'`=\/]/g, function(c){ return escMap[c]; })
      : v.replace(/&(amp|lt|gt|quot|#39|#x2F|#x60|#x3D);/g, function(m){ return decMap[m]; });
  }
  input.addEventListener('input', process);
  for (var i=0;i<radios.length;i++) radios[i].addEventListener('change', process);
  process();
})();