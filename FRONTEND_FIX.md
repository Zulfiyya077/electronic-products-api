# Frontend Kodunu Düzəltmək

## Problem 1: URL-də `-1` var

**Səhv:**
```javascript
const BASE_URL = "https://electronic-products-api-1.onrender.com/api";
```

**Düzgün:**
```javascript
const BASE_URL = "https://electronic-products-api.onrender.com/api";
```

## Problem 2: Search endpoint

**Səhv:**
```javascript
export const searchProducts = async (query) => {
  const response = await api.get("/products/search", { params: { q: query } });
  return response.data;
};
```

**Düzgün (2 yol var):**

### Yol 1: Yeni endpoint istifadə et (artıq əlavə edildi)
```javascript
export const searchProducts = async (query) => {
  try {
    const response = await api.get("/products/search", { params: { q: query } });
    return response.data; // { success: true, count: 5, data: [...] }
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};
```

### Yol 2: Query parameter istifadə et (daha sadə)
```javascript
export const searchProducts = async (query) => {
  try {
    const response = await api.get("/products", { params: { search: query } });
    return response.data; // { success: true, count: 5, data: [...] }
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};
```

## Problem 3: Product Images endpoint

**Səhv:**
```javascript
export const getProductImages = async (id) => {
  const response = await api.get(`/products/${id}/images`);
  return response.data; // ["url1.jpg", "url2.jpg", "url3.jpg"]
};
```

**Düzgün (2 yol var):**

### Yol 1: Yeni endpoint istifadə et (artıq əlavə edildi)
```javascript
export const getProductImages = async (id) => {
  try {
    const response = await api.get(`/products/${id}/images`);
    return response.data.data; // ["url1.jpg", "url2.jpg", "url3.jpg"]
  } catch (error) {
    console.error("Error fetching product images:", error);
    throw error;
  }
};
```

### Yol 2: Product məlumatından götür (daha sadə)
```javascript
export const getProductImages = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data.data.images; // ["url1.jpg", "url2.jpg", "url3.jpg"]
  } catch (error) {
    console.error("Error fetching product images:", error);
    throw error;
  }
};
```

## Problem 4: Vite Proxy konfiqurasiyası

**Səhv:**
```javascript
proxy: {
  '/api': {
    target: 'https://electronic-products-api-1.onrender.com/api',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
    secure: false,
  }
}
```

**Düzgün:**
```javascript
proxy: {
  '/api': {
    target: 'https://electronic-products-api.onrender.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '/api'),
    secure: false,
  }
}
```

**Qeyd:** `rewrite`-də `/api` qalmalıdır, çünki API-də bütün endpoint-lər `/api/` ilə başlayır.

---

## Düzəldilmiş Tam Kod

### `src/services/api.js`
```javascript
import axios from "axios";

// ✅ Düzgün URL (1 yoxdur)
const BASE_URL = "https://electronic-products-api.onrender.com/api";
const api = axios.create({
  baseURL: BASE_URL,
});

// 1. Bütün məhsulları gətirmək (filter, search, pagination ilə)
export const getProducts = async (params = {}) => {
  try {
    // params: { category, brand, color, minPrice, maxPrice, search, page, limit }
    const response = await api.get("/products", { params });
    return response.data; // { success: true, count: 50, data: [...] }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// 2. ID ilə məhsul
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data.data; // {id, title, description, price, images: [...]}
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// 3. Search funksiyası (query ilə)
export const searchProducts = async (query) => {
  try {
    // Yol 1: Yeni search endpoint
    const response = await api.get("/products/search", { params: { q: query } });
    return response.data; // { success: true, count: 5, data: [...] }
    
    // Və ya Yol 2: Query parameter
    // const response = await api.get("/products", { params: { search: query } });
    // return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

// 4. Bütün brendlər
export const getBrands = async () => {
  try {
    const response = await api.get("/brands");
    return response.data.data; // ["Apple", "Samsung", "JBL", ...]
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};

// 5. Bütün kateqoriyalar
export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data.data; // ["Phones", "Laptops", "Accessories", ...]
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// 6. Məhsul şəkilləri (ID ilə)
export const getProductImages = async (id) => {
  try {
    // Yol 1: Yeni images endpoint
    const response = await api.get(`/products/${id}/images`);
    return response.data.data; // ["url1.jpg", "url2.jpg", "url3.jpg"]
    
    // Və ya Yol 2: Product məlumatından götür
    // const product = await getProductById(id);
    // return product.images;
  } catch (error) {
    console.error("Error fetching product images:", error);
    throw error;
  }
};
```

### `vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://electronic-products-api.onrender.com', // ✅ 1 yoxdur
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // ✅ /api qalmalıdır
        secure: false,
      }
    }
  }
})
```

---

## API Response Format

Bütün endpoint-lər bu formatda cavab verir:

```json
{
  "success": true,
  "data": [...],
  "count": 50
}
```

Və ya error zamanı:

```json
{
  "success": false,
  "message": "Error message"
}
```

---

## Test Etmək

Frontend-də test edin:

```javascript
// Test
const products = await getProducts();
console.log(products); // { success: true, count: 50, data: [...] }

const product = await getProductById(1);
console.log(product); // { id: 1, title: "...", images: [...] }

const search = await searchProducts("iPhone");
console.log(search); // { success: true, count: 3, data: [...] }
```
