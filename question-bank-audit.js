/* KPSS-Mobil — İÇERİK HAVUZU DENETİMİ / KONU KİLİDİ */
(function(){
'use strict';
const C=window.KPSS_CURRICULUM||{};const B=Array.isArray(window.KPSS_BANK)?window.KPSS_BANK:[];
const valid=new Set(Object.entries(C).flatMap(([s,ts])=>ts.map(t=>s+'|'+t)));
const rejected=[],clean=[],seen=new Map();
const normalize=s=>String(s||'').toLocaleLowerCase('tr-TR').replace(/[“”"']/g,'').replace(/\s+/g,' ').trim();
const textKey=q=>normalize(q.text).replace(/^kpss tarzı konu taramasında aşağıdaki soruya doğru cevap hangisidir\?\s*/,'').replace(/^bu konuya ilişkin aşağıdaki seçeneklerden hangisi doğrudur\?\s*/,'').replace(/^aşağıdaki soru için doğru seçeneği belirleyiniz:\s*/,'').replace(/^konu bilgisine göre aşağıdaki sorunun doğru cevabı hangisidir\?\s*/,'').replace(/\bvaryantı?\s*\d+\b/g,'').replace(/\s+/g,' ').trim();
const badPlaceholder=t=>/^(bu|aşağıdaki|bu konu|bu başlık).{0,80}(konu|başlık).{0,80}(doğru|bilgi|soru)/i.test(t)||t.includes('Diğer seçenek');
for(const q of B){
 if(!q)continue;
 const subject=String(q.subject||''),topic=String(q.topic||''),text=String(q.text||'').trim(),opts=Array.isArray(q.opts)?q.opts:[],a=Number(q.a),e=String(q.e||'').trim();
 const key=subject+'|'+topic;
 let reason='';
 if(!valid.has(key))reason='geçersiz konu';
 else if(!text)reason='soru metni boş';
 else if(opts.length!==5||opts.some(x=>!String(x??'').trim()))reason='5 geçerli seçenek yok';
 else if(!Number.isInteger(a)||a<0||a>4)reason='geçersiz doğru cevap indeksi';
 else if(!e)reason='çözüm/açıklama eksik';
 else if(badPlaceholder(text))reason='şablon/placeholder soru';
 const tk=textKey(q),prev=seen.get(tk);
 if(!reason&&prev&&prev!==key)reason='aynı soru birden fazla konuya atanmış';
 if(reason){rejected.push({q,reason,previousTopic:prev||null});continue;}
 seen.set(tk,key);clean.push(q);
}
window.KPSS_BANK=clean;
const topicQuestionCounts={},uniqueTopicCounts={},incompleteTopics=[];
for(const [s,ts] of Object.entries(C))for(const t of ts){
 const key=s+'|'+t,arr=clean.filter(q=>q.subject===s&&q.topic===t),uniq=new Set(arr.map(textKey));
 topicQuestionCounts[key]=arr.length;uniqueTopicCounts[key]=uniq.size;
 if(uniq.size<100)incompleteTopics.push({subject:s,topic:t,available:uniq.size,required:100,reason:'5 test x 20 benzersiz soru gerekli'});
}
window.KPSS_CONTENT_AUDIT={valid:!rejected.length&&!incompleteTopics.length,phase:'pre-test-content-audit',topicCount:Object.values(C).reduce((n,x)=>n+x.length,0),total:clean.length,rejected:rejected.length,rejectedQuestions:rejected,topicQuestionCounts,uniqueTopicCounts,incompleteTopics,version:'CONTENT-AUDIT-2026-4'};
})();
