import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      question: "كيف يعمل نظام الشراء الجماعي؟",
      answer: "يتيح نظام الشراء الجماعي للمستخدمين الانضمام إلى مجموعات شراء للحصول على أسعار مخفضة. عندما يكتمل العدد المطلوب من المشترين، يتم تفعيل السعر المخفض للجميع."
    },
    {
      question: "كم المدة المتوقعة للتوصيل؟",
      answer: "يتم التوصيل خلال ٣-٥ أيام عمل من تاريخ اكتمال المجموعة وتأكيد الطلب."
    },
    {
      question: "هل المنتجات مضمونة؟",
      answer: "نعم، جميع المنتجات مضمونة ١٠٠٪ وتأتي مع ضمان استرجاع لمدة ١٤ يوماً."
    },
    {
      question: "كيف يمكنني الانضمام كتاجر؟",
      answer: "يمكنك التسجيل كتاجر من خلال زيارة صفحة 'انضم كتاجر' وتعبئة النموذج المطلوب."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">الأسئلة الشائعة</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            إجابات على الأسئلة الأكثر شيوعاً
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 bg-white rounded-lg text-right"
              >
                <span className="font-bold">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-6 bg-white border-t border-gray-100">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;