export interface User {
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

export interface UserCreateRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserAddress {
  id: string;
  userId: string;
  addressType: 'home' | 'work' | 'other';
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserAddressCreateRequest {
  addressType?: 'home' | 'work' | 'other';
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
  isDefault?: boolean;
}

export interface UserSession {
  id: string;
  userId: string;
  sessionToken: string;
  expiresAt: string;
  userAgent?: string;
  ipAddress?: string;
  createdAt: string;
}

export interface UserPreferences {
  id: string;
  userId: string;
  preferredCurrency: string;
  preferredLanguage: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  themePreference: 'light' | 'dark' | 'auto';
  createdAt: string;
  updatedAt: string;
}

export interface UserOrder {
  id: string;
  userId: string;
  orderNumber: string;
  totalAmount: number;
  currency: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  orderStatus: 'placed' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod?: string;
  paymentId?: string;
  shippingAddressId?: string;
  billingAddressId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
  shippingAddress?: UserAddress;
  billingAddress?: UserAddress;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productName?: string;
  variantDetails?: any;
  createdAt: string;
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  variantId: string;
  quantity: number;
  addedAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  addedAt: string;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    sessionToken: string;
    expiresAt: string;
  };
  message?: string;
  error?: string;
}

export interface UserResponse {
  success: boolean;
  data?: User | User[];
  message?: string;
  error?: string;
}
