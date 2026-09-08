import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { handleBackNavigation } from '../utils/navigation';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-desc">
          Oops! The organic page you are looking for does not exist or has been moved.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            type="button" 
            onClick={(e) => handleBackNavigation(navigate, e)} 
            className="btn-outline-green back-home-btn"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>

          <Link to="/" className="btn-solid-green back-home-btn">
            <Home size={18} />
            <span>Go Back Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
