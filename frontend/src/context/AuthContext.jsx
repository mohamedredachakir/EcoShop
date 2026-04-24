import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const persistToken = (responseData) => {
    const token = responseData?.access_token || responseData?.token;
    if (token) {
      localStorage.setItem('token', token);
    }
    return token;
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.get('/user');
          setUser(response.data);
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/login', { email, password });
    const { user } = response.data;
    persistToken(response.data);
    setUser(user);
    return user;
  };

  const register = async (userData) => {
    const response = await api.post('/register', userData);
    const { user } = response.data;
    persistToken(response.data);
    setUser(user);
    return user;
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout failed', error);
    }
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
