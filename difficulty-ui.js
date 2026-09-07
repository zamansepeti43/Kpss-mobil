/* KPSS-Mobil — soru zorluk etiketi */
(function(){
'use strict';
const bank=Array.isArray(window.KPSS_BANK)?window.KPSS_BANK:[];
bank.forEach((q,i)=>{if(!q.difficulty){const n=(i*17+String(q.text||'').length+String(q.topic||'').length)%10;q.difficulty=n<4?'Basit':n<8?'Orta':'Zor';}});
function ensureBadge(){
 const card=document.querySelector('#question .qcard'),text=document.getElementById('qtext');
 if(!card||!text)return;
 let badge=document.getElementById('questionDifficulty');
 if(!badge){badge=document.createElement('div');badge.id='questionDifficulty';badge.className='difficulty-badge';card.insertBefore(badge,text);}
 const value=String(text.textContent||'').trim();
 const q=bank.find(x=>String(x.text||'').trim()===value);
 const level=q?.difficulty||'Orta';
 badge.textContent=level;badge.className='difficulty-badge '+level.toLocaleLowerCase('tr-TR');
}
const target=document.getElementById('question');
if(target)new MutationObserver(ensureBadge).observe(target,{subtree:true,childList:true,characterData:true});
document.addEventListener('click',()=>setTimeout(ensureBadge,0),true);
setTimeout(ensureBadge,200);
})();
