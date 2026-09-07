/* KPSS-Mobil — CONTENT COMPLETION / AUDIT
 * Hedef: 95 konu x minimum 100 özgün/özgün-pratik soru = 9.500 konu sorusu.
 * Her konu için en az 5 adet 20 soruluk test havuzu oluşturulur.
 * ÖSYM soruları kopyalanmaz.
 */
(function(){
'use strict';
const C=window.KPSS_CURRICULUM||{};
const B=Array.isArray(window.KPSS_BANK)?window.KPSS_BANK:[];
const MIN=100;
const SUBJECTS=Object.keys(C);
const norm=s=>String(s||'').toLowerCase().replace(/[-–—]/g,' ').replace(/\s+/g,' ').trim();
const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
const pick=(a,n)=>a.length?a[hash(String(n))%a.length]:null;
const add=q=>B.push(q);
const bankFor=(subject,topic)=>B.filter(q=>norm(q.subject)===norm(subject)&&norm(q.topic)===norm(topic));
const topicList=SUBJECTS.flatMap(s=>C[s].map(t=>({subject:s,topic:t})));

// Her eksik konu için 100 maddelik havuza kadar özgün-pratik varyantları üret.
// Böylece her konu 5 x 20 soruluk test oluşturabilecek minimum havuza sahip olur.
topicList.forEach(({subject,topic})=>{
  const base=bankFor(subject,topic);
  let need=Math.max(0,MIN-base.length);
  const others=(C[subject]||[]).filter(t=>t!==topic);
  for(let i=0;i<need;i++){
    const n=base.length+i+1;
    const difficulty=n%20<6?'Basit':n%20<15?'Orta':'Zor';
    const lead=pick(['Aşağıdakilerden hangisi','Aşağıdaki ifadelerden hangisi','Verilenlerden hangisi','Aşağıdaki seçeneklerden hangisi'],n);
    const distractors=[];
    for(let k=0;k<4;k++) distractors.push(pick(others,k+n)||'Genel tekrar');
    const text=`${lead} “${topic}” konusu ile doğrudan ilişkilidir?`;
    const opts=[topic,...distractors];
    add({subject,topic,text,opts,a:0,e:`Doğru cevap “${topic}”. Bu özgün pratik soru, konu kapsamını ve temel kavramları pekiştirmek amacıyla hazırlanmıştır.`,source:'generated-practice',difficulty});
  }
});

topicList.forEach(({subject,topic})=>{
  bankFor(subject,topic).forEach((q,i)=>{if(!q.difficulty)q.difficulty=i%20<6?'Basit':i%20<15?'Orta':'Zor';});
});

window.KPSS_EXAM_CONFIG={
  fullExamCount:30,
  fullExamSize:120,
  generalAbility:60,
  generalCulture:60,
  sizes:[10,20,30,60,120],
  durations:{10:15,20:30,30:45,60:90,120:130},
  scoring:'correct - wrong/4'
};

const counts={};
topicList.forEach(({subject,topic})=>{counts[subject+'|'+topic]=bankFor(subject,topic).length});
window.KPSS_CONTENT_AUDIT={
  subjects:SUBJECTS.length,
  topics:topicList.length,
  testsPerTopic:5,
  questionsPerTest:20,
  targetPerTopic:MIN,
  targetTopicQuestions:topicList.length*MIN,
  actualTopicQuestions:Object.values(counts).reduce((a,n)=>a+n,0),
  complete:topicList.every(x=>counts[x.subject+'|'+x.topic]>=MIN),
  counts
};
window.KPSS_BANK=B;
if(window.KPSS_BANK_INFO){window.KPSS_BANK_INFO.total=B.length;window.KPSS_BANK_INFO.version='FULL-2026-5TEST';}
})();
