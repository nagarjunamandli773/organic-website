import React from 'react';
import { ShoppingBag, Eye, Tag, Check, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ComboCard = ({ combo, onViewDetails }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isLiked = isInWishlist ? isInWishlist(combo.id) : false;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      id: combo.id,
      name: combo.name,
      price: combo.price,
      unit: combo.unit || 'Combo Pack',
      image: combo.image,
      includedProducts: combo.includedProducts
    }, 1);
  };

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(combo);
    }
  };

  return (
    <div className="combo-card-container" onClick={handleCardClick}>
      {/* Top Badges */}
      <div className="combo-card-badges">
        <span className="combo-discount-badge">{combo.discountPercent}% OFF</span>
        {combo.badge && (
          <span className="combo-tag-badge">{combo.badge}</span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        className={`combo-wishlist-btn ${isLiked ? 'liked' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          if (toggleWishlist) toggleWishlist(combo.id);
        }}
        title={isLiked ? 'Remove from Wishlist' : 'Save to Wishlist'}
      >
        <Heart size={16} fill={isLiked ? '#e53e3e' : 'none'} stroke={isLiked ? '#e53e3e' : '#64748b'} />
      </button>

      {/* Image Container */}
      <div className="combo-img-wrapper">
        <img
          src={combo.image}
          alt={combo.name}
          className="combo-main-img"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&auto=format&fit=crop&q=80';
          }}
        />
      </div>

      {/* Content Area */}
      <div className="combo-card-body">
        <div className="combo-category-label">
          <Tag size={12} />
          <span>{combo.category}</span>
        </div>

        <h3 className="combo-card-title">{combo.name}</h3>

        {/* Included Products List */}
        <div className="combo-included-box">
          <div className="included-header">Products Included ({combo.includedProducts?.length || 0}):</div>
          <ul className="included-list">
            {combo.includedProducts?.map((item, idx) => (
              <li key={idx} className="included-item">
                <Check size={13} className="included-check-icon" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing Row */}
        <div className="combo-price-row">
          <div className="price-stack">
            <span className="combo-price-current">₹{combo.price}</span>
            <span className="combo-price-original">₹{combo.originalPrice}</span>
          </div>
          <span className="combo-savings-pill">Save ₹{combo.originalPrice - combo.price}</span>
        </div>

        {/* Buttons Row */}
        <div className="combo-action-row">
          <button
            type="button"
            className="combo-btn-details"
            onClick={(e) => {
              e.stopPropagation();
              if (onViewDetails) onViewDetails(combo);
            }}
          >
            <Eye size={15} />
            <span>View Details</span>
          </button>

          <button
            type="button"
            className="combo-btn-add-cart"
            onClick={handleAddToCart}
          >
            <ShoppingBag size={15} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
