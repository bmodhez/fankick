import { productService } from '../services/productServicePostgres.js';

async function testProductStructure() {
  try {
    console.log('Testing product data structure...');
    
    const products = await productService.getAllProducts();
    
    if (products.length === 0) {
      console.log('No products found');
      return;
    }
    
    const firstProduct = products[0];
    console.log('First product structure:');
    console.log('ID:', firstProduct.id);
    console.log('Name:', firstProduct.name);
    console.log('BasePrice:', firstProduct.basePrice, typeof firstProduct.basePrice);
    console.log('OriginalPrice:', firstProduct.originalPrice, typeof firstProduct.originalPrice);
    console.log('Variants count:', firstProduct.variants?.length || 0);
    
    if (firstProduct.variants && firstProduct.variants.length > 0) {
      console.log('First variant price:', firstProduct.variants[0].price, typeof firstProduct.variants[0].price);
      console.log('First variant originalPrice:', firstProduct.variants[0].originalPrice, typeof firstProduct.variants[0].originalPrice);
    }
    
    console.log('Full product object keys:', Object.keys(firstProduct));
    
  } catch (error) {
    console.error('Error testing product structure:', error);
  }
}

testProductStructure()
  .then(() => {
    console.log('Test completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Test failed:', error);
    process.exit(1);
  });
