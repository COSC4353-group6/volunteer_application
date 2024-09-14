import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Signup.css'; 

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Signing up as ${userType} with email ${email}`);
    // Add your logic for handling the signup here (e.g., send data to server)
    alert(`Signed up as ${userType}`);
  };

  return (
    <div>
      <header>
        <img src="/volt2.png" alt="Logo" className="header-logo" /> {/* Image in the corner */}
        Sign Up
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="signupEmail">Email:</label>
            <input
              type="email"
              id="signupEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="signupPassword">Password:</label>
            <input
              type="password"
              id="signupPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="userType">Sign up as:</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="">Select User Type</option>
              <option value="volunteer">Volunteer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit">Sign Up</button>
        </form>
        <div className="signup-section">
          <p className="signup-question">
            Already have an account?
          </p>
          <Link to="/signin">
            <button className="signin-button">Log in here</button>
          </Link>
        </div>
        </main>
    </div>
  );
};

export default SignupScreen;