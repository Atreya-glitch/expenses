import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { API_BASE_URL } from '../config';

export const ExpenseContext = createContext();

const API_URL = `${API_BASE_URL}/expenses`;

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  const fetchExpenses = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setExpenses(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${API_URL}/summary`);
      setSummary(response.data);
    } catch (err) {
      console.log('Failed to fetch summary');
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const response = await axios.post(API_URL, expenseData);
      setExpenses([response.data, ...expenses]);
      fetchSummary();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateExpense = async (id, expenseData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, expenseData);
      setExpenses(expenses.map(e => e._id === id ? response.data : e));
      fetchSummary();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setExpenses(expenses.filter(e => e._id !== id));
      fetchSummary();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    if (token) {
      fetchExpenses();
      fetchSummary();
    }
  }, [token]);

  return (
    <ExpenseContext.Provider value={{ 
      expenses, 
      summary, 
      loading, 
      error, 
      fetchExpenses, 
      fetchSummary,
      addExpense, 
      updateExpense, 
      deleteExpense 
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};
