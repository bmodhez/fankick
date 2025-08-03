import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { productService } from "../services/productServicePostgres.js";
import { Product } from "../types/product.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function migrateData() {
  try {
    console.log("Starting data migration from JSON to PostgreSQL...");

    // Read existing JSON data
    const jsonPath = join(__dirname, "../database/products.json");
    const jsonData = readFileSync(jsonPath, "utf-8");
    const products: Product[] = JSON.parse(jsonData);

    console.log(`Found ${products.length} products to migrate`);

    // Migrate each product
    let successCount = 0;
    let errorCount = 0;

    for (const product of products) {
      try {
        // Transform product data for creation
        const productData = {
          name: product.name,
          description: product.description,
          category: product.category,
          subcategory: product.subcategory,
          brand: product.brand,
          tags: product.tags,
          images: product.images,
          isTrending: product.isTrending,
          isFeatured: product.isFeatured,
          variants: product.variants,
        };

        const createdProduct = await productService.createProduct(productData);
        console.log(
          `✅ Migrated product: ${product.name} (${createdProduct.id})`,
        );
        successCount++;
      } catch (error) {
        console.error(`❌ Failed to migrate product: ${product.name}`, error);
        errorCount++;
      }
    }

    console.log(`\nMigration completed:`);
    console.log(`- Successfully migrated: ${successCount} products`);
    console.log(`- Failed: ${errorCount} products`);

    // Verify migration
    const allProducts = await productService.getAllProducts();
    console.log(
      `\nVerification: Database now contains ${allProducts.length} products`,
    );
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

// Run migration if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateData()
    .then(() => {
      console.log("Migration completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Migration failed:", error);
      process.exit(1);
    });
}

export { migrateData };
