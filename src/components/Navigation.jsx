import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, Home, ShoppingBag, Apple, Carrot, Sparkles, Droplet, TestTube, Sprout, Wheat, Cookie, GlassWater, UtensilsCrossed, ShieldCheck, Tag, BookOpen, ChevronDown, PhoneCall, PackageCheck } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export const Navigation = () => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const location = useLocation();

  const getCategoryIcon = (id) => {
    switch (id) {
      case 'fruits': return <Apple size={18} />;
      case 'vegetables': return <Carrot size={18} />;
      case 'cosmetics': return <Sparkles size={18} />;
      case 'hair-oils': return <Droplet size={18} />;
      case 'org-chemicals': return <TestTube size={18} />;
      case 'organic-food': return <Wheat size={18} />;
      case 'healthy-drinks': return <GlassWater size={18} />;
      case 'ready-to-eat': return <UtensilsCrossed size={18} />;
      case 'sanitary': return <ShieldCheck size={18} />;
      default: return <ShoppingBag size={18} />;
    }
  };

  return (
    <nav className="category-nav-bar">
      <div className="nav-container">
        {/* ALL CATEGORIES Green Button matching image1.png */}
        <div className="all-categories-wrapper">
          <button
            className={`all-categories-btn ${showAllCategories ? 'active' : ''}`}
            onClick={() => setShowAllCategories(!showAllCategories)}
          >
            <Menu size={18} className="all-cat-icon" />
            <span>ALL CATEGORIES</span>
            <ChevronDown size={14} className={`all-cat-chevron ${showAllCategories ? 'rotated' : ''}`} />
          </button>

          {showAllCategories && (
            <div className="all-categories-dropdown">
              {CATEGORIES.map(cat => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className={`dropdown-cat-item dropdown-link-${cat.id}`}
                  onClick={() => setShowAllCategories(false)}
                >
                  <span className="cat-dropdown-icon">{getCategoryIcon(cat.id)}</span>
                  <div className="cat-dropdown-info">
                    <span className="cat-dropdown-name">{cat.name}</span>
                    <span className="cat-dropdown-tag">{cat.tagline}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Horizontal Category Nav Links with Icons matching image1.png */}
        <div className="category-links-scroll">
          <NavLink to="/" className={({ isActive }) => `nav-cat-link link-home ${isActive ? 'active' : ''}`}>
            <Home size={18} className="nav-icon" />
            <span>Home</span>
          </NavLink>

          <NavLink to="/snacks-sweets" className={({ isActive }) => `nav-cat-link link-snacks-sweets ${isActive || location.pathname === '/category/snacks-sweets' ? 'active' : ''}`}>
            <Cookie size={18} className="nav-icon" />
            <span>Snacks & Sweets</span>
          </NavLink>

          <NavLink to="/healthy-drinks" className={({ isActive }) => `nav-cat-link link-healthy-drinks ${isActive || location.pathname === '/category/healthy-drinks' ? 'active' : ''}`}>
            <GlassWater size={18} className="nav-icon" />
            <span>Healthy Drinks</span>
          </NavLink>

          <NavLink to="/ready-to-eat" className={({ isActive }) => `nav-cat-link link-ready-to-eat ${isActive || location.pathname === '/category/ready-to-eat' ? 'active' : ''}`}>
            <UtensilsCrossed size={18} className="nav-icon" />
            <span>Ready to Eat</span>
          </NavLink>

          <NavLink to="/category/fruits" className={({ isActive }) => `nav-cat-link link-fruits ${isActive || location.pathname === '/fruits' ? 'active' : ''}`}>
            <Apple size={18} className="nav-icon" />
            <span>Fruits</span>
          </NavLink>

          <NavLink to="/category/vegetables" className={({ isActive }) => `nav-cat-link link-vegetables ${isActive ? 'active' : ''}`}>
            <Carrot size={18} className="nav-icon" />
            <span>Vegetables</span>
          </NavLink>

          <NavLink to="/category/cosmetics" className={({ isActive }) => `nav-cat-link link-cosmetics ${isActive ? 'active' : ''}`}>
            <Sparkles size={18} className="nav-icon" />
            <span>Cosmetics</span>
          </NavLink>

          <NavLink to="/category/hair-oils" className={({ isActive }) => `nav-cat-link link-hair-oils ${isActive ? 'active' : ''}`}>
            <Droplet size={18} className="nav-icon" />
            <span>Hair Oils</span>
          </NavLink>

          <NavLink to="/sanitary" className={({ isActive }) => `nav-cat-link link-sanitary ${isActive || location.pathname === '/category/sanitary' ? 'active' : ''}`}>
            <ShieldCheck size={18} className="nav-icon" />
            <span>Sanitary Care</span>
          </NavLink>

          <NavLink to="/category/org-chemicals" className={({ isActive }) => `nav-cat-link link-org-chemicals ${isActive ? 'active' : ''}`}>
            <TestTube size={18} className="nav-icon" />
            <span>Org Chemicals</span>
          </NavLink>

          <NavLink to="/category/organic-food" className={({ isActive }) => `nav-cat-link link-organic-food ${isActive ? 'active' : ''}`}>
            <Wheat size={18} className="nav-icon" />
            <span>Organic Food</span>
          </NavLink>

          <NavLink to="/category/everyday-essentials" className={({ isActive }) => `nav-cat-link link-essentials ${isActive || location.pathname === '/everyday-essentials' ? 'active' : ''}`}>
            <ShoppingBag size={18} className="nav-icon" />
            <span>Everyday Essentials</span>
          </NavLink>

          <NavLink to="/category/organic-products" className={({ isActive }) => `nav-cat-link link-organic-products ${isActive ? 'active' : ''}`}>
            <Sparkles size={18} className="nav-icon" />
            <span>Organic Products</span>
          </NavLink>

          <NavLink to="/combo-offers" className={({ isActive }) => `nav-cat-link link-combos ${isActive ? 'active' : ''}`}>
            <PackageCheck size={18} className="nav-icon" />
            <span>Combo Offers</span>
          </NavLink>

          <NavLink to="/offers" className={({ isActive }) => `nav-cat-link link-offers ${isActive ? 'active' : ''}`}>
            <Tag size={18} className="nav-icon" />
            <span>Offers</span>
          </NavLink>

          <NavLink to="/blog" className={({ isActive }) => `nav-cat-link link-blog ${isActive ? 'active' : ''}`}>
            <BookOpen size={18} className="nav-icon" />
            <span>Blog</span>
          </NavLink>

          <NavLink to="/contact" className={({ isActive }) => `nav-cat-link link-contact ${isActive ? 'active' : ''}`}>
            <PhoneCall size={18} className="nav-icon" />
            <span>Contact Us</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
