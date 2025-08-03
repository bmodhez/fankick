import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { productService } from '../services/productServicePostgres.js';
import { Product } from '../types/product.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function migrateSingleProduct() {
  try {
    console.log('Migrating the failed product...');
    
    // Read existing JSON data
    const jsonPath = join(__dirname, '../database/products.json');
    const jsonData = readFileSync(jsonPath, 'utf-8');
    const products: Product[] = JSON.parse(jsonData);
    
    // Find the failed product
    const failedProduct = products.find(p => p.name.includes('Naruto Akatsuki Ring Set'));
    
    if (!failedProduct) {
      console.log('Failed product not found');
      return;
    }
    
    // Transform product data for creation
    const productData = {
      name: failedProduct.name,
      description: failedProduct.description,
      category: failedProduct.category,
      subcategory: failedProduct.subcategory,
      brand: failedProduct.brand,
      tags: failedProduct.tags,
      images: failedProduct.images,
      isTrending: failedProduct.isTrending,
      isFeatured: failedProduct.isFeatured,
      variants: failedProduct.variants
    };
    
    const createdProduct = await productService.createProduct(productData);
    console.log(`✅ Successfully migrated: ${failedProduct.name} (${createdProduct.id})`);
    
    // Verify total count
    const allProducts = await productService.getAllProducts();
    console.log(`Database now contains ${allProducts.length} products`);
    
  } catch (error) {
    console.error('Single product migration failed:', error);
    process.exit(1);
  }
}

migrateSingleProduct()
  .then(() => {
    console.log('Single product migration completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Single product migration failed:', error);
    process.exit(1);
  });
