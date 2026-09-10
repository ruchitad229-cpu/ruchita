import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CheckoutStep, ShippingDetails, OrderConfirmationData, AnalyticsEvent } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';

interface StoreContextType {
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeView: 'home' | 'listing' | 'detail' | 'cart' | 'checkout' | 'order-confirmation';
  setActiveView: (view: 'home' | 'listing' | 'detail' | 'cart' | 'checkout' | 'order-confirmation') => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size?: string, color?: string, qty?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Calculations
  cartCount: number;
  subtotal: number;
  shippingCharge: number;
  discount: number;
  total: number;
  appliedPromo: string | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  
  // Checkout
  checkoutStep: CheckoutStep;
  setCheckoutStep: (step: CheckoutStep) => void;
  shippingDetails: ShippingDetails;
  setShippingDetails: React.Dispatch<React.SetStateAction<ShippingDetails>>;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  lastOrder: OrderConfirmationData | null;
  completeOrder: () => void;
  startBuyNow: (product: Product, size?: string, color?: string) => void;
  
  // Mobile Nav & UI State
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isAnalyticsOpen: boolean;
  setIsAnalyticsOpen: (open: boolean) => void;
  notification: string | null;
  showNotification: (msg: string) => void;
  
  // Analytics
  analyticsEvents: AnalyticsEvent[];
  trackEvent: (category: AnalyticsEvent['category'], name: string, details?: Record<string, any>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const DEFAULT_SHIPPING: ShippingDetails = {
  fullName: 'Alex Vance',
  mobile: '9876543210',
  email: 'alex.vance@example.com',
  address: 'Flat 402, Googleplex Horizon Towers, Silicon Road',
  city: 'Bengaluru',
  state: 'Karnataka',
  pinCode: '560103'
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(SAMPLE_PRODUCTS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeView, setActiveView] = useState<'home' | 'listing' | 'detail' | 'cart' | 'checkout' | 'order-confirmation'>('home');
  
  // Cart state initialized with 1 item so users can immediately test checkout friction reduction!
  const [cart, setCart] = useState<CartItem[]>(() => {
    const defaultProd = SAMPLE_PRODUCTS[0]; // Google Logo Hoodie
    return [
      {
        id: `${defaultProd.id}-L-Charcoal Black`,
        productId: defaultProd.id,
        product: defaultProd,
        selectedSize: 'L',
        selectedColor: 'Charcoal Black',
        quantity: 1,
        unitPrice: defaultProd.price
      }
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(['google-thermal-water-bottle']);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Promo code
  const [appliedPromo, setAppliedPromo] = useState<string | null>('GOOGLE10');
  
  // Checkout flow state
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('delivery');
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>(DEFAULT_SHIPPING);
  const [paymentMethod, setPaymentMethod] = useState<string>('gpay');
  const [lastOrder, setLastOrder] = useState<OrderConfirmationData | null>(null);

  // Analytics
  const [analyticsEvents, setAnalyticsEvents] = useState<AnalyticsEvent[]>([
    {
      id: 'init-1',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      category: 'Discovery',
      name: 'Homepage Viewed',
      details: { device: 'Mobile Touch Screen', platform: 'Web' }
    }
  ]);

  const trackEvent = (category: AnalyticsEvent['category'], name: string, details?: Record<string, any>) => {
    const newEvt: AnalyticsEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      category,
      name,
      details
    };
    setAnalyticsEvents(prev => [newEvt, ...prev].slice(0, 50));
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(prev => (prev === msg ? null : prev));
    }, 3000);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const shippingCharge = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const discount = appliedPromo === 'GOOGLE10' ? Math.round(subtotal * 0.1) : 0;
  const total = Math.max(0, subtotal - discount + shippingCharge);

  const addToCart = (product: Product, size?: string, color?: string, qty = 1) => {
    const chosenSize = size || product.sizes[0] || 'Standard';
    const chosenColor = color || product.colors[0]?.name || 'Default';
    const cartItemId = `${product.id}-${chosenSize}-${chosenColor}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          quantity: qty,
          unitPrice: product.price
        }
      ];
    });

    trackEvent('Engagement', 'Add to Cart Clicked', {
      product: product.name,
      size: chosenSize,
      color: chosenColor,
      price: product.price,
      quantity: qty
    });

    showNotification(`Added ${product.name} (${chosenSize}) to cart`);
    setIsCartOpen(true);
  };

  const startBuyNow = (product: Product, size?: string, color?: string) => {
    addToCart(product, size, color, 1);
    setIsCartOpen(false);
    setActiveView('checkout');
    setCheckoutStep('delivery');
    trackEvent('Checkout', 'Buy Now Direct Clicked', { product: product.name });
  };

  const removeFromCart = (cartItemId: string) => {
    const removedItem = cart.find(i => i.id === cartItemId);
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    if (removedItem) {
      trackEvent('Checkout', 'Item Removed from Cart', { product: removedItem.product.name });
      showNotification(`Removed ${removedItem.product.name} from cart`);
    }
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    const isWishlisted = wishlist.includes(productId);
    if (isWishlisted) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showNotification('Removed from saved wishlist');
    } else {
      setWishlist(prev => [...prev, productId]);
      showNotification('Saved to your wishlist');
      trackEvent('Engagement', 'Wishlist Added', { productId });
    }
  };

  const applyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'GOOGLE10' || clean === 'GMS10') {
      setAppliedPromo(clean);
      showNotification('Coupon GOOGLE10 applied! You save 10%');
      trackEvent('Checkout', 'Promo Code Applied', { code: clean });
      return { success: true, message: '10% Google Store fan discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try GOOGLE10' };
  };

  const removePromo = () => {
    setAppliedPromo(null);
    showNotification('Promo code removed');
  };

  const completeOrder = () => {
    const orderNum = `GMS-${Math.floor(100000 + Math.random() * 900000)}`;
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 4);
    const dateFormatted = estDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const newOrder: OrderConfirmationData = {
      orderNumber: orderNum,
      orderDate: new Date().toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      items: [...cart],
      subtotal,
      discount,
      shippingCharge,
      total,
      shippingDetails,
      paymentMethod,
      estimatedDeliveryDate: `${dateFormatted} (3–5 business days)`
    };

    setLastOrder(newOrder);
    trackEvent('Conversion', 'Order Placed (Purchase Complete)', {
      orderNumber: orderNum,
      total,
      itemCount: cart.length,
      paymentMethod
    });

    clearCart();
    setCheckoutStep('confirmation');
    setActiveView('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Track initial category navigation
  useEffect(() => {
    if (selectedCategory !== 'all') {
      trackEvent('Discovery', 'Category Selected', { category: selectedCategory });
    }
  }, [selectedCategory]);

  return (
    <StoreContext.Provider
      value={{
        products,
        selectedProduct,
        setSelectedProduct,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        activeView,
        setActiveView,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        subtotal,
        shippingCharge,
        discount,
        total,
        appliedPromo,
        applyPromo,
        removePromo,
        wishlist,
        toggleWishlist,
        checkoutStep,
        setCheckoutStep,
        shippingDetails,
        setShippingDetails,
        paymentMethod,
        setPaymentMethod,
        lastOrder,
        completeOrder,
        startBuyNow,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isAnalyticsOpen,
        setIsAnalyticsOpen,
        notification,
        showNotification,
        analyticsEvents,
        trackEvent
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
