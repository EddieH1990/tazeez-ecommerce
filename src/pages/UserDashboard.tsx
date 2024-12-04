import React from 'react';
import { motion } from 'framer-motion';
import { Package, User, Heart, Settings } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Navigate } from 'react-router-dom';

const UserDashboard = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const orders = [
    {
      id: '1',
      date: '2024-02-20',
      status: 'قيد التنفيذ',
      total: 799,
      items: ['سماعات آبل اللاسلكية']
    },
    // Add more orders as needed
  ];

  const groups = [
    {
      id: '1',
      product: 'ساعة سامسونج الذكية',
      progress: '8/15',
      timeLeft: '3 أيام',
      status: 'نشط'
    },
    // Add more groups as needed
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h2 className="font-bold">{user.email}</h2>
                  <p className="text-sm text-gray-500">عضو منذ 2024</p>
                </div>
              </div>

              <nav className="space-y-2">
                <NavItem icon={<Package />} text="طلباتي" active />
                <NavItem icon={<Users />} text="مجموعاتي" />
                <NavItem icon={<Heart />} text="المفضلة" />
                <NavItem icon={<Settings />} text="الإعدادات" />
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            {/* Orders */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-6">طلباتي</h3>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-lg p-4"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-bold">طلب #{order.id}</span>
                      <span className="text-emerald-600">{order.status}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>التاريخ: {order.date}</p>
                      <p>المنتجات: {order.items.join(', ')}</p>
                      <p>الإجمالي: {order.total} ر.س</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Groups */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-6">مجموعاتي النشطة</h3>
              <div className="space-y-4">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className="border rounded-lg p-4"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-bold">{group.product}</span>
                      <span className="text-emerald-600">{group.status}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>التقدم: {group.progress}</p>
                      <p>الوقت المتبقي: {group.timeLeft}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, text, active = false }: { icon: React.ReactNode; text: string; active?: boolean }) => (
  <button
    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
      active
        ? 'bg-emerald-50 text-emerald-600'
        : 'hover:bg-gray-50'
    }`}
  >
    {icon}
    <span>{text}</span>
  </button>
);

export default UserDashboard;