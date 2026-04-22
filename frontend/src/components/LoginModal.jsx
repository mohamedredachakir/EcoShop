import React, { useState } from 'react';
import { X, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)'
        }} 
      />
      
      <div className="card" style={{
        width: '100%',
        maxWidth: '450px',
        position: 'relative',
        zIndex: 1,
        padding: '40px',
        animation: 'modalScale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '24px', right: '24px', color: 'var(--on-surface-variant)' }}>
          <X size={24} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '8px' }}>Welcome Back</h2>
          <p style={{ color: 'var(--on-surface-variant)' }}>Log in to your EcoShop account</p>
        </div>

        {error && (
          <div style={{ 
            backgroundColor: 'var(--error-container)', 
            color: 'var(--on-error-container)', 
            padding: '12px 16px', 
            borderRadius: '8px',
            marginBottom: '24px',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <Mail style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--outline)' }} size={20} />
            <input 
              type="email" 
              placeholder="Email address"
              className="input-field" 
              style={{ paddingLeft: '48px' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--outline)' }} size={20} />
            <input 
              type="password" 
              placeholder="Password"
              className="input-field" 
              style={{ paddingLeft: '48px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{ textAlign: 'right' }}>
            <button type="button" style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: 600 }}>Forgot password?</button>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', height: '52px' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '14px', color: 'var(--on-surface-variant)' }}>
          Don't have an account? {' '}
          <button 
            onClick={onSwitchToRegister}
            style={{ color: 'var(--primary)', fontWeight: 700 }}
          >
            Create account
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes modalScale {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}} />
    </div>
  );
};

export default LoginModal;
