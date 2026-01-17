const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Base URL for images (Render-də deploy üçün)
// Render-də environment variable-da RENDER_EXTERNAL_URL yoxdur, ona görə də URL-i dinamik yaradırıq
// Base URL for images (Render-də deploy üçün)
// Frontend-də şəkilləri göstərmək üçün tam URL lazımdır
const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://electronic-products-api-1.onrender.com'
  : `http://localhost:${PORT}`;

console.log('🌐 Base URL:', BASE_URL);
console.log('🌍 Environment:', process.env.NODE_ENV || 'development');

// Middleware
// CORS - bütün origin-lərə icazə ver (şəkillər üçün də lazımdır)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files - şəkilləri serve etmək üçün
// Şəkillər asset/images/ qovluğundadır
const assetPath = path.join(__dirname, 'asset', 'images');
console.log('📁 Asset path:', assetPath);
console.log('📁 __dirname:', __dirname);

// Render-də işləmək üçün static files middleware
// Bu middleware route-lardan ƏVVƏL olmalıdır ki, şəkillər düzgün serve olunsun
const fs = require('fs');

// Asset path-in mövcud olduğunu yoxla
if (!fs.existsSync(assetPath)) {
  console.error('❌ Asset path does not exist:', assetPath);
} else {
  const files = fs.readdirSync(assetPath);
  console.log('✅ Asset path exists. Files:', files);
}

