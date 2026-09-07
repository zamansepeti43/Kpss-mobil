/* KPSS-Mobil — subject counts synced to full 95-topic curriculum */
(function(){
'use strict';
const groups={gy:['Türkçe','Matematik'],gk:['Tarih','Coğrafya','Vatandaşlık','Güncel Bilgiler']};
const icons={'Türkçe':'📖','Matematik':'▦','Tarih':'🏛','Coğrafya':'🌐','Vatandaşlık':'⚖','Güncel Bilgiler':'▤'};
const tones={'Türkçe':'blue','Matematik':'violet','Tarih':'red','Coğrafya':'blue','Vatandaşlık':'orange','Güncel Bilgiler':'violet'};
function render(){const root=document.getElementById('subjectList'),screen=document.getElementById('subjects');if(!root||!screen?.classList.contains('active')||!window.KPSS_CURRICULUM)return;const active=document.querySelector('#subjects .tabs button.active')?.dataset.tab||'gy';const q=(document.getElementById('subjectSearch')?.value||'').toLocaleLowerCase('tr-TR').trim();const bank=Array.isArray(window.KPSS_BANK)?window.KPSS_BANK:[];root.innerHTML=(groups[active]||[]).map((s,i)=>{const ts=window.KPSS_CURRICULUM[s]||[];const count=bank.filter(x=>x.subject===s).length;const matches=!q||s.toLocaleLowerCase('tr-TR').includes(q)||ts.some(t=>t.toLocaleLowerCase('tr-TR').includes(q));if(!matches)return '';return `<button class="subject" data-full-sub="${encodeURIComponent(s)}"><span class="subicon ${tones[s]}">${icons[s]}</span><span class="subinfo"><b>${s}</b><small>${ts.length} konu • ${count.toLocaleString('tr-TR')} soru bankası</small></span><span class="score">${ts.length*20}+</span><span>›</span></button>`}).join('')||'<section class="card"><b>Sonuç bulunamadı</b><p class="muted">Başka bir ders veya konu deneyin.</p></section>';root.dataset.synced=active+'|'+q;}
document.addEventListener('click',function(e){const b=e.target.closest('[data-full-sub]');if(b){e.preventDefault();e.stopImmediatePropagation();const s=decodeURIComponent(b.dataset.fullSub);window.renderFullTopics&&window.renderFullTopics(s);return;}if(e.target.closest('#subjects .tabs button'))setTimeout(render,0);},true);
document.addEventListener('input',e=>{if(e.target.id==='subjectSearch')render();},true);
setInterval(render,500);setTimeout(render,100);
window.KPSS_SUBJECT_PLAN={subjects:[...groups.gy,...groups.gk],topics:95,topicTests:95,minQuestionsPerTopic:20};
})();
