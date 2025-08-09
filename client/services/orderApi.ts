import { UserOrder } from "../types/user";

const BASE_URL = "/api";

export interface CreateOrderRequest {
  userId: string;
  totalAmount: number;
  currency: string;
  paymentMethod: string;
  paymentStatus?: string;
  orderStatus?: string;
  shippingAddress?: any;
  items: Array<{
    productId: string;
    variantId?: string;
    quantity: number;
    price: number;
    name: string;
    selectedVariant?: any;
  }>;
  notes?: string;
}

class OrderApi {
  async createOrder(orderData: CreateOrderRequest): Promise<UserOrder> {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to create order");
    }

    return data.data;
  }

  async getUserOrders(userId: string): Promise<UserOrder[]> {
    const response = await fetch(`${BASE_URL}/orders/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch orders");
    }

    return data.data || [];
  }

  async getOrder(orderId: string): Promise<UserOrder> {
    const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch order");
    }

    return data.data;
  }

  async updateOrderStatus(orderId: string, status: { orderStatus?: string; paymentStatus?: string }): Promise<UserOrder> {
    const response = await fetch(`${BASE_URL}/orders/${orderId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(status),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to update order status");
    }

    return data.data;
  }

  async getAllOrders(): Promise<UserOrder[]> {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch all orders");
    }

    return data.data || [];
  }
}

export const orderApi = new OrderApi();
