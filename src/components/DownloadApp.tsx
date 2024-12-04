import React from 'react';
import { motion } from 'framer-motion';
import { Apple, Play } from 'lucide-react';

const DownloadApp = () => {
  return (
    <section className="py-20 bg-emerald-600">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">حمل تطبيق تعزيز</h2>
            <p className="text-emerald-50 mb-8 text-lg">
              احصل على تجربة تسوق أفضل مع تطبيق تعزيز. تصفح العروض، انضم للمجموعات، وتابع طلباتك بسهولة.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-black text-white px-8 py-4 rounded-lg inline-flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
                <Apple className="w-6 h-6" />
                <div className="text-right">
                  <div className="text-xs">متوفر على</div>
                  <div className="font-medium">App Store</div>
                </div>
              </button>
              <button className="bg-black text-white px-8 py-4 rounded-lg inline-flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
                <Play className="w-6 h-6" />
                <div className="text-right">
                  <div className="text-xs">متوفر على</div>
                  <div className="font-medium">Google Play</div>
                </div>
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <img
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c"
              alt="تطبيق تعزيز"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;