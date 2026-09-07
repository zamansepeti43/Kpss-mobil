/* KPSS-Mobil — 2026 DETAYLI KONU MATRİSİ
 * 95 toplu başlık -> 153 çalışma konusu.
 * Her soru yalnızca kendi subject/topic anahtarında tutulur.
 * Yeni konular için konu-kilitli tohum soru eklenir; 5 test üreticisi bunları 5x20'ye tamamlar.
 */
(function(){
'use strict';
const B=Array.isArray(window.KPSS_BANK)?window.KPSS_BANK:[];
const curriculum={
'Türkçe':['Sözcükte Anlam','Cümlede Anlam','Paragrafta Anlam','Paragraf Yapısı','Sözel Mantık','Ses Bilgisi','Sözcükte Yapı','Sözcük Türleri','Fiiller','Fiilimsiler','Cümlenin Ögeleri','Cümle Türleri','Anlatım Bozuklukları','Yazım Kuralları','Noktalama İşaretleri','Söz Öbeklerinde Anlam','Cümlede Anlam İlişkileri','Ana Düşünce','Yardımcı Düşünce','Paragraf Tamamlama','Paragrafın Akışı','Anlatım Biçimleri','Düşünceyi Geliştirme Yolları','İsimler','Sıfatlar','Zamirler','Zarflar','Edat-Bağlaç-Ünlem','Fiilde Çatı','İmla ve Büyük Harf Kullanımı','Ekler','Tamlamalar','Sözcük Grupları','Metin Türleri','Anlatım Özellikleri'],
'Matematik':['Temel Kavramlar','Sayı Basamakları','Bölme ve Bölünebilme','Asal Çarpanlar','EBOB-EKOK','Rasyonel Sayılar','Basit Eşitsizlikler','Mutlak Değer','Üslü Sayılar','Köklü Sayılar','Çarpanlara Ayırma','Oran ve Orantı','Denklem Çözme','Sayı Problemleri','Yaş Problemleri','İşçi-Havuz Problemleri','Hareket Problemleri','Yüzde-Kâr-Zarar','Karışım Problemleri','Kümeler','Fonksiyonlar','İşlem-Modüler Aritmetik','Permütasyon','Kombinasyon','Olasılık','Sayısal Mantık','Tablo ve Grafikler','Geometri: Açılar','Geometri: Üçgenler','Geometri: Dörtgenler','Geometri: Çember-Daire','Geometri: Analitik','Geometri: Katı Cisimler','Kesir Problemleri','Yüzde Problemleri','Kâr-Zarar Problemleri','Faiz Problemleri','Veri ve İstatistik','Geometri: Çokgenler','Geometri: Doğru ve Doğruda Açılar','Geometri: Alan','Geometri: Hacim','Geometri: Benzerlik'],
'Tarih':['İslamiyet Öncesi Türk Tarihi','Türk-İslam Devletleri','Anadolu Selçuklu ve Beylikler','Osmanlı Kuruluş','Osmanlı Yükselme','Osmanlı Duraklama-Gerileme','Osmanlı Kültür ve Medeniyet','Osmanlı Yenileşme','20. Yüzyıl Osmanlı','Milli Mücadele Hazırlık','Kurtuluş Savaşı Cepheleri','TBMM Dönemi','Atatürk İlkeleri','İnkılaplar','Atatürk Dönemi İç Politika','Atatürk Dönemi Dış Politika','Çağdaş Türk ve Dünya Tarihi','III. Selim ve Nizam-ı Cedid','Tanzimat ve Islahat','Meşrutiyetler','Trablusgarp ve Balkan Savaşları','Cumhuriyet Dönemi Kültür ve Eğitim','Ekonomi Politikaları ve İzmir İktisat','Atatürk Dönemi Antlaşmaları','Milli Mücadele Kongreleri'],
'Coğrafya':['Türkiye Coğrafi Konumu','Türkiye Yer Şekilleri','Türkiye İklimi','Türkiye Bitki Örtüsü','Türkiye Nüfusu','Türkiye Yerleşme','Tarım','Hayvancılık','Madenler ve Enerji','Sanayi','Ulaşım','Ticaret','Turizm','Bölgeler','Harita Bilgisi','Türkiye Toprakları','Türkiye Suları','Ormancılık','Balıkçılık','İç Kuvvetler','Dış Kuvvetler','Doğal Afetler','Nüfus ve Göç','Ekonomik Faaliyetler','Enerji Kaynakları','Tarım Ürünleri','Ulaşım ve Ticaret Yolları','Turizm ve Kültürel Miras'],
'Vatandaşlık':['Hukukun Temelleri','Anayasa Genel Esaslar','Temel Hak ve Özgürlükler','Yasama','Yürütme','Yargı','İdare Hukuku','Merkezi Yönetim','Yerel Yönetimler','Hukukun Kaynakları','Devlet Şekilleri','Kişi Hakları','Sosyal ve Ekonomik Haklar','Siyasi Haklar','TBMM Yapısı ve İşleyişi','Cumhurbaşkanı ve Yürütme'],
'Güncel Bilgiler':['Türkiye Gündemi','Dünya Gündemi','Bilim ve Teknoloji','Kültür ve Sanat','Spor','Ekonomi ve Kurumlar']
};
const valid=new Set(Object.entries(curriculum).flatMap(([s,ts])=>ts.map(t=>s+'|'+t)));
const seed=(subject,topic,correct,siblings)=>({subject,topic,text:`${topic} konusu için aşağıdaki ifadelerden hangisi doğrudur?`,opts:[correct,...siblings.slice(0,4)],a:0,e:`Doğru seçenek ${correct} ifadesidir.`,source:'original-topic-seed'});
const newSeeds={
'Türkçe':{
'Söz Öbeklerinde Anlam':'Deyim ve söz öbeklerinin bağlama göre kazandığı anlamı belirleme','Cümlede Anlam İlişkileri':'Neden-sonuç, amaç-sonuç ve koşul ilişkilerini ayırt etme','Ana Düşünce':'Paragrafın temel iletisini belirleme','Yardımcı Düşünce':'Paragraftan çıkarılabilecek yardımcı yargıyı belirleme','Paragraf Tamamlama':'Paragrafın anlam akışına uygun cümleyi seçme','Paragrafın Akışı':'Paragrafın düşünce akışını ve cümle sırasını belirleme','Anlatım Biçimleri':'Açıklama, tartışma, betimleme ve öyküleme biçimlerini ayırt etme','Düşünceyi Geliştirme Yolları':'Örneklendirme, karşılaştırma, tanımlama ve tanık göstermeyi ayırt etme','İsimler':'İsimlerin tür ve görevlerini belirleme','Sıfatlar':'İsmi niteleyen veya belirten sözcükleri belirleme','Zamirler':'İsmin yerini tutan sözcükleri belirleme','Zarflar':'Fiilleri, sıfatları veya zarfları belirten sözcükleri belirleme','Edat-Bağlaç-Ünlem':'Edat, bağlaç ve ünlemlerin görevlerini ayırt etme','Fiilde Çatı':'Fiilde özne-nesne ilişkisine göre çatıyı belirleme','İmla ve Büyük Harf Kullanımı':'Büyük harflerin ve özel adların doğru yazımını belirleme','Ekler':'Yapım ve çekim eklerinin görevlerini ayırt etme','Tamlamalar':'İsim ve sıfat tamlamalarını belirleme','Sözcük Grupları':'Sözcük gruplarının kuruluş ve anlam özelliklerini belirleme','Metin Türleri':'Metin türlerini ayırt etme','Anlatım Özellikleri':'Açıklık, duruluk, yalınlık ve akıcılık özelliklerini ayırt etme'},
'Matematik':{
'Kesir Problemleri':'Kesirlerle kurulan günlük yaşam problemlerini çözme','Yüzde Problemleri':'Yüzde değişim ve oran problemlerini çözme','Kâr-Zarar Problemleri':'Alış-satış fiyatından kâr veya zarar hesaplama','Faiz Problemleri':'Basit faiz üzerinden ana para, oran ve süre ilişkisini hesaplama','Veri ve İstatistik':'Aritmetik ortalama, açıklık ve temel veri yorumlama','Geometri: Çokgenler':'Çokgenlerin iç açıları ve temel özelliklerini kullanma','Geometri: Doğru ve Doğruda Açılar':'Doğruda açılar ve açı ilişkilerini kullanma','Geometri: Alan':'Temel düzlemsel şekillerin alanlarını hesaplama','Geometri: Hacim':'Prizma ve temel katı cisimlerin hacmini hesaplama','Geometri: Benzerlik':'Benzer şekillerde uzunluk ve oran ilişkilerini kullanma'},
'Tarih':{
'III. Selim ve Nizam-ı Cedid':'III. Selim dönemindeki Nizam-ı Cedid yeniliklerini değerlendirme','Tanzimat ve Islahat':'Tanzimat ve Islahat Fermanlarının temel amaçlarını ayırt etme','Meşrutiyetler':'I. ve II. Meşrutiyet dönemlerinin temel özelliklerini karşılaştırma','Trablusgarp ve Balkan Savaşları':'Trablusgarp ve Balkan savaşlarının neden ve sonuçlarını ayırt etme','Cumhuriyet Dönemi Kültür ve Eğitim':'Cumhuriyet dönemindeki kültür ve eğitim inkılaplarını değerlendirme','Ekonomi Politikaları ve İzmir İktisat':'İzmir İktisat Kongresi ve erken Cumhuriyet ekonomi politikalarını değerlendirme','Atatürk Dönemi Antlaşmaları':'Atatürk dönemindeki temel antlaşmaların sonuçlarını ayırt etme','Milli Mücadele Kongreleri':'Erzurum ve Sivas kongrelerinin Milli Mücadeledeki rolünü değerlendirme'},
'Coğrafya':{
'Türkiye Toprakları':'Türkiye’de toprak türlerinin oluşum ve dağılış özelliklerini değerlendirme','Türkiye Suları':'Türkiye’nin akarsu, göl ve yeraltı su kaynaklarını değerlendirme','Ormancılık':'Türkiye’de ormanların dağılışı ve ormancılık faaliyetlerini değerlendirme','Balıkçılık':'Türkiye’de balıkçılığın gelişimini etkileyen doğal ve ekonomik koşulları değerlendirme','İç Kuvvetler':'Orojenez, epirojenez, volkanizma ve depremlerin yer şekillerine etkisini değerlendirme','Dış Kuvvetler':'Akarsu, rüzgâr, buzul ve dalgaların oluşturduğu yer şekillerini ayırt etme','Doğal Afetler':'Türkiye’de görülen doğal afetlerin neden ve sonuçlarını değerlendirme','Nüfus ve Göç':'Nüfus hareketleri ve göçün neden-sonuçlarını değerlendirme','Ekonomik Faaliyetler':'Türkiye’de ekonomik faaliyetlerin doğal ve beşeri koşullarla ilişkisini değerlendirme','Enerji Kaynakları':'Türkiye’nin yenilenebilir ve yenilenemez enerji kaynaklarını ayırt etme','Tarım Ürünleri':'Türkiye’de tarım ürünlerinin dağılışını iklim ve toprakla ilişkilendirme','Ulaşım ve Ticaret Yolları':'Türkiye’nin ulaşım ağları ve ticaret yollarının özelliklerini değerlendirme','Turizm ve Kültürel Miras':'Türkiye’de turizm merkezlerini doğal ve kültürel özellikleriyle eşleştirme'},
'Vatandaşlık':{
'Hukukun Kaynakları':'Anayasa, kanun, yönetmelik ve diğer hukuk kaynaklarının yerini ayırt etme','Devlet Şekilleri':'Devlet biçimleri ve egemenlik anlayışlarını ayırt etme','Kişi Hakları':'Kişinin temel hak ve özgürlüklerinin kapsamını değerlendirme','Sosyal ve Ekonomik Haklar':'Sosyal ve ekonomik hakların kapsamını ayırt etme','Siyasi Haklar':'Siyasi hakların kapsamını ve kullanımını değerlendirme','TBMM Yapısı ve İşleyişi':'TBMM’nin oluşumu, görevleri ve çalışma usullerini değerlendirme','Cumhurbaşkanı ve Yürütme':'Cumhurbaşkanı ve yürütme organının anayasal görevlerini ayırt etme'}
};
for(const [subject,map] of Object.entries(newSeeds)){
  const siblings=curriculum[subject];
  for(const [topic,correct] of Object.entries(map)){
    if(!valid.has(subject+'|'+topic)) continue;
    if(!B.some(q=>q&&q.subject===subject&&q.topic===topic)){
      const opts=[correct,...siblings.filter(x=>x!==topic).slice(0,4)];
      B.push(seed(subject,topic,correct,opts.slice(1)));
    }
  }
}
for(let i=B.length-1;i>=0;i--){
  const q=B[i];
  if(!q || !valid.has(String(q.subject)+'|'+String(q.topic))) B.splice(i,1);
}
window.KPSS_CURRICULUM=curriculum;
window.KPSS_TOPIC_MATRIX={total:153,counts:Object.fromEntries(Object.entries(curriculum).map(([s,ts])=>[s,ts.length])),version:'2026-153-TOPIC-LOCKED'};
window.KPSS_BANK=B;
})();
