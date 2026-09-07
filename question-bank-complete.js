/* KPSS-Mobil — doğrulanmış içeriklerden konu testleri
 * Yapay varyant / aynı sorunun tekrarından test üretilmez.
 * Hedef: konu başına 10 test × 20 = 200 benzersiz soru.
 */
(function(){
'use strict';
const C=window.KPSS_CURRICULUM||{};
const B=Array.isArray(window.KPSS_BANK)?window.KPSS_BANK:[];
const TEST_SIZE=20,TEST_COUNT=10,MIN=TEST_SIZE*TEST_COUNT;
const norm=s=>String(s||'').toLocaleLowerCase('tr-TR').replace(/[“”"']/g,'').replace(/[-–—]/g,' ').replace(/\s+/g,' ').trim();
const cleanText=s=>norm(s).replace(/^kpss tarzı konu taramasında aşağıdaki soruya doğru cevap hangisidir\?\s*/,'').replace(/^bu konuya ilişkin aşağıdaki seçeneklerden hangisi doğrudur\?\s*/,'').replace(/^aşağıdaki soru için doğru seçeneği belirleyiniz:\s*/,'').replace(/^konu bilgisine göre aşağıdaki sorunun doğru cevabı hangisidir\?\s*/,'').replace(/^aşağıdaki seçeneklerden hangisi soruda verilen bilgiyle doğru biçimde eşleşir\?\s*/,'').replace(/^kpss hazırlığında bu soruyu çözerken doğru seçenek hangisidir\?\s*/,'').replace(/^aşağıdaki ifadelerden hangisi sorunun doğru cevabını verir\?\s*/,'').replace(/^verilen soru için en doğru seçenek aşağıdakilerden hangisidir\?\s*/,'').replace(/^konu tekrarında aşağıdaki sorunun doğru cevabı hangisidir\?\s*/,'').replace(/^aşağıdaki seçeneklerden hangisi verilen soruyu doğru yanıtlar\?\s*/,'').replace(/\s+/g,' ').trim();
const topics=Object.keys(C).flatMap(subject=>(C[subject]||[]).map(topic=>({subject,topic})));
for(let i=B.length-1;i>=0;i--) if(B[i]&&B[i].source==='generated-practice') B.splice(i,1);
function uniqueOriginals(subject,topic){
 const seen=new Set();
 return B.filter(q=>norm(q.subject)===norm(subject)&&norm(q.topic)===norm(topic)&&q.source!=='generated-practice'&&Array.isArray(q.opts)&&q.opts.length===5&&Number.isInteger(Number(q.a))&&Number(q.a)>=0&&Number(q.a)<5&&String(q.text||'').trim()).filter(q=>{const key=cleanText(q.text);if(seen.has(key))return false;seen.add(key);return true;});
}
const counts={},incompleteTopics=[],readyTopics=[];
topics.forEach(({subject,topic})=>{const originals=uniqueOriginals(subject,topic),key=subject+'|'+topic;counts[key]=originals.length;if(originals.length<MIN){incompleteTopics.push({subject,topic,available:originals.length,required:MIN,reason:'10 benzersiz test x 20 soru gerekli'});return;}readyTopics.push(key);originals.slice(0,MIN).forEach((q,i)=>{q.testNo=Math.floor(i/TEST_SIZE)+1;q.questionNo=i%TEST_SIZE+1;});});
window.KPSS_TOPIC_TESTS={};
topics.forEach(({subject,topic})=>{const key=subject+'|'+topic,originals=uniqueOriginals(subject,topic).slice(0,MIN);window.KPSS_TOPIC_TESTS[key]=originals.length>=MIN?Array.from({length:TEST_COUNT},(_,i)=>originals.slice(i*TEST_SIZE,(i+1)*TEST_SIZE)):[];});
window.KPSS_EXAM_CONFIG={fullExamCount:60,fullExamSize:120,generalAbility:60,generalCulture:60,sizes:[10,20,30,60,120],durations:{10:15,20:30,30:45,60:90,120:130},scoring:'correct - wrong/4'};
window.KPSS_CONTENT_AUDIT={subjects:Object.keys(C).length,topics:topics.length,testsPerTopic:TEST_COUNT,questionsPerTest:TEST_SIZE,targetPerTopic:MIN,targetTopicQuestions:topics.length*MIN,actualTopicQuestions:readyTopics.length*MIN,complete:incompleteTopics.length===0,readyTopics,incompleteTopics,counts,version:'CONTENT-LOCK-10TEST-2026-1'};
window.KPSS_BANK=B;if(window.KPSS_BANK_INFO){window.KPSS_BANK_INFO.total=B.length;window.KPSS_BANK_INFO.version='CONTENT-LOCK-UNIQUE-10TEST';}
})();
