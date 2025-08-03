# Backend API Setup

## Overview
The application now includes a complete backend API that handles all product data operations. Products are no longer stored in localStorage but are managed through a proper backend server with persistent storage.

## Backend Structure

### API Endpoints
- `GET /api/products` - Get all products (supports filtering by category, search, trending)
- `GET /api/products/:id` - Get single product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update existing product
- `DELETE /api/products/:id` - Delete product
- `PUT /api/products/:id/stock` - Update product stock

### Files Created
```
server/
├── types/product.ts          # Product type definitions
├── services/productService.ts # Business logic for product operations
├── routes/products.ts         # API route handlers
├── database/products.json    # JSON file-based database
└── index.ts                  # Updated server with product routes

client/
├── services/api.ts           # Frontend API client
└── contexts/ProductContext.tsx # Updated to use backend API
```

## Key Features

### Backend Features
1. **JSON File Database**: Products are stored in `server/database/products.json`
2. **Auto-initialization**: Database is populated with default products on first run
3. **CRUD Operations**: Full Create, Read, Update, Delete functionality
4. **Search & Filtering**: Support for category filtering and text search
5. **Stock Management**: Dedicated endpoint for inventory updates
6. **Error Handling**: Comprehensive error responses

### Frontend Updates
1. **API Integration**: ProductContext now uses backend API instead of localStorage
2. **Async Operations**: All CRUD operations are now async with proper error handling
3. **Loading States**: Added loading indicators while API calls are in progress
4. **Real-time Updates**: Changes in admin panel are immediately saved to backend

## How It Works

### Adding Products
When you add a product through the admin panel:
1. Frontend sends POST request to `/api/products`
2. Backend validates the data
3. Product is saved to `products.json` file
4. Frontend receives the created product with generated ID
5. Local state is updated to reflect the new product
6. Product is immediately available on the main website

### Product Persistence
- **Before**: Products were stored in browser localStorage (temporary)
- **After**: Products are stored in backend database (persistent)
- **Benefits**: 
  - Data survives browser refresh/clear
  - Shared across all users
  - No storage size limitations
  - Proper data validation

## Development

### Starting the Server
The backend runs alongside the frontend:
```bash
npm run dev  # Starts both frontend and backend
```

### Environment Variables
```
VITE_API_URL=http://localhost:5173/api
```

### Database Migration
The system automatically migrates existing products to the backend database on first startup.

## API Usage Examples

### Create Product
```javascript
const newProduct = await productApi.create({
  name: "New Product",
  description: "Product description",
  category: "anime",
  subcategory: "hoodies",
  // ... other fields
});
```

### Update Product
```javascript
await productApi.update(productId, {
  name: "Updated Name",
  basePrice: 2999
});
```

### Delete Product
```javascript
await productApi.delete(productId);
```

## Benefits

1. **Data Persistence**: Products survive browser sessions
2. **Real Backend**: Proper server-side architecture
3. **Scalability**: Can be easily upgraded to use PostgreSQL/MongoDB
4. **Multi-user**: Multiple admins can manage products simultaneously
5. **API-First**: Clean separation between frontend and backend
6. **Error Handling**: Robust error handling and user feedback

## Future Enhancements

The current JSON file database can be easily upgraded to:
- PostgreSQL with Prisma ORM
- MongoDB with Mongoose
- SQLite for simpler deployments
- Redis for caching layer

The API structure supports these upgrades without changing the frontend code.
