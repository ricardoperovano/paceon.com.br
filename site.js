// Três comportamentos: o menu no celular, o seletor de idioma e o aviso de cookies.
// O resto é HTML e CSS. O redirecionamento automático de idioma fica inline no <head>,
// antes do CSS, para acontecer antes de a página aparecer.
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

// Seletor de idioma: guarda a escolha no aparelho antes de seguir o link, para que a
// detecção automática respeite a decisão daqui em diante.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-lang-switch]').forEach(function (link) {
    link.addEventListener('click', function () {
      try { localStorage.setItem('paceon.lang', link.getAttribute('data-lang-switch')) } catch (e) {}
    })
  })
})

// Aviso de cookies (LGPD): só aparece enquanto não houver escolha guardada. Os textos
// vêm da página (window.__consent.strings), no idioma dela.
document.addEventListener('DOMContentLoaded', function () {
  var consent = window.__consent
  if (!consent || consent.choice) return
  var s = consent.strings
  var box = document.createElement('div')
  box.className = 'consent'
  box.setAttribute('role', 'dialog')
  box.setAttribute('aria-label', s.aria)
  var text = document.createElement('p')
  text.appendChild(document.createTextNode(s.text + ' '))
  var link = document.createElement('a')
  link.href = s.link
  link.textContent = s.linkLabel
  text.appendChild(link)
  box.appendChild(text)
  var actions = document.createElement('div')
  actions.className = 'consent__actions'
  actions.innerHTML =
    '<button type="button" class="btn btn--primary" data-consent="accept"></button>' +
    '<button type="button" class="btn btn--secondary" data-consent="decline"></button>'
  actions.children[0].textContent = s.accept
  actions.children[1].textContent = s.decline
  box.appendChild(actions)
  box.addEventListener('click', function (event) {
    var choice = event.target.getAttribute('data-consent')
    if (!choice) return
    if (choice === 'accept') consent.accept(); else consent.decline()
    box.remove()
  })
  document.body.appendChild(box)
})
