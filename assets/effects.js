/* ======================================
   Effects.js — IntersectionObserver
   Reveal, Stagger, kleine Header-Polish
   ====================================== */
(function () {
  // Guard
  if (!('IntersectionObserver' in window)) {
    // Fallback: alles sichtbar
    document.querySelectorAll('.fx-reveal, .fx-up, .fx-fade, .fx-scale, .fx-stagger > *')
      .forEach(el => el.classList.add('is-in'));
    return;
  }

  // Observer: setzt .is-in bei Sichtbarkeit
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        // Stagger-Container: Klasse auf Container setzen,
        // CSS erledigt Staffelung der Kinder
        if (el.classList.contains('fx-stagger')) {
          el.classList.add('is-in');
        } else {
          el.classList.add('is-in');
        }

        io.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  // Alle Effekte anmelden
  document.querySelectorAll('.fx-reveal, .fx-up, .fx-fade, .fx-scale, .fx-stagger')
    .forEach(el => io.observe(el));

  // Kleiner Header-Polish: Schatten beim Scrollen
  const header = document.querySelector('.site-header');
  if (header) {
    const toggleShadow = () => {
      if (window.scrollY > 6) {
        header.style.boxShadow = '0 6px 14px rgba(0,0,0,.06)';
      } else {
        header.style.boxShadow = 'none';
      }
    };
    toggleShadow();
    window.addEventListener('scroll', toggleShadow, { passive: true });
  }
})();
