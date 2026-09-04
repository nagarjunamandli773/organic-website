import React from 'react';
import { Leaf, Truck, ShieldCheck, Sprout, Clock, RotateCcw } from 'lucide-react';

export const TrustBadges = () => {
  const badges = [
    {
      icon: <Leaf size={24} className="badge-icon" />,
      title: '100% Organic',
      subtitle: 'Chemical Free Products'
    },
    {
      icon: <Truck size={24} className="badge-icon" />,
      title: 'Farm Fresh',
      subtitle: 'Directly Sourced'
    },
    {
      icon: <ShieldCheck size={24} className="badge-icon" />,
      title: 'Safe & Secure',
      subtitle: 'Secure Payments'
    },
    {
      icon: <Sprout size={24} className="badge-icon" />,
      title: 'Eco Friendly',
      subtitle: 'Sustainable Living'
    },
    {
      icon: <Clock size={24} className="badge-icon" />,
      title: 'Fast Delivery',
      subtitle: 'On Time Delivery'
    },
    {
      icon: <RotateCcw size={24} className="badge-icon" />,
      title: '30 Days Return',
      subtitle: 'Hassle Free Returns'
    }
  ];

  return (
    <div className="trust-badges-container">
      <div className="trust-badges-grid">
        {badges.map((b, index) => (
          <div key={index} className="trust-badge-item">
            <div className="badge-icon-box">{b.icon}</div>
            <div className="badge-text-box">
              <div className="badge-title">{b.title}</div>
              <div className="badge-subtitle">{b.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
