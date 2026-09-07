/* KPSS-Mobil — İÇERİK HAVUZU DENETİMİ / KONU KİLİDİ */
/* HTML parser'ı durdurup tamamlayıcı bankayı senkron yükler; böylece sonraki motorlar temiz havuzu görür. */
document.write('<script src="question-bank-complete.js"></script>');
(function(){
'use strict';
const C=window.KPSS_CURRICULUM||{};
const B=Array.isArray(window.KPSS_BANK)?window.KPSS_BANK:[];
const valid=new Set(Object.entries(C).flatMap(([s,ts])=>ts.map(t=>s+'|'+t)));
const rejected=[], clean=[], seenText=new Map();
const fixes=[['Matematik','Basit Eşitsizlikler','2x+3<9',1,'2x+3<9 olduğundan 2x<6 ve x<3 bulunur.']];
const normalize=s=>String(s||'').toLocaleLowerCase('tr-TR').replace(/[“”"']/g,'').replace(/\s+/g,' ').trim();
const textKey=q=>normalize(q.text).replace(/[0-9]+/g,'#').replace(/varyantı \d+/g,'varyant');
const hasTopic=(s,t)=>Array.isArray(C[s])&&C[s].includes(t);
for(const q of B){
 if(!q) continue;
 let subject=String(q.subject||''), topic=String(q.topic||''), text=String(q.text||'').trim();
 if(subject==='Matematik'&&topic==='Sayı Problemleri'&&normalize(text).includes('bir sayının %20si 18 ise')&&hasTopic('Matematik','Yüzde Problemleri')){q.topic='Yüzde Problemleri';topic=q.topic;}
 if(subject==='Coğrafya'&&topic==='Türkiye Yer Şekilleri'&&normalize(text).includes('türkiye’nin yüz ölçümü bakımından en büyük coğrafi bölgesi')&&hasTopic('Coğrafya','Bölgeler')){q.topic='Bölgeler';topic=q.topic;}
 const key=subject+'|'+topic; const opts=Array.isArray(q.opts)?q.opts:[]; let a=Number(q.a);
 for(const f of fixes) if(subject===f[0]&&topic===f[1]&&text.startsWith(f[2])){q.a=f[3];q.e=f[4];a=f[3];}
 if(!valid.has(key)||opts.length!==5||!Number.isInteger(a)||a<0||a>4||!text){rejected.push({q,reason:'invalid-structure-or-topic'});continue;}
 const tk=textKey(q),prev=seenText.get(tk); if(prev&&prev!==key){rejected.push({q,reason:'same-question-assigned-to-different-topics',previousTopic:prev});continue;}
 seenText.set(tk,key);clean.push(q);
}
window.KPSS_BANK=clean;
const topicQuestionCounts={}; for(const [s,ts] of Object.entries(C)) for(const t of ts) topicQuestionCounts[s+'|'+t]=clean.filter(q=>q.subject===s&&q.topic===t).length;
const generatedTopicCounts={}; for(const q of clean) if(q.source==='generated-practice') generatedTopicCounts[q.subject+'|'+q.topic]=(generatedTopicCounts[q.subject+'|'+q.topic]||0)+1;
const incompleteTopics=[]; for(const [s,ts] of Object.entries(C)) for(const t of ts){const n=generatedTopicCounts[s+'|'+t]||0;if(n<100)incompleteTopics.push({subject:s,topic:t,generatedQuestions:n});}
if(window.KPSS_TOPIC_TESTS) for(const key of Object.keys(window.KPSS_TOPIC_TESTS)){const arr=clean.filter(q=>q.source==='generated-practice'&&key===q.subject+'|'+q.topic);window.KPSS_TOPIC_TESTS[key]=Array.from({length:5},(_,i)=>arr.filter(q=>q.testNo===i+1).slice(0,20));}
window.KPSS_BANK_AUDIT={valid:rejected.length===0&&incompleteTopics.length===0,phase:'pre-test-content-audit',topicCount:Object.values(C).reduce((n,x)=>n+x.length,0),total:clean.length,rejected:rejected.length,rejectedQuestions:rejected,topicQuestionCounts,generatedTopicCounts,incompleteTopics,version:'CONTENT-AUDIT-2026-02'};
})();
