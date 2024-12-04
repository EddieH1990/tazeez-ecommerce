import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Users, Tag } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-l from-emerald-600 to-emerald-700 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-emerald-700/90" />
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      <div className="relative container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight"
          >
            تعزيز، أول منصة للشراء بالمجموعة، عززلي واعززلك وخلنا نأخذ منتجنا بسعر الجملة
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8 text-emerald-50"
          >
            معاً نقدر نحصل على أفضل الأسعار! انضم لمجموعات الشراء واستمتع بأسعار الجملة مع مجتمع من المشترين
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <StatsCard icon={<ShoppingBag />} text="أكثر من ١٠٠٠ منتج" />
            <StatsCard icon={<Users />} text="٥٠٠٠+ مستخدم نشط" />
            <StatsCard icon={<Tag />} text="توفير يصل إلى ٤٠٪" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-white text-emerald-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-emerald-50 transition-colors inline-flex items-center justify-center gap-2">
              تصفح العروض الحصرية
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white/10 transition-colors">
              كيف يعمل تعزيز؟
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full">
    <span className="text-emerald-300">{icon}</span>
    <span className="text-white font-medium">{text}</span>
  </div>
);

export default Hero;