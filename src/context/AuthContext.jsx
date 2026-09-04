import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('klan_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      name: '',
      email: '',
      phone: '',
      isLoggedIn: false,
      location: 'Bangalore, 560001'
    };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' | 'register'
  const [deliveryLocation, setDeliveryLocation] = useState('Bangalore - 560001');

  const openAuthModal = (tab = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (userData) => {
    const updated = {
      name: userData.name || (userData.email ? userData.email.split('@')[0] : 'Customer'),
      email: userData.email || 'customer@klanorganics.com',
      phone: userData.phone || '+91 98765 43210',
      isLoggedIn: true,
      location: userData.location || 'Bangalore, 560001'
    };
    setUser(updated);
    localStorage.setItem('klan_user', JSON.stringify(updated));
    closeAuthModal();
  };

  const logout = () => {
    const loggedOutUser = {
      name: '',
      email: '',
      phone: '',
      isLoggedIn: false,
      location: ''
    };
    setUser(loggedOutUser);
    localStorage.setItem('klan_user', JSON.stringify(loggedOutUser));
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      isAuthModalOpen,
      openAuthModal,
      closeAuthModal,
      authModalTab,
      setAuthModalTab,
      login,
      logout,
      deliveryLocation,
      setDeliveryLocation
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

