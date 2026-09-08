import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, Heart, Star, Plus, Minus, ShoppingCart, 
  ChevronUp, ChevronDown, Check, ArrowLeft, ArrowRight, Sprout 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SNACKS_SWEETS_CATEGORIES, SNACKS_SWEETS_PRODUCTS } from '../data/snacksSweetsData';
import { handleBackNavigation } from '../utils/navigation';

export const SnacksSweetsPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  // Single category highlight state ('all' or specific subCategory name)
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Type section filter: 'all' | 'snack' | 'sweet'
  const [activeTypeTab, setActiveTypeTab] = useState('all');

  // Accordion toggle states in sidebar
  const [isCatOpen, setIsCatOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isDietOpen, setIsDietOpen] = useState(false);

  // Selected filters for price & diet
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedSort, setSelectedSort] = useState('popularity');

  // Single category selection handler
  const handleSelectSingleCategory = (catName) => {
    setSelectedCategory(catName);
  };

  const togglePriceRange = (rangeId) => {
    setSelectedPriceRanges(prev => 
      prev.includes(rangeId) ? prev.filter(r => r !== rangeId) : [...prev, rangeId]
    );
  };

  const toggleDiet = (dietKey) => {
    setSelectedDiets(prev => 
      prev.includes(dietKey) ? prev.filter(d => d !== dietKey) : [...prev, dietKey]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setActiveTypeTab('all');
    setSelectedPriceRanges([]);
    setSelectedDiets([]);
    setSelectedSort('popularity');
  };

  // Filtered & Sorted products list
  const filteredProducts = useMemo(() => {
    return SNACKS_SWEETS_PRODUCTS.filter(p => {
      // Type tab filter ('snack' | 'sweet')
      if (activeTypeTab !== 'all' && p.type !== activeTypeTab) return false;

      // Single Category Highlight filter
      if (selectedCategory !== 'all' && p.subCategory !== selectedCategory) {
        return false;
      }

      // Sidebar price range checkboxes
      if (selectedPriceRanges.length > 0) {
        const matchPrice = selectedPriceRanges.some(range => {
          if (range === 'p1') return p.price < 150;
          if (range === 'p2') return p.price >= 150 && p.price <= 300;
          if (range === 'p3') return p.price > 300 && p.price <= 500;
          if (range === 'p4') return p.price > 500;
          return true;
        });
        if (!matchPrice) return false;
      }

      // Diet preferences filter
      if (selectedDiets.includes('glutenFree') && !p.glutenFree) return false;
      if (selectedDiets.includes('noAddedSugar') && !p.noAddedSugar) return false;
      if (selectedDiets.includes('jainFriendly') && !p.jainFriendly) return false;

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-low') return a.price - b.price;
      if (selectedSort === 'price-high') return b.price - a.price;
      if (selectedSort === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // Popularity default
    });
  }, [selectedCategory, activeTypeTab, selectedPriceRanges, selectedDiets, selectedSort]);

  // Image fallback handler to guarantee no broken images
  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=600&auto=format&fit=crop&q=80';
  };

  return (
    <div className="snacks-sweets-page-wrapper">
      <div className="main-content-container">
        
        {/* Top Header Section matching user reference screenshot */}
        <div className="ss-top-header-section">
          {/* Left Column: Back button + Breadcrumbs + Large Title + Description + Leaf Tags */}
          <div className="ss-header-left-col">
            <div className="ss-header-controls-row">
              <button 
                type="button" 
                onClick={(e) => handleBackNavigation(navigate, e)} 
                className="btn-back-pill"
                title="Go back to previous page"
              >
                <ArrowLeft size={15} />
                <span>Back</span>
              </button>
              <div className="page-breadcrumbs-inline">
                <Link to="/">Home</Link>
                <ChevronRight size={14} className="crumb-icon" />
                <span className="current-crumb">Snacks & Sweets</span>
              </div>
            </div>

            <h1 className="ss-main-title">Snacks & Sweets</h1>
            <p className="ss-main-desc">
              Enjoy the goodness of nature with our wide range of fresh, organic snacks and sweets. Handpicked for quality, freshness, and nutrition.
            </p>

            <div className="ss-leaf-tags-row">
              <span className="leaf-tag-item">
                <Sprout size={16} className="leaf-icon" />
                <span>100% Organic</span>
              </span>
              <span className="dot-sep-sm">•</span>
              <span className="leaf-tag-text">Chemical Free</span>
              <span className="dot-sep-sm">•</span>
              <span className="leaf-tag-text">Farm Fresh</span>
            </div>
          </div>

          {/* Right Column: Light Green Promo Showcase Card with Image & 100% Organic Badge */}
          <div className="ss-header-right-card">
            <div className="ss-promo-text-box">
              <h2 className="ss-promo-title">Nature's Sweetest Gift, Just for You</h2>
              <p className="ss-promo-subtext">Handpicked Organic Snacks & Sweets for a Healthy You</p>
              <button 
                className="btn-shop-now-pill"
                onClick={() => {
                  const el = document.getElementById('ss-products-anchor');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Shop Now</span>
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="ss-promo-img-box">
              <div className="badge-100-organic-circle">
                <span>100%</span>
                <span>ORGANIC</span>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80" 
                alt="Organic Snacks Showcase" 
                className="ss-promo-img"
                onError={handleImageError}
              />
            </div>
          </div>
        </div>

        {/* Main Layout Grid: Sidebar + 4-Column Product Grid */}
        <div className="ss-layout-grid-ref">
          {/* Left Sidebar Filters */}
          <aside className="ss-sidebar-ref">
            <div className="sidebar-ref-card">
              <div className="sidebar-ref-header">
                <h3 className="sidebar-ref-title">Filters</h3>
                <button className="btn-clear-all-green" onClick={clearAllFilters}>
                  Clear All
                </button>
              </div>

              <div className="ref-divider"></div>

              {/* Accordion 1: Categories (Highlights One-by-One) */}
              <div className="ref-filter-group">
                <button className="ref-accordion-btn" onClick={() => setIsCatOpen(!isCatOpen)}>
                  <span>Categories</span>
                  {isCatOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isCatOpen && (
                  <div className="ref-checkbox-list">
                    {/* All Items Option */}
                    <div 
                      className={`ref-checkbox-item ${selectedCategory === 'all' ? 'active' : ''}`}
                      onClick={() => handleSelectSingleCategory('all')}
                    >
                      <span className={`custom-check-box ${selectedCategory === 'all' ? 'checked' : ''}`}>
                        {selectedCategory === 'all' && <Check size={12} strokeWidth={3} />}
                      </span>
                      <span className="checkbox-text">All Items</span>
                    </div>

                    {/* One-by-One Category Highlight List */}
                    {['Namkeen', 'Cookies & Biscuits', 'Chips & Crisps', 'Indian Sweets', 'Chocolates', 'Energy Bars', 'Jaggery & Gur', 'Healthy Mixes'].map(catName => {
                      const isSelected = selectedCategory === catName;
                      return (
                        <div 
                          key={catName} 
                          className={`ref-checkbox-item ${isSelected ? 'active' : ''}`}
                          onClick={() => handleSelectSingleCategory(catName)}
                        >
                          <span className={`custom-check-box ${isSelected ? 'checked' : ''}`}>
                            {isSelected && <Check size={12} strokeWidth={3} />}
                          </span>
                          <span className="checkbox-text">{catName}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="ref-divider"></div>

              {/* Accordion 2: Price Range */}
              <div className="ref-filter-group">
                <button className="ref-accordion-btn" onClick={() => setIsPriceOpen(!isPriceOpen)}>
                  <span>Price Range</span>
                  {isPriceOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isPriceOpen && (
                  <div className="ref-checkbox-list">
                    {[
                      { id: 'p1', label: 'Under ₹150' },
                      { id: 'p2', label: '₹150 - ₹300' },
                      { id: 'p3', label: '₹300 - ₹500' },
                      { id: 'p4', label: 'Above ₹500' }
                    ].map(item => {
                      const isChecked = selectedPriceRanges.includes(item.id);
                      return (
                        <div 
                          key={item.id} 
                          className={`ref-checkbox-item ${isChecked ? 'active' : ''}`}
                          onClick={() => togglePriceRange(item.id)}
                        >
                          <span className={`custom-check-box ${isChecked ? 'checked' : ''}`}>
                            {isChecked && <Check size={12} strokeWidth={3} />}
                          </span>
                          <span className="checkbox-text">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="ref-divider"></div>

              {/* Accordion 3: Diet Preference */}
              <div className="ref-filter-group">
                <button className="ref-accordion-btn" onClick={() => setIsDietOpen(!isDietOpen)}>
                  <span>Diet Preference</span>
                  {isDietOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isDietOpen && (
                  <div className="ref-checkbox-list">
                    {[
                      { id: 'glutenFree', label: 'Gluten Free' },
                      { id: 'noAddedSugar', label: 'No Added Sugar' },
                      { id: 'jainFriendly', label: 'Jain Friendly' }
                    ].map(item => {
                      const isChecked = selectedDiets.includes(item.id);
                      return (
                        <div 
                          key={item.id} 
                          className={`ref-checkbox-item ${isChecked ? 'active' : ''}`}
                          onClick={() => toggleDiet(item.id)}
                        >
                          <span className={`custom-check-box ${isChecked ? 'checked' : ''}`}>
                            {isChecked && <Check size={12} strokeWidth={3} />}
                          </span>
                          <span className="checkbox-text">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Right Product Area */}
          <main className="ss-products-area-ref">
            {/* Top Results Toolbar */}
            <div className="ss-toolbar-row-ref">
              <span className="results-count-ref">
                Showing <strong>1–{filteredProducts.length}</strong> of <strong>{SNACKS_SWEETS_PRODUCTS.length}</strong> organic products
              </span>

              <div className="sort-wrapper-ref">
                <span className="sort-label-ref">Sort by:</span>
                <select 
                  className="sort-select-ref"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {/* 4-Column Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="ss-products-grid-4col">
                {filteredProducts.map(product => {
                  const isWishlisted = wishlist.some(item => item.id === product.id);
                  const badgeText = product.badge || (product.type === 'sweet' ? 'Pure Sweets' : '100% Organic');

                  return (
                    <div key={product.id} className="ref-product-card">
                      {/* Product Image with Fallback & Orange Pill Badge */}
                      <div className="ref-card-img-wrapper">
                        <span className="ref-badge-tag">{badgeText}</span>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="ref-card-img" 
                          onError={handleImageError}
                        />
                      </div>

                      {/* Title & Subdescription */}
                      <div className="ref-card-details">
                        <h3 className="ref-card-title" title={product.name}>{product.name}</h3>
                        <p className="ref-card-subdesc">{product.shortDesc}</p>
                        
                        {/* Price Row */}
                        <div className="ref-card-price-row">
                          <span className="ref-price-num">₹{product.price.toFixed(0)}</span>
                          <span className="ref-unit-lbl">/ {product.unit}</span>
                        </div>

                        {/* Action Row */}
                        <div className="ref-card-action-row">
                          <button 
                            type="button"
                            className="btn-add-to-cart-pill"
                            onClick={() => addToCart(product, 1)}
                            title="Add to Cart"
                          >
                            <ShoppingCart size={14} />
                            <span>Add to Cart</span>
                          </button>

                          <button 
                            type="button"
                            className={`ref-heart-btn ${isWishlisted ? 'active' : ''}`}
                            onClick={() => toggleWishlist(product)}
                            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                          >
                            <Heart size={16} fill={isWishlisted ? '#ef4444' : 'none'} color={isWishlisted ? '#ef4444' : '#64748b'} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="ss-empty-results-card">
                <h3>No Products Found</h3>
                <p>No items match your selected category filter.</p>
                <button className="btn-solid-green" onClick={clearAllFilters}>
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SnacksSweetsPage;
