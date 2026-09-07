/* KPSS-Mobil — İÇERİK HAVUZU DENETİMİ / KONU KİLİDİ */
(function(){
'use strict';
const C=window.KPSS_CURRICULUM||{};const B=Array.isArray(window.KPSS_BANK)?window.KPSS_BANK:[];
const valid=new Set(Object.entries(C).flatMap(([s,ts])=>ts.map(t=>s+'|'+t)));const rejected=[],clean=[],seen=new Map();
const normalize=s=>String(s||'').toLocaleLowerCase('tr-TR').replace(/[“”"']/g,'').replace(/\s+/g,' ').trim();
const textKey=q=>normalize(q.text).replace(/[0-9]+/g,'#').replace(/varyantı \d+/g,'varyant');
for(const q of B){if(!q)continue;let subject=String(q.subject||''),topic=String(q.topic||''),text=String(q.text||'').trim();
 if(subject==='Matematik'&&topic==='Sayı Problemleri'&&normalize(text).includes('bir sayının %20si 18 ise')&&C.Matematik?.includes('Yüzde Problemleri')){q.topic='Yüzde Problemleri';topic=q.topic;}
 if(subject==='Coğrafya'&&topic==='Türkiye Yer Şekilleri'&&normalize(text).includes('türkiye’nin yüz ölçümü bakımından en büyük coğrafi bölgesi')&&C.Coğrafya?.includes('Bölgeler')){q.topic='Bölgeler';topic=q.topic;}
 if(subject==='Matematik'&&topic==='Basit Eşitsizlikler'&&text.startsWith('2x+3<9')){q.a=1;q.e='2x+3<9 olduğundan 2x<6 ve x<3 bulunur.';}
 const key=subject+'|'+topic,opts=Array.isArray(q.opts)?q.opts:[],a=Number(q.a);
 if(!valid.has(key)||opts.length!==5||!Number.isInteger(a)||a<0||a>4||!text){rejected.push({q,reason:'invalid-structure-or-topic'});continue;}
 const tk=textKey(q),prev=seen.get(tk);if(prev&&prev!==key){rejected.push({q,reason:'same-question-assigned-to-different-topics',previousTopic:prev});continue;}seen.set(tk,key);clean.push(q);
}
window.KPSS_BANK=clean;
const topicQuestionCounts={},generatedTopicCounts={},incompleteTopics=[];
for(const [s,ts] of Object.entries(C))for(const t of ts){const key=s+'|'+t;topicQuestionCounts[key]=clean.filter(q=>q.subject===s&&q.topic===t).length;generatedTopicCounts[key]=clean.filter(q=>q.subject===s&&q.topic===t&&q.source==='generated-practice').length;if(generatedTopicCounts[key]<100)incompleteTopics.push({subject:s,topic:t,generatedQuestions:generatedTopicCounts[key]});}
window.KPSS_CONTENT_AUDIT={valid:!rejected.length&&!incompleteTopics.length,phase:'pre-test-content-audit',topicCount:Object.values(C).reduce((n,x)=>n+x.length,0),total:clean.length,rejected:rejected.length,rejectedQuestions:rejected,topicQuestionCounts,generatedTopicCounts,incompleteTopics,version:'CONTENT-AUDIT-2026-03'};
})();
