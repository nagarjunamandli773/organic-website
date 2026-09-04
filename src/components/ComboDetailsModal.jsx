import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Star, Plus, Minus, ShoppingBag, Zap, ShieldCheck, Leaf, Heart, PackageCheck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ComboDetailsModal = ({ combo, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  if (!combo) return null;

  const isLiked = isInWishlist ? isInWishlist(combo.id) : false;

  const handleAddToCart = () => {
    addToCart({
      id: combo.id,
      name: combo.name,
      price: combo.price,
      unit: combo.unit || 'Combo Pack',
      image: combo.image,
      includedProducts: combo.includedProducts
    }, quantity);
  };

  const handleBuyNow = () => {
    addToCart({
      id: combo.id,
      name: combo.name,
      price: combo.price,
      unit: combo.unit || 'Combo Pack',
      image: combo.image,
      includedProducts: combo.includedProducts
    }, quantity);
    onClose();
    navigate('/checkout');
  };

  const savings = (combo.originalPrice - combo.price) * quantity;

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal-card combo-details-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose} aria-label="Close details">
          <X size={20} />
        </button>

        <div className="modal-grid">
          {/* Left Side Visual */}
          <div className="modal-img-col">
            <div className="modal-img-container">
              <img src={combo.image} alt={combo.name} className="modal-product-img" />
              <span className="modal-badge-tag">{combo.discountPercent}% OFF</span>
              {combo.badge && (
                <span className="modal-secondary-badge">{combo.badge}</span>
              )}
            </div>
            
            <div className="combo-modal-guarantee">
              <ShieldCheck size={18} className="guarantee-icon" />
              <div>
                <strong>100% Organic Guaranteed</strong>
                <p>Directly sourced from certified organic farms</p>
              </div>
            </div>
          </div>

          {/* Right Side Details */}
          <div className="modal-details-col">
            <div className="modal-cat-tag">
              <PackageCheck size={14} style={{ display: 'inline', marginRight: '4px' }} />
              {combo.category} Combo Offer
            </div>

            <h2 className="modal-title">{combo.name}</h2>

            {/* Rating */}
            {combo.rating && (
              <div className="modal-rating-row">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(combo.rating) ? '#f59e0b' : '#e2e8f0'}
                      stroke="none"
                    />
                  ))}
                </div>
                <span className="rating-score">{combo.rating}</span>
                <span className="reviews-text">({combo.reviewsCount} customer reviews)</span>
              </div>
            )}

            {/* Price Box */}
            <div className="combo-modal-price-box">
              <div className="price-primary">
                <span className="modal-price">₹{combo.price.toFixed(2)}</span>
                <span className="modal-orig-price">₹{combo.originalPrice.toFixed(2)}</span>
                <span className="modal-discount-pill">{combo.discountPercent}% OFF</span>
              </div>
              <div className="savings-highlight">
                🎉 You save <strong>₹{savings.toFixed(2)}</strong> with this combo pack!
              </div>
            </div>

            {/* Included Items Section */}
            <div className="combo-modal-included-section">
              <h4 className="included-title">What's Inside This Combo Pack:</h4>
              <div className="included-grid">
                {combo.includedProducts?.map((item, idx) => (
                  <div key={idx} className="included-grid-item">
                    <CheckCircle2 size={16} className="item-check-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="modal-desc">{combo.description || combo.shortDesc}</p>

            {/* Features Row */}
            <div className="modal-attributes-row">
              <span className="attr-tag"><Leaf size={14} /> {combo.certification || '100% Organic'}</span>
              <span className="attr-tag"><ShieldCheck size={14} /> Chemical Free</span>
              <span className="attr-tag"><Zap size={14} /> Maximum Savings</span>
            </div>

            {/* Quantity Picker & Wishlist */}
            <div className="modal-qty-wishlist-row">
              <div className="qty-picker">
                <button
                  type="button"
                  className="qty-step-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="qty-val">{quantity}</span>
                <button
                  type="button"
                  className="qty-step-btn"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                type="button"
                className={`modal-wishlist-btn ${isLiked ? 'liked' : ''}`}
                onClick={() => toggleWishlist && toggleWishlist(combo.id)}
                title="Wishlist"
              >
                <Heart size={18} fill={isLiked ? '#e53e3e' : 'none'} stroke={isLiked ? '#e53e3e' : '#4a5568'} />
                <span>{isLiked ? 'Saved' : 'Save to Wishlist'}</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="modal-actions-row">
              <button
                type="button"
                className="btn-solid-green modal-action-btn"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />
                <span>Add to Cart (₹{(combo.price * quantity).toFixed(2)})</span>
              </button>

              <button
                type="button"
                className="btn-solid-brown modal-action-btn"
                onClick={handleBuyNow}
              >
                <Zap size={18} />
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
