import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ size = 'default', variant = 'dark', className = '' }) => {
  let logoHeight = 80;
  if (typeof size === 'number') {
    logoHeight = size;
  } else if (size === 'big' || size === 'large') {
    logoHeight = 104;
  } else if (size === 'xlarge' || size === 'huge') {
    logoHeight = 130;
  } else if (size === 'compact' || size === 'small') {
    logoHeight = 54;
  } else if (size === 'default') {
    logoHeight = 80;
  }

  const isLight = variant === 'light';

  return (
    <Link 
      to="/" 
      className={`klan-brand-logo-link ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        lineHeight: 1,
        verticalAlign: 'middle',
        flexShrink: 0,
        height: 'auto',
        margin: 0,
        padding: 0,
        transition: 'transform 0.25s ease',
        cursor: 'pointer'
      }}
    >
      <div
        className="logo-img-wrapper"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'auto',
          padding: isLight ? '6px 16px' : '0',
          background: isLight ? '#ffffff' : 'transparent',
          borderRadius: isLight ? '14px' : '0',
          boxShadow: isLight ? '0 4px 16px rgba(0,0,0,0.18)' : 'none',
          transition: 'all 0.25s ease'
        }}
      >
        <img
          src="/klan_organics_logo.png"
          alt="Klan Organics - Pure by Nature Better for Tomorrow"
          style={{
            height: isLight ? `${Math.round(logoHeight * 0.88)}px` : `${logoHeight}px`,
            width: 'auto',
            maxHeight: '100%',
            objectFit: 'contain',
            display: 'block',
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.06))',
            transition: 'all 0.25s ease'
          }}
        />
      </div>
    </Link>
  );
};




