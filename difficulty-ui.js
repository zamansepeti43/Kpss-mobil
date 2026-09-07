/* KPSS-Mobil — soru zorluk etiketi */
(function(){
'use strict';
const bank=Array.isArray(window.KPSS_BANK)?window.KPSS_BANK:[];
bank.forEach((q,i)=>{if(!q.difficulty){const n=(i*17+String(q.text||'').length+String(q.topic||'').length)%10;q.difficulty=n<4?'Basit':n<8?'Orta':'Zor';}});
const style=document.createElement('style');
style.textContent='.difficulty-badge{display:inline-flex;align-items:center;width:max-content;margin:0 0 10px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:800;letter-spacing:.2px;border:1px solid rgba(255,255,255,.12);background:#14263b;color:#dcecff}.difficulty-badge.basit{background:rgba(36,220,184,.12);color:#4ff0cb;border-color:rgba(36,220,184,.3)}.difficulty-badge.orta{background:rgba(255,183,77,.12);color:#ffc66d;border-color:rgba(255,183,77,.3)}.difficulty-badge.zor{background:rgba(255,92,120,.12);color:#ff8299;border-color:rgba(255,92,120,.3)}';
document.head.appendChild(style);
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
