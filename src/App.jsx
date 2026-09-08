import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { MobileMenu } from './components/MobileMenu';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { WelcomeCouponModal } from './components/WelcomeCouponModal';
import { Footer } from './components/Footer';
import { ToastNotification } from './components/ToastNotification';

import { Home } from './pages/Home';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { OffersPage } from './pages/OffersPage';
import { ComboOffersPage } from './pages/ComboOffersPage';
import { SnacksSweetsPage } from './pages/SnacksSweetsPage';
import { HealthyDrinksPage } from './pages/HealthyDrinksPage';
import { ReadyToEatPage } from './pages/ReadyToEatPage';
import { SanitaryPage } from './pages/SanitaryPage';
import { BlogPage } from './pages/BlogPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <div className="app-container">
              {/* Announcement Top Bar matching image1.png */}
              <TopBar />

              {/* Main Header matching image1.png */}
              <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

              {/* Category Navigation Bar matching image1.png */}
              <Navigation />

              {/* Mobile Drawer Menu */}
              <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
              />

              {/* Slide-over Cart Drawer */}
              <CartDrawer />

              {/* Login / Sign Up Modal */}
              <AuthModal />

              {/* First-Time User Welcome Coupon Modal */}
              <WelcomeCouponModal />

              {/* Global Toast Notifications */}
              <ToastNotification />

              {/* Main Page Routing */}
              <main className="main-content-wrapper">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<CategoryPage />} />
                  <Route path="/fruits" element={<CategoryPage />} />
                  <Route path="/category/:categorySlug" element={<CategoryPage />} />
                  <Route path="/product/:productId" element={<ProductDetailsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-success" element={<OrderSuccessPage />} />
                  <Route path="/track-order" element={<TrackOrderPage />} />
                  <Route path="/track-order/:orderId" element={<TrackOrderPage />} />
                  <Route path="/orders" element={<MyOrdersPage initialNav="orders" />} />
                  <Route path="/wishlist" element={<MyOrdersPage initialNav="wishlist" />} />
                  <Route path="/offers" element={<OffersPage />} />
                  <Route path="/combo-offers" element={<ComboOffersPage />} />
                  <Route path="/combos" element={<ComboOffersPage />} />
                  <Route path="/everyday-essentials" element={<CategoryPage />} />
                  <Route path="/category/everyday-essentials" element={<CategoryPage />} />
                  <Route path="/snacks-sweets" element={<SnacksSweetsPage />} />
                  <Route path="/category/snacks-sweets" element={<SnacksSweetsPage />} />
                  <Route path="/healthy-drinks" element={<HealthyDrinksPage />} />
                  <Route path="/category/healthy-drinks" element={<HealthyDrinksPage />} />
                  <Route path="/ready-to-eat" element={<ReadyToEatPage />} />
                  <Route path="/category/ready-to-eat" element={<ReadyToEatPage />} />
                  <Route path="/sanitary" element={<SanitaryPage />} />
                  <Route path="/category/sanitary" element={<SanitaryPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<LoginPage />} />
                  <Route path="/register" element={<LoginPage />} />
                  <Route path="/auth" element={<LoginPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>

              {/* Footer */}
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
