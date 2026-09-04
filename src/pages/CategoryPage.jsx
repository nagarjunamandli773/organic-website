import React, { useState, useMemo } from 'react';
import { useParams, Link, useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowRight, Leaf, ArrowLeft } from 'lucide-react';
import { FilterSidebar } from '../components/FilterSidebar';
import { ProductGrid } from '../components/ProductGrid';
import { ProductDetailsModal } from '../components/ProductDetailsModal';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';

export const CategoryPage = () => {
  const navigate = useNavigate();
  const { categorySlug } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const searchQueryParam = searchParams.get('search');

  const pathSlug = location.pathname.replace(/^\/category\//, '').replace(/^\//, '');
  const isAllProducts = location.pathname === '/products' || categorySlug === 'products';
  const currentCategorySlug = isAllProducts ? 'all' : (categorySlug || pathSlug || 'fruits');

  const categoryMeta = useMemo(() => {
    if (isAllProducts) {
      return {
        id: 'all',
        name: 'All Products',
        fullName: 'Organic Products',
        slug: 'products',
        description: 'Enjoy the goodness of nature with our wide range of fresh, organic products. Handpicked for quality, freshness, and nutrition.',
        bannerTitle: 'Organic Products',
        bannerSub: 'Pure, Natural & Sustainably Sourced',
        bannerImage: '/images/fruits_hero_banner.jpg',
        subCategories: ['All Products']
      };
    }
    return CATEGORIES.find(c => c.slug === currentCategorySlug) || {
      id: currentCategorySlug,
      name: currentCategorySlug.charAt(0).toUpperCase() + currentCategorySlug.slice(1),
      fullName: `Organic ${currentCategorySlug.charAt(0).toUpperCase() + currentCategorySlug.slice(1)}`,
      slug: currentCategorySlug,
      description: 'Enjoy the goodness of nature with our wide range of fresh, organic fruits. Handpicked for quality, freshness, and nutrition.',
      bannerTitle: "Nature's Sweetest Gift, Just for You",
      bannerSub: 'Handpicked Organic Fruits for a Healthy You',
      bannerImage: '/images/fruits_hero_banner.jpg',
      subCategories: ['All Fruits', 'Citrus Fruits', 'Tropical Fruits', 'Berries', 'Dry Fruits']
    };
  }, [currentCategorySlug, isAllProducts]);

  const defaultSubCat = categoryMeta.subCategories ? categoryMeta.subCategories[0] : 'All Items';
  const [selectedSubCategory, setSelectedSubCategory] = useState(defaultSubCat);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCerts, setSelectedCerts] = useState([]);
  const [sortBy, setSortBy] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Sync subcategory & reset page when category or filters change
  React.useEffect(() => {
    const defaultCat = categoryMeta.subCategories ? categoryMeta.subCategories[0] : 'All Items';
    setSelectedSubCategory(defaultCat);
    setCurrentPage(1);
  }, [currentCategorySlug, categoryMeta]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubCategory, priceRange, selectedCerts, sortBy, searchQueryParam]);

  // Filter products logic
  const filteredProducts = useMemo(() => {
    let list = isAllProducts
      ? PRODUCTS
      : PRODUCTS.filter(p =>
          p.categoryId === currentCategorySlug ||
          p.category.toLowerCase() === currentCategorySlug.toLowerCase()
        );

    if (searchQueryParam) {
      const q = searchQueryParam.toLowerCase();
      list = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    } else if (selectedSubCategory && !selectedSubCategory.startsWith('All ')) {
      list = list.filter(p => p.subCategory === selectedSubCategory);
    }

    // Price filter
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Certification filter
    if (selectedCerts.length > 0) {
      list = list.filter(p => selectedCerts.includes(p.certification));
    }

    // Sort
    return [...list].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0; // Default popularity order
    });
  }, [currentCategorySlug, isAllProducts, searchQueryParam, selectedSubCategory, priceRange, selectedCerts, sortBy]);

  const handleToggleCert = (cert) => {
    setSelectedCerts(prev =>
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    );
  };

  const handleClearFilters = () => {
    setSelectedSubCategory(defaultSubCat);
    setPriceRange([0, 2000]);
    setSelectedCerts([]);
    setCurrentPage(1);
  };

  // Pagination calculations (12 items per page)
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

  return (
    <div className="fruits-category-page">
      {/* Top Header Banner Row matching Reference Image */}
      <div className="fruits-header-container">
        {/* Left Info Column */}
        <div className="fruits-header-left">
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
              <ChevronRight size={13} className="crumb-chevron" />
              <Link to="/products">Categories</Link>
              <ChevronRight size={13} className="crumb-chevron" />
              <span className="current-crumb">{categoryMeta.name}</span>
            </div>
          </div>

          <h1 className="fruits-page-title">{categoryMeta.fullName || categoryMeta.name}</h1>

          <p className="fruits-page-description">
            {categoryMeta.description}
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

        {/* Right Hero Banner Card */}
        <div className="fruits-hero-card">
          <div className="banner-badge-organic">
            <span>100%</span>
            <span>ORGANIC</span>
          </div>

          <div className="banner-content">
            <h2 className="banner-title">
              {categoryMeta.bannerTitle || "Nature's Sweetest Gift, Just for You"}
            </h2>
            <p className="banner-subtitle">
              {categoryMeta.bannerSub || "Handpicked Organic Fruits for a Healthy You"}
            </p>
            <button className="banner-shop-btn" type="button">
              <span>Shop Now</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="banner-image-wrapper">
            <img
              src={categoryMeta.bannerImage || '/images/fruits_hero_banner.jpg'}
              alt={categoryMeta.name}
              className="banner-fruits-img"
            />
          </div>
        </div>
      </div>

      {/* Main Layout Grid (Sidebar + Products) */}
      <div className="category-layout">
        {/* Left Filter Sidebar */}
        <FilterSidebar
          categories={CATEGORIES}
          selectedCategory={currentCategorySlug}
          subCategories={categoryMeta.subCategories || []}
          selectedSubCategory={selectedSubCategory}
          onSelectSubCategory={setSelectedSubCategory}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          selectedCerts={selectedCerts}
          onToggleCert={handleToggleCert}
          onClearFilters={handleClearFilters}
        />

        {/* Right Product Grid Content Area */}
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

          {/* Product Cards Grid */}
          <ProductGrid
            products={displayedProducts}
            onQuickView={setQuickViewProduct}
            emptyMessage={`No organic ${categoryMeta.name.toLowerCase()} found matching your current filters.`}
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
