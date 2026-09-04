import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Home, Calendar, Hash, CreditCard, Truck, MapPin, ShoppingBag } from 'lucide-react';

export const OrderSuccessPage = () => {
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('last_order');
    if (saved) {
      try {
        setLastOrder(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse last order', e);
      }
    }
  }, []);

  const orderData = lastOrder || {
    orderId: 'KLN583715',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    total: 2683.00,
    paymentMethod: 'Cash on Delivery',
    items: [],
    shippingAddress: null
  };

  return (
    <div className="order-success-page">
      <div className="success-card">
        {/* Animated Checkmark Icon */}
        <div className="success-icon-container">
          <div className="success-icon-pulse"></div>
          <div className="success-icon-badge">
            <CheckCircle size={44} className="success-icon-svg" />
          </div>
        </div>

        {/* Header Text */}
        <h1 className="success-title">Order Placed Successfully!</h1>
        <p className="success-subtitle">
          Thank you for shopping with Klan Organics. We have received your order and our team is preparing your fresh organic products.
        </p>

        {/* Order Details Receipt Box */}
        <div className="order-receipt-box">
          <div className="receipt-header">
            <ShoppingBag size={18} className="receipt-header-icon" />
            <span>Order Summary</span>
          </div>

          <div className="receipt-grid">
            <div className="receipt-row">
              <div className="receipt-label">
                <Hash size={15} />
                <span>Order ID</span>
              </div>
              <div className="receipt-value font-mono order-id-badge">#{orderData.orderId}</div>
            </div>

            <div className="receipt-row">
              <div className="receipt-label">
                <Calendar size={15} />
                <span>Order Date</span>
              </div>
              <div className="receipt-value">{orderData.date}</div>
            </div>

            <div className="receipt-row">
              <div className="receipt-label">
                <CreditCard size={15} />
                <span>Payment Method</span>
              </div>
              <div className="receipt-value capitalize">{orderData.paymentMethod || 'Cash on Delivery'}</div>
            </div>

            <div className="receipt-row">
              <div className="receipt-label">
                <Truck size={15} />
                <span>Estimated Delivery</span>
              </div>
              <div className="receipt-value delivery-badge">Within 24 Hours</div>
            </div>

            <div className="receipt-row receipt-total-row">
              <div className="receipt-label">Total Amount</div>
              <div className="receipt-value price-highlight">
                ₹{Number(orderData.total || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>

        {/* Items List (if available) */}
        {orderData.items && orderData.items.length > 0 && (
          <div className="order-items-preview">
            <h3 className="items-preview-title">Items Ordered ({orderData.items.length})</h3>
            <div className="items-preview-list">
              {orderData.items.map((item, idx) => (
                <div key={idx} className="item-preview-row">
                  <img src={item.image} alt={item.name} className="item-preview-img" />
                  <div className="item-preview-info">
                    <span className="item-preview-name">{item.name}</span>
                    <span className="item-preview-meta">Qty: {item.quantity} {item.unit ? `• ${item.unit}` : ''}</span>
                  </div>
                  <span className="item-preview-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shipping Address Preview (if available) */}
        {orderData.shippingAddress && orderData.shippingAddress.fullName && (
          <div className="order-shipping-preview">
            <div className="shipping-preview-header">
              <MapPin size={16} />
              <span>Delivery Address</span>
            </div>
            <div className="shipping-preview-body">
              <p className="shipping-name">{orderData.shippingAddress.fullName}</p>
              <p className="shipping-text">
                {orderData.shippingAddress.address}, {orderData.shippingAddress.city}, {orderData.shippingAddress.state} - {orderData.shippingAddress.pincode}
              </p>
              <p className="shipping-phone">Phone: {orderData.shippingAddress.phone}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="success-actions-row">
          <Link to={`/track-order/${orderData.orderId}`} className="btn-solid-green success-btn">
            <Package size={18} />
            <span>Track Order Status</span>
          </Link>

          <Link to="/" className="btn-outline-green success-btn">
            <Home size={18} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

