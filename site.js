// Um único comportamento: o menu no celular. O resto é HTML e CSS.
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('[data-menu-toggle]')
  var nav = document.querySelector('[data-mobile-nav]')
  if (!toggle || !nav) return
  toggle.addEventListener('click', function () {
    var open = nav.hasAttribute('data-open')
    if (open) nav.removeAttribute('data-open'); else nav.setAttribute('data-open', '')
    toggle.setAttribute('aria-expanded', String(!open))
  })
})
