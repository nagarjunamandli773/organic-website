import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Tag, Percent, Clock, Sparkles, Flame, CheckCircle, Gift, ArrowLeft } from 'lucide-react';
import { CouponCard } from '../components/CouponCard';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailsModal } from '../components/ProductDetailsModal';
import { OFFERS } from '../data/offers';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { useCart } from '../context/CartContext';

export const OffersPage = () => {
  const navigate = useNavigate();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { addToCart, showToast } = useCart();

  // Flash sale countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const offerProducts = PRODUCTS.slice(0, 12).map((p, idx) => ({
    ...p,
    discountBadge: idx % 3 === 0 ? '30% OFF' : idx % 2 === 0 ? '25% OFF' : '20% OFF',
    originalPrice: Math.round(p.price * 1.35)
  }));

  const dealOfTheDay = PRODUCTS.find(p => p.id === 'of-8') || PRODUCTS[0]; // Deal of the day

  return (
    <div className="offers-exact-page">
      <div style={{ marginBottom: '12px' }}>
        <button 
          onClick={() => navigate(-1)} 
          className="back-arrow-btn"
          title="Go back to previous page"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </div>
      {/* 1. Top Hero Deals Banner */}
      <div className="offers-hero-banner">
        <div className="offers-banner-left">
          <div className="offers-pill-badge">
            <Flame size={14} className="flame-icon" />
            <span>MEGA ORGANIC SALE</span>
          </div>
          <h1 className="offers-banner-title">
            Best Offers for<br />Healthy Living
          </h1>
          <p className="offers-banner-sub">
            Grab 100% certified organic fruits, groceries &amp; wellness essentials at up to 40% OFF.
          </p>

          <div className="flash-timer-wrapper">
            <span className="timer-label"><Clock size={15} /> Ends In:</span>
            <div className="timer-boxes">
              <span className="time-box"><strong>{String(timeLeft.hours).padStart(2, '0')}</strong>h</span>
              <span className="colon">:</span>
              <span className="time-box"><strong>{String(timeLeft.minutes).padStart(2, '0')}</strong>m</span>
              <span className="colon">:</span>
              <span className="time-box"><strong>{String(timeLeft.seconds).padStart(2, '0')}</strong>s</span>
            </div>
          </div>

          <Link to="/products" className="offers-cta-btn">
            <span>Explore All Deals</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="offers-banner-right-visual">
          <img
            src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&auto=format&fit=crop&q=80"
            alt="Organic deals basket"
            className="offers-banner-img"
          />
          <div className="banner-float-discount-tag">
            <span className="discount-big">UP TO</span>
            <span className="discount-percent">40% OFF</span>
            <span className="discount-sub">Limited Time Only</span>
          </div>
        </div>
      </div>

      {/* 2. Exclusive Promo Coupons Section */}
      <section className="coupons-section">
        <div className="section-header-flex">
          <div>
            <h2 className="section-title-serif">Exclusive Promo Coupons</h2>
            <p className="section-subtitle-muted">Click any coupon to copy &amp; apply instantly at checkout</p>
          </div>
        </div>

        <div className="coupons-grid">
          {OFFERS.map(offer => (
            <CouponCard key={offer.id} offer={offer} />
          ))}
        </div>
      </section>

      {/* 3. Deal of the Day Spotlight Box */}
      <section className="deal-of-the-day-section">
        <div className="deal-spotlight-card">
          <div className="deal-img-box">
            <img src={dealOfTheDay.image} alt={dealOfTheDay.name} className="deal-spotlight-img" />
            <span className="deal-save-badge">SAVE 35%</span>
          </div>
          <div className="deal-details-box">
            <div className="deal-top-row">
              <span className="deal-pill"><Sparkles size={13} /> DEAL OF THE DAY</span>
              <span className="deal-stock-status"><CheckCircle size={13} /> In Stock &amp; Ready to Ship</span>
            </div>
            <h3 className="deal-product-title">{dealOfTheDay.name}</h3>
            <p className="deal-product-desc">{dealOfTheDay.description}</p>
            
            <div className="deal-price-row">
              <span className="deal-curr-price">₹{dealOfTheDay.price}</span>
              <span className="deal-orig-price">₹{Math.round(dealOfTheDay.price * 1.35)}</span>
              <span className="deal-save-text">You Save ₹{Math.round(dealOfTheDay.price * 0.35)}</span>
            </div>

            <div className="deal-claimed-bar-wrapper">
              <div className="claimed-text-row">
                <span>⚡ 78% Claimed</span>
                <span>Hurry! Only 8 units left</span>
              </div>
              <div className="claimed-bar-bg">
                <div className="claimed-bar-fill" style={{ width: '78%' }}></div>
              </div>
            </div>

            <div className="deal-actions-row">
              <button
                className="deal-buy-now-btn"
                onClick={() => {
                  addToCart(dealOfTheDay, 1);
                  showToast(`Added ${dealOfTheDay.name} to cart!`);
                }}
              >
                Add Deal to Cart
              </button>
              <button
                className="deal-quick-view-btn"
                onClick={() => setQuickViewProduct(dealOfTheDay)}
              >
                Quick View
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Offer Categories (6-Column Grid) */}
      <section className="offer-categories-section">
        <div className="section-header-flex">
          <h2 className="section-title-serif">Shop Deals by Category</h2>
          <Link to="/products" className="view-all-pill-btn">
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="offer-categories-grid">
          {CATEGORIES.map((cat, idx) => (
            <Link key={cat.id} to={`/category/${cat.slug}`} className="offer-category-card">
              <div className="offer-cat-img-box">
                <img src={cat.cardImage} alt={cat.name} className="offer-cat-img" />
              </div>
              <span className="offer-cat-badge">{idx % 2 === 0 ? 'UP TO 30% OFF' : 'UP TO 25% OFF'}</span>
              <h3 className="offer-cat-name">{cat.fullName || cat.name}</h3>
              <span className="offer-cat-action">Shop Category &rarr;</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Best Offer Products Grid */}
      <section className="best-offer-products-section">
        <div className="section-header-flex">
          <div>
            <h2 className="section-title-serif">Best Offer Products</h2>
            <p className="section-subtitle-muted">Handpicked discounts on our bestselling farm products</p>
          </div>
          <Link to="/products" className="view-all-pill-btn">
            <span>View All ({offerProducts.length} Offers)</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="products-grid-6cols">
          {offerProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductDetailsModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};