// Static files middleware - şəkilləri serve etmək üçün
// Daha sadə və etibarlı versiya
app.use('/images', express.static(assetPath, {
  dotfiles: 'allow', // Nöqtə ilə başlayan fayllara icazə ver (01.JBL...)
  index: false,
  setHeaders: (res, filePath) => {
    // CORS headers - şəkillər üçün lazımdır
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    
    // Şəkillər üçün content type və cache headers
    if (filePath.endsWith('.png') || filePath.endsWith('.webp') || filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
      const contentType = filePath.endsWith('.webp') ? 'image/webp' : 
                         filePath.endsWith('.png') ? 'image/png' : 
                         'image/jpeg';
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
  }
}));

// Test endpoint - asset qovluğundakı faylları yoxlamaq üçün
app.get('/api/test-images', (req, res) => {
  const fs = require('fs');
  try {
    const files = fs.readdirSync(assetPath);
    res.json({
      success: true,
      assetPath: assetPath,
      files: files,
      baseUrl: BASE_URL
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      assetPath: assetPath
    });
  }
});

// 50 Real Electronic Products Data
let products = [
  {
    id: 1,
    title: "iPhone 14 Pro",
    category: "Phones",
    price: 1199,
    rating: 4.8,
    brand: "Apple",
    color: "Black",
    stock: true,
    description: "iPhone 14 Pro with A16 Bionic chip, ProMotion 120Hz display, 48MP main camera, Ceramic Shield, up to 1TB storage.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 2,
    title: "Samsung Galaxy S23 Ultra",
    category: "Phones",
    price: 1299,
    rating: 4.7,
    brand: "Samsung",
    color: "Black",
    stock: true,
    description: "Galaxy S23 Ultra with Snapdragon 8 Gen 2, 200MP camera, S Pen support, 6.8-inch AMOLED, 5000mAh battery.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 3,
    title: "MacBook Pro 14-inch M2 Pro",
    category: "Laptops",
    price: 2499,
    rating: 4.9,
    brand: "Apple",
    color: "Grey",
    stock: true,
    description: "MacBook Pro 14-inch with M2 Pro chip, 16GB RAM, 512GB SSD, Liquid Retina XDR display, Thunderbolt 4 ports.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 4,
    title: "Dell XPS 15",
    category: "Laptops",
    price: 2199,
    rating: 4.8,
    brand: "Dell",
    color: "Grey",
    stock: true,
    description: "Dell XPS 15 with Intel i7 13th Gen, 16GB RAM, 512GB SSD, NVIDIA RTX 4050, 15.6-inch OLED display.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 5,
    title: "JBL Quantum 800",
    category: "Accessories",
    price: 199,
    rating: 4.5,
    brand: "JBL",
    color: "Black",
    stock: true,
    description: "Wireless gaming headset with noise cancelling, 3D sound with JBL QuantumSURROUND, detachable mic, RGB lighting.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 6,
    title: "Sony WH-1000XM5",
    category: "Accessories",
    price: 399,
    rating: 4.9,
    brand: "Sony",
    color: "Black",
    stock: true,
    description: "Noise cancelling headphones, up to 30 hours battery, touch controls, adaptive sound, premium comfort.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 7,
    title: "Apple Watch Series 8",
    category: "Wearables",
    price: 399,
    rating: 4.7,
    brand: "Apple",
    color: "Black",
    stock: true,
    description: "Apple Watch Series 8 with temperature sensing, ECG, blood oxygen, fitness tracking, swimproof, 18-hour battery.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 8,
    title: "Google Pixel 7 Pro",
    category: "Phones",
    price: 899,
    rating: 4.6,
    brand: "Google",
    color: "Black",
    stock: true,
    description: "Pixel 7 Pro with Google Tensor G2, 120Hz display, 50MP camera, AI-powered features, Android 13.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 9,
    title: "Nintendo Switch OLED",
    category: "Gaming",
    price: 349,
    rating: 4.9,
    brand: "Nintendo",
    color: "White",
    stock: true,
    description: "Handheld console with OLED display, 64GB storage, Joy-Con controllers, dock for TV mode, supports thousands of Nintendo games.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 10,
    title: "PlayStation 5",
    category: "Gaming",
    price: 499,
    rating: 4.9,
    brand: "Sony",
    color: "White",
    stock: true,
    description: "Next-gen console with Ultra HD Blu-ray, 4K gaming, haptic feedback controller, backwards compatible with PS4 games.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 11,
    title: "Xbox Series X",
    category: "Gaming",
    price: 499,
    rating: 4.8,
    brand: "Microsoft",
    color: "Black",
    stock: true,
    description: "Next-gen console with 12TFLOPs GPU, 1TB SSD, Quick Resume, backward compatibility, 4K gaming and streaming.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 12,
    title: "Canon EOS R6",
    category: "Cameras",
    price: 2499,
    rating: 4.9,
    brand: "Canon",
    color: "Black",
    stock: true,
    description: "Full-frame mirrorless camera, 20fps shooting, 4K video, Dual Pixel CMOS AF II, ISO 102400.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 13,
    title: "DJI Mini 3 Pro",
    category: "Drones",
    price: 759,
    rating: 4.8,
    brand: "DJI",
    color: "Grey",
    stock: true,
    description: "Compact drone with 4K video, 34-min flight time, obstacle sensors, foldable design, intelligent tracking.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 14,
    title: "Samsung Galaxy Tab S8",
    category: "Tablets",
    price: 699,
    rating: 4.7,
    brand: "Samsung",
    color: "Grey",
    stock: true,
    description: "High-performance tablet with 11-inch display, Snapdragon 8 Gen 1, 8GB RAM, 128GB storage, S Pen included.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 15,
    title: "Kindle Paperwhite 2023",
    category: "Accessories",
    price: 149,
    rating: 4.8,
    brand: "Amazon",
    color: "Black",
    stock: true,
    description: "E-reader with 6.8-inch display, adjustable warm light, waterproof design, 8GB storage, weeks of battery life.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 16,
    title: "GoPro HERO11 Black",
    category: "Cameras",
    price: 499,
    rating: 4.9,
    brand: "GoPro",
    color: "Black",
    stock: true,
    description: "Action camera with 5.3K video, HyperSmooth 5.0 stabilization, waterproof up to 10m, 27MP photos, voice control.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 17,
    title: "Nest Learning Thermostat",
    category: "Smart Home",
    price: 249,
    rating: 4.7,
    brand: "Google",
    color: "White",
    stock: true,
    description: "Smart thermostat with learning capability, energy-saving features, voice control, app remote management.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 18,
    title: "Ring Video Doorbell 4",
    category: "Smart Home",
    price: 199,
    rating: 4.6,
    brand: "Ring",
    color: "Grey",
    stock: true,
    description: "1080p HD video, motion detection, two-way audio, easy installation, compatible with Alexa.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 19,
    title: "Apple iPad Pro 12.9",
    category: "Tablets",
    price: 1099,
    rating: 4.9,
    brand: "Apple",
    color: "Grey",
    stock: true,
    description: "iPad Pro 12.9-inch with M2 chip, Liquid Retina XDR display, 12MP camera, Face ID, Apple Pencil support.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 20,
    title: "Oculus Quest 2",
    category: "Gaming",
    price: 399,
    rating: 4.8,
    brand: "Meta",
    color: "White",
    stock: true,
    description: "VR headset with 6GB RAM, 64GB storage, 1832x1920 per eye, wireless gameplay, hand tracking support.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 21,
    title: "DJI Air 2S",
    category: "Drones",
    price: 999,
    rating: 4.8,
    brand: "DJI",
    color: "Grey",
    stock: true,
    description: "Compact drone with 1-inch CMOS sensor, 5.4K video, 31-min flight, obstacle sensors, intelligent tracking.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 22,
    title: "Logitech MX Master 3",
    category: "Accessories",
    price: 99,
    rating: 4.9,
    brand: "Logitech",
    color: "Grey",
    stock: true,
    description: "Wireless ergonomic mouse, customizable buttons, fast scrolling, rechargeable, works on Windows & Mac.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 23,
    title: "Samsung Galaxy Buds Pro",
    category: "Accessories",
    price: 199,
    rating: 4.7,
    brand: "Samsung",
    color: "Black",
    stock: true,
    description: "Wireless earbuds with ANC, 2-way speakers, 11mm bass, 61mAh battery, water-resistant.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 24,
    title: "Fitbit Charge 5",
    category: "Wearables",
    price: 149,
    rating: 4.6,
    brand: "Fitbit",
    color: "Black",
    stock: true,
    description: "Fitness tracker with heart rate, sleep tracking, GPS, AMOLED display, stress management features.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 25,
    title: "Canon PowerShot G7 X Mark III",
    category: "Cameras",
    price: 749,
    rating: 4.7,
    brand: "Canon",
    color: "Black",
    stock: true,
    description: "Compact camera with 20MP, 4K video, DIGIC 8 processor, flip screen, Wi-Fi & Bluetooth.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 26,
    title: "Samsung SmartThings Hub",
    category: "Smart Home",
    price: 119,
    rating: 4.6,
    brand: "Samsung",
    color: "White",
    stock: true,
    description: "Smart home hub for connecting devices, voice control, app management, compatible with Zigbee & Z-Wave devices.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 27,
    title: "Razer BlackWidow V3",
    category: "Gaming",
    price: 139,
    rating: 4.8,
    brand: "Razer",
    color: "Black",
    stock: true,
    description: "Mechanical gaming keyboard with RGB lighting, programmable keys, wrist rest, durable design.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 28,
    title: "Apple AirPods Pro 2nd Gen",
    category: "Accessories",
    price: 249,
    rating: 4.8,
    brand: "Apple",
    color: "White",
    stock: true,
    description: "Active noise cancellation, spatial audio, adaptive EQ, wireless charging, sweat & water resistant.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 29,
    title: "OnePlus 11",
    category: "Phones",
    price: 699,
    rating: 4.7,
    brand: "OnePlus",
    color: "Black",
    stock: true,
    description: "Snapdragon 8 Gen 2, 6.7-inch AMOLED 120Hz, 50MP triple camera, 100W fast charging, 16GB RAM.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 30,
    title: "HP Spectre x360",
    category: "Laptops",
    price: 1499,
    rating: 4.7,
    brand: "HP",
    color: "Grey",
    stock: true,
    description: "2-in-1 convertible laptop, Intel Core i7, 16GB RAM, 512GB SSD, 13.5-inch OLED touchscreen, 360-degree hinge.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 31,
    title: "Bose SoundLink Flex",
    category: "Speakers",
    price: 149,
    rating: 4.6,
    brand: "Bose",
    color: "Black",
    stock: true,
    description: "Portable Bluetooth speaker, waterproof IP67, 12-hour battery, PositionIQ technology, clear sound.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 32,
    title: "Sony Alpha 7R V",
    category: "Cameras",
    price: 3899,
    rating: 4.9,
    brand: "Sony",
    color: "Black",
    stock: true,
    description: "61MP full-frame mirrorless camera, 8K video, Real-time Eye AF, 5-axis image stabilization, dual card slots.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 33,
    title: "Garmin Forerunner 955",
    category: "Wearables",
    price: 599,
    rating: 4.8,
    brand: "Garmin",
    color: "Black",
    stock: true,
    description: "GPS running watch, advanced training metrics, music storage, 20-day battery, multi-band GPS, touchscreen.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 34,
    title: "SteelSeries Arctis 7P",
    category: "Accessories",
    price: 149,
    rating: 4.7,
    brand: "SteelSeries",
    color: "Black",
    stock: true,
    description: "Wireless gaming headset, 24-hour battery, Discord-certified mic, 7.1 surround sound, compatible with PS5/PC.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 35,
    title: "DJI Mavic 3",
    category: "Drones",
    price: 2199,
    rating: 4.9,
    brand: "DJI",
    color: "Grey",
    stock: true,
    description: "Professional drone with 4/3 CMOS sensor, 5.1K video, 46-min flight time, omnidirectional obstacle sensing, 15km range.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 36,
    title: "Lenovo ThinkPad X1 Carbon",
    category: "Laptops",
    price: 1799,
    rating: 4.8,
    brand: "Lenovo",
    color: "Black",
    stock: true,
    description: "Ultra-light business laptop, Intel Core i7, 16GB RAM, 512GB SSD, 14-inch 2.8K display, MIL-STD tested.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 37,
    title: "Xiaomi 13 Pro",
    category: "Phones",
    price: 899,
    rating: 4.6,
    brand: "Xiaomi",
    color: "Black",
    stock: true,
    description: "Snapdragon 8 Gen 2, 6.73-inch AMOLED 120Hz, 50MP Leica camera, 120W fast charging, 12GB RAM.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 38,
    title: "Nikon Z9",
    category: "Cameras",
    price: 5499,
    rating: 4.9,
    brand: "Nikon",
    color: "Black",
    stock: true,
    description: "Flagship mirrorless camera, 45.7MP sensor, 8K video, 120fps continuous shooting, dual card slots, weather-sealed.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 39,
    title: "Amazon Echo Show 15",
    category: "Smart Home",
    price: 249,
    rating: 4.6,
    brand: "Amazon",
    color: "White",
    stock: true,
    description: "15.6-inch smart display, Alexa voice control, video calling, smart home hub, Fire TV integration, wall mountable.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 40,
    title: "Corsair K70 RGB TKL",
    category: "Gaming",
    price: 169,
    rating: 4.8,
    brand: "Corsair",
    color: "Black",
    stock: true,
    description: "Tenkeyless mechanical keyboard, Cherry MX switches, per-key RGB lighting, aircraft-grade aluminum frame, USB passthrough.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 41,
    title: "Samsung Galaxy Watch 5 Pro",
    category: "Wearables",
    price: 449,
    rating: 4.7,
    brand: "Samsung",
    color: "Black",
    stock: true,
    description: "Premium smartwatch, 45mm titanium case, GPS tracking, sleep coaching, 80-hour battery, sapphire crystal display.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 42,
    title: "LG C2 48-inch OLED TV",
    category: "TVs",
    price: 1299,
    rating: 4.8,
    brand: "LG",
    color: "Black",
    stock: true,
    description: "48-inch OLED 4K TV, 120Hz refresh rate, Dolby Vision IQ, webOS 22, gaming features, perfect blacks.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 43,
    title: "Anker PowerCore 26800",
    category: "Accessories",
    price: 79,
    rating: 4.7,
    brand: "Anker",
    color: "Black",
    stock: true,
    description: "High-capacity power bank, 26800mAh, USB-C Power Delivery, 3 USB ports, fast charging, portable design.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 44,
    title: "Microsoft Surface Pro 9",
    category: "Tablets",
    price: 999,
    rating: 4.7,
    brand: "Microsoft",
    color: "Grey",
    stock: true,
    description: "2-in-1 tablet, Intel Core i5, 8GB RAM, 256GB SSD, 13-inch PixelSense display, Surface Pen compatible.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 45,
    title: "Philips Hue Starter Kit",
    category: "Smart Home",
    price: 199,
    rating: 4.8,
    brand: "Philips",
    color: "White",
    stock: true,
    description: "Smart lighting starter kit, 3 color bulbs, bridge hub, 16 million colors, voice control, app control.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 46,
    title: "HyperX Cloud Alpha",
    category: "Accessories",
    price: 99,
    rating: 4.6,
    brand: "HyperX",
    color: "Black",
    stock: true,
    description: "Gaming headset with dual chamber drivers, detachable noise-cancelling mic, aluminum frame, memory foam ear cushions.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 47,
    title: "Fujifilm X-T5",
    category: "Cameras",
    price: 1699,
    rating: 4.8,
    brand: "Fujifilm",
    color: "Black",
    stock: true,
    description: "Mirrorless camera, 40MP sensor, 6.2K video, 5-axis IBIS, weather-sealed, film simulation modes, dual card slots.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 48,
    title: "ASUS ROG Strix G15",
    category: "Laptops",
    price: 1499,
    rating: 4.7,
    brand: "ASUS",
    color: "Black",
    stock: true,
    description: "Gaming laptop, AMD Ryzen 9, 16GB RAM, 512GB SSD, NVIDIA RTX 4060, 15.6-inch 144Hz display, RGB keyboard.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 49,
    title: "JBL Charge 5",
    category: "Speakers",
    price: 179,
    rating: 4.7,
    brand: "JBL",
    color: "Blue",
    stock: true,
    description: "Portable Bluetooth speaker, 20-hour battery, IP67 waterproof, power bank function, JBL Pro Sound, PartyBoost.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  },
  {
    id: 50,
    title: "Steam Deck",
    category: "Gaming",
    price: 649,
    rating: 4.8,
    brand: "Valve",
    color: "Black",
    stock: true,
    description: "Handheld gaming PC, AMD Zen 2 CPU, 7-inch touchscreen, 64GB storage, SteamOS, plays thousands of PC games.",
    images: [
      `${BASE_URL}/images/macbook_PNG68.png`,
      `${BASE_URL}/images/samsung.webp`,
      `${BASE_URL}/images/01.JBL_Tune-720BT_Product-Image_Hero_Black.webp`
    ]
  }
];

// Helper function to get next ID
const getNextId = () => {
  return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
};

// Routes

// GET all products
app.get('/api/products', (req, res) => {
  try {
    const { category, brand, minPrice, maxPrice, inStock, search } = req.query;
    let filteredProducts = [...products];

    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by brand
    if (brand) {
      filteredProducts = filteredProducts.filter(p => 
        p.brand.toLowerCase() === brand.toLowerCase()
      );
    }

    // Filter by price range
    if (minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
    }

    // Filter by stock
    if (inStock !== undefined) {
      const stockFilter = inStock === 'true';
      filteredProducts = filteredProducts.filter(p => p.stock === stockFilter);
    }

    // Search in title, description, brand
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.brand.toLowerCase().includes(searchLower)
      );
    }

    res.json({
      success: true,
      count: filteredProducts.length,
      data: filteredProducts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
});

// GET single product by ID
app.get('/api/products/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
});

// GET product images by ID (frontend üçün)
app.get('/api/products/:id/images', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product.images || []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product images',
      error: error.message
    });
  }
});

