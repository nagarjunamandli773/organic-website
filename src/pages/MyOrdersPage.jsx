import React, { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Package, 
  User, 
  MapPin, 
  CreditCard, 
  Heart, 
  Settings, 
  LogOut, 
  Phone, 
  Mail, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Check, 
  Edit3, 
  Lock, 
  Shield, 
  HelpCircle, 
  CheckCircle2, 
  X, 
  ShoppingCart,
  Home,
  Briefcase,
  ArrowRight,
  XCircle,
  RotateCcw,
  Wifi,
  Eye,
  EyeOff,
  ArrowLeft,
  Truck,
  Search,
  Award,
  Sparkles,
  Clock,
  Printer,
  Download,
  FileText
} from 'lucide-react';
import { MOCK_ORDERS } from '../data/ordersData';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export const MyOrdersPage = ({ initialNav }) => {
  const navigate = useNavigate();
  const { user, setUser, logout } = useAuth();
  const { addToCart, showToast } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  // --- PASSWORD VISIBILITY TOGGLE STATES ---
  const [showAuthPassword, setShowAuthPassword] = useState(false);
  const [showAuthConfirmPassword, setShowAuthConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const getStartingNav = () => {
    if (initialNav) return initialNav;
    if (location.pathname === '/wishlist' || searchParams.get('tab') === 'wishlist') return 'wishlist';
    return 'orders';
  };

  const [activeNav, setActiveNav] = useState(getStartingNav);

  useEffect(() => {
    if (initialNav) {
      setActiveNav(initialNav);
    } else if (location.pathname === '/wishlist' || searchParams.get('tab') === 'wishlist') {
      setActiveNav('wishlist');
    } else if (location.pathname === '/orders' && !searchParams.get('tab')) {
      setActiveNav('orders');
    }
  }, [location.pathname, searchParams, initialNav]);

  const [activeTab, setActiveTab] = useState('All Orders');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // --- STATE FOR MY ADDRESS ---
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('klan_addresses');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map(a => ({ ...a, fullName: a.fullName === 'Bhargavi Mandli' ? '' : a.fullName }));
    }
    return [
      {
        id: 'addr-1',
        fullName: '',
        phone: '+91 98765 43210',
        street: '123 Organic Street, Green City',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001',
        type: 'Home',
        isDefault: true
      },
      {
        id: 'addr-2',
        fullName: '',
        phone: '+91 98765 43210',
        street: 'Tech Park, Block B, outer ring road',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560103',
        type: 'Work',
        isDefault: false
      }
    ];
  });

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressFormData, setAddressFormData] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    type: 'Home',
    isDefault: false
  });

  useEffect(() => {
    localStorage.setItem('klan_addresses', JSON.stringify(addresses));
  }, [addresses]);

  // --- STATE FOR PAYMENT METHODS ---
  const [paymentMethods, setPaymentMethods] = useState(() => {
    const saved = localStorage.getItem('klan_payment_methods');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map(p => ({ ...p, cardHolder: p.cardHolder === 'Bhargavi Mandli' ? 'Organic Customer' : p.cardHolder }));
    }
    return [
      {
        id: 'pm-1',
        cardHolder: 'Organic Customer',
        cardNumber: '4321',
        cardType: 'Visa',
        expiry: '12/28',
        isDefault: true
      },
      {
        id: 'pm-2',
        cardHolder: 'Organic Customer',
        cardNumber: '8765',
        cardType: 'Mastercard',
        expiry: '09/27',
        isDefault: false
      }
    ];
  });

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentFormData, setPaymentFormData] = useState({
    cardHolder: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardType: 'Visa',
    isDefault: false
  });

  useEffect(() => {
    localStorage.setItem('klan_payment_methods', JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  // --- STATE FOR PROFILE SETTINGS ---
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location
      }));
    }
  }, [user]);

  // --- STATE FOR LOGIN/REGISTER ---
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [authFormData, setAuthFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // --- ORDERS FILTERING & CANCEL ---
  const [ordersList, setOrdersList] = useState(MOCK_ORDERS);
  const [orderSearchQuery, setOrderSearchQuery] = useState('');

  const filterTabs = [
    { label: 'All Orders', count: ordersList.length },
    { label: 'Pending', count: ordersList.filter(o => o.status === 'Pending').length },
    { label: 'Processing', count: ordersList.filter(o => o.status === 'Processing').length },
    { label: 'Shipped', count: ordersList.filter(o => o.status === 'Shipped').length },
    { label: 'Delivered', count: ordersList.filter(o => o.status === 'Delivered').length },
    { label: 'Cancelled', count: ordersList.filter(o => o.status === 'Cancelled').length }
  ];

  const filteredOrders = ordersList.filter(order => {
    const matchesTab = activeTab === 'All Orders' || order.status.toLowerCase() === activeTab.toLowerCase();
    const q = orderSearchQuery.toLowerCase().trim();
    const matchesQuery = !q || 
      order.id.toLowerCase().includes(q) || 
      order.items.some(i => i.name.toLowerCase().includes(q)) ||
      (order.date && order.date.toLowerCase().includes(q));
    return matchesTab && matchesQuery;
  });

  const handleCancelOrder = (orderId) => {
    if (window.confirm(`Are you sure you want to cancel Order #${orderId}?`)) {
      setOrdersList(prev => prev.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            status: 'Cancelled',
            statusClass: 'status-cancelled',
            cancelledDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          };
        }
        return o;
      }));
      showToast(`Order #${orderId} cancelled successfully.`);
    }
  };

  const handleReorder = (order) => {
    order.items.forEach(item => {
      const product = PRODUCTS.find(p => p.name.toLowerCase() === item.name.toLowerCase()) || {
        id: `custom-${Math.random()}`,
        name: item.name,
        price: item.price,
        image: item.image,
        unit: 'pack'
      };
      addToCart(product, item.qty);
    });
    showToast(`Items from Order #${order.id} added to cart!`);
  };

  // --- ADDRESS ACTIONS ---
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (editingAddress) {
      setAddresses(prev => prev.map(addr => {
        if (addr.id === editingAddress.id) {
          const updated = { ...addr, ...addressFormData };
          if (addressFormData.isDefault) {
            // strip default from others
            return { ...updated, isDefault: true };
          }
          return updated;
        }
        if (addressFormData.isDefault) {
          return { ...addr, isDefault: false };
        }
        return addr;
      }));
      if (addressFormData.isDefault) {
        setAddresses(prev => prev.map(addr => addr.id === editingAddress.id ? { ...addr, isDefault: true } : { ...addr, isDefault: false }));
      }
      showToast('Address updated successfully!');
    } else {
      const newAddr = {
        id: 'addr-' + Date.now(),
        ...addressFormData
      };
      if (newAddr.isDefault || addresses.length === 0) {
        newAddr.isDefault = true;
        setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: false })).concat(newAddr));
      } else {
        setAddresses(prev => [...prev, newAddr]);
      }
      showToast('Address added successfully!');
    }
    setShowAddressForm(false);
    setEditingAddress(null);
    setAddressFormData({ fullName: '', phone: '', street: '', city: '', state: '', pincode: '', type: 'Home', isDefault: false });
  };

  const handleEditAddress = (addr) => {
    setEditingAddress(addr);
    setAddressFormData(addr);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    showToast('Address deleted successfully.');
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    showToast('Default delivery address updated.');
  };

  // --- PAYMENT ACTIONS ---
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const newCard = {
      id: 'pm-' + Date.now(),
      cardHolder: paymentFormData.cardHolder,
      cardNumber: paymentFormData.cardNumber.slice(-4), // only store last 4
      cardType: paymentFormData.cardType,
      expiry: paymentFormData.expiry,
      isDefault: paymentFormData.isDefault || paymentMethods.length === 0
    };

    if (newCard.isDefault) {
      setPaymentMethods(prev => prev.map(pm => ({ ...pm, isDefault: false })).concat(newCard));
    } else {
      setPaymentMethods(prev => [...prev, newCard]);
    }

    showToast('Payment method added successfully!');
    setShowPaymentForm(false);
    setPaymentFormData({ cardHolder: '', cardNumber: '', expiry: '', cvv: '', cardType: 'Visa', isDefault: false });
  };

  const handleDeletePayment = (id) => {
    setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
    showToast('Payment method removed.');
  };

  const handleSetDefaultPayment = (id) => {
    setPaymentMethods(prev => prev.map(pm => ({
      ...pm,
      isDefault: pm.id === id
    })));
    showToast('Default payment method updated.');
  };

  // --- PROFILE ACTIONS ---
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      showToast('Passwords do not match!', 'error');
      return;
    }

    setUser(prev => ({
      ...prev,
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      location: profileData.location
    }));
    showToast('Profile information saved successfully!');
  };

  // --- LOGOUT ACTION ---
  const handleLogout = () => {
    logout();
    showToast('Logged out successfully.');
  };

  // --- LOGIN/REGISTER SUBMIT ---
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (isLoginTab) {
      if (authFormData.email && authFormData.password) {
        setUser({
          name: authFormData.email.split('@')[0],
          email: authFormData.email,
          phone: '',
          isLoggedIn: true,
          location: ''
        });
        showToast('Welcome back to Klan Organics!');
      }
    } else {
      if (authFormData.password !== authFormData.confirmPassword) {
        showToast('Passwords do not match!', 'error');
        return;
      }
      setUser({
        name: authFormData.name || authFormData.email.split('@')[0],
        email: authFormData.email,
        phone: authFormData.phone || '',
        isLoggedIn: true,
        location: ''
      });
      showToast('Account created successfully! Welcome.');
    }
  };



  useEffect(() => {
    if (!user?.isLoggedIn) {
      setUser({
        name: 'Bhargavi Mandli',
        email: 'bhargavi@klanorganics.com',
        phone: '+91 98765 43210',
        isLoggedIn: true,
        location: 'Bangalore - 560001'
      });
    }
  }, [user?.isLoggedIn, setUser]);


  return (
    <div className="my-orders-page-wrapper">
      <div className="my-orders-container">
        <div className="orders-breadcrumbs" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <button 
            onClick={() => navigate(-1)} 
            className="back-arrow-btn"
            title="Go back to previous page"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link to="/">Home</Link>
            <ChevronRight size={14} className="crumb-icon" />
          </div>
        </div>

        <div className="account-layout-grid">
        {/* Left Account Sidebar matching design */}
        <aside className="account-sidebar">
          <div className="account-menu-card">
            <h3 className="sidebar-title">My Account</h3>

            <nav className="account-nav-list">
              <button
                className={`account-nav-item ${activeNav === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveNav('dashboard')}
              >
                <User size={18} />
                <span>Dashboard</span>
              </button>

              <button
                className={`account-nav-item ${activeNav === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveNav('orders')}
              >
                <Package size={18} />
                <span>My Orders</span>
              </button>

              <button
                className={`account-nav-item ${activeNav === 'address' ? 'active' : ''}`}
                onClick={() => setActiveNav('address')}
              >
                <MapPin size={18} />
                <span>My Address</span>
              </button>

              <button
                className={`account-nav-item ${activeNav === 'payment' ? 'active' : ''}`}
                onClick={() => setActiveNav('payment')}
              >
                <CreditCard size={18} />
                <span>Payment Methods</span>
              </button>

              <button
                className={`account-nav-item ${activeNav === 'wishlist' ? 'active' : ''}`}
                onClick={() => setActiveNav('wishlist')}
              >
                <Heart size={18} />
                <span>Wishlist</span>
              </button>

              <button
                className={`account-nav-item ${activeNav === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveNav('settings')}
              >
                <Settings size={18} />
                <span>Profile Settings</span>
              </button>

              <button className="account-nav-item logout-btn" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          {/* Need Help Card */}
          <div className="need-help-card">
            <h4 className="help-title">Need Help?</h4>
            <p className="help-sub">We're here for you</p>
            <div className="help-contact-line">
              <Phone size={14} />
              <span>+91 98765 43210</span>
            </div>
            <div className="help-contact-line">
              <Mail size={14} />
              <span>support@klanorganics.com</span>
            </div>
            <Link to="/contact" className="contact-support-btn">
              Contact Support
            </Link>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="account-content-area">
          
          {/* ==============================================
              PANEL 1: DASHBOARD
              ============================================== */}
          {activeNav === 'dashboard' && (
            <div className="account-panel dashboard-panel">
              <div className="orders-header">
                <h1 className="page-heading">Hello, {user.name}!</h1>
                <p className="page-subheading">From your account dashboard you can view your recent orders, manage shipping addresses and edit details.</p>
              </div>

              <div className="dashboard-stats-grid">
                <div className="dashboard-stat-card">
                  <div className="stat-icon-circle bg-green-light">
                    <User size={24} className="text-green" />
                  </div>
                  <div className="stat-info">
                    <h4>Personal Info</h4>
                    <p><strong>{user.name}</strong></p>
                    <p className="stat-subtext">{user.email}</p>
                    <button className="stat-link-action" onClick={() => setActiveNav('settings')}>Edit Profile</button>
                  </div>
                </div>

                <div className="dashboard-stat-card">
                  <div className="stat-icon-circle bg-orange-light">
                    <MapPin size={24} className="text-orange" />
                  </div>
                  <div className="stat-info">
                    <h4>Default Address</h4>
                    {addresses.find(a => a.isDefault) ? (
                      <>
                        <p><strong>{addresses.find(a => a.isDefault).fullName}</strong></p>
                        <p className="stat-subtext text-truncate-custom">{addresses.find(a => a.isDefault).street}</p>
                      </>
                    ) : (
                      <p className="stat-subtext">No default address set</p>
                    )}
                    <button className="stat-link-action" onClick={() => setActiveNav('address')}>Manage Addresses</button>
                  </div>
                </div>

                <div className="dashboard-stat-card">
                  <div className="stat-icon-circle bg-blue-light">
                    <CreditCard size={24} className="text-blue" />
                  </div>
                  <div className="stat-info">
                    <h4>Payment Card</h4>
                    {paymentMethods.find(p => p.isDefault) ? (
                      <>
                        <p><strong>{paymentMethods.find(p => p.isDefault).cardType} **** {paymentMethods.find(p => p.isDefault).cardNumber}</strong></p>
                        <p className="stat-subtext">Exp: {paymentMethods.find(p => p.isDefault).expiry}</p>
                      </>
                    ) : (
                      <p className="stat-subtext">No default payment method</p>
                    )}
                    <button className="stat-link-action" onClick={() => setActiveNav('payment')}>Manage Payments</button>
                  </div>
                </div>
              </div>

              {/* Recent Orders section */}
              <div className="recent-orders-section-dashboard">
                <div className="section-title-row">
                  <h3>Recent Orders</h3>
                  <button className="view-all-orders-btn" onClick={() => setActiveNav('orders')}>
                    <span>View All Orders</span>
                    <ChevronRight size={16} />
                  </button>
                </div>

                {MOCK_ORDERS.length > 0 ? (
                  <div className="orders-cards-list">
                    {MOCK_ORDERS.slice(0, 2).map(order => (
                      <div key={order.id} className="order-row-card">
                        <div className="order-row-left">
                          <div className="order-items-thumbs">
                            {order.items.slice(0, 3).map((item, i) => (
                              <img key={i} src={item.image} alt={item.name} className="order-thumb" />
                            ))}
                          </div>

                          <div className="order-info-details">
                            <h3 className="order-id">Order ID: <strong>#{order.id}</strong></h3>
                            <div className="order-meta">Placed on: {order.date}</div>
                            <div className="order-count">{order.itemsCount} Items</div>
                          </div>
                        </div>

                        <div className="order-row-right">
                          <div className="order-price-box">
                            <span className="price-label">Total:</span>
                            <span className="price-val">₹{order.total.toFixed(2)}</span>
                          </div>

                          <div className="order-actions-group">
                            <span className={`status-pill ${order.statusClass}`}>
                              {order.status}
                            </span>

                            <button className="btn-outline-green view-details-btn" onClick={() => setSelectedOrder(order)}>
                              <span>View Details</span>
                              <ChevronRight size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state-panel">
                    <Package size={48} />
                    <p>No orders placed yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==============================================
              PANEL 2: MY ORDERS matching reference image
              ============================================== */}
          {activeNav === 'orders' && (
            <div className="account-panel orders-panel">
              <div className="orders-header">
                <h1 className="page-heading">My Orders</h1>
                <p className="page-subheading">Track, view and manage your orders</p>
              </div>

              {/* Filter Status Tabs matching reference image */}
              <div className="order-tabs-bar">
                {filterTabs.map(tab => (
                  <button
                    key={tab.label}
                    className={`tab-filter-btn ${activeTab === tab.label ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.label)}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>

              {/* Orders List matching reference image */}
              {filteredOrders.length > 0 ? (
                <div className="orders-cards-list">
                  {filteredOrders.map(order => (
                    <div key={order.id} className="order-row-card-ref">
                      {/* Left: Thumbnail & Info */}
                      <div className="order-ref-left">
                        <div className="order-ref-thumbs" style={{ width: '124px', minWidth: '124px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {order.items.slice(0, 2).map((item, i) => (
                            <img key={i} src={item.image} alt={item.name} className="order-ref-thumb" />
                          ))}
                        </div>

                        <div className="order-ref-details">
                          <h3 className="order-ref-id">Order ID: <strong>#{order.id}</strong></h3>
                          <div className="order-ref-placed">Placed on: {order.date}</div>
                          <div className="order-ref-count">{order.itemsCount} {order.itemsCount === 1 ? 'Item' : 'Items'}</div>

                          {order.expectedDelivery && order.status !== 'Cancelled' && (
                            <div className="expected-date">
                              <Truck size={14} className="inline-icon" />
                              <span>Expected Delivery: {order.expectedDelivery}</span>
                            </div>
                          )}
                          {order.deliveredOn && (
                            <div className="delivered-date">
                              <CheckCircle2 size={14} className="inline-icon" />
                              <span>Delivered on: {order.deliveredOn}</span>
                            </div>
                          )}
                          {order.status === 'Cancelled' && (
                            <div className="cancelled-info-group" style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', marginTop: '6px', whiteSpace: 'nowrap' }}>
                              <div className="cancelled-reason-box">
                                <XCircle size={13} className="cancel-icon-sm" />
                                <span className="cancelled-date-text">Cancelled on {order.cancelledDate || order.date}</span>
                              </div>
                              {order.cancelReason && (
                                <span className="cancelled-reason-text">
                                  {order.cancelReason}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Total Price */}
                      <div className="order-ref-total-col">
                        <span className="ref-price-lbl">Total</span>
                        <span className="ref-price-val">₹{order.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>

                      {/* Status Pill */}
                      <div className="order-ref-status-col">
                        <span className={`status-pill status-${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </div>

                      {/* Action Button */}
                      <div className="order-ref-action-col">
                        <button className="btn-outline-green view-details-btn-ref" onClick={() => setSelectedOrder(order)}>
                          <span>View Details</span>
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state-panel">
                  <div className="empty-icon-circle">
                    <Package size={36} />
                  </div>
                  <h3>No Orders Found</h3>
                  <p>You do not have any orders matching status "{activeTab}" yet.</p>
                  <Link to="/products" className="btn-solid-green continue-shopping-empty-btn">
                    <ShoppingBag size={16} />
                    <span>Shop Organic Products</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )}

              {/* Bottom Banner matching reference image */}
              <div className="shop-more-banner">
                <div className="shop-more-text">
                  <h3>Shop More Organic Products</h3>
                  <p>Discover our range of 100% organic and chemical-free products.</p>
                </div>
                <Link to="/products" className="btn-solid-green continue-shopping-ref-btn">
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}

          {/* ==============================================
              PANEL 3: MY ADDRESS
              ============================================== */}
          {activeNav === 'address' && (
            <div className="account-panel address-panel">
              <div className="orders-header-flex-row">
                <div className="orders-header">
                  <h1 className="page-heading">Delivery Addresses</h1>
                  <p className="page-subheading">Manage your delivery and shipping locations for quick checkout</p>
                </div>
                {!showAddressForm && (
                  <button className="btn-solid-green add-new-btn-top" onClick={() => {
                    setEditingAddress(null);
                    setAddressFormData({ fullName: '', phone: '', street: '', city: '', state: '', pincode: '', type: 'Home', isDefault: false });
                    setShowAddressForm(true);
                  }}>
                    <Plus size={16} />
                    <span>Add New Address</span>
                  </button>
                )}
              </div>

              {showAddressForm ? (
                <div className="address-form-container-card">
                  <div className="form-card-header">
                    <h3>{editingAddress ? 'Edit Delivery Address' : 'Add New Address'}</h3>
                    <p>Please enter complete details for accurate delivery</p>
                  </div>
                  <form onSubmit={handleAddressSubmit} className="premium-form-layout">
                    <div className="form-row dual-fields">
                      <div className="form-group">
                        <label>Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="Recipient name"
                          value={addressFormData.fullName}
                          onChange={(e) => setAddressFormData({ ...addressFormData, fullName: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="10-digit mobile number"
                          value={addressFormData.phone}
                          onChange={(e) => setAddressFormData({ ...addressFormData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Street Address *</label>
                      <input
                        type="text"
                        required
                        placeholder="House no., Flat, Building, Street address"
                        value={addressFormData.street}
                        onChange={(e) => setAddressFormData({ ...addressFormData, street: e.target.value })}
                      />
                    </div>

                    <div className="form-row triple-fields">
                      <div className="form-group">
                        <label>City *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Bangalore"
                          value={addressFormData.city}
                          onChange={(e) => setAddressFormData({ ...addressFormData, city: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>State *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Karnataka"
                          value={addressFormData.state}
                          onChange={(e) => setAddressFormData({ ...addressFormData, state: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Pin Code *</label>
                        <input
                          type="text"
                          required
                          placeholder="6-digit PIN"
                          value={addressFormData.pincode}
                          onChange={(e) => setAddressFormData({ ...addressFormData, pincode: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-row dual-fields align-items-center">
                      <div className="form-group">
                        <label>Address Type</label>
                        <div className="address-type-chips">
                          <button
                            type="button"
                            className={`type-chip ${addressFormData.type === 'Home' ? 'active' : ''}`}
                            onClick={() => setAddressFormData({ ...addressFormData, type: 'Home' })}
                          >
                            <Home size={14} />
                            <span>Home</span>
                          </button>
                          <button
                            type="button"
                            className={`type-chip ${addressFormData.type === 'Work' ? 'active' : ''}`}
                            onClick={() => setAddressFormData({ ...addressFormData, type: 'Work' })}
                          >
                            <Briefcase size={14} />
                            <span>Work</span>
                          </button>
                          <button
                            type="button"
                            className={`type-chip ${addressFormData.type === 'Other' ? 'active' : ''}`}
                            onClick={() => setAddressFormData({ ...addressFormData, type: 'Other' })}
                          >
                            <MapPin size={14} />
                            <span>Other</span>
                          </button>
                        </div>
                      </div>

                      <div className="form-group checkbox-align">
                        <label className="checkbox-label-premium">
                          <input
                            type="checkbox"
                            checked={addressFormData.isDefault}
                            onChange={(e) => setAddressFormData({ ...addressFormData, isDefault: e.target.checked })}
                          />
                          <span>Set as default shipping address</span>
                        </label>
                      </div>
                    </div>

                    <div className="form-actions-row">
                      <button type="submit" className="btn-solid-green">
                        Save Address
                      </button>
                      <button type="button" className="btn-cancel-link" onClick={() => {
                        setShowAddressForm(false);
                        setEditingAddress(null);
                      }}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="addresses-list-grid">
                  {addresses.map(addr => (
                    <div key={addr.id} className={`address-item-card ${addr.isDefault ? 'default-active' : ''}`}>
                      <div className="addr-header-row">
                        <div className="addr-type-tag">
                          {addr.type === 'Home' ? <Home size={13} /> : addr.type === 'Work' ? <Briefcase size={13} /> : <MapPin size={13} />}
                          <span>{addr.type}</span>
                        </div>
                        {addr.isDefault ? (
                          <span className="default-indicator-pill">
                            <CheckCircle2 size={13} />
                            <span>Default</span>
                          </span>
                        ) : null}
                      </div>

                      <div className="addr-body-info">
                        {addr.fullName ? <h4 className="addr-name">{addr.fullName}</h4> : null}
                        <p className="addr-street">{addr.street}</p>
                        <p className="addr-city-state">{addr.city}, {addr.state} • <strong>{addr.pincode}</strong></p>
                        <div className="addr-phone-pill">
                          <Phone size={13} />
                          <span>{addr.phone}</span>
                        </div>
                      </div>

                      <div className="addr-card-footer-actions">
                        {!addr.isDefault ? (
                          <button className="btn-set-default-link" onClick={() => handleSetDefaultAddress(addr.id)}>
                            Set as Default
                          </button>
                        ) : (
                          <span className="default-active-text">Primary Address</span>
                        )}
                        <div className="right-action-buttons">
                          <button className="btn-edit-action" onClick={() => handleEditAddress(addr)}>
                            <Edit3 size={14} />
                            <span>Edit</span>
                          </button>
                          <button className="btn-delete-action" onClick={() => handleDeleteAddress(addr.id)}>
                            <Trash2 size={14} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Address Card Button */}
                  <div
                    className="add-address-dash-card"
                    onClick={() => {
                      setEditingAddress(null);
                      setAddressFormData({ fullName: '', phone: '', street: '', city: '', state: '', pincode: '', type: 'Home', isDefault: false });
                      setShowAddressForm(true);
                    }}
                  >
                    <div className="plus-icon-circle">
                      <Plus size={24} />
                    </div>
                    <h4>Add New Address</h4>
                    <p>Deliver to a home, office or new location</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==============================================
              PANEL 4: PAYMENT METHODS
              ============================================== */}
          {activeNav === 'payment' && (
            <div className="account-panel payment-panel">
              <div className="orders-header-flex-row">
                <div className="orders-header">
                  <h1 className="page-heading">Saved Payment Methods</h1>
                  <p className="page-subheading">Manage your credit cards, debit cards, and saved payment details</p>
                </div>
                {!showPaymentForm && (
                  <button className="btn-solid-green add-new-btn-top" onClick={() => setShowPaymentForm(true)}>
                    <Plus size={16} />
                    <span>Add New Card</span>
                  </button>
                )}
              </div>

              {showPaymentForm ? (
                <div className="address-form-container-card">
                  <h3>Add New Card</h3>
                  <p className="form-sub-header-warning">⚠️ For security, card numbers are masked. Do not enter real credit card PINs.</p>
                  
                  <form onSubmit={handlePaymentSubmit} className="premium-form-layout">
                    <div className="form-group">
                      <label>Cardholder Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Name exactly as printed on card"
                        value={paymentFormData.cardHolder}
                        onChange={(e) => setPaymentFormData({ ...paymentFormData, cardHolder: e.target.value })}
                      />
                    </div>

                    <div className="form-row dual-fields">
                      <div className="form-group">
                        <label>Card Number *</label>
                        <input
                          type="text"
                          required
                          maxLength="19"
                          placeholder="16-digit card number"
                          value={paymentFormData.cardNumber}
                          onChange={(e) => setPaymentFormData({ ...paymentFormData, cardNumber: e.target.value.replace(/\s?/g, '') })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Card Issuer / Network</label>
                        <select
                          value={paymentFormData.cardType}
                          onChange={(e) => setPaymentFormData({ ...paymentFormData, cardType: e.target.value })}
                        >
                          <option value="Visa">Visa</option>
                          <option value="Mastercard">Mastercard</option>
                          <option value="Rupay">Rupay</option>
                          <option value="American Express">American Express</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row dual-fields">
                      <div className="form-group">
                        <label>Expiry Date *</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          maxLength="5"
                          value={paymentFormData.expiry}
                          onChange={(e) => setPaymentFormData({ ...paymentFormData, expiry: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV *</label>
                        <input
                          type="password"
                          required
                          maxLength="3"
                          placeholder="3 digits"
                          value={paymentFormData.cvv}
                          onChange={(e) => setPaymentFormData({ ...paymentFormData, cvv: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="checkbox-label-premium">
                        <input
                          type="checkbox"
                          checked={paymentFormData.isDefault}
                          onChange={(e) => setPaymentFormData({ ...paymentFormData, isDefault: e.target.checked })}
                        />
                        <span>Set as default payment card</span>
                      </label>
                    </div>

                    <div className="form-actions-row">
                      <button type="submit" className="btn-solid-green">
                        Save Card
                      </button>
                      <button type="button" className="btn-cancel-link" onClick={() => setShowPaymentForm(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="payment-cards-grid">
                  {paymentMethods.map(card => {
                    const typeLower = card.cardType.toLowerCase();
                    let themeClass = 'theme-visa';
                    if (typeLower.includes('master')) themeClass = 'theme-master';
                    else if (typeLower.includes('rupay')) themeClass = 'theme-rupay';
                    else if (typeLower.includes('express') || typeLower.includes('amex')) themeClass = 'theme-amex';

                    return (
                      <div key={card.id} className={`metallic-credit-card ${themeClass} ${card.isDefault ? 'is-default-card' : ''}`}>
                        <div className="card-top-header">
                          <div className="emv-chip-box">
                            <span className="emv-chip"></span>
                            <Wifi size={18} className="contactless-icon" />
                          </div>
                          <span className="card-brand-logo">{card.cardType.toUpperCase()}</span>
                        </div>

                        <div className="card-number-dots">
                          <span>••••</span>
                          <span>••••</span>
                          <span>••••</span>
                          <strong className="last4-digits">{card.cardNumber}</strong>
                        </div>

                        <div className="card-bottom-meta">
                          <div className="meta-col">
                            <span className="meta-lbl">CARDHOLDER NAME</span>
                            <p className="meta-val">{card.cardHolder}</p>
                          </div>
                          <div className="meta-col">
                            <span className="meta-lbl">EXPIRES</span>
                            <p className="meta-val">{card.expiry}</p>
                          </div>
                        </div>

                        <div className="card-footer-actions">
                          {card.isDefault ? (
                            <span className="default-card-badge">✓ Primary Payment Card</span>
                          ) : (
                            <button className="btn-set-default-pill" onClick={() => handleSetDefaultPayment(card.id)}>
                              Set as Default
                            </button>
                          )}
                          <button className="btn-delete-card-pill" title="Delete Card" onClick={() => handleDeletePayment(card.id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Add Card Dashed Box */}
                  <div className="add-payment-dash-card" onClick={() => setShowPaymentForm(true)}>
                    <div className="plus-icon-circle">
                      <Plus size={22} />
                    </div>
                    <h4>Add New Card</h4>
                    <p>Save Credit, Debit or ATM Card</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==============================================
              PANEL 5: WISHLIST
              ============================================== */}
          {activeNav === 'wishlist' && (
            <div className="account-panel wishlist-panel">
              <div className="orders-header">
                <h1 className="page-heading">My Wishlist</h1>
                <p className="page-subheading">Browse and purchase products you saved</p>
              </div>

              {wishlist.length > 0 ? (
                <div className="wishlist-grid-account">
                  {wishlist.map(id => {
                    const product = PRODUCTS.find(p => p.id === id);
                    if (!product) return null;
                    return (
                      <div key={product.id} className="wishlist-item-card-account">
                        <div className="wish-img-box">
                          <img src={product.image} alt={product.name} />
                          <button 
                            className="wishlist-remove-btn" 
                            title="Remove from Wishlist"
                            onClick={() => {
                              toggleWishlist(product.id);
                              showToast(`Removed ${product.name} from wishlist.`);
                            }}
                          >
                            <X size={15} />
                          </button>
                        </div>

                        <div className="wish-details">
                          <h4>{product.name}</h4>
                          <span className="wish-category-badge">{product.category}</span>
                          <div className="wish-price-row">
                            <span className="price-bold">₹{product.price}</span>
                            <span className="unit-label">/ {product.unit}</span>
                          </div>

                          <button 
                            className="btn-solid-green add-to-cart-wish-btn"
                            onClick={() => {
                              addToCart(product, 1);
                              showToast(`Added ${product.name} to cart!`);
                            }}
                          >
                            <ShoppingCart size={14} />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-state-panel">
                  <Heart size={54} className="empty-icon" />
                  <h3>Your Wishlist is Empty</h3>
                  <p>Save organic goods to buy them later.</p>
                  <Link to="/products" className="btn-solid-green continue-shopping-empty-btn">Start Shopping</Link>
                </div>
              )}
            </div>
          )}

          {/* ==============================================
              PANEL 6: PROFILE SETTINGS
              ============================================== */}
          {activeNav === 'settings' && (
            <div className="account-panel settings-panel">
              <div className="orders-header">
                <h1 className="page-heading">Profile Settings</h1>
                <p className="page-subheading">Update your contact details and account security settings</p>
              </div>

              <div className="settings-profile-container-card">
                <form onSubmit={handleProfileSubmit} className="premium-form-layout">
                  <div className="form-sub-header">
                    <h3 className="sub-section-header">Contact Information</h3>
                    <p className="sub-section-desc">Manage your account identity and notification contact details</p>
                  </div>
                  
                  <div className="form-row dual-fields">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email address"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row dual-fields">
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Preferred Delivery City</label>
                      <input
                        type="text"
                        placeholder="e.g. Bangalore, Karnataka"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="password-security-section-divider"></div>

                  <div className="form-sub-header">
                    <h3 className="sub-section-header">Security & Password</h3>
                    <p className="sub-section-desc">Leave fields blank if you do not wish to change your current password</p>
                  </div>

                  <div className="form-group">
                    <label>Current Password</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={profileData.currentPassword}
                        onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
                        style={{ paddingRight: '40px' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
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
                        aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                      >
                        {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="form-row dual-fields">
                    <div className="form-group">
                      <label>New Password</label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Minimum 6 characters"
                          value={profileData.newPassword}
                          onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                          style={{ paddingRight: '40px' }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
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
                          aria-label={showNewPassword ? "Hide password" : "Show password"}
                        >
                          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showConfirmNewPassword ? "text" : "password"}
                          placeholder="Re-enter new password"
                          value={profileData.confirmPassword}
                          onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
                          style={{ paddingRight: '40px' }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
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
                          aria-label={showConfirmNewPassword ? "Hide password" : "Show password"}
                        >
                          {showConfirmNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="profile-save-actions-bar">
                    <div className="save-note">
                      <CheckCircle2 size={16} className="note-icon" />
                      <span>Changes will apply across your account immediately.</span>
                    </div>
                    <button type="submit" className="btn-solid-green profile-save-btn">
                      <Check size={18} />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ==============================================
          ORDER DETAIL MODAL (PERFECTED ALIGNMENT)
          ============================================== */}
      {selectedOrder && (
        <div className="orders-modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="orders-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="order-modal-header">
              <h3>Order Details: #{selectedOrder.id}</h3>
              <button className="btn-close-modal" onClick={() => setSelectedOrder(null)} aria-label="Close modal">
                <X size={20} />
              </button>
            </div>

            <div className="order-modal-body">
              {selectedOrder.status === 'Cancelled' && (
                <div className="order-cancelled-notice-bar">
                  <XCircle size={22} className="cancelled-notice-icon" />
                  <div className="cancelled-notice-text">
                    <h5>Order Cancelled</h5>
                    <p>This order was cancelled on <strong>{selectedOrder.cancelledDate || selectedOrder.date}</strong>. {selectedOrder.cancelReason ? `Reason: ${selectedOrder.cancelReason}.` : ''} The refund of ₹{selectedOrder.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })} has been credited back to your original payment mode.</p>
                  </div>
                </div>
              )}

              <div className="order-modal-meta-row">
                <div>
                  <span className="meta-label">PLACED ON:</span>
                  <p className="meta-val-text">{selectedOrder.date}</p>
                </div>
                {selectedOrder.expectedDelivery && selectedOrder.status !== 'Cancelled' && (
                  <div>
                    <span className="meta-label">EXPECTED ON:</span>
                    <p className="meta-val-text">{selectedOrder.expectedDelivery}</p>
                  </div>
                )}
                {selectedOrder.deliveredOn && (
                  <div>
                    <span className="meta-label">DELIVERED ON:</span>
                    <p className="meta-val-text">{selectedOrder.deliveredOn}</p>
                  </div>
                )}
                {selectedOrder.status === 'Cancelled' && (
                  <div>
                    <span className="meta-label">CANCELLED ON:</span>
                    <p className="meta-val-text">{selectedOrder.cancelledDate || selectedOrder.date}</p>
                  </div>
                )}
                <div>
                  <span className="meta-label">ORDER STATUS:</span>
                  <p className="meta-status-wrap">
                    <span className={`status-pill status-${selectedOrder.status.toLowerCase()}`}>
                      {selectedOrder.status}
                    </span>
                  </p>
                </div>
              </div>

              <div className="order-modal-items-section">
                <h4>Items Ordered</h4>
                <div className="items-list-box">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="modal-item-row">
                      <div className="item-left-cell">
                        <img src={item.image} alt={item.name} className="modal-item-thumb" />
                        <div className="modal-item-details">
                          <h5>{item.name}</h5>
                          <p>₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })} x {item.qty}</p>
                        </div>
                      </div>
                      <span className="modal-item-subtotal">₹{(item.price * item.qty).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-modal-price-breakdown">
                <div className="price-breakdown-row">
                  <span>Subtotal</span>
                  <span>₹{selectedOrder.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="price-breakdown-row">
                  <span>Delivery Charges</span>
                  <span className="text-green">FREE</span>
                </div>
                <div className="price-breakdown-row total-bold-row">
                  <span>{selectedOrder.status === 'Cancelled' ? 'Refund Amount' : 'Total Paid'}</span>
                  <span>₹{selectedOrder.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            <div className="order-modal-footer dual-modal-footer">
              {selectedOrder.status === 'Cancelled' ? (
                <button
                  className="btn-solid-green flex-1-btn"
                  onClick={() => {
                    handleReorder(selectedOrder);
                    setSelectedOrder(null);
                  }}
                >
                  <RotateCcw size={16} />
                  <span>Reorder Items</span>
                </button>
              ) : (
                <Link
                  to={`/track-order/${selectedOrder.id}`}
                  className="btn-solid-green flex-1-btn"
                  onClick={() => setSelectedOrder(null)}
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <Truck size={16} />
                  <span>Track Live Order</span>
                </Link>
              )}
              <button className="btn-outline-green flex-1-btn" onClick={() => setSelectedOrder(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
