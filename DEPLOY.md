# Render Deployment Guide

## Render-də Deploy Etmək

### 1. Render-də Yeni Service Yaratmaq

1. [Render.com](https://render.com) hesabınıza daxil olun
2. "New +" düyməsinə klik edin
3. "Web Service" seçin
4. GitHub repository-nizi bağlayın
5. Aşağıdakı konfiqurasiyaları tətbiq edin:

### 2. Konfiqurasiya

**Name:** electronic-products-api

**Environment:** Node

**Build Command:**
```bash
npm install
```

**Start Command:**
```bash
node server.js
```

**Environment Variables:**
- `PORT` = `10000` (Render avtomatik PORT təyin edir, amma 10000 default-dur)
- `NODE_ENV` = `production`

### 3. Deploy Etdikdən Sonra Şəkilləri Əlavə Etmək

Render-də deploy etdikdən sonra şəkilləri əlavə etmək üçün 3 yol var:

#### Yol 1: Tək məhsulun şəkillərini yeniləmək (PATCH)

```bash
PATCH https://your-app.onrender.com/api/products/1
Content-Type: application/json

{
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg"
  ]
}
```

#### Yol 2: Toplu şəkildə şəkilləri yeniləmək (Bulk Update)

```bash
PATCH https://your-app.onrender.com/api/products/bulk-update-images
Content-Type: application/json

{
  "updates": [
    {
      "id": 1,
      "images": [
        "https://example.com/product1-image1.jpg",
        "https://example.com/product1-image2.jpg",
        "https://example.com/product1-image3.jpg"
      ]
    },
    {
      "id": 2,
      "images": [
        "https://example.com/product2-image1.jpg",
        "https://example.com/product2-image2.jpg",
        "https://example.com/product2-image3.jpg"
      ]
    }
  ]
}
```

#### Yol 3: Server.js faylını dəyişdirib yenidən deploy etmək

1. `server.js` faylında məhsulların `images` array-lərini doldurun
2. GitHub-a push edin
3. Render avtomatik olaraq yenidən deploy edəcək

### 4. API Endpoint-ləri

Deploy etdikdən sonra API-niz bu ünvanda olacaq:
```
https://your-app-name.onrender.com/api/products
```

**Bütün endpoint-lər:**
- `GET /api/products` - Bütün məhsullar
- `GET /api/products/:id` - Tək məhsul
- `POST /api/products` - Yeni məhsul
- `PUT /api/products/:id` - Məhsulu yenilə
- `PATCH /api/products/:id` - Qismən yenilə
- `PATCH /api/products/bulk-update-images` - Toplu şəkil yenilə
- `DELETE /api/products/:id` - Məhsulu sil
- `GET /api/categories` - Kateqoriyalar
- `GET /api/brands` - Brendlər
- `GET /api/health` - Health check

### 5. Qeyd

⚠️ **Vacib:** Render-də data memory-də saxlanılır. Server yenidən başladıqda bütün dəyişikliklər itir. Əgər daimi data istəyirsinizsə, database (PostgreSQL, MongoDB) istifadə etməlisiniz.

### 6. Test Etmək

Deploy etdikdən sonra test edin:

```bash
# Health check
curl https://your-app.onrender.com/api/health

# Bütün məhsullar
curl https://your-app.onrender.com/api/products

# Tək məhsul
curl https://your-app.onrender.com/api/products/1
```