// GET search products (frontend üçün)
app.get('/api/products/search', (req, res) => {
  try {
    const { q } = req.query; // Frontend-dən gələn query parameter
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const searchLower = q.toLowerCase();
    const filteredProducts = products.filter(p => 
      p.title.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.brand.toLowerCase().includes(searchLower) ||
      p.category.toLowerCase().includes(searchLower)
    );

    res.json({
      success: true,
      count: filteredProducts.length,
      data: filteredProducts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching products',
      error: error.message
    });
  }
});

// POST create new product
app.post('/api/products', (req, res) => {
  try {
    const { title, category, price, rating, brand, color, stock, description, images } = req.body;

    // Validation
    if (!title || !category || !price || !brand) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, category, price, brand'
      });
    }

    const newProduct = {
      id: getNextId(),
      title,
      category,
      price: parseFloat(price),
      rating: rating ? parseFloat(rating) : 0,
      brand,
      color: color || '',
      stock: stock !== undefined ? stock : true,
      description: description || '',
      images: Array.isArray(images) ? images : (images ? [images] : [])
    };

    products.push(newProduct);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
});

// PUT update product
app.put('/api/products/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const { title, category, price, rating, brand, color, stock, description, images } = req.body;

    // Update product
    products[productIndex] = {
      ...products[productIndex],
      ...(title && { title }),
      ...(category && { category }),
      ...(price !== undefined && { price: parseFloat(price) }),
      ...(rating !== undefined && { rating: parseFloat(rating) }),
      ...(brand && { brand }),
      ...(color !== undefined && { color }),
      ...(stock !== undefined && { stock }),
      ...(description !== undefined && { description }),
      ...(images !== undefined && { 
        images: Array.isArray(images) ? images : (images ? [images] : [])
      })
    };

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: products[productIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
});

