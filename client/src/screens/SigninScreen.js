import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/volt2.png';  // Update the image path
import '../styles/Signin.css';  // Ensure the CSS file is linked correctly

const SigninScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Signing in as ${userType} with email ${email}`);
    alert(`Signed in as ${userType}`);
  };

  return (
    <div className="signin-container">
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="header-logo" />
          <h1 className="header-title">Sign In</h1>
        </div>
      </header>
      <main className="form-container">
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="form-group">
            <label htmlFor="signinEmail" className="form-label">Email:</label>
            <input
              type="email"
              id="signinEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="signinPassword" className="form-label">Password:</label>
            <input
              type="password"
              id="signinPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="userType" className="form-label">Sign in as:</label>
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

          <button type="submit" className="form-button">Sign In</button>
        </form>

        <p className="form-question">
          Don't have an account? <Link to="/signup" className="form-link">Sign up here</Link>
        </p>  {/* Use same class "form-question" and "form-link" */}
      </main>
    </div>
  );
};

export default SigninScreen;

