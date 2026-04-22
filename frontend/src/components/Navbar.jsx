import React, { useState } from 'react';
import { ShoppingCart, User, Search, Leaf, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import LoginModal from './LoginModal';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--outline-variant)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '80px'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Leaf className="text-primary" size={32} />
          <span style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '24px', 
            fontWeight: 700,
            letterSpacing: '-0.02em'
          }}>
            EcoShop
          </span>
        </Link>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Link to="/products" style={{ fontWeight: 500 }}>Shop</Link>
          <Link to="/about" style={{ fontWeight: 500 }}>About</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" style={{ fontWeight: 600, color: 'var(--primary)' }}>Admin</Link>
          )}
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button className="icon-btn"><Search size={24} /></button>
          <button 
            className="icon-btn" 
            onClick={() => setIsCartOpen(true)}
            style={{ position: 'relative' }}
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: 'var(--primary)',
                color: 'white',
                fontSize: '10px',
                fontWeight: 700,
                padding: '2px 6px',
                borderRadius: '10px'
              }}>
                {cartCount}
              </span>
            )}
          </button>
          
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link to="/profile" className="icon-btn" title={user.name}>
                <User size={24} />
              </Link>
              <button onClick={handleLogout} className="icon-btn" title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button 
              className="btn btn-primary" 
              style={{ padding: '10px 20px' }}
              onClick={() => setIsLoginOpen(true)}
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSwitchToRegister={() => {}} // TODO: Register modal
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .icon-btn {
          color: var(--on-surface-variant);
          transition: color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-btn:hover {
          color: var(--primary);
        }
      `}} />
    </nav>
  );
};

export default Navbar;
