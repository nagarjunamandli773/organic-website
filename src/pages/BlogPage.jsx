import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Calendar, Clock, ChevronRight, Leaf, Sparkles, Sprout, Heart, Sun, Apple, ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import { BLOG_POSTS, POPULAR_POSTS } from '../data/blogPosts';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailsModal } from '../components/ProductDetailsModal';
import { useCart } from '../context/CartContext';

export const BlogPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { addToCart, showToast } = useCart();

  // Curated lists of products for different sections in blog page
  const sidebarProducts = PRODUCTS.filter(p => ['c-1', 'h-3', 'of-1'].includes(p.id));
  const recommendedProducts = PRODUCTS.filter(p => ['f-1', 'v-2', 'oc-1', 'fer-1'].includes(p.id));

  const categories = [
    { name: 'Nutrition', count: 8, icon: Apple },
    { name: 'Beauty', count: 6, icon: Sparkles },
    { name: 'Sustainability', count: 7, icon: Leaf },
    { name: 'Gardening', count: 5, icon: Sprout },
    { name: 'Lifestyle', count: 6, icon: Sun },
    { name: 'Wellness', count: 5, icon: Heart },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      showToast('Thank you for subscribing to our newsletter!');
      setNewsletterEmail('');
    }
  };

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="blog-exact-page">
      {/* 1. Top Hero Banner */}
      <div className="blog-exact-banner">
        <div className="blog-banner-left">
          <h1 className="blog-banner-title">Our Blog</h1>
          <div className="blog-banner-underline"></div>
          <p className="blog-banner-subtitle">
            Tips, guides & insights for a healthier, greener lifestyle
          </p>
        </div>
        <div className="blog-banner-right-img">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80" 
            alt="Go green leaves & coffee" 
            className="banner-foliage-img"
          />
        </div>
      </div>

      {/* 2. Breadcrumbs & Back */}
      <div className="blog-breadcrumbs" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
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
          <span className="crumb-separator">&gt;</span>
          <span className="current-crumb">Blog</span>
        </div>
      </div>

      {/* 3. Main Two-Column Layout */}
      <div className="blog-layout-container">
        {/* Left Column: Latest Articles */}
        <main className="blog-left-content">
          {/* Header Row: Title & Search */}
          <div className="blog-section-header">
            <h2 className="latest-articles-title">Latest Articles</h2>
            <div className="blog-search-box">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="blog-search-input"
              />
              <button className="blog-search-btn" type="button">
                <Search size={16} />
              </button>
            </div>
          </div>

          {/* 3-Column Articles Grid */}
          <div className="blog-articles-grid-3col">
            {filteredPosts.map((post) => (
              <article key={post.id} className="blog-article-card">
                <div className="article-img-wrapper">
                  <img src={post.image} alt={post.title} className="article-card-img" />
                </div>
                <div className="article-card-content">
                  <span className="article-cat-pill">{post.category}</span>
                  <h3 className="article-title">{post.title}</h3>
                  <p className="article-summary">{post.summary}</p>
                  <div className="article-meta-row">
                    <span className="meta-item">
                      <Calendar size={13} className="meta-icon" />
                      {post.date}
                    </span>
                    <span className="meta-item">
                      <Clock size={13} className="meta-icon" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="load-more-container">
            <button className="load-more-btn" type="button">
              Load More Articles
            </button>
          </div>

          {/* Recommended Organic Products Section */}
          <div className="blog-recommended-products-section">
            <h3 className="blog-recommended-title">Recommended Products for Organic Lifestyle</h3>
            <div className="blog-recommended-underline"></div>
            <div className="blog-recommended-grid">
              {recommendedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          </div>
        </main>

        {/* Right Column: Sidebar */}
        <aside className="blog-right-sidebar">
          {/* Widget 1: Categories */}
          <div className="blog-sidebar-box">
            <h3 className="sidebar-box-title">Categories</h3>
            <ul className="sidebar-cat-list">
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = selectedCategory === cat.name;
                return (
                  <li key={cat.name}>
                    <button
                      className={`sidebar-cat-item ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(isSelected ? 'All' : cat.name)}
                    >
                      <div className="sidebar-cat-left">
                        <span className="cat-icon-wrap">
                          <IconComponent size={14} />
                        </span>
                        <span className="cat-name-text">{cat.name}</span>
                      </div>
                      <div className="sidebar-cat-right">
                        <span className="cat-badge-count">{cat.count}</span>
                        <ChevronRight size={14} className="cat-chevron" />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Widget 2: Popular Posts */}
          <div className="blog-sidebar-box">
            <h3 className="sidebar-box-title">Popular Posts</h3>
            <div className="popular-posts-list">
              {POPULAR_POSTS.map((pop) => (
                <div key={pop.id} className="popular-post-item">
                  <img src={pop.image} alt={pop.title} className="popular-post-thumb" />
                  <div className="popular-post-details">
                    <h4 className="popular-post-title">{pop.title}</h4>
                    <span className="popular-post-date">{pop.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Widget 2.5: Featured Products */}
          <div className="blog-sidebar-box">
            <h3 className="sidebar-box-title">Featured Products</h3>
            <div className="sidebar-featured-products">
              {sidebarProducts.map((prod) => (
                <div key={prod.id} className="sidebar-product-item" onClick={() => setQuickViewProduct(prod)}>
                  <img src={prod.image} alt={prod.name} className="sidebar-prod-thumb" />
                  <div className="sidebar-prod-details">
                    <h4 className="sidebar-prod-title">{prod.name}</h4>
                    <div className="sidebar-prod-meta">
                      <span className="sidebar-prod-price">₹{prod.price}</span>
                      <span className="sidebar-prod-unit">/{prod.unit || 'kg'}</span>
                    </div>
                    <div className="sidebar-prod-rating">
                      <Star size={11} fill="#eab308" stroke="#eab308" />
                      <span className="rating-val">{prod.rating}</span>
                    </div>
                  </div>
                  <button
                    className="sidebar-prod-add-btn"
                    title="Add to Cart"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(prod, 1);
                      showToast(`Added ${prod.name} to cart!`);
                    }}
                  >
                    <ShoppingCart size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Widget 3: Stay Updated! (Newsletter) */}
          <div className="stay-updated-card">
            <h3 className="stay-updated-title">Stay Updated!</h3>
            <p className="stay-updated-sub">
              Subscribe to our newsletter and get the latest tips & offers.
            </p>
            <form onSubmit={handleSubscribe} className="stay-updated-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="stay-updated-input"
              />
              <button type="submit" className="stay-updated-btn">
                Subscribe
              </button>
            </form>
          </div>
        </aside>
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
