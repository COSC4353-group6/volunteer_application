import express from 'express';
import { pool } from '../db.js';

const authrouter = express.Router();

authrouter.post('/signin', async (req, res) => {
  const { email, password, role } = req.body;

  // Validate input
  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Email, password, and role are required.' });
  }

  try {
    // Insert user into the UserCredentials table without explicitly using VALUES
    const query = `
      INSERT INTO UserCredentials SET email = ?, password = ?, role = ?
    `;

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

export default authrouter;
