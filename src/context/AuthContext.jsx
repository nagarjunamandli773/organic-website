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
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);

  const openAuthModal = (tab = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openWelcomeModal = () => {
    setIsWelcomeModalOpen(true);
  };

  const closeWelcomeModal = () => {
    setIsWelcomeModalOpen(false);
  };

  const login = (userData) => {
    const email = userData.email || 'customer@klanorganics.com';
    const userEmailKey = email.toLowerCase().trim();
    const welcomeKey = `klan_welcome_shown_${userEmailKey}`;
    const hasSeenWelcomeBefore = localStorage.getItem(welcomeKey);

    const updated = {
      name: userData.name || (userData.email ? userData.email.split('@')[0] : 'Customer'),
      email: email,
      phone: userData.phone || '+91 98765 43210',
      isLoggedIn: true,
      location: userData.location || 'Bangalore, 560001',
      hasReceivedWelcomeCoupon: true
    };
    setUser(updated);
    localStorage.setItem('klan_user', JSON.stringify(updated));
    closeAuthModal();

    if (!hasSeenWelcomeBefore) {
      localStorage.setItem(welcomeKey, 'true');
      setTimeout(() => {
        setIsWelcomeModalOpen(true);
      }, 200);
    }
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
    setIsWelcomeModalOpen(false);
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
      setDeliveryLocation,
      isWelcomeModalOpen,
      openWelcomeModal,
      closeWelcomeModal
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

