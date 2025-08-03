import { pool } from "../database/connection.js";
import { Product, ProductCreateRequest } from "../types/product.js";

export class ProductServicePostgres {
  // Helper method to convert database row to Product object
  private dbRowToProduct(productRow: any, variants: any[]): Product {
    // Calculate base price and original price from variants
    const variantPrices = variants
      .map((v) => parseFloat(v.price))
      .filter((p) => !isNaN(p));
    const variantOriginalPrices = variants
      .map((v) => (v.original_price ? parseFloat(v.original_price) : null))
      .filter((p) => p !== null);

    const basePrice = variantPrices.length > 0 ? Math.min(...variantPrices) : 0;
    const originalPrice =
      variantOriginalPrices.length > 0
        ? Math.min(...variantOriginalPrices)
        : basePrice;

    return {
      id: productRow.id,
      name: productRow.name,
      description: productRow.description,
      category: productRow.category,
      subcategory: productRow.subcategory,
      brand: productRow.brand,
      tags: productRow.tags || [],
      images: productRow.images || [],
      isTrending: productRow.is_trending,
      isFeatured: productRow.is_featured,
      rating: parseFloat(productRow.rating) || 4.5,
      reviews: productRow.reviews || 0,
      basePrice,
      originalPrice,
      variants: variants.map((v) => ({
        id: v.id,
        size: v.size,
        color: v.color,
        price: parseFloat(v.price),
        originalPrice: v.original_price
          ? parseFloat(v.original_price)
          : undefined,
        currency: v.currency,
        stock: v.stock,
        sku: v.sku,
        isAvailable: v.is_available,
      })),
      createdAt: productRow.created_at,
      updatedAt: productRow.updated_at,
      // Add missing fields that the frontend expects
      badges: [],
      shippingDays: 5,
      codAvailable: true,
      isExclusive: false,
    };
  }

  // Get all products with their variants
  async getAllProducts(): Promise<Product[]> {
    const query = `
      SELECT p.*, 
             pv.id as variant_id, pv.size, pv.color, pv.price, pv.original_price,
             pv.currency, pv.stock, pv.sku, pv.is_available
      FROM products p
      LEFT JOIN product_variants pv ON p.id = pv.product_id
      ORDER BY p.created_at DESC, pv.id
    `;

    const result = await pool.query(query);

    // Group variants by product
    const productsMap = new Map<string, { product: any; variants: any[] }>();

    for (const row of result.rows) {
      if (!productsMap.has(row.id)) {
        productsMap.set(row.id, { product: row, variants: [] });
      }

      if (row.variant_id) {
        productsMap.get(row.id)!.variants.push({
          id: row.variant_id,
          size: row.size,
          color: row.color,
          price: row.price,
          original_price: row.original_price,
          currency: row.currency,
          stock: row.stock,
          sku: row.sku,
          is_available: row.is_available,
        });
      }
    }

    return Array.from(productsMap.values()).map(({ product, variants }) =>
      this.dbRowToProduct(product, variants),
    );
  }

