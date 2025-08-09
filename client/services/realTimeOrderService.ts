import { orderApi } from './orderApi';
import { UserOrder } from '@/types/user';

class RealTimeOrderService {
  private orderUpdateListeners: Map<string, (order: UserOrder) => void> = new Map();
  private orderStatusCheckInterval: number | null = null;
  
  // Simulate real-time order status updates
  startOrderTracking(userId: string, onOrderUpdate: (orders: UserOrder[]) => void) {
    // Check for order updates every 30 seconds
    this.orderStatusCheckInterval = window.setInterval(async () => {
      try {
        const orders = await orderApi.getUserOrders(userId);
        
        // Simulate order progression for demo
        const updatedOrders = orders.map(order => {
          if (order.orderStatus === 'placed') {
            // 30% chance to move to confirmed after 2 minutes
            const timeSinceOrder = Date.now() - new Date(order.createdAt).getTime();
            if (timeSinceOrder > 120000 && Math.random() > 0.7) { // 2 minutes + 30% chance
              return { ...order, orderStatus: 'confirmed' as const, updatedAt: new Date().toISOString() };
            }
          } else if (order.orderStatus === 'confirmed') {
            // 20% chance to move to shipped after 5 minutes
            const timeSinceOrder = Date.now() - new Date(order.createdAt).getTime();
            if (timeSinceOrder > 300000 && Math.random() > 0.8) { // 5 minutes + 20% chance
              return { ...order, orderStatus: 'shipped' as const, updatedAt: new Date().toISOString() };
            }
          } else if (order.orderStatus === 'shipped') {
            // 10% chance to move to delivered after 10 minutes
            const timeSinceOrder = Date.now() - new Date(order.createdAt).getTime();
            if (timeSinceOrder > 600000 && Math.random() > 0.9) { // 10 minutes + 10% chance
              return { ...order, orderStatus: 'delivered' as const, updatedAt: new Date().toISOString() };
            }
          }
          return order;
        });
        
        // Check if any orders have been updated
        const hasUpdates = updatedOrders.some((order, index) => 
          order.orderStatus !== orders[index]?.orderStatus
        );
        
        if (hasUpdates) {
          // Update backend with new status (in real app, this would come from backend)
          for (const order of updatedOrders) {
            if (order.orderStatus !== orders.find(o => o.id === order.id)?.orderStatus) {
              try {
                await orderApi.updateOrderStatus(order.id, { orderStatus: order.orderStatus });
              } catch (error) {
                console.warn('Failed to update order status:', error);
              }
            }
          }
          
          onOrderUpdate(updatedOrders);
        }
      } catch (error) {
        console.error('Failed to check order updates:', error);
      }
    }, 30000); // Check every 30 seconds
  }
  
  stopOrderTracking() {
    if (this.orderStatusCheckInterval) {
      clearInterval(this.orderStatusCheckInterval);
      this.orderStatusCheckInterval = null;
    }
  }
  
  // Get estimated delivery time based on order status
  getEstimatedDelivery(order: UserOrder): string {
    const orderDate = new Date(order.createdAt);
    const now = new Date();
    
    switch (order.orderStatus) {
      case 'placed':
        return 'Processing... 3-5 business days';
      case 'confirmed':
        return 'Confirmed - 2-4 business days';
      case 'shipped':
        const daysShipped = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));
        return `In transit - ${Math.max(1, 3 - daysShipped)} day(s) remaining`;
      case 'delivered':
        return 'Delivered!';
      case 'cancelled':
        return 'Cancelled';
      default:
        return '3-5 business days';
    }
  }
  
  // Get order progress percentage
  getOrderProgress(order: UserOrder): number {
    switch (order.orderStatus) {
      case 'placed':
        return 25;
      case 'confirmed':
        return 50;
      case 'shipped':
        return 75;
      case 'delivered':
        return 100;
      case 'cancelled':
        return 0;
      default:
        return 0;
    }
  }
  
  // Get next expected status
  getNextStatus(order: UserOrder): string {
    switch (order.orderStatus) {
      case 'placed':
        return 'Order Confirmation';
      case 'confirmed':
        return 'Shipping';
      case 'shipped':
        return 'Delivery';
      case 'delivered':
        return 'Complete';
      default:
        return 'Processing';
    }
  }
  
  // Simulate live tracking updates
  getTrackingUpdates(order: UserOrder): Array<{
    status: string;
    message: string;
    timestamp: string;
    isActive: boolean;
  }> {
    const baseTime = new Date(order.createdAt);
    const updates = [
      {
        status: 'placed',
        message: 'Order placed successfully',
        timestamp: baseTime.toISOString(),
        isActive: true
      }
    ];
    
    if (['confirmed', 'shipped', 'delivered'].includes(order.orderStatus)) {
      updates.push({
        status: 'confirmed',
        message: 'Order confirmed and being prepared',
        timestamp: new Date(baseTime.getTime() + 120000).toISOString(), // +2 minutes
        isActive: true
      });
    }
    
    if (['shipped', 'delivered'].includes(order.orderStatus)) {
      updates.push({
        status: 'shipped',
        message: 'Order shipped and on the way',
        timestamp: new Date(baseTime.getTime() + 300000).toISOString(), // +5 minutes
        isActive: true
      });
    }
    
    if (order.orderStatus === 'delivered') {
      updates.push({
        status: 'delivered',
        message: 'Order delivered successfully',
        timestamp: new Date(baseTime.getTime() + 600000).toISOString(), // +10 minutes
        isActive: true
      });
    }
    
    return updates;
  }
}

export const realTimeOrderService = new RealTimeOrderService();
