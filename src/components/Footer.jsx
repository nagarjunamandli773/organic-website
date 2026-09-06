import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, ShieldCheck, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Logo } from './Logo';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useCart();

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      showToast('Thank you for subscribing to Klan Organics newsletter!');
      setEmail('');
    }
  };

  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div className="footer-col brand-col">
            <div style={{ marginBottom: '12px' }}>
              <Logo variant="light" size="big" />
            </div>
            <p className="footer-about-text">
              Klan Organics is committed to bringing you 100% certified organic fruits, vegetables, natural cosmetics, herbal hair oils, and eco-friendly farming solutions directly from sustainable farms.
            </p>
            <div className="footer-trust-mini">
              <ShieldCheck size={16} />
              <span>Certified 100% Organic & Chemical Free</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/combo-offers">Combo Offers</Link></li>
              <li><Link to="/offers">Special Offers</Link></li>
              <li><Link to="/about">About Us & Story</Link></li>
              <li><Link to="/blog">Organic Journal / Blog</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/orders">My Orders</Link></li>
              <li><Link to="/track-order">Track Order</Link></li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="footer-col">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links-list">
              <li><Link to="/healthy-drinks">Healthy Drinks & Elixirs</Link></li>
              <li><Link to="/ready-to-eat">Ready to Eat Meals</Link></li>
              <li><Link to="/category/fruits">Organic Fruits</Link></li>
              <li><Link to="/category/vegetables">Organic Vegetables</Link></li>
              <li><Link to="/category/cosmetics">Natural Cosmetics</Link></li>
              <li><Link to="/category/hair-oils">Ayurvedic Hair Oils</Link></li>
              <li><Link to="/category/org-chemicals">Organic Farming Chemicals</Link></li>
              <li><Link to="/category/organic-food">Wholesome Organic Food</Link></li>
              <li><Link to="/category/everyday-essentials">Everyday Essentials</Link></li>
              <li><Link to="/category/organic-products">Certified Organic Products</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Newsletter */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Contact Us</h4>
            <div className="contact-item">
              <MapPin size={16} className="contact-icon" />
              <span>123 Organic Street, Green City, Earth - 560001</span>
            </div>
            <div className="contact-item">
              <Phone size={16} className="contact-icon" />
              <span>+91 98765 43210</span>
            </div>
            <div className="contact-item">
              <Mail size={16} className="contact-icon" />
              <span>support@klanorganics.com</span>
            </div>

            <div className="footer-newsletter">
              <h5 className="newsletter-title">Subscribe to Newsletter</h5>
              <form onSubmit={handleNewsletter} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-btn">
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright-text">
            © {new Date().getFullYear()} Klan Organics. All rights reserved. Natural Living, Healthy Giving.
          </div>
          <div className="payment-icons-row">
            <span className="pay-badge">🔒 256-Bit SSL Secure Checkout</span>
            <span className="pay-badge">UPI / Cards / NetBanking / COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
