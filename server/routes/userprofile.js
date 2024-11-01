import express from 'express';
import { pool } from '../db.js'; // Use curly braces for named import
import { body, validationResult } from 'express-validator';

const userProfileRouter = express.Router();

// Endpoint to insert user profile data
userProfileRouter.post(
  '/user-profile',
  [
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('address1').notEmpty().withMessage('Address line 1 is required'),
    // Add other validations as necessary
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, address1, address2, city, state_name, zipCode, skill, preferences, availability } = req.body;

    try {
      // Insert user profile into the database
      await pool.query(
        `INSERT INTO userProfile (fullName, address1, address2, city, state_name, zipCode, skill, preferences, availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [fullName, address1, address2, city, state_name, zipCode, skill, preferences, JSON.stringify(availability)]
      );

      res.json({ success: true }); // Send success response
    } catch (error) {
      console.error('Error inserting user profile:', error);
      res.status(500).json({ error: 'Failed to insert user profile' });
    }
  }
);

export default userProfileRouter;
