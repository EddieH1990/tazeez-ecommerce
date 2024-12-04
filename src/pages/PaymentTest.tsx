import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PaymentForm from '../components/payment/PaymentForm';
import { toast } from 'react-hot-toast';

const PaymentTest = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(99);

  const testAmounts = [
    { amount: 99, label: 'اختبار صغير' },
    { amount: 499, label: 'اختبار متوسط' },
    { amount: 999, label: 'اختبار كبير' }
  ];

  const handlePaymentSuccess = () => {
    toast.success('تم الدفع بنجاح!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-8"
          >
            <h1 className="text-2xl font-bold mb-6">اختبار نظام الدفع</h1>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-4">اختر مبلغ الاختبار:</h2>
                <div className="grid grid-cols-3 gap-4">
                  {testAmounts.map(({ amount, label }) => (
                    <button
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        selectedAmount === amount
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-600'
                          : 'border-gray-200 hover:border-emerald-200'
                      }`}
                    >
                      <div className="font-bold mb-1">{amount} ر.س</div>
                      <div className="text-sm text-gray-600">{label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">بيانات الاختبار:</h3>
                <div className="space-y-2 text-sm">
                  <p>• بطاقة اختبار: 4242 4242 4242 4242</p>
                  <p>• تاريخ: أي تاريخ مستقبلي</p>
                  <p>• CVC: أي 3 أرقام</p>
                </div>
              </div>

              <button
                onClick={() => setShowPaymentForm(true)}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                بدء اختبار الدفع
              </button>
            </div>
          </motion.div>

          {showPaymentForm && (
            <PaymentForm
              orderId="test-123"
              amount={selectedAmount}
              onClose={() => setShowPaymentForm(false)}
              onSuccess={handlePaymentSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentTest;