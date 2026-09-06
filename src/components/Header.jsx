import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Package, Heart, ShoppingCart, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { PRODUCTS } from '../data/products';
import { Logo } from './Logo';

export const Header = ({ onOpenMobileMenu }) => {
  const navigate = useNavigate();
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, openAuthModal, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const filtered = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q)
      ).slice(0, 5);
      setSearchResults(filtered);
      setShowSearchDropdown(true);
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchDropdown(false);
    }
  };

  const handleSelectProduct = (product) => {
    navigate(`/product/${product.id}`);
    setShowSearchDropdown(false);
    setSearchQuery('');
  };

  return (
    <header className="main-header">
      <div className="header-container">
        {/* Mobile Hamburger */}
        <button className="mobile-hamburger-btn" onClick={onOpenMobileMenu} aria-label="Open menu">
          <Menu size={24} />
        </button>

        {/* Brand Logo matching reference */}
        <Logo size="big" />

        {/* Search Bar matching image1.png */}
        <div className="header-search-wrapper" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              className="search-input"
              placeholder="Search for organic products, categories and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim().length > 1 && setShowSearchDropdown(true)}
            />
            <button type="submit" className="search-btn" aria-label="Search">
              <Search size={18} />
            </button>
          </form>

          {showSearchDropdown && (
            <div className="search-dropdown">
              {searchResults.length > 0 ? (
                <>
                  <div className="dropdown-header">Matching Products ({searchResults.length})</div>
                  {searchResults.map(product => (
                    <div
                      key={product.id}
                      className="search-result-item"
                      onClick={() => handleSelectProduct(product)}
                    >
                      <img src={product.image} alt={product.name} className="result-img" />
                      <div className="result-info">
                        <div className="result-name">{product.name}</div>
                        <div className="result-meta">
                          <span className="result-cat">{product.category}</span>
                          <span className="result-price">₹{product.price} / {product.unit}</span>
                        </div>
                      </div>
                      <ArrowRight size={16} className="result-arrow" />
                    </div>
                  ))}
                </>
              ) : (
                <div className="search-no-results">
                  No organic products found for "{searchQuery}".
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="header-actions">
          <Link 
            to="/login" 
            className="header-action-item"
            title="Login or Create Account"
          >
            <User size={20} className="action-icon" />
            <span className="action-label">Login / Sign Up</span>
          </Link>

          <Link to="/orders" className="header-action-item">
            <Package size={20} className="action-icon" />
            <span className="action-label">My Orders</span>
          </Link>

          <Link to="/wishlist" className="header-action-item wishlist-item" title="Wishlist">
            <Heart size={20} className="action-icon" />
            {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
          </Link>

          <button
            className="header-action-item cart-action-btn"
            onClick={() => setIsCartOpen(true)}
            title="Cart"
          >
            <div className="cart-icon-wrapper">
              <ShoppingCart size={20} className="action-icon" />
              <span className="cart-badge">{cartCount}</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
