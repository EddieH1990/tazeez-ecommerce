import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { Order } from '../types/order';
import { Product } from '../types/product';
import { ReportFilter, ReportType } from '../types/report';
import { calculateTotalRevenue, calculateAverageOrderValue, getTopSellingProducts } from './analytics';

export const generateReport = (
  type: ReportType,
  orders: Order[],
  products: Product[],
  filters: ReportFilter
) => {
  const filteredOrders = filterOrdersByDate(orders, filters.startDate, filters.endDate);

  switch (type) {
    case 'sales':
      return generateSalesReport(filteredOrders);
    case 'inventory':
      return generateInventoryReport(products);
    case 'customers':
      return generateCustomersReport(filteredOrders);
    case 'groups':
      return generateGroupsReport(filteredOrders, products);
    case 'financial':
      return generateFinancialReport(filteredOrders);
    default:
      throw new Error('Invalid report type');
  }
};

const filterOrdersByDate = (orders: Order[], startDate: string, endDate: string) => {
  return orders.filter(order => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
  });
};

const generateSalesReport = (orders: Order[]) => {
  const totalRevenue = calculateTotalRevenue(orders);
  const averageOrderValue = calculateAverageOrderValue(orders);
  const ordersByStatus = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalOrders: orders.length,
    totalRevenue,
    averageOrderValue,
    ordersByStatus,
    dailyRevenue: calculateDailyRevenue(orders),
  };
};

const generateInventoryReport = (products: Product[]) => {
  return {
    totalProducts: products.length,
    totalStock: products.reduce((acc, product) => acc + product.inventory.total, 0),
    lowStock: products.filter(p => p.inventory.available < 10),
    outOfStock: products.filter(p => p.inventory.available === 0),
    categoryDistribution: getCategoryDistribution(products),
  };
};

const generateCustomersReport = (orders: Order[]) => {
  const customers = new Set(orders.map(order => order.userId));
  const repeatCustomers = getRepeatCustomers(orders);

  return {
    totalCustomers: customers.size,
    newCustomers: getNewCustomers(orders),
    repeatCustomers: repeatCustomers.length,
    topCustomers: getTopCustomers(orders),
    customerRetentionRate: calculateRetentionRate(orders),
  };
};

const generateGroupsReport = (orders: Order[], products: Product[]) => {
  return {
    activeGroups: products.filter(p => p.currentParticipants > 0).length,
    completedGroups: getCompletedGroups(orders),
    averageGroupSize: calculateAverageGroupSize(products),
    successRate: calculateGroupSuccessRate(orders),
    popularCategories: getPopularGroupCategories(products),
  };
};

const generateFinancialReport = (orders: Order[]) => {
  return {
    revenue: calculateTotalRevenue(orders),
    averageOrderValue: calculateAverageOrderValue(orders),
    revenueByPaymentMethod: getRevenueByPaymentMethod(orders),
    refundRate: calculateRefundRate(orders),
    profitMargin: calculateProfitMargin(orders),
  };
};

// Helper functions
const calculateDailyRevenue = (orders: Order[]) => {
  const dailyRevenue: Record<string, number> = {};
  orders.forEach(order => {
    const date = format(new Date(order.createdAt), 'yyyy-MM-dd');
    dailyRevenue[date] = (dailyRevenue[date] || 0) + order.total;
  });
  return dailyRevenue;
};

const getCategoryDistribution = (products: Product[]) => {
  return products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

const getRepeatCustomers = (orders: Order[]) => {
  const customerOrders = orders.reduce((acc, order) => {
    acc[order.userId] = (acc[order.userId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(customerOrders)
    .filter(([_, count]) => count > 1)
    .map(([userId]) => userId);
};

const getNewCustomers = (orders: Order[]) => {
  const last30Days = subDays(new Date(), 30);
  return new Set(
    orders
      .filter(order => new Date(order.createdAt) >= last30Days)
      .map(order => order.userId)
  ).size;
};

const getTopCustomers = (orders: Order[]) => {
  const customerSpending = orders.reduce((acc, order) => {
    acc[order.userId] = (acc[order.userId] || 0) + order.total;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(customerSpending)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);
};

const calculateRetentionRate = (orders: Order[]) => {
  const repeatCustomers = getRepeatCustomers(orders).length;
  const totalCustomers = new Set(orders.map(order => order.userId)).size;
  return totalCustomers > 0 ? (repeatCustomers / totalCustomers) * 100 : 0;
};

const getCompletedGroups = (orders: Order[]) => {
  return new Set(
    orders
      .filter(order => order.status === 'delivered')
      .map(order => order.items.map(item => item.productId))
      .flat()
  ).size;
};

const calculateAverageGroupSize = (products: Product[]) => {
  const activeProducts = products.filter(p => p.currentParticipants > 0);
  if (activeProducts.length === 0) return 0;
  return activeProducts.reduce((acc, p) => acc + p.currentParticipants, 0) / activeProducts.length;
};

const calculateGroupSuccessRate = (orders: Order[]) => {
  const completedGroups = getCompletedGroups(orders);
  const totalGroups = new Set(
    orders.map(order => order.items.map(item => item.productId)).flat()
  ).size;
  return totalGroups > 0 ? (completedGroups / totalGroups) * 100 : 0;
};

const getPopularGroupCategories = (products: Product[]) => {
  return products
    .filter(p => p.currentParticipants > 0)
    .reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + product.currentParticipants;
      return acc;
    }, {} as Record<string, number>);
};

const getRevenueByPaymentMethod = (orders: Order[]) => {
  return orders.reduce((acc, order) => {
    acc[order.paymentMethod] = (acc[order.paymentMethod] || 0) + order.total;
    return acc;
  }, {} as Record<string, number>);
};

const calculateRefundRate = (orders: Order[]) => {
  const refundedOrders = orders.filter(order => order.status === 'refunded').length;
  return orders.length > 0 ? (refundedOrders / orders.length) * 100 : 0;
};

const calculateProfitMargin = (orders: Order[]) => {
  // This is a simplified calculation. In a real app, you'd need cost data
  const revenue = calculateTotalRevenue(orders);
  const estimatedCosts = revenue * 0.7; // Assuming 70% costs
  return revenue > 0 ? ((revenue - estimatedCosts) / revenue) * 100 : 0;
};