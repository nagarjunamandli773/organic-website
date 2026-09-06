import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { HeroBanners } from '../components/HeroBanners';
import { TrustBadges } from '../components/TrustBadges';
import { CategoryGrid } from '../components/CategoryGrid';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailsModal } from '../components/ProductDetailsModal';
import { PRODUCTS } from '../data/products';

export const Home = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Best selling products selection matching reference image (6 products)
  const bestsellerProducts = PRODUCTS.slice(0, 6);

  return (
    <div className="home-page">
      {/* 1. Hero Banners Row */}
      <HeroBanners />

      {/* 2. Trust Badges Row */}
      <TrustBadges />

      {/* 3. Shop by Category (6 Columns) */}
      <CategoryGrid />

      {/* 4. Best Selling Products Section (6 Columns) */}
      <section className="home-section bestsellers-section">
        <div className="section-header-flex">
          <h2 className="section-title-serif">Best Selling Products</h2>
          <Link to="/products" className="view-all-pill-btn">
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="products-grid-6cols">
          {bestsellerProducts.map(product => (
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

