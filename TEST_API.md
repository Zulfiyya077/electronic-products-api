# API Test Etmək

## Render-də Deploy Etdikdən Sonra Test

### 1. Health Check (Ən Əsas!)
```
https://electronic-products-api.onrender.com/api/health
```

**Gözlənilən cavab:**
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2026-01-15T...",
  "uptime": 123.45,
  "environment": "production",
  "port": 10000
}
```

### 2. Root Route
```
https://electronic-products-api.onrender.com/
```

**Gözlənilən cavab:**
```json
{
  "success": true,
  "message": "Electronic Products API",
  "version": "1.0.0",
  "endpoints": {...}
}
```

### 3. Bütün Məhsullar
```
https://electronic-products-api.onrender.com/api/products
```

### 4. Tək Məhsul
```
https://electronic-products-api.onrender.com/api/products/1
```

### 5. Kateqoriyalar
```
https://electronic-products-api.onrender.com/api/categories
```

### 6. Brendlər
```
https://electronic-products-api.onrender.com/api/brands
```

---

## Problemlər və Həllər

### Problem 1: "50 seconds delay" / "Service is spinning up"
**Səbəb:** Free instance inactivity zamanı söndürülür
**Həll:** 
- İlk request-dən sonra 50 saniyə gözləyin
- Və ya paid plan istifadə edin

### Problem 2: "Route not found"
**Səbəb:** URL-də `/api/` prefiksi yoxdur
**Həll:** 
- ✅ Düzgün: `https://...onrender.com/api/products`
- ❌ Səhv: `https://...onrender.com/products`

### Problem 3: "Cannot GET /"
**Həll:** İndi root route (`/`) əlavə edildi, bu problem həll olundu

### Problem 4: CORS problemi
**Həll:** CORS artıq konfiqurasiya edilib, problem olmamalıdır

---

## Browser-də Test

1. Chrome/Firefox açın
2. Bu URL-i yazın:
   ```
   https://electronic-products-api.onrender.com/api/health
   ```
3. JSON cavab görməlisiniz

---

## Postman/Insomnia ilə Test

### GET Request
```
GET https://electronic-products-api.onrender.com/api/products
```

### POST Request (Yeni məhsul)
```
POST https://electronic-products-api.onrender.com/api/products
Content-Type: application/json

{
  "title": "Test Product",
  "category": "Phones",
  "price": 999,
  "brand": "Test",
  "color": "Black",
  "images": ["url1", "url2", "url3"]
}
```

### PATCH Request (Şəkil əlavə et)
```
PATCH https://electronic-products-api.onrender.com/api/products/1
Content-Type: application/json

{
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg"
  ]
}
```

---

## PowerShell-də Test

```powershell
# Health check
Invoke-WebRequest -Uri "https://electronic-products-api.onrender.com/api/health" | Select-Object -ExpandProperty Content

# Bütün məhsullar
Invoke-WebRequest -Uri "https://electronic-products-api.onrender.com/api/products" | Select-Object -ExpandProperty Content
```

---

## ✅ Uğurlu Test Nəticəsi

Əgər aşağıdakı cavabı alırsınızsa, API işləyir:

```json
{
  "success": true,
  "message": "API is running",
  ...
}
```

