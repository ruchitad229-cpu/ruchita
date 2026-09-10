import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  ShieldCheck, 
  Truck,
  Sparkles 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    shippingCharge, 
    discount, 
    total, 
    appliedPromo, 
    applyPromo, 
    removePromo, 
    setActiveView, 
    setCheckoutStep,
    trackEvent 
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setActiveView('checkout');
    setCheckoutStep('delivery');
    trackEvent('Checkout', 'Proceed To Checkout Clicked', {
      itemCount: cart.length,
      total
    });
  };

  const freeShippingThreshold = 999;
  const neededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gray-800" />
            <h2 className="text-base font-bold text-gray-900">Your Cart</h2>
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-semibold">
              {cart.reduce((a, b) => a + b.quantity, 0)} items
            </span>
          </div>
          <button
            id="close-cart-button"
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-3 bg-blue-50/60 border-b border-blue-100 text-xs">
          {neededForFreeShipping > 0 ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-blue-900 font-medium">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  Add ₹{neededForFreeShipping.toLocaleString('en-IN')} more for <strong>FREE Delivery</strong>
                </span>
                <span className="font-bold">{freeShippingPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-blue-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${freeShippingPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Congratulations! You qualify for FREE Delivery</span>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-gray-800">Your cart is empty</p>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Explore Google merchandise and find hoodies, bags, and accessories to gear up!
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveView('listing');
                }}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-3.5 flex gap-3">
                {/* Product Thumbnail */}
                <div className="w-18 h-18 rounded-lg bg-gray-50 border border-gray-200 overflow-hidden shrink-0">
                  <img
                    src={item.product.images.front}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-1">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 p-1 -mr-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-gray-500 mt-0.5 space-x-2">
                      <span>Size: <strong>{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span>Color: <strong>{item.selectedColor}</strong></span>
                    </div>
                  </div>

                  {/* Quantity & Unit Price */}
                  <div className="flex items-center justify-between pt-2">
                    {/* - 1 + Controls as per PRD Section 14 */}
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 text-gray-600 hover:bg-gray-100 rounded-l-md transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 text-gray-600 hover:bg-gray-100 rounded-r-md transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-xs sm:text-sm font-bold text-gray-900">
                      ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Promo Code Input */}
        {cart.length > 0 && (
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            {appliedPromo ? (
              <div className="flex items-center justify-between text-xs bg-emerald-50 border border-emerald-200 text-emerald-800 p-2 rounded-lg">
                <div className="flex items-center gap-1.5 font-medium">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Promo <strong>{appliedPromo}</strong> applied (-10%)</span>
                </div>
                <button
                  onClick={removePromo}
                  className="text-xs text-red-600 font-semibold hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter promo code (try GOOGLE10)"
                    className="flex-1 text-xs border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-xs font-semibold transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-red-600">{promoError}</p>
                )}
              </form>
            )}
          </div>
        )}

        {/* Cart Calculations & Checkout CTA (PRD Section 14) */}
        {cart.length > 0 && (
          <div className="p-4 bg-white border-t border-gray-200 space-y-3">
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Fan Discount (GOOGLE10)</span>
                  <span>- ₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span>
                  {shippingCharge === 0 ? (
                    <span className="text-emerald-600 font-semibold">FREE</span>
                  ) : (
                    `₹${shippingCharge}`
                  )}
                </span>
              </div>

              {discount > 0 && (
                <div className="pt-1">
                  <span className="inline-block bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded">
                    You save ₹{discount.toLocaleString('en-IN')} on this order!
                  </span>
                </div>
              )}

              <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total Amount</span>
                <span className="text-base font-bold text-blue-600">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Primary CTA (PRD Section 14: PROCEED TO CHECKOUT) */}
            <button
              id="proceed-to-checkout-cta"
              type="button"
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold tracking-wide shadow-sm hover:shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Guest checkout ready • No registration required</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
