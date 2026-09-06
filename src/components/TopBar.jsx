import React, { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const TopBar = () => {
  const { deliveryLocation, setDeliveryLocation } = useAuth();
  const [showLocDropdown, setShowLocDropdown] = useState(false);

  const locations = [
    'Bangalore - 560001',
    'Mumbai - 400001',
    'Delhi NCR - 110001',
    'Hyderabad - 500001',
    'Chennai - 600001',
    'Kolkata - 700001'
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-container">
        <div className="top-bar-left">
          <span>100% Organic</span>
          <span className="dot">•</span>
          <span>Chemical Free</span>
          <span className="dot">•</span>
          <span>Sustainably Sourced</span>
        </div>

        <div className="top-bar-right">
          <div className="location-picker-wrapper">
            <MapPin size={14} className="loc-icon" />
            <span className="loc-label">Delivering to:</span>
            <button
              className="location-btn"
              onClick={() => setShowLocDropdown(!showLocDropdown)}
            >
              <span>{deliveryLocation}</span>
              <ChevronDown size={14} />
            </button>

            {showLocDropdown && (
              <div className="location-dropdown">
                <div className="dropdown-title">Select Delivery Location</div>
                {locations.map((loc) => (
                  <button
                    key={loc}
                    className={`loc-option ${deliveryLocation === loc ? 'active' : ''}`}
                    onClick={() => {
                      setDeliveryLocation(loc);
                      setShowLocDropdown(false);
                    }}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
