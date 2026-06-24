// Unix timestamp converter
(function(){
  var now = document.getElementById('now');
  var nowVal = document.getElementById('now-val');
  var epoch = document.getElementById('epoch');
  var unit = document.getElementById('unit');
  var date = document.getElementById('date');
  var dateUtc = document.getElementById('date-utc');
  function refresh() {
    var ms = Date.now();
    nowVal.textContent = (ms/1000).toFixed(3) + ' s (' + ms + ' ms)';
    var v = parseFloat(epoch.value);
    if (isNaN(v)) { date.value = ''; dateUtc.value = ''; return; }
    var u = unit.value;
    var ms2 = (u === 's') ? v*1000 : (u === 'ms') ? v : (u === 'us') ? v/1000 : v/1e6;
    var d = new Date(ms2);
    date.value = d.toString();
    dateUtc.value = d.toISOString();
  }
  now.addEventListener('click', function(){ epoch.value = Math.floor(Date.now()/1000); unit.value = 's'; refresh(); });
  [epoch, unit].forEach(function(el){ el.addEventListener('input', refresh); });
  epoch.value = Math.floor(Date.now()/1000);
  refresh();
  setInterval(function(){ if (document.hasFocus()) refresh(); }, 1000);
})();