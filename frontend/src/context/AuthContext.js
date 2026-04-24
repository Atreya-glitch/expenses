import React, { createContext, useState, useEffect } from 'react';
import * as Storage from '../utils/storage';
import axios from 'axios';
import { API_BASE_URL } from '../config';

axios.defaults.withCredentials = true;

export const AuthContext = createContext();

const API_URL = `${API_BASE_URL}/auth`; 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const storedUser = await Storage.getItem('userData');
      if (storedUser) {
        setToken('cookie_auth'); // Dummy token to bypass navigation checks if any, or just use user state
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.log('Error loading auth state:', e);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { user: userData } = response.data;
    
    await Storage.setItem('userData', JSON.stringify(userData));
    
    setToken('cookie_auth');
    setUser(userData);
  };

  const register = async (name, email, password) => {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    const { user: userData } = response.data;

    await Storage.setItem('userData', JSON.stringify(userData));

    setToken('cookie_auth');
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/logout`);
    } catch (e) {
      console.log('Logout error', e);
    }
    await Storage.deleteItem('userData');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
