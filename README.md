# KPSS MOBİL

### Akıllı Soru & Deneme Platformu

KPSS hazırlığı için mobil-first, karanlık lacivert/mor tasarım diliyle hazırlanmış bağımsız web uygulaması. Proje şu aşamada backend gerektirmeden tarayıcı üzerinde çalışan fonksiyonel bir prototiptir.

## Mevcut özellikler

- 🏠 Ana sayfa ve günlük hedef ilerlemesi
- 📚 Genel Yetenek / Genel Kültür ders listesi
- 🔎 Ders arama
- 📖 Konu listesi ve konu başarı oranları
- ❓ Etkileşimli soru çözme
- ✅ Doğru/yanlış değerlendirmesi ve çözüm açıklaması
- ⭐ Favoriye ekleme
- ⏰ Sonra çöz aksiyonu
- 🔁 Yanlış soruları otomatik kaydetme ve tekrar çözme
- 📝 Deneme seçenekleri ve süreli deneme akışı
- ⏱️ Soru çözme zamanlayıcısı
- 📊 Performans, başarı oranı ve tahmini net
- 🎯 Günlük hedefin dinamik ilerlemesi
- 👤 Profil, XP ve rozet ekranı
- 💾 LocalStorage ile tarayıcı içi ilerleme kaydı
- 📱 Responsive mobil arayüz ve alt navigasyon

## Teknik yapı

İlk sürüm tek dosyalı bir uygulama olarak tutuluyor:

- `index.html` — arayüz, stiller ve istemci tarafı uygulama mantığı
- `package.json` — Vite geliştirme/build komutları
- `README.md` — proje dokümantasyonu

## Çalıştırma

```bash
npm install
npm run dev
```

Üretim build'i:

```bash
npm run build
```

## Sonraki teknik aşama

1. Supabase Authentication
2. Gerçek soru bankası ve konu veri modeli
3. Kullanıcı bazlı ilerleme senkronizasyonu
4. Gerçek deneme motoru ve sonuç/karne sistemi
5. Favoriler, yanlışlar ve sonra çöz listesinin sunucu tarafında tutulması
6. Spaced repetition / akıllı tekrar algoritması
7. KPSS Lisans, Ön Lisans ve Ortaöğretim profilleri
8. PWA ve Android paketleme
9. Bildirim sistemi
10. Yönetim paneli ve soru içerik yönetimi

> Demo soruları özgün örnek veridir. ÖSYM'nin telifli soru içerikleri bu repoya eklenmemiştir. Resmi sınav bilgileri için ÖSYM'nin güncel duyuruları takip edilmelidir.
