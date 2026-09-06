import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ size = 'default', variant = 'dark', className = '', width = null }) => {
  // Impressive, big logo matching reference image with flush left-alignment
  let containerHeight = 90;
  let minWidth = 240;

  if (typeof size === 'number') {
    containerHeight = size;
    minWidth = size * 2.5;
  } else if (size === 'big' || size === 'large' || size === 'xlarge') {
    containerHeight = 108; // Big logo height requested by user in reference image
    minWidth = 220;        // Tight width fitting right edge of graphic
  } else if (size === 'compact' || size === 'small') {
    containerHeight = 52;
    minWidth = 140;
  }

  const customWidthStyle = width ? (typeof width === 'number' ? `${width}px` : width) : `${minWidth}px`;

  return (
    <Link 
      to="/" 
      className={`klan-brand-logo-link ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textDecoration: 'none',
        lineHeight: 1,
        verticalAlign: 'middle',
        flexShrink: 0,
        width: customWidthStyle,
        minWidth: customWidthStyle,
        height: `${containerHeight}px`,
        margin: '0 4px 0 0',
        padding: '0',
        transition: 'transform 0.25s ease'
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          overflow: 'hidden',
          height: `${containerHeight}px`,
          width: '100%',
          position: 'relative',
          padding: '0',
          margin: '0',
          background: 'transparent'
        }}
      >
        <img
          src="/images/klan_organics_logo.jpg"
          alt="KLAN ORGANICS - Natural Living, Healthy Giving"
          className="klan-logo-img"
          style={{
            height: '100%',
            width: 'auto',
            maxHeight: `${containerHeight}px`,
            objectFit: 'contain',
            display: 'block',
            mixBlendMode: variant === 'light' ? 'screen' : 'multiply',
            filter: variant === 'light' 
              ? 'brightness(0) invert(1)' 
              : 'contrast(1.08) brightness(0.98)',
            transform: 'scale(1.35)',
            transformOrigin: 'left center',
            transition: 'all 0.25s ease'
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/fruits_hero_banner.jpg';
          }}
        />
      </div>
    </Link>
  );
};

export default Logo;
