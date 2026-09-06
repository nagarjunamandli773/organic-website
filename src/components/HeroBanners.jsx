import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const HeroBanners = () => {
  return (
    <section className="hero-banners-section">
      <div className="hero-grid">
        {/* Banner 1: Fruits & Veg */}
        <div className="hero-banner-card banner-card-green">
          <div className="banner-circle-badge green-badge">
            <span>100%</span>
            <span>ORGANIC</span>
          </div>

          <div className="banner-text-content">
            <h2 className="hero-banner-title">
              Eat Pure<br />Live Healthy
            </h2>
            <p className="hero-banner-sub">
              Fresh Organic Fruits &amp; Vegetables Delivered to Your Home
            </p>
          </div>

          <div className="hero-banner-img-wrapper">
            <img
              src="/images/hero_fruits_veg.jpg"
              alt="Fresh Organic Fruits & Vegetables"
              className="hero-banner-img"
            />
          </div>

          <Link to="/category/fruits" className="hero-banner-btn green-btn">
            <span>Shop Now</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Banner 2: Cosmetics */}
        <div className="hero-banner-card banner-card-beige">
          <div className="banner-circle-badge green-badge">
            <span>CHEMICAL</span>
            <span>FREE</span>
          </div>

          <div className="banner-text-content">
            <h2 className="hero-banner-title brown-title">
              Natural Beauty<br />Inside Out
            </h2>
            <p className="hero-banner-sub">
              Organic Cosmetics &amp; Hair Care for a Healthier You
            </p>
          </div>

          <div className="hero-banner-img-wrapper">
            <img
              src="/images/hero_cosmetics.jpg"
              alt="Organic Beauty Care"
              className="hero-banner-img"
            />
          </div>

          <Link to="/category/cosmetics" className="hero-banner-btn brown-btn">
            <span>Explore Now</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Banner 3: Organic Food */}
        <div className="hero-banner-card banner-card-mint">
          <div className="banner-circle-badge green-badge">
            <span>100%</span>
            <span>ORGANIC</span>
          </div>

          <div className="banner-text-content">
            <h2 className="hero-banner-title">
              Pure Food<br />Pure Health
            </h2>
            <p className="hero-banner-sub">
              Wholesome, Healthy &amp; 100% Organic Food Staples
            </p>
          </div>

          <div className="hero-banner-img-wrapper">
            <img
              src="/images/organic_foods_banner.png"
              alt="Organic Food & Grocery"
              className="hero-banner-img"
            />
          </div>

          <Link to="/category/organic-food" className="hero-banner-btn green-btn">
            <span>Shop Now</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

