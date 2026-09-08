import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Copy, Check, ShoppingBag, Sparkles, Gift, Tag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const WelcomeCouponModal = () => {
  const navigate = useNavigate();
  const { isWelcomeModalOpen, closeWelcomeModal, user } = useAuth();
  const { showToast, applyCoupon } = useCart();
  const [copied, setCopied] = useState(false);

  if (!isWelcomeModalOpen) return null;

  const couponCode = 'WELCOME10';

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(couponCode).then(() => {
      setCopied(true);
      showToast(`Coupon code ${couponCode} copied to clipboard!`);
      applyCoupon(couponCode);
      setTimeout(() => setCopied(false), 3000);
    }).catch(() => {
      setCopied(true);
      applyCoupon(couponCode);
      showToast(`Coupon WELCOME10 ready!`);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleStartShopping = () => {
    closeWelcomeModal();
    navigate('/products');
  };

  const formatName = (nameStr) => {
    if (!nameStr) return 'Customer';
    const raw = nameStr.split('@')[0].split(' ')[0];
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  };

  const userName = formatName(user?.name || user?.email);

  return (
    <div className="product-modal-overlay welcome-modal-overlay" onClick={closeWelcomeModal} style={{ zIndex: 2300 }}>
      <div 
        className="welcome-coupon-modal-card" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={closeWelcomeModal}
          className="welcome-close-btn"
          aria-label="Close welcome offer modal"
        >
          <X size={18} color="#ffffff" />
        </button>

        {/* Decorative Top Banner */}
        <div className="welcome-card-header">
          <div className="welcome-gift-badge">
            <Gift size={24} color="#ffffff" />
          </div>
          <div className="welcome-pill-tag">
            <Sparkles size={13} color="#fef08a" />
            <span>EXCLUSIVE FIRST-TIME OFFER</span>
          </div>
          <h2 className="welcome-title">Welcome to Klan Organics, {userName}!</h2>
          <p className="welcome-subtitle">
            We are thrilled to have you join our organic family! Here is a special welcome gift for your first order.
          </p>
        </div>

        {/* Main Body with Coupon Code */}
        <div className="welcome-card-body">
          <div className="welcome-coupon-box">
            <div className="coupon-box-top">
              <span className="coupon-discount-text">10% OFF</span>
              <span className="coupon-condition-text">ON YOUR FIRST ORDER</span>
            </div>

            <div className="coupon-code-row">
              <div className="coupon-code-display">
                <Tag size={16} className="coupon-tag-icon" />
                <span className="coupon-code-val">{couponCode}</span>
              </div>

              <button 
                type="button" 
                onClick={handleCopyCoupon}
                className={`welcome-copy-btn ${copied ? 'copied' : ''}`}
                title="Copy coupon code"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <p className="coupon-validity-note">
              Valid on all 100% certified organic groceries, produce & natural cosmetics. No minimum spend required.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="welcome-modal-actions">
            <button 
              type="button" 
              onClick={handleStartShopping} 
              className="btn-solid-green welcome-shop-btn"
            >
              <ShoppingBag size={18} />
              <span>Shop Now / Start Shopping</span>
              <ArrowRight size={18} />
            </button>

            <button 
              type="button"
              onClick={closeWelcomeModal}
              className="welcome-dismiss-link"
            >
              Continue Browsing Website
            </button>
          </div>

          {/* Footer Security Badge */}
          <div className="welcome-footer-guarantee">
            <ShieldCheck size={14} color="#166534" />
            <span>Farm-Fresh • 100% Certified Organic • Fast Doorstep Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
};
