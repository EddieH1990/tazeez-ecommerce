import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { calculateGrowthRate } from '../../utils/analytics';

interface RevenueChartProps {
  currentRevenue: number;
  previousRevenue: number;
  period: string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({
  currentRevenue,
  previousRevenue,
  period,
}) => {
  const growthRate = calculateGrowthRate(currentRevenue, previousRevenue);
  const isPositive = growthRate >= 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold mb-1">الإيرادات</h3>
          <p className="text-sm text-gray-500">{period}</p>
        </div>
        <div className={`flex items-center gap-1 ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">
            {Math.abs(growthRate).toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="mb-4">
        <span className="text-3xl font-bold">
          {currentRevenue.toLocaleString()} ر.س
        </span>
      </div>

      <div className="h-32 flex items-end gap-2">
        {[...Array(12)].map((_, index) => {
          const height = Math.random() * 100;
          return (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-1 bg-emerald-100 rounded-t-sm"
            />
          );
        })}
      </div>
    </div>
  );
};

export default RevenueChart;