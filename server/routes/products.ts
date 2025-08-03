import { Request, Response } from "express";
import { productService } from "../services/productService.js";
import { ProductCreateRequest, ProductResponse } from "../types/product.js";

// GET /api/products - Get all products
export async function getAllProducts(req: Request, res: Response) {
  try {
    const { category, search, trending } = req.query;

    let products;

    if (trending === "true") {
      const limit = parseInt(req.query.limit as string) || 8;
      products = await productService.getTrendingProducts(limit);
    } else if (category) {
      products = await productService.getProductsByCategory(category as string);
    } else if (search) {
      products = await productService.searchProducts(search as string);
    } else {
      products = await productService.getAllProducts();
    }

    const response: ProductResponse = {
      success: true,
      data: products,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching products:", error);
    const response: ProductResponse = {
      success: false,
      error: "Failed to fetch products",
    };
    res.status(500).json(response);
  }
}

// GET /api/products/:id - Get product by ID
export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (!product) {
      const response: ProductResponse = {
        success: false,
        error: "Product not found",
      };
      return res.status(404).json(response);
    }

    const response: ProductResponse = {
      success: true,
      data: product,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching product:", error);
    const response: ProductResponse = {
      success: false,
      error: "Failed to fetch product",
    };
    res.status(500).json(response);
  }
}

// POST /api/products - Create new product
export async function createProduct(req: Request, res: Response) {
  try {
    const productData: ProductCreateRequest = req.body;

    // Basic validation
    if (
      !productData.name ||
      !productData.description ||
      !productData.category
    ) {
      const response: ProductResponse = {
        success: false,
        error:
          "Missing required fields: name, description, and category are required",
      };
      return res.status(400).json(response);
    }

    if (!productData.variants || productData.variants.length === 0) {
      const response: ProductResponse = {
        success: false,
        error: "At least one product variant is required",
      };
      return res.status(400).json(response);
    }

    const newProduct = await productService.createProduct(productData);

    const response: ProductResponse = {
      success: true,
      data: newProduct,
      message: "Product created successfully",
    };

    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating product:", error);
    const response: ProductResponse = {
      success: false,
      error: "Failed to create product",
    };
    res.status(500).json(response);
  }
}

// PUT /api/products/:id - Update product
export async function updateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProduct = await productService.updateProduct(id, updateData);

    if (!updatedProduct) {
      const response: ProductResponse = {
        success: false,
        error: "Product not found",
      };
      return res.status(404).json(response);
    }

    const response: ProductResponse = {
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    };

    res.json(response);
  } catch (error) {
    console.error("Error updating product:", error);
    const response: ProductResponse = {
      success: false,
      error: "Failed to update product",
    };
    res.status(500).json(response);
  }
}

// DELETE /api/products/:id - Delete product
export async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await productService.deleteProduct(id);

    if (!deleted) {
      const response: ProductResponse = {
        success: false,
        error: "Product not found",
      };
      return res.status(404).json(response);
    }

    const response: ProductResponse = {
      success: true,
      message: "Product deleted successfully",
    };

    res.json(response);
  } catch (error) {
    console.error("Error deleting product:", error);
    const response: ProductResponse = {
      success: false,
      error: "Failed to delete product",
    };
    res.status(500).json(response);
  }
}

// PUT /api/products/:id/stock - Update product variant stock
export async function updateProductStock(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { variantId, stock } = req.body;

    if (typeof stock !== "number" || stock < 0) {
      const response: ProductResponse = {
        success: false,
        error: "Stock must be a non-negative number",
      };
      return res.status(400).json(response);
    }

    const updated = await productService.updateProductStock(
      id,
      variantId,
      stock,
    );

    if (!updated) {
      const response: ProductResponse = {
        success: false,
        error: "Product or variant not found",
      };
      return res.status(404).json(response);
    }

    const response: ProductResponse = {
      success: true,
      message: "Stock updated successfully",
    };

    res.json(response);
  } catch (error) {
    console.error("Error updating stock:", error);
    const response: ProductResponse = {
      success: false,
      error: "Failed to update stock",
    };
    res.status(500).json(response);
  }
}
