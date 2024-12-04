import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "أحمد محمد",
      role: "مشتري",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      content: "وفرت أكثر من ٣٠٪ على مشترياتي من خلال الشراء الجماعي. تجربة رائعة!",
      rating: 5
    },
    {
      name: "سارة عبدالله",
      role: "مشترية",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      content: "منصة سهلة الاستخدام وتوفر الكثير من العروض المميزة. أنصح بها بشدة.",
      rating: 5
    },
    {
      name: "محمد خالد",
      role: "تاجر",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      content: "ساعدتني المنصة في الوصول لعملاء جدد وزيادة المبيعات بشكل ملحوظ.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">ماذا يقول عملاؤنا</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            آراء حقيقية من مستخدمي تعزيز
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-emerald-500 text-emerald-500" />
                ))}
              </div>
              <p className="text-gray-600">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;