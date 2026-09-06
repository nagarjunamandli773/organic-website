import React, { useState } from 'react';
import { Copy, Check, Percent } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CouponCard = ({ offer }) => {
  const [copied, setCopied] = useState(false);
  const { applyCoupon } = useCart();

  const handleCopy = () => {
    navigator.clipboard.writeText(offer.code);
    applyCoupon(offer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="coupon-card">
      <div className="coupon-icon-box">
        <Percent size={24} />
      </div>
      <div className="coupon-details">
        <h3 className="coupon-title">{offer.title}</h3>
        <p className="coupon-subtitle">{offer.subtitle}</p>
        <div className="coupon-code-row">
          <span className="code-label">Use Code: <strong>{offer.code}</strong></span>
          <button className="copy-code-btn" onClick={handleCopy} title="Copy & Apply Code">
            {copied ? <Check size={14} className="copied-icon" /> : <Copy size={14} />}
            <span>{copied ? 'Applied' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
