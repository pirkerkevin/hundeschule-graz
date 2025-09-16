// Globales Warenkorb-Badge (liest localStorage('cart_items'))
(function(){
  const KEY='cart_items';
  function load(){ try{return JSON.parse(localStorage.getItem(KEY))||[]}catch(e){return[]} }
  function updateBadge(){
    const b=document.getElementById('cartBadge');
    if(!b) return;
    const items=load();
    const total=items.reduce((s,it)=>s+(it.qty||1),0);
    b.textContent=total;
    b.style.display = total>0 ? '' : 'none';
  }
  document.addEventListener('visibilitychange', ()=>{ if(!document.hidden) updateBadge(); });
  window.addEventListener('storage', updateBadge);
  updateBadge();
})();