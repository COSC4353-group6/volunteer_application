import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Signin.css';
import logo from '../images/volt2.png';

const SigninScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      alert('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      // Send a single user's data to the backend
      const response = await axios.post('/api/signin', { email, password, role });

      if (response.status === 200) {
        alert('User added successfully!');
        setEmail(''); // Reset email field
        setPassword(''); // Reset password field
        setRole(''); // Reset role field
      } else {
        alert(`Error: ${response.data.error || 'Failed to add user.'}`);
      }
    } catch (error) {
      console.error('Error adding user:', error);
      const errorMessage = error.response?.data?.error || 'An unexpected error occurred. Please try again.';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
            <label htmlFor="email"className="form-label">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter user email"
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
              placeholder="Enter user password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role"className="form-label" >Role:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="volunteer">Volunteer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Adding User...' : 'Submit'}
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
