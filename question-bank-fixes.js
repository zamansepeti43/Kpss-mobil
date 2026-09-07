/* Final correctness + konu sınıflandırma guards */
(function(){
'use strict';
const b=window.KPSS_BANK||[];
const q=b.find(x=>x.subject==='Matematik'&&x.topic==='Basit Eşitsizlikler'&&x.text.startsWith('2x+3<9'));
if(q){q.a=1;q.e='2x+3<9 olduğundan 2x<6 ve x<3 bulunur.';}
for(const x of b){
 if(x.subject==='Matematik'&&x.topic==='Sayı Problemleri'&&String(x.text||'').toLocaleLowerCase('tr-TR').includes('bir sayının %20si 18 ise')&&Array.isArray(window.KPSS_CURRICULUM['Matematik'])&&window.KPSS_CURRICULUM['Matematik'].includes('Yüzde Problemleri')) x.topic='Yüzde Problemleri';
 if(x.subject==='Coğrafya'&&x.topic==='Türkiye Yer Şekilleri'&&String(x.text||'').toLocaleLowerCase('tr-TR').includes('türkiye’nin yüz ölçümü bakımından en büyük coğrafi bölgesi')&&Array.isArray(window.KPSS_CURRICULUM['Coğrafya'])&&window.KPSS_CURRICULUM['Coğrafya'].includes('Bölgeler')) x.topic='Bölgeler';
}
})();
