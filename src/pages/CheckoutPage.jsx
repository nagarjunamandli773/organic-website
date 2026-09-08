import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, CreditCard, Smartphone, Landmark, Banknote, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { handleBackNavigation } from '../utils/navigation';
import { CouponSection } from '../components/CouponSection';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, subtotal, discount, deliveryFee, total, clearCart, appliedCoupon, markCouponAsUsed } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    address: 'Flat 402, Green Acres Apartment, HSR Layout',
    landmark: 'Near Organic Park',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560102'
  });

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
    if (!formData.address.trim()) newErrors.address = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const orderId = 'KLN' + Math.floor(100000 + Math.random() * 900000);
      const newOrder = {
        orderId,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: cartItems,
        subtotal,
        discount,
        deliveryFee,
        total,
        appliedCoupon: appliedCoupon ? {
          code: appliedCoupon.code,
          title: appliedCoupon.title,
          discountAmount: discount
        } : null,
        paymentMethod: paymentMethod === 'upi' ? 'UPI / Wallet' : paymentMethod === 'card' ? 'Credit / Debit Card' : paymentMethod === 'netbanking' ? 'Net Banking' : 'Cash on Delivery',
        shippingAddress: formData
      };
      localStorage.setItem('last_order', JSON.stringify(newOrder));

      // Mark order placed & coupon as used
      if (user && user.email) {
        const userEmailKey = user.email.toLowerCase().trim();
        localStorage.setItem(`klan_has_completed_order_${userEmailKey}`, 'true');
      }

      if (appliedCoupon) {
        markCouponAsUsed(appliedCoupon.code);
      }

      clearCart();
      navigate('/order-success');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page empty-checkout">
        <div className="empty-cart-card">
          <h2>No items to checkout</h2>
          <p>Please add products to your cart before proceeding to checkout.</p>
          <button className="btn-solid-green" onClick={() => navigate('/products')}>
            View Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <button 
          type="button"
          onClick={(e) => handleBackNavigation(navigate, e)} 
          className="back-arrow-btn"
          title="Go back to previous page"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </div>
      <h1 className="checkout-title">Secure Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="checkout-grid">
        {/* Left Column: Form & Payment matching Panel 8 */}
        <div className="checkout-left-col">
          {/* Step 1: Delivery Address */}
          <div className="checkout-card">
            <div className="card-header-flex">
              <span className="step-num">1</span>
              <h2>Delivery Address</h2>
            </div>

            <div className="form-grid">
              <div className="form-group full-width">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={errors.fullName ? 'error-input' : ''}
                />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  className={errors.mobileNumber ? 'error-input' : ''}
                />
                {errors.mobileNumber && <span className="error-text">{errors.mobileNumber}</span>}
              </div>

              <div className="form-group">
                <label>Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="6-digit pincode"
                  className={errors.pincode ? 'error-input' : ''}
                />
                {errors.pincode && <span className="error-text">{errors.pincode}</span>}
              </div>

              <div className="form-group full-width">
                <label>Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House No., Building Name, Street"
                  className={errors.address ? 'error-input' : ''}
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>

              <div className="form-group">
                <label>Landmark (Optional)</label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleInputChange}
                  placeholder="Nearby landmark"
                />
              </div>

              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className={errors.city ? 'error-input' : ''}
                />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>
            </div>
          </div>

          {/* Step 2: Payment Method matching Panel 8 */}
          <div className="checkout-card">
            <div className="card-header-flex">
              <span className="step-num">2</span>
              <h2>Payment Method</h2>
            </div>

            <div className="payment-options-list">
              <label className={`payment-option-card ${paymentMethod === 'upi' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                />
                <Smartphone size={20} className="payment-icon" />
                <div className="payment-info">
                  <strong>UPI (Google Pay, PhonePe, Paytm)</strong>
                  <p>Instant zero-fee payment via any UPI app</p>
                </div>
              </label>

              <label className={`payment-option-card ${paymentMethod === 'card' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <CreditCard size={20} className="payment-icon" />
                <div className="payment-info">
                  <strong>Credit / Debit Card</strong>
                  <p>Visa, MasterCard, RuPay & Maestro cards accepted</p>
                </div>
              </label>

              <label className={`payment-option-card ${paymentMethod === 'netbanking' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="netbanking"
                  checked={paymentMethod === 'netbanking'}
                  onChange={() => setPaymentMethod('netbanking')}
                />
                <Landmark size={20} className="payment-icon" />
                <div className="payment-info">
                  <strong>Net Banking</strong>
                  <p>All major Indian banks supported</p>
                </div>
              </label>

              <label className={`payment-option-card ${paymentMethod === 'cod' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                <Banknote size={20} className="payment-icon" />
                <div className="payment-info">
                  <strong>Cash on Delivery (COD)</strong>
                  <p>Pay cash when your fresh organic order arrives</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary matching Panel 8 */}
        <div className="checkout-right-col">
          <div className="order-summary-card">
            <h2 className="summary-title">Order Summary</h2>

            <div className="checkout-items-preview">
              {cartItems.map(item => (
                <div key={item.id} className="preview-item-row">
                  <img src={item.image} alt={item.name} className="preview-img" />
                  <div className="preview-info">
                    <span className="preview-name">{item.name}</span>
                    <span className="preview-qty">{item.unit ? `${item.unit} • ` : ''}Qty: {item.quantity}</span>
                  </div>
                  <span className="preview-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="checkout-coupon-wrapper" style={{ marginTop: '16px', marginBottom: '16px' }}>
              <CouponSection />
            </div>

            <div className="summary-divider"></div>

            <div className="summary-line">
              <span>Subtotal</span>
              <span className="line-price">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Delivery Charges</span>
              <span className="line-price highlight-free">
                {deliveryFee === 0 ? '₹0.00' : `₹${deliveryFee.toFixed(2)}`}
              </span>
            </div>
            {discount > 0 && (
              <div className="summary-line discount-line">
                <span>Discount</span>
                <span className="line-price discount-price">-₹{discount.toFixed(2)}</span>
              </div>
            )}

            <div className="summary-total-row">
              <span className="total-title">Total</span>
              <span className="total-amount">₹{total.toFixed(2)}</span>
            </div>

            <button type="submit" className="btn-solid-green place-order-btn">
              <span>Place Order</span>
              <ArrowRight size={18} />
            </button>

            <div className="checkout-security-note">
              <ShieldCheck size={16} />
              <span>100% Secure Payment Guarantee. Your data is protected.</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
