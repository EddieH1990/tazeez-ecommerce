import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import { useGroupBuy } from '../../hooks/useGroupBuy';
import GroupBuyCard from '../../components/groups/GroupBuyCard';
import GroupBuyForm from '../../components/groups/GroupBuyForm';
import LoadingSpinner from '../../components/LoadingSpinner';

const Groups = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { groups, isLoading } = useGroupBuy();

  const filteredGroups = groups.filter(group =>
    group.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">مجموعات الشراء</h1>
            <p className="text-gray-600">إدارة مجموعات الشراء الخاصة بك</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>إنشاء مجموعة</span>
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="البحث في المجموعات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <GroupBuyCard
              key={group.id}
              group={group}
              showManageButton
              onManage={() => {
                // Handle group management
              }}
            />
          ))}
        </div>

        {showForm && (
          <GroupBuyForm onClose={() => setShowForm(false)} />
        )}

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              لا توجد مجموعات
            </h3>
            <p className="text-gray-500">
              قم بإنشاء مجموعة شراء جديدة للبدء
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;