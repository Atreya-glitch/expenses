import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-dark d-flex align-items-center justify-content-center p-4 text-white" style={{ backgroundColor: '#0f172a' }}>
      <div className="w-100" style={{ maxWidth: '450px' }}>
        <div className="mb-5">
          <h1 className="display-4 fw-bolder text-primary mb-2">Welcome Back</h1>
          <p className="text-secondary fs-5">Sign in to track your expenses</p>
        </div>

        <form onSubmit={handleLogin}>
          {error && (
            <div className="alert alert-danger text-center fw-semibold mb-4 rounded-3">
              {error}
            </div>
          )}
          
          <CustomInput
            label="Email Address"
            placeholder="example@mail.com"
            value={email}
            onChangeText={setEmail}
            type="email"
          />

          <CustomInput
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            type="password"
          />

          <CustomButton 
            title="Sign In" 
            loading={loading}
            type="submit"
          />

          <div className="text-center mt-4 pt-2">
            <span className="text-secondary me-2">Don't have an account?</span>
            <button 
              type="button"
              className="btn btn-link p-0 fw-bold text-primary text-decoration-none" 
              onClick={() => navigation.navigate('Register')}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
