import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Plus, Minus, ShoppingBag, Zap, ShieldCheck, Leaf, Heart, ChevronRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const relatedProducts = PRODUCTS.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="product-details-page">
      {/* Breadcrumbs & Back Navigation */}
      <div className="breadcrumbs-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
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
          <ChevronRight size={14} />
          <Link to={`/category/${product.categoryId}`}>{product.category}</Link>
          <ChevronRight size={14} />
          <span className="current-crumb">{product.name}</span>
        </div>
      </div>

      {/* Main Details Card matching Panel 6 */}
      <div className="product-details-card">
        <div className="product-details-grid">
          {/* Image Box */}
          <div className="product-image-container">
            <img src={product.image} alt={product.name} className="main-product-img" />
            {product.badge && <span className="product-badge-pill">{product.badge}</span>}
          </div>

          {/* Info Box */}
          <div className="product-info-container">
            <div className="product-cat-label">{product.category}</div>
            <h1 className="product-page-title">{product.name}</h1>

            {/* Rating */}
            {product.rating && (
              <div className="rating-flex">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < Math.floor(product.rating) ? '#f59e0b' : '#e2e8f0'}
                      stroke="none"
                    />
                  ))}
                </div>
                <span className="score-num">{product.rating}</span>
                <span className="reviews-num">({product.reviewsCount} verified reviews)</span>
              </div>
            )}

            {/* Price */}
            <div className="price-unit-flex">
              <span className="current-price-lg">₹{product.price.toFixed(2)}</span>
              {product.unit && <span className="unit-lg"> / {product.unit}</span>}
              {product.originalPrice && (
                <span className="orig-price-lg">₹{product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="product-long-desc">{product.description}</p>

            {/* Organic Badges Row */}
            <div className="organic-badges-bar">
              <div className="badge-chip"><Leaf size={16} /> 100% Organic</div>
              <div className="badge-chip"><ShieldCheck size={16} /> Pesticide Free</div>
              <div className="badge-chip"><Zap size={16} /> Fresh & Healthy</div>
            </div>

            {/* Quantity Selector */}
            <div className="qty-selector-flex">
              <span className="qty-label">Quantity:</span>
              <div className="qty-counter-box">
                <button
                  className="counter-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={14} />
                </button>
                <span className="counter-val">{quantity}</span>
                <button
                  className="counter-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                className={`wishlist-btn-pill ${isLiked ? 'active' : ''}`}
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart size={18} fill={isLiked ? '#e53e3e' : 'none'} stroke={isLiked ? '#e53e3e' : '#4a5568'} />
                <span>{isLiked ? 'Wishlisted' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons-flex">
              <button className="btn-solid-green action-btn" onClick={handleAddToCart}>
                <ShoppingBag size={18} />
                <span>Add to Cart</span>
              </button>

              <button className="btn-solid-brown action-btn" onClick={handleBuyNow}>
                <Zap size={18} />
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabbed Info Section */}
        <div className="product-tabs-container">
          <div className="tabs-header">
            <button
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description & Benefits
            </button>
            <button
              className={`tab-btn ${activeTab === 'certification' ? 'active' : ''}`}
              onClick={() => setActiveTab('certification')}
            >
              Organic Certification
            </button>
            <button
              className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              Shipping & Returns
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-pane">
                <h3>Product Overview</h3>
                <p>{product.description}</p>
                {product.benefits && (
                  <>
                    <h4>Key Organic Benefits:</h4>
                    <ul className="benefits-list">
                      {product.benefits.map((b, i) => (
                        <li key={i}><Leaf size={14} /> {b}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}

            {activeTab === 'certification' && (
              <div className="tab-pane">
                <h3>Certified Organic Product</h3>
                <p>This item holds authentic certification under <strong>{product.certification || 'Jaivik Bharat'}</strong>. Sourced directly from verified rain-fed organic farms complying with NPOP standards.</p>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="tab-pane">
                <h3>Delivery & Return Policy</h3>
                <p>Enjoy free fast delivery on all orders above ₹499. Fresh fruits & vegetables are delivered within 24 hours in insulated eco-friendly packaging. We offer a 30-day hassle-free return policy.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section">
          <h2 className="section-title">Related Organic Products</h2>
          <div className="products-grid">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
