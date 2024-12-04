import React from 'react';
import { useForm } from 'react-hook-form';
import { ReportFilter, ReportType, ReportPeriod } from '../../types/report';

interface ReportFiltersProps {
  onSubmit: (filters: ReportFilter) => void;
  defaultValues?: Partial<ReportFilter>;
}

const ReportFilters: React.FC<ReportFiltersProps> = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit } = useForm<ReportFilter>({
    defaultValues: {
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      type: 'sales',
      period: 'daily',
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            نوع التقرير
          </label>
          <select
            {...register('type')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option value="sales">المبيعات</option>
            <option value="inventory">المخزون</option>
            <option value="customers">العملاء</option>
            <option value="groups">المجموعات</option>
            <option value="financial">المالي</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الفترة
          </label>
          <select
            {...register('period')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option value="daily">يومي</option>
            <option value="weekly">أسبوعي</option>
            <option value="monthly">شهري</option>
            <option value="yearly">سنوي</option>
            <option value="custom">مخصص</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            من تاريخ
          </label>
          <input
            type="date"
            {...register('startDate')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            إلى تاريخ
          </label>
          <input
            type="date"
            {...register('endDate')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          إنشاء التقرير
        </button>
      </div>
    </form>
  );
};

export default ReportFilters;