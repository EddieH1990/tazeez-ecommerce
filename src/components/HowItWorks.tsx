import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, Share2, ArrowLeft } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "اختر المنتج",
      description: "تصفح المنتجات واختر ما يناسبك من العروض الحصرية"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "انضم للمجموعة",
      description: "اختر مجموعة الشراء المناسبة أو أنشئ مجموعة جديدة"
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "ادعُ أصدقاءك",
      description: "شارك العرض مع أصدقائك للحصول على السعر المخفض"
    },
    {
      icon: <ArrowLeft className="w-8 h-8" />,
      title: "احصل على المنتج",
      description: "عند اكتمال المجموعة، سيتم تأكيد طلبك وشحن المنتج"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">كيف يعمل تعزيز؟</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            خطوات بسيطة للحصول على منتجاتك المفضلة بأسعار الجملة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-emerald-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-emerald-600">{step.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-full h-0.5 bg-emerald-100 transform translate-x-1/2">
                  <div className="absolute top-1/2 right-0 w-3 h-3 bg-emerald-500 rounded-full transform -translate-y-1/2" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;