import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ShieldCheck } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handlePlaceOrder = async () => {
    setError('');
    setLoading(true);

    try {
      await api.post('/orders');
      await clearCart();
      setSuccess(true);
      setTimeout(() => navigate('/products'), 1800);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to place order right now.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container" style={{ padding: '80px 0', maxWidth: '720px' }}>
        <div className="card" style={{ padding: '40px' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '12px' }}>Checkout</h1>
          <p style={{ color: 'var(--on-surface-variant)', marginBottom: '24px' }}>
            Please sign in before placing an order.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn-secondary">Back to products</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '48px 0 80px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '32px', alignItems: 'start' }}>
        <div className="card" style={{ padding: '32px' }}>
          <span className="badge badge-eco" style={{ marginBottom: '16px', display: 'inline-flex' }}>
            Secure Checkout
          </span>
          <h1 style={{ fontSize: '36px', marginBottom: '12px' }}>Review and place your order</h1>
          <p style={{ color: 'var(--on-surface-variant)', marginBottom: '28px' }}>
            Your order will be created from the current cart and linked to your account.
          </p>

          {success ? (
            <div style={{
              padding: '20px',
              borderRadius: '16px',
              backgroundColor: 'var(--primary-container)',
              color: 'var(--on-primary-container)',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <CheckCircle2 size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h3 style={{ marginBottom: '6px' }}>Order placed successfully</h3>
                <p>Your cart has been cleared and you will be redirected shortly.</p>
              </div>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '8px' }}>Account</h3>
                <p style={{ color: 'var(--on-surface-variant)' }}>{user.name} · {user.email}</p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '8px' }}>Delivery phone</h3>
                <p style={{ color: 'var(--on-surface-variant)' }}>
                  {user.phone || 'No phone number on file. You can update it in your profile later.'}
                </p>
              </div>

              {error && (
                <div style={{
                  backgroundColor: 'var(--error-container)',
                  color: 'var(--on-error-container)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  marginBottom: '20px'
                }}>
                  {error}
                </div>
              )}

              <button
                className="btn btn-primary"
                onClick={handlePlaceOrder}
                disabled={loading || cartItems.length === 0}
                style={{ width: '100%', height: '52px' }}
              >
                {loading ? 'Placing order...' : 'Place order'}
              </button>
            </>
          )}
        </div>

        <aside className="card" style={{ padding: '32px', position: 'sticky', top: '100px' }}>
          <h2 style={{ fontSize: '22px', marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <ShoppingBag size={20} /> Order summary
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            {cartItems.length === 0 ? (
              <p style={{ color: 'var(--on-surface-variant)' }}>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={`${item.cart_item_id || item.id}`} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: '14px', color: 'var(--on-surface-variant)' }}>Qty {item.quantity}</div>
                  </div>
                  <div style={{ fontWeight: 700 }}>${(Number(item.price) * item.quantity).toFixed(2)}</div>
                </div>
              ))
            )}
          </div>

          <div style={{ borderTop: '1px solid var(--outline-variant)', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: 'var(--on-surface-variant)' }}>Subtotal</span>
              <strong>${cartTotal.toFixed(2)}</strong>
            </div>
            <div style={{ display: 'flex', gap: '10px', color: 'var(--on-surface-variant)', fontSize: '14px' }}>
              <ShieldCheck size={18} />
              Secure checkout powered by authenticated API requests.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;