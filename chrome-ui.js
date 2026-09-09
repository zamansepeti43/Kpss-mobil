(()=>{
'use strict';
const css=document.createElement('style');
css.textContent=`
/* Premium app chrome: clock, double-tap fullscreen and notification drawer */
#clock{font-variant-numeric:tabular-nums;letter-spacing:.2px;font-weight:600}
.status{display:flex!important;align-items:center!important;justify-content:space-between!important}
.status #clock{font-size:13px!important;color:#f3f7fc!important;background:rgba(18,38,57,.72)!important;border:1px solid #27445d!important;border-radius:10px!important;padding:5px 9px!important;line-height:1!important;box-shadow:0 6px 18px #0003!important}
.status>span:last-child{opacity:.72!important;letter-spacing:2px!important}
#appMenuBtn{width:38px;height:34px;border:1px solid #27445d;border-radius:11px;background:rgba(18,38,57,.72);color:#a9bdd1;display:grid;place-items:center;box-shadow:0 6px 18px #0003;cursor:pointer;margin-left:auto}
#appMenuBtn svg{width:20px;height:20px}
#appMenuBtn:active{transform:scale(.95);background:#16314a}
.phone.premium-fullscreen{width:100vw!important;max-width:none!important;height:100dvh!important;min-height:100dvh!important;border-radius:0!important;box-shadow:none!important}
html.app-fullscreen,body.app-fullscreen{overflow:hidden!important;background:#02060c!important}
.app-fullscreen .app{height:100dvh!important;min-height:100dvh!important}
.app-fullscreen .screen{height:calc(100dvh - 38px)!important;min-height:calc(100dvh - 38px)!important}
#notifyDrawer{position:fixed;inset:0;z-index:1000;pointer-events:none;visibility:hidden}
#notifyDrawer.open{pointer-events:auto;visibility:visible}
#notifyDrawer .drawerShade{position:absolute;inset:0;background:rgba(1,7,14,.66);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);opacity:0;transition:opacity .22s ease}
#notifyDrawer.open .drawerShade{opacity:1}
#notifyDrawer .drawerPanel{position:absolute;top:0;right:0;width:min(340px,88vw);height:100%;padding:calc(18px + env(safe-area-inset-top)) 17px calc(18px + env(safe-area-inset-bottom));background:linear-gradient(180deg,#0c1c2d 0%,#07111d 58%,#050b13 100%);border-left:1px solid #29445d;box-shadow:-22px 0 55px #0008;transform:translateX(104%);transition:transform .26s cubic-bezier(.2,.8,.2,1);overflow-y:auto;-webkit-overflow-scrolling:touch}
#notifyDrawer.open .drawerPanel{transform:translateX(0)}
.drawerHead{display:flex;align-items:center;justify-content:space-between;margin-bottom:19px}
.drawerKicker{font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#7190b0;margin-bottom:5px}
.drawerTitle{font-size:22px;font-weight:800;color:#f4f8fd;letter-spacing:-.5px}
.drawerClose{width:38px;height:38px;border:1px solid #29445d;border-radius:12px;background:#102438;color:#a9bdd1;font-size:23px;line-height:1}
.drawerCard{border:1px solid #203b53;border-radius:19px;background:linear-gradient(145deg,#10283d,#0a1928);padding:16px;margin-bottom:11px;box-shadow:0 12px 28px #0003}
.drawerCard.primaryCard{background:linear-gradient(145deg,#132f50,#0b1a2c);border-color:#2b5680}
.drawerRow{display:flex;align-items:center;gap:12px}
.drawerIcon{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:#183955;color:#72a9ff;font-size:20px;flex:0 0 auto}
.drawerCard b{font-size:14px;color:#f0f5fa}.drawerCard small{display:block;color:#879db2;font-size:10px;margin-top:4px;line-height:1.45}
.drawerStat{display:flex;justify-content:space-between;align-items:end;margin-top:15px}.drawerStat strong{font-size:27px;color:#fff}.drawerStat span{font-size:11px;color:#91a6bb}
.drawerProgress{height:7px;background:#183047;border-radius:99px;overflow:hidden;margin-top:11px}.drawerProgress i{display:block;height:100%;width:4%;background:linear-gradient(90deg,#26d8c0,#3d7cff);border-radius:99px}
.drawerList{display:grid;gap:8px;margin-top:12px}.drawerItem{display:flex;gap:10px;align-items:center;padding:11px 10px;border-radius:13px;background:#091724;border:1px solid #172d40}.drawerItem span{font-size:16px}.drawerItem b{font-size:11px}.drawerItem small{margin:2px 0 0;font-size:9px}
.drawerTip{font-size:10px!important;line-height:1.55!important;color:#9eb1c3!important;margin:9px 0 0!important}
.drawerTip strong{color:#8db7ff}
@media(min-width:600px){#notifyDrawer .drawerPanel{border-radius:25px 0 0 25px;margin:12px 12px 12px 0;height:calc(100% - 24px)}}
`;
document.head.appendChild(css);

function updateClock(){
  const el=document.getElementById('clock');
  if(!el)return;
  el.textContent=new Intl.DateTimeFormat('tr-TR',{hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date());
}
updateClock();setInterval(updateClock,1000);

function toggleFullscreen(){
  const phone=document.querySelector('.phone');
  if(!phone)return;
  const doc=document.documentElement;
  const active=!!document.fullscreenElement;
  if(active){document.exitFullscreen?.();return;}
  if(phone.requestFullscreen){phone.requestFullscreen().catch(()=>{});}
  else {doc.classList.add('app-fullscreen');document.body.classList.add('app-fullscreen');phone.classList.add('premium-fullscreen');}
}
document.addEventListener('dblclick',e=>{
  if(e.target.closest('#notifyDrawer')||e.target.closest('#appMenuBtn'))return;
  toggleFullscreen();
});
let tapTimer=0,tapStamp=0;
document.addEventListener('touchend',e=>{
  if(e.target.closest('#notifyDrawer')||e.target.closest('#appMenuBtn'))return;
  const now=Date.now();
  if(now-tapStamp<320){clearTimeout(tapTimer);tapStamp=0;toggleFullscreen();}
  else{tapStamp=now;tapTimer=setTimeout(()=>{tapStamp=0},340);}
},{passive:true});
document.addEventListener('fullscreenchange',()=>{
  const phone=document.querySelector('.phone');
  const on=!!document.fullscreenElement;
  document.documentElement.classList.toggle('app-fullscreen',on);
  document.body.classList.toggle('app-fullscreen',on);
  phone?.classList.toggle('premium-fullscreen',on);
});

function ensureMenu(){
  const status=document.querySelector('.status');
  if(!status||document.getElementById('appMenuBtn'))return;
  const old=status.querySelector('span:last-child');
  if(old)old.style.display='none';
  const btn=document.createElement('button');
  btn.id='appMenuBtn';btn.type='button';btn.setAttribute('aria-label','Menüyü aç');btn.setAttribute('data-action','notify');
  btn.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  status.appendChild(btn);
}
ensureMenu();
new MutationObserver(ensureMenu).observe(document.body,{childList:true,subtree:true});

function drawerMarkup(){
  if(document.getElementById('notifyDrawer'))return;
  const wrap=document.createElement('div');wrap.id='notifyDrawer';
  wrap.innerHTML=`<div class="drawerShade" data-close-drawer></div><aside class="drawerPanel" role="dialog" aria-label="Bildirimler ve çalışma özeti"><div class="drawerHead"><div><div class="drawerKicker">KPSS 2026</div><div class="drawerTitle">Bugünkü Özet</div></div><button class="drawerClose" data-close-drawer aria-label="Kapat">×</button></div><section class="drawerCard primaryCard"><div class="drawerRow"><div class="drawerIcon">🎯</div><div><b>Günlük hedef</b><small>Bugün istikrarlı ilerliyorsun.</small></div></div><div class="drawerStat"><strong id="drawerGoal">2</strong><span>/ 50 soru</span></div><div class="drawerProgress"><i id="drawerProgressBar"></i></div></section><section class="drawerCard"><div class="drawerRow"><div class="drawerIcon">📚</div><div><b>Çalışma sırası</b><small>Bugün için önerilen kısa plan</small></div></div><div class="drawerList"><div class="drawerItem"><span>🧮</span><div><b>Matematik · Temel Kavramlar</b><small>10 soru • 15 dk</small></div></div><div class="drawerItem"><span>📖</span><div><b>Türkçe · Sözcükte Anlam</b><small>Ders + konu testi</small></div></div><div class="drawerItem"><span>🏛️</span><div><b>Tarih · Kurtuluş Savaşı</b><small>10 soru • tekrar</small></div></div></div></section><section class="drawerCard"><div class="drawerRow"><div class="drawerIcon">💡</div><div><b>Bugünün ipucu</b><small>Az ama düzenli çalışma daha kalıcıdır.</small></div></div><p class="drawerTip"><strong>Öneri:</strong> Önce dersi oku, ardından aynı konudan mini testi çöz. Yanlışlarını gün sonunda tekrar et.</p></section></aside>`;
  document.body.appendChild(wrap);
}
function openDrawer(){drawerMarkup();document.getElementById('notifyDrawer')?.classList.add('open')}
function closeDrawer(){document.getElementById('notifyDrawer')?.classList.remove('open')}
document.addEventListener('click',e=>{
  const notify=e.target.closest('[data-action="notify"]');
  if(notify){e.preventDefault();e.stopImmediatePropagation();openDrawer();return;}
  if(e.target.closest('[data-close-drawer]')){closeDrawer();return;}
},{capture:true});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDrawer()});

new MutationObserver(()=>{
  const source=document.getElementById('goalCount');const target=document.getElementById('drawerGoal');
  if(source&&target)target.textContent=(source.textContent.match(/^\\d+/)||['0'])[0];
  const bar=document.getElementById('goalBar'),out=document.getElementById('drawerProgressBar');
  if(bar&&out)out.style.width=bar.style.width||'0%';
}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['style']});
})();
