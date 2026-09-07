(()=>{
'use strict';
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function lessonFor(subject,topic){
  const lessons=window.KPSS_CONTENT?.lessons||{};
  return lessons?.[subject]?.[topic]||null;
}
function openLesson(subject,topic){
  const lesson=lessonFor(subject,topic);
  const summary=lesson?.summary||`${topic} konusunda KPSS için temel kavramları öğren ve ardından konu testini çöz.`;
  const tips=Array.isArray(lesson?.tips)?lesson.tips:[];
  const mistakes=Array.isArray(lesson?.mistakes)?lesson.mistakes:[];
  const body=`<p class="muted">${esc(subject)} • ${esc(topic)}</p><p>${esc(summary)}</p>${tips.length?'<p><b>Çalışma ipuçları</b></p><ul>'+tips.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>':''}${mistakes.length?'<p><b>Sık yapılan hatalar</b></p><ul>'+mistakes.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>':''}<button class="primary" id="startTopicTest">Konu Testini Başlat →</button>`;
  if($('modalTitle'))$('modalTitle').textContent=topic+' • Ders';
  if($('modalBody'))$('modalBody').innerHTML=body;
  $('modal')?.classList.add('open');
  const btn=$('startTopicTest');
  if(btn)btn.onclick=()=>{
    $('modal')?.classList.remove('open');
    const target=[...document.querySelectorAll('#topicList [data-topic]')].find(x=>decodeURIComponent(x.dataset.topic||'')===topic);
    if(target){window.__KPSS_ALLOW_TOPIC_CLICK__=true;target.click();}
  };
}
document.addEventListener('click',e=>{
  const topicBtn=e.target.closest?.('#topicList [data-topic]');
  if(topicBtn){
    if(window.__KPSS_ALLOW_TOPIC_CLICK__){window.__KPSS_ALLOW_TOPIC_CLICK__=false;return;}
    e.preventDefault();
    e.stopImmediatePropagation();
    const subject=$('topicName')?.textContent?.trim()||'';
    const topic=decodeURIComponent(topicBtn.dataset.topic||'');
    openLesson(subject,topic);
    return;
  }
},true);
const modal=$('modal');
modal?.addEventListener('click',e=>{
  if(e.target===modal)modal.classList.remove('open');
});
})();