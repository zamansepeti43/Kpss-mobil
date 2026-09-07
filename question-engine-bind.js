/* v4 event bridge: capture before legacy handlers */
(function(){
'use strict';
function screen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('active',s.id===id));document.querySelectorAll('.bottom button').forEach(b=>b.classList.toggle('on',b.dataset.go===id));if(id==='home'&&window.renderHome)window.renderHome();if(id==='stats'&&window.renderStats)window.renderStats();if(id==='wrongs'&&window.renderWrongs)window.renderWrongs();if(id==='profile'&&window.renderProfile)window.renderProfile();if(id==='plan'&&window.renderPlan)window.renderPlan();if(id==='exams'&&window.renderExams)window.renderExams()}
function question(filter){screen('question');if(window.KPSS_V4){const bank=window.KPSS_V4.bank;window.__v4filter=filter||null;window.renderQuestion=window.renderQuestion||function(){};let pool=filter?bank.filter(filter):bank;window.__v4session=pool.sort(()=>Math.random()-.5).slice(0,10);if(window.__v4session.length){window.__v4pos=0;window.__v4render&&window.__v4render()}}}
/* The engine exposes its state; renderQuestion remains the authoritative renderer. */
document.addEventListener('click',function(e){
 const go=e.target.closest('[data-go]');
 if(go){const id=go.dataset.go;if(id==='question'){e.preventDefault();e.stopImmediatePropagation();screen('question');window.renderQuestion&&window.renderQuestion();return}if(['exams','wrongs','stats','profile','plan','home'].includes(id)){e.preventDefault();e.stopImmediatePropagation();screen(id);if(id==='exams')window.renderExams&&window.renderExams();if(id==='wrongs')window.renderWrongs&&window.renderWrongs();if(id==='stats')window.renderStats&&window.renderStats();return}}
 if(e.target.closest('[data-action="startExam"]')){e.preventDefault();e.stopImmediatePropagation();window.__v4_start_exam?window.__v4_start_exam():null;return}
 const tp=e.target.closest('[data-topic]');if(tp){e.preventDefault();e.stopImmediatePropagation();screen('question');window.__v4_start_topic&&window.__v4_start_topic(tp.dataset.subject,tp.dataset.topic);return}
},true);
})();
