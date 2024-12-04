import React, { useState } from 'react';
import { ShoppingBag, User, Search, Menu, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import AuthModal from './auth/AuthModal';

const Navbar = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold text-emerald-600">تعزيز</Link>
            
            <div className="hidden md:flex items-center gap-6">
              <NavLink href="/categories">التصنيفات</NavLink>
              <NavLink href="/offers">العروض</NavLink>
              <NavLink href="/how-it-works">كيف يعمل</NavLink>
              <Link to="/sellers" className="text-emerald-600 hover:text-emerald-700 font-medium">للتجار</Link>
              <Link to="/payment-test" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium">
                <CreditCard className="w-4 h-4" />
                <span>اختبار الدفع</span>
              </Link>
            </div>
          </div>

          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن المنتجات..."
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full">
              <ShoppingBag className="h-6 w-6 text-gray-600" />
            </Link>
            
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
                className="px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                تسجيل الدخول
              </button>
              <Link
                to="/signup"
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                إنشاء حساب
              </Link>
            </div>

            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className={clsx(
      "text-gray-600 hover:text-emerald-600 font-medium",
      "transition-colors duration-200"
    )}
  >
    {children}
  </a>
);

export default Navbar;