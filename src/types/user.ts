export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  phone: string;
  avatar?: string;
  userType: 'customer' | 'seller';
  address?: {
    street: string;
    city: string;
    postalCode: string;
  };
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
    language: 'ar' | 'en';
  };
  createdAt: string;
}

export interface ProfileFormData {
  name: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  notifications: boolean;
  newsletter: boolean;
  language: 'ar' | 'en';
}