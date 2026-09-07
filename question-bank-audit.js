/* KPSS-Mobil — İÇERİK HAVUZU DENETİMİ / KONU KİLİDİ */
(function(){
'use strict';
const C=window.KPSS_CURRICULUM||{};
const B=Array.isArray(window.KPSS_BANK)?window.KPSS_BANK:[];
const valid=new Set(Object.entries(C).flatMap(([s,ts])=>ts.map(t=>s+'|'+t)));
const rejected=[]; const clean=[]; const seenText=new Map();
const fixes=[['Matematik','Basit Eşitsizlikler','2x+3<9',1,'2x+3<9 olduğundan 2x<6 ve x<3 bulunur.']];
const normalize=s=>String(s||'').toLocaleLowerCase('tr-TR').replace(/[“”"']/g,'').replace(/\s+/g,' ').trim();
const textKey=q=>normalize(q.text).replace(/[0-9]+/g,'#');
for(const q of B){
 if(!q) continue;
 const subject=String(q.subject||''), topic=String(q.topic||''), key=subject+'|'+topic;
 const opts=Array.isArray(q.opts)?q.opts:[]; let a=Number(q.a); const text=String(q.text||'').trim();
 for(const f of fixes) if(subject===f[0]&&topic===f[1]&&text.startsWith(f[2])){q.a=f[3];q.e=f[4];a=f[3];}
 if(!valid.has(key)||opts.length!==5||!Number.isInteger(a)||a<0||a>4||!text){rejected.push({q,reason:'invalid-structure-or-topic'});continue;}
 const tk=textKey(q), prev=seenText.get(tk);
 if(prev&&prev!==key){rejected.push({q,reason:'same-question-assigned-to-different-topics',previousTopic:prev});continue;}
 seenText.set(tk,key); clean.push(q);
}
window.KPSS_BANK=clean;
const topicQuestionCounts={};
for(const [s,ts] of Object.entries(C)) for(const t of ts) topicQuestionCounts[s+'|'+t]=clean.filter(q=>q.subject===s&&q.topic===t).length;
window.KPSS_BANK_AUDIT={valid:true,phase:'pre-test-content-audit',topicCount:Object.values(C).reduce((n,x)=>n+x.length,0),total:clean.length,rejected:rejected.length,rejectedQuestions:rejected,topicQuestionCounts,version:'CONTENT-AUDIT-2026-01'};
})();
