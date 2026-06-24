(function(){
  var input = document.getElementById('input');
  var outputs = {
    camel: document.getElementById('out-camel'),
    pascal: document.getElementById('out-pascal'),
    snake: document.getElementById('out-snake'),
    kebab: document.getElementById('out-kebab'),
    constant: document.getElementById('out-constant'),
    dot: document.getElementById('out-dot')
  };
  function splitWords(s) {
    return s.split(/[\s_\-.]+|(?=[A-Z])/).filter(Boolean);
  }
  function process(){
    var words = splitWords(input.value.toLowerCase());
    outputs.camel.value = words.map(function(w,i){ return i===0 ? w : w[0].toUpperCase() + w.slice(1); }).join('');
    outputs.pascal.value = words.map(function(w){ return w[0].toUpperCase() + w.slice(1); }).join('');
    outputs.snake.value = words.join('_');
    outputs.kebab.value = words.join('-');
    outputs.constant.value = words.join('_').toUpperCase();
    outputs.dot.value = words.join('.');
  }
  input.addEventListener('input', process);
  process();
})();