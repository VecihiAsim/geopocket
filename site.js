// Format legend: picking a format shows it in the app (arrow keys move between formats).
// On phones the plates sit in a swipe row: a chip scrolls to its plate, and swiping moves the selected chip.
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.legend [role="tab"]'));
  if (!tabs.length) return;
  var row = document.querySelector('.plates');
  var phone = window.matchMedia('(max-width: 700px)');
  function plateOf(tab) { return document.getElementById(tab.getAttribute('aria-controls')); }
  function mark(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      plateOf(t).hidden = !on;
    });
    if (phone.matches) tab.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }
  function select(tab, focus) {
    mark(tab);
    if (focus) tab.focus();
    if (phone.matches) row.scrollTo({ left: plateOf(tab).offsetLeft - row.offsetLeft - 20, behavior: 'smooth' });
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
  var timer;
  row.addEventListener('scroll', function () {
    if (!phone.matches) return;
    clearTimeout(timer);
    timer = setTimeout(function () {
      var step = plateOf(tabs[1]).offsetLeft - plateOf(tabs[0]).offsetLeft;
      var i = Math.round(row.scrollLeft / step);
      var tab = tabs[Math.max(0, Math.min(tabs.length - 1, i))];
      if (tab.getAttribute('aria-selected') !== 'true') mark(tab);
    }, 90);
  }, { passive: true });
  var start = tabs.filter(function (t) { return '#' + t.id === location.hash; })[0] || tabs[0];
  mark(start);
})();
