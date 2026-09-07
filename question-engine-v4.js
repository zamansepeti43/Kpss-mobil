/* KPSS-Mobil v4 — production question flow, adaptive bank, exam, stats and wrongs */
(function(){
'use strict';
const old=Array.isArray(window.KPSS_BANK)?window.KPSS_BANK:[];
const Q=(subject,topic,text,opts,a,e)=>({subject,topic,text,opts,a,e});
const g=[];
function add(s,t,items){items.forEach(x=>g.push(Q(s,t,x[0],x[1],x[2],x[3])))}
add('Matematik','Temel Kavramlar',[
['12+18÷3 kaçtır?',['16','18','20','22','24'],2,'İşlem önceliğinde bölme önce yapılır: 18÷3=6, 12+6=18.'],
['5²-3² kaçtır?',['12','14','16','18','20'],1,'25-9=16.'],
['Bir sayının 3 katının 4 fazlası 25 ise sayı kaçtır?',['5','6','7','8','9'],2,'3x+4=25 olduğundan x=7.'],
['2, 4, 8, 16, ? dizisinde sonraki sayı nedir?',['20','24','28','32','36'],3,'Her adımda sayı 2 ile çarpılıyor.']]);
add('Matematik','Problemler',[
['Bir ürün 400 TL iken %25 indirim yapılırsa satış fiyatı kaç TL olur?',['250','275','300','325','350'],2,'%25 indirim 100 TL olduğundan fiyat 300 TL olur.'],
['Bir araç saatte 60 km hızla 3 saatte kaç km gider?',['120','150','180','210','240'],2,'Yol=hız×zaman=60×3=180 km.'],
['Bir sınıfta 24 öğrencinin 3/8’i kızdır. Kaç kız öğrenci vardır?',['6','8','9','10','12'],2,'24×3/8=9.'],
['Bir iş 6 kişiyle 10 günde bitiyor. Aynı hızla 12 kişi kaç günde bitirir?',['3','4','5','6','8'],2,'Kişi sayısı iki katına çıkınca süre yarıya iner: 5 gün.'],
['Bir sayının %20’si 18 ise sayının tamamı kaçtır?',['72','80','90','100','120'],2,'18÷0,20=90.'],
['Bir depoda 120 litre suyun 35 litresi kullanılıyor. Kaç litre kalır?',['75','80','85','90','95'],2,'120-35=85.']]);
add('Matematik','Oran Orantı',[
['3 kalem 45 TL ise aynı kalemlerden 7 tanesi kaç TL olur?',['90','95','100','105','110'],3,'Birim fiyat 15 TL, 7 kalem 105 TL.'],
['4 işçi bir işi 12 günde yapıyorsa aynı koşullarda 6 işçi kaç günde yapar?',['6','8','9','10','12'],1,'4×12=48 işçi-gün; 48÷6=8 gün.'],
['2/5’i 14 olan sayı kaçtır?',['25','30','35','40','45'],2,'14×5÷2=35.']]);
add('Matematik','Geometri',[
['Karenin bir kenarı 7 cm ise çevresi kaç cm’dir?',['14','21','28','35','49'],2,'Çevre=4×7=28.'],
['Üçgenin iç açılarının toplamı kaç derecedir?',['90','180','270','360','540'],1,'Her üçgende iç açıların toplamı 180°dir.'],
['Yarıçapı 5 cm olan çemberin çapı kaç cm’dir?',['5','8','10','12','15'],2,'Çap=2r=10 cm.']]);
add('Türkçe','Sözcükte Anlam',[
['“Yüzü gülmek” deyiminin anlamı hangisidir?',['Üzülmek','Sevinmek','Kızmak','Şaşırmak','Beklemek'],1,'Deyim, kişinin sevincini ve memnuniyetini anlatır.'],
['“Ağır” sözcüğü hangisinde mecaz anlamdadır?',['Ağır çanta','Ağır taş','Ağır yemek','Ağır söz','Ağır kutu'],3,'“Ağır söz”de fiziksel ağırlık değil incitici/etkili söz anlamı vardır.'],
['“Özgün” sözcüğünün anlamca en yakın karşılığı hangisidir?',['Taklit','Yalın','Orijinal','Eski','Eksik'],2,'Özgün, benzeri olmayan ve orijinal anlamındadır.']]);
add('Türkçe','Cümlede Anlam',[
['“Bu işi ancak sen başarabilirsin.” cümlesinde hangi anlam vardır?',['Olasılık','Kesinlik','Koşul','Varsayım','Karşılaştırma'],1,'“Ancak sen” ifadesi kesinlik vurgusu taşır.'],
['“Yağmur yağarsa pikniğe gitmeyiz.” cümlesinde hangi anlam vardır?',['Koşul','Amaç','Neden','Karşılaştırma','Tanım'],0,'“-sa” eki koşul anlamı verir.'],
['“Sınavı kazanmak için düzenli çalışıyor.” cümlesinde hangi anlam vardır?',['Neden','Amaç','Varsayım','Karşılaştırma','Öncelik'],1,'“İçin” burada yapılma amacını bildirir.']]);
add('Türkçe','Paragraf',[
['Bir paragrafta ana düşünceyi destekleyen yardımcı düşünceler ne işe yarar?',['Konuyu değiştirmeye','Ana düşünceyi açıklayıp güçlendirmeye','Başlık vermeye','Soruyu uzatmaya','Sonucu gizlemeye'],1,'Yardımcı düşünceler ana düşüncenin anlaşılmasını ve ikna gücünü artırır.'],
['Paragrafın giriş cümlesinde genellikle hangi özellik bulunur?',['Konuya giriş yapması','Sonucu kesinleştirmesi','Örneği açıklaması','Özeti vermesi','Karşı görüşü çürütmesi'],0,'Giriş cümlesi paragrafın konusuna doğal bir başlangıç yapar.'],
['Bir düşüncenin başka bir kişinin sözüyle desteklenmesine ne denir?',['Örneklendirme','Tanımlama','Tanık gösterme','Benzetme','Sayısallaştırma'],2,'Başkasının görüşünden yararlanmak tanık göstermedir.']]);
add('Türkçe','Dil Bilgisi',[
['“Çocuklar bahçede oynuyor.” cümlesinde yüklem hangisidir?',['Çocuklar','bahçede','oynuyor','çocuk','bahçe'],2,'Cümlenin yargısını bildiren sözcük “oynuyor”dur.'],
['“Hızlıca koştu.” cümlesinde “hızlıca” sözcüğünün türü nedir?',['İsim','Sıfat','Zamir','Zarf','Edat'],3,'“Hızlıca”, eylemin nasıl yapıldığını belirttiği için zarftır.'],
['“Kitabım masada.” cümlesinde “-ım” eki hangi anlamı verir?',['Çoğul','Olumsuzluk','İyelik','Zaman','Soru'],2,'“-ım” birinci tekil kişi iyelik ekidir.']]);
add('Tarih','İslamiyet Öncesi Türk Tarihi',[
['Orhun Yazıtları hangi Türk devleti dönemine aittir?',['Hunlar','Göktürkler','Uygurlar','Karahanlılar','Selçuklular'],1,'Orhun Yazıtları II. Göktürk döneminin önemli eserleridir.'],
['Uygurların yerleşik hayata geçmesinde aşağıdakilerden hangisi etkili olmuştur?',['Tarım ve ticaret','Denizcilik','Coğrafi keşifler','Sanayi Devrimi','Haçlı Seferleri'],0,'Uygurlar tarım ve ticarete dayalı yerleşik yaşamı geliştirmiştir.']]);
add('Tarih','Osmanlı Devleti',[
['Osmanlı Devleti’nin ilk başkenti olarak kabul edilen şehir hangisidir?',['Bursa','Edirne','İstanbul','Ankara','Konya'],0,'Kuruluş döneminde Bursa önemli başkent merkezidir.'],
['İstanbul hangi Osmanlı padişahı döneminde fethedilmiştir?',['Orhan Bey','I. Murat','II. Murat','Fatih Sultan Mehmet','Yavuz Sultan Selim'],3,'İstanbul 1453’te II. Mehmet döneminde fethedilmiştir.'],
['Tımar sisteminin temel amaçlarından biri aşağıdakilerden hangisidir?',['Sipahi yetiştirmek ve vergi düzenini sağlamak','Deniz ticaretini kaldırmak','Loncaları kapatmak','Yeniçerileri kaldırmak','Saltanatı sona erdirmek'],0,'Tımar sistemi askerî ve mali düzenin önemli parçalarındandır.']]);
add('Tarih','Milli Mücadele',[
['TBMM hangi tarihte açılmıştır?',['19 Mayıs 1919','23 Nisan 1920','30 Ağustos 1922','29 Ekim 1923','1 Kasım 1922'],1,'TBMM 23 Nisan 1920’de açılmıştır.'],
['Başkomutanlık Meydan Muharebesi hangi yıl kazanılmıştır?',['1919','1920','1921','1922','1923'],3,'Büyük Taarruz ve Başkomutanlık Meydan Muharebesi 1922’dedir.'],
['Lozan Barış Antlaşması hangi yıl imzalanmıştır?',['1920','1921','1922','1923','1924'],3,'Lozan 24 Temmuz 1923’te imzalanmıştır.']]);
add('Coğrafya','Türkiye Fiziki Coğrafyası',[
['Türkiye’nin en yüksek dağı hangisidir?',['Erciyes','Ağrı','Uludağ','Kaçkar','Süphan'],1,'Ağrı Dağı Türkiye’nin en yüksek zirvesidir.'],
['Türkiye’nin en büyük gölü hangisidir?',['Tuz Gölü','Beyşehir Gölü','Van Gölü','İznik Gölü','Eğirdir Gölü'],2,'Yüz ölçümü bakımından Van Gölü en büyüktür.'],
['Karadeniz kıyılarında dağların kıyıya paralel uzanmasının sonucu hangisidir?',['Kıyı ile iç kesimler arasında ulaşımın zorlaşması','Gelgitin artması','Çöllerin oluşması','Depremlerin bitmesi','Akarsuların tamamen kuruması'],0,'Dağların paralel uzanması kıyı-iç kesim ulaşımını güçleştirir.']]);
add('Coğrafya','Türkiye İklimi',[
['Akdeniz ikliminde yazlar genellikle nasıldır?',['Serin ve yağışlı','Sıcak ve kurak','Soğuk ve kar yağışlı','Ilık ve sürekli yağışlı','Donlu'],1,'Akdeniz ikliminin yazları sıcak ve kuraktır.'],
['Karasal iklimde günlük ve yıllık sıcaklık farklarının fazla olmasının temel nedeni nedir?',['Deniz etkisinin zayıf olması','Nemliliğin çok yüksek olması','Gelgit','Musonlar','Okyanus akıntıları'],0,'Denizden uzaklık karasal etkiyi artırır.']]);
add('Coğrafya','Nüfus ve Yerleşme',[
['Türkiye’de nüfus yoğunluğunun en fazla olduğu bölge hangisidir?',['Marmara','Doğu Anadolu','Karadeniz','İç Anadolu','Güneydoğu Anadolu'],0,'Sanayi, ticaret ve ulaşımın yoğunluğu Marmara’nın nüfusunu artırır.'],
['Nüfusun yaş gruplarına göre dağılımını gösteren grafik hangisidir?',['Nüfus piramidi','İklim grafiği','Hipsometrik harita','Akarsu profili','Yağış diyagramı'],0,'Nüfus piramidi yaş ve cinsiyet yapısını gösterir.']]);
add('Vatandaşlık','Anayasa',[
['Anayasa’nın değiştirilemez hükümleri hangi maddelerde yer alır?',['1, 2 ve 3','4 ve 5','10 ve 11','20 ve 21','40 ve 41'],0,'İlk üç madde değiştirilemez ve değiştirilmesi teklif edilemez; 4. madde bunu güvence altına alır.'],
['Kanunların Anayasa’ya uygunluğunu denetleyen yüksek mahkeme hangisidir?',['Yargıtay','Danıştay','Anayasa Mahkemesi','Sayıştay','Uyuşmazlık Mahkemesi'],2,'Anayasa Mahkemesi norm denetimi yapar.']]);
add('Vatandaşlık','Yasama',[
['Kanun teklif etmeye kim yetkilidir?',['Milletvekilleri','Valiler','Belediye başkanları','Bakanlık müfettişleri','Muhtarlar'],0,'Anayasa sisteminde kanun teklif etmeye milletvekilleri yetkilidir.'],
['TBMM ve Cumhurbaşkanlığı seçimleri genel olarak kaç yılda bir yapılır?',['3','4','5','6','7'],2,'Milletvekili ve Cumhurbaşkanlığı seçimleri beş yılda bir aynı gün yapılır.']]);
add('Vatandaşlık','Yargı',[
['Adli yargının yüksek mahkemesi hangisidir?',['Danıştay','Yargıtay','Sayıştay','AYM','HSK'],1,'Yargıtay adli yargı alanındaki yüksek mahkemedir.'],
['İdari yargının yüksek mahkemesi hangisidir?',['Yargıtay','Danıştay','AYM','Sayıştay','HSK'],1,'Danıştay idari yargının yüksek mahkemesidir.']]);
add('Güncel Bilgiler','Genel Bilgi',[
['Türkiye’nin başkenti hangisidir?',['İstanbul','Ankara','İzmir','Bursa','Antalya'],1,'Türkiye Cumhuriyeti’nin başkenti Ankara’dır.'],
['Türkiye’nin uluslararası telefon kodu hangisidir?',['+30','+40','+49','+90','+98'],3,'Türkiye’nin ülke telefon kodu +90’dır.'],
['Dünya’nın doğal uydusu hangisidir?',['Mars','Venüs','Ay','Güneş','Merkür'],2,'Dünya’nın doğal uydusu Ay’dır.']]);
// Deterministic variants make the bank deep enough for long exams without copying protected questions.
const nums=[12,15,18,21,24,27,30,36,42,45,48,54,60,72,75,84,90,96,108,120];
nums.forEach((n,i)=>{const p=n%3===0?'3':n%4===0?'4':'2';const d=n/Number(p);g.push(Q('Matematik','Temel İşlemler',`${n} sayısının ${p} ile bölümü kaçtır?`,[String(d-2),String(d-1),String(d),String(d+1),String(d+2)],2,`${n} ÷ ${p} = ${d}.`))});
const years=[1920,1921,1922,1923,1924,1925,1926,1928,1930,1933,1934,1935];
years.forEach(y=>g.push(Q('Tarih','Cumhuriyet Dönemi',`${y} yılı aşağıdaki dönemlerden hangisine aittir?`,['Osmanlı Devleti','Milli Mücadele / Cumhuriyet dönemi','Selçuklu dönemi','İlk Türk devletleri','Roma dönemi'],1,`${y}, Milli Mücadele sonrası Cumhuriyet döneminin içindedir.`)));
const bank=old.concat(g);
window.KPSS_BANK=bank;
window.KPSS_BANK_INFO={total:bank.length,version:'4.0.0',subjects:[...new Set(bank.map(q=>q.subject))],topics:[...new Set(bank.map(q=>q.topic))]};
const SKEY='kpss_v4_state';
let st={correct:0,wrong:0,answered:0,xp:0,wrongs:[],favorites:[],later:[],bySubject:{},byTopic:{},days:{}};
try{Object.assign(st,JSON.parse(localStorage.getItem(SKEY)||'{}'))}catch(e){}
const save=()=>localStorage.setItem(SKEY,JSON.stringify(st));
const esc=x=>String(x).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
let current=null,session=[],pos=0,selected=null,answered=false,questionTimer=null,exam=null,examTimer=null;
const toast=m=>{const el=document.querySelector('#toast');if(el){el.textContent=m;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1600)}};
function bump(q,ok){st.answered++;ok?st.correct++:st.wrong++;st.xp+=ok?10:2;st.bySubject[q.subject]||(st.bySubject[q.subject]={correct:0,wrong:0});st.byTopic[q.topic]||(st.byTopic[q.topic]={correct:0,wrong:0});st.bySubject[q.subject][ok?'correct':'wrong']++;st.byTopic[q.topic][ok?'correct':'wrong']++;if(!ok&&!st.wrongs.some(x=>x.text===q.text))st.wrongs.push(q);st.days[new Date().toISOString().slice(0,10)]=(st.days[new Date().toISOString().slice(0,10)]||0)+1;save()}
function render(q){current=q;selected=null;answered=false;clearInterval(questionTimer);const n=document.querySelector('#qnum'),t=document.querySelector('#qtotal'),cat=document.querySelector('#qcategory'),sub=document.querySelector('#qsubject'),text=document.querySelector('#qtext'),opts=document.querySelector('#options'),bar=document.querySelector('#qbar'),ex=document.querySelector('#explain'),btn=document.querySelector('#answerBtn');if(!text)return;n.textContent=pos+1;t.textContent=session.length;cat.textContent=`${q.subject} • ${q.topic}`;sub.textContent=q.subject;text.textContent=q.text;bar.style.width=`${Math.round((pos+1)/session.length*100)}%`;ex.style.display='none';ex.textContent='';btn.textContent='Cevabı İşaretle';btn.disabled=false;opts.innerHTML=q.opts.map((o,i)=>`<button class="option" data-v="${i}"><span>${'ABCDE'[i]}</span>${esc(o)}</button>`).join('');let sec=90;const tick=()=>{sec--;const tm=document.querySelector('#timer');if(tm){const m=String(Math.floor(sec/60)).padStart(2,'0'),s=String(sec%60).padStart(2,'0');tm.textContent=`${m}:${s}`}if(sec<=0){clearInterval(questionTimer);answer(true)}};questionTimer=setInterval(tick,1000)}
function answer(force){if(answered||!current)return;if(selected===null){if(!force){toast('Önce bir seçenek seç dostum 🙂');return}selected=-1}answered=true;clearInterval(questionTimer);const ok=selected===current.a;if(!ok){const w=document.querySelector(`#options .option[data-v="${current.a}"]`);if(w)w.classList.add('correct')}if(selected>=0){const s=document.querySelector(`#options .option[data-v="${selected}"]`);if(s)s.classList.add(ok?'correct':'wrong')}bump(current,ok);const ex=document.querySelector('#explain');if(ex){ex.style.display='block';ex.innerHTML=`<b>${ok?'✓ Doğru':'✕ Yanlış'}</b><p>${esc(current.e||'Çözüm kaydı bulunmuyor.')}</p>`}const btn=document.querySelector('#answerBtn');if(btn)btn.textContent=pos<session.length-1?'Sonraki Soru →':'Bitir';}
function next(){if(!answered){answer(false);if(!answered)return}if(pos<session.length-1){pos++;render(session[pos])}else{toast('Soru setini tamamladın 🎉');if(window.showScreen)window.showScreen('home')}}
function startQuestions(filter){const pool=bank.filter(filter||(()=>true));session=pool.sort(()=>Math.random()-.5).slice(0,10);if(!session.length)return toast('Bu konuda henüz soru yok.');pos=0;window.showScreen&&window.showScreen('question');render(session[0])}
function examStart(){const size=Number(window.examSize||10);const pool=[...bank].sort(()=>Math.random()-.5);exam={size,items:Array.from({length:size},(_,i)=>pool[i%pool.length]),answers:Array(size).fill(null),started:Date.now()};clearInterval(examTimer);window.showScreen&&window.showScreen('examrun');renderExam();examTimer=setInterval(()=>{const left=Math.max(0,(exam.duration||({10:15,20:30,30:45,60:90,120:120}[size]||15))*60000-(Date.now()-exam.started));const el=document.querySelector('#examTimer');if(el){const sec=Math.floor(left/1000),h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s=sec%60;el.textContent=`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`}if(left<=0)finishExam()},1000)}
function renderExam(){if(!exam)return;const q=exam.items[exam.pos||0],n=document.querySelector('#examQnum'),tot=document.querySelector('#examrun .qmeta'),text=document.querySelector('#examQtext'),opts=document.querySelector('#examOptions'),numsEl=document.querySelector('#examNumbers');if(n)n.textContent=(exam.pos||0)+1;if(tot)tot.innerHTML=`Soru <b>${(exam.pos||0)+1}</b> / ${exam.size}`;if(text)text.textContent=q.text;if(opts)opts.innerHTML=q.opts.map((o,i)=>`<button class="option ${exam.answers[exam.pos||0]===i?'selected':''}" data-exam-v="${i}"><span>${'ABCDE'[i]}</span>${esc(o)}</button>`).join('');if(numsEl)numsEl.innerHTML=exam.items.map((_,i)=>`<button class="${exam.answers[i]!==null?'done':''} ${i===(exam.pos||0)?'active':''}" data-exam-jump="${i}">${i+1}</button>`).join('');const c=exam.answers.filter((a,i)=>a!==null&&a===exam.items[i].a).length,w=exam.answers.filter((a,i)=>a!==null&&a!==exam.items[i].a).length,b=exam.size-c-w;['examCorrect','examWrong','examBlank'].forEach((id,i)=>{const el=document.querySelector('#'+id);if(el)el.textContent=[c,w,b][i]})}
function finishExam(){if(!exam)return;clearInterval(examTimer);const c=exam.answers.filter((a,i)=>a!==null&&a===exam.items[i].a).length,w=exam.answers.filter((a,i)=>a!==null&&a!==exam.items[i].a).length,b=exam.size-c-w;exam.correct=c;exam.wrong=w;exam.blank=b;exam.net=c-w/4;st.xp+=c*8;save();['resultNet','rCorrect','rWrong','rBlank','rSuccess'].forEach((id,i)=>{const el=document.querySelector('#'+id);if(!el)return;el.textContent=[exam.net.toFixed(2).replace('.',','),c,w,b,'%'+Math.round(c/exam.size*100)][i]});const rt=document.querySelector('#rTime');if(rt)rt.textContent=Math.max(1,Math.round((Date.now()-exam.started)/60000))+' dk';window.showScreen&&window.showScreen('result');}
window.renderQuestion=()=>startQuestions();
window.renderExams=()=>{const el=document.querySelector('#examList');if(!el)return;el.innerHTML=[10,20,30,60,120].map((n,i)=>`<button class="card exampick ${window.examSize===n||(!window.examSize&&n===10)?'active':''}" data-exam-size="${n}"><div class="row"><span><b>${n} Soruluk KPSS Denemesi</b><small>Genel Yetenek + Genel Kültür</small></span><strong>${({10:15,20:30,30:45,60:90,120:120}[n])} dk</strong></div></button>`).join('');window.examSize=window.examSize||10};
window.renderWrongs=()=>{const el=document.querySelector('#wrongList');if(!el)return;el.innerHTML=st.wrongs.length?st.wrongs.slice().reverse().map((q,i)=>`<article class="card wrongcard"><small>${esc(q.subject)} • ${esc(q.topic)}</small><b>${esc(q.text)}</b><p class="muted">Doğru cevap: ${'ABCDE'[q.a]}) ${esc(q.opts[q.a])}</p><button class="link" data-retry="${i}">Bu soruyu çöz</button></article>`).join(''):'<section class="card"><b>Harika! 🎯</b><p class="muted">Henüz yanlışın yok. Soru çözmeye devam et.</p></section>'};
window.renderStats=()=>{const total=st.correct+st.wrong,success=total?Math.round(st.correct/total*100):0,net=st.correct-st.wrong/4;[['totalQ',total],['success','%'+success],['net',net.toFixed(1).replace('.',',')]].forEach(([id,v])=>{const e=document.querySelector('#'+id);if(e)e.textContent=v});const xp=document.querySelector('#xpText');if(xp)xp.textContent=`${st.xp} / 2.000 XP`;const level=document.querySelector('#level');if(level)level.textContent=Math.floor(st.xp/200)+1;const xb=document.querySelector('#xpBar');if(xb)xb.style.width=`${Math.min(100,st.xp%200/2)}%`};
window.renderTopics=function(subject){const el=document.querySelector('#topicList');if(!el)return;const topics=[...new Set(bank.filter(q=>q.subject===subject).map(q=>q.topic))];el.innerHTML=topics.map(t=>{const n=bank.filter(q=>q.subject===subject&&q.topic===t).length;return `<button class="card topicitem" data-topic="${esc(t)}" data-subject="${esc(subject)}"><div class="row"><span><b>${esc(t)}</b><small>${n} özgün soru • Konu testi</small></span><span>›</span></div></button>`}).join('')};
document.addEventListener('click',e=>{const o=e.target.closest('[data-v]');if(o&&document.querySelector('#question.active')){document.querySelectorAll('#options .option').forEach(x=>x.classList.remove('selected'));o.classList.add('selected');selected=Number(o.dataset.v);return}if(e.target.closest('#answerBtn')){answer(false);return}const ex=e.target.closest('[data-exam-size]');if(ex){window.examSize=Number(ex.dataset.examSize);document.querySelectorAll('.exampick').forEach(x=>x.classList.remove('active'));ex.classList.add('active');return}const eo=e.target.closest('[data-exam-v]');if(eo&&exam){exam.answers[exam.pos||0]=Number(eo.dataset.examV);renderExam();return}const ej=e.target.closest('[data-exam-jump]');if(ej&&exam){exam.pos=Number(ej.dataset.examJump);renderExam();return}if(e.target.closest('[data-action="examNext"]')){if(exam&&exam.pos<exam.size-1){exam.pos++;renderExam()}else finishExam();return}if(e.target.closest('[data-action="examPrev"]')){if(exam&&exam.pos>0){exam.pos--;renderExam()}return}if(e.target.closest('[data-action="startExam"]')){examStart();return}const tp=e.target.closest('[data-topic]');if(tp){startQuestions(q=>q.subject===tp.dataset.subject&&q.topic===tp.dataset.topic);return}const retry=e.target.closest('[data-retry]');if(retry){const q=st.wrongs[st.wrongs.length-1-Number(retry.dataset.retry)];if(q){session=[q];pos=0;window.showScreen&&window.showScreen('question');render(q)}return}if(e.target.closest('[data-action="clearWrongs"]')){st.wrongs=[];save();window.renderWrongs();toast('Yanlışlar temizlendi');return}if(e.target.closest('[data-action="favorite"]')&&current){if(!st.favorites.includes(current.text))st.favorites.push(current.text);save();toast('Favorilere eklendi ⭐');return}if(e.target.closest('[data-action="later"]')&&current){if(!st.later.includes(current.text))st.later.push(current.text);save();toast('Sonra çöz listesine eklendi');return}if(e.target.closest('[data-action="explain"]')&&current){const x=document.querySelector('#explain');if(x){x.style.display=x.style.display==='none'?'block':'none';x.innerHTML=`<b>Çözüm</b><p>${esc(current.e)}</p>`}return}});
const oldShow=window.showScreen; if(oldShow){window.showScreen=function(id){oldShow(id);if(id==='question')window.renderQuestion();if(id==='exams')window.renderExams();if(id==='wrongs')window.renderWrongs();if(id==='stats')window.renderStats();if(id==='subjects'){setTimeout(()=>{const s=document.querySelector('.tabs button.active')?.dataset?.tab==='gk'?'Tarih':'Türkçe';},0)}}}
window.KPSS_V4={state:st,bank};save();
})();
