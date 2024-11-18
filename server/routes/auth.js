import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { check, validationResult } from 'express-validator';
import { pool } from '../db.js';

const router = express.Router();

// REGISTER User
router.post('/register', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // Check if user exists
      const [existingUser] = await pool.query(`SELECT * FROM UserCredentials WHERE email = ?`, [email]);
      if (existingUser.length > 0) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insert new user
      await pool.query(`INSERT INTO UserCredentials (email, password) VALUES (?, ?)`, [email, hashedPassword]);
      res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error registering user' });
    }
});

// LOGIN User
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // Fetch user from database
      const [user] = await pool.query(`SELECT * FROM UserCredentials WHERE email = ?`, [email]);
      if (user.length === 0) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Validate password
      const isMatch = await bcrypt.compare(password, user[0].password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Generate JWT token
      const payload = { userId: user[0].id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
});

export default router;