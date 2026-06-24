// Simple SQL formatter
(function(){
  var keywords = ['SELECT','FROM','WHERE','AND','OR','NOT','IN','BETWEEN','LIKE','IS','NULL','JOIN','LEFT','RIGHT','INNER','OUTER','FULL','CROSS','ON','USING','GROUP','BY','ORDER','HAVING','LIMIT','OFFSET','UNION','ALL','AS','DISTINCT','INSERT','INTO','VALUES','UPDATE','SET','DELETE','CREATE','TABLE','INDEX','VIEW','DROP','ALTER','ADD','COLUMN','PRIMARY','KEY','FOREIGN','REFERENCES','BEGIN','COMMIT','ROLLBACK','TRANSACTION','CASE','WHEN','THEN','ELSE','END','WITH','OVER','PARTITION','BY','ROW_NUMBER','RANK','DENSE_RANK','NTILE','LAG','LEAD','FIRST_VALUE','LAST_VALUE','COUNT','SUM','AVG','MIN','MAX'];
  function fmt(sql, indentSize) {
    var s = sql.replace(/--[^\n]*/g, '').replace(/\s+/g, ' ').trim();
    s = s.replace(/\s*([,;()])\s*/g, '$1').replace(/\(/g, ' ( ').replace(/\)/g, ' ) ');
    var tokens = s.split(/\s+/);
    var out = [];
    var ind = 0;
    var pad = function(n){ var r=''; for (var i=0;i<n*indentSize;i++) r+=' '; return r; };
    for (var i=0;i<tokens.length;i++) {
      var t = tokens[i].toUpperCase();
      var raw = tokens[i];
      if (t === 'SELECT' || t === 'FROM' || t === 'WHERE' || t === 'GROUP' || t === 'ORDER' || t === 'HAVING' || t === 'LIMIT' || t === 'UNION') {
        out.push('\n' + pad(0) + (t === 'GROUP' || t === 'ORDER' ? raw.toUpperCase() + ' ' + (tokens[++i] || '') : raw.toUpperCase()));
        if (t === 'WHERE' || t === 'HAVING') ind = 1; else ind = 1;
      } else if (t === 'AND' || t === 'OR') {
        out.push('\n' + pad(ind) + raw.toUpperCase());
      } else if (t === 'JOIN' || t === 'LEFT' || t === 'RIGHT' || t === 'INNER' || t === 'OUTER') {
        out.push('\n' + pad(0) + raw.toUpperCase());
      } else if (t === 'ON') {
        out.push('\n' + pad(ind) + raw.toUpperCase());
      } else if (raw === ',') {
        out[out.length-1] = out[out.length-1] + ',';
        out.push('\n' + pad(ind));
      } else if (raw === '(') {
        out.push(' (');
        ind++;
      } else if (raw === ')') {
        out.push(' )');
        ind--;
      } else {
        if (keywords.indexOf(t) >= 0) out.push(raw.toUpperCase());
        else out.push(raw);
      }
    }
    return out.join(' ').replace(/\s+\n/g, '\n').replace(/\n\s+\n/g, '\n').trim();
  }
  var input = document.getElementById('input');
  var output = document.getElementById('output');
  var indent = document.getElementById('indent');
  function process(){
    output.value = fmt(input.value, parseInt(indent.value, 10) || 2);
  }
  [input, indent].forEach(function(el){ el.addEventListener('input', process); el.addEventListener('change', process); });
  process();
})();