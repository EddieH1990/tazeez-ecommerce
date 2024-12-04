import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ProductCard from './ProductCard';

const PopularDeals = () => {
  const deals = [
    {
      name: "سماعات آبل اللاسلكية",
      category: "إلكترونيات",
      image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434",
      price: 999,
      groupPrice: 799,
      requiredParticipants: 10,
      currentParticipants: 6,
      timeLeft: "٢٣ ساعة",
      description: "سماعات آبل اللاسلكية الأصلية مع علبة الشحن"
    },
    {
      name: "ساعة سامسونج الذكية",
      category: "إلكترونيات",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
      price: 1299,
      groupPrice: 999,
      requiredParticipants: 15,
      currentParticipants: 8,
      timeLeft: "٣ أيام",
      description: "ساعة سامسونج جالاكسي ووتش ٦"
    },
    {
      name: "حقيبة ظهر للسفر",
      category: "أزياء",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
      price: 399,
      groupPrice: 299,
      requiredParticipants: 20,
      currentParticipants: 12,
      timeLeft: "يومان",
      description: "حقيبة ظهر مقاومة للماء مع شاحن USB"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">أفضل العروض</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            اكتشف أحدث العروض الحصرية وانضم للمجموعات النشطة
          </p>
        </div>

        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {deals.map((deal, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard
                  product={deal}
                  onJoinGroup={() => console.log('Joining group for:', deal.name)}
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PopularDeals;