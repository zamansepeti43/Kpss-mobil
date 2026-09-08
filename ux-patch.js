(()=>{
'use strict';
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
const LESSON_OVERRIDES={
  'Sözcükte Anlam':{summary:'Sözcüklerin anlamını bağlama göre belirleme, gerçek-mecaz-terim anlamı, eş anlamlılık ve deyim/atasözü ayrımı bu konunun temelidir.',tips:['Sözcüğün anlamını tek başına değil cümledeki kullanımına göre değerlendir.','Gerçek, mecaz ve terim anlamı ayır.','Deyimlerde sözcükleri tek tek değil kalıplaşmış anlamıyla düşün.'],mistakes:['Sözlükteki ilk anlamı doğrudan işaretlemek','Mecaz anlamı gerçek anlamla karıştırmak','Deyim ve atasözünü aynı kabul etmek']},
  'Cümlede Anlam':{summary:'Cümlede anlam sorularında neden-sonuç, amaç-sonuç, koşul, karşılaştırma, çıkarım ve kesinlik gibi ilişkileri ayırt etmeyi öğren.',tips:['Cümledeki ilişkiyi kuran ifadeleri işaretle.','Neden ile amacı birbirine karıştırma.','Kesin yargı ile olasılık bildiren ifadeleri ayır.'],mistakes:['Amaç-sonuç ile neden-sonucu karıştırmak','Cümlede bulunmayan bilgiyi varsaymak','Olumsuzluğu gözden kaçırmak']},
  'Paragraf':{summary:'Paragraf sorularında konu, ana düşünce, yardımcı düşünce, yapı ve çıkarım ilişkilerini metnin tamamını dikkate alarak çöz.',tips:['Önce paragrafın bütününü oku.','Ana düşünceyi tek bir ayrıntıya indirgeme.','Soru kökündeki “değinilmemiştir” gibi ifadelerin altını çiz.'],mistakes:['Sadece ilk cümleye göre cevap vermek','Örnek ile ana düşünceyi karıştırmak','Paragrafta olmayan yorumu şıkka taşımak']},
  'Dil Bilgisi':{summary:'Dil bilgisi sorularında sözcük türleri, cümlenin ögeleri, fiilimsiler ve yapı bilgisi gibi kuralları örnek cümleler üzerinden uygula.',tips:['Kuralı ezberlemek yerine örnek üzerinde uygula.','Sözcüğün görevini cümle içindeki kullanımına göre belirle.','Cümle ögelerini bulurken önce yüklemi belirle.'],mistakes:['Sözcük türü ile görevini karıştırmak','Yüklemi yanlış belirlemek','Fiilimsi ile çekimli fiili karıştırmak']},
  'Yazım Kuralları':{summary:'Yazım Kuralları dersinde büyük harf, birleşik sözcük, ayrı-bitişik yazım, sayıların yazımı ve özel adlarla ilgili temel kuralları çalış.',tips:['Sık karıştırılan ayrı/bitişik yazımları listele.','Özel adlarda büyük harf kullanımını kontrol et.','Soruda yazımın cümlenin anlamını değiştirip değiştirmediğine bak.'],mistakes:['Her birleşik sözcüğü bitişik sanmak','Özel ad eklerini yanlış yazmak','Bağlaç olan “de/da”yı ekle karıştırmak']},
  'Noktalama':{summary:'Noktalama işaretlerinin cümledeki görevlerini; virgül, noktalı virgül, iki nokta, tırnak, kesme ve diğer işaretlerin kullanımını örneklerle öğren.',tips:['İşaretin neden kullanıldığını sor.','Virgülün görevlerini ayrı ayrı çalış.','Kesme işaretinde özel ad ve ek ilişkisini kontrol et.'],mistakes:['Virgülü yalnızca duraklama olarak düşünmek','İki nokta ile noktalı virgülün görevlerini karıştırmak','Tırnak ve kesme işaretinin kullanım alanını karıştırmak']}
};
function lessonFor(subject,topic){const override=LESSON_OVERRIDES[topic];if(override)return override;const lessons=window.KPSS_CONTENT?.lessons||{};return lessons?.[subject]?.[topic]||null}
function openLesson(subject,topic){
  const lesson=lessonFor(subject,topic),summary=lesson?.summary||`${topic} konusunda KPSS için temel kavramları öğren, örneklerle pekiştir ve ardından konu testini çöz.`,tips=Array.isArray(lesson?.tips)?lesson.tips:[],mistakes=Array.isArray(lesson?.mistakes)?lesson.mistakes:[];
  const body=`<div class="lessonBody"><p class="muted">${esc(subject)} • ${esc(topic)}</p><h3 style="font-size:16px;margin:8px 0">Ders Özeti</h3><p>${esc(summary)}</p>${tips.length?'<p><b>Çalışma ipuçları</b></p><ul>'+tips.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>':''}${mistakes.length?'<p><b>Sık yapılan hatalar</b></p><ul>'+mistakes.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>':''}<button class="primary" id="startTopicTest">Konu Testini Başlat →</button></div>`;
  if($('modalTitle'))$('modalTitle').textContent=topic+' • Ders';if($('modalBody'))$('modalBody').innerHTML=body;$('modal')?.classList.add('open');
  const btn=$('startTopicTest');if(btn)btn.onclick=()=>{$('modal')?.classList.remove('open');const target=[...document.querySelectorAll('#topicList [data-topic]')].find(x=>decodeURIComponent(x.dataset.topic||'')===topic);if(target){window.__KPSS_ALLOW_TOPIC_CLICK__=true;target.click()}};
}
document.addEventListener('click',e=>{const topicBtn=e.target.closest?.('#topicList [data-topic]');if(topicBtn){if(window.__KPSS_ALLOW_TOPIC_CLICK__){window.__KPSS_ALLOW_TOPIC_CLICK__=false;return}e.preventDefault();e.stopImmediatePropagation();openLesson($('topicName')?.textContent?.trim()||'',decodeURIComponent(topicBtn.dataset.topic||''));return}},true);
const modal=$('modal');modal?.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
const subjectFallback=[
 ['Türkçe','📖','blue','gy',['Sözcükte Anlam','Cümlede Anlam','Paragraf','Dil Bilgisi','Yazım Kuralları','Noktalama'],86,'12 konu'],
 ['Matematik','▦','violet','gy',['Temel Kavramlar','Sayılar','Bölme-Bölünebilme','Problemler','Oran-Orantı','Kümeler'],61,'11 konu'],
 ['Tarih','🏛','red','gk',['İlk Türk Devletleri','Osmanlı Kuruluş','Osmanlı Kültür','Kurtuluş Savaşı','Atatürk İlkeleri','Cumhuriyet Dönemi'],78,'15 konu'],
 ['Coğrafya','🌐','blue','gk',['Türkiye Fiziki Coğrafyası','İklim','Nüfus','Ekonomik Coğrafya','Bölgeler','Harita Bilgisi'],70,'10 konu'],
 ['Vatandaşlık','⚖','orange','gk',['Hukukun Temelleri','Anayasa','Yasama','Yürütme','Yargı','İdare Hukuku'],84,'8 konu'],
 ['Güncel Bilgiler','▤','violet','gk',['Türkiye Gündemi','Bilim ve Teknoloji','Kültür ve Sanat','Uluslararası Kuruluşlar','Ekonomi','Spor'],73,'6 konu']
];
function renderAllSubjects(){
 const list=$('subjectList');if(!list)return;
 const b=Array.isArray(window.KPSS_BANK)?window.KPSS_BANK:[];
 const q=($('subjectSearch')?.value||'').trim().toLocaleLowerCase('tr-TR');
 const items=subjectFallback.filter(s=>!q||s[0].toLocaleLowerCase('tr-TR').includes(q)||s[4].some(t=>t.toLocaleLowerCase('tr-TR').includes(q)));
 list.innerHTML=items.map(s=>{const count=b.filter(x=>x.subject===s[0]).length;const pct=s[5];return `<button class="proSubject" data-sub="${encodeURIComponent(s[0])}" type="button"><span class="proSubIcon ${s[2]}">${s[1]}</span><span class="proSubInfo"><b>${esc(s[0])}</b><small>${s[6]} • ${count||0} soru</small></span><span class="proProgress" style="--p:${pct}%"><i>${pct}%</i></span><span class="proArrow">›</span></button>`}).join('')||'<section class="card"><b>Sonuç bulunamadı.</b><p class="muted">Ders veya konu adını değiştirerek tekrar ara.</p></section>';
}
function ensureSubjects(){const list=$('subjectList');if(!list)return;renderAllSubjects()}
const originalShow=window.show;if(typeof originalShow==='function'){window.show=function(id){originalShow(id);if(id==='subjects'){setTimeout(ensureSubjects,0);setTimeout(ensureSubjects,120);setTimeout(ensureSubjects,350)}if(id==='past'){setTimeout(renderPastUX,0)}}}
document.addEventListener('click',e=>{const go=e.target.closest?.('[data-go="subjects"]');if(go)setTimeout(ensureSubjects,0);const tab=e.target.closest?.('#subjects .tabs button');if(tab){e.preventDefault();e.stopImmediatePropagation();ensureSubjects()}},true);
const OSYM_ARCHIVE='https://www.osym.gov.tr/SinavGrubu/Menu/344';
const PAST_LINKS={2025:'https://dokuman.osym.gov.tr/pdfdokuman/2025/KPSS/GY-GK/gygk_07092025lsy.pdf',2024:'https://www.osym.gov.tr/2024kpss-lisans-genel-yetenekgenel-kultur-ve-egitim-bilimleri-temel-soru-kitapciklari-ve-cevap-anahtarlari-10',2023:'https://www.osym.gov.tr/2023kpss-a-grubu-ve-ogretmenlik-sinavigenel-yetenekgenel-kultur-ve-egitim-bilimleri-temel-soru-kitapciklari-ve-cevap-anahtarlari-10',2022:'https://www.osym.gov.tr/2022kpss-lisans-genel-yetenekgenel-kultur-ve-egitim-bilimleri-temel-soru-kitapciklari-ve-cevap-anahtarlari-10'};
const PAST_YEARS=[2026,2025,2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010];
function renderPastUX(){const list=$('pastList');if(!list)return;list.innerHTML=PAST_YEARS.map(year=>{const direct=!!PAST_LINKS[year],label=year===2025?'2025-KPSS A Grubu • Genel Yetenek-Genel Kültür':year===2024?'2024-KPSS Lisans • Genel Yetenek-Genel Kültür':'KPSS resmi soru arşivi',href=PAST_LINKS[year]||OSYM_ARCHIVE;return `<button class="pastYearUX" type="button" data-past-open="${year}" data-url="${href}"><span class="pastYearIcon">📚</span><span class="grow"><b>${year} KPSS</b><small>${label}</small></span><span class="pastOpen">${direct?'Soru Kitapçığını Aç →':'Arşiv →'}</span></button>`}).join('')}
document.addEventListener('click',e=>{const go=e.target.closest?.('[data-go="past"]');if(go)setTimeout(renderPastUX,0);const tab=e.target.closest?.('[data-pastgroup]');if(tab)setTimeout(renderPastUX,0)},true);
document.addEventListener('click',e=>{const year=e.target.closest?.('[data-past-open]');if(year){e.preventDefault();e.stopImmediatePropagation();const url=year.dataset.url||OSYM_ARCHIVE;if(Number(year.dataset.pastOpen)===2025||url.endsWith('.pdf'))window.location.assign(url);else window.open(url,'_blank','noopener');return}const info=e.target.closest?.('[data-action="pastInfo"]');if(info){e.preventDefault();e.stopImmediatePropagation();openModal('Çıkmış Sorular','<p class="muted">Yıla dokunduğunda o yılın resmi ÖSYM soru kitapçığı kaynağı açılır. ÖSYM soruları telifli olduğu için soru metinlerini uygulamanın içine kopyalamıyoruz.</p><a class="primary" style="display:block;text-align:center" href="'+OSYM_ARCHIVE+'" target="_blank" rel="noopener">ÖSYM KPSS Arşivini Aç ↗</a>')}},true);
const style=document.createElement('style');style.textContent=`
/* PRO MOBILE UI */
:root{--bg:#050b16;--panel:#0a1728;--panel2:#0d1d31;--line:#1a3047;--text:#f6f8ff;--muted:#8ea2b8;--primary:#5b5cff;--primary2:#3188ff;--success:#28d9b3}
html,body{background:#02060d}
.app{padding:0;background:radial-gradient(circle at 50% -5%,#18395c 0,#06101d 38%,#01040a 82%)}
.phone{width:390px;min-height:100vh;border-radius:0;border:0;background:linear-gradient(180deg,#071321 0%,#040b14 100%);box-shadow:none}
.status{height:36px;padding:10px 18px 0;color:#eef5ff;letter-spacing:.1px}
.screen{min-height:calc(100vh - 36px);padding:13px 16px calc(100px + env(safe-area-inset-bottom));scrollbar-width:none}.screen::-webkit-scrollbar{display:none}
.topbar{height:42px;margin:0 0 13px}.topbar h2{font-size:19px;letter-spacing:-.25px}.iconbtn{border-radius:11px}.iconbtn:active{background:#10243a}
.hero{border-radius:24px;padding:17px;background:linear-gradient(145deg,#102943 0%,#081522 68%);box-shadow:0 14px 35px #0005}.hero h1{font-size:24px;margin-top:27px}.hero p{font-size:11px}
.card,.goal,.subjecthero,.qcard,.chartcard,.level,.profile{box-shadow:0 10px 28px #0003}
.goal{border-radius:20px;background:linear-gradient(145deg,#102840,#091622)}
.quickgrid{gap:10px}.action{min-height:104px;border-radius:18px;box-shadow:inset 0 1px #ffffff08,0 8px 20px #0003}.action b{font-size:13px}.action small{font-size:9px}
.sectionhead{margin:18px 2px 8px}.sectionhead b{font-size:12px}
/* Dersler: all six subjects on one screen, no category tabs */
#subjects .search{height:40px;margin-bottom:8px;background:#091727;border-color:#1b3650;border-radius:13px}.proSubject{width:100%;min-height:67px;display:flex;align-items:center;gap:10px;margin:6px 0;padding:9px 10px;border:1px solid #19334a;border-radius:16px;background:linear-gradient(145deg,#0d2033,#081522);text-align:left;box-shadow:0 6px 16px #0002}.proSubject:active{transform:scale(.992);border-color:#3d64b6}.proSubIcon{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;font-size:20px;background:#1b58b8;box-shadow:inset 0 1px #ffffff18}.proSubIcon.violet{background:#493bc4}.proSubIcon.red{background:#9b3a51}.proSubIcon.orange{background:#a86525}.proSubInfo{min-width:0;flex:1}.proSubInfo b{display:block;font-size:13px;white-space:nowrap}.proSubInfo small{display:block;margin-top:4px;font-size:8px;white-space:nowrap}.proProgress{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:conic-gradient(var(--success) var(--p),#20394d 0);position:relative}.proProgress:before{content:"";position:absolute;inset:4px;border-radius:50%;background:#0a1827}.proProgress i{position:relative;font-style:normal;font-size:8px;font-weight:800;color:#dffdf7}.proArrow{font-size:23px;color:#8095aa;margin-left:1px}
#subjects .tabs{display:none}
#subjects #subjectList{margin-top:2px}
/* Topic / question hierarchy */
.subjecthero{border-radius:19px}.topic{padding:13px 4px}.topic b{font-size:12px}.topic small{font-size:9px}.qcard{border-radius:22px}.qcard h3{font-size:15px;line-height:1.6}.option{min-height:46px;padding:10px 11px;border-radius:14px}.option .letter{width:27px;height:27px}.primary{min-height:46px;border-radius:14px;background:linear-gradient(100deg,#5752ff,#2e83ff);box-shadow:0 10px 22px #3e5bff35}
/* Fixed professional bottom navigation */
.bottom{position:fixed;left:50%;right:auto;bottom:0;transform:translateX(-50%);width:min(390px,100vw);height:72px;padding:7px 8px calc(7px + env(safe-area-inset-bottom));background:rgba(5,13,24,.96);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border-top:1px solid #20364d;box-shadow:0 -10px 30px #0007;z-index:100;grid-template-columns:repeat(5,1fr)}
.bottom button{position:relative;gap:3px;border-radius:13px;color:#71879d;transition:.18s}.bottom button span{font-size:18px;line-height:1}.bottom button small{font-size:8px;color:inherit}.bottom button.on{color:#fff}.bottom button.on:before{content:"";position:absolute;inset:3px 9px 2px;background:linear-gradient(145deg,#3136a8,#1b57a4);border:1px solid #5965ff88;border-radius:12px;z-index:-1;box-shadow:0 4px 14px #314cff44}.bottom button.on span,.bottom button.on small{position:relative;z-index:1;color:#fff}.toast{position:fixed;left:50%;right:auto;bottom:82px;transform:translate(-50%,10px);width:min(350px,calc(100vw - 32px));z-index:120}.toast.show{transform:translate(-50%,0)}
/* Cleaner modals and past cards */
.modal{position:fixed;z-index:200}.sheet{max-width:390px;margin:0 auto;border-radius:26px 26px 0 0;background:linear-gradient(160deg,#0b1d30,#06111c);padding:20px 17px calc(20px + env(safe-area-inset-bottom));box-shadow:0 -20px 50px #0008}.sheet h3{font-size:17px}.pastYearUX{min-height:65px;margin:7px 0;padding:11px 12px;border-radius:16px;background:linear-gradient(145deg,#0d2033,#081522);border-color:#1b3750}.pastYearUX b{font-size:12px}.pastYearUX small{font-size:8px}.pastOpen{background:#182d61;color:#a9c8ff;font-size:8px;border:1px solid #304f91}
@media(max-width:430px){.phone{width:100vw}.screen{padding-left:15px;padding-right:15px}}
`;
document.head.appendChild(style);
setTimeout(ensureSubjects,100);setTimeout(renderPastUX,100);
})();