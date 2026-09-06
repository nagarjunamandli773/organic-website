import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FilterSidebar = ({
  categories = [],
  selectedCategory,
  subCategories = [],
  selectedSubCategory,
  onSelectSubCategory,
  priceRange = [0, 2000],
  onPriceChange,
  selectedCerts = [],
  onToggleCert,
  onClearFilters
}) => {
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    certification: true
  });

  const toggleSection = (sec) => {
    setOpenSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  const categoriesList = subCategories.length > 0
    ? subCategories
    : ['All Fruits', 'Citrus Fruits', 'Tropical Fruits', 'Berries', 'Dry Fruits'];

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h3 className="filter-title">Filters</h3>
        <button className="clear-all-btn" onClick={onClearFilters}>
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
              {categoriesList.map((cat, idx) => {
                const isSelected = selectedSubCategory === cat || (!selectedSubCategory && idx === 0);
                return (
                  <label key={cat} className="checkbox-filter-item">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onSelectSubCategory && onSelectSubCategory(cat)}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-label">{cat}</span>
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
                  max="2000"
                  step="10"
                  value={priceRange[1] || 2000}
                  onChange={(e) => onPriceChange && onPriceChange([priceRange[0], parseInt(e.target.value)])}
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
                <label key={cert} className="checkbox-filter-item">
                  <input
                    type="checkbox"
                    checked={selectedCerts.includes(cert)}
                    onChange={() => onToggleCert && onToggleCert(cert)}
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
  );
};
