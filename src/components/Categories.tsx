import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Shirt, Home, Gift, Car, Utensils } from 'lucide-react';

const Categories = () => {
  const categories = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      name: "إلكترونيات",
      count: "٢٥٠+ منتج"
    },
    {
      icon: <Shirt className="w-8 h-8" />,
      name: "أزياء",
      count: "٣٠٠+ منتج"
    },
    {
      icon: <Home className="w-8 h-8" />,
      name: "منزل",
      count: "٢٠٠+ منتج"
    },
    {
      icon: <Gift className="w-8 h-8" />,
      name: "هدايا",
      count: "١٥٠+ منتج"
    },
    {
      icon: <Car className="w-8 h-8" />,
      name: "سيارات",
      count: "١٠٠+ منتج"
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      name: "مطبخ",
      count: "١٨٠+ منتج"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">تصفح حسب الفئة</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            اكتشف مجموعة متنوعة من المنتجات في مختلف الفئات
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                  <div className="text-emerald-600">{category.icon}</div>
                </div>
                <h3 className="text-lg font-bold mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;