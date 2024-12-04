import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Product } from '../../types/product';
import { calculateInventoryStatus } from '../../utils/analytics';

interface InventoryStatusProps {
  products: Product[];
}

const InventoryStatus: React.FC<InventoryStatusProps> = ({ products }) => {
  const inventoryStatus = calculateInventoryStatus(products);
  const lowStockProducts = products.filter(p => p.inventory.available < 10);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-bold mb-6">حالة المخزون</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600 mb-1">
            {inventoryStatus.low}
          </div>
          <div className="text-sm text-gray-500">مخزون منخفض</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600 mb-1">
            {inventoryStatus.medium}
          </div>
          <div className="text-sm text-gray-500">مخزون متوسط</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {inventoryStatus.high}
          </div>
          <div className="text-sm text-gray-500">مخزون مرتفع</div>
        </div>
      </div>

      {lowStockProducts.length > 0 && (
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-red-600 mb-3">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">تنبيه المخزون المنخفض</span>
          </div>
          <ul className="space-y-2">
            {lowStockProducts.map(product => (
              <li key={product.id} className="flex justify-between text-sm">
                <span>{product.name}</span>
                <span className="font-medium">{product.inventory.available} قطعة</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InventoryStatus;