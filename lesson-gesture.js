(()=>{
'use strict';
// Lesson sheet owns the area above the fixed bottom navigation. Lesson content
// scrolls to its real end before any downward pull can dismiss the sheet.
const css=document.createElement('style');
css.textContent=`
#modal.open .sheet{display:flex!important;flex-direction:column!important;position:absolute!important;left:0!important;right:0!important;bottom:78px!important;max-height:calc(100vh - 130px)!important;overflow:hidden!important;touch-action:none!important}
#modal.open #modalBody{display:block!important;flex:1 1 auto!important;min-height:0!important;overflow-y:auto!important;overflow-x:hidden!important;-webkit-overflow-scrolling:touch!important;overscroll-behavior-y:contain!important;touch-action:pan-y!important;padding-bottom:28px!important}
#modal.open #modalBody .lessonPro{min-height:100%!important}
`;
document.head.appendChild(css);

const st={active:false,startY:0,lastY:0,offset:0,startedAtTop:false};
const getSheet=()=>document.querySelector('#modal.open .sheet');
const getScroll=sheet=>sheet?.querySelector('#modalBody')||sheet;

document.addEventListener('touchstart',e=>{
  const sheet=getSheet(),t=e.touches?.[0];
  if(!sheet||!t)return;
  const sc=getScroll(sheet);
  st.active=true;
  st.startY=t.clientY;
  st.lastY=t.clientY;
  st.offset=0;
  st.startedAtTop=(sc.scrollTop<=0);
  sheet.style.transition='';
},{capture:true,passive:true});

document.addEventListener('touchmove',e=>{
  if(!st.active)return;
  const sheet=getSheet(),t=e.touches?.[0];
  if(!sheet||!t){st.active=false;return;}
  const sc=getScroll(sheet);
  const dy=t.clientY-st.lastY;
  const total=t.clientY-st.startY;
  const dx=t.clientX-(e.touches[0]?.clientX||t.clientX);

  if(Math.abs(total)<Math.abs(dx))return;

  // While the lesson has content above the viewport, native scrolling owns it.
  if(sc.scrollTop>0){
    st.startedAtTop=false;
    st.lastY=t.clientY;
    return;
  }

  // Only a downward pull that starts at the very top can drag the sheet.
  if(dy>0 && st.startedAtTop){
    st.offset=Math.min(300,st.offset+dy);
    if(st.offset>0){
      e.preventDefault();
      e.stopImmediatePropagation();
      sheet.style.transform=`translateY(${st.offset}px)`;
      sheet.style.transition='none';
    }
  }
  st.lastY=t.clientY;
},{capture:true,passive:false});

document.addEventListener('touchend',e=>{
  if(!st.active)return;
  const sheet=getSheet();
  if(!sheet){st.active=false;return;}
  if(st.offset>0){
    e.stopImmediatePropagation();
    sheet.style.transition='transform .2s ease';
    if(st.offset>=90){
      sheet.style.transform='translateY(105%)';
      setTimeout(()=>{
        document.getElementById('modal')?.classList.remove('open');
        sheet.style.transform='';
        sheet.style.transition='';
      },180);
    }else{
      sheet.style.transform='translateY(0)';
      setTimeout(()=>{sheet.style.transform='';sheet.style.transition=''},210);
    }
  }
  st.active=false;
  st.offset=0;
  st.startedAtTop=false;
},{capture:true,passive:true});

document.addEventListener('touchcancel',()=>{
  const s=getSheet();
  if(s&&st.offset>0){s.style.transform='';s.style.transition=''}
  st.active=false;st.offset=0;st.startedAtTop=false;
},{capture:true,passive:true});
})();
