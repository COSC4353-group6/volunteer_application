import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dummy data for User Profile (to replace DB for now)
let userProfile = {
  fullName: 'John Doe',
  address1: '123 Main St',
  address2: 'Apt 4B',
  city: 'Houston',
  state: 'TX',
  zipCode: '77001',
  skill: 'animal care, gardening, and cooking',
  preferences: 'gardening preferred ',
  availability: ['2024-10-15', '2024-10-20'],
};

// Dummy data for Volunteer History (to replace DB for now)
const volunteerHistory = [
  {
    volunteerId: '0001',
    eventName: 'Beach Cleanup',
    eventDescription: 'Cleaning the beach for community service.',
    location: 'Miami Beach, FL',
    requiredSkills: ['Teamwork', 'Physical Work'],
    urgency: 'High',
    eventDate: '2024-09-15',
    status: 'Completed',
  },
  {
    volunteerId: '0002',
    eventName: 'Tree Planting',
    eventDescription: 'Planting trees in the local park.',
    location: 'Central Park, NY',
    requiredSkills: ['Gardening', 'Environment Care'],
    urgency: 'Low',
    eventDate: '2024-10-01',
    status: 'Pending',
  },
  {
    volunteerId: '0003',
    eventName: 'Animal Shelter',
    eventDescription: 'Assisting with animal care and shelter maintenance.',
    location: 'Chatsworth, CA',
    requiredSkills: ['Animal Care', 'Cleaning', 'Compassion'],
    urgency: 'Medium',
    eventDate: '2024-11-07',
    status: 'Pending',
  },
];


// Route to get volunteer history
app.get('/api/volunteer-history', (req, res) => {
  res.json(volunteerHistory);
});

// Route to get user profile
app.get('/api/user-profile', (req, res) => {
  res.json(userProfile);
});

//Route to get User Authentication
import authRoutes from './routes/auth.js';
app.use('/api/auth', authRoutes);


//Error handling
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// Fallback route for non-existing endpoints
app.get('*', (req, res) => {
  res.status(404).json({
    Name: 'COSC 4353 volunteer API - Group 6',
    Version: '1.0.0',
    Engine: 'Node',
    Status: 'Online',
  });
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
