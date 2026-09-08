(()=>{
'use strict';
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* Topic -> lesson -> test flow */
function lessonFor(subject,topic){
  const lessons=window.KPSS_CONTENT?.lessons||{};
  return lessons?.[subject]?.[topic]||null;
}
function openLesson(subject,topic){
  const lesson=lessonFor(subject,topic);
  const summary=lesson?.summary||`${topic} konusunda KPSS için temel kavramları öğren, örneklerle pekiştir ve ardından konu testini çöz.`;
  const tips=Array.isArray(lesson?.tips)?lesson.tips:[];
  const mistakes=Array.isArray(lesson?.mistakes)?lesson.mistakes:[];
  const body=`<div class="lessonBody"><p class="muted">${esc(subject)} • ${esc(topic)}</p><h3 style="font-size:16px;margin:8px 0">Ders Özeti</h3><p>${esc(summary)}</p>${tips.length?'<p><b>Çalışma ipuçları</b></p><ul>'+tips.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>':''}${mistakes.length?'<p><b>Sık yapılan hatalar</b></p><ul>'+mistakes.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>':''}<button class="primary" id="startTopicTest">Konu Testini Başlat →</button></div>`;
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

/* Modal closes by tapping the dark area outside the sheet. */
const modal=$('modal');
modal?.addEventListener('click',e=>{
  if(e.target===modal)modal.classList.remove('open');
});

/* If the subject list ever misses the first render, restore the six real lessons immediately. */
const subjectFallback=[
  ['Türkçe','📖','blue','gy',['Sözcükte Anlam','Cümlede Anlam','Paragraf','Dil Bilgisi','Yazım Kuralları','Noktalama']],
  ['Matematik','▦','violet','gy',['Temel Kavramlar','Sayılar','Bölme-Bölünebilme','Problemler','Oran-Orantı','Kümeler']],
  ['Tarih','🏛','red','gk',['İlk Türk Devletleri','Osmanlı Kuruluş','Osmanlı Kültür','Kurtuluş Savaşı','Atatürk İlkeleri','Cumhuriyet Dönemi']],
  ['Coğrafya','🌐','blue','gk',['Türkiye Fiziki Coğrafyası','İklim','Nüfus','Ekonomik Coğrafya','Bölgeler','Harita Bilgisi']],
  ['Vatandaşlık','⚖','orange','gk',['Hukukun Temelleri','Anayasa','Yasama','Yürütme','Yargı','İdare Hukuku']],
  ['Güncel Bilgiler','▤','violet','gk',['Türkiye Gündemi','Bilim ve Teknoloji','Kültür ve Sanat','Uluslararası Kuruluşlar','Ekonomi','Spor']]
];
function ensureSubjects(){
  const list=$('subjectList');
  if(!list||list.children.length)return;
  const active=document.querySelector('#subjects .tabs button.active')?.dataset.tab||'gy';
  const rows=subjectFallback.filter(s=>s[3]===active);
  list.innerHTML=rows.map(s=>`<button class="subject" data-sub="${encodeURIComponent(s[0])}"><span class="subicon ${s[2]}">${s[1]}</span><span class="subinfo"><b>${esc(s[0])}</b><small>${s[4].length} konu • Ders ve testlere gir</small></span><span class="score">›</span></button>`).join('');
}
const originalShow=window.show;
if(typeof originalShow==='function'){
  window.show=function(id){
    originalShow(id);
    if(id==='subjects'){setTimeout(ensureSubjects,0);setTimeout(ensureSubjects,250)}
    if(id==='past'){setTimeout(renderPastUX,0)}
  };
}

/* Past questions: year selection first, then open that year's official question page.
   We never copy ÖSYM's copyrighted question text into the app. */
const OSYM_ARCHIVE='https://www.osym.gov.tr/SinavGrubu/Menu/344';
const PAST_LINKS={
  2025:'https://www.osym.gov.tr/2025kpss-a-grubu-sinavi-genel-yetenekgenel-kultur-temel-soru-kitapcigi-ve-cevap-anahtari-10',
  2024:'https://www.osym.gov.tr/2024kpss-lisans-genel-yetenekgenel-kultur-ve-egitim-bilimleri-temel-soru-kitapciklari-ve-cevap-anahtarlari-10',
  2023:'https://www.osym.gov.tr/2023kpss-a-grubu-ve-ogretmenlik-sinavigenel-yetenekgenel-kultur-ve-egitim-bilimleri-temel-soru-kitapciklari-ve-cevap-anahtarlari-10',
  2022:'https://www.osym.gov.tr/2022kpss-lisans-genel-yetenekgenel-kultur-ve-egitim-bilimleri-temel-soru-kitapciklari-ve-cevap-anahtarlari-10'
};
const PAST_YEARS=[2026,2025,2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010];
function renderPastUX(){
  const list=$('pastList');
  if(!list)return;
  list.innerHTML=PAST_YEARS.map(year=>{
    const direct=!!PAST_LINKS[year];
    const label=year===2025?'2025-KPSS A Grubu • Genel Yetenek-Genel Kültür':year===2024?'2024-KPSS Lisans • Genel Yetenek-Genel Kültür':'KPSS resmi soru arşivi';
    const href=PAST_LINKS[year]||OSYM_ARCHIVE;
    return `<button class="pastYearUX" type="button" data-past-open="${year}" data-url="${href}"><span class="pastYearIcon">📚</span><span class="grow"><b>${year} KPSS</b><small>${label}</small></span><span class="pastOpen">${direct?'Soruları Aç →':'Arşiv →'}</span></button>`;
  }).join('');
}

document.addEventListener('click',e=>{
  const year=e.target.closest?.('[data-past-open]');
  if(year){
    e.preventDefault();
    e.stopImmediatePropagation();
    const url=year.dataset.url||OSYM_ARCHIVE;
    window.open(url,'_blank','noopener');
    return;
  }
  const info=e.target.closest?.('[data-action="pastInfo"]');
  if(info){
    e.preventDefault();
    e.stopImmediatePropagation();
    openModal('Çıkmış Sorular','<p class="muted">Yıla dokunduğunda o yılın resmi ÖSYM soru kitapçığı sayfası açılır. ÖSYM soruları telifli olduğu için soru metinlerini uygulamanın içine kopyalamıyoruz.</p><a class="primary" style="display:block;text-align:center" href="'+OSYM_ARCHIVE+'" target="_blank" rel="noopener">ÖSYM KPSS Arşivini Aç ↗</a>');
  }
},true);

const style=document.createElement('style');
style.textContent=`
.lessonBody ul{padding-left:18px;margin:6px 0 12px}.lessonBody li{margin:5px 0;color:var(--muted);font-size:10px;line-height:1.45}
.pastYearUX{width:100%;display:flex;align-items:center;gap:10px;margin:8px 0;padding:13px;border:1px solid #1d354b;background:#0b1a28;border-radius:15px;color:inherit;text-align:left}
.pastYearUX:active{transform:scale(.99)}.pastYearIcon{font-size:20px}.pastYearUX b{display:block;font-size:11px}.pastYearUX small{display:block;margin-top:4px;font-size:8px;color:var(--muted);line-height:1.35}.pastOpen{padding:7px 9px;border-radius:9px;background:#182e5c;color:#8cbcff;font-size:8px;font-weight:800;white-space:nowrap}
`;
document.head.appendChild(style);
setTimeout(ensureSubjects,100);
setTimeout(renderPastUX,100);
})();