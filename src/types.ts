export interface Product {
  id: string;
  name: string;
  category: 'Apparel' | 'T-Shirts' | 'Hoodies' | 'Accessories' | 'Drinkware' | 'Office' | 'Bags';
  subCategory?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: {
    front: string;
    back: string;
    detail: string;
    lifestyle: string;
  };
  colors: {
    name: string;
    hex: string;
  }[];
  sizes: string[];
  inStock: boolean;
  stockCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  badge?: string;
  material: string;
  dimensions: string;
  description: string;
  features: string[];
}

export interface CartItem {
  id: string; // composite: productId-size-color
  productId: string;
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  unitPrice: number;
}

export type CheckoutStep = 'cart' | 'delivery' | 'payment' | 'confirmation';

export interface ShippingDetails {
  fullName: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface OrderConfirmationData {
  orderNumber: string;
  orderDate: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingCharge: number;
  total: number;
  shippingDetails: ShippingDetails;
  paymentMethod: string;
  estimatedDeliveryDate: string;
}

export interface FilterOptions {
  category: string;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  selectedSizes: string[];
  selectedColors: string[];
  minRating: number;
  onlyInStock: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
}

export interface AnalyticsEvent {
  id: string;
  timestamp: string;
  category: 'Discovery' | 'Engagement' | 'Checkout' | 'Conversion';
  name: string;
  details?: Record<string, string | number | boolean>;
}