// PATCH partial update product
app.patch('/api/products/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Update only provided fields
    products[productIndex] = {
      ...products[productIndex],
      ...req.body,
      id: products[productIndex].id // Ensure ID cannot be changed
    };

    // Type conversions
    if (req.body.price !== undefined) {
      products[productIndex].price = parseFloat(req.body.price);
    }
    if (req.body.rating !== undefined) {
      products[productIndex].rating = parseFloat(req.body.rating);
    }
    if (req.body.images !== undefined) {
      products[productIndex].images = Array.isArray(req.body.images) 
        ? req.body.images 
        : (req.body.images ? [req.body.images] : []);
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: products[productIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const deletedProduct = products.splice(productIndex, 1)[0];

    res.json({
      success: true,
      message: 'Product deleted successfully',
      data: deletedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
});

// GET categories
app.get('/api/categories', (req, res) => {
  try {
    const categories = [...new Set(products.map(p => p.category))];
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
});

// GET brands
app.get('/api/brands', (req, res) => {
  try {
    const brands = [...new Set(products.map(p => p.brand))];
    res.json({
      success: true,
      data: brands
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching brands',
      error: error.message
    });
  }
});

// PATCH update multiple products images (bulk update)
app.patch('/api/products/bulk-update-images', (req, res) => {
  try {
    const { updates } = req.body; // Array of { id, images }

    if (!Array.isArray(updates)) {
      return res.status(400).json({
        success: false,
        message: 'Updates must be an array of { id, images } objects'
      });
    }

    const results = [];
    const errors = [];

    updates.forEach(update => {
      const { id, images } = update;
      const productIndex = products.findIndex(p => p.id === id);

      if (productIndex === -1) {
        errors.push({ id, error: 'Product not found' });
        return;
      }

      if (!Array.isArray(images)) {
        errors.push({ id, error: 'Images must be an array' });
        return;
      }

      products[productIndex].images = images;
      results.push({ id, success: true, images });
    });

    res.json({
      success: true,
      message: `Updated ${results.length} product(s)`,
      updated: results,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating products',
      error: error.message
    });
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Electronic Products API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      categories: '/api/categories',
      brands: '/api/brands',
      health: '/api/health'
    },
    documentation: 'Visit /api/health for API status'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    port: PORT
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📦 Total products: ${products.length}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API endpoints:`);
  console.log(`   GET    /`);
  console.log(`   GET    /api/products`);
  console.log(`   GET    /api/products/:id`);
  console.log(`   POST   /api/products`);
  console.log(`   PUT    /api/products/:id`);
  console.log(`   PATCH  /api/products/:id`);
  console.log(`   DELETE /api/products/:id`);
  console.log(`   GET    /api/categories`);
  console.log(`   GET    /api/brands`);
  console.log(`   PATCH  /api/products/bulk-update-images`);
  console.log(`   GET    /api/health`);
  console.log(`✅ Server ready to accept connections`);
});

