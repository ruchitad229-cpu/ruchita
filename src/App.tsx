import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategorySection } from './components/CategorySection';
import { SearchBar } from './components/SearchBar';
import { ProductListing } from './components/ProductListing';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CheckoutFlow } from './components/CheckoutFlow';
import { CartDrawer } from './components/CartDrawer';
import { AnalyticsDrawer } from './components/AnalyticsDrawer';
import { Footer } from './components/Footer';
import { ProductCard } from './components/ProductCard';
import { 
  ArrowRight, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CheckCircle2,
  Tag
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    products, 
    setSelectedCategory,
    notification,
    trackEvent
  } = useStore();

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  const bestSellerProducts = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivalProducts = products.filter(p => p.isNewArrival).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 selection:bg-blue-100 selection:text-blue-800">
      
      {/* Global Notification Toast */}
      {notification && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 bg-gray-900/95 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 border border-gray-700 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Sticky Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'home' && (
          <div className="space-y-6 sm:space-y-10">
            {/* 1. Hero Section (PRD Section 7) */}
            <HeroSection />

            {/* 2. Horizontally Scrollable Category Cards (PRD Section 8) */}
            <CategorySection />

            {/* Quick Search on Homepage (PRD Section 9) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-2">
              <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-2xs">
                <div className="text-center mb-3">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900">
                    Looking for a specific Google item?
                  </h3>
                  <p className="text-xs text-gray-500">
                    Search official hoodies, tech backpacks, insulated drinkware & caps
                  </p>
                </div>
                <SearchBar />
              </div>
            </div>

            {/* 3. Best Sellers Section (PRD Section 10: 2-Column Mobile Grid) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                    <Flame className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                      Best Sellers
                    </h2>
                    <p className="text-xs text-gray-500">
                      Most loved gear by Googlers and tech enthusiasts
                    </p>
                  </div>
                </div>

                <button
                  id="home-view-all-bestsellers"
                  onClick={() => {
                    setSelectedCategory('Best Sellers');
                    setActiveView('listing');
                    trackEvent('Discovery', 'View All Best Sellers Clicked');
                  }}
                  className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 2-column mobile grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {bestSellerProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* 4. Promotional Banner (PRD Section 14: You save ₹XXX with GOOGLE10) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white p-6 sm:p-8 shadow-sm">
                <div className="max-w-xl space-y-2 relative z-10">
                  <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    <Tag className="w-3 h-3 text-amber-300" />
                    Special Promotion
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                    Get 10% Off Your Entire Order
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100">
                    Use coupon code <strong className="text-white underline font-mono">GOOGLE10</strong> at checkout. Applies instantly across all categories with free delivery above ₹999.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setActiveView('listing');
                      }}
                      className="px-5 py-2.5 rounded-lg bg-white text-blue-900 font-bold text-xs hover:bg-blue-50 transition-colors shadow-xs"
                    >
                      Shop With Discount
                    </button>
                  </div>
                </div>

                {/* Background decorative styling */}
                <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden sm:flex items-center justify-center">
                  <svg className="w-64 h-64 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                  </svg>
                </div>
              </div>
            </section>

            {/* 5. New Arrivals Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                      New Arrivals
                    </h2>
                    <p className="text-xs text-gray-500">
                      Fresh drop featuring Chrome 404 Dino & organic essentials
                    </p>
                  </div>
                </div>

                <button
                  id="home-view-all-new"
                  onClick={() => {
                    setSelectedCategory('New Arrivals');
                    setActiveView('listing');
                    trackEvent('Discovery', 'View All New Arrivals Clicked');
                  }}
                  className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 2-column mobile grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {newArrivalProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Product Listing Page */}
        {activeView === 'listing' && <ProductListing />}

        {/* Product Detail Page */}
        {activeView === 'detail' && <ProductDetailPage />}

        {/* Checkout Flow / Order Confirmation */}
        {(activeView === 'checkout' || activeView === 'order-confirmation') && (
          <CheckoutFlow />
        )}
      </main>

      {/* Slide-over Cart Drawer (accessible from any page) */}
      <CartDrawer />

      {/* Stakeholder / Testing Analytics KPI Inspector Drawer */}
      <AnalyticsDrawer />

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
