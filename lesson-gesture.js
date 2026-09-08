(()=>{
'use strict';
// Native-feeling lesson sheet gesture: content scrolls first; only after reaching
// the very top does a downward pull move the sheet and allow dismissal.
const st={active:false,startY:0,lastY:0,offset:0};
const getSheet=()=>document.querySelector('#modal.open .sheet');
const getScroll=sheet=>sheet?.querySelector('#modalBody')||sheet;

document.addEventListener('touchstart',e=>{
  const sheet=getSheet(),t=e.touches?.[0];
  if(!sheet||!t)return;
  st.active=true;st.startY=t.clientY;st.lastY=t.clientY;st.offset=0;
  sheet.style.transition='';
},{capture:true,passive:true});

document.addEventListener('touchmove',e=>{
  if(!st.active)return;
  const sheet=getSheet(),t=e.touches?.[0];
  if(!sheet||!t){st.active=false;return;}
  const sc=getScroll(sheet),dy=t.clientY-st.lastY;
  const total=t.clientY-st.startY;
  // Horizontal gestures are left alone.
  if(Math.abs(total)<Math.abs(t.clientX-(e.touches[0]?.clientX||0)))return;
  // Let the lesson body scroll naturally while it still has content above.
  if(sc.scrollTop>0){st.lastY=t.clientY;return;}
  // We are at the top. A downward continuation now becomes sheet dragging.
  if(dy>0){
    st.offset=Math.min(260,st.offset+dy);
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
        sheet.style.transform='';sheet.style.transition='';
      },180);
    }else{
      sheet.style.transform='translateY(0)';
      setTimeout(()=>{sheet.style.transform='';sheet.style.transition=''},210);
    }
  }
  st.active=false;st.offset=0;
},{capture:true,passive:true});

document.addEventListener('touchcancel',()=>{const s=getSheet();if(s&&st.offset>0){s.style.transform='';s.style.transition=''}st.active=false;st.offset=0},{capture:true,passive:true});
})();
