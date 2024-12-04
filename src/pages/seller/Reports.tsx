import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { useOrders } from '../../hooks/useOrders';
import { useProducts } from '../../hooks/useProducts';
import { ReportFilter } from '../../types/report';
import { generateReport } from '../../utils/reports';
import ReportFilters from '../../components/reports/ReportFilters';
import LoadingSpinner from '../../components/LoadingSpinner';

const Reports = () => {
  const { orders, isLoading: isLoadingOrders } = useOrders();
  const { products, isLoading: isLoadingProducts } = useProducts();
  const [reportData, setReportData] = useState<any>(null);

  const handleGenerateReport = (filters: ReportFilter) => {
    const data = generateReport(filters.type, orders, products, filters);
    setReportData(data);
  };

  const handleDownloadReport = () => {
    if (!reportData) return;

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json',
    });
    
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (isLoadingOrders || isLoadingProducts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">التقارير</h1>
          <p className="text-gray-600">إنشاء وتحليل تقارير الأداء</p>
        </div>

        <ReportFilters onSubmit={handleGenerateReport} />

        {reportData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">نتائج التقرير</h2>
              <button
                onClick={handleDownloadReport}
                className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
              >
                <Download className="w-5 h-5" />
                <span>تحميل التقرير</span>
              </button>
            </div>

            <div className="space-y-6">
              {Object.entries(reportData).map(([key, value]) => (
                <div key={key} className="border-b pb-4">
                  <h3 className="font-medium mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    {JSON.stringify(value, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {!reportData && (
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              لم يتم إنشاء أي تقرير
            </h3>
            <p className="text-gray-500">
              قم باختيار نوع التقرير والفترة الزمنية لإنشاء تقرير جديد
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;