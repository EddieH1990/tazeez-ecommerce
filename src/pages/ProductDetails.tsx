import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Clock, Share2, ChevronRight, ChevronLeft } from 'lucide-react';
import GroupBuyModal from '../components/GroupBuyModal';

const ProductDetails = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Mock product data - in a real app, fetch this based on the ID
  const product = {
    name: "سماعات آبل اللاسلكية",
    category: "إلكترونيات",
    images: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
      "https://images.unsplash.com/photo-1505236273555-17add39f39ce"
    ],
    price: 999,
    groupPrice: 799,
    requiredParticipants: 10,
    currentParticipants: 6,
    timeLeft: "٢٣ ساعة",
    description: "سماعات آبل اللاسلكية الأصلية مع علبة الشحن. تتميز بجودة صوت استثنائية وبطارية تدوم طويلاً.",
    features: [
      "جودة صوت فائقة",
      "عمر بطارية يصل إلى ٢٤ ساعة",
      "مقاومة للماء والعرق",
      "تقنية إلغاء الضوضاء",
    ]
  };

  const progress = (product.currentParticipants / product.requiredParticipants) * 100;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="w-full rounded-lg shadow-lg"
              />
              <button
                onClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentImage((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <div className="flex gap-4 mt-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden ${
                    currentImage === index ? 'ring-2 ring-emerald-500' : ''
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full inline-block mb-6">
              {product.category}
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="space-y-6 mb-8">
              <div className="flex justify-between items-baseline">
                <div className="text-sm text-gray-500">السعر الأصلي</div>
                <div className="text-xl text-gray-400 line-through">{product.price} ر.س</div>
              </div>
              
              <div className="flex justify-between items-baseline">
                <div className="text-sm text-emerald-600">سعر المجموعة</div>
                <div className="text-3xl font-bold text-emerald-600">{product.groupPrice} ر.س</div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{product.currentParticipants}/{product.requiredParticipants} مشارك</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>متبقي {product.timeLeft}</span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div 
                  className="bg-emerald-600 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-emerald-600 text-white py-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium mb-4"
              >
                انضم للمجموعة
              </button>

              <button className="w-full border border-gray-300 py-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                <span>شارك مع الأصدقاء</span>
              </button>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">المميزات</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {showModal && (
        <GroupBuyModal
          product={product}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ProductDetails;