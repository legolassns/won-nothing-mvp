// FAQ accordion
document.querySelectorAll('.faq-q').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var isOpen = btn.getAttribute('aria-expanded') === 'true';
    var answer = btn.nextElementSibling;

    btn.setAttribute('aria-expanded', !isOpen);
    answer.hidden = isOpen;
  });
});
