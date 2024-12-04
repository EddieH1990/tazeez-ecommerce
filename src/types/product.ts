export interface Product {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  price: number;
  groupPrice: number;
  requiredParticipants: number;
  currentParticipants: number;
  category: string;
  images: string[];
  inventory: {
    total: number;
    available: number;
    reserved: number;
  };
  status: 'active' | 'draft' | 'inactive';
  features: string[];
  specifications: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  groupPrice: number;
  requiredParticipants: number;
  category: string;
  images: string[];
  inventory: number;
  features: string[];
  specifications: Record<string, string>;
  status: 'active' | 'draft' | 'inactive';
}