import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, Phone, Sparkles, ArrowRight, ShieldCheck, Eye, EyeOff, ArrowLeft, ChevronRight, Leaf, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showToast } = useCart();

  // Tab state: check path or query parameter
  const initialTab = location.pathname.includes('signup') || location.pathname.includes('register') ? 'register' : 'login';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'register') {
      if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
        showToast('Passwords do not match!', 'error');
        return;
      }
      login({
        name: formData.name || 'Customer',
        email: formData.email || 'customer@klanorganics.com',
        phone: formData.phone || '+91 98765 43210'
      });
      showToast('Account created successfully! Welcome to Klan Organics.');
      navigate('/orders');
    } else {
      login({
        name: formData.email ? formData.email.split('@')[0] : 'Customer',
        email: formData.email || 'customer@klanorganics.com',
        phone: '+91 98765 43210'
      });
      showToast('Welcome back to Klan Organics!');
      navigate('/orders');
    }
  };

  const handleDemoLogin = () => {
    login({
      name: 'Bhargavi Mandli',
      email: 'bhargavi@klanorganics.com',
      phone: '+91 98765 43210',
      location: 'Bangalore - 560001'
    });
    showToast('Logged in as Demo User successfully!');
    navigate('/orders');
  };

  return (
    <div className="login-page-container">
      {/* Breadcrumb & Navigation */}
      <div className="combo-nav-breadcrumbs" style={{ marginBottom: '20px' }}>
        <button
          onClick={() => navigate(-1)}
          className="back-arrow-btn"
          title="Go back to previous page"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="breadcrumbs-right">
          <Link to="/">Home</Link>
          <ChevronRight size={13} className="crumb-chevron" />
          <span className="current-crumb">{activeTab === 'login' ? 'Login' : 'Sign Up'}</span>
        </div>
      </div>

      {/* Main Split Grid Card */}
      <div className="login-page-grid-card">
        {/* Left Organic Showcase Panel */}
        <div className="login-showcase-panel">
          <div className="showcase-content">
            <div className="showcase-badge">
              <Leaf size={16} />
              <span>100% CERTIFIED ORGANIC</span>
            </div>

            <h2 className="showcase-title">
              Nourish Your Life with Nature's Best
            </h2>

            <p className="showcase-desc">
              Join over 50,000+ healthy families getting farm-fresh organic produce, cold-pressed oils, and natural wellness products delivered straight to their doorstep.
            </p>

            <ul className="showcase-benefits-list">
              <li>
                <CheckCircle2 size={18} className="benefit-check" />
                <span>Chemical-Free & Farm Fresh Produce</span>
              </li>
              <li>
                <CheckCircle2 size={18} className="benefit-check" />
                <span>Exclusive Member Discounts & Combo Packs</span>
              </li>
              <li>
                <CheckCircle2 size={18} className="benefit-check" />
                <span>Real-Time Order Tracking & Easy Returns</span>
              </li>
              <li>
                <CheckCircle2 size={18} className="benefit-check" />
                <span>256-Bit SSL Encrypted 100% Safe Payments</span>
              </li>
            </ul>

            <div className="showcase-footer-trust">
              <ShieldCheck size={20} />
              <span>Certified Organic • Sustainably Sourced • Zero Chemicals</span>
            </div>
          </div>
        </div>

        {/* Right Interactive Form Area */}
        <div className="login-form-panel">
          {/* Tabs */}
          <div className="login-tabs-header">
            <button
              type="button"
              className={`login-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Log In
            </button>
            <button
              type="button"
              className={`login-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Create Account
            </button>
          </div>

          <div className="login-form-body">
            <div className="auth-form-elements">
              <h2>{activeTab === 'login' ? 'Welcome Back!' : 'Create Your Account'}</h2>
              <p className="auth-sub-desc">
                {activeTab === 'login'
                  ? 'Sign in to access your orders, saved addresses & wishlist.'
                  : 'Register now to start shopping 100% organic products with special offers.'}
              </p>

              <form onSubmit={handleSubmit}>
                {activeTab === 'register' && (
                  <div className="form-group">
                    <label htmlFor="page-name">Full Name</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        id="page-name"
                        type="text"
                        name="name"
                        placeholder="e.g. Bhargavi Mandli"
                        value={formData.name}
                        onChange={handleChange}
                        style={{ paddingLeft: '40px' }}
                        required
                      />
                      <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="page-email">Email Address or Phone</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="page-email"
                      type="text"
                      name="email"
                      placeholder="name@example.com or phone number"
                      value={formData.email}
                      onChange={handleChange}
                      style={{ paddingLeft: '40px' }}
                      required
                    />
                    <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>

                {activeTab === 'register' && (
                  <div className="form-group">
                    <label htmlFor="page-phone">Phone Number</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        id="page-phone"
                        type="tel"
                        name="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        style={{ paddingLeft: '40px' }}
                      />
                      <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="page-password">Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="page-password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      style={{ paddingLeft: '40px', paddingRight: '40px' }}
                      required
                    />
                    <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#94a3b8'
                      }}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {activeTab === 'register' && (
                  <div className="form-group">
                    <label htmlFor="page-confirmPassword">Confirm Password</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        id="page-confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        style={{ paddingLeft: '40px', paddingRight: '40px' }}
                        required
                      />
                      <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#94a3b8'
                        }}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'login' && (
                  <div className="auth-helper-row">
                    <label className="remember-me-checkbox" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0 }}>
                      <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px', margin: 0, padding: 0, cursor: 'pointer' }} />
                      <span>Remember me</span>
                    </label>
                    <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast('Password reset link sent to your email.'); }} className="forgot-password">
                      Forgot Password?
                    </a>
                  </div>
                )}

                <button type="submit" className="btn-solid-green auth-action-btn" style={{ marginTop: activeTab === 'register' ? '16px' : '0' }}>
                  <span>{activeTab === 'login' ? 'Log In' : 'Create Account'}</span>
                  <ArrowRight size={18} />
                </button>
              </form>

              <div style={{ margin: '20px 0 12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
                <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
              </div>

              <button
                type="button"
                onClick={handleDemoLogin}
                className="btn-outline-green"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  borderRadius: '10px'
                }}
              >
                <Sparkles size={16} />
                <span>One-Click Demo Login</span>
              </button>

              <div style={{ marginTop: '20px', fontSize: '12px', color: '#64748b', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#166534" />
                <span>Your personal information is 100% secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
