// UUID Generator - 依赖 Web Crypto API
(function(){
  var out = document.getElementById('out');
  var count = document.getElementById('count');
  var version = document.getElementById('version');
  var uppercase = document.getElementById('uppercase');
  var hyphens = document.getElementById('hyphens');
  var brace = document.getElementById('brace');
  var generate = document.getElementById('generate');
  var format = document.getElementById('format');

  function uuidv4() {
    if (window.crypto && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Fallback v4
    var bytes = new Uint8Array(16);
    if (window.crypto && crypto.getRandomValues) crypto.getRandomValues(bytes);
    else for (var i=0;i<16;i++) bytes[i] = Math.floor(Math.random()*256);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    var h = '';
    for (var i=0;i<16;i++) h += bytes[i].toString(16).padStart(2,'0');
    return h;
  }
  function uuidv1() {
    var bytes = new Uint8Array(16);
    if (window.crypto) crypto.getRandomValues(bytes);
    else for (var i=0;i<6;i++) bytes[i] = Math.floor(Math.random()*256);
    var ts = Date.now();
    var tl = ((ts & 0xffff) * 10000) + (bytes[6] * 0x100) + (bytes[7] & 0xff);
    var tm = Math.floor(ts / 0x10000);
    bytes[0] = (tl >>> 8) & 0xff;
    bytes[1] = tl & 0xff;
    bytes[2] = (tm >>> 8) & 0xff;
    bytes[3] = tm & 0xff;
    bytes[4] = (tm >>> 24) & 0xff;
    bytes[5] = (tm >>> 16) & 0xff;
    bytes[6] = (bytes[6] & 0x0f) | 0x10;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    var h = '';
    for (var i=0;i<16;i++) h += bytes[i].toString(16).padStart(2,'0');
    return h.substring(0,8)+'-'+h.substring(8,12)+'-'+h.substring(12,16)+'-'+h.substring(16,20)+'-'+h.substring(20,32);
  }
  function uuidv7() {
    var bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    var ts = Date.now();
    bytes[0] = (ts / 0x10000000000) & 0xff;
    bytes[1] = (ts / 0x100000000) & 0xff;
    bytes[2] = (ts / 0x1000000) & 0xff;
    bytes[3] = (ts / 0x10000) & 0xff;
    bytes[4] = (ts / 0x100) & 0xff;
    bytes[5] = ts & 0xff;
    bytes[6] = (bytes[6] & 0x0f) | 0x70;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    var h = '';
    for (var i=0;i<16;i++) h += bytes[i].toString(16).padStart(2,'0');
    return h.substring(0,8)+'-'+h.substring(8,12)+'-'+h.substring(12,16)+'-'+h.substring(16,20)+'-'+h.substring(20,32);
  }
  function uuidv5(name) {
    // Simplified v5 (SHA-1 based name hash, but we use random for demo)
    if (!name) return uuidv4();
    var bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    var ns = 0;
    for (var i=0;i<name.length;i++) ns = ((ns<<5)-ns) + name.charCodeAt(i);
    bytes[0] = (ns >>> 24) & 0xff;
    bytes[1] = (ns >>> 16) & 0xff;
    bytes[2] = (ns >>> 8) & 0xff;
    bytes[3] = ns & 0xff;
    bytes[6] = (bytes[6] & 0x0f) | 0x50;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    var h = '';
    for (var i=0;i<16;i++) h += bytes[i].toString(16).padStart(2,'0');
    return h.substring(0,8)+'-'+h.substring(8,12)+'-'+h.substring(12,16)+'-'+h.substring(16,20)+'-'+h.substring(20,32);
  }
  function formatUuid(u) {
    var s = u;
    if (!hyphens.checked) s = s.replace(/-/g, '');
    if (uppercase.checked) s = s.toUpperCase();
    if (brace.checked) s = '{' + s + '}';
    return s;
  }
  function gen() {
    var n = parseInt(count.value, 10) || 1;
    var v = version.value;
    var name = document.getElementById('name').value;
    var list = [];
    for (var i=0; i<n; i++) {
      var u;
      if (v === 'v1') u = uuidv1();
      else if (v === 'v5') u = uuidv5(name || 'anan.zh.kg');
      else if (v === 'v7') u = uuidv7();
      else u = uuidv4();
      list.push(formatUuid(u));
    }
    var f = format.value;
    var text;
    if (f === 'json') {
      text = JSON.stringify(list.map(function(x){return {uuid:x};}), null, 2);
    } else if (f === 'csv') {
      text = 'uuid\n' + list.join('\n');
    } else if (f === 'sql') {
      text = "INSERT INTO t (uuid) VALUES\n  ('" + list.join("'),\n  ('") + "');";
    } else {
      text = list.join('\n');
    }
    out.value = text;
    out.dataset.raw = list.join('\n');
  }
  generate.addEventListener('click', gen);
  count.addEventListener('input', gen);
  version.addEventListener('change', gen);
  format.addEventListener('change', gen);
  [uppercase, hyphens, brace].forEach(function(el){ el.addEventListener('change', gen); });
  gen();
})();