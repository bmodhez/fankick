import fs from 'fs/promises';
import path from 'path';
import { Product, ProductCreateRequest, ProductUpdateRequest, ProductVariant } from '../types/product.js';
import { PRODUCTS } from '../../client/data/products.js';

const DB_PATH = path.join(process.cwd(), 'server/database/products.json');

// Initialize database with default products if empty
async function initializeDatabase() {
  try {
    await fs.access(DB_PATH);
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const products = JSON.parse(data);
    
    // If database is empty, populate with default products
    if (products.length === 0) {
      await saveProducts(PRODUCTS);
    }
  } catch (error) {
    // Database doesn't exist, create it with default products
    await saveProducts(PRODUCTS);
  }
}

async function loadProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

async function saveProducts(products: Product[]): Promise<void> {
  try {
    // Ensure directory exists
    const dir = path.dirname(DB_PATH);
    await fs.mkdir(dir, { recursive: true });
    
    await fs.writeFile(DB_PATH, JSON.stringify(products, null, 2));
  } catch (error) {
    console.error('Error saving products:', error);
    throw error;
  }
}

function generateId(): string {
  return `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateVariantId(): string {
  return `variant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateSKU(productName: string, variant: Omit<ProductVariant, 'id' | 'sku'>): string {
  const cleanName = productName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  const size = variant.size ? `-${variant.size}` : '';
  const color = variant.color ? `-${variant.color.replace(/[^a-zA-Z0-9]/g, '')}` : '';
  const timestamp = Date.now().toString().slice(-4);
  
  return `${cleanName.slice(0, 6)}${size}${color}-${timestamp}`;
}

export class ProductService {
  constructor() {
    initializeDatabase();
  }

  async getAllProducts(): Promise<Product[]> {
    return await loadProducts();
  }

  async getProductById(id: string): Promise<Product | null> {
    const products = await loadProducts();
    return products.find(product => product.id === id) || null;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const products = await loadProducts();
    return products.filter(product => product.category === category);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const products = await loadProducts();
    const lowerQuery = query.toLowerCase();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.subcategory.toLowerCase().includes(lowerQuery) ||
      (product.brand && product.brand.toLowerCase().includes(lowerQuery))
    );
  }

  async createProduct(productData: ProductCreateRequest): Promise<Product> {
    const products = await loadProducts();
    
    // Generate ID and timestamps
    const newProduct: Product = {
      ...productData,
      id: generateId(),
      rating: 4.5, // Default rating
      reviews: 0, // Start with 0 reviews
      variants: productData.variants.map(variant => ({
        ...variant,
        id: generateVariantId(),
        sku: generateSKU(productData.name, variant)
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    products.push(newProduct);
    await saveProducts(products);
    
    return newProduct;
  }

  async updateProduct(id: string, updateData: Partial<ProductCreateRequest>): Promise<Product | null> {
    const products = await loadProducts();
    const productIndex = products.findIndex(product => product.id === id);
    
    if (productIndex === -1) {
      return null;
    }

    // Update variants if provided
    if (updateData.variants) {
      updateData.variants = updateData.variants.map(variant => {
        // Keep existing variant IDs if they exist, generate new ones if not
        const existingVariant = products[productIndex].variants.find(v => 
          v.size === variant.size && v.color === variant.color
        );
        
        return {
          ...variant,
          id: existingVariant?.id || generateVariantId(),
          sku: existingVariant?.sku || generateSKU(updateData.name || products[productIndex].name, variant)
        };
      });
    }

    // Update product
    products[productIndex] = {
      ...products[productIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    await saveProducts(products);
    return products[productIndex];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const products = await loadProducts();
    const filteredProducts = products.filter(product => product.id !== id);
    
    if (filteredProducts.length === products.length) {
      return false; // Product not found
    }

    await saveProducts(filteredProducts);
    return true;
  }

  async getTrendingProducts(limit: number = 8): Promise<Product[]> {
    const products = await loadProducts();
    return products.filter(product => product.isTrending).slice(0, limit);
  }

  async updateProductStock(productId: string, variantId: string, newStock: number): Promise<boolean> {
    const products = await loadProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) return false;
    
    const variant = product.variants.find(v => v.id === variantId);
    if (!variant) return false;
    
    variant.stock = newStock;
    product.updatedAt = new Date().toISOString();
    
    await saveProducts(products);
    return true;
  }
}

export const productService = new ProductService();
