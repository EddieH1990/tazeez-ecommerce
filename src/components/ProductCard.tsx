import React from 'react';
import { Users, Clock } from 'lucide-react';

interface ProductCardProps {
  product: {
    name: string;
    category: string;
    image: string;
    price: number;
    groupPrice: number;
    requiredParticipants: number;
    currentParticipants: number;
    timeLeft: string;
    description: string;
  };
  onJoinGroup: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onJoinGroup }) => {
  const progress = (product.currentParticipants / product.requiredParticipants) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-3 right-3 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
          {product.category}
        </span>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>

        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <div className="text-sm text-gray-500">السعر الأصلي</div>
            <div className="text-lg text-gray-400 line-through">{product.price} ر.س</div>
          </div>
          
          <div className="flex justify-between items-baseline">
            <div className="text-sm text-emerald-600">سعر المجموعة</div>
            <div className="text-2xl font-bold text-emerald-600">{product.groupPrice} ر.س</div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{product.currentParticipants}/{product.requiredParticipants} مشارك</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>متبقي {product.timeLeft}</span>
              </div>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="bg-emerald-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <button
            onClick={onJoinGroup}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            انضم للمجموعة
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;