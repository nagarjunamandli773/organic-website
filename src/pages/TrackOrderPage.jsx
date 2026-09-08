import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  Package, 
  Search, 
  CheckCircle2, 
  Clock, 
  Truck, 
  MapPin, 
  Phone, 
  AlertCircle, 
  ArrowRight, 
  ChevronRight, 
  Calendar, 
  CreditCard, 
  ShieldCheck, 
  ShoppingBag, 
  RefreshCw,
  XCircle,
  ArrowLeft
} from 'lucide-react';
import { MOCK_ORDERS } from '../data/ordersData';
import { handleBackNavigation } from '../utils/navigation';

export const TrackOrderPage = () => {
  const navigate = useNavigate();
  const { orderId: pathOrderId } = useParams();
  const [searchParams] = useSearchParams();
  const queryOrderId = searchParams.get('id') || searchParams.get('orderId');

  const [inputOrderId, setInputOrderId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [recentOrders, setRecentOrders] = useState([]);

  // Load orders from localStorage (placed orders) & mock orders
  useEffect(() => {
    const savedOrders = [];
    const lastOrderStr = localStorage.getItem('last_order');
    if (lastOrderStr) {
      try {
        const parsed = JSON.parse(lastOrderStr);
        if (parsed && parsed.orderId) {
          savedOrders.push({
            id: parsed.orderId,
            date: parsed.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            itemsCount: parsed.items ? parsed.items.length : 1,
            total: parsed.total || 0,
            status: 'Processing',
            statusClass: 'status-processing',
            expectedDelivery: 'Within 24 Hours',
            courierPartner: 'Express Fresh Logistics',
            trackingNumber: `TRK-${parsed.orderId}`,
            items: parsed.items || [],
            shippingAddress: parsed.shippingAddress
          });
        }
      } catch (e) {
        console.error(e);
      }
    }

    const combined = [...savedOrders, ...MOCK_ORDERS];
    setRecentOrders(combined);

    // Check target ID
    const targetId = pathOrderId || queryOrderId || (savedOrders[0] ? savedOrders[0].id : 'KLN123454');
    if (targetId) {
      setInputOrderId(targetId);
      performSearch(targetId, combined);
    }
  }, [pathOrderId, queryOrderId]);

  const performSearch = (idToSearch, ordersList = recentOrders) => {
    const cleanId = idToSearch.trim().replace('#', '').toUpperCase();
    setHasSearched(true);

    const found = ordersList.find(o => o.id.toUpperCase() === cleanId);
    if (found) {
      setTrackedOrder(found);
    } else {
      // Create a fallback trackable mock order for user-entered ID
      setTrackedOrder({
        id: cleanId,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        itemsCount: 2,
        total: 1450.00,
        status: 'Processing',
        statusClass: 'status-processing',
        expectedDelivery: 'Tomorrow by 2:00 PM',
        courierPartner: 'Klan Organics Express Delivery',
        trackingNumber: `TRK-${cleanId}`,
        items: [
          { name: 'Organic Fresh Fruits & Vegetable Basket', qty: 1, price: 950.00, image: '/images/hero_fruits_veg.jpg' },
          { name: 'Pure A2 Cow Ghee (500ml)', qty: 1, price: 500.00, image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=200&auto=format&fit=crop&q=80' }
        ],
        shippingAddress: {
          fullName: 'Valued Customer',
          address: '123 Organic Garden Avenue',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560001'
        }
      });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputOrderId.trim()) {
      performSearch(inputOrderId);
    }
  };

  // Tracking Timeline Steps generator
  const getTimelineSteps = (status) => {
    const isCancelled = status === 'Cancelled';
    if (isCancelled) {
      return [
        { label: 'Order Placed', desc: 'Order confirmed by customer', completed: true, current: false },
        { label: 'Cancelled', desc: 'Order was cancelled and refunded', completed: true, current: true, isCancelStep: true }
      ];
    }

    switch (status) {
      case 'Pending':
        return [
          { label: 'Order Placed', desc: 'Received & order confirmed', completed: true, current: true },
          { label: 'Packing & Quality Check', desc: 'Handpicking organic products', completed: false, current: false },
          { label: 'Out for Delivery', desc: 'Handed to express delivery executive', completed: false, current: false },
          { label: 'Delivered', desc: 'Delivered to your doorstep', completed: false, current: false }
        ];
      case 'Processing':
        return [
          { label: 'Order Placed', desc: 'Received & order confirmed', completed: true, current: false },
          { label: 'Packing & Quality Check', desc: 'Handpicking organic products', completed: true, current: true },
          { label: 'Out for Delivery', desc: 'Handed to express delivery executive', completed: false, current: false },
          { label: 'Delivered', desc: 'Delivered to your doorstep', completed: false, current: false }
        ];
      case 'Shipped':
        return [
          { label: 'Order Placed', desc: 'Received & order confirmed', completed: true, current: false },
          { label: 'Packing & Quality Check', desc: 'Handpicking organic products', completed: true, current: false },
          { label: 'Out for Delivery', desc: 'Delivery partner on the way', completed: true, current: true },
          { label: 'Delivered', desc: 'Delivered to your doorstep', completed: false, current: false }
        ];
      case 'Delivered':
        return [
          { label: 'Order Placed', desc: 'Received & order confirmed', completed: true, current: false },
          { label: 'Packing & Quality Check', desc: 'Handpicking organic products', completed: true, current: false },
          { label: 'Out for Delivery', desc: 'Delivery partner on the way', completed: true, current: false },
          { label: 'Delivered', desc: 'Package delivered successfully', completed: true, current: true }
        ];
      default:
        return [
          { label: 'Order Placed', desc: 'Received & order confirmed', completed: true, current: false },
          { label: 'Packing & Quality Check', desc: 'Handpicking organic products', completed: true, current: true },
          { label: 'Out for Delivery', desc: 'Handed to express delivery partner', completed: false, current: false },
          { label: 'Delivered', desc: 'Delivered to your doorstep', completed: false, current: false }
        ];
    }
  };

  const steps = trackedOrder ? getTimelineSteps(trackedOrder.status) : [];

  return (
    <div className="track-order-page-wrapper">
      <div className="track-order-container">
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
        
        {/* Top Header Banner */}
        <div className="track-header-banner">
          <div className="track-header-badge">
            <Truck size={18} />
            <span>LIVE SHIPMENT TRACKING</span>
          </div>
          <h1 className="track-header-title">Track Your Order Status</h1>
          <p className="track-header-sub">
            Enter your Order ID below to track real-time delivery status and package location.
          </p>

          {/* Search Box Form */}
          <form onSubmit={handleSearchSubmit} className="track-search-box">
            <div className="track-input-group">
              <Search size={20} className="track-search-icon" />
              <input
                type="text"
                className="track-search-input"
                placeholder="Enter Order ID (e.g. KLN583715 or KLN123454)..."
                value={inputOrderId}
                onChange={(e) => setInputOrderId(e.target.value)}
                required
              />
              <button type="submit" className="btn-solid-green track-search-btn">
                <span>Track Order</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>

          {/* Quick Click Order Pills */}
          {recentOrders.length > 0 && (
            <div className="quick-orders-pills">
              <span className="pills-label">Recent Orders:</span>
              <div className="pills-flex">
                {recentOrders.slice(0, 4).map((ord) => (
                  <button
                    key={ord.id}
                    className={`order-chip-btn ${trackedOrder && trackedOrder.id === ord.id ? 'active' : ''}`}
                    onClick={() => {
                      setInputOrderId(ord.id);
                      setTrackedOrder(ord);
                      setHasSearched(true);
                    }}
                  >
                    #{ord.id} ({ord.status})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tracking Details View */}
        {trackedOrder ? (
          <div className="tracked-order-card">
            
            {/* Order Info Bar */}
            <div className="tracked-card-top">
              <div className="tracked-meta-info">
                <div className="meta-block">
                  <span className="meta-title">Order ID</span>
                  <strong className="order-id-code">#{trackedOrder.id}</strong>
                </div>
                <div className="meta-block">
                  <span className="meta-title">Order Date</span>
                  <strong>{trackedOrder.date}</strong>
                </div>
                <div className="meta-block">
                  <span className="meta-title">Courier Partner</span>
                  <strong>{trackedOrder.courierPartner || 'Express Organic Logistics'}</strong>
                </div>
                <div className="meta-block">
                  <span className="meta-title">Tracking Number</span>
                  <strong className="font-mono">{trackedOrder.trackingNumber || `TRK-${trackedOrder.id}`}</strong>
                </div>
              </div>

              <div className="tracked-status-badge-box">
                <span className={`status-pill ${trackedOrder.statusClass || 'status-processing'}`}>
                  {trackedOrder.status}
                </span>
                {trackedOrder.expectedDelivery && trackedOrder.status !== 'Cancelled' && (
                  <span className="expected-delivery-pill">
                    <Clock size={14} />
                    <span>Expected: {trackedOrder.expectedDelivery}</span>
                  </span>
                )}
                {trackedOrder.deliveredOn && (
                  <span className="delivered-on-pill">
                    <CheckCircle2 size={14} />
                    <span>Delivered on: {trackedOrder.deliveredOn}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Visual Stepper Progress Bar */}
            <div className="stepper-section">
              <h3 className="stepper-heading">Delivery Progress</h3>

              <div className="stepper-timeline">
                {steps.map((step, idx) => (
                  <div 
                    key={idx} 
                    className={`stepper-node ${step.completed ? 'completed' : ''} ${step.current ? 'current' : ''} ${step.isCancelStep ? 'cancelled' : ''}`}
                  >
                    <div className="stepper-icon-circle">
                      {step.isCancelStep ? (
                        <XCircle size={20} />
                      ) : step.completed ? (
                        <CheckCircle2 size={20} />
                      ) : (
                        <Clock size={18} />
                      )}
                    </div>

                    <div className="stepper-text">
                      <h4 className="step-title">{step.label}</h4>
                      <p className="step-desc">{step.desc}</p>
                    </div>

                    {idx < steps.length - 1 && (
                      <div className={`stepper-line ${steps[idx + 1].completed ? 'line-completed' : ''}`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Courier & Delivery Driver Info Box */}
            {trackedOrder.status !== 'Cancelled' && (
              <div className="delivery-executive-card">
                <div className="exec-avatar">
                  <Truck size={24} />
                </div>
                <div className="exec-info">
                  <h4>Klan Organics Express Rider</h4>
                  <p>Vehicle: Electric Green Eco-Van • Safety Certified Driver</p>
                </div>
                <a href="tel:+919876543210" className="btn-outline-green exec-call-btn">
                  <Phone size={15} />
                  <span>Call Driver</span>
                </a>
              </div>
            )}

            {/* Order Items & Shipping Address Grid */}
            <div className="tracked-bottom-grid">
              
              {/* Items Card */}
              <div className="tracked-items-card">
                <h4 className="card-section-title">
                  <ShoppingBag size={18} />
                  <span>Items in Shipment ({trackedOrder.items ? trackedOrder.items.length : 1})</span>
                </h4>
                <div className="tracked-items-list">
                  {trackedOrder.items && trackedOrder.items.length > 0 ? (
                    trackedOrder.items.map((item, i) => (
                      <div key={i} className="tracked-item-row">
                        <img src={item.image} alt={item.name} className="tracked-item-thumb" />
                        <div className="tracked-item-details">
                          <span className="tracked-item-name">{item.name}</span>
                          <span className="tracked-item-qty">Qty: {item.qty || item.quantity || 1}</span>
                        </div>
                        <span className="tracked-item-price">₹{((item.price || 299) * (item.qty || item.quantity || 1)).toFixed(2)}</span>
                      </div>
                    ))
                  ) : (
                    <div className="tracked-item-row">
                      <div className="tracked-item-details">
                        <span className="tracked-item-name">Organic Product Package</span>
                        <span className="tracked-item-qty">Qty: {trackedOrder.itemsCount || 1}</span>
                      </div>
                      <span className="tracked-item-price">₹{trackedOrder.total.toFixed(2)}</span>
                    </div>
                  )}
                </div>
                <div className="tracked-total-row">
                  <span>Total Amount Paid</span>
                  <span className="total-price">₹{trackedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Shipping Address Card */}
              <div className="tracked-address-card">
                <h4 className="card-section-title">
                  <MapPin size={18} />
                  <span>Delivery Address</span>
                </h4>
                <div className="address-card-body">
                  <p className="addr-recipient-name">
                    {trackedOrder.shippingAddress?.fullName || 'Valued Customer'}
                  </p>
                  <p className="addr-street-line">
                    {trackedOrder.shippingAddress?.address || trackedOrder.shippingAddress?.street || '123 Organic Street, Green City'}
                  </p>
                  <p className="addr-city-line">
                    {trackedOrder.shippingAddress?.city || 'Bangalore'}, {trackedOrder.shippingAddress?.state || 'Karnataka'} - <strong>{trackedOrder.shippingAddress?.pincode || '560001'}</strong>
                  </p>
                  <div className="contact-support-box">
                    <ShieldCheck size={16} className="text-green" />
                    <span>Contactless & Eco-friendly Packaging</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Back Actions */}
            <div className="tracked-actions-footer">
              <Link to="/orders" className="btn-outline-green">
                <Package size={16} />
                <span>View All My Orders</span>
              </Link>
              <Link to="/contact" className="btn-outline-green">
                <AlertCircle size={16} />
                <span>Need Support with Order?</span>
              </Link>
            </div>

          </div>
        ) : hasSearched ? (
          <div className="empty-track-state">
            <AlertCircle size={48} className="text-muted" />
            <h3>No Shipment Found</h3>
            <p>We could not find any active order matching ID <strong>#{inputOrderId}</strong>.</p>
            <p className="sub-hint">Please check your Order ID from your confirmation email or order history.</p>
            <Link to="/orders" className="btn-solid-green">
              <span>View My Orders</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : null}

      </div>
    </div>
  );
};

export default TrackOrderPage;
