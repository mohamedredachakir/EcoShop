import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== passwordConfirmation) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await register({
        name,
        email,
        phone,
        password,
        password_confirmation: passwordConfirmation,
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create account right now.');
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
        maxWidth: '480px',
        position: 'relative',
        zIndex: 1,
        padding: '40px',
        animation: 'modalScale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '24px', right: '24px', color: 'var(--on-surface-variant)' }}>
          <X size={24} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '8px' }}>Create Account</h2>
          <p style={{ color: 'var(--on-surface-variant)' }}>Join EcoShop and start your sustainable journey</p>
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
            <User style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--outline)' }} size={20} />
            <input
              type="text"
              placeholder="Full name"
              className="input-field"
              style={{ paddingLeft: '48px' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
            <Phone style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--outline)' }} size={20} />
            <input
              type="tel"
              placeholder="Phone number"
              className="input-field"
              style={{ paddingLeft: '48px' }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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

          <div style={{ position: 'relative' }}>
            <Lock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--outline)' }} size={20} />
            <input
              type="password"
              placeholder="Confirm password"
              className="input-field"
              style={{ paddingLeft: '48px' }}
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', height: '52px' }}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '14px', color: 'var(--on-surface-variant)' }}>
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Log in
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

export default RegisterModal;