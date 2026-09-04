import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Zap, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductCard = ({ product, onQuickView }) => {
  const navigate = useNavigate();
  const { addToCart, showToast } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isLiked = isInWishlist(product.id);

  const handleCardClick = (e) => {
    if (
      e.target.closest('.card-wishlist-toggle-btn') ||
      e.target.closest('.card-add-cart-action-btn')
    ) {
      return;
    }
    if (onQuickView) {
      onQuickView(product);
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="fruit-exact-card" onClick={handleCardClick}>
      {/* Badge / Discount Tag */}
      {(product.badge || discountPercent) && (
        <span className="fruit-bestseller-badge">
          {product.badge ? product.badge : `${discountPercent}% OFF`}
        </span>
      )}

      {/* Product Image */}
      <div className="fruit-img-box">
        <img
          src={product.image}
          alt={product.name}
          className="fruit-main-img"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80';
          }}
        />
      </div>

      {/* Product Details */}
      <div className="fruit-card-info">
        <h3 className="fruit-name-title" title={product.name}>{product.name}</h3>
        <p className="fruit-sub-title">{product.subDesc || product.shortDesc || '100% Farm Fresh'}</p>

        {/* Rating Row (Always rendered for equal height alignment across grid cards) */}
        <div className="card-rating-row">
          {product.rating ? (
            <>
              <Star size={12} fill="#f59e0b" stroke="none" />
              <span>{product.rating}</span>
              {product.reviewsCount && <span style={{ color: '#64748b', fontWeight: '400' }}>({product.reviewsCount})</span>}
            </>
          ) : (
            <span className="card-rating-placeholder">&nbsp;</span>
          )}
        </div>

        {/* Price Row */}
        <div className="fruit-price-row">
          <div className="fruit-price-main">
            <span className="fruit-price-val">₹{product.price}</span>
            <span className="fruit-unit-val"> / {product.unit || 'item'}</span>
          </div>
          <div className="fruit-price-orig-box">
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="fruit-orig-price">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Card Action Row: Add to Cart + Heart Wishlist */}
        <div className="fruit-action-row">
          <button
            type="button"
            className="card-add-cart-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
              showToast(`Added ${product.name} to cart!`);
            }}
            title="Add to Cart"
          >
            <ShoppingCart size={14} />
            <span>Add to Cart</span>
          </button>

          <button
            type="button"
            className={`card-wishlist-toggle-btn ${isLiked ? 'liked' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart size={15} fill={isLiked ? '#e53e3e' : 'none'} stroke={isLiked ? '#e53e3e' : '#64748b'} />
          </button>
        </div>
      </div>
    </div>
  );
};
