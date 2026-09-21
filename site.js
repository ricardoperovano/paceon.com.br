// Dois comportamentos: o menu no celular e o aviso de consentimento. O resto é HTML e CSS.
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

// Aviso de consentimento (LGPD): só aparece enquanto não houver escolha guardada.
document.addEventListener('DOMContentLoaded', function () {
  var consent = window.__consent
  if (!consent || consent.choice) return
  var box = document.createElement('div')
  box.className = 'consent'
  box.setAttribute('role', 'dialog')
  box.setAttribute('aria-label', 'Uso de cookies')
  box.innerHTML =
    '<p>Usamos o Google Analytics para entender como o site é usado. Nenhum dado de treino passa por aqui. ' +
    '<a href="/privacidade/">Política de privacidade</a></p>' +
    '<div class="consent__actions"><button type="button" class="btn btn--primary" data-consent="accept">Aceitar</button>' +
    '<button type="button" class="btn btn--secondary" data-consent="decline">Recusar</button></div>'
  box.addEventListener('click', function (event) {
    var choice = event.target.getAttribute('data-consent')
    if (!choice) return
    if (choice === 'accept') consent.accept(); else consent.decline()
    box.remove()
  })
  document.body.appendChild(box)
})
