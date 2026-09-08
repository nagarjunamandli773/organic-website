import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Search, Sparkles, Tag, PackageCheck, Leaf, Filter, X, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { COMBOS } from '../data/combos';
import { ComboCard } from '../components/ComboCard';
import { ComboDetailsModal } from '../components/ComboDetailsModal';
import { handleBackNavigation } from '../utils/navigation';

export const ComboOffersPage = () => {
  const navigate = useNavigate();

  // Filters & State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(2000);
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Categories list derived from COMBOS + All
  const categoriesList = ['All', 'Fruits', 'Vegetables', 'Cosmetics', 'Hair Oils', 'Org Chemicals', 'Organic Food'];

  // Filtered Combos calculation
  const filteredCombos = useMemo(() => {
    return COMBOS.filter(combo => {
      // Search filter
      const matchesSearch = searchQuery.trim() === '' ||
        combo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        combo.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        combo.includedProducts.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory = selectedCategory === 'All' || combo.category === selectedCategory;

      // Price filter
      const matchesPrice = combo.price <= priceRange;

      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      return (b.rating || 0) - (a.rating || 0); // default popularity
    });
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange(2000);
    setSortBy('popularity');
  };

  return (
    <div className="combo-offers-page">
      {/* Top Breadcrumb & Back Navigation */}
      <div className="combo-nav-breadcrumbs">
        <button
          type="button"
          onClick={(e) => handleBackNavigation(navigate, e)}
          className="back-arrow-btn"
          title="Go back to previous page"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="breadcrumbs-right">
          <Link to="/">Home</Link>
          <ChevronRight size={13} className="crumb-chevron" />
          <span className="current-crumb">Combo Offers</span>
        </div>
      </div>

      {/* Hero Banner Header matching Klan Organics Theme */}
      <div className="combo-hero-banner">
        <div className="combo-banner-left">
          <div className="combo-pill-tag">
            <Flame size={15} className="flame-icon" />
            <span>SUPER VALUE SAVER BUNDLES</span>
          </div>

          <h1 className="combo-banner-title">
            Organic Combo Offers &amp; Value Packs
          </h1>

          <p className="combo-banner-desc">
            Save up to 40% OFF with our curated organic baskets and essential bundles. Handpicked directly from organic farms for maximum freshness and value.
          </p>

          <div className="combo-banner-highlights">
            <div className="highlight-item">
              <Leaf size={16} />
              <span>100% Certified Organic</span>
            </div>
            <div className="highlight-item">
              <ShieldCheck size={16} />
              <span>Chemical Free Guarantee</span>
            </div>
            <div className="highlight-item">
              <Sparkles size={16} />
              <span>Extra Bundle Savings</span>
            </div>
          </div>
        </div>

        <div className="combo-banner-right">
          <div className="combo-banner-badge">
            <span className="badge-big">SAVE UP TO</span>
            <span className="badge-percent">40% OFF</span>
            <span className="badge-sub">On All Combo Packs</span>
          </div>
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80"
            alt="Organic Combos Banner"
            className="banner-img"
          />
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="combo-toolbar">
        {/* Search Bar */}
        <div className="combo-search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="combo-search-input"
            placeholder="Search combo offers, included products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Pills (Desktop Scrollable) */}
        <div className="combo-category-pills">
          {categoriesList.map(cat => (
            <button
              key={cat}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort & Mobile Filter Buttons */}
        <div className="combo-toolbar-actions">
          <div className="sort-dropdown-box">
            <label htmlFor="combo-sort-select">Sort by:</label>
            <select
              id="combo-sort-select"
              className="combo-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popularity">Popularity</option>
              <option value="discount">Highest Discount</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <button
            className="mobile-filter-trigger-btn"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            <Filter size={16} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Secondary Filter Row (Price Range + Reset) */}
      <div className={`combo-secondary-filters ${isMobileFilterOpen ? 'mobile-open' : ''}`}>
        <div className="filter-item price-filter-item">
          <label className="filter-label">
            Max Price: <strong>₹{priceRange}</strong>
          </label>
          <input
            type="range"
            min="300"
            max="2000"
            step="50"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="price-slider"
          />
        </div>

        <div className="active-filters-info">
          <span>Showing {filteredCombos.length} of {COMBOS.length} combo packs</span>
          {(searchQuery || selectedCategory !== 'All' || priceRange < 2000) && (
            <button className="reset-filters-btn" onClick={handleResetFilters}>
              <X size={14} /> Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Combos Grid Section */}
      {filteredCombos.length > 0 ? (
        <div className="combos-grid">
          {filteredCombos.map(combo => (
            <ComboCard
              key={combo.id}
              combo={combo}
              onViewDetails={(item) => setSelectedCombo(item)}
            />
          ))}
        </div>
      ) : (
        <div className="combos-empty-state">
          <PackageCheck size={48} className="empty-icon" />
          <h3>No combo offers found</h3>
          <p>We couldn't find any combo packs matching your current filters or search criteria.</p>
          <button className="reset-empty-btn" onClick={handleResetFilters}>
            Reset All Filters
          </button>
        </div>
      )}

      {/* Combo Details Modal */}
      {selectedCombo && (
        <ComboDetailsModal
          combo={selectedCombo}
          onClose={() => setSelectedCombo(null)}
        />
      )}
    </div>
  );
};
