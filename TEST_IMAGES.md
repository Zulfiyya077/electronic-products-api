# Şəkilləri Test Etmək - Addım-Addım

## ✅ Nə Edildi:

1. **Static Files Middleware** əlavə edildi:
```javascript
app.use('/images', express.static(path.join(__dirname, 'asset')));
```

2. **BASE_URL** konfiqurasiya edildi:
```javascript
const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://electronic-products-api.onrender.com'
  : `http://localhost:${PORT}`;
```

3. **Bütün məhsulların images array-ləri** yeniləndi:
```javascript
images: [
  `${BASE_URL}/images/macbook_PNG68.png`,
  `${BASE_URL}/images/samsung.webp`,
  `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
]
```

---

## 🧪 Test Etmək:

### 1. Local Test (Development):

**Serveri başlatın:**
```bash
node server.js
```

**Browser-də test edin:**

1. **Şəkillər üçün:**
   - http://localhost:3000/images/macbook_PNG68.png
   - http://localhost:3000/images/samsung.webp
   - http://localhost:3000/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp

2. **API-dən məhsul götürün:**
   - http://localhost:3000/api/products/1
   - `images` array-ində linkləri görəcəksiniz

3. **Şəkil linklərini browser-də açın:**
   - Əgər şəkillər açılırsa, middleware işləyir! ✅

### 2. Render Test (Production):

**Deploy etdikdən sonra:**

1. **Şəkillər üçün:**
   - https://electronic-products-api.onrender.com/images/macbook_PNG68.png
   - https://electronic-products-api.onrender.com/images/samsung.webp
   - https://electronic-products-api.onrender.com/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp

2. **API-dən məhsul götürün:**
   - https://electronic-products-api.onrender.com/api/products/1
   - `images` array-ində tam URL-lər görəcəksiniz

---

## 🔍 Problem Nədirsə?

### Problem 1: Şəkillər açılmır (404)

**Səbəb:** Şəkil adları səhvdir və ya qovluq səhvdir

**Yoxlayın:**
- `asset` qovluğunda şəkillər varmı?
- Şəkil adları düzgündürmü? (macbook_PNG68.png, samsung.webp, 01.JBL_Tune-720BT_Product-Image_Hero_Black.webp)

**Həll:**
```bash
# Qovluq və şəkilləri yoxlayın
ls asset/
```

### Problem 2: BASE_URL səhvdir

**Səbəb:** Render-də URL fərqlidir

**Yoxlayın:**
- Render Dashboard-da URL düzgündürmü?
- `server.js`-də BASE_URL konfiqurasiyası düzgündürmü?

**Həll:**
Render-də deploy etdikdən sonra URL-i düzəldin:
```javascript
const BASE_URL = 'https://your-actual-render-url.onrender.com';
```

### Problem 3: Static files serve olunmur

**Səbəb:** Middleware düzgün konfiqurasiya olunmayıb

**Yoxlayın:**
- `app.use('/images', express.static(...))` middleware-i var?
- Path düzgündürmü? (`path.join(__dirname, 'asset')`)

---

## 📝 Qeyd:

**Static Files Middleware nədir?**

Middleware serverə deyir ki, `/images` URL-inə gələn sorğuları `asset` qovluğundan serve etsin.

**Nümunə:**
- Request: `GET /images/macbook_PNG68.png`
- Middleware: `asset/macbook_PNG68.png` faylını tapır və göndərir

**BASE_URL nə üçün lazımdır?**

API cavabında tam URL lazımdır ki, frontend şəkilləri göstərə bilsin:

```json
{
  "images": [
    "https://electronic-products-api.onrender.com/images/macbook_PNG68.png"
  ]
}
```

---

## ✅ Uğurlu Test:

Əgər aşağıdakı URL-lər şəkilləri göstərirsə, hər şey işləyir:

**Local:**
- http://localhost:3000/images/macbook_PNG68.png ✅

**Render:**
- https://electronic-products-api.onrender.com/images/macbook_PNG68.png ✅
