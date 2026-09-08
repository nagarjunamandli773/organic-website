import React, { useState } from 'react';
import { Tag, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Clock, Gift, Percent, Sparkles, Truck, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OFFERS } from '../data/offers';

export const CouponSection = () => {
  const {
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponError,
    couponSuccess,
    subtotal,
    isCouponUsedByUser
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [showAvailable, setShowAvailable] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (applyCoupon(inputCode)) {
      setInputCode('');
    }
  };

  const handleApplyQuick = (code) => {
    setInputCode(code);
    applyCoupon(code);
  };

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Gift': return <Gift size={15} className="offer-icon" />;
      case 'Sparkles': return <Sparkles size={15} className="offer-icon" />;
      case 'Truck': return <Truck size={15} className="offer-icon" />;
      case 'Tag': return <Tag size={15} className="offer-icon" />;
      default: return <Percent size={15} className="offer-icon" />;
    }
  };

  return (
    <div className="coupon-section-box">
      {/* Section Header */}
      <div className="coupon-section-header">
        <label className="coupon-label">
          <Tag size={15} className="coupon-header-tag-icon" />
          <span>Apply Coupon</span>
        </label>
        <button
          type="button"
          className="toggle-available-btn"
          onClick={() => setShowAvailable(prev => !prev)}
        >
          <span>{showAvailable ? 'Hide Offers' : `Available Coupons (${OFFERS.length})`}</span>
          {showAvailable ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Active Applied Coupon Card OR Code Entry Form */}
      {appliedCoupon ? (
        <div className="applied-coupon-card">
          <div className="applied-card-header">
            <div className="applied-code-group">
              <CheckCircle2 size={18} className="check-icon" />
              <strong className="applied-code-badge">{appliedCoupon.code}</strong>
              <span className="applied-valid-tag">Applied</span>
            </div>
            <button
              type="button"
              className="remove-coupon-text-btn"
              onClick={removeCoupon}
              title="Remove applied coupon"
            >
              Remove
            </button>
          </div>
          <p className="applied-desc">
            {appliedCoupon.title} - {appliedCoupon.subtitle}
          </p>
        </div>
      ) : (
        <div className="coupon-input-wrapper">
          <form onSubmit={handleSubmit} className="coupon-form-grid">
            <input
              type="text"
              placeholder="Enter promo code (e.g. KLAN200)"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="coupon-text-input"
            />
            <button type="submit" className="coupon-submit-btn">
              Apply
            </button>
          </form>

          {couponSuccess && (
            <div className="coupon-success-alert">
              <CheckCircle2 size={15} />
              <span>{couponSuccess}</span>
            </div>
          )}

          {couponError && (
            <div className="coupon-error-alert">
              <AlertCircle size={15} />
              <span>{couponError}</span>
            </div>
          )}
        </div>
      )}

      {/* Available Coupons List */}
      {showAvailable && (
        <div className="available-coupons-container">
          <span className="available-coupons-title">Available Offers & Coupons:</span>
          <div className="available-coupons-list">
            {OFFERS.map((offer) => {
              const isApplied = appliedCoupon && appliedCoupon.code === offer.code;
              const isUsed = isCouponUsedByUser(offer.code, offer);
              const isMinMet = subtotal >= offer.minOrder;

              return (
                <div
                  key={offer.id}
                  className={`available-coupon-card ${isApplied ? 'active-coupon' : ''} ${!isMinMet ? 'disabled-coupon' : ''}`}
                >
                  {/* Top Row: Icon, Code, Discount Badge & Action Button */}
                  <div className="avail-card-header">
                    <div className="avail-code-group">
                      <div className="avail-icon-circle">
                        {getIconComponent(offer.icon)}
                      </div>
                      <strong className="avail-code">{offer.code}</strong>
                      <span className="avail-discount-badge">{offer.title}</span>
                    </div>

                    <div className="avail-action-box">
                      {isApplied ? (
                        <span className="applied-pill-badge">
                          <Check size={12} /> Applied
                        </span>
                      ) : isUsed ? (
                        <span className="used-pill-badge">Used</span>
                      ) : (
                        <button
                          type="button"
                          className="apply-chip-btn"
                          onClick={() => handleApplyQuick(offer.code)}
                          title={`Apply ${offer.code}`}
                        >
                          Apply
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Subtitle */}
                  <p className="avail-subtitle">{offer.subtitle}</p>

                  {/* Meta Footer Row: Min Order & Expiration */}
                  <div className="avail-meta-row">
                    <span>Min Order: <strong>₹{offer.minOrder}</strong></span>
                    {offer.expiryDateFormatted && (
                      <>
                        <span className="meta-dot">•</span>
                        <span className="meta-expiry-item">
                          <Clock size={11} /> Expires: <strong>{offer.expiryDateFormatted}</strong>
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
