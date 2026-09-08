import React, { createContext, useContext, useState, useEffect } from 'react';
import { OFFERS } from '../data/offers';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('klan_cart');
    return saved ? JSON.parse(saved) : [
      {
        id: 'v-1',
        name: 'Organic Vegetables Basket',
        price: 299.00,
        unit: '1 kg',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&auto=format&fit=crop&q=80'
      },
      {
        id: 'c-1',
        name: 'Aloe Vera Gel',
        price: 399.00,
        unit: '200 ml',
        quantity: 1,
        image: '/images/hero_cosmetics.jpg'
      },
      {
        id: 'fer-1',
        name: 'Vermicompost',
        price: 249.00,
        unit: '5 kg',
        quantity: 2,
        image: '/images/hero_fertilizer.jpg'
      },
      {
        id: 'ho-5',
        name: 'Rosemary Hair Oil',
        price: 349.00,
        unit: '100 ml',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&auto=format&fit=crop&q=80'
      },
      {
        id: 'oc-1',
        name: 'Organic Liquid Fertilizer',
        price: 199.00,
        unit: '1 L',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300&auto=format&fit=crop&q=80'
      }
    ];
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('klan_applied_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('klan_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('klan_applied_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('klan_applied_coupon');
    }
  }, [appliedCoupon]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const getUserKey = () => {
    if (user && user.email) {
      return user.email.toLowerCase().trim();
    }
    return 'guest';
  };

  const isCouponUsedByUser = (code, offerObj) => {
    const userKey = getUserKey();
    const usedCouponsKey = `klan_used_coupons_${userKey}`;
    try {
      const usedList = JSON.parse(localStorage.getItem(usedCouponsKey) || '[]');
      if (Array.isArray(usedList) && usedList.includes(code.toUpperCase())) {
        return true;
      }
    } catch (e) {
      // ignore
    }

    if (offerObj?.isFirstOrderOnly || code.toUpperCase() === 'WELCOME10') {
      const hasCompletedOrder = userKey !== 'guest' && localStorage.getItem(`klan_has_completed_order_${userKey}`);
      const hasUsedWelcome = userKey !== 'guest' && localStorage.getItem(`klan_used_welcome_coupon_${userKey}`);
      if (hasCompletedOrder || hasUsedWelcome) {
        return true;
      }
    }

    return false;
  };

  const markCouponAsUsed = (code) => {
    if (!code) return;
    const cleanCode = code.toUpperCase();
    const userKey = getUserKey();
    const usedCouponsKey = `klan_used_coupons_${userKey}`;
    try {
      const existing = JSON.parse(localStorage.getItem(usedCouponsKey) || '[]');
      if (!existing.includes(cleanCode)) {
        existing.push(cleanCode);
        localStorage.setItem(usedCouponsKey, JSON.stringify(existing));
      }
    } catch (e) {
      localStorage.setItem(usedCouponsKey, JSON.stringify([cleanCode]));
    }

    if (userKey !== 'guest' && (cleanCode === 'WELCOME10' || appliedCoupon?.isFirstOrderOnly)) {
      localStorage.setItem(`klan_used_welcome_coupon_${userKey}`, 'true');
    }

    setAppliedCoupon(null);
    localStorage.removeItem('klan_applied_coupon');
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          unit: product.unit || '1 unit',
          quantity,
          image: product.image,
          category: product.category
        }
      ];
    });
    showToast(`Added "${product.name}" to cart!`);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showToast('Item removed from cart');
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const applyCoupon = (code) => {
    setCouponError('');
    setCouponSuccess('');

    if (!code || !code.trim()) {
      setCouponError('Please enter a coupon code.');
      return false;
    }

    const cleanCode = code.trim().toUpperCase();
    const found = OFFERS.find(o => o.code.toUpperCase() === cleanCode);

    if (!found) {
      setCouponError('Invalid coupon code. Please check and try again.');
      return false;
    }

    // Expiration check
    if (found.expiryDate) {
      const today = new Date().toISOString().split('T')[0];
      if (today > found.expiryDate) {
        setCouponError(`This coupon (${found.code}) expired on ${found.expiryDateFormatted || found.expiryDate}.`);
        return false;
      }
    }

    // Single-use / user restriction check
    if (isCouponUsedByUser(found.code, found)) {
      setCouponError(`You have already used coupon code "${found.code}".`);
      return false;
    }

    // First order requirement check
    if (found.isFirstOrderOnly || found.code === 'WELCOME10') {
      if (!user || !user.isLoggedIn) {
        setCouponError('WELCOME10 coupon is only available for logged-in first-time users. Please log in first.');
        return false;
      }
    }

    // Minimum Order Value check
    if (subtotal < found.minOrder) {
      const needed = (found.minOrder - subtotal).toFixed(2);
      setCouponError(`Minimum order amount of ₹${found.minOrder} is required for ${found.code}. Add ₹${needed} more to apply.`);
      return false;
    }

    // Category specific check (e.g. COS20 for Cosmetics)
    if (found.category) {
      const hasCategoryItem = cartItems.some(item => 
        (item.category && item.category.toLowerCase().includes(found.category.toLowerCase())) ||
        (item.name && item.name.toLowerCase().includes(found.category.toLowerCase()))
      );
      if (!hasCategoryItem) {
        setCouponError(`Coupon ${found.code} is valid only on ${found.category} products.`);
        return false;
      }
    }

    setAppliedCoupon(found);
    setCouponSuccess(`Coupon "${found.code}" applied successfully!`);
    showToast(`Coupon "${found.code}" applied successfully!`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    localStorage.removeItem('klan_applied_coupon');
    setCouponError('');
    setCouponSuccess('Coupon removed.');
    showToast('Coupon removed');
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    localStorage.removeItem('klan_applied_coupon');
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  let discount = 0;
  if (appliedCoupon) {
    // Re-verify minimum order value in case items were removed from cart
    if (subtotal < appliedCoupon.minOrder) {
      setAppliedCoupon(null);
      localStorage.removeItem('klan_applied_coupon');
      setCouponError(`Coupon ${appliedCoupon.code} removed because subtotal fell below ₹${appliedCoupon.minOrder}`);
      discount = 0;
    } else if (appliedCoupon.discountType === 'fixed') {
      discount = appliedCoupon.discountAmount;
    } else if (appliedCoupon.discountType === 'percent') {
      discount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountType === 'shipping') {
      discount = subtotal >= 499 ? 49 : 0;
    }
  } else {
    discount = 0;
  }

  const deliveryFee = subtotal >= 499 || (appliedCoupon && appliedCoupon.discountType === 'shipping') ? 0 : 49;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      subtotal,
      discount,
      deliveryFee,
      total,
      addToCart,
      removeFromCart,
      updateQuantity,
      applyCoupon,
      removeCoupon,
      markCouponAsUsed,
      isCouponUsedByUser,
      appliedCoupon,
      couponError,
      setCouponError,
      couponSuccess,
      setCouponSuccess,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      toastMessage,
      showToast
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
