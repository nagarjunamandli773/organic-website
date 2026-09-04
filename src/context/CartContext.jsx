import React, { createContext, useContext, useState, useEffect } from 'react';
import { OFFERS } from '../data/offers';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
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

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('klan_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
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
          image: product.image
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

  const applyCoupon = (code) => {
    setCouponError('');
    if (!code) {
      setCouponError('Please enter a coupon code.');
      return false;
    }
    const found = OFFERS.find(o => o.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      setCouponError('Invalid coupon code. Try KLAN200, KLAN500, or FREESHIP');
      return false;
    }
    if (subtotal < found.minOrder) {
      setCouponError(`Minimum order amount for ${found.code} is ₹${found.minOrder}`);
      return false;
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied successfully!`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
    showToast('Coupon removed');
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'fixed') {
      discount = appliedCoupon.discountAmount;
    } else if (appliedCoupon.discountType === 'percent') {
      discount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountType === 'shipping') {
      discount = subtotal > 499 ? 49 : 0;
    }
  } else {
    // Default reference discount matching reference PPT screenshot (₹174.00)
    discount = subtotal > 1000 ? 174 : 0;
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
      appliedCoupon,
      couponError,
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
