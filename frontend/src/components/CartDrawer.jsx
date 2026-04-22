import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '100%',
      height: '100%',
      zIndex: 1000,
      display: 'flex'
    }}>
      {/* Overlay */}
      <div 
        onClick={() => setIsCartOpen(false)}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)'
        }} 
      />
      
      {/* Drawer */}
      <div style={{
        width: '400px',
        backgroundColor: 'var(--surface)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
        animation: 'slideIn 0.3s ease-out'
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--outline-variant)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShoppingBag className="text-primary" /> Your Cart
          </h2>
          <button onClick={() => setIsCartOpen(false)}><X /></button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ color: 'var(--on-surface-variant)', marginBottom: '24px' }}>Your cart is empty.</p>
              <Link to="/products" onClick={() => setIsCartOpen(false)} className="btn btn-primary">Start Shopping</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{item.name}</div>
                    <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>${item.price}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        backgroundColor: 'var(--surface-container-low)', 
                        borderRadius: '8px',
                        padding: '4px'
                      }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '4px' }}><Minus size={14} /></button>
                        <span style={{ minWidth: '30px', textAlign: 'center', fontSize: '14px', fontWeight: 600 }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '4px' }}><Plus size={14} /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--error)', padding: '4px' }}><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div style={{ padding: '24px', borderTop: '1px solid var(--outline-variant)', backgroundColor: 'var(--surface-container-low)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: 'var(--on-surface-variant)' }}>Subtotal</span>
              <span style={{ fontWeight: 700, fontSize: '20px' }}>${cartTotal.toFixed(2)}</span>
            </div>
            <Link 
              to="/checkout" 
              onClick={() => setIsCartOpen(false)} 
              className="btn btn-primary" 
              style={{ width: '100%' }}
            >
              Checkout Now
            </Link>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}} />
    </div>
  );
};

export default CartDrawer;
