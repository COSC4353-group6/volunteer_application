import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/volt2.png';
import '../styles/Signup.css';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        alert('Sign-up successful!');
      } else {
        alert(`Error: ${data.error || data.msg}`);
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  return (
    <div className="signup-container">
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="header-logo" />
          <h1 className="header-title">Sign Up</h1>
        </div>
      </header>
      <main className="form-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="signupEmail" className="form-label">Email:</label>
            <input
              type="email"
              id="signupEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="signupPassword" className="form-label">Password:</label>
            <input
              type="password"
              id="signupPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="userType" className="form-label">Sign up as:</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="form-input"
              required
            >
              <option value="">Select User Type</option>
              <option value="volunteer">Volunteer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="form-button siginorsignupbtn">Sign Up</button>
        </form>

        <p className="form-question">
          Already have an account? <Link to="/signin" className="form-link">Log in here</Link>
        </p>
      </main>
    </div>
  );
};

export default SignupScreen;
