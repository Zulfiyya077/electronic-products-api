# Şəkilləri Test Etmək - Praktik Addımlar

## ✅ Server İşləyir!

İndi aşağıdakı URL-ləri browser-də açın:

---

## Test 1: Şəkilləri Birbaşa Açmaq

### Browser-də bu URL-ləri açın (hər birini ayrı-ayrı):

1. **MacBook şəkli:**
   ```
   http://localhost:3000/images/macbook_PNG68.png
   ```
   ✅ **Gözlənilən nəticə:** MacBook şəkli görünməlidir

2. **Samsung şəkli:**
   ```
   http://localhost:3000/images/samsung.webp
   ```
   ✅ **Gözlənilən nəticə:** Samsung şəkli görünməlidir

3. **JBL şəkli:**
   ```
   http://localhost:3000/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp
   ```
   ✅ **Gözlənilən nəticə:** JBL şəkli görünməlidir

---

## Test 2: API-dən Məhsul Məlumatlarını Götürmək

### Browser-də açın:

```
http://localhost:3000/api/products/1
```

### Gözlənilən cavab (JSON):

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "iPhone 14 Pro",
    "images": [
      "http://localhost:3000/images/macbook_PNG68.png",
      "http://localhost:3000/images/samsung.webp",
      "http://localhost:3000/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp"
    ],
    ...
  }
}
```

### Sonra `images` array-indəki linkləri browser-də açın:
- Hər bir linkə klik edin və şəkillərin açıldığını yoxlayın ✅

---

## Test 3: Bütün Məhsullar

```
http://localhost:3000/api/products
```

Bu, bütün 50 məhsulu göstərəcək. Hər birində `images` array-i olacaq.

---

## Test 4: PowerShell-də Test (Alternativ)

Terminal-də bu komandaları işlədin:

```powershell
# Şəkli yoxlamaq
Invoke-WebRequest -Uri "http://localhost:3000/images/macbook_PNG68.png" -OutFile "test-image.png"

# Əgər fayl yaradılıbsa, şəkil işləyir! ✅

# API-dən məhsul götürmək
Invoke-WebRequest -Uri "http://localhost:3000/api/products/1" | Select-Object -ExpandProperty Content
```

---

## ❌ Əgər Şəkillər Açılmırsa:

### Problem 1: 404 Error
**Səbəb:** Şəkil adı və ya yolu səhvdir

**Yoxlayın:**
- `asset` qovluğunda şəkillər varmı?
- Şəkil adları düzgündürmü?

### Problem 2: Şəkil görünmür
**Səbəb:** Browser cache problemi

**Həll:**
- Browser-də `Ctrl + F5` (hard refresh)
- Və ya incognito mode-da açın

### Problem 3: Server işləmir
**Həll:**
```bash
# Serveri başlatın
node server.js
```

---

## ✅ Uğurlu Test Nəticəsi:

Əgər aşağıdakılar işləyirsə, hər şey düzgündür:

1. ✅ `http://localhost:3000/images/macbook_PNG68.png` - şəkil açılır
2. ✅ `http://localhost:3000/api/products/1` - JSON cavab alınır
3. ✅ JSON-dakı `images` array-indəki linklər işləyir

---

## 🚀 Render-də Test:

Deploy etdikdən sonra:

1. **Şəkillər:**
   - https://electronic-products-api.onrender.com/images/macbook_PNG68.png

2. **API:**
   - https://electronic-products-api.onrender.com/api/products/1

**Qeyd:** Render-də free plan-da ilk sorğu 50 saniyə gecikmə ilə cavab verə bilər.
