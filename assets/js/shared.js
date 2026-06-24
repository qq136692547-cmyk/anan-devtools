// 共享 JS: 主题切换、Last updated、键盘快捷键
(function(){
  // Last updated
  var lu = document.querySelectorAll('[data-lu]');
  lu.forEach(function(el){
    var d = el.getAttribute('data-lu');
    if (d) el.textContent = 'Last updated: ' + d;
  });

  // 通用 copy 按钮
  document.addEventListener('click', function(e){
    var btn = e.target.closest('[data-copy]');
    if (!btn) return;
    var sel = btn.getAttribute('data-copy');
    var el = document.querySelector(sel);
    if (!el) return;
    var txt = el.value !== undefined ? el.value : el.textContent;
    navigator.clipboard.writeText(txt).then(function(){
      var orig = btn.textContent;
      btn.textContent = '✓ Copied';
      btn.classList.add('copied');
      setTimeout(function(){ btn.textContent = orig; btn.classList.remove('copied'); }, 1200);
    });
  });

  // 通用 clear 按钮
  document.addEventListener('click', function(e){
    var btn = e.target.closest('[data-clear]');
    if (!btn) return;
    var sel = btn.getAttribute('data-clear');
    var el = document.querySelector(sel);
    if (el) el.value = '';
    el.dispatchEvent(new Event('input', {bubbles:true}));
  });
})();