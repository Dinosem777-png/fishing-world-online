(()=>{
  'use strict';
  // Prevent Android/Huawei browser long-press selection and the "Copy" popup on game controls.
  const blocked='button,.btn,.smallbtn,.navitem,.bait,.text-btn,canvas,.card';
  document.addEventListener('contextmenu',e=>{if(e.target.closest(blocked)) e.preventDefault();},{capture:true});
  document.addEventListener('selectstart',e=>{if(e.target.closest(blocked)) e.preventDefault();},{capture:true});
  document.addEventListener('dragstart',e=>{if(e.target.closest(blocked)) e.preventDefault();},{capture:true});
  document.addEventListener('mousedown',e=>{if(e.button===0 && e.target.closest(blocked)) e.stopPropagation();},{capture:true});
  document.addEventListener('touchstart',e=>{const el=e.target.closest(blocked);if(el && el.tagName!=='CANVAS') el.style.webkitUserSelect='none';},{passive:true,capture:true});
  const harden=()=>document.querySelectorAll(blocked).forEach(el=>{
    el.style.webkitUserSelect='none';
    el.style.userSelect='none';
    el.style.webkitTouchCallout='none';
    el.draggable=false;
  });
  harden();
  new MutationObserver(harden).observe(document.body,{subtree:true,childList:true});
})();
