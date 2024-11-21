import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Signin.css';
import logo from '../images/volt2.png';

const SigninScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send credentials to the backend
      const { data } = await axios.post('http://localhost:4000/api/signin', {
        email,
        password,
        role,
      });

      // Save user info to localStorage for later use
      localStorage.setItem('userInfo', JSON.stringify(data));

      // Redirect based on role
      if (data.role === 'admin') {
            navigate('/');
      } else if (data.role === 'Volunteer') {
        navigate('/');
      } else {
        alert('Role not recognized. Please contact support.');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      alert('Sign-in failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <main className="form-container">
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role" className="form-label">Role:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-input"
              required
            >
              <option value="">Select Role</option>
              <option value="Volunteer">Volunteer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="form-button siginorsignupbtn" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="form-question">
          Don't have an account? <Link to="/signup" className="form-link">Sign up here</Link>
        </p>
      </main>
    </div>
  );
};

export default SigninScreen;
