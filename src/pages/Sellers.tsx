import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Users, TrendingUp, Clock, Building2, Rocket } from 'lucide-react';

const Sellers = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-l from-emerald-600 to-emerald-700 py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-emerald-700/90" />
          <img
            src="https://images.unsplash.com/photo-1556740758-90de374c12ad"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              نمِّ تجارتك مع تعزيز
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-emerald-50 mb-8"
            >
              انضم لأكبر منصة للشراء الجماعي في المملكة وابدأ في بيع منتجاتك لآلاف العملاء
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/signup?type=seller"
                className="bg-white text-emerald-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-emerald-50 transition-colors inline-flex items-center gap-2"
              >
                ابدأ الآن مجاناً
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">لماذا تختار تعزيز؟</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              نوفر لك كل ما تحتاجه لتنمية تجارتك وزيادة مبيعاتك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-emerald-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-emerald-600 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center text-white"
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-emerald-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">ابدأ في بيع منتجاتك اليوم</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            انضم لآلاف التجار الناجحين على منصة تعزيز وابدأ في الوصول إلى عملاء جدد
          </p>
          <Link
            to="/signup?type=seller"
            className="bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
          >
            سجل كتاجر الآن
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
};

const benefits = [
  {
    icon: <Users className="w-8 h-8 text-emerald-600" />,
    title: "وصول لعملاء أكثر",
    description: "اعرض منتجاتك لآلاف العملاء المهتمين بالشراء الجماعي"
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-emerald-600" />,
    title: "زيادة المبيعات",
    description: "استفد من قوة الشراء الجماعي لزيادة حجم مبيعاتك"
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
    title: "حماية كاملة",
    description: "نظام دفع آمن وضمان حقوقك كتاجر"
  },
  {
    icon: <Clock className="w-8 h-8 text-emerald-600" />,
    title: "إدارة سهلة",
    description: "لوحة تحكم متكاملة لإدارة منتجاتك وطلباتك"
  },
  {
    icon: <Building2 className="w-8 h-8 text-emerald-600" />,
    title: "دعم للشركات",
    description: "خدمات خاصة للشركات والمؤسسات التجارية"
  },
  {
    icon: <Rocket className="w-8 h-8 text-emerald-600" />,
    title: "نمو مستمر",
    description: "فرص نمو لا محدودة مع توسع قاعدة المستخدمين"
  }
];

const stats = [
  {
    value: "+5000",
    label: "تاجر نشط"
  },
  {
    value: "+50000",
    label: "عميل"
  },
  {
    value: "+100000",
    label: "طلب شهرياً"
  },
  {
    value: "40%",
    label: "متوسط زيادة المبيعات"
  }
];

export default Sellers;