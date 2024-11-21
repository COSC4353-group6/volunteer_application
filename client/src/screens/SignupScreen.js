import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Signup.css';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      alert('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      // Send user data to the backend
      const response = await axios.post('http://localhost:4000/api/signup', {
        email,
        password,
        role,
      });

      if (response.status === 200) {
        alert('User added successfully!');
        setEmail(''); // Reset email field
        setPassword(''); // Reset password field
        setRole(''); // Reset role field

        // Redirect to the sign-in page
        navigate('/signin');
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
    <div className="signup-container">
      <main className="form-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
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
              className="form-input"
              placeholder="Enter user password"
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
              <option value="volunteer">Volunteer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="form-button siginorsignupbtn" disabled={isLoading}>
            {isLoading ? 'Adding User...' : 'Submit'}
          </button>
        </form>
        <p className="form-question">
          Do you have an account already? <Link to="/signin" className="form-link">Sign in here</Link>
        </p>
      </main>
    </div>
  );
};

export default SignupScreen;
