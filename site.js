// Format legend: picking a format shows it in the app (arrow keys move between formats).
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.legend [role="tab"]'));
  if (!tabs.length) return;
  function select(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
    if (window.matchMedia('(max-width: 920px)').matches) {
      tab.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    }
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { select(tab, false); });
    tab.addEventListener('keydown', function (e) {
      var step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (!step) return;
      e.preventDefault();
      select(tabs[(i + step + tabs.length) % tabs.length], true);
    });
  });
  var start = tabs.filter(function (t) { return '#' + t.id === location.hash; })[0] || tabs[0];
  select(start, false);
})();
