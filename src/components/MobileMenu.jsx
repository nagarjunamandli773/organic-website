import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { X, Home, ShoppingBag, Apple, Carrot, Sparkles, Droplet, TestTube, Sprout, Wheat, Tag, BookOpen, User, Info, Phone, Heart, PackageCheck, UtensilsCrossed } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { Logo } from './Logo';

export const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-menu-header">
          <div onClick={onClose}>
            <Logo size="compact" />
          </div>
          <button className="close-menu-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="mobile-menu-body">
          <div className="mobile-nav-group">
            <div className="group-title">Navigation</div>
            <NavLink to="/" onClick={onClose} className="mobile-nav-item">
              <Home size={18} />
              <span>Home</span>
            </NavLink>
            <NavLink to="/products" onClick={onClose} className="mobile-nav-item">
              <ShoppingBag size={18} />
              <span>All Products</span>
            </NavLink>
            <NavLink to="/healthy-drinks" onClick={onClose} className="mobile-nav-item">
              <Sparkles size={18} />
              <span>Healthy Drinks</span>
            </NavLink>
            <NavLink to="/ready-to-eat" onClick={onClose} className="mobile-nav-item">
              <UtensilsCrossed size={18} />
              <span>Ready to Eat</span>
            </NavLink>
            <NavLink to="/combo-offers" onClick={onClose} className="mobile-nav-item">
              <PackageCheck size={18} />
              <span>Combo Offers</span>
            </NavLink>
            <NavLink to="/offers" onClick={onClose} className="mobile-nav-item">
              <Tag size={18} />
              <span>Best Offers</span>
            </NavLink>
            <NavLink to="/blog" onClick={onClose} className="mobile-nav-item">
              <BookOpen size={18} />
              <span>Organic Blog</span>
            </NavLink>
            <NavLink to="/about" onClick={onClose} className="mobile-nav-item">
              <Info size={18} />
              <span>About Us</span>
            </NavLink>
            <NavLink to="/contact" onClick={onClose} className="mobile-nav-item">
              <Phone size={18} />
              <span>Contact Us</span>
            </NavLink>
            <NavLink to="/login" onClick={onClose} className="mobile-nav-item">
              <User size={18} />
              <span>Login / Sign Up</span>
            </NavLink>
            <NavLink to="/orders" onClick={onClose} className="mobile-nav-item">
              <User size={18} />
              <span>My Orders & Account</span>
            </NavLink>
            <NavLink to="/wishlist" onClick={onClose} className="mobile-nav-item">
              <Heart size={18} />
              <span>My Wishlist</span>
            </NavLink>
          </div>

          <div className="mobile-nav-group">
            <div className="group-title">Shop by Category</div>
            {CATEGORIES.map(cat => (
              <NavLink
                key={cat.id}
                to={`/category/${cat.slug}`}
                onClick={onClose}
                className="mobile-nav-item"
              >
                <span>{cat.name}</span>
                <span className="cat-badge">{cat.tagline}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
