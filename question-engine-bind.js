/* v4 event bridge: capture navigation before legacy handlers */
(function(){
'use strict';
function screen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('active',s.id===id));document.querySelectorAll('.bottom button').forEach(b=>b.classList.toggle('on',b.dataset.go===id));if(id==='stats'&&window.renderStats)window.renderStats();if(id==='wrongs'&&window.renderWrongs)window.renderWrongs();if(id==='profile'&&window.renderProfile)window.renderProfile();if(id==='plan'&&window.renderPlan)window.renderPlan();if(id==='exams'&&window.renderExams)window.renderExams()}
document.addEventListener('click',function(e){
 const go=e.target.closest('[data-go]');
 if(go){const id=go.dataset.go;if(id==='question'){e.preventDefault();e.stopImmediatePropagation();screen('question');window.renderQuestion&&window.renderQuestion();return}if(['exams','wrongs','stats','profile','plan','home'].includes(id)){e.preventDefault();e.stopImmediatePropagation();screen(id);return}}
},true);
})();
