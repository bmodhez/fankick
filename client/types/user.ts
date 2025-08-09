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
  role?: string;
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
  shippingAddress?: any;
  billingAddress?: any;
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
