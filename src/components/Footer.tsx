import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">تعزيز</h3>
            <p className="mb-4">
              منصة الشراء الجماعي الأولى في المملكة العربية السعودية
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={<Facebook className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Twitter className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Instagram className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Youtube className="w-5 h-5" />} />
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <FooterLink href="#" text="عن تعزيز" />
              <FooterLink href="#" text="كيف يعمل" />
              <FooterLink href="#" text="الأسئلة الشائعة" />
              <FooterLink href="#" text="اتصل بنا" />
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">الفئات</h3>
            <ul className="space-y-2">
              <FooterLink href="#" text="إلكترونيات" />
              <FooterLink href="#" text="أزياء" />
              <FooterLink href="#" text="منزل" />
              <FooterLink href="#" text="هدايا" />
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">تواصل معنا</h3>
            <ul className="space-y-2">
              <li>support@tazeez.com</li>
              <li>+966 12 345 6789</li>
              <li>الرياض، المملكة العربية السعودية</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>© {new Date().getFullYear()} تعزيز. جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a
    href={href}
    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, text }: { href: string; text: string }) => (
  <li>
    <a href={href} className="hover:text-emerald-500 transition-colors">
      {text}
    </a>
  </li>
);

export default Footer;