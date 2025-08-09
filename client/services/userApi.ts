const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  profileImage?: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserCreateRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
}

interface UserLoginRequest {
  email: string;
  password: string;
}

interface AuthData {
  user: User;
  sessionToken: string;
  expiresAt: string;
}

interface UserAddress {
  id: string;
  userId: string;
  addressType: "home" | "work" | "other";
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CartItem {
  id: string;
  userId: string;
  productId: string;
  variantId: string;
  quantity: number;
  addedAt: string;
  updatedAt: string;
}

interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  addedAt: string;
}

class UserApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "UserApiError";
  }
}

async function userApiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  retries: number = 1,
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  // Get session token from localStorage
  const sessionToken = localStorage.getItem("sessionToken");

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(sessionToken && { Authorization: `Bearer ${sessionToken}` }),
      ...options.headers,
    },
    signal: options.signal || AbortSignal.timeout(60000),
  };

  let lastError: Error;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      console.log(
        `User API Request ${attempt + 1}/${retries + 1}: ${options.method || "GET"} ${url}`,
      );

      // Add a small delay between retries
      if (attempt > 0) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      const response = await fetch(url, { ...defaultOptions, ...options });

      let result: ApiResponse<T>;
      try {
        result = await response.json();
      } catch (jsonError) {
        // If JSON parsing fails, throw a generic error
        throw new UserApiError(
          response.status,
          `HTTP error! status: ${response.status}`,
        );
      }

      if (!response.ok) {
        // Use the server's error message if available, otherwise use user-friendly message
        let errorMessage =
          result.error || `HTTP error! status: ${response.status}`;

        // Provide user-friendly messages for common HTTP status codes
        if (response.status === 401) {
          // Don't show scary error messages for session verification failures
          if (endpoint === "/auth/me") {
            errorMessage = result.error || "Session expired";
          } else {
            errorMessage = result.error || "Invalid email or password";
          }
        } else if (response.status === 400) {
          errorMessage = result.error || "Invalid request data";
        } else if (response.status === 500) {
          errorMessage = result.error || "Server error. Please try again later";
        }

        throw new UserApiError(response.status, errorMessage);
      }

      if (!result.success) {
        throw new Error(result.error || "API request failed");
      }

      console.log(
        `User API Request successful: ${options.method || "GET"} ${url}`,
      );
      return result.data!;
    } catch (error) {
      lastError = error as Error;

      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Request was cancelled or timed out");
      }

      // Don't retry client errors (4xx) or if it's a JSON parsing issue
      if (
        error instanceof UserApiError &&
        error.status >= 400 &&
        error.status < 500
      ) {
        throw error;
      }

      // Don't retry JSON parsing errors or abort errors
      if (
        error instanceof Error &&
        (error.message.includes("JSON") || error.name === "AbortError")
      ) {
        throw error;
      }

      if (attempt === retries) {
        console.error(
          `User API Request failed after ${retries + 1} attempts:`,
          error,
        );
        throw error;
      }

      const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
      console.log(`User API Request failed, retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

export const userApi = {
  // Authentication
  async register(userData: UserCreateRequest): Promise<User> {
    return userApiRequest<User>(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify(userData),
      },
      2,
    );
  },

  async login(loginData: UserLoginRequest): Promise<AuthData> {
    return userApiRequest<AuthData>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify(loginData),
      },
      2,
    );
  },

  async logout(): Promise<void> {
    await userApiRequest<void>("/auth/logout", {
      method: "POST",
    });
  },

  async getCurrentUser(): Promise<User> {
    return userApiRequest<User>("/auth/me");
  },

  // Profile management
  async updateProfile(updateData: Partial<User>): Promise<User> {
    return userApiRequest<User>(
      "/users/profile",
      {
        method: "PUT",
        body: JSON.stringify(updateData),
      },
      2,
    );
  },

  // Address management
  async getAddresses(): Promise<UserAddress[]> {
    return userApiRequest<UserAddress[]>("/users/addresses");
  },

  async addAddress(
    addressData: Omit<UserAddress, "id" | "userId" | "createdAt" | "updatedAt">,
  ): Promise<UserAddress> {
    return userApiRequest<UserAddress>("/users/addresses", {
      method: "POST",
      body: JSON.stringify(addressData),
    });
  },

  // Cart management
  async getCart(): Promise<CartItem[]> {
    return userApiRequest<CartItem[]>("/users/cart");
  },

  async addToCart(
    productId: string,
    variantId: string,
    quantity: number = 1,
  ): Promise<CartItem> {
    return userApiRequest<CartItem>("/users/cart", {
      method: "POST",
      body: JSON.stringify({ productId, variantId, quantity }),
    });
  },

  async removeFromCart(itemId: string): Promise<void> {
    await userApiRequest<void>(`/users/cart/${itemId}`, {
      method: "DELETE",
    });
  },

  // Wishlist management
  async getWishlist(): Promise<WishlistItem[]> {
    return userApiRequest<WishlistItem[]>("/users/wishlist");
  },

  async addToWishlist(productId: string): Promise<WishlistItem> {
    return userApiRequest<WishlistItem>("/users/wishlist", {
      method: "POST",
      body: JSON.stringify({ productId }),
    });
  },

  async removeFromWishlist(productId: string): Promise<void> {
    await userApiRequest<void>(`/users/wishlist/${productId}`, {
      method: "DELETE",
    });
  },
};

export default userApi;
export type {
  User,
  UserCreateRequest,
  UserLoginRequest,
  AuthData,
  UserAddress,
  CartItem,
  WishlistItem,
};
