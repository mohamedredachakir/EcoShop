import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Products from './pages/Products';
import AdminDashboard from './pages/AdminDashboard';

// Placeholder pages for others
const Profile = () => <div className="container" style={{ padding: '80px 0' }}><h2>User Profile Page</h2><p>Coming soon based on Stitch design.</p></div>;
const Checkout = () => <div className="container" style={{ padding: '80px 0' }}><h2>Checkout Page</h2><p>Process your order securely.</p></div>;

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Navbar />
            <CartDrawer />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
            
            <footer style={{
              backgroundColor: 'var(--surface-container-highest)',
              padding: '80px 0 40px',
              marginTop: '80px'
            }}>
              <div className="container">
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr',
                  gap: '64px',
                  marginBottom: '64px'
                }}>
                  <div>
                    <h3 style={{ marginBottom: '24px' }}>EcoShop</h3>
                    <p style={{ color: 'var(--on-surface-variant)', maxWidth: '320px' }}>
                      Empowering conscious consumers with sustainable products that respect our planet and its people.
                    </p>
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '24px' }}>Shop</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--on-surface-variant)' }}>
                      <Link to="/products">All Products</Link>
                      <Link to="/products/new">New Arrivals</Link>
                      <Link to="/products/best">Best Sellers</Link>
                    </div>
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '24px' }}>Company</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--on-surface-variant)' }}>
                      <Link to="/about">Our Story</Link>
                      <Link to="/sustainability">Sustainability</Link>
                      <Link to="/contact">Contact</Link>
                    </div>
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '24px' }}>Support</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--on-surface-variant)' }}>
                      <Link to="/faq">FAQs</Link>
                      <Link to="/shipping">Shipping</Link>
                      <Link to="/returns">Returns</Link>
                    </div>
                  </div>
                </div>
                <div style={{
                  paddingTop: '40px',
                  borderTop: '1px solid var(--outline-variant)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '14px',
                  color: 'var(--on-surface-variant)'
                }}>
                  <div>© 2026 EcoShop. All rights reserved.</div>
                  <div style={{ display: 'flex', gap: '24px' }}>
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms of Service</Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
