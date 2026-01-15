# Electronic Products API

Professional REST API for managing electronic products.

## Installation

```bash
npm install
```

## Running the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:3000`

## API Endpoints

### Products

- `GET /api/products` - Get all products (with optional filters)
- `GET /api/products/:id` - Get single product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product (full update)
- `PATCH /api/products/:id` - Update product (partial update)
- `DELETE /api/products/:id` - Delete product

### Filters (Query Parameters)

- `category` - Filter by category
- `brand` - Filter by brand
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `inStock` - Filter by stock status (true/false)
- `search` - Search in title, description, brand

### Other Endpoints

- `GET /api/categories` - Get all categories
- `GET /api/brands` - Get all brands
- `GET /api/health` - Health check

## Example Requests

### Get all products
```bash
GET http://localhost:3000/api/products
```

### Get products by category
```bash
GET http://localhost:3000/api/products?category=Phones
```

### Search products
```bash
GET http://localhost:3000/api/products?search=iPhone
```

### Create product
```bash
POST http://localhost:3000/api/products
Content-Type: application/json

{
  "title": "New Product",
  "category": "Phones",
  "price": 999,
  "brand": "Apple",
  "rating": 4.5,
  "color": "Black",
  "stock": true,
  "description": "Product description",
  "image": "https://example.com/image.jpg"
}
```

### Update product
```bash
PUT http://localhost:3000/api/products/1
Content-Type: application/json

{
  "title": "Updated Product",
  "price": 1099
}
```

### Delete product
```bash
DELETE http://localhost:3000/api/products/1
```

## Response Format

All responses follow this format:

```json
{
  "success": true,
  "data": {...},
  "message": "Optional message"
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error"
}
```

