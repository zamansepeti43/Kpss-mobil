(()=>{
'use strict';
const $=id=>document.getElementById(id);
const storageKey='kpssSettings';
const defaults={notifications:true,sound:true,autosave:true};
function getSettings(){try{return {...defaults,...JSON.parse(localStorage.getItem(storageKey)||'{}')}}catch{return {...defaults}}}
function saveSettings(s){localStorage.setItem(storageKey,JSON.stringify(s))}
function toggleRow(key,title,desc,icon){
 const s=getSettings();
 return `<button class="settingRow" type="button" data-setting-toggle="${key}"><span class="settingIcon">${icon}</span><span class="settingCopy"><b>${title}</b><small>${desc}</small></span><span class="settingSwitch ${s[key]?'on':''}"><i></i></span></button>`
}
function openSettings(){
 const s=getSettings();
 const body=`<div class="settingsPanel">
  <div class="settingsIntro"><span class="settingsGear">⚙</span><div><b>Uygulama ayarları</b><small>Çalışma deneyimini buradan yönet.</small></div></div>
  <div class="settingsGroup"><div class="settingsLabel">TERCİHLER</div>
   ${toggleRow('notifications','Bildirimler','Günlük hedef ve çalışma hatırlatıcıları','🔔')}
   ${toggleRow('sound','Ses efektleri','Cevap ve etkileşim sesleri','🔊')}
   ${toggleRow('autosave','Otomatik kayıt','İlerlemeni cihazda otomatik sakla','💾')}
  </div>
  <div class="settingsGroup"><div class="settingsLabel">VERİLER</div>
   <button class="settingRow" type="button" data-setting-action="clear"><span class="settingIcon">🧹</span><span class="settingCopy"><b>Çalışma verilerini temizle</b><small>İlerleme, yanlışlar ve plan sıfırlanır.</small></span><span class="settingChevron">›</span></button>
  </div>
  <div class="settingsNote">Verilerin bu cihazın tarayıcı depolamasında tutulur.</div>
  <button class="settingsClose" type="button" data-setting-close>Kapat</button>
 </div>`;
 if($('modalTitle'))$('modalTitle').textContent='Ayarlar';
 if($('modalBody'))$('modalBody').innerHTML=body;
 $('modal')?.classList.add('open');
}
function closeSettings(){$('modal')?.classList.remove('open')}
document.addEventListener('click',e=>{
 const settings=e.target.closest?.('[data-action="settings"]');
 if(settings){e.preventDefault();e.stopImmediatePropagation();openSettings();return}
 const close=e.target.closest?.('[data-setting-close]');
 if(close){e.preventDefault();closeSettings();return}
 const toggle=e.target.closest?.('[data-setting-toggle]');
 if(toggle){e.preventDefault();const key=toggle.dataset.settingToggle,s=getSettings();s[key]=!s[key];saveSettings(s);openSettings();return}
 const clear=e.target.closest?.('[data-setting-action="clear"]');
 if(clear){e.preventDefault();if(confirm('Tüm çalışma verileri silinsin mi?')){localStorage.removeItem('kpssState');localStorage.removeItem(storageKey);closeSettings();location.reload()}return}
},true);
const style=document.createElement('style');style.textContent=`
/* PROFILE + SETTINGS POLISH */
#profile{padding-left:17px;padding-right:17px}
#profile .topbar{margin-top:2px;margin-bottom:18px}
#profile .topbar h2{font-size:25px;letter-spacing:-.6px}
#profile .topbar .iconbtn{width:46px;height:46px;border-radius:16px;background:#0a1b2b;border:1px solid #112c43;font-size:21px;box-shadow:0 8px 20px #0003}
#profile .profile{min-height:130px;padding:20px 19px;border-radius:22px;background:linear-gradient(145deg,#0d2337,#081521);border-color:#203a52;box-shadow:0 12px 28px #0004}
#profile .avatar{width:68px;height:68px;border-radius:50%;font-size:31px;background:linear-gradient(145deg,#354f8d,#192944);border:1px solid #42629b;box-shadow:inset 0 1px #fff2}
#profile .profile h2{font-size:18px;margin-bottom:7px}
#profile .profile small{font-size:10px;line-height:1.5}
#profile .level{min-height:91px;margin-top:12px;padding:17px 19px;border-radius:20px;background:#0a1b2a;border-color:#1c344a}
#profile .level .row{font-size:12px}
#profile .level i{height:8px;margin-top:14px;background:#183047}
#profile .sectionhead{margin:22px 5px 11px}
#profile .sectionhead b{font-size:17px;letter-spacing:-.2px}
#profile .sectionhead .link{font-size:12px}
#profile .badges{gap:10px}
#profile .badge{min-height:111px;padding:14px 4px;border-radius:18px;background:linear-gradient(145deg,#0b1d2d,#07131f);border-color:#1c3449;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;box-shadow:0 8px 20px #0002}
#profile .badge span{font-size:30px}
#profile .badge small{font-size:9px}
#profile .calendar{gap:7px;margin-top:12px;padding-bottom:4px}
#profile .day{min-height:58px;padding:8px 3px;border-radius:13px;background:#0a1b2a;border-color:#183249;font-size:9px}
#profile .day.active{background:linear-gradient(145deg,#252866,#1a214f);border-color:#665cff;box-shadow:0 0 0 1px #665cff33}
#modal{backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
#modal .sheet{max-height:88vh;overflow:auto;padding:21px 17px 12px;border-radius:27px 27px 0 0;background:linear-gradient(180deg,#0b1d2e,#06111b);border-color:#29455f;box-shadow:0 -20px 60px #0008}
#modal .sheet h3{font-size:23px;margin:0 4px 15px;letter-spacing:-.4px}
.settingsIntro{display:flex;align-items:center;gap:12px;padding:13px 12px;margin-bottom:14px;border:1px solid #1c354b;border-radius:17px;background:#091a29}
.settingsGear{width:42px;height:42px;border-radius:13px;display:grid;place-items:center;background:linear-gradient(145deg,#294d9d,#3d3b9a);font-size:20px}
.settingsIntro b{display:block;font-size:14px}.settingsIntro small{display:block;margin-top:4px;font-size:9px}
.settingsGroup{margin-top:13px}.settingsLabel{padding:0 7px 7px;color:#71879c;font-size:8px;font-weight:900;letter-spacing:1.1px}
.settingRow{width:100%;display:flex!important;align-items:center;gap:11px;padding:13px 9px!important;text-align:left!important;border:1px solid #183148!important;border-radius:14px;margin:6px 0;background:#091a29!important}
.settingIcon{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:#112b42;font-size:16px;flex:none}
.settingCopy{flex:1}.settingCopy b{display:block;font-size:11px}.settingCopy small{display:block;margin-top:3px;font-size:8px;line-height:1.35}
.settingSwitch{width:38px;height:22px;border-radius:20px;background:#1b3144;position:relative;flex:none;border:1px solid #27435a}.settingSwitch i{position:absolute;width:16px;height:16px;left:2px;top:2px;border-radius:50%;background:#8ba0b3;transition:.18s}.settingSwitch.on{background:#345bff;border-color:#5470ff}.settingSwitch.on i{left:18px;background:#fff}
.settingChevron{font-size:22px;color:#71889d}.settingsNote{margin:14px 6px 8px;color:#71879a;font-size:8px;line-height:1.5}.settingsClose{width:100%!important;padding:13px!important;border:1px solid #1c354b!important;border-radius:13px!important;text-align:center!important;background:#0d2234!important;font-size:11px!important;font-weight:800!important;color:#dce7f3!important}
`;
document.head.appendChild(style);
})();
