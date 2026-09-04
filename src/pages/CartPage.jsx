import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  ShieldCheck,
  RotateCcw,
  Truck,
  Tag,
  Sparkles,
  CheckCircle2,
  ShoppingBasket
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    cartCount,
    subtotal,
    discount,
    deliveryFee,
    total,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    couponError,
    clearCart,
    addToCart
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState('');

  // Curate 5 recommended products that are not currently in the cart
  const cartItemIds = new Set(cartItems.map(item => item.id));
  const recommendedProducts = PRODUCTS.filter(p => !cartItemIds.has(p.id)).slice(0, 5);

  const handleApplyCouponSubmit = (e) => {
    e.preventDefault();
    if (applyCoupon(couponCodeInput)) {
      setCouponCodeInput('');
    }
  };

  const handleQuickCoupon = (code) => {
    setCouponCodeInput(code);
    applyCoupon(code);
  };

  // Free shipping calculation threshold (₹499)
  const freeShippingThreshold = 499;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (cartItems.length === 0) {
    return (
      <div className="cart-page-wrapper">
        <div className="cart-container empty-cart-container">
          <div className="empty-cart-card">
            <div className="empty-cart-icon-wrapper">
              <ShoppingBasket size={56} className="empty-cart-svg" />
            </div>
            <h2>Your Cart is Currently Empty</h2>
            <p>Looks like you haven't added any organic items to your cart yet. Discover our fresh farm produce, pure oils, and natural cosmetics!</p>
            <div className="empty-cart-actions">
              <Link to="/products" className="btn-solid-green">
                <span>Start Shopping Now</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/category/hair-oils" className="btn-outline-green">
                <span>Explore Hair Oils</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      <div className="cart-container">
        {/* Breadcrumb Header */}
        <div className="cart-breadcrumbs" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <button 
            onClick={() => navigate(-1)} 
            className="back-arrow-btn"
            title="Go back to previous page"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link to="/">Home</Link>
            <ChevronRight size={14} className="crumb-icon" />
            <span className="current-crumb">Shopping Cart</span>
          </div>
        </div>

        {/* Page Title & Controls */}
        <div className="cart-header-row">
          <div className="cart-header-title">
            <h1>Shopping Cart</h1>
            <span className="cart-count-badge">{cartCount} {cartCount === 1 ? 'Item' : 'Items'}</span>
          </div>
          <button
            className="clear-cart-text-btn"
            onClick={clearCart}
            title="Remove all items"
          >
            <Trash2 size={15} />
            <span>Clear Cart</span>
          </button>
        </div>

        {/* Free Shipping Progress Banner */}
        <div className="shipping-progress-banner">
          <div className="shipping-progress-info">
            <Truck size={18} className="shipping-truck-icon" />
            {subtotal >= freeShippingThreshold ? (
              <span>🎉 Congratulations! You have unlocked <strong>FREE Shipping</strong>!</span>
            ) : (
              <span>
                Add <strong>₹{amountNeededForFreeShipping.toFixed(2)}</strong> more of organic products for <strong>FREE Delivery</strong>!
              </span>
            )}
          </div>
          <div className="shipping-progress-bar-track">
            <div
              className="shipping-progress-bar-fill"
              style={{ width: `${freeShippingPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Cart Main Content Grid */}
        <div className="cart-page-grid">
          {/* Left Side: Items Table */}
          <div className="cart-left-section">
            <div className="cart-table-card">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th className="col-product">Product Details</th>
                    <th className="col-price">Price</th>
                    <th className="col-quantity">Quantity</th>
                    <th className="col-subtotal">Subtotal</th>
                    <th className="col-remove"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="cart-item-row">
                      <td className="col-product">
                        <div className="cart-product-cell">
                          <img src={item.image} alt={item.name} className="cart-product-img" />
                          <div className="cart-product-info">
                            <h3 className="cart-product-title">{item.name}</h3>
                            <span className="cart-product-unit">{item.unit || 'Standard'}</span>
                            <span className="cart-product-badge">100% Organic</span>
                          </div>
                        </div>
                      </td>
                      <td className="col-price">
                        <span className="price-num">₹{item.price.toFixed(2)}</span>
                      </td>
                      <td className="col-quantity">
                        <div className="cart-qty-stepper">
                          <button
                            className="qty-stepper-btn"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                            title="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="qty-stepper-val">{item.quantity}</span>
                          <button
                            className="qty-stepper-btn"
                            onClick={() => updateQuantity(item.id, 1)}
                            title="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="col-subtotal">
                        <span className="subtotal-num">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </td>
                      <td className="col-remove">
                        <button
                          className="cart-remove-icon-btn"
                          onClick={() => removeFromCart(item.id)}
                          title="Remove item from cart"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="cart-table-footer">
                <button 
                  type="button" 
                  onClick={() => navigate(-1)} 
                  className="btn-outline-green continue-shopping-btn"
                  style={{ cursor: 'pointer' }}
                >
                  <ArrowLeft size={16} />
                  <span>Continue Shopping</span>
                </button>
                <div className="cart-summary-mini-note">
                  Prices inclusive of all applicable taxes
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Order Summary Card */}
          <div className="cart-right-section">
            <div className="order-summary-card">
              <h2 className="summary-card-heading">
                <ShoppingBag size={20} className="heading-icon" />
                <span>Order Summary</span>
              </h2>

              <div className="summary-rows-group">
                <div className="summary-row">
                  <span className="row-label">Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                  <span className="row-val">₹{subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="summary-row discount-row">
                    <span className="row-label">
                      <Tag size={14} className="tag-icon" />
                      <span>Coupon Discount</span>
                    </span>
                    <span className="row-val discount-val">-₹{discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="summary-row">
                  <span className="row-label">Estimated Delivery</span>
                  <span className={`row-val ${deliveryFee === 0 ? 'free-delivery-badge' : ''}`}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
              </div>

              {/* Coupon Box */}
              <div className="coupon-section-box">
                <label className="coupon-label">Apply Promo Code</label>
                {appliedCoupon ? (
                  <div className="applied-coupon-card">
                    <div className="applied-coupon-details">
                      <CheckCircle2 size={16} className="check-icon" />
                      <div>
                        <strong>{appliedCoupon.code}</strong>
                        <p>Discount applied to your cart</p>
                      </div>
                    </div>
                    <button className="remove-coupon-text-btn" onClick={removeCoupon}>
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <form onSubmit={handleApplyCouponSubmit} className="coupon-form-grid">
                      <input
                        type="text"
                        placeholder="Enter code (e.g. KLAN200)"
                        value={couponCodeInput}
                        onChange={(e) => setCouponCodeInput(e.target.value)}
                        className="coupon-text-input"
                      />
                      <button type="submit" className="coupon-submit-btn">
                        Apply
                      </button>
                    </form>
                    {couponError && <div className="coupon-error-alert">{couponError}</div>}
                    <div className="quick-coupons-row">
                      <span className="quick-label">Try:</span>
                      <button type="button" className="quick-coupon-chip" onClick={() => handleQuickCoupon('KLAN200')}>
                        KLAN200
                      </button>
                      <button type="button" className="quick-coupon-chip" onClick={() => handleQuickCoupon('FREESHIP')}>
                        FREESHIP
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Total Calculation */}
              <div className="summary-total-box">
                <div className="total-label-col">
                  <span className="total-title">Total Amount</span>
                  <span className="taxes-note">Inclusive of GST & all taxes</span>
                </div>
                <div className="total-price-col">
                  <span className="total-price-num">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                className="btn-solid-green checkout-proceed-btn"
                onClick={() => navigate('/checkout')}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>

              {/* Trust Badges inside Summary */}
              <div className="summary-trust-grid">
                <div className="trust-grid-item">
                  <ShieldCheck size={18} className="trust-svg" />
                  <div className="trust-text">
                    <strong>100% Secure Checkout</strong>
                    <p>Encrypted payment gateway</p>
                  </div>
                </div>
                <div className="trust-grid-item">
                  <RotateCcw size={18} className="trust-svg" />
                  <div className="trust-text">
                    <strong>Easy 30-Day Returns</strong>
                    <p>Hassle-free return policy</p>
                  </div>
                </div>
                <div className="trust-grid-item">
                  <Truck size={18} className="trust-svg" />
                  <div className="trust-text">
                    <strong>Fast Express Delivery</strong>
                    <p>Direct from organic farms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products Carousel / Grid */}
        {recommendedProducts.length > 0 && (
          <section className="cart-recommended-section">
            <div className="recommended-section-header">
              <div>
                <h2>Frequently Bought Together</h2>
                <p>Complete your organic lifestyle with these popular customer favorites</p>
              </div>
              <Sparkles size={22} className="sparkles-icon" />
            </div>

            <div className="recommended-products-grid">
              {recommendedProducts.map(product => (
                <div key={product.id} className="rec-product-card">
                  <img src={product.image} alt={product.name} className="rec-product-img" />
                  <div className="rec-product-body">
                    <span className="rec-category-tag">{product.category}</span>
                    <h4 className="rec-product-title">{product.name}</h4>
                    <div className="rec-price-row">
                      <span className="rec-price">₹{product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="rec-old-price">₹{product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <button
                      className="rec-add-btn"
                      onClick={() => addToCart(product, 1)}
                    >
                      <Plus size={14} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
