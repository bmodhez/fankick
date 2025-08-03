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
  retries: number = 1,
): Promise<T> {
  // Try with configured API base URL first, then fallback to relative URL
  const urls = [
    `${API_BASE_URL}${endpoint}`,
    endpoint // Fallback to relative URL
  ];

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    // Add shorter timeout to fail fast on network issues
    signal: options.signal || AbortSignal.timeout(10000), // 10 second timeout
  };

  let lastError: Error;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      console.log(
        `API Request ${attempt + 1}/${retries + 1}: ${options.method || "GET"} ${url}`,
      );

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

      console.log(`API Request successful: ${options.method || "GET"} ${url}`);
      return result.data!;
    } catch (error) {
      lastError = error as Error;

      // Handle specific fetch errors
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new Error("Request was cancelled or timed out");
        }

        // Handle network/fetch failures
        if (error.message.includes("Failed to fetch") ||
            error.message.includes("NetworkError") ||
            error.message.includes("ERR_NETWORK")) {
          throw new Error("Network error. Please check your connection and try again.");
        }
      }

      // Don't retry on client errors (4xx) or if it's the last attempt
      if (
        error instanceof ApiError &&
        error.status >= 400 &&
        error.status < 500
      ) {
        throw error;
      }

      if (attempt === retries) {
        console.error(
          `API Request failed after ${retries + 1} attempts:`,
          error,
        );
        throw error;
      }

      // Wait before retrying (exponential backoff)
      const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
      console.log(`API Request failed, retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
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
    return apiRequest<Product>(
      "/products",
      {
        method: "POST",
        body: JSON.stringify(productData),
      },
      2,
    ); // Retry up to 2 times for create operations
  },

  // Update existing product
  async update(id: string, productData: Partial<Product>): Promise<Product> {
    return apiRequest<Product>(
      `/products/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(productData),
      },
      2,
    ); // Retry up to 2 times for update operations
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
