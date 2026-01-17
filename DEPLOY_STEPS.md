# Render-də Deploy Etmək - Addım-Addım Təlimat

## 1. GitHub Repository Yaratmaq

### Əgər Git yoxdursa:
1. Terminal açın və layihə qovluğuna gedin:
```bash
cd C:\Users\zulfi\OneDrive\Desktop\electronic-products
```

2. Git initialize edin:
```bash
git init
```

3. Bütün faylları əlavə edin:
```bash
git add .
```

4. İlk commit edin:
```bash
git commit -m "Initial commit - Electronic Products API"
```

### GitHub Repository Yaratmaq:

1. [GitHub.com](https://github.com) hesabınıza daxil olun
2. Sağ üstdə "+" düyməsinə klik edin → "New repository"
3. Repository adı: `electronic-products-api` (və ya istədiyiniz ad)
4. Public seçin
5. "Create repository" düyməsinə klik edin

### GitHub-a Push Etmək:

GitHub-da repository yaratdıqdan sonra, GitHub sizə komandalar göstərəcək. Bu komandaları terminaldə işlədin:

```bash
git remote add origin https://github.com/YOUR_USERNAME/electronic-products-api.git
git branch -M main
git push -u origin main
```

**Qeyd:** `YOUR_USERNAME` yerinə GitHub istifadəçi adınızı yazın.

---

## 2. Render-də Deploy Etmək

### Addım 1: Render Hesabı
1. [Render.com](https://render.com) saytına daxil olun
2. "Get Started for Free" düyməsinə klik edin
3. GitHub hesabınızla giriş edin

### Addım 2: Yeni Web Service Yaratmaq
1. Render dashboard-da "New +" düyməsinə klik edin
2. "Web Service" seçin
3. GitHub repository-nizi seçin: `electronic-products-api`
4. "Connect" düyməsinə klik edin

### Addım 3: Konfiqurasiya

**Name:**
```
electronic-products-api
```

**Environment:**
```
Node
```

**Region:**
```
Frankfurt (və ya ən yaxın region)
```

**Branch:**
```
main
```

**Root Directory:**
```
(boş buraxın)
```

**Build Command:**
```bash
npm install
```

**Start Command:**
```bash
node server.js
```

**Instance Type:**
```
Free (və ya istəsəniz paid plan)
```

### Addım 4: Environment Variables (Vacib!)

"Advanced" bölməsində "Add Environment Variable" düyməsinə klik edin:

**Variable 1:**
- Key: `PORT`
- Value: `10000`

**Variable 2:**
- Key: `NODE_ENV`
- Value: `production`

### Addım 5: Deploy
1. "Create Web Service" düyməsinə klik edin
2. Render avtomatik olaraq deploy etməyə başlayacaq
3. 2-3 dəqiqə gözləyin
4. Deploy tamamlandıqdan sonra sizə URL veriləcək: `https://your-app-name.onrender.com`

---

## 3. Test Etmək

Deploy tamamlandıqdan sonra test edin:

### Browser-də:
```
https://your-app-name.onrender.com/api/health
```

### Terminal-də (PowerShell):
```powershell
Invoke-WebRequest -Uri "https://your-app-name.onrender.com/api/products" | Select-Object -ExpandProperty Content
```

### Və ya Postman/Insomnia ilə:
```
GET https://your-app-name.onrender.com/api/products
```

---

## 4. Şəkilləri Əlavə Etmək

Deploy etdikdən sonra şəkilləri əlavə etmək üçün:

### Postman və ya Insomnia istifadə edərək:

**Tək məhsul:**
```
PATCH https://your-app-name.onrender.com/api/products/1
Content-Type: application/json

{
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg"
  ]
}
```

**Toplu yeniləmə:**
```
PATCH https://your-app-name.onrender.com/api/products/bulk-update-images
Content-Type: application/json

{
  "updates": [
    {
      "id": 1,
      "images": ["url1", "url2", "url3"]
    },
    {
      "id": 2,
      "images": ["url1", "url2", "url3"]
    }
  ]
}
```

---

## 5. Problemlər və Həllər

### Problem: "Build failed"
**Həll:** `package.json` faylının düzgün olduğunu yoxlayın

### Problem: "Application error"
**Həll:** Render logs-u yoxlayın (Dashboard → Logs)

### Problem: "Route not found"
**Həll:** URL-də `/api/` prefiksi olduğundan əmin olun

### Problem: Port xətası
**Həll:** Environment variable-da `PORT=10000` olduğundan əmin olun

---

## 6. Yenidən Deploy

Kodda dəyişiklik etdikdən sonra:

```bash
git add .
git commit -m "Update products"
git push
```

Render avtomatik olaraq yenidən deploy edəcək.

---

## ✅ Hazır!

Artıq API-niz internetdədir və istifadəyə hazırdır! 🚀
