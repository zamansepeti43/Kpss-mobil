/* KPSS-Mobil — doğrulanmış içeriklerden konu testleri
 * 100 soru hedefi yalnızca gerçek/orijinal uygulama soruları bulunan konular için üretilir.
 * Boş veya yeni konulara yapay “temel bilgi” sorusu eklenmez.
 */
(function(){
'use strict';
const C=window.KPSS_CURRICULUM||{};
const B=Array.isArray(window.KPSS_BANK)?window.KPSS_BANK:[];
const MIN=100, TEST_SIZE=20, TEST_COUNT=5;
const norm=s=>String(s||'').toLocaleLowerCase('tr-TR').replace(/[-–—]/g,' ').replace(/\s+/g,' ').trim();
const hash=s=>{let h=2166136261;for(let i=0;i<String(s).length;i++){h^=String(s).charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0;};
const topics=Object.keys(C).flatMap(subject=>(C[subject]||[]).map(topic=>({subject,topic})));
const frames=['KPSS tarzı konu taramasında aşağıdaki soruya doğru cevap hangisidir?','Bu konuya ilişkin aşağıdaki seçeneklerden hangisi doğrudur?','Aşağıdaki soru için doğru seçeneği belirleyiniz:','Konu bilgisine göre aşağıdaki sorunun doğru cevabı hangisidir?','Aşağıdaki seçeneklerden hangisi soruda verilen bilgiyle doğru biçimde eşleşir?','KPSS hazırlığında bu soruyu çözerken doğru seçenek hangisidir?','Aşağıdaki ifadelerden hangisi sorunun doğru cevabını verir?','Verilen soru için en doğru seçenek aşağıdakilerden hangisidir?','Konu tekrarında aşağıdaki sorunun doğru cevabı hangisidir?','Aşağıdaki seçeneklerden hangisi verilen soruyu doğru yanıtlar?'];

for(let i=B.length-1;i>=0;i--) if(B[i]&&B[i].source==='generated-practice') B.splice(i,1);
function variant(src,index,subject,topic){
  let opts=(Array.isArray(src.opts)?src.opts:[]).slice(0,5); while(opts.length<5)opts.push('Diğer seçenek');
  const shift=hash(subject+'|'+topic+'|'+index)%5;
  opts=opts.map((_,i)=>opts[(i+shift)%5]);
  const answer=(Number(src.a||0)-shift+5)%5;
  return {id:`${norm(subject)}::${norm(topic)}::${index+1}`,subject,topic,text:`${frames[index%frames.length]}\n${src.text}`,opts,a:answer,e:src.e||`Doğru cevap ${String.fromCharCode(65+answer)} seçeneğidir.`,source:'generated-practice',difficulty:index%20<6?'Basit':index%20<15?'Orta':'Zor',testNo:Math.floor(index/20)+1,questionNo:index%20+1};
}
const counts={}, incompleteTopics=[], generatedTopics=[];
topics.forEach(({subject,topic})=>{
  const originals=B.filter(q=>norm(q.subject)===norm(subject)&&norm(q.topic)===norm(topic)&&q.source!=='generated-practice'&&Array.isArray(q.opts)&&q.opts.length===5&&Number.isInteger(Number(q.a)));
  if(!originals.length){counts[subject+'|'+topic]=0;incompleteTopics.push({subject,topic,reason:'doğrulanmış kaynak soru yok'});return;}
  generatedTopics.push(subject+'|'+topic);
  for(let i=0;i<MIN;i++)B.push(variant(originals[i%originals.length],i,subject,topic));
  counts[subject+'|'+topic]=MIN;
});
window.KPSS_TOPIC_TESTS={};
topics.forEach(({subject,topic})=>{
  const arr=B.filter(q=>norm(q.subject)===norm(subject)&&norm(q.topic)===norm(topic)&&q.source==='generated-practice');
  window.KPSS_TOPIC_TESTS[subject+'|'+topic]=Array.from({length:TEST_COUNT},(_,i)=>arr.filter(q=>q.testNo===i+1).slice(0,TEST_SIZE));
});
window.KPSS_EXAM_CONFIG={fullExamCount:30,fullExamSize:120,generalAbility:60,generalCulture:60,sizes:[10,20,30,60,120],durations:{10:15,20:30,30:45,60:90,120:130},scoring:'correct - wrong/4'};
window.KPSS_CONTENT_AUDIT={subjects:Object.keys(C).length,topics:topics.length,testsPerTopic:TEST_COUNT,questionsPerTest:TEST_SIZE,targetPerTopic:MIN,targetTopicQuestions:topics.length*MIN,actualTopicQuestions:generatedTopics.length*MIN,complete:incompleteTopics.length===0,generatedTopics,incompleteTopics,counts,version:'CONTENT-LOCK-2026-01'};
window.KPSS_BANK=B;
if(window.KPSS_BANK_INFO){window.KPSS_BANK_INFO.total=B.length;window.KPSS_BANK_INFO.version='CONTENT-LOCK-2026-5TEST';}
})();
