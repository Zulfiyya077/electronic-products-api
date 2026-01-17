# Öz Şəkillərinizi Əlavə Etmək - Addım-Addım Təlimat

## Metod 1: Imgur İstifadə Etmək (Ən Asan) ✅

### Addım 1: Şəkilləri Yükləyin
1. https://imgur.com saytına daxil olun
2. "New post" düyməsinə klik edin
3. Şəkillərinizi seçin və yükləyin
4. **Vacib:** Hər şəkil üçün ayrı-ayrı yükləyin (və ya bir neçə şəkli birlikdə yükləyib sonra ayrı-ayrı linkləri götürün)

### Addım 2: Direct Link Götürün
1. Yüklənmiş şəkilə klik edin
2. Sağ tərəfdə "Copy link" düyməsinə klik edin
3. **"Direct link"** seçin (məs: `https://i.imgur.com/xxxxx.jpg`)
4. Bu linki kopyalayın

### Addım 3: server.js-də Əlavə Edin
1. `server.js` faylını açın
2. Məhsulun `images` array-ini tapın
3. Placeholder linkləri öz şəkil linklərinizlə əvəz edin

**Nümunə:**
```javascript
{
  id: 1,
  title: "iPhone 14 Pro",
  // ... digər məlumatlar
  images: [
    "https://i.imgur.com/your-image1.jpg",  // ← Öz linkiniz
    "https://i.imgur.com/your-image2.jpg",  // ← Öz linkiniz
    "https://i.imgur.com/your-image3.jpg"   // ← Öz linkiniz
  ]
}
```

---

## Metod 2: Cloudinary İstifadə Etmək (Professional)

### Addım 1: Hesab Yaratmaq
1. https://cloudinary.com saytına daxil olun
2. "Sign up for free" düyməsinə klik edin
3. Pulsuz plan seçin

### Addım 2: Şəkilləri Yükləmək
1. Dashboard-da "Media Library" bölməsinə gedin
2. "Upload" düyməsinə klik edin
3. Şəkillərinizi yükləyin

### Addım 3: Link Götürmək
1. Yüklənmiş şəkilə klik edin
2. "Copy URL" düyməsinə klik edin
3. Linki kopyalayın (məs: `https://res.cloudinary.com/.../image/upload/...`)

### Addım 4: server.js-də Əlavə Edin
Yuxarıdakı kimi `images` array-ində istifadə edin.

---

## Metod 3: GitHub-dan İstifadə Etmək

### Addım 1: Şəkilləri Repository-yə Əlavə Edin
1. Layihə qovluğunda `images` qovluğu yaradın
2. Şəkillərinizi bu qovluğa kopyalayın
3. GitHub-a push edin

### Addım 2: GitHub Pages Aktiv Edin
1. Repository Settings → Pages
2. Source: `main` branch seçin
3. Save edin

### Addım 3: Link Yaratmaq
GitHub Pages URL-i:
```
https://YOUR_USERNAME.github.io/electronic-products-api/images/product1.jpg
```

---

## Metod 4: Render Static Files (Ən Sadə - Tövsiyə Edilir)

### Addım 1: Şəkilləri Layihəyə Əlavə Edin
1. Layihə qovluğunda `public/images` qovluğu yaradın
2. Şəkillərinizi bu qovluğa kopyalayın

### Addım 2: server.js-də Static Files Konfiqurasiyası
`server.js` faylında əlavə edin:

```javascript
// Static files middleware (images üçün)
app.use('/images', express.static('public/images'));
```

### Addım 3: Link Yaratmaq
```
https://electronic-products-api.onrender.com/images/product1.jpg
```

---

## ⚡ Tez Həll: Imgur İstifadə Edin

1. **Imgur-a daxil olun:** https://imgur.com
2. **Şəkilləri yükləyin:** "New post" → şəkilləri seçin
3. **Link götürün:** Hər şəkil üçün "Copy link" → "Direct link"
4. **server.js-də əvəz edin:** Placeholder linkləri öz linklərinizlə

**Nümunə:**
```javascript
// Əvvəl (placeholder):
images: [
  "https://via.placeholder.com/500x500/000000/FFFFFF?text=iPhone+14+Pro+1"
]

// Sonra (öz şəkliniz):
images: [
  "https://i.imgur.com/abc123.jpg"
]
```

---

## Test Etmək

1. `server.js`-də dəyişiklikləri edin
2. Local-də test edin: `node server.js`
3. Browser-də açın: `http://localhost:3000/api/products/1`
4. `images` array-indəki linkləri browser-də açın
5. Əgər şəkillər açılırsa, GitHub-a push edin

---

## Qeyd

- **Imgur** ən asan və sürətli yoldur
- **Cloudinary** professional layihələr üçün yaxşıdır
- **GitHub Pages** pulsuzdur, amma daha çox iş tələb edir
- **Render Static Files** ən sadədir, amma server.js-də dəyişiklik lazımdır

**Tövsiyə:** İlk dəfə üçün **Imgur** istifadə edin! 🚀
