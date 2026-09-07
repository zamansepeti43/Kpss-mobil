/* Final correctness guards for generated bank */
(function(){
'use strict';
const b=window.KPSS_BANK||[];
const q=b.find(x=>x.subject==='Matematik'&&x.topic==='Basit Eşitsizlikler'&&x.text.startsWith('2x+3<9'));
if(q){q.a=1;q.e='2x+3<9 olduğundan 2x<6 ve x<3 bulunur.';}
})();
