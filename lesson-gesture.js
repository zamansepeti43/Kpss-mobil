(()=>{
'use strict';
/*
 * Keep lesson content natively scrollable. The previous version applied
 * touch-action:none to the sheet, which could block the browser's vertical
 * scroll gesture. We now let the browser own scrolling and only intercept a
 * downward pull when the lesson body is already at scrollTop=0.
 */
const css=document.createElement('style');
css.textContent=`
#modal.open .sheet{
  display:flex!important;
  flex-direction:column!important;
  position:absolute!important;
  left:0!important;
  right:0!important;
  bottom:78px!important;
  max-height:calc(100dvh - 130px)!important;
  overflow:hidden!important;
  touch-action:pan-y!important;
}
#modal.open #modalBody{
  display:block!important;
  flex:1 1 auto!important;
  min-height:0!important;
  max-height:none!important;
  overflow-y:auto!important;
  overflow-x:hidden!important;
  -webkit-overflow-scrolling:touch!important;
  overscroll-behavior-y:contain!important;
  touch-action:pan-y!important;
  padding-bottom:28px!important;
}
#modal.open #modalBody .lessonPro,
#modal.open #modalBody .lessonBody{
  min-height:100%!important;
}
`;
document.head.appendChild(css);

const st={
  active:false,
  startY:0,
  lastY:0,
  offset:0,
  startedAtTop:false,
  pulling:false
};

const getSheet=()=>document.querySelector('#modal.open .sheet');
const getScroll=sheet=>sheet?.querySelector('#modalBody');
const reset=()=>{
  st.active=false;
  st.startY=0;
  st.lastY=0;
  st.offset=0;
  st.startedAtTop=false;
  st.pulling=false;
};

document.addEventListener('touchstart',e=>{
  const sheet=getSheet(),t=e.touches?.[0];
  if(!sheet||!t)return;
  const sc=getScroll(sheet);
  if(!sc)return;
  st.active=true;
  st.startY=t.clientY;
  st.lastY=t.clientY;
  st.offset=0;
  st.startedAtTop=sc.scrollTop<=1;
  st.pulling=false;
},{capture:true,passive:true});

document.addEventListener('touchmove',e=>{
  if(!st.active)return;
  const sheet=getSheet(),sc=getScroll(sheet),t=e.touches?.[0];
  if(!sheet||!sc||!t){reset();return;}

  const dx=t.clientX-(e.touches[0]?.clientX||t.clientX);
  const total=t.clientY-st.startY;
  const dy=t.clientY-st.lastY;

  /* Horizontal gestures are ignored completely. */
  if(Math.abs(total)<Math.abs(dx)){
    st.lastY=t.clientY;
    return;
  }

  /* Once the lesson is scrolled down, never hijack the native scroll. */
  if(sc.scrollTop>1){
    st.startedAtTop=false;
    st.pulling=false;
    st.lastY=t.clientY;
    return;
  }

  /* Upward movement at the top should remain a native scroll gesture. */
  if(total<0){
    st.startedAtTop=false;
    st.pulling=false;
    st.lastY=t.clientY;
    return;
  }

  /* Downward pull from the very top may dismiss the sheet. */
  if(st.startedAtTop && dy>0){
    st.pulling=true;
    st.offset=Math.min(260,Math.max(0,st.offset+dy));
    if(st.offset>6){
      e.preventDefault();
      sheet.style.transition='none';
      sheet.style.transform=`translateY(${st.offset}px)`;
    }
  }
  st.lastY=t.clientY;
},{capture:true,passive:false});

document.addEventListener('touchend',()=>{
  if(!st.active)return;
  const sheet=getSheet();
  if(!sheet){reset();return;}

  if(st.pulling&&st.offset>0){
    const amount=st.offset;
    sheet.style.transition='transform .2s ease';
    if(amount>=90){
      sheet.style.transform='translateY(105%)';
      setTimeout(()=>{
        document.getElementById('modal')?.classList.remove('open');
        sheet.style.transform='';
        sheet.style.transition='';
      },180);
    }else{
      sheet.style.transform='translateY(0)';
      setTimeout(()=>{
        sheet.style.transform='';
        sheet.style.transition='';
      },210);
    }
  }
  reset();
},{capture:true,passive:true});

document.addEventListener('touchcancel',()=>{
  const sheet=getSheet();
  if(sheet){sheet.style.transform='';sheet.style.transition='';}
  reset();
},{capture:true,passive:true});
})();
