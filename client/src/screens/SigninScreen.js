import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Signin.css'; 

const SigninScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Signing in as ${userType} with email ${email}`);
    // Add your logic for handling the signin here (e.g., send data to server)
    alert(`Signed in as ${userType}`);
  };

  return (
    <div>
      <header>
        <img src="/volt2.png" alt="Logo" className="header-logo" /> {/* Image in the corner */}
        Sign In
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="signinEmail">Email:</label>
            <input
              type="email"
              id="signinEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="signinPassword">Password:</label>
            <input
              type="password"
              id="signinPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="userType">Sign in as:</label>
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

          <button type="submit">Sign In</button>
        </form>
        <div className="signup-section">
          <p className="signup-question">
            Don't have an account?
          </p>
          <Link to="/signup">
            <button className="signup-button">Sign up here</button>
          </Link>
        </div>
        </main>
    </div>
  );
};

export default SigninScreen;

