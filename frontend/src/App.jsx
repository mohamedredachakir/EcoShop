import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Products from './pages/Products';
import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';

const StaticPage = ({ title, description }) => (
  <div className="container" style={{ padding: '80px 0', maxWidth: '900px' }}>
    <div className="card" style={{ padding: '40px' }}>
      <h1 style={{ fontSize: '40px', marginBottom: '16px' }}>{title}</h1>
      <p style={{ color: 'var(--on-surface-variant)', fontSize: '18px', lineHeight: 1.7 }}>
        {description}
      </p>
    </div>
  </div>
);

const Profile = () => (
  <StaticPage
    title="User Profile"
    description="Your profile page is available from the navbar after signing in. Add profile editing here when account updates are required."
  />
);

const pageText = {
  about: 'EcoShop curates sustainable essentials that combine thoughtful design, responsible sourcing, and everyday usefulness.',
  sustainability: 'We focus on products and partners that reduce waste, support ethical production, and make low-impact choices easier.',
  contact: 'Reach the team through the support channels you want to expose here, or add a contact form backed by your API.',
  faq: 'Add your most common customer questions here, including shipping, returns, payments, and product care.',
  shipping: 'Explain delivery timeframes, carriers, tracking, and any regions you support for orders.',
  returns: 'Describe your return window, eligibility rules, and how customers request replacements or refunds.',
  privacy: 'Publish your privacy policy here, including how account, cart, and order data are processed.',
  terms: 'Publish your terms of service here, including purchase rules, delivery conditions, and account usage.',
};

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
                <Route path="/products/new" element={<Products />} />
                <Route path="/products/best" element={<Products />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/about" element={<StaticPage title="Our Story" description={pageText.about} />} />
                <Route path="/sustainability" element={<StaticPage title="Sustainability" description={pageText.sustainability} />} />
                <Route path="/contact" element={<StaticPage title="Contact" description={pageText.contact} />} />
                <Route path="/faq" element={<StaticPage title="FAQs" description={pageText.faq} />} />
                <Route path="/shipping" element={<StaticPage title="Shipping" description={pageText.shipping} />} />
                <Route path="/returns" element={<StaticPage title="Returns" description={pageText.returns} />} />
                <Route path="/privacy" element={<StaticPage title="Privacy Policy" description={pageText.privacy} />} />
                <Route path="/terms" element={<StaticPage title="Terms of Service" description={pageText.terms} />} />
                <Route path="*" element={<StaticPage title="Page not found" description="The page you tried to open does not exist. Use the navigation to return to the store." />} />
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
