(function(){
  // Hamburger
  const btn = document.querySelector('.menu-toggle');
  const menu = document.getElementById('quick-menu');
  if(btn && menu){
    btn.addEventListener('click', ()=>{
      const open = menu.hasAttribute('hidden') ? false : true;
      if(open){ menu.setAttribute('hidden',''); btn.setAttribute('aria-expanded','false'); }
      else { menu.removeAttribute('hidden'); btn.setAttribute('aria-expanded','true'); }
    });
    document.addEventListener('click', (e)=>{
      if(!menu.contains(e.target) && !btn.contains(e.target)) menu.setAttribute('hidden','');
    });
  }

  // Reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('active'); io.unobserve(e.target); } });
  }, {threshold: 0.15});
  document.querySelectorAll('.reveal, .reveal-stagger .card, .reveal-stagger .testi-card').forEach(el=>io.observe(el));

  // Promo sheet logic
  const DEADLINE = new Date('2025-09-30T23:59:59+02:00').getTime();
  const declinedKey='promo_10er_declined', shownKey='promo_10er_shown_once';
  if(Date.now() <= DEADLINE && localStorage.getItem(declinedKey)!=='1'){
    const sheet=document.getElementById('promo-sheet');
    const back=document.getElementById('promo-backdrop');
    const btnDecl=document.getElementById('promo-decline');
    const btnCta=document.getElementById('promo-cta');
    if(sheet && back && btnDecl){
      let opened=false;
      function open(){ if(opened) return; opened=true; document.body.classList.add('promo-open'); sheet.hidden=false; back.hidden=false; setTimeout(()=>btnCta&&btnCta.focus(),30); }
      function close(){ document.body.classList.remove('promo-open'); sheet.hidden=true; back.hidden=true; }
      document.addEventListener('keydown', e=>{ if(e.key==='Escape') close(); });
      back.addEventListener('click', close);
      btnDecl.addEventListener('click', ()=>{ localStorage.setItem(declinedKey,'1'); close(); });
      btnCta && btnCta.addEventListener('click', ()=> localStorage.setItem(declinedKey,'1'));
      const t = setTimeout(()=>{ if(!sessionStorage.getItem(shownKey)){ open(); sessionStorage.setItem(shownKey,'1'); } }, 8000);
      const onScroll = ()=>{
        const scrolled = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
        if(scrolled>=0.5){ if(!sessionStorage.getItem(shownKey)){ open(); sessionStorage.setItem(shownKey,'1'); } window.removeEventListener('scroll', onScroll); clearTimeout(t); }
      };
      window.addEventListener('scroll', onScroll, {passive:true});
    }
  }
})();