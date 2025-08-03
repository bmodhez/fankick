export interface ProductVariant {
  id: string;
  size?: string;
  color?: string;
  price: number;
  originalPrice: number;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: "football" | "anime" | "pop-culture";
  subcategory: string;
  images: string[];
  variants: ProductVariant[];
  basePrice: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  tags: string[];
  badges: string[];
  shippingDays: number;
  codAvailable: boolean;
  isTrending: boolean;
  isExclusive: boolean;
  stockAlert?: string;
  brand?: string;
  materials?: string[];
  features?: string[];
  sizeGuide?: {
    sizes: string[];
    measurements: Record<string, string>;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductCreateRequest {
  name: string;
  description: string;
  category: "football" | "anime" | "pop-culture";
  subcategory: string;
  images: string[];
  variants: Omit<ProductVariant, 'id'>[];
  basePrice: number;
  originalPrice: number;
  tags: string[];
  badges: string[];
  shippingDays: number;
  codAvailable: boolean;
  isTrending: boolean;
  isExclusive: boolean;
  stockAlert?: string;
  brand?: string;
  materials?: string[];
  features?: string[];
  sizeGuide?: {
    sizes: string[];
    measurements: Record<string, string>;
  };
}

export interface ProductUpdateRequest extends Partial<ProductCreateRequest> {
  id: string;
}

export interface ProductResponse {
  success: boolean;
  data?: Product | Product[];
  message?: string;
  error?: string;
}
