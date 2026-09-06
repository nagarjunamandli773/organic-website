import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ToastNotification = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="toast-notification">
      <CheckCircle2 size={18} className="toast-icon" />
      <span>{toastMessage}</span>
    </div>
  );
};
