// routes/userProfile.js

import express from 'express';
const userProfileRouter = express.Router();

let userProfile = {
  fullName: 'John Doe',
  address1: '123 Main St',
  address2: 'Apt 4B',
  city: 'Austin',
  state: 'TX',
  zipCode: '77001',
  skill: 'animal care, gardening, and cooking',
  preferences: 'gardening preferred',
  availability: ['2024-10-15', '2024-10-20'],
};

// Get user profile
userProfileRouter.get('/user-profile', (req, res) => {
  res.json(userProfile);
});

// Update user profile
userProfileRouter.post('/user-profile', (req, res) => {
  const updatedProfile = req.body;
  userProfile = { ...userProfile, ...updatedProfile }; // Merge with existing profile
  res.json({ success: true, profile: userProfile });
});

export default userProfileRouter;
