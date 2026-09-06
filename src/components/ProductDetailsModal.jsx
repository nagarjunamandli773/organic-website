import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Star, Plus, Minus, ShoppingBag, Zap, ShieldCheck, Leaf, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductDetailsModal = ({ product, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-grid">
          {/* Left Column: Image */}
          <div className="modal-img-col">
            <div className="modal-img-container">
              <img src={product.image} alt={product.name} className="modal-product-img" />
              {product.badge && (
                <span className="modal-badge-tag">{product.badge}</span>
              )}
            </div>
          </div>

          {/* Right Column: Details matching Panel 6 in reference */}
          <div className="modal-details-col">
            <div className="modal-cat-tag">{product.category}</div>
            <h2 className="modal-title">{product.name}</h2>

            {/* Rating */}
            {product.rating && (
              <div className="modal-rating-row">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(product.rating) ? '#f59e0b' : '#e2e8f0'}
                      stroke="none"
                    />
                  ))}
                </div>
                <span className="rating-score">{product.rating}</span>
                <span className="reviews-text">({product.reviewsCount} reviews)</span>
              </div>
            )}

            {/* Price */}
            <div className="modal-price-row">
              <span className="modal-price">₹{product.price.toFixed(2)}</span>
              {product.unit && <span className="modal-unit"> / {product.unit}</span>}
              {product.originalPrice && (
                <span className="modal-orig-price">₹{product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Description */}
            <p className="modal-desc">{product.description || product.shortDesc}</p>

            {/* Organic Attributes checklist matching reference */}
            <div className="modal-attributes-row">
              <span className="attr-tag"><Leaf size={14} /> 100% Organic</span>
              <span className="attr-tag"><ShieldCheck size={14} /> Pesticide Free</span>
              <span className="attr-tag"><Zap size={14} /> Fresh & Healthy</span>
            </div>

            {/* Quantity Selector & Wishlist */}
            <div className="modal-qty-wishlist-row">
              <div className="qty-picker">
                <button
                  className="qty-step-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={14} />
                </button>
                <span className="qty-val">{quantity}</span>
                <button
                  className="qty-step-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                className={`modal-wishlist-btn ${isLiked ? 'liked' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                title="Wishlist"
              >
                <Heart size={18} fill={isLiked ? '#e53e3e' : 'none'} stroke={isLiked ? '#e53e3e' : '#4a5568'} />
                <span>{isLiked ? 'In Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="modal-actions-row">
              <button className="btn-solid-green modal-action-btn" onClick={handleAddToCart}>
                <ShoppingBag size={18} />
                <span>Add to Cart</span>
              </button>

              <button className="btn-solid-brown modal-action-btn" onClick={handleBuyNow}>
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
