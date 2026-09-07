/* KPSS-Mobil — BANKA KALİTE / KONU KİLİDİ */
(function(){
'use strict';
const C=window.KPSS_CURRICULUM||{};
const B=Array.isArray(window.KPSS_BANK)?window.KPSS_BANK:[];
const valid=new Set(Object.entries(C).flatMap(([s,ts])=>ts.map(t=>s+'|'+t)));
const clean=[]; const rejected=[]; const seen=new Set();
for(const q of B){
  if(!q) continue;
  const key=String(q.subject)+'|'+String(q.topic);
  const opts=Array.isArray(q.opts)?q.opts:[];
  const a=Number(q.a);
  if(!valid.has(key)||opts.length!==5||!Number.isInteger(a)||a<0||a>4||!String(q.text||'').trim()){
    rejected.push(q); continue;
  }
  if(q.source==='generated-practice' && q.testNo && q.questionNo){
    const testKey=key+'|T'+q.testNo+'|Q'+q.questionNo;
    if(seen.has(testKey)) continue;
    seen.add(testKey);
  }
  clean.push(q);
}
window.KPSS_BANK=clean;
window.KPSS_BANK_AUDIT={valid:true,total:clean.length,rejected:rejected.length,rejectedQuestions:rejected,topicCount:Object.values(C).reduce((n,x)=>n+x.length,0),topicQuestionCounts:Object.fromEntries(Object.entries(C).flatMap(([s,ts])=>ts.map(t=>{const n=clean.filter(q=>q.subject===s&&q.topic===t).length;return [s+'|'+t,n];}))),rule:'subject/topic must exist in 153-topic matrix; 5 options; one answer index 0-4; generated tests are topic-locked.'};
})();
