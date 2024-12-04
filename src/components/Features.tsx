import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, Share2, Clock, Percent, Shield } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "شراء جماعي",
      description: "انضم لمجموعات الشراء واحصل على أسعار الجملة"
    },
    {
      icon: <Percent className="w-8 h-8" />,
      title: "أسعار تنافسية",
      description: "وفر حتى ٤٠٪ على مشترياتك مع مجموعات الشراء"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "ضمان الجودة",
      description: "جميع المنتجات أصلية ومضمونة ١٠٠٪"
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "برنامج الإحالة",
      description: "اكسب نقاط وخصومات إضافية عند دعوة أصدقائك"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "عروض محدودة",
      description: "استفد من العروض الحصرية قبل انتهاء الوقت"
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "تنوع المنتجات",
      description: "اختر من بين آلاف المنتجات في مختلف الفئات"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">لماذا تعزيز؟</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            نقدم لك تجربة تسوق فريدة تجمع بين قوة الشراء الجماعي وأفضل الأسعار
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="bg-emerald-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                <div className="text-emerald-600">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;