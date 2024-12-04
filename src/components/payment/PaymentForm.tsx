import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreditCard, Building2, X } from 'lucide-react';
import { usePayment } from '../../hooks/usePayment';
import { PaymentMethod } from '../../types/payment';
import LoadingSpinner from '../LoadingSpinner';

const cardSchema = z.object({
  name: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
  number: z.string().regex(/^\d{16}$/, 'رقم البطاقة غير صالح'),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'تاريخ الانتهاء غير صالح'),
  cvc: z.string().regex(/^\d{3,4}$/, 'رمز الأمان غير صالح'),
});

const bankTransferSchema = z.object({
  bankName: z.string().min(2, 'اسم البنك مطلوب'),
  accountNumber: z.string().min(10, 'رقم الحساب غير صالح'),
  accountName: z.string().min(3, 'اسم صاحب الحساب مطلوب'),
  transferDate: z.string().min(1, 'تاريخ التحويل مطلوب'),
  referenceNumber: z.string().min(6, 'رقم المرجع غير صالح'),
});

interface PaymentFormProps {
  orderId: string;
  amount: number;
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  orderId,
  amount,
  onClose,
  onSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const { processPayment, isProcessing } = usePayment();

  const {
    register: registerCard,
    handleSubmit: handleCardSubmit,
    formState: { errors: cardErrors },
  } = useForm({
    resolver: zodResolver(cardSchema),
  });

  const {
    register: registerBank,
    handleSubmit: handleBankSubmit,
    formState: { errors: bankErrors },
  } = useForm({
    resolver: zodResolver(bankTransferSchema),
  });

  const handlePayment = async (data: any) => {
    try {
      await processPayment({
        amount,
        method: paymentMethod,
        orderId,
        details: data,
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg w-full max-w-xl m-4"
      >
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold">الدفع</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="text-lg font-bold mb-2">المبلغ المطلوب</div>
            <div className="text-2xl text-emerald-600">{amount} ر.س</div>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                paymentMethod === 'card'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-600'
                  : 'border-gray-200 hover:border-emerald-200'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span>بطاقة ائتمان</span>
            </button>
            <button
              onClick={() => setPaymentMethod('bank_transfer')}
              className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                paymentMethod === 'bank_transfer'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-600'
                  : 'border-gray-200 hover:border-emerald-200'
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span>تحويل بنكي</span>
            </button>
          </div>

          {paymentMethod === 'card' ? (
            <form onSubmit={handleCardSubmit(handlePayment)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم على البطاقة
                </label>
                <input
                  {...registerCard('name')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
                {cardErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{cardErrors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم البطاقة
                </label>
                <input
                  {...registerCard('number')}
                  placeholder="0000 0000 0000 0000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
                {cardErrors.number && (
                  <p className="text-red-500 text-sm mt-1">{cardErrors.number.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    تاريخ الانتهاء
                  </label>
                  <input
                    {...registerCard('expiry')}
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                  {cardErrors.expiry && (
                    <p className="text-red-500 text-sm mt-1">{cardErrors.expiry.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    رمز الأمان
                  </label>
                  <input
                    {...registerCard('cvc')}
                    type="password"
                    placeholder="CVC"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                  {cardErrors.cvc && (
                    <p className="text-red-500 text-sm mt-1">{cardErrors.cvc.message}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {isProcessing ? <LoadingSpinner size="sm" /> : 'إتمام الدفع'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleBankSubmit(handlePayment)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  اسم البنك
                </label>
                <input
                  {...registerBank('bankName')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
                {bankErrors.bankName && (
                  <p className="text-red-500 text-sm mt-1">{bankErrors.bankName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم الحساب
                </label>
                <input
                  {...registerBank('accountNumber')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
                {bankErrors.accountNumber && (
                  <p className="text-red-500 text-sm mt-1">{bankErrors.accountNumber.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  اسم صاحب الحساب
                </label>
                <input
                  {...registerBank('accountName')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
                {bankErrors.accountName && (
                  <p className="text-red-500 text-sm mt-1">{bankErrors.accountName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تاريخ التحويل
                </label>
                <input
                  {...registerBank('transferDate')}
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
                {bankErrors.transferDate && (
                  <p className="text-red-500 text-sm mt-1">{bankErrors.transferDate.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم المرجع
                </label>
                <input
                  {...registerBank('referenceNumber')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
                {bankErrors.referenceNumber && (
                  <p className="text-red-500 text-sm mt-1">{bankErrors.referenceNumber.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {isProcessing ? <LoadingSpinner size="sm" /> : 'تأكيد التحويل'}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentForm;