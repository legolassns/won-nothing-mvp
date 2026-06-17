// FAQ accordion
document.querySelectorAll('.faq-q').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var isOpen = btn.getAttribute('aria-expanded') === 'true';
    var answer = btn.nextElementSibling;

    btn.setAttribute('aria-expanded', !isOpen);
    answer.hidden = isOpen;
  });
});

// Live counter — reads from counter.json, falls back to HTML defaults on failure
function loadCounter() {
  fetch('./counter.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var losers = data.official_losers != null ? data.official_losers : 1;
      var loserNum = '#' + String(losers).padStart(4, '0');

      document.querySelectorAll('[data-counter="official_losers"]').forEach(function (el) {
        el.textContent = losers;
      });
      document.querySelectorAll('[data-counter="prizes_distributed"]').forEach(function (el) {
        el.textContent = data.prizes_distributed != null ? data.prizes_distributed : 0;
      });
      document.querySelectorAll('[data-counter="complaints"]').forEach(function (el) {
        el.textContent = data.complaints != null ? data.complaints : 0;
      });
      document.querySelectorAll('[data-counter="promises_broken"]').forEach(function (el) {
        el.textContent = data.promises_broken != null ? data.promises_broken : 0;
      });
      document.querySelectorAll('[data-loser-number]').forEach(function (el) {
        el.textContent = loserNum;
      });
    })
    .catch(function () {
      // Fetch failed — HTML fallback values (#0001, 1, 0, 0) remain in place
    });
}
loadCounter();
