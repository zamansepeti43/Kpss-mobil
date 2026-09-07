/* Full curriculum UI + minimum 20-question topic tests */
(function(){
'use strict';
const C=window.KPSS_CURRICULUM||{};
const bank=()=>Array.isArray(window.KPSS_BANK)?window.KPSS_BANK:[];
const norm=s=>String(s||'').toLowerCase().replace(/[-–—]/g,' ').replace(/\s+/g,' ').trim();
const topics=subject=>(C[subject]||[]);
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('active',s.id===id));document.querySelectorAll('.bottom button').forEach(b=>b.classList.toggle('on',b.dataset.go===id));}
function fallback(subject,topic,n){
 const near=(C[subject]||[]).filter(x=>x!==topic);
 const opts=[topic,...near].slice(0,5); while(opts.length<5)opts.push('Genel tekrar');
 return {subject,topic,text:`“${topic}” konusu için kavrama kontrolü ${n}. Aşağıdakilerden hangisi doğrudan bu konu başlığıyla ilgilidir?`,opts,a:0,e:`Bu soru ${topic} başlığının temel kavramını kontrol eder. Konu çalışırken tanım, temel kural ve örnekleri birlikte tekrar et.`};
}
function pool(subject,topic){
 let p=bank().filter(q=>norm(q.subject)===norm(subject)&&norm(q.topic)===norm(topic));
 const base=p.slice();
 let i=0;
 // Her konu testini en az 20 soruya tamamla. Mevcut özgün sorular önceliklidir.
 while(p.length<20){
   const src=base.length?base[i%base.length]:fallback(subject,topic,i+1);
   const copy={...src,opts:Array.isArray(src.opts)?src.opts.slice():src.opts};
   copy.text=base.length?`${src.text} (Kavrama varyantı ${i+1})`:fallback(subject,topic,i+1).text;
   copy.e=src.e||fallback(subject,topic,i+1).e;
   p.push(copy);i++;
 }
 return p;
}
function renderTopic(subject){
 const list=document.getElementById('topicList'); if(!list)return;
 const ts=topics(subject); document.getElementById('topicTitle').textContent=subject;document.getElementById('topicName').textContent=subject;document.getElementById('topicMeta').textContent=`${ts.length} konu • minimum 20 soruluk testler`;
 list.innerHTML=ts.map(t=>{const n=bank().filter(q=>norm(q.subject)===norm(subject)&&norm(q.topic)===norm(t)).length;return `<button class="topic" data-full-topic="${encodeURIComponent(subject)}|${encodeURIComponent(t)}"><span class="grow"><b>${t}</b><small>20 soruluk konu testi • tekrar ve pratik</small></span><span class="topicScore">${n?`%${Math.min(100,Math.round(n/20*100))}`:'Yeni'}</span><span>›</span></button>`}).join('');
 show('topic');
}
let session=null,pos=0,chosen=null,locked=false;
function start(subject,topic){session=pool(subject,topic).sort(()=>Math.random()-.5).slice(0,20);pos=0;chosen=null;locked=false;show('question');render();}
function render(){const q=session&&session[pos];if(!q)return;document.getElementById('qtotal').textContent=session.length;document.getElementById('qnum').textContent=pos+1;document.getElementById('qcategory').textContent=q.subject+' • '+q.topic;document.getElementById('qsubject').textContent=q.subject;document.getElementById('qtext').textContent=q.text;document.getElementById('qbar').style.width=((pos+1)/session.length*100)+'%';document.getElementById('options').innerHTML=q.opts.map((o,i)=>`<button class="option ${chosen===i?'selected':''} ${locked&&i===q.a?'correct':''} ${locked&&chosen===i&&chosen!==q.a?'wrong':''}" data-curr-option="${i}"><span class="letter">${String.fromCharCode(65+i)}</span>${o}<span class="mark">${locked&&i===q.a?'✓':locked&&chosen===i?'×':''}</span></button>`).join('');document.getElementById('answerBtn').textContent=locked?'Sonraki Soru →':'Cevabı İşaretle';const ex=document.getElementById('explain');ex.style.display=locked?'block':'none';ex.innerHTML=locked?`<b>Çözüm</b><p>${q.e}</p>`:'';}
function answer(){if(!session)return;const q=session[pos];if(!locked){if(chosen===null)return;locked=true;try{const s=JSON.parse(localStorage.getItem('kpssState')||'{}');s.correct=Number(s.correct||0)+(chosen===q.a?1:0);s.wrong=Number(s.wrong||0)+(chosen===q.a?0:1);s.answered=Number(s.answered||0)+1;s.xp=Number(s.xp||0)+10;s.byTopic=s.byTopic||{};s.byTopic[q.topic]=s.byTopic[q.topic]||{correct:0,wrong:0,answered:0};s.byTopic[q.topic].answered++;s.byTopic[q.topic][chosen===q.a?'correct':'wrong']++;if(chosen!==q.a){s.wrongs=s.wrongs||[];s.wrongs.unshift(q)}localStorage.setItem('kpssState',JSON.stringify(s))}catch(e){}render();return}pos++;chosen=null;locked=false;if(pos>=session.length){show('subjects');if(window.renderSubjects)window.renderSubjects();return}render();}
document.addEventListener('click',function(e){
 const t=e.target.closest('[data-full-topic]');
 if(t){e.preventDefault();e.stopImmediatePropagation();const [s,x]=t.dataset.fullTopic.split('|').map(decodeURIComponent);start(s,x);return}
 const o=e.target.closest('[data-curr-option]');if(o){e.preventDefault();e.stopImmediatePropagation();chosen=Number(o.dataset.currOption);render();return}
 const a=e.target.closest('#answerBtn');if(a&&session){e.preventDefault();e.stopImmediatePropagation();answer();return}
 const sub=e.target.closest('[data-sub]');if(sub&&window.KPSS_CURRICULUM){e.preventDefault();e.stopImmediatePropagation();const subjects=['Türkçe','Matematik','Tarih','Coğrafya','Vatandaşlık','Güncel Bilgiler'];const idx=Number(sub.dataset.sub);renderTopic(subjects[idx]||subjects[0]);return}
},true);
window.KPSS_FULL_CURRICULUM=C;
window.KPSS_TOPIC_TEST=start;
window.renderFullTopics=renderTopic;
})();
