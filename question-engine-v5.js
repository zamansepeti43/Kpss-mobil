/* KPSS-Mobil v5 — adaptive full bank + real stats + exam sizes */
(function(){
'use strict';
const seed=Array.isArray(window.KPSS_BANK)?window.KPSS_BANK.slice():[];
const bank=seed.slice();
const add=(s,t,text,opts,a,e)=>bank.push({subject:s,topic:t,text,opts,a,e});
const opts=(a,b,c,d,e)=>[a,b,c,d,e];
// Deterministic quantitative bank: many unique questions, all with checked answers.
for(let n=2;n<=51;n++){
 add('Matematik','Temel Kavramlar',`${n}+${n*2} kaçtır?`,opts(String(n*2),String(n*3),String(n*4),String(n*5),String(n*6)),1,`${n}+${n*2}=${n*3}.`);
 add('Matematik','Temel Kavramlar',`${n*3}-${n} kaçtır?`,opts(String(n),String(n+1),String(n*2),String(n*3),String(n*4)),2,`${n*3}-${n}=${n*2}.`);
 add('Matematik','Sayılar',`${n} sayısının 2 katının 3 fazlası kaçtır?`,opts(String(n*2),String(n*2+2),String(n*2+3),String(n*3),String(n*3+3)),2,`2×${n}+3=${n*2+3}.`);
}
for(let n=5;n<=54;n++){
 const p=n*20;
 add('Matematik','Problemler',`${p} TL'nin %${n%2?10:25} indirimi sonrası fiyatı kaç TL'dir?`,n%2?opts(String(p-10*p/100),String(p-15*p/100),String(p-10*p/100+10),String(p-20*p/100),String(p)):[String(p*0.75),String(p*0.8),String(p*0.7),String(p*0.65),String(p*0.9)],n%2?0:0,n%2?`%10 indirim sonrası ${p*0.9} TL olur.`:`%25 indirim sonrası ${p*0.75} TL olur.`);
}
for(let n=3;n<=32;n++){
 const area=n*(n+2);
 add('Matematik','Geometri',`Kenarları ${n} cm ve ${n+2} cm olan dikdörtgenin alanı kaç cm²dir?`,opts(String(area-2),String(area),String(area+2),String((n+n+2)*2),String(area+10)),1,`Alan=${n}×${n+2}=${area} cm².`);
 add('Matematik','Oran Orantı',`${n} kalem ${n*7} TL ise bir kalem kaç TL'dir?`,opts(String(5),String(6),String(7),String(8),String(9)),2,`${n*7}÷${n}=7 TL.`);
}
const history=[
 ['Tarih','Atatürk İlkeleri','Egemenliğin kayıtsız şartsız millete ait olmasını esas alan ilke hangisidir?',['Devletçilik','Cumhuriyetçilik','Laiklik','Halkçılık','İnkılapçılık'],1,'Cumhuriyetçilik milli egemenlik anlayışını temel alır.'],
 ['Tarih','Milli Mücadele','Misak-ı Milli kararları hangi mecliste kabul edilmiştir?',['TBMM','Son Osmanlı Mebusan Meclisi','Temsil Heyeti','Erzurum Kongresi','Sivas Kongresi'],1,'Misak-ı Milli kararları Son Osmanlı Mebusan Meclisinde kabul edilmiştir.'],
 ['Tarih','Osmanlı Devleti','Osmanlı Devleti’nde ilk Türk matbaasını kuran kişi kimdir?',['İbrahim Müteferrika','Katip Çelebi','Evliya Çelebi','Piri Reis','Takiyüddin'],0,'İbrahim Müteferrika ve Said Efendi ilk Türk matbaasını kurmuştur.'],
 ['Tarih','Türk Kültür ve Medeniyetleri','Divanü Lügati’t-Türk adlı eser kime aittir?',['Yusuf Has Hacip','Kaşgarlı Mahmut','Nizamülmülk','Ahmet Yesevi','Ali Şir Nevai'],1,'Eser Kaşgarlı Mahmut tarafından yazılmıştır.'],
 ['Tarih','Cumhuriyet Dönemi','Halifelik hangi tarihte kaldırılmıştır?',['1 Kasım 1922','29 Ekim 1923','3 Mart 1924','10 Nisan 1928','5 Şubat 1937'],2,'Halifelik 3 Mart 1924 tarihinde kaldırılmıştır.']
];
history.forEach(x=>add(x[0],x[1],x[2],x[3],x[4],x[5]));
const geo=[
 ['Coğrafya','Türkiye Fiziki Coğrafyası','Türkiye’nin yüz ölçümü bakımından en büyük bölgesi hangisidir?',['Marmara','Doğu Anadolu','Ege','Karadeniz','Akdeniz'],1,'Yüz ölçümü bakımından en büyük bölge Doğu Anadolu’dur.'],
 ['Coğrafya','Ekonomik Coğrafya','Türkiye’de zeytin üretimi en çok hangi kıyı kuşağında yaygındır?',['Karadeniz','Marmara ve Ege','Doğu Anadolu','İç Anadolu','Güneydoğu Anadolu'],1,'Zeytin özellikle Ege ve Marmara’nın uygun kıyı kesimlerinde yetiştirilir.'],
 ['Coğrafya','Nüfus ve Yerleşme','Kırdan kente göçün temel sonuçlarından biri hangisidir?',['Kent nüfusunun artması','Kırsal nüfusun artması','Sanayinin tamamen bitmesi','Tarım alanlarının genişlemesi','Nüfusun ülke dışına çıkması'],0,'Kırdan kente göç kent nüfusunu artırır.'],
 ['Coğrafya','İklim','Karadeniz ikliminin doğal bitki örtüsü genel olarak nedir?',['Bozkır','Maki','Orman','Çöl','Savan'],2,'Yağışın fazla olduğu Karadeniz’de ormanlar yaygındır.']
];
geo.forEach(x=>add(x[0],x[1],x[2],x[3],x[4],x[5]));
const civ=[
 ['Vatandaşlık','Anayasa','Temel hak ve özgürlüklerin sınırlanmasında hangi ilke gözetilir?',['Keyfilik','Ölçülülük','Sınırsızlık','Gizlilik','Devredilmezlik'],1,'Hak sınırlamalarında ölçülülük ilkesi gözetilir.'],
 ['Vatandaşlık','Yasama','TBMM’nin bilgi edinme ve denetim yollarından biri hangisidir?',['Soru','Ferman','Nişan','Kararname','Vesayet'],0,'Meclis soru, araştırma, genel görüşme, soruşturma ve diğer anayasal yolları kullanır.'],
 ['Vatandaşlık','Yürütme','Cumhurbaşkanlığı kararnamesi hangi alanda çıkarılamaz?',['Temel hakların düzenlenmesi gereken alanlarda','Yürütmeye ilişkin bazı alanlarda','İdari konularda','Yürütme görevleriyle ilgili alanlarda','Anayasanın izin verdiği konularda'],0,'Anayasa, bazı temel hak alanlarında Cumhurbaşkanlığı kararnamesini sınırlar.'],
 ['Vatandaşlık','Yargı','Yargı yetkisi Türk Milleti adına kim tarafından kullanılır?',['TBMM','Bağımsız ve tarafsız mahkemeler','Cumhurbaşkanı','Bakanlıklar','Valilikler'],1,'Yargı yetkisi bağımsız ve tarafsız mahkemelerce kullanılır.']
];
civ.forEach(x=>add(x[0],x[1],x[2],x[3],x[4],x[5]));
const tr=[
 ['Türkçe','Sözcükte Anlam','“İnce davranışlarıyla herkesin gönlünü kazandı.” cümlesinde “ince” sözcüğü hangi anlamdadır?',['Gerçek','Mecaz','Terim','Somut','Nicel'],1,'Burada fiziksel incelik değil, nazik ve düşünceli davranış anlamı vardır.'],
 ['Türkçe','Cümlede Anlam','“Bu sonuç beklediğimden daha iyi.” cümlesinde hangi anlam ilişkisi vardır?',['Karşılaştırma','Koşul','Amaç','Neden','Varsayım'],0,'“Daha iyi” ifadesi karşılaştırma yapar.'],
 ['Türkçe','Paragraf','Bir paragrafta düşüncenin sayılarla desteklenmesine ne denir?',['Tanımlama','Örneklendirme','Sayısal verilerden yararlanma','Tanık gösterme','Benzetme'],2,'İstatistik ve sayılardan yararlanmak sayısal verilerden yararlanmadır.'],
 ['Türkçe','Yazım Kuralları','Aşağıdakilerden hangisi doğru yazılmıştır?',['hiç bir','birkaç','pek çok','herkez','yanlız'],1,'“Birkaç” bitişik yazılır.']
];
tr.forEach(x=>add(x[0],x[1],x[2],x[3],x[4],x[5]));
window.KPSS_BANK=bank;
window.KPSS_BANK_INFO={total:bank.length,version:'5.0.0',subjects:[...new Set(bank.map(q=>q.subject))],topics:[...new Set(bank.map(q=>q.topic))]};
const key=q=>q.subject+'|'+q.topic+'|'+q.text;
const unique=[];const seen=new Set();bank.forEach(q=>{if(!seen.has(key(q))){seen.add(key(q));unique.push(q)}});
const state=()=>{try{return JSON.parse(localStorage.getItem('kpssState')||'{}')}catch{return {}}};
const save=s=>localStorage.setItem('kpssState',JSON.stringify(s));
let pool=[],pos=0,selected=null,locked=false,timer=null,exam=null;
function shuffled(a){return a.slice().sort(()=>Math.random()-.5)}
function startPool(filter){pool=shuffled(unique.filter(filter||(()=>true)));if(pool.length<10)pool=shuffled(unique);pool=pool.slice(0,Math.min(20,pool.length));pos=0;selected=null;locked=false;renderQ();startTimer(90)}
function renderQ(){const q=pool[pos];if(!q)return;document.getElementById('qtotal').textContent=pool.length;document.getElementById('qnum').textContent=pos+1;document.getElementById('qcategory').textContent=q.subject+' • '+q.topic;document.getElementById('qsubject').textContent=q.subject;document.getElementById('qtext').textContent=q.text;document.getElementById('qbar').style.width=((pos+1)/pool.length*100)+'%';document.getElementById('options').innerHTML=q.opts.map((o,i)=>`<button class="option ${selected===i?'selected':''} ${locked&&i===q.a?'correct':''} ${locked&&selected===i&&i!==q.a?'wrong':''}" data-v5-option="${i}"><span class="letter">${String.fromCharCode(65+i)}</span>${o}<span class="mark">${locked&&i===q.a?'✓':locked&&selected===i?'×':''}</span></button>`).join('');document.getElementById('answerBtn').textContent=locked?'Sonraki Soru →':'Cevabı İşaretle';const ex=document.getElementById('explain');ex.style.display=locked?'block':'none';ex.innerHTML=locked?`<b>Çözüm</b><p>${q.e}</p>`:''}
function startTimer(sec){clearInterval(timer);let left=sec;const out=document.getElementById('timer');if(out)out.textContent='01:30';timer=setInterval(()=>{left--;if(out)out.textContent=String(Math.floor(left/60)).padStart(2,'0')+':'+String(left%60).padStart(2,'0');if(left<=0){clearInterval(timer);locked=true;renderQ()}},1000)}
function answer(){if(!pool[pos])return;if(!locked){if(selected===null){alert('Önce bir seçenek işaretle.');return}locked=true;const s=state();s.correct=Number(s.correct||0);s.wrong=Number(s.wrong||0);s.answered=Number(s.answered||0)+1;s.xp=Number(s.xp||0)+10;s.bySubject=s.bySubject||{};s.byTopic=s.byTopic||{};const q=pool[pos],ok=selected===q.a;s[ok?'correct':'wrong']++;s.bySubject[q.subject]=s.bySubject[q.subject]||{correct:0,wrong:0,answered:0};s.bySubject[q.subject][ok?'correct':'wrong']++;s.bySubject[q.subject].answered++;s.byTopic[q.topic]=s.byTopic[q.topic]||{correct:0,wrong:0,answered:0};s.byTopic[q.topic][ok?'correct':'wrong']++;s.byTopic[q.topic].answered++;if(!ok){s.wrongs=s.wrongs||[];s.wrongs.unshift(q)}save(s);renderQ();return}pos++;selected=null;locked=false;if(pos>=pool.length){pos=0;alert('Soru seti tamamlandı. Yeni set başlatıldı.')}renderQ()}
function examStart(size){const q=shuffled(unique);const arr=[];for(let i=0;i<size;i++)arr.push(q[i%q.length]);exam={size,arr,answers:Array(size).fill(null),pos:0,start:Date.now()};showExam();}
function showExam(){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('active',s.id==='examrun'));const e=exam,q=e.arr[e.pos];document.getElementById('examNumbers').innerHTML=e.arr.map((_,i)=>`<span class="${i===e.pos?'current':''} ${e.answers[i]!==null?'done':''}" data-v5-jump="${i}">${i+1}</span>`).join('');document.getElementById('examQnum').textContent=e.pos+1;document.getElementById('examQtext').textContent=q.text;document.getElementById('examOptions').innerHTML=q.opts.map((o,i)=>`<button class="option ${e.answers[e.pos]===i?'selected':''}" data-v5-exam="${i}"><span class="letter">${String.fromCharCode(65+i)}</span>${o}</button>`).join('');const c=e.answers.reduce((n,a,i)=>n+(a!==null&&a===e.arr[i].a),0),w=e.answers.reduce((n,a,i)=>n+(a!==null&&a!==e.arr[i].a),0);document.getElementById('examCorrect').textContent=c;document.getElementById('examWrong').textContent=w;document.getElementById('examBlank').textContent=e.size-c-w;document.getElementById('examrun').querySelector('.qmeta').innerHTML=`Soru <b>${e.pos+1}</b> / ${e.size}`}
function finish(){const e=exam,c=e.answers.reduce((n,a,i)=>n+(a!==null&&a===e.arr[i].a),0),w=e.answers.reduce((n,a,i)=>n+(a!==null&&a!==e.arr[i].a),0),b=e.size-c-w;const s=state();s.correct=Number(s.correct||0)+c;s.wrong=Number(s.wrong||0)+w;s.answered=Number(s.answered||0)+e.size;s.xp=Number(s.xp||0)+e.size*8;save(s);document.getElementById('resultNet').textContent=(c-w/4).toFixed(2).replace('.',',');document.getElementById('rCorrect').textContent=c;document.getElementById('rWrong').textContent=w;document.getElementById('rBlank').textContent=b;document.getElementById('rSuccess').textContent='%'+Math.round(c/e.size*100);document.getElementById('rTime').textContent=Math.max(1,Math.round((Date.now()-e.start)/60000))+' dk';document.querySelectorAll('.screen').forEach(x=>x.classList.toggle('active',x.id==='result'));}
window.renderQuestion=function(){if(!pool.length)startPool()};
window.renderExams=function(){document.getElementById('examList').innerHTML=[[10,'15 dk','Hızlı Test'],[20,'30 dk','Standart Deneme'],[30,'45 dk','Yoğun Deneme'],[60,'90 dk','Tam Performans'],[120,'120 dk','Tam KPSS']].map(x=>`<button class="examrow v5exam" data-v5-size="${x[0]}"><span class="eico">▣</span><b>${x[2]}<small>${x[0]} Soru</small></b><small>${x[1]}</small><span>›</span></button>`).join('')};
window.renderStats=function(){const s=state(),total=Number(s.answered||0),correct=Number(s.correct||0);document.getElementById('totalQ').textContent=total;document.getElementById('success').textContent='%'+(total?Math.round(correct/total*100):0);document.getElementById('net').textContent=(correct-Number(s.wrong||0)/4).toFixed(1).replace('.',',');const rows=document.querySelectorAll('#stats .barrow');rows.forEach(r=>{const subject=r.querySelector('span')?.textContent;const d=s.bySubject?.[subject];const pct=d?.answered?Math.round(d.correct/d.answered*100):0;r.querySelector('em').style.width=pct+'%';r.querySelector('b').textContent='%'+pct})};
window.renderWrongs=function(){const s=state(),l=document.getElementById('wrongList');const w=s.wrongs||[];l.innerHTML=w.length?w.slice(0,100).map((q,i)=>`<section class="card" style="margin-bottom:9px"><small>${q.subject} • ${q.topic}</small><h3 style="font-size:12px;line-height:1.5">${q.text}</h3><p class="muted">Doğru cevap: ${q.opts[q.a]}</p></section>`).join(''):'<section class="card"><b>Harika! 🎉</b><p class="muted">Henüz yanlış kaydın yok.</p></section>'};
document.addEventListener('click',function(e){const o=e.target.closest('[data-v5-option]');if(o){selected=+o.dataset.v5Option;renderQ();return}if(e.target.closest('#answerBtn')){answer();return}const ex=e.target.closest('[data-v5-exam]');if(ex&&exam){exam.answers[exam.pos]=+ex.dataset.v5Exam;showExam();return}const j=e.target.closest('[data-v5-jump]');if(j&&exam){exam.pos=+j.dataset.v5Jump;showExam();return}const sz=e.target.closest('[data-v5-size]');if(sz){document.querySelectorAll('.v5exam').forEach(x=>x.classList.remove('selected'));sz.classList.add('selected');window.__v5ExamSize=+sz.dataset.v5Size;return}if(e.target.closest('[data-action="startExam"]')){examStart(window.__v5ExamSize||10);return}if(e.target.closest('[data-action="examNext"]')){if(exam){if(exam.pos<exam.size-1){exam.pos++;showExam()}else finish()}return}if(e.target.closest('[data-action="examPrev"]')){if(exam&&exam.pos>0){exam.pos--;showExam()}return}},true);
window.KPSS_V5={bank:unique,total:unique.length};
})();
