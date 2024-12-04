import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Order } from '../../types/order';
import { Product } from '../../types/product';
import { getTopSellingProducts } from '../../utils/analytics';

interface TopProductsProps {
  orders: Order[];
  products: Product[];
}

const TopProducts: React.FC<TopProductsProps> = ({ orders, products }) => {
  const productSales = getTopSellingProducts(orders);
  
  const topProducts = Object.entries(productSales)
    .map(([productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return {
        id: productId,
        name: product?.name || 'منتج غير معروف',
        quantity,
        revenue: quantity * (product?.price || 0),
      };
    })
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-bold mb-6">أفضل المنتجات مبيعاً</h3>
      
      <div className="space-y-4">
        {topProducts.map((product, index) => (
          <div key={product.id} className="flex items-center gap-4">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-bold">
              {index + 1}
            </div>
            <div className="flex-1">
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-gray-500">
                {product.quantity} وحدة مباعة
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold">{product.revenue} ر.س</div>
              <div className="flex items-center gap-1 text-sm">
                {Math.random() > 0.5 ? (
                  <div className="text-green-600 flex items-center">
                    <ArrowUp className="w-4 h-4" />
                    <span>12%</span>
                  </div>
                ) : (
                  <div className="text-red-600 flex items-center">
                    <ArrowDown className="w-4 h-4" />
                    <span>8%</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;