import { Product } from "@/data/products";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    // Add default timeout to prevent hanging requests
    signal: options.signal || AbortSignal.timeout(30000), // 30 second timeout
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `HTTP error! status: ${response.status}`,
      );
    }

    const result: ApiResponse<T> = await response.json();

    if (!result.success) {
      throw new Error(result.error || "API request failed");
    }

    return result.data!;
  } catch (error) {
    // Handle AbortError more gracefully
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request was cancelled or timed out');
    }
    throw error;
  }
}

export const productApi = {
  // Get all products with optional filters
  async getAll(params?: {
    category?: string;
    search?: string;
    trending?: boolean;
    limit?: number;
  }): Promise<Product[]> {
    const searchParams = new URLSearchParams();

    if (params?.category) searchParams.append("category", params.category);
    if (params?.search) searchParams.append("search", params.search);
    if (params?.trending) searchParams.append("trending", "true");
    if (params?.limit) searchParams.append("limit", params.limit.toString());

    const query = searchParams.toString();
    const endpoint = `/products${query ? `?${query}` : ""}`;

    return apiRequest<Product[]>(endpoint);
  },

  // Get single product by ID
  async getById(id: string): Promise<Product> {
    return apiRequest<Product>(`/products/${id}`);
  },

  // Create new product
  async create(
    productData: Omit<
      Product,
      "id" | "rating" | "reviews" | "createdAt" | "updatedAt"
    >,
  ): Promise<Product> {
    return apiRequest<Product>("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    });
  },

  // Update existing product
  async update(id: string, productData: Partial<Product>): Promise<Product> {
    return apiRequest<Product>(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    });
  },

  // Delete product
  async delete(id: string): Promise<void> {
    await apiRequest<void>(`/products/${id}`, {
      method: "DELETE",
    });
  },

  // Update product stock
  async updateStock(
    productId: string,
    variantId: string,
    stock: number,
  ): Promise<void> {
    await apiRequest<void>(`/products/${productId}/stock`, {
      method: "PUT",
      body: JSON.stringify({ variantId, stock }),
    });
  },

  // Search products
  async search(query: string): Promise<Product[]> {
    return this.getAll({ search: query });
  },

  // Get trending products
  async getTrending(limit: number = 8): Promise<Product[]> {
    return this.getAll({ trending: true, limit });
  },

  // Get products by category
  async getByCategory(category: string): Promise<Product[]> {
    return this.getAll({ category });
  },
};

export default productApi;
