import express from 'express';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator'




const router = express.Router();

// Dummy data for users to simulate database
const users = [
  {
    id: '1',
    email: 'john.ramirez@gmail.com',
    password: 'john123',  // Plain-text password (only for testing)
  },
  {
    id: '2',
    email: 'jane_johnson@gmail.com',
    password: 'jane123',  // Plain-text password (only for testing)
  },
  {
    id: '3',
    email: 'alex.jones@hotmail.com',
    password: 'Alex123',    // Plain-text password (only for testing)
  }
  {
    id: '4',
    email: 'jade_075@gmail.com',
    password: 'jade123',  // Plain-text password (only for testing)
  },
  {
    id: '5',
    email: 'william_johnson@hotmail.com',
    password: 'william123',  // Plain-text password (only for testing)
  },
  {
    id: '6',
    email: 'scott_mane@gmail.com',
    password: 'scott123',    // Plain-text password (only for testing)
  }
];

// @route POST /api/auth/register
// @desc Register a new user
router.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if user already exists in the dummy array
    const userExists = users.find(user => user.email === email);
    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Add new user to dummy array
    const newUser = { id: `${users.length + 1}`, email, password };
    users.push(newUser);

    // Generate JWT token
    const payload = { user: { email } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  }
);

// @route POST /api/auth/login
// @desc Login a user and get token
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user in dummy array
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare password (plain-text for testing)
    if (password !== user.password) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT Token
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  }
);

export default router;
