(function(){
  if (!Intl || !Intl.supportedValuesOf) {
    document.getElementById('result').textContent = 'Browser does not support timezone list.';
    return;
  }
  var zones = Intl.supportedValuesOf('timeZone');
  var fromSel = document.getElementById('from');
  var toSel = document.getElementById('to');
  zones.forEach(function(z){
    var o1 = document.createElement('option'); o1.value = z; o1.textContent = z; fromSel.appendChild(o1);
    var o2 = o1.cloneNode(true); toSel.appendChild(o2);
  });
  fromSel.value = 'Asia/Shanghai';
  toSel.value = 'America/New_York';
  var time = document.getElementById('time');
  var result = document.getElementById('result');
  function process(){
    try {
      var t = time.value || new Date().toISOString().slice(0, 16);
      var date = new Date(t);
      var opts = { timeZone: toSel.value, year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit',timeZoneName:'short' };
      var opts2 = { timeZone: fromSel.value, year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit',timeZoneName:'short' };
      result.innerHTML = '<div class="tz-row"><div class="tz-label">' + fromSel.value + '</div><div class="tz-time">' + new Intl.DateTimeFormat('en-US', opts2).format(date) + '</div></div>' +
        '<div class="tz-arrow">↓</div>' +
        '<div class="tz-row"><div class="tz-label">' + toSel.value + '</div><div class="tz-time">' + new Intl.DateTimeFormat('en-US', opts).format(date) + '</div></div>';
    } catch(e) { result.textContent = 'Error: ' + e.message; }
  }
  [fromSel, toSel, time].forEach(function(el){ el.addEventListener('change', process); el.addEventListener('input', process); });
  time.value = new Date().toISOString().slice(0, 16);
  process();
})();