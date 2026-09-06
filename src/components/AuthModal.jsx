import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Sparkles, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, authModalTab, setAuthModalTab, login } = useAuth();
  const { showToast } = useCart();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  if (!isAuthModalOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authModalTab === 'register') {
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
    } else {
      login({
        name: formData.email ? formData.email.split('@')[0] : 'Customer',
        email: formData.email || 'customer@klanorganics.com',
        phone: '+91 98765 43210'
      });
      showToast('Welcome back to Klan Organics!');
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
  };

  return (
    <div className="product-modal-overlay" onClick={closeAuthModal} style={{ zIndex: 2200 }}>
      <div 
        className="login-register-card" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          width: '90%', 
          maxWidth: '460px', 
          position: 'relative', 
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        <button 
          onClick={closeAuthModal}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#f1f5f9',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
          aria-label="Close modal"
        >
          <X size={18} color="#64748b" />
        </button>

        <div className="login-tabs-header">
          <button 
            type="button" 
            className={`login-tab-btn ${authModalTab === 'login' ? 'active' : ''}`}
            onClick={() => setAuthModalTab('login')}
          >
            Log In
          </button>
          <button 
            type="button" 
            className={`login-tab-btn ${authModalTab === 'register' ? 'active' : ''}`}
            onClick={() => setAuthModalTab('register')}
          >
            Create Account
          </button>
        </div>

        <div className="login-form-body">
          <div className="auth-form-elements">
            <h2>{authModalTab === 'login' ? 'Welcome Back!' : 'Join Klan Organics'}</h2>
            <p className="auth-sub-desc">
              {authModalTab === 'login' 
                ? 'Log in to manage orders, addresses & wishlist.' 
                : 'Create an account for 100% organic, farm-fresh shopping.'}
            </p>

            <form onSubmit={handleSubmit}>
              {authModalTab === 'register' && (
                <div className="form-group">
                  <label htmlFor="modal-name">Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      id="modal-name"
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
                <label htmlFor="modal-email">Email Address or Phone</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    id="modal-email"
                    type="text" 
                    name="email" 
                    placeholder="name@example.com or phone"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ paddingLeft: '40px' }}
                    required
                  />
                  <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              {authModalTab === 'register' && (
                <div className="form-group">
                  <label htmlFor="modal-phone">Phone Number</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      id="modal-phone"
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
                <label htmlFor="modal-password">Password</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    id="modal-password"
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

              {authModalTab === 'register' && (
                <div className="form-group">
                  <label htmlFor="modal-confirmPassword">Confirm Password</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      id="modal-confirmPassword"
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

              {authModalTab === 'login' && (
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

              <button type="submit" className="btn-solid-green auth-action-btn" style={{ marginTop: authModalTab === 'register' ? '16px' : '0' }}>
                <span>{authModalTab === 'login' ? 'Log In' : 'Create Account'}</span>
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
                padding: '10px', 
                fontSize: '13px', 
                fontWeight: 700, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '8px' 
              }}
            >
              <Sparkles size={16} />
              <span>One-Click Demo Login</span>
            </button>

            <div style={{ marginTop: '16px', fontSize: '11px', color: '#64748b', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <ShieldCheck size={14} color="#166534" />
              <span>Your data is 100% encrypted & protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
