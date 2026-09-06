import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = () => {
  const {
    cartItems,
    cartCount,
    subtotal,
    total,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title-flex">
            <ShoppingCart size={20} />
            <h2>Your Shopping Cart ({cartCount})</h2>
          </div>
          <button className="close-drawer-btn" onClick={() => setIsCartOpen(false)} title="Close cart">
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          {cartItems.length === 0 ? (
            <div className="drawer-empty">
              <div className="empty-cart-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added any organic items yet.</p>
              <button
                className="btn-solid-green"
                onClick={() => setIsCartOpen(false)}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="drawer-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="drawer-item">
                  <img src={item.image} alt={item.name} className="item-thumb" />
                  <div className="item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <span className="item-unit">{item.unit || '1 unit'}</span>
                    <span className="item-price">₹{item.price.toFixed(2)}</span>
                  </div>
                  <div className="item-qty-controls">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                      title="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="qty-num">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, 1)}
                      title="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <button
                    className="item-remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span className="summary-price">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total Amount:</span>
              <span className="summary-price-bold">₹{total.toFixed(2)}</span>
            </div>
            <div className="drawer-actions">
              <Link
                to="/cart"
                className="btn-outline-green"
                onClick={() => setIsCartOpen(false)}
              >
                View Full Cart
              </Link>
              <Link
                to="/checkout"
                className="btn-solid-green"
                onClick={() => setIsCartOpen(false)}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