  // Get product by ID
  async getProductById(id: string): Promise<Product | null> {
    const query = `
      SELECT p.*, 
             pv.id as variant_id, pv.size, pv.color, pv.price, pv.original_price,
             pv.currency, pv.stock, pv.sku, pv.is_available
      FROM products p
      LEFT JOIN product_variants pv ON p.id = pv.product_id
      WHERE p.id = $1
      ORDER BY pv.id
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    const product = result.rows[0];
    const variants = result.rows
      .filter((row) => row.variant_id)
      .map((row) => ({
        id: row.variant_id,
        size: row.size,
        color: row.color,
        price: row.price,
        original_price: row.original_price,
        currency: row.currency,
        stock: row.stock,
        sku: row.sku,
        is_available: row.is_available,
      }));

    return this.dbRowToProduct(product, variants);
  }

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    const query = `
      SELECT p.*, 
             pv.id as variant_id, pv.size, pv.color, pv.price, pv.original_price,
             pv.currency, pv.stock, pv.sku, pv.is_available
      FROM products p
      LEFT JOIN product_variants pv ON p.id = pv.product_id
      WHERE p.category = $1
      ORDER BY p.created_at DESC, pv.id
    `;

    const result = await pool.query(query, [category]);

    // Group variants by product
    const productsMap = new Map<string, { product: any; variants: any[] }>();

    for (const row of result.rows) {
      if (!productsMap.has(row.id)) {
        productsMap.set(row.id, { product: row, variants: [] });
      }

      if (row.variant_id) {
        productsMap.get(row.id)!.variants.push({
          id: row.variant_id,
          size: row.size,
          color: row.color,
          price: row.price,
          original_price: row.original_price,
          currency: row.currency,
          stock: row.stock,
          sku: row.sku,
          is_available: row.is_available,
        });
      }
    }

    return Array.from(productsMap.values()).map(({ product, variants }) =>
      this.dbRowToProduct(product, variants),
    );
  }

  // Search products
  async searchProducts(query: string): Promise<Product[]> {
    const searchQuery = `
      SELECT p.*, 
             pv.id as variant_id, pv.size, pv.color, pv.price, pv.original_price,
             pv.currency, pv.stock, pv.sku, pv.is_available
      FROM products p
      LEFT JOIN product_variants pv ON p.id = pv.product_id
      WHERE p.name ILIKE $1 
         OR p.description ILIKE $1 
         OR p.category ILIKE $1 
         OR p.subcategory ILIKE $1 
         OR p.brand ILIKE $1
         OR EXISTS (SELECT 1 FROM unnest(p.tags) tag WHERE tag ILIKE $1)
      ORDER BY p.created_at DESC, pv.id
    `;

    const searchTerm = `%${query}%`;
    const result = await pool.query(searchQuery, [searchTerm]);

    // Group variants by product
    const productsMap = new Map<string, { product: any; variants: any[] }>();

    for (const row of result.rows) {
      if (!productsMap.has(row.id)) {
        productsMap.set(row.id, { product: row, variants: [] });
      }

      if (row.variant_id) {
        productsMap.get(row.id)!.variants.push({
          id: row.variant_id,
          size: row.size,
          color: row.color,
          price: row.price,
          original_price: row.original_price,
          currency: row.currency,
          stock: row.stock,
          sku: row.sku,
          is_available: row.is_available,
        });
      }
    }

    return Array.from(productsMap.values()).map(({ product, variants }) =>
      this.dbRowToProduct(product, variants),
    );
  }

  // Get trending products
  async getTrendingProducts(limit: number = 8): Promise<Product[]> {
    const query = `
      SELECT p.*, 
             pv.id as variant_id, pv.size, pv.color, pv.price, pv.original_price,
             pv.currency, pv.stock, pv.sku, pv.is_available
      FROM products p
      LEFT JOIN product_variants pv ON p.id = pv.product_id
      WHERE p.is_trending = true
      ORDER BY p.created_at DESC, pv.id
      LIMIT $1 * 10
    `;

    const result = await pool.query(query, [limit]);

    // Group variants by product
    const productsMap = new Map<string, { product: any; variants: any[] }>();

    for (const row of result.rows) {
      if (!productsMap.has(row.id)) {
        productsMap.set(row.id, { product: row, variants: [] });
      }

      if (row.variant_id) {
        productsMap.get(row.id)!.variants.push({
          id: row.variant_id,
          size: row.size,
          color: row.color,
          price: row.price,
          original_price: row.original_price,
          currency: row.currency,
          stock: row.stock,
          sku: row.sku,
          is_available: row.is_available,
        });
      }
    }

    const products = Array.from(productsMap.values()).map(
      ({ product, variants }) => this.dbRowToProduct(product, variants),
    );

    return products.slice(0, limit);
  }

  // Generate unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Generate SKU
  private generateSKU(
    productName: string,
    variant: { size?: string; color?: string },
  ): string {
    const nameCode = productName
      .replace(/[^a-zA-Z0-9]/g, "")
      .substring(0, 6)
      .toUpperCase();
    const sizeCode = variant.size ? variant.size.toUpperCase() : "OS";
    const colorCode = variant.color
      ? variant.color.substring(0, 3).toUpperCase()
      : "DEF";
    const randomCode = Math.random().toString(36).substr(2, 4).toUpperCase();

    return `${nameCode}-${sizeCode}-${colorCode}-${randomCode}`;
  }

  // Create new product
  async createProduct(productData: ProductCreateRequest): Promise<Product> {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const productId = this.generateId();

      // Insert product
      const productInsertQuery = `
        INSERT INTO products (id, name, description, category, subcategory, brand, tags, images, is_trending, is_featured)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
      `;

      const productResult = await client.query(productInsertQuery, [
        productId,
        productData.name,
        productData.description,
        productData.category,
        productData.subcategory,
        productData.brand,
        productData.tags || [],
        productData.images || [],
        productData.isTrending || false,
        productData.isFeatured || false,
      ]);

      // Insert variants
      const variants = [];
      for (const variant of productData.variants) {
        const variantId = this.generateId();
        const sku = this.generateSKU(productData.name, variant);

        const variantInsertQuery = `
          INSERT INTO product_variants (id, product_id, size, color, price, original_price, currency, stock, sku, is_available)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING *
        `;

        const variantResult = await client.query(variantInsertQuery, [
          variantId,
          productId,
          variant.size,
          variant.color,
          variant.price,
          variant.originalPrice,
          variant.currency || "INR",
          variant.stock || 0,
          sku,
          variant.isAvailable !== false,
        ]);

        variants.push(variantResult.rows[0]);
      }

      await client.query("COMMIT");

      return this.dbRowToProduct(productResult.rows[0], variants);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  // Update product
  async updateProduct(
    id: string,
    updateData: Partial<Product>,
  ): Promise<Product | null> {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Check if product exists
      const existingProduct = await this.getProductById(id);
      if (!existingProduct) {
        return null;
      }

      // Update product fields
      const productUpdateQuery = `
        UPDATE products 
        SET name = COALESCE($1, name),
            description = COALESCE($2, description),
            category = COALESCE($3, category),
            subcategory = COALESCE($4, subcategory),
            brand = COALESCE($5, brand),
            tags = COALESCE($6, tags),
            images = COALESCE($7, images),
            is_trending = COALESCE($8, is_trending),
            is_featured = COALESCE($9, is_featured),
            rating = COALESCE($10, rating),
            reviews = COALESCE($11, reviews)
        WHERE id = $12
        RETURNING *
      `;

      const productResult = await client.query(productUpdateQuery, [
        updateData.name,
        updateData.description,
        updateData.category,
        updateData.subcategory,
        updateData.brand,
        updateData.tags,
        updateData.images,
        updateData.isTrending,
        updateData.isFeatured,
        updateData.rating,
        updateData.reviews,
        id,
      ]);

      // Update variants if provided
      let variants = existingProduct.variants;
      if (updateData.variants) {
        // Delete existing variants
        await client.query(
          "DELETE FROM product_variants WHERE product_id = $1",
          [id],
        );

        // Insert new variants
        variants = [];
        for (const variant of updateData.variants) {
          const variantId = variant.id || this.generateId();
          const sku =
            variant.sku ||
            this.generateSKU(updateData.name || existingProduct.name, variant);

          const variantInsertQuery = `
            INSERT INTO product_variants (id, product_id, size, color, price, original_price, currency, stock, sku, is_available)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
          `;

          const variantResult = await client.query(variantInsertQuery, [
            variantId,
            id,
            variant.size,
            variant.color,
            variant.price,
            variant.originalPrice,
            variant.currency || "INR",
            variant.stock || 0,
            sku,
            variant.isAvailable !== false,
          ]);

          variants.push(variantResult.rows[0]);
        }
      }

      await client.query("COMMIT");

      return this.dbRowToProduct(productResult.rows[0], variants);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  // Delete product
  async deleteProduct(id: string): Promise<boolean> {
    const result = await pool.query("DELETE FROM products WHERE id = $1", [id]);
    return result.rowCount > 0;
  }

  // Update product stock
  async updateProductStock(
    productId: string,
    variantId: string,
    stock: number,
  ): Promise<boolean> {
    const result = await pool.query(
      "UPDATE product_variants SET stock = $1 WHERE id = $2 AND product_id = $3",
      [stock, variantId, productId],
    );
    return result.rowCount > 0;
  }
}

// Export singleton instance
export const productService = new ProductServicePostgres();
