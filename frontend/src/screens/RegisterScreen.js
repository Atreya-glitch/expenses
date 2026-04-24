import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);

  const handleRegister = async (e) => {
    if (e) e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await register(name, email, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-dark d-flex align-items-center justify-content-center p-4 text-white" style={{ backgroundColor: '#0f172a' }}>
      <div className="w-100" style={{ maxWidth: '450px' }}>
        <div className="mb-5 text-center">
          <h1 className="display-4 fw-bolder text-primary mb-2">Create Account</h1>
          <p className="text-secondary fs-5">Start managing your finances today</p>
        </div>

        <form onSubmit={handleRegister}>
          {error && (
            <div className="alert alert-danger text-center fw-semibold mb-4 rounded-3">
              {error}
            </div>
          )}
          
          <CustomInput
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
          />

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
            title="Create Account" 
            loading={loading}
            type="submit"
          />

          <div className="text-center mt-4 pt-2">
            <span className="text-secondary me-2">Already have an account?</span>
            <button 
              type="button"
              className="btn btn-link p-0 fw-bold text-primary text-decoration-none" 
              onClick={() => navigation.navigate('Login')}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
