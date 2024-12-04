import React from 'react';
import { motion } from 'framer-motion';
import { useOrders } from '../../hooks/useOrders';
import { useProducts } from '../../hooks/useProducts';
import RevenueChart from '../../components/analytics/RevenueChart';
import OrdersOverview from '../../components/analytics/OrdersOverview';
import InventoryStatus from '../../components/analytics/InventoryStatus';
import TopProducts from '../../components/analytics/TopProducts';
import LoadingSpinner from '../../components/LoadingSpinner';

const Analytics = () => {
  const { orders, isLoading: isLoadingOrders } = useOrders();
  const { products, isLoading: isLoadingProducts } = useProducts();

  if (isLoadingOrders || isLoadingProducts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Mock data for revenue chart
  const currentRevenue = 150000;
  const previousRevenue = 120000;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">لوحة التحليلات</h1>
          <p className="text-gray-600">نظرة عامة على أداء متجرك</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <RevenueChart
              currentRevenue={currentRevenue}
              previousRevenue={previousRevenue}
              period="آخر 30 يوم"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <OrdersOverview orders={orders} />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <TopProducts orders={orders} products={products} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <InventoryStatus products={products} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;