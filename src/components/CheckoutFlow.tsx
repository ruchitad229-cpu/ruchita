import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  Smartphone, 
  Check, 
  Lock, 
  MapPin, 
  Phone, 
  User, 
  Sparkles,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Clock,
  PackageCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CheckoutStep } from '../types';

export const CheckoutFlow: React.FC = () => {
  const { 
    cart, 
    subtotal, 
    discount, 
    shippingCharge, 
    total, 
    checkoutStep, 
    setCheckoutStep, 
    shippingDetails, 
    setShippingDetails, 
    paymentMethod, 
    setPaymentMethod, 
    completeOrder, 
    lastOrder, 
    setActiveView,
    trackEvent 
  } = useStore();

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [upiIdInput, setUpiIdInput] = useState('user@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8921');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('•••');
  const [showTrackingModal, setShowTrackingModal] = useState(false);

  // Quick Autofill helper for friction-free prototype evaluation
  const handleAutofillDemo = () => {
    setShippingDetails({
      fullName: 'Alex Vance',
      mobile: '9876543210',
      email: 'alex.vance@example.com',
      address: 'Flat 402, Googleplex Horizon Towers, Silicon Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560103'
    });
    setFormErrors({});
  };

  const validateShipping = () => {
    const errs: Record<string, string> = {};
    if (!shippingDetails.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!shippingDetails.mobile.trim() || shippingDetails.mobile.length < 10) errs.mobile = 'Enter valid 10-digit mobile number';
    if (!shippingDetails.address.trim()) errs.address = 'Street address is required';
    if (!shippingDetails.city.trim()) errs.city = 'City is required';
    if (!shippingDetails.state.trim()) errs.state = 'State is required';
    if (!shippingDetails.pinCode.trim() || shippingDetails.pinCode.length < 6) errs.pinCode = 'Enter 6-digit PIN code';

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setCheckoutStep('payment');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      trackEvent('Checkout', 'Delivery Step Completed', {
        city: shippingDetails.city,
        state: shippingDetails.state,
        pinCode: shippingDetails.pinCode
      });
    }
  };

  const handlePlaceOrder = () => {
    trackEvent('Checkout', 'Payment Method Confirmed', {
      method: paymentMethod,
      total
    });
    completeOrder();
  };

  // If on confirmation step
  if (checkoutStep === 'confirmation' && lastOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
        
        {/* Success Card (PRD Section 19) */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              ✓ Order Confirmed!
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Thank you for your purchase. We've sent a confirmation SMS and receipt.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 border border-blue-100 text-blue-800 text-sm font-semibold">
            <span>Order Number:</span>
            <span className="font-mono font-bold tracking-wider">{lastOrder.orderNumber}</span>
          </div>

          {/* Delivery & Address Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-4 border-t border-gray-100 text-xs sm:text-sm">
            <div className="p-4 bg-gray-50 rounded-xl space-y-1">
              <span className="font-semibold text-gray-900 block text-xs uppercase text-gray-500">
                Delivery Address
              </span>
              <p className="font-bold text-gray-800">{lastOrder.shippingDetails.fullName}</p>
              <p className="text-gray-600">{lastOrder.shippingDetails.address}</p>
              <p className="text-gray-600">
                {lastOrder.shippingDetails.city}, {lastOrder.shippingDetails.state} - {lastOrder.shippingDetails.pinCode}
              </p>
              <p className="text-gray-600 pt-1">Phone: +91 {lastOrder.shippingDetails.mobile}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl space-y-2 flex flex-col justify-between">
              <div>
                <span className="font-semibold text-gray-900 block text-xs uppercase text-gray-500">
                  Estimated Delivery Date
                </span>
                <p className="font-bold text-emerald-700 text-base flex items-center gap-1.5 mt-1">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  {lastOrder.estimatedDeliveryDate}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Payment: <strong>{lastOrder.paymentMethod.toUpperCase()}</strong> • Paid
                </p>
              </div>

              <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-gray-900">
                <span>Total Paid:</span>
                <span className="text-blue-600">₹{lastOrder.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Products Purchased List */}
          <div className="text-left pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Items in this shipment ({lastOrder.items.length})
            </h3>
            <div className="divide-y divide-gray-100">
              {lastOrder.items.map((it) => (
                <div key={it.id} className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <img
                      src={it.product.images.front}
                      alt={it.product.name}
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{it.product.name}</p>
                      <p className="text-xs text-gray-500">
                        Size: {it.selectedSize} • Color: {it.selectedColor} • Qty: {it.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="font-bold text-gray-900">
                    ₹{(it.unitPrice * it.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons as per PRD Section 19: TRACK ORDER & CONTINUE SHOPPING */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              id="track-order-button"
              type="button"
              onClick={() => setShowTrackingModal(true)}
              className="flex-1 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold tracking-wide shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <PackageCheck className="w-4 h-4" />
              <span>TRACK ORDER</span>
            </button>

            <button
              id="continue-shopping-button"
              type="button"
              onClick={() => {
                setActiveView('listing');
                setCheckoutStep('delivery');
              }}
              className="flex-1 py-3.5 px-4 rounded-xl bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>CONTINUE SHOPPING</span>
            </button>
          </div>
        </div>

        {/* Live Tracking Timeline Modal */}
        {showTrackingModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900 text-base">Package Tracking</h3>
                </div>
                <button
                  onClick={() => setShowTrackingModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="text-xs text-gray-500">
                Tracking ID: <strong className="text-gray-800 font-mono">GMS-IND-{lastOrder.orderNumber.replace('GMS-', '')}</strong>
              </div>

              {/* Milestones */}
              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200">
                <div className="relative flex items-start gap-3">
                  <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-100 flex items-center justify-center text-white text-[10px]">
                    ✓
                  </span>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Order Placed & Verified</p>
                    <p className="text-[11px] text-gray-500">Google Merchandise Fulfillment Center</p>
                    <span className="text-[10px] text-emerald-600 font-medium">Just now</span>
                  </div>
                </div>

                <div className="relative flex items-start gap-3">
                  <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-100"></span>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Packing & Quality Inspection</p>
                    <p className="text-[11px] text-gray-500">Pre-shipment scanning in progress</p>
                    <span className="text-[10px] text-blue-600 font-medium">Today</span>
                  </div>
                </div>

                <div className="relative flex items-start gap-3 opacity-60">
                  <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-gray-300"></span>
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Handed over to Express Courier</p>
                    <p className="text-[11px] text-gray-500">BlueDart / Delhivery Priority</p>
                    <span className="text-[10px] text-gray-400">Tomorrow, 10:00 AM</span>
                  </div>
                </div>

                <div className="relative flex items-start gap-3 opacity-60">
                  <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-gray-300"></span>
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Out for Delivery</p>
                    <p className="text-[11px] text-gray-500">To: {lastOrder.shippingDetails.city}</p>
                    <span className="text-[10px] text-gray-400">{lastOrder.estimatedDeliveryDate}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowTrackingModal(false)}
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-semibold transition-colors"
              >
                Close Tracking
              </button>
            </div>
          </div>
        )}

      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      
      {/* Checkout Progress Indicator (PRD Section 16: ① Cart → ② Delivery → ③ Payment → ✓ Done) */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs">
        <div className="flex items-center justify-between max-w-xl mx-auto text-xs sm:text-sm font-semibold">
          
          {/* Step 1: Cart */}
          <button 
            onClick={() => setActiveView('listing')}
            className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600"
          >
            <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center text-xs font-bold">
              ①
            </span>
            <span className="hidden sm:inline">Cart</span>
          </button>

          <ChevronRight className="w-4 h-4 text-gray-300" />

          {/* Step 2: Delivery */}
          <div className={`flex items-center gap-1.5 ${
            checkoutStep === 'delivery' ? 'text-blue-600 font-bold' : 'text-gray-700'
          }`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              checkoutStep === 'delivery' 
                ? 'bg-blue-600 text-white' 
                : 'bg-emerald-100 text-emerald-700'
            }`}>
              {checkoutStep === 'payment' ? '✓' : '②'}
            </span>
            <span>Delivery</span>
          </div>

          <ChevronRight className="w-4 h-4 text-gray-300" />

          {/* Step 3: Payment */}
          <div className={`flex items-center gap-1.5 ${
            checkoutStep === 'payment' ? 'text-blue-600 font-bold' : 'text-gray-400'
          }`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              checkoutStep === 'payment' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              ③
            </span>
            <span>Payment</span>
          </div>

          <ChevronRight className="w-4 h-4 text-gray-300" />

          {/* Step 4: Done */}
          <div className="flex items-center gap-1.5 text-gray-400">
            <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-xs font-bold">
              ✓
            </span>
            <span className="hidden sm:inline">Done</span>
          </div>

        </div>

        {/* Guest Checkout Callout (PRD Section 15: No mandatory account creation) */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500 text-center">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span><strong>Fast Guest Checkout:</strong> No account creation required. Pure, frictionless shopping.</span>
        </div>
      </div>

      {/* Main Grid: Form + Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Delivery Form or Payment Form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* STEP 2: DELIVERY (PRD Section 17) */}
          {checkoutStep === 'delivery' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs space-y-5">
              
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                    Shipping & Delivery Details
                  </h2>
                  <p className="text-xs text-gray-500">
                    Enter where we should deliver your official Google merchandise
                  </p>
                </div>

                {/* Autofill button for instant tester evaluation */}
                <button
                  type="button"
                  onClick={handleAutofillDemo}
                  className="px-2.5 py-1 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Autofill Demo</span>
                </button>
              </div>

              {/* Delivery Estimation Banner (PRD Section 17) */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Estimated Delivery: <strong>3–5 business days</strong></span>
                </div>
                <span className="text-emerald-700 font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">
                  {shippingCharge === 0 ? 'FREE' : `₹${shippingCharge}`}
                </span>
              </div>

              {/* The Delivery Form (PRD Section 17) */}
              <form onSubmit={handleContinueToPayment} className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      id="shipping-fullname"
                      type="text"
                      value={shippingDetails.fullName}
                      onChange={(e) => setShippingDetails(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="e.g. Sundar Pichai"
                      className={`w-full text-xs sm:text-sm border rounded-lg pl-9 pr-3 py-2.5 bg-white text-gray-900 focus:outline-none focus:ring-2 ${
                        formErrors.fullName ? 'border-red-500 focus:ring-red-100' : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                      }`}
                    />
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                  {formErrors.fullName && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.fullName}</p>}
                </div>

                {/* Mobile Number & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Mobile Number * (for Delivery SMS)
                    </label>
                    <div className="relative">
                      <input
                        id="shipping-mobile"
                        type="tel"
                        maxLength={10}
                        value={shippingDetails.mobile}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, mobile: e.target.value.replace(/\D/g, '') }))}
                        placeholder="9876543210"
                        className={`w-full text-xs sm:text-sm border rounded-lg pl-9 pr-3 py-2.5 bg-white text-gray-900 focus:outline-none focus:ring-2 ${
                          formErrors.mobile ? 'border-red-500 focus:ring-red-100' : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                        }`}
                      />
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    </div>
                    {formErrors.mobile && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.mobile}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      id="shipping-email"
                      type="email"
                      value={shippingDetails.email}
                      onChange={(e) => setShippingDetails(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="alex.vance@example.com"
                      className="w-full text-xs sm:text-sm border border-gray-300 rounded-lg px-3 py-2.5 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Street Address & House/Flat No. *
                  </label>
                  <div className="relative">
                    <input
                      id="shipping-address"
                      type="text"
                      value={shippingDetails.address}
                      onChange={(e) => setShippingDetails(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Flat, building name, street, landmark"
                      className={`w-full text-xs sm:text-sm border rounded-lg pl-9 pr-3 py-2.5 bg-white text-gray-900 focus:outline-none focus:ring-2 ${
                        formErrors.address ? 'border-red-500 focus:ring-red-100' : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                      }`}
                    />
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                  {formErrors.address && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.address}</p>}
                </div>

                {/* City, State, PIN Code */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      id="shipping-city"
                      type="text"
                      value={shippingDetails.city}
                      onChange={(e) => setShippingDetails(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Bengaluru"
                      className={`w-full text-xs sm:text-sm border rounded-lg px-3 py-2.5 bg-white text-gray-900 focus:outline-none focus:ring-2 ${
                        formErrors.city ? 'border-red-500' : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                      }`}
                    />
                    {formErrors.city && <p className="text-[10px] text-red-600 mt-0.5">{formErrors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      id="shipping-state"
                      type="text"
                      value={shippingDetails.state}
                      onChange={(e) => setShippingDetails(prev => ({ ...prev, state: e.target.value }))}
                      placeholder="Karnataka"
                      className={`w-full text-xs sm:text-sm border rounded-lg px-3 py-2.5 bg-white text-gray-900 focus:outline-none focus:ring-2 ${
                        formErrors.state ? 'border-red-500' : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                      }`}
                    />
                    {formErrors.state && <p className="text-[10px] text-red-600 mt-0.5">{formErrors.state}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      PIN Code *
                    </label>
                    <input
                      id="shipping-pincode"
                      type="text"
                      maxLength={6}
                      value={shippingDetails.pinCode}
                      onChange={(e) => setShippingDetails(prev => ({ ...prev, pinCode: e.target.value.replace(/\D/g, '') }))}
                      placeholder="560103"
                      className={`w-full text-xs sm:text-sm border rounded-lg px-3 py-2.5 bg-white text-gray-900 focus:outline-none focus:ring-2 ${
                        formErrors.pinCode ? 'border-red-500' : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                      }`}
                    />
                    {formErrors.pinCode && <p className="text-[10px] text-red-600 mt-0.5">{formErrors.pinCode}</p>}
                  </div>
                </div>

                {/* Primary CTA (PRD Section 17: CONTINUE TO PAYMENT) */}
                <div className="pt-3">
                  <button
                    id="continue-to-payment-cta"
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold tracking-wide shadow-sm hover:shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>CONTINUE TO PAYMENT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* STEP 3: PAYMENT (PRD Section 18) */}
          {checkoutStep === 'payment' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs space-y-5">
              
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                    Select Payment Method
                  </h2>
                  <p className="text-xs text-gray-500">
                    Instant, safe & encrypted checkout options
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('delivery')}
                  className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Address</span>
                </button>
              </div>

              {/* Trust Badge (PRD Section 18: 🔒 Secure Payment) */}
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between text-xs text-gray-700">
                <div className="flex items-center gap-2 font-medium">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  <span>🔒 Secure Payment • 256-Bit SSL Encryption</span>
                </div>
                <span className="text-[10px] text-gray-400">Google Verified</span>
              </div>

              {/* Payment Methods Options (PRD Section 18) */}
              <div className="space-y-3">
                
                {/* 1. Google Pay Direct */}
                <label className={`block p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'gpay' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'gpay'}
                        onChange={() => setPaymentMethod('gpay')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">Google Pay</span>
                          <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                            Fastest 1-Tap
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">Pay directly with your linked Google account</p>
                      </div>
                    </div>
                    {/* Google G Pay Badge */}
                    <div className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-700">
                      GPay
                    </div>
                  </div>
                </label>

                {/* 2. UPI (PhonePe, Paytm, BHIM) */}
                <label className={`block p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <span className="text-sm font-bold text-gray-900">UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                        <p className="text-xs text-gray-500">Zero transaction fee with instant verification</p>
                      </div>
                    </div>
                    <Smartphone className="w-5 h-5 text-gray-400" />
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="mt-3 pt-3 border-t border-blue-100">
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Enter your UPI ID (e.g. yourname@oksbi)
                      </label>
                      <input
                        type="text"
                        value={upiIdInput}
                        onChange={(e) => setUpiIdInput(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  )}
                </label>

                {/* 3. Credit / Debit Card */}
                <label className={`block p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'card' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <span className="text-sm font-bold text-gray-900">Credit / Debit Card</span>
                        <p className="text-xs text-gray-500">Visa, Mastercard, RuPay & American Express</p>
                      </div>
                    </div>
                    <CreditCard className="w-5 h-5 text-gray-400" />
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="mt-3 pt-3 border-t border-blue-100 space-y-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 bg-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">Expiry</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">CVV</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </label>

                {/* 4. Cash On Delivery */}
                <label className={`block p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <span className="text-sm font-bold text-gray-900">Cash on Delivery</span>
                        <p className="text-xs text-gray-500">Pay cash or UPI upon package arrival</p>
                      </div>
                    </div>
                  </div>
                </label>

              </div>

              {/* Place Order CTA (PRD Section 18: PLACE ORDER) */}
              <div className="pt-2">
                <button
                  id="place-order-cta"
                  type="button"
                  onClick={handlePlaceOrder}
                  className="w-full py-4 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-base font-bold tracking-wide shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>PLACE ORDER • ₹{total.toLocaleString('en-IN')}</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Right Column: Order Review Summary Sticky Box */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Order Summary ({cart.length} items)
            </h3>
            <button
              type="button"
              onClick={() => setActiveView('listing')}
              className="text-xs text-blue-600 hover:underline"
            >
              Edit Cart
            </button>
          </div>

          {/* Mini Items List */}
          <div className="divide-y divide-gray-100 max-h-56 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <img
                    src={item.product.images.front}
                    alt={item.product.name}
                    className="w-10 h-10 rounded-md object-cover border border-gray-200"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 line-clamp-1">{item.product.name}</p>
                    <p className="text-[11px] text-gray-500">
                      {item.selectedSize} • {item.selectedColor} (Qty: {item.quantity})
                    </p>
                  </div>
                </div>
                <span className="font-bold text-gray-900">
                  ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-2 pt-3 border-t border-gray-100 text-xs text-gray-600">
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
              <span>Shipping Fee</span>
              <span>
                {shippingCharge === 0 ? (
                  <span className="text-emerald-600 font-semibold">FREE</span>
                ) : (
                  `₹${shippingCharge}`
                )}
              </span>
            </div>

            <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
              <span>Final Order Amount</span>
              <span className="text-base text-blue-600 font-bold">
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Shipping destination preview */}
          {checkoutStep === 'payment' && (
            <div className="p-3 bg-gray-50 rounded-xl text-xs space-y-1 text-gray-600 border border-gray-100">
              <span className="font-bold text-gray-900 block">Delivering to:</span>
              <p className="text-gray-800">{shippingDetails.fullName} • {shippingDetails.mobile}</p>
              <p className="line-clamp-2 text-gray-600">
                {shippingDetails.address}, {shippingDetails.city}, {shippingDetails.pinCode}
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
