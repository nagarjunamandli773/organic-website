import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, ArrowLeft, ArrowRight, Leaf, ChevronDown, ChevronUp 
} from 'lucide-react';
import { HEALTHY_DRINKS_CATEGORIES, HEALTHY_DRINKS_PRODUCTS } from '../data/healthyDrinksData';
import { ProductGrid } from '../components/ProductGrid';
import { ProductDetailsModal } from '../components/ProductDetailsModal';

export const HealthyDrinksPage = () => {
  const navigate = useNavigate();

  // Selected subcategory state
  const [selectedSubCat, setSelectedSubCat] = useState('All Healthy Drinks');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCerts, setSelectedCerts] = useState([]);
  const [sortBy, setSortBy] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Accordion states in sidebar
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    certification: true
  });

  const toggleSection = (sec) => {
    setOpenSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  const handleToggleCert = (cert) => {
    setSelectedCerts(prev =>
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    );
  };

  const handleClearFilters = () => {
    setSelectedSubCat('All Healthy Drinks');
    setPriceRange([0, 1000]);
    setSelectedCerts([]);
    setSortBy('popularity');
    setCurrentPage(1);
  };

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return HEALTHY_DRINKS_PRODUCTS.filter(p => {
      // Subcategory filter
      if (selectedSubCat !== 'All Healthy Drinks' && p.subCategory !== selectedSubCat && p.type !== selectedSubCat) {
        return false;
      }

      // Price filter
      if (p.price < priceRange[0] || p.price > priceRange[1]) {
        return false;
      }

      // Certification filter
      if (selectedCerts.length > 0) {
        const matchCert = selectedCerts.some(cert => 
          (cert === '100% Organic' && p.isOrganic) ||
          (cert === 'Chemical Free' && p.certification && p.certification.toLowerCase().includes('chemical'))
        );
        if (!matchCert) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // Popularity default
    });
  }, [selectedSubCat, priceRange, selectedCerts, sortBy]);

  // Pagination (12 items per page)
  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = filteredProducts.length === 0 ? 0 : (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length);
  
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, startIndex, endIndex]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 220, behavior: 'smooth' });
  };

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1622484210800-88517572bf92?w=600&auto=format&fit=crop&q=80';
  };

  const scrollToProducts = () => {
    const el = document.getElementById('drinks-products-anchor');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fruits-category-page">
      <div className="main-content-container">
        
        {/* Top Header Banner Row matching Reference Image */}
        <div className="fruits-header-container">
          {/* Left Info Column */}
          <div className="fruits-header-left">
            <div className="breadcrumbs-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <button 
                onClick={() => navigate(-1)} 
                className="back-arrow-btn"
                title="Go back"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Link to="/">Home</Link>
                <ChevronRight size={13} className="crumb-chevron" />
                <Link to="/products">Categories</Link>
                <ChevronRight size={13} className="crumb-chevron" />
                <span className="current-crumb">Healthy Drinks</span>
              </div>
            </div>

            <h1 className="fruits-page-title">Organic Healthy Drinks</h1>

            <p className="fruits-page-description">
              Enjoy the goodness of nature with our wide range of fresh, organic healthy drinks. Handpicked for quality, freshness, and nutrition.
            </p>

            <div className="fruits-feature-tags">
              <span className="tag-item">
                <Leaf size={15} className="tag-icon" />
                100% Organic
              </span>
              <span className="tag-bullet">•</span>
              <span className="tag-item">Chemical Free</span>
              <span className="tag-bullet">•</span>
              <span className="tag-item">Pure & Natural</span>
            </div>
          </div>

          {/* Right Hero Banner Card matching Reference Image */}
          <div className="fruits-hero-card">
            <div className="banner-badge-organic">
              <span>100%</span>
              <span>ORGANIC</span>
            </div>

            <div className="banner-content">
              <h2 className="banner-title">
                Nature's Sweetest Gift, Just for You
              </h2>
              <p className="banner-subtitle">
                Handpicked Organic Healthy Drinks for a Healthy You
              </p>
              <button className="banner-shop-btn" type="button" onClick={scrollToProducts}>
                <span>Shop Now</span>
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="banner-image-wrapper">
              <img
                src="/images/healthy_drinks_banner.jpg"
                alt="Organic Healthy Drinks"
                className="banner-fruits-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/fruits_hero_banner.jpg';
                }}
              />
            </div>
          </div>
        </div>

        {/* Main Layout Grid (Sidebar + Products) matching Reference Image */}
        <div className="category-layout" id="drinks-products-anchor">
          
          {/* Left Filter Sidebar */}
          <aside className="filter-sidebar">
            <div className="filter-header">
              <h3 className="filter-title">Filters</h3>
              <button className="clear-all-btn" onClick={handleClearFilters}>
                Clear All
              </button>
            </div>

            <div className="filter-box-card">
              {/* Categories Section */}
              <div className="filter-group">
                <div className="filter-group-header" onClick={() => toggleSection('categories')}>
                  <span>Categories</span>
                  {openSections.categories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {openSections.categories && (
                  <div className="filter-group-body">
                    {HEALTHY_DRINKS_CATEGORIES.map((cat) => {
                      const catName = cat.name;
                      const isSelected = selectedSubCat === catName || (selectedSubCat === 'All Healthy Drinks' && cat.id === 'all');
                      return (
                        <label 
                          key={cat.id} 
                          className="checkbox-filter-item"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedSubCat(catName);
                            setCurrentPage(1);
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            readOnly
                          />
                          <span className="checkbox-custom"></span>
                          <span className="checkbox-label" style={{ fontWeight: isSelected ? 600 : 400, color: isSelected ? '#165b2e' : '#334155' }}>
                            {catName}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Price Range Slider */}
              <div className="filter-group">
                <div className="filter-group-header" onClick={() => toggleSection('price')}>
                  <span>Price Range</span>
                  {openSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {openSections.price && (
                  <div className="filter-group-body">
                    <div className="price-slider-wrapper">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) => {
                          setPriceRange([priceRange[0], parseInt(e.target.value)]);
                          setCurrentPage(1);
                        }}
                        className="price-range-slider"
                      />
                      <div className="price-range-labels">
                        <span>₹ {priceRange[0]}</span>
                        <span>₹ {priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Certification Checkboxes */}
              <div className="filter-group">
                <div className="filter-group-header" onClick={() => toggleSection('certification')}>
                  <span>Certification</span>
                  {openSections.certification ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {openSections.certification && (
                  <div className="filter-group-body">
                    {['100% Organic', 'Chemical Free'].map(cert => (
                      <label 
                        key={cert} 
                        className="checkbox-filter-item"
                        onClick={(e) => {
                          e.preventDefault();
                          handleToggleCert(cert);
                          setCurrentPage(1);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCerts.includes(cert)}
                          readOnly
                        />
                        <span className="checkbox-custom"></span>
                        <span className="checkbox-label">{cert}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Right Product Grid Content Area matching Reference Image */}
          <div className="product-listing-content">
            <div className="listing-top-bar">
              <div className="results-count">
                Showing <strong>{filteredProducts.length === 0 ? 0 : startIndex + 1}–{endIndex}</strong> of <strong>{filteredProducts.length}</strong> organic products
              </div>

              <div className="sort-dropdown-wrapper">
                <label htmlFor="sort-select">Sort by:</label>
                <select
                  id="sort-select"
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid using ProductGrid component */}
            <ProductGrid
              products={displayedProducts}
              onQuickView={setQuickViewProduct}
              emptyMessage="No organic healthy drinks match your selected criteria."
            />

            {/* Dynamic Pagination Bar */}
            {totalPages > 1 && (
              <div className="pagination-wrapper">
                <button
                  className="page-nav-btn"
                  disabled={safeCurrentPage === 1}
                  onClick={() => handlePageChange(safeCurrentPage - 1)}
                >
                  &lt;
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      className={`page-num-btn ${safeCurrentPage === pageNum ? 'active' : ''}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  className="page-nav-btn"
                  disabled={safeCurrentPage === totalPages}
                  onClick={() => handlePageChange(safeCurrentPage + 1)}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

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

export default HealthyDrinksPage;
