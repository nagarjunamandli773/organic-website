import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-desc">
          Oops! The organic page you are looking for does not exist or has been moved.
        </p>

        <Link to="/" className="btn-solid-green back-home-btn">
          <Home size={18} />
          <span>Go Back Home</span>
        </Link>
      </div>
    </div>
  );
};
