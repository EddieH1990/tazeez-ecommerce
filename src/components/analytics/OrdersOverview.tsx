import React from 'react';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Order } from '../../types/order';
import { getOrdersByStatus } from '../../utils/analytics';

interface OrdersOverviewProps {
  orders: Order[];
}

const OrdersOverview: React.FC<OrdersOverviewProps> = ({ orders }) => {
  const ordersByStatus = getOrdersByStatus(orders);

  const stats = [
    {
      label: 'قيد الانتظار',
      value: ordersByStatus['pending'] || 0,
      icon: <Clock className="w-5 h-5" />,
      color: 'text-yellow-600 bg-yellow-50',
    },
    {
      label: 'قيد التجهيز',
      value: ordersByStatus['processing'] || 0,
      icon: <Package className="w-5 h-5" />,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      label: 'مكتمل',
      value: ordersByStatus['delivered'] || 0,
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-green-600 bg-green-50',
    },
    {
      label: 'ملغي',
      value: ordersByStatus['cancelled'] || 0,
      icon: <XCircle className="w-5 h-5" />,
      color: 'text-red-600 bg-red-50',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-bold mb-6">نظرة عامة على الطلبات</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`inline-flex p-3 rounded-full mb-2 ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersOverview;