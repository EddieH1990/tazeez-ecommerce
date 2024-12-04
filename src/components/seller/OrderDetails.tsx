import React from 'react';
import { motion } from 'framer-motion';
import { X, Package, MapPin, CreditCard, Phone } from 'lucide-react';
import { Order, OrderStatus } from '../../types/order';
import { useOrders } from '../../hooks/useOrders';
import LoadingSpinner from '../LoadingSpinner';

interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onClose }) => {
  const { updateOrder, isUpdating } = useOrders();

  const handleStatusUpdate = (status: OrderStatus) => {
    updateOrder({
      orderId: order.id,
      data: { status }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto m-4"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            تفاصيل الطلب #{order.id.slice(0, 8)}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Status */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold mb-4">حالة الطلب</h3>
            <div className="flex flex-wrap gap-2">
              {['pending', 'confirmed', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusUpdate(status as OrderStatus)}
                  disabled={isUpdating}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    order.status === status
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-bold mb-4">المنتجات</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <div className="text-sm text-gray-600">
                      {item.quantity} × {item.price} ر.س
                    </div>
                  </div>
                  <div className="text-lg font-bold">
                    {item.quantity * item.price} ر.س
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-4">معلومات العميل</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-gray-400" />
                  <span>{order.shippingAddress.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span>{order.shippingAddress.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span>
                    {order.shippingAddress.street}, {order.shippingAddress.city}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">معلومات الدفع</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span>{order.paymentMethod === 'card' ? 'بطاقة ائتمان' : 'تحويل بنكي'}</span>
                </div>
                <div className="flex justify-between">
                  <span>المجموع:</span>
                  <span className="font-bold">{order.total} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span>حالة الدفع:</span>
                  <span className={`font-bold ${
                    order.paymentStatus === 'paid' ? 'text-emerald-600' : 'text-yellow-600'
                  }`}>
                    {order.paymentStatus === 'paid' ? 'مدفوع' : 'قيد الانتظار'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Information */}
          {order.status === 'shipped' && (
            <div>
              <h3 className="font-bold mb-4">معلومات التتبع</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-gray-400" />
                  <span>رقم التتبع: {order.trackingNumber}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default OrderDetails;