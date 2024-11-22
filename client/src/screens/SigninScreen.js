import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Signin.css';

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
      const { data } = await axios.post('http://localhost:4000/api/signin', {
        email,
        password,
        role,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));

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
          <h2 style={{ color: 'yellow' }}>Sign In</h2>
          <div className="form-group">
            <label htmlFor="email" className="form-label" style={{ color: 'white' }}>
              Email:
            </label>
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
            <label htmlFor="password" className="form-label" style={{ color: 'white' }}>
              Password:
            </label>
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
            <label htmlFor="role" className="form-label" style={{ color: 'white' }}>
              Role:
            </label>
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
