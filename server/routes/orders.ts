import { RequestHandler } from "express";
import { UserOrder, OrderItem } from "../types/user";

// In-memory orders storage (will be replaced with database)
let orders: UserOrder[] = [];
let orderCounter = 1000;

// Create a new order
export const createOrder: RequestHandler = (req, res) => {
  try {
    const {
      userId,
      totalAmount,
      currency,
      paymentMethod,
      paymentStatus = "paid",
      orderStatus = "placed",
      shippingAddress,
      items,
      notes
    } = req.body;

    if (!userId || !totalAmount || !currency || !items || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: userId, totalAmount, currency, items"
      });
    }

    const orderNumber = `ORD-${orderCounter++}`;
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const newOrder: UserOrder = {
      id: orderId,
      userId,
      orderNumber,
      totalAmount,
      currency,
      paymentStatus,
      orderStatus,
      paymentMethod,
      shippingAddressId: shippingAddress?.id,
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: items.map((item: any, index: number) => ({
        id: `item_${Date.now()}_${index}`,
        orderId,
        productId: item.productId,
        variantId: item.variantId || item.selectedVariant || "default",
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity,
        productName: item.name,
        variantDetails: item.selectedVariant,
        createdAt: new Date().toISOString()
      })),
      shippingAddress
    };

    orders.push(newOrder);

    res.json({
      success: true,
      data: newOrder,
      message: "Order created successfully"
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create order"
    });
  }
};

// Get orders for a user
export const getUserOrders: RequestHandler = (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required"
      });
    }

    const userOrders = orders
      .filter(order => order.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json({
      success: true,
      data: userOrders
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch orders"
    });
  }
};

// Get a specific order
export const getOrder: RequestHandler = (req, res) => {
  try {
    const { orderId } = req.params;

    const order = orders.find(order => order.id === orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found"
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch order"
    });
  }
};

// Update order status
export const updateOrderStatus: RequestHandler = (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    const orderIndex = orders.findIndex(order => order.id === orderId);

    if (orderIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Order not found"
      });
    }

    if (orderStatus) {
      orders[orderIndex].orderStatus = orderStatus;
    }
    if (paymentStatus) {
      orders[orderIndex].paymentStatus = paymentStatus;
    }
    
    orders[orderIndex].updatedAt = new Date().toISOString();

    res.json({
      success: true,
      data: orders[orderIndex],
      message: "Order updated successfully"
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update order"
    });
  }
};

// Get all orders (admin only)
export const getAllOrders: RequestHandler = (req, res) => {
  try {
    const sortedOrders = orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json({
      success: true,
      data: sortedOrders
    });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch orders"
    });
  }
};
