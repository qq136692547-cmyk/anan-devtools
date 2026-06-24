// Cron expression parser
(function(){
  function parseCron(expr) {
    var parts = expr.trim().split(/\s+/);
    if (parts.length !== 5) return { error: 'Need 5 fields: minute hour day month weekday' };
    var f = { minute: parts[0], hour: parts[1], day: parts[2], month: parts[3], weekday: parts[4] };
    return { fields: f };
  }
  function nextRuns(expr, count) {
    var p = parseCron(expr);
    if (p.error) return [];
    var f = p.fields;
    var matches = function(s, val, min, max) {
      if (s === '*') return true;
      if (s.indexOf('/') >= 0) {
        var stepParts = s.split('/');
        var step = parseInt(stepParts[1], 10);
        var base = stepParts[0] === '*' ? min : parseInt(stepParts[0], 10);
        return val >= base && (val - base) % step === 0;
      }
      if (s.indexOf('-') >= 0) {
        var rng = s.split('-');
        return val >= parseInt(rng[0],10) && val <= parseInt(rng[1],10);
      }
      if (s.indexOf(',') >= 0) return s.split(',').some(function(x){ return parseInt(x,10) === val; });
      return parseInt(s, 10) === val;
    };
    var result = [];
    var d = new Date();
    d.setSeconds(0, 0);
    d.setMinutes(d.getMinutes() + 1);
    var limit = 366 * 24 * 60;
    while (result.length < count && limit-- > 0) {
      if (matches(f.minute, d.getMinutes(), 0, 59) &&
          matches(f.hour, d.getHours(), 0, 23) &&
          matches(f.day, d.getDate(), 1, 31) &&
          matches(f.month, d.getMonth() + 1, 1, 12) &&
          (f.weekday === '*' || matches(f.weekday, d.getDay(), 0, 6))) {
        result.push(new Date(d.getTime()));
      }
      d.setMinutes(d.getMinutes() + 1);
    }
    return result;
  }
  function explain(expr) {
    var p = parseCron(expr);
    if (p.error) return p.error;
    var f = p.fields;
    function exp(s, name, min, max) {
      if (s === '*') return 'every ' + name;
      if (s.indexOf('/') >= 0) return 'every ' + s.split('/')[1] + ' ' + name + ' starting at ' + s.split('/')[0];
      if (s.indexOf('-') >= 0) return name + ' from ' + s;
      if (s.indexOf(',') >= 0) return name + ' in ' + s;
      return 'at ' + name + ' ' + s;
    }
    return [
      exp(f.minute, 'minute', 0, 59),
      exp(f.hour, 'hour', 0, 23),
      exp(f.day, 'day', 1, 31),
      exp(f.month, 'month', 1, 12),
      exp(f.weekday, 'weekday', 0, 6)
    ].join(', ');
  }
  var input = document.getElementById('input');
  var explainEl = document.getElementById('explain');
  var nextList = document.getElementById('next');
  function process(){
    var expr = input.value;
    explainEl.textContent = explain(expr);
    var runs = nextRuns(expr, 5);
    nextList.innerHTML = runs.map(function(d){ return '<li>' + d.toString() + '</li>'; }).join('');
  }
  input.addEventListener('input', process);
  process();
})();