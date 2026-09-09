(()=>{
'use strict';
// Lesson scrolling is intentionally native. Do not intercept touch events here:
// the lesson body must scroll freely in both directions on mobile.
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
}
#modal.open #modalBody .lessonPro{min-height:100%!important}
`;
document.head.appendChild(css);
})();
