import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Heart, Leaf, Award, Users, CheckCircle, ArrowLeft } from 'lucide-react';
import { handleBackNavigation } from '../utils/navigation';

export const AboutPage = () => {
  const navigate = useNavigate();
  const stats = [
    { number: '10+', label: 'Years of Trust' },
    { number: '500+', label: 'Organic Products' },
    { number: '25K+', label: 'Happy Customers' },
    { number: '100%', label: 'Satisfaction' }
  ];

  const benefits = [
    'Natural & Fresh produce directly from certified organic farms',
    'Zero chemical pesticides or synthetic growth agents used',
    'Sustainable eco-friendly farming & biodegradable packaging',
    '100% transparent soil-to-table quality control verification'
  ];

  return (
    <div className="about-page">
      <div style={{ marginBottom: '12px' }}>
        <button 
          type="button"
          onClick={(e) => handleBackNavigation(navigate, e)} 
          className="back-arrow-btn"
          title="Go back to previous page"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </div>
      {/* Hero Section matching Panel 4 */}
      <section className="about-hero-section">
        <div className="about-hero-grid">
          <div className="about-hero-text">
            <span className="about-tag">ABOUT KLAN ORGANICS</span>
            <h1 className="about-title serif-heading">We Provide 100% Organic Products</h1>
            <p className="about-desc">
              We believe in a healthy lifestyle and a sustainable future. Our mission is to deliver the highest quality organic produce, natural beauty care, and eco-friendly farming inputs directly to your door.
            </p>

            <ul className="about-benefits-list">
              {benefits.map((b, idx) => (
                <li key={idx}>
                  <CheckCircle size={18} className="check-icon" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="about-hero-visual">
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80"
              alt="Organic farm farmer"
              className="about-farmer-img"
            />
          </div>
        </div>

        {/* 4 Stats Bar matching Panel 4 */}
        <div className="stats-counter-bar">
          {stats.map((s, idx) => (
            <div key={idx} className="stat-box">
              <div className="stat-num">{s.number}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="about-values-section">
        <h2 className="section-title text-center">Why Choose Klan Organics</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon-box"><Leaf size={28} /></div>
            <h3>100% Certified Organic</h3>
            <p>Every product is certified under NPOP standards (Jaivik Bharat / India Organic) guaranteeing authentic purity.</p>
          </div>
          <div className="value-card">
            <div className="value-icon-box"><ShieldCheck size={28} /></div>
            <h3>Direct Farm Sourcing</h3>
            <p>We partner directly with organic farmers across India to ensure fair trade and fresh daily harvests.</p>
          </div>
          <div className="value-card">
            <div className="value-icon-box"><Heart size={28} /></div>
            <h3>Natural & Chemical Free</h3>
            <p>From fruits to hair oils and bio-pesticides, our range contains zero artificial preservatives or toxins.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
