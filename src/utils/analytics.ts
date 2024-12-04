import { Order } from '../types/order';
import { Product } from '../types/product';

export const calculateTotalRevenue = (orders: Order[]): number => {
  return orders
    .filter(order => order.paymentStatus === 'paid')
    .reduce((total, order) => total + order.total, 0);
};

export const calculateAverageOrderValue = (orders: Order[]): number => {
  const paidOrders = orders.filter(order => order.paymentStatus === 'paid');
  if (paidOrders.length === 0) return 0;
  return calculateTotalRevenue(paidOrders) / paidOrders.length;
};

export const getTopSellingProducts = (orders: Order[]): Record<string, number> => {
  const productSales: Record<string, number> = {};
  
  orders.forEach(order => {
    order.items.forEach(item => {
      productSales[item.productId] = (productSales[item.productId] || 0) + item.quantity;
    });
  });
  
  return productSales;
};

export const calculateInventoryStatus = (products: Product[]): {
  low: number;
  medium: number;
  high: number;
} => {
  return products.reduce(
    (acc, product) => {
      const available = product.inventory.available;
      if (available < 10) acc.low++;
      else if (available < 50) acc.medium++;
      else acc.high++;
      return acc;
    },
    { low: 0, medium: 0, high: 0 }
  );
};

export const getOrdersByStatus = (orders: Order[]): Record<string, number> => {
  return orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export const calculateGrowthRate = (
  currentPeriodValue: number,
  previousPeriodValue: number
): number => {
  if (previousPeriodValue === 0) return 0;
  return ((currentPeriodValue - previousPeriodValue) / previousPeriodValue) * 100;
};