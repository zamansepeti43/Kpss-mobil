/* v5 guard: prevent the legacy v4 capture bridge from hijacking v5 exam actions. */
(function(){
'use strict';
document.addEventListener('click',function(e){
 if(e.target.closest('[data-action="startExam"],[data-v5-option],[data-v5-exam],[data-v5-jump],[data-v5-size]')) e.stopImmediatePropagation();
},true);
})();
