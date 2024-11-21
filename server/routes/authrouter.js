import express from 'express';
import { pool } from '../db.js';

const authrouter = express.Router();

// Signup Route
authrouter.post('/signup', async (req, res) => {
  const { email, password, role } = req.body;

  // Validate input
  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Email, password, and role are required.' });
  }

  try {
    // Insert user into the UserCredentials table
    const query = `INSERT INTO UserCredentials (email, password, role) VALUES (?, ?, ?)`;

    await pool.query(query, [email, password, role]);

    res.status(200).json({ success: true, message: 'User added successfully!' });
  } catch (error) {
    console.error('Error inserting user into UserCredentials:', error);

    // Handle duplicate email error (MySQL error code 1062)
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'User with this email already exists.' });
    } else {
      res.status(500).json({ error: 'Failed to add user to the database.' });
    }
  }
});

// Signin Route
authrouter.post('/signin', async (req, res) => {
  const { email, password, role } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Check if user exists and validate password
    const query = `SELECT * FROM UserCredentials WHERE email = ? AND password = ?`;
    const [rows] = await pool.query(query, [email, password, role]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Extract user role
    const user = rows[0];
    res.status(200).json({ token: 'dummy-auth-token', role: user.role });
  } catch (error) {
    console.error('Error during user authentication:', error);
    res.status(500).json({ error: 'Failed to authenticate user.' });
  }
});

export default authrouter;
