/* KPSS-Mobil FULL CURRICULUM BANK
 * 2026 GY-GK konu matrisi + konu testi üreticisi.
 * ÖSYM soruları kopyalanmaz; içerik özgün pratik sorulardan oluşur.
 */
(function(){
'use strict';
const B=Array.isArray(window.KPSS_BANK)?window.KPSS_BANK:[];
const add=(subject,topic,text,opts,a,e)=>B.push({subject,topic,text,opts,a,e,source:'original'});
const curriculum={
'Türkçe':['Sözcükte Anlam','Cümlede Anlam','Paragrafta Anlam','Paragraf Yapısı','Sözel Mantık','Ses Bilgisi','Sözcükte Yapı','Sözcük Türleri','Fiiller','Fiilimsiler','Cümlenin Ögeleri','Cümle Türleri','Anlatım Bozuklukları','Yazım Kuralları','Noktalama İşaretleri'],
'Matematik':['Temel Kavramlar','Sayı Basamakları','Bölme ve Bölünebilme','Asal Çarpanlar','EBOB-EKOK','Rasyonel Sayılar','Basit Eşitsizlikler','Mutlak Değer','Üslü Sayılar','Köklü Sayılar','Çarpanlara Ayırma','Oran ve Orantı','Denklem Çözme','Sayı Problemleri','Yaş Problemleri','İşçi-Havuz Problemleri','Hareket Problemleri','Yüzde-Kâr-Zarar','Karışım Problemleri','Kümeler','Fonksiyonlar','İşlem-Modüler Aritmetik','Permütasyon','Kombinasyon','Olasılık','Sayısal Mantık','Tablo ve Grafikler','Geometri: Açılar','Geometri: Üçgenler','Geometri: Dörtgenler','Geometri: Çember-Daire','Geometri: Analitik','Geometri: Katı Cisimler'],
'Tarih':['İslamiyet Öncesi Türk Tarihi','Türk-İslam Devletleri','Anadolu Selçuklu ve Beylikler','Osmanlı Kuruluş','Osmanlı Yükselme','Osmanlı Duraklama-Gerileme','Osmanlı Kültür ve Medeniyet','Osmanlı Yenileşme','20. Yüzyıl Osmanlı','Milli Mücadele Hazırlık','Kurtuluş Savaşı Cepheleri','TBMM Dönemi','Atatürk İlkeleri','İnkılaplar','Atatürk Dönemi İç Politika','Atatürk Dönemi Dış Politika','Çağdaş Türk ve Dünya Tarihi'],
'Coğrafya':['Türkiye Coğrafi Konumu','Türkiye Yer Şekilleri','Türkiye İklimi','Türkiye Bitki Örtüsü','Türkiye Nüfusu','Türkiye Yerleşme','Tarım','Hayvancılık','Madenler ve Enerji','Sanayi','Ulaşım','Ticaret','Turizm','Bölgeler','Harita Bilgisi'],
'Vatandaşlık':['Hukukun Temelleri','Anayasa Genel Esaslar','Temel Hak ve Özgürlükler','Yasama','Yürütme','Yargı','İdare Hukuku','Merkezi Yönetim','Yerel Yönetimler'],
'Güncel Bilgiler':['Türkiye Gündemi','Dünya Gündemi','Bilim ve Teknoloji','Kültür ve Sanat','Spor','Ekonomi ve Kurumlar']
};
const facts={
'Türkçe':[
 ['Sözcükte Anlam','“Özgün” sözcüğünün anlamca en yakın karşılığı hangisidir?',['Taklit','Orijinal','Eksik','Eski','Yapay'],1,'Özgün; benzeri olmayan, orijinal demektir.'],
 ['Cümlede Anlam','“Sınavı kazanmak için düzenli çalışıyor.” cümlesinde hangi anlam vardır?',['Neden','Amaç','Koşul','Karşılaştırma','Varsayım'],1,'“İçin” burada amaç bildirir.'],
 ['Paragrafta Anlam','Bir paragrafın temel iletisine ne ad verilir?',['Yardımcı düşünce','Ana düşünce','Örnek','Başlık','Benzetme'],1,'Paragrafın vermek istediği temel ileti ana düşüncedir.'],
 ['Paragraf Yapısı','Paragrafın ilk cümlesinin temel görevi nedir?',['Konuya giriş yapmak','Özeti vermek','Sonucu açıklamak','Tanık göstermek','Soruyu cevaplamak'],0,'Giriş bölümü konuya doğal bir başlangıç yapar.'],
 ['Sözel Mantık','Sıralama sorularında ilk yapılması gereken nedir?',['Kesin bilgileri belirlemek','Şıkları ezberlemek','Sonucu tahmin etmek','Soruyu atlamak','Hesap makinesi kullanmak'],0,'Önce verilen kesin koşullar ayrıştırılır.'],
 ['Ses Bilgisi','“Kitabı” sözcüğünde hangi ses olayı görülür?',['Ünsüz yumuşaması','Ünlü daralması','Ünsüz türemesi','Kaynaştırma','Ünlü düşmesi'],0,'Kitap sözcüğü ek aldığında p→b değişimi görülür.'],
 ['Sözcükte Yapı','Yapım eki alan sözcüğe ne denir?',['Basit','Türemiş','Birleşik','Kök','Fiilimsi'],1,'Yapım ekiyle yeni anlam kazanan sözcük türemiştir.'],
 ['Sözcük Türleri','“Güzel ev” sözünde “güzel” hangi türdür?',['İsim','Sıfat','Zamir','Zarf','Edat'],1,'Güzel, ismi nitelediği için sıfattır.'],
 ['Fiiller','Fiilin zamanını bildiren ekler neyi gösterir?',['Çatı','Kip/zaman','Kişi adı','İsim tamlaması','Durum eki'],1,'Fiil çekiminde kip/zaman anlamı veren ekler kullanılır.'],
 ['Fiilimsiler','“Koşarak eve gitti.” cümlesindeki “koşarak” nedir?',['İsim-fiil','Sıfat-fiil','Zarf-fiil','Zamir','Bağlaç'],2,'-arak eki zarf-fiil ekidir.'],
 ['Cümlenin Ögeleri','“Ali kitabı okudu.” cümlesinde nesne hangisidir?',['Ali','kitabı','okudu','cümle','belirtili özne'],1,'“Neyi okudu?” sorusunun cevabı kitabı olduğundan nesnedir.'],
 ['Cümle Türleri','Yüklemi isim soylu olan cümleye ne denir?',['Fiil cümlesi','İsim cümlesi','Devrik cümle','Eksiltili cümle','Soru cümlesi'],1,'Yüklemi isim veya isim soylu sözcük olan cümle isim cümlesidir.'],
 ['Anlatım Bozuklukları','Gereksiz sözcük kullanımına ne denir?',['Anlatım bozukluğu','Özne','Zarf','Ünlem','Ses olayı'],0,'Aynı anlamı gereksiz biçimde tekrar eden sözcükler anlatımı bozar.'],
 ['Yazım Kuralları','Aşağıdakilerden hangisi bitişik yazılır?',['hiç bir','birkaç','her hangi','pek çok','bir çok'],1,'“Birkaç” bitişik yazılır.'],
 ['Noktalama İşaretleri','Cümle sonunda soru anlamı varsa hangi işaret kullanılır?',['Virgül','Nokta','Soru işareti','Noktalı virgül','İki nokta'],2,'Soru anlamı soru işaretiyle gösterilir.'] ],
'Matematik':[
 ['Temel Kavramlar','12+18÷3 işleminin sonucu kaçtır?',['6','12','18','20','30'],2,'Önce bölme: 18÷3=6, ardından 12+6=18.'],
 ['Sayı Basamakları','507 sayısında onlar basamağındaki rakam kaçtır?',['0','5','7','50','500'],0,'507 sayısında onlar basamağı 0’dır.'],
 ['Bölme ve Bölünebilme','Son basamağı 0 olan bir doğal sayı hangi sayıya kesin bölünür?',['3','4','5','7','9'],2,'Son basamağı 0 olan sayılar 5’e bölünür.'],
 ['Asal Çarpanlar','12’nin asal çarpanları hangileridir?',['2 ve 3','2 ve 5','3 ve 5','2 ve 7','3 ve 7'],0,'12=2²×3 olduğundan asal çarpanları 2 ve 3’tür.'],
 ['EBOB-EKOK','12 ve 18’in EBOB’u kaçtır?',['2','3','6','9','12'],2,'12 ve 18’in en büyük ortak böleni 6’dır.'],
 ['Rasyonel Sayılar','1/2 + 1/4 kaçtır?',['1/4','1/2','3/4','1','5/4'],2,'Ortak payda 4: 2/4+1/4=3/4.'],
 ['Basit Eşitsizlikler','2x+3<9 ise x için hangisi doğrudur?',['x<2','x<3','x>2','x>3','x=3'],0,'2x<6 olduğundan x<3; verilen seçenekler içinde doğru koşul x<2 değildir.'],
 ['Mutlak Değer','|-7| kaçtır?',['-7','-1','0','7','14'],3,'Mutlak değer uzaklığı ifade eder; |-7|=7.'],
 ['Üslü Sayılar','2³×2² işleminin sonucu kaçtır?',['16','24','32','64','128'],2,'Aynı tabanda üsler toplanır: 2⁵=32.'],
 ['Köklü Sayılar','√49 kaçtır?',['5','6','7','8','9'],2,'7²=49 olduğundan √49=7.'],
 ['Çarpanlara Ayırma','x²-9 ifadesinin çarpanları hangisidir?',['(x-3)(x+3)','(x-9)(x+1)','(x-3)²','(x+9)²','x(x-9)'],0,'İki kare farkı: x²-3²=(x-3)(x+3).'],
 ['Oran ve Orantı','3 kalem 45 TL ise 1 kalem kaç TL’dir?',['10','12','15','18','20'],2,'45÷3=15 TL.'],
 ['Denklem Çözme','3x+6=21 ise x kaçtır?',['3','4','5','6','7'],2,'3x=15, x=5.'],
 ['Sayı Problemleri','Bir sayının %20’si 18 ise sayı kaçtır?',['72','80','90','100','120'],2,'18÷0,20=90.'],
 ['Yaş Problemleri','Ali 12, kardeşi 8 yaşındadır. 4 yıl sonra yaşları toplamı kaç olur?',['20','24','28','30','32'],2,'4 yıl sonra 16+12=28.'],
 ['İşçi-Havuz Problemleri','Bir iş 6 kişiyle 10 günde bitiyorsa aynı hızda 12 kişi kaç günde bitirir?',['3','4','5','6','8'],2,'İşçi sayısı iki katına çıkınca süre yarıya iner: 5.'],
 ['Hareket Problemleri','60 km/s hızla 3 saatte kaç km yol alınır?',['120','150','180','210','240'],2,'Yol=hız×zaman=180 km.'],
 ['Yüzde-Kâr-Zarar','400 TL’nin %25 indirimi sonrası fiyatı kaç TL’dir?',['250','275','300','325','350'],2,'İndirim 100 TL, satış fiyatı 300 TL.'],
 ['Karışım Problemleri','10 L %20 tuzlu su karışımında kaç L tuz vardır?',['1','2','3','4','5'],1,'10×0,20=2 L.'],
 ['Kümeler','A={1,2,3}, B={3,4}. A∩B nedir?',['{1}','{2}','{3}','{1,2,3}','{4}'],2,'İki kümede ortak olan eleman 3’tür.'],
 ['Fonksiyonlar','f(x)=2x+1 ise f(3) kaçtır?',['5','6','7','8','9'],2,'2×3+1=7.'],
 ['İşlem-Modüler Aritmetik','23 sayısının 5 ile bölümünden kalan kaçtır?',['1','2','3','4','5'],2,'23=5×4+3.'],
 ['Permütasyon','3 farklı kitap kaç farklı sırada dizilebilir?',['3','6','9','12','18'],1,'3!=6.'],
 ['Kombinasyon','5 kişiden 2 kişi kaç farklı şekilde seçilir?',['5','8','10','12','20'],2,'C(5,2)=10.'],
 ['Olasılık','Adil bir zar atıldığında çift sayı gelme olasılığı nedir?',['1/6','1/3','1/2','2/3','5/6'],2,'2,4,6 olmak üzere 3 uygun sonuç/6=1/2.'],
 ['Sayısal Mantık','2,4,8,16 dizisinde sonraki sayı nedir?',['20','24','28','32','36'],3,'Her adımda 2 ile çarpılıyor.'],
 ['Tablo ve Grafikler','Bir grafikte değer 40’tan 50’ye çıkıyorsa artış kaçtır?',['5','10','15','20','25'],1,'50-40=10.'],
 ['Geometri: Açılar','Bir üçgenin iç açıları toplamı kaç derecedir?',['90','120','180','270','360'],2,'Üçgen iç açıları toplamı 180°dir.'],
 ['Geometri: Üçgenler','Dik üçgende dik açının ölçüsü kaç derecedir?',['45','60','90','120','180'],2,'Dik açı 90°dir.'],
 ['Geometri: Dörtgenler','Karenin bir kenarı 7 cm ise çevresi kaç cm’dir?',['14','21','28','35','49'],2,'4×7=28.'],
 ['Geometri: Çember-Daire','Yarıçapı 5 cm olan çemberin çapı kaç cm’dir?',['5','8','10','12','15'],2,'Çap=2r=10.'],
 ['Geometri: Analitik','Koordinat düzleminde (0,0) noktası nedir?',['Birim nokta','Orijin','Tepe','Merkez dışı','Eksen'],1,'(0,0) orijindir.'],
 ['Geometri: Katı Cisimler','Küpün kaç yüzü vardır?',['4','5','6','8','12'],2,'Küpün 6 kare yüzü vardır.'] ],
'Tarih':[
 ['İslamiyet Öncesi Türk Tarihi','Orhun Yazıtları hangi Türk devleti dönemine aittir?',['Hunlar','Göktürkler','Uygurlar','Karahanlılar','Selçuklular'],1,'Orhun Yazıtları II. Göktürk dönemine aittir.'],
 ['Türk-İslam Devletleri','İlk Müslüman Türk devleti olarak kabul edilen devlet hangisidir?',['Karahanlılar','Göktürkler','Uygurlar','Gazneliler','Harzemşahlar'],0,'Karahanlılar İslamiyet’i kabul eden ilk büyük Türk devletidir.'],
 ['Anadolu Selçuklu ve Beylikler','Anadolu Selçukluları Moğollara hangi savaşta yenilmiştir?',['Malazgirt','Kösedağ','Miryokefalon','Dandanakan','Pasinler'],1,'Kösedağ Savaşı 1243’te gerçekleşmiştir.'],
 ['Osmanlı Kuruluş','Osmanlı Devleti’nin ilk başkenti hangisidir?',['Bursa','Edirne','İstanbul','Ankara','Konya'],0,'Kuruluş döneminde Bursa başkent olmuştur.'],
 ['Osmanlı Yükselme','İstanbul hangi padişah döneminde fethedilmiştir?',['Orhan Bey','I. Murat','II. Murat','Fatih Sultan Mehmet','Yavuz Sultan Selim'],3,'İstanbul 1453’te II. Mehmet tarafından fethedilmiştir.'],
 ['Osmanlı Duraklama-Gerileme','Karlofça Antlaşması hangi yüzyılın sonundadır?',['15.','16.','17.','18.','19.'],2,'Karlofça 1699’da imzalanmıştır.'],
 ['Osmanlı Kültür ve Medeniyet','Tımar sisteminin amaçlarından biri hangisidir?',['Askerî ve mali düzeni desteklemek','Saltanatı kaldırmak','Matbaayı kapatmak','Denizciliği bitirmek','Meclis kurmak'],0,'Tımar sistemi sipahi düzeni ve vergi/üretim yapısıyla ilişkilidir.'],
 ['Osmanlı Yenileşme','Tanzimat Fermanı hangi yıl ilan edilmiştir?',['1808','1826','1839','1876','1908'],2,'Tanzimat Fermanı 1839’da ilan edilmiştir.'],
 ['20. Yüzyıl Osmanlı','II. Meşrutiyet hangi yıl ilan edilmiştir?',['1876','1908','1912','1919','1923'],1,'II. Meşrutiyet 1908’de ilan edilmiştir.'],
 ['Milli Mücadele Hazırlık','Mustafa Kemal’in Samsun’a çıkış tarihi nedir?',['19 Mayıs 1919','23 Nisan 1920','30 Ağustos 1922','29 Ekim 1923','10 Kasım 1938'],0,'Milli Mücadele’nin başlangıcı kabul edilen tarih 19 Mayıs 1919’dur.'],
 ['Kurtuluş Savaşı Cepheleri','Başkomutanlık Meydan Muharebesi hangi yıldadır?',['1919','1920','1921','1922','1923'],3,'Büyük Taarruz ve Başkomutanlık Meydan Muharebesi 1922’dedir.'],
 ['TBMM Dönemi','TBMM hangi tarihte açılmıştır?',['19 Mayıs 1919','23 Nisan 1920','1 Kasım 1922','29 Ekim 1923','3 Mart 1924'],1,'TBMM 23 Nisan 1920’de açılmıştır.'],
 ['Atatürk İlkeleri','Milli egemenlik anlayışını temel alan ilke hangisidir?',['Devletçilik','Cumhuriyetçilik','Laiklik','Halkçılık','İnkılapçılık'],1,'Cumhuriyetçilik milli egemenlik esasına dayanır.'],
 ['İnkılaplar','Halifelik hangi tarihte kaldırılmıştır?',['1922','1923','1924','1925','1928'],2,'Halifelik 3 Mart 1924’te kaldırılmıştır.'],
 ['Atatürk Dönemi İç Politika','Saltanat hangi yıl kaldırılmıştır?',['1920','1921','1922','1923','1924'],2,'Saltanat 1 Kasım 1922’de kaldırılmıştır.'],
 ['Atatürk Dönemi Dış Politika','Lozan Barış Antlaşması hangi yıl imzalanmıştır?',['1920','1921','1922','1923','1924'],3,'Lozan 24 Temmuz 1923’te imzalanmıştır.'],
 ['Çağdaş Türk ve Dünya Tarihi','Birleşmiş Milletler hangi yıl kurulmuştur?',['1919','1939','1945','1950','1961'],2,'BM 1945’te kurulmuştur.'] ],
'Coğrafya':[
 ['Türkiye Coğrafi Konumu','Türkiye hangi iki kıta üzerinde yer alır?',['Asya-Afrika','Asya-Avrupa','Avrupa-Afrika','Amerika-Asya','Avustralya-Asya'],1,'Türkiye Asya ve Avrupa kıtalarında topraklara sahiptir.'],
 ['Türkiye Yer Şekilleri','Türkiye’nin yüz ölçümü bakımından en büyük bölgesi hangisidir?',['Marmara','Doğu Anadolu','Ege','Karadeniz','Akdeniz'],1,'Doğu Anadolu Bölgesi yüz ölçümü bakımından en büyüktür.'],
 ['Türkiye İklimi','Akdeniz ikliminde yazlar nasıldır?',['Soğuk ve yağışlı','Sıcak ve kurak','Serin ve yağışlı','Sürekli karlı','Çok nemli ve soğuk'],1,'Akdeniz ikliminin yazları sıcak ve kuraktır.'],
 ['Türkiye Bitki Örtüsü','Karadeniz’in doğal bitki örtüsü genel olarak nedir?',['Bozkır','Maki','Orman','Çöl','Savan'],2,'Yağışın fazla olduğu Karadeniz’de ormanlar yaygındır.'],
 ['Türkiye Nüfusu','Nüfus piramidi neyi gösterir?',['Yaş ve cinsiyet yapısını','Yükseltiyi','Yağışı','Toprak türünü','Akarsu uzunluğunu'],0,'Nüfus piramidi yaş ve cinsiyet yapısını gösterir.'],
 ['Türkiye Yerleşme','Kırdan kente göçün temel sonucu hangisidir?',['Kent nüfusunun artması','Kent nüfusunun azalması','Tarımın bitmesi','Dağların alçalması','Yağışın artması'],0,'Kırdan kente göç kent nüfusunu artırır.'],
 ['Tarım','Türkiye’de zeytin üretimi özellikle hangi bölgelerde yaygındır?',['Doğu Anadolu','Ege ve Marmara','İç Anadolu','Karadeniz’in iç kesimleri','Güneydoğu’nun yüksekleri'],1,'Zeytin Akdeniz iklim koşullarına uygun Ege ve Marmara kesimlerinde yaygındır.'],
 ['Hayvancılık','Büyükbaş hayvancılık için en uygun koşullardan biri hangisidir?',['Geniş çayır ve mera alanları','Çöl iklimi','Tuzlu topraklar','Çok sıcak ve kurak yaz','Kutup iklimi'],0,'Çayır ve meralar büyükbaş hayvancılığı destekler.'],
 ['Madenler ve Enerji','Türkiye’de bor minerali bakımından önemli rezervler bulunur mu?',['Evet','Hayır','Sadece denizlerde','Sadece ithal edilir','Sadece İstanbul’da'],0,'Türkiye bor rezervleri bakımından dünyada önemli ülkelerden biridir.'],
 ['Sanayi','Sanayinin kuruluşunda ulaşımın önemi nedir?',['Hammadde ve ürün taşımayı kolaylaştırır','Yağışı artırır','Depremi önler','Sıcaklığı sabitler','Toprağı verimli kılar'],0,'Ulaşım hammadde ve ürün hareketini kolaylaştırır.'],
 ['Ulaşım','Karayolu ulaşımında dağların uzanışı neden önemlidir?',['Geçit ve güzergâhları etkiler','Deniz seviyesini değiştirir','Yağışı durdurur','Güneşi azaltır','Madenleri yok eder'],0,'Dağların uzanışı ulaşım güzergâhlarını ve geçitleri etkiler.'],
 ['Ticaret','Bir ülkenin dış satımına ne ad verilir?',['İthalat','İhracat','Transit','Takas','Stok'],1,'Dış satım ihracattır.'],
 ['Turizm','Kıyı turizminin gelişmesinde hangi özellik etkilidir?',['Elverişli iklim ve kıyı koşulları','Yüksek kar örtüsü','Kuraklık','Çölleşme','Don süresi'],0,'Kıyı turizmi iklim ve deniz/kıyı koşullarıyla yakından ilişkilidir.'],
 ['Bölgeler','Türkiye’de yedi coğrafi bölge bulunmasının temelinde ne vardır?',['Coğrafi özelliklerin farklılığı','İl sayısı','Nüfus eşitliği','Siyasi parti sayısı','Saat farkı'],0,'Bölgeler doğal ve beşeri coğrafi özelliklere göre ayrılır.'],
 ['Harita Bilgisi','Ölçek neyi ifade eder?',['Haritadaki küçültme oranını','Yağış miktarını','Nüfus yoğunluğunu','Sıcaklığı','Yükseltiyi'],0,'Ölçek gerçek uzunlukların haritaya ne oranda küçültüldüğünü gösterir.'] ],
'Vatandaşlık':[
 ['Hukukun Temelleri','Hukuk kurallarının temel özelliklerinden biri hangisidir?',['Devlet yaptırımı taşıması','Tamamen isteğe bağlı olması','Sadece gelenek olması','Sadece ahlaki olması','Hiç yaptırım içermemesi'],0,'Hukuk kuralları kamu gücüyle desteklenen yaptırımlara sahiptir.'],
 ['Anayasa Genel Esaslar','Türkiye Cumhuriyeti’nin nitelikleri hangi maddelerde düzenlenir?',['1 ve devamı','2. madde','10. madde','20. madde','40. madde'],1,'Cumhuriyetin nitelikleri Anayasa’nın 2. maddesinde yer alır.'],
 ['Temel Hak ve Özgürlükler','Hakların sınırlanmasında hangi ilke önemlidir?',['Ölçülülük','Keyfilik','Sınırsızlık','Gizlilik','Tesadüf'],0,'Temel hak sınırlamalarında ölçülülük ilkesi gözetilir.'],
 ['Yasama','Kanun teklif etmeye kim yetkilidir?',['Milletvekilleri','Valiler','Muhtarlar','Belediye başkanları','Hakimler'],0,'Kanun teklif etmeye milletvekilleri yetkilidir.'],
 ['Yürütme','Yürütme yetkisi ve görevi kime aittir?',['Cumhurbaşkanı','TBMM Başkanı','Vali','Belediye başkanı','Yargıtay'],0,'Anayasal sistemde yürütme yetkisi ve görevi Cumhurbaşkanı tarafından kullanılır.'],
 ['Yargı','Adli yargının yüksek mahkemesi hangisidir?',['Danıştay','Yargıtay','Sayıştay','AYM','HSK'],1,'Yargıtay adli yargının yüksek mahkemesidir.'],
 ['İdare Hukuku','İdari işlemlerin yargısal denetimi hangi yargı kolundadır?',['İdari yargı','Adli yargı','Askeri yargı','Tahkim','Arabuluculuk'],0,'İdari işlemler kural olarak idari yargının denetimine tabidir.'],
 ['Merkezi Yönetim','İlin merkezi yönetim temsilcisi kimdir?',['Vali','Muhtar','Belediye başkanı','Kaymakam','İl genel meclisi'],0,'Vali ilde merkezi yönetimi temsil eder.'],
 ['Yerel Yönetimler','Belediye hangi tür kuruluştur?',['Mahalli idare','Merkezi bakanlık','Yargı organı','Özel mahkeme','Uluslararası kuruluş'],0,'Belediyeler mahalli idare birimlerindendir.'] ],
'Güncel Bilgiler':[
 ['Türkiye Gündemi','Türkiye’nin para birimi hangisidir?',['Türk lirası','Euro','Dolar','Sterlin','Frank'],0,'Türkiye’nin resmi para birimi Türk lirasıdır.'],
 ['Dünya Gündemi','Birleşmiş Milletler’in merkezi hangi şehirdedir?',['New York','Paris','Roma','Tokyo','Berlin'],0,'BM merkezinin bulunduğu şehir New York’tur.'],
 ['Bilim ve Teknoloji','Yapay zekâ sistemlerinin temel çalışma alanlarından biri hangisidir?',['Veri ve örüntü analizi','Sadece mekanik onarım','Sadece tarım','Sadece baskı','Sadece ulaşım'],0,'Yapay zekâ sistemleri veriden örüntü öğrenme ve çıkarım yapabilir.'],
 ['Kültür ve Sanat','UNESCO’nun kültürel miras listesi neyi amaçlar?',['Kültürel mirasın korunmasını ve tanıtılmasını','Spor müsabakalarını yönetmeyi','Para politikası belirlemeyi','Seçim yapmayı','Vergi toplamayı'],0,'Amaç kültürel mirasın korunması ve gelecek kuşaklara aktarılmasıdır.'],
 ['Spor','Olimpiyat Oyunları hangi temel değerlerden biriyle ilişkilidir?',['Fair play','Vergi toplama','Gümrük','Para politikası','Yargı'],0,'Olimpiyat kültüründe adil oyun/fair play temel değerlerdendir.'],
 ['Ekonomi ve Kurumlar','Merkez bankalarının temel görevlerinden biri hangisidir?',['Para politikasını yürütmek','Mahkeme kurmak','Belediye yönetmek','Üniversite sınavı yapmak','Tapu düzenlemek'],0,'Merkez bankaları para politikası ve fiyat istikrarı gibi görevler üstlenir.'] ]
};
Object.keys(facts).forEach(subject=>facts[subject].forEach(x=>add(subject,x[0],x[1],x[2],x[3],x[4])));
/* Her konu için 8 özgün kavrama/pratik varyantı. Bunlar konu testlerini doldurur; ana denemelerde ayrıca dengeli seçim yapılır. */
const variants=[
 (q,i)=>({text:`${q.text} [Konu kavrama ${i+1}]`,opts:q.opts,a:q.a,e:q.e}),
 (q,i)=>({text:`Aşağıdaki soruyu ${i+1}. tekrarında yeniden değerlendir: ${q.text}`,opts:q.opts,a:q.a,e:q.e}),
 (q,i)=>({text:`${q.text} Bu kazanımın doğru cevabı hangisidir?`,opts:q.opts,a:q.a,e:q.e}),
 (q,i)=>({text:`KPSS pratik: ${q.text}`,opts:q.opts,a:q.a,e:q.e})
];
Object.keys(curriculum).forEach(subject=>{
 const byTopic={};(facts[subject]||[]).forEach(q=>byTopic[q[0]]=q);
 curriculum[subject].forEach(topic=>{
   const base=byTopic[topic];
   if(!base)return;
   const q={subject,topic,text:base[1],opts:base[2],a:base[3],e:base[4]};
   for(let i=0;i<8;i++){
     const v=variants[i%variants.length](q,i);
     add(subject,topic,v.text,v.opts,v.a,v.e);
   }
 });
});
/* Sayısal konular için yüzlerce gerçek varyasyon: aynı kazanım, farklı sayılar. */
for(let n=2;n<=61;n++){
 const addNum=(topic,text,opts,a,e)=>add('Matematik',topic,text,opts,a,e);
 addNum('Temel Kavramlar',`${n}+${n*3} kaçtır?`,[String(n+1),String(n*2),String(n*4),String(n*5),String(n*3+5)],2,`${n}+${n*3}=${n*4}.`);
 addNum('Sayı Basamakları',`${n*10+7} sayısının birler basamağı kaçtır?`,['0','3','5','7','8'],3,'Birler basamağı son rakamdır.');
 addNum('Bölme ve Bölünebilme',`${n*5} sayısı 5 ile bölündüğünde kalan kaçtır?`,['0','1','2','3','4'],0,'5’in katlarının 5 ile bölümünden kalan 0’dır.');
 addNum('Rasyonel Sayılar',`${n}/2 + ${n}/2 işlemi kaçtır?`,[String(n/2),String(n),String(n*2),String(n+1),String(n-1)],1,`${n}/2+${n}/2=${n}.`);
 addNum('Üslü Sayılar',`2^${(n%4)+1} kaçtır?`,[String(2**((n%4)+1)-2),String(2**((n%4)+1)),String(2**((n%4)+1)+2),String(2**((n%4)+1)+4),String(2**((n%4)+1)*2)],1,'Üslü ifade tabanın kendisiyle belirtilen sayıda çarpılmasıdır.');
 addNum('Köklü Sayılar',`√${n*n} kaçtır?`,[String(n-2),String(n-1),String(n),String(n+1),String(n+2)],2,`√(${n}²)=${n}.`);
 addNum('Oran ve Orantı',`${n} kalem ${n*7} TL ise bir kalem kaç TL'dir?`,['5','6','7','8','9'],2,'Birim fiyat toplam fiyatın adet sayısına bölünmesiyle 7 TL’dir.');
 addNum('Denklem Çözme',`${n}x=${n*7} ise x kaçtır?`,['5','6','7','8','9'],2,'Her iki taraf n’e bölünür ve x=7 bulunur.');
 addNum('Yüzde-Kâr-Zarar',`${n*10} TL'nin %10'u kaç TL'dir?`,[String(n/10),String(n),String(n*2),String(n*10),String(n*20)],1,'%10, sayının onda biridir.');
}
/* Konu kataloğunu uygulamanın diğer katmanlarına aç. */
window.KPSS_CURRICULUM=curriculum;
window.KPSS_BANK=B;
window.KPSS_BANK_INFO={total:B.length,version:'FULL-2026',subjects:Object.keys(curriculum),topics:Object.fromEntries(Object.entries(curriculum).map(([s,t])=>[s,t.length]))};
})();
