(()=>{
'use strict';
// Lesson scrolling is intentionally native. Do not intercept touch events here.
// When a new lesson opens, reset only that new sheet's scroll position so it
// always starts at the beginning. Existing scrolling remains 100% native.
const css=document.createElement('style');
css.textContent=`
#modal.open .sheet{
  display:flex!important;
  flex-direction:column!important;
  position:absolute!important;
  left:0!important;
  right:0!important;
  bottom:78px!important;
  max-height:calc(100vh - 130px)!important;
  overflow:hidden!important;
  touch-action:auto!important;
}
#modal.open #modalBody{
  display:block!important;
  flex:1 1 auto!important;
  min-height:0!important;
  max-height:none!important;
  overflow-y:auto!important;
  overflow-x:hidden!important;
  -webkit-overflow-scrolling:touch!important;
  overscroll-behavior-y:auto!important;
  touch-action:pan-y!important;
  padding-bottom:28px!important;
  scroll-padding-top:0!important;
}
#modal.open #modalBody .lessonPro{min-height:100%!important}
`;
document.head.appendChild(css);

// Runtime opens lessons through delegated click handlers. Wait until that
// handler has rendered the new lesson, then reset its scroll position.
// This does not listen to or cancel touch/scroll events.
document.addEventListener('click',()=>{
  const modal=$('modal');
  const wasOpen=!!modal?.classList.contains('open');
  const oldTitle=$('modalTitle')?.textContent||'';
  requestAnimationFrame(()=>{
    if(!modal?.classList.contains('open'))return;
    const newTitle=$('modalTitle')?.textContent||'';
    if((!wasOpen)||newTitle!==oldTitle){
      const body=$('modalBody');
      if(body)body.scrollTop=0;
    }
  });
},true);
})();
