import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import volunteerHistoryRouter from './routes/volunteerHistoryRoute.js';
import userProfileRouter from './routes/userprofile.js';
//import eventRouter from './routes/eventRoutes.js'; // Import your eventRoutes
import authRoutes from './routes/auth.js'; // Import authentication routes

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Hard-coded data for event management form 
const events = [
  {
    eventName: 'Beach Cleanup',
    eventDescription: 'Cleaning the beach for community service.',
    location: 'Miami Beach, FL',
    requiredSkills: ['Teamwork', 'Physical Work'],
    urgency:['Low'],
    eventDate: '2024-09-15',
  },
  {
    eventName: 'Food Drive',
    eventDescription: 'Helping with organizing the food',
    location: 'Houston, TX',
    requiredSkills: ['Organization', 'Logistics'],
    urgency:['Low'],
    eventDate: '2024-10-05',
  },
  {
    eventName: 'Blood Donation',
    eventDescription: 'Helping with taking blood from the patients',
    location: 'Dallas, TX',
    requiredSkills: ['Nursing', 'Medical Assistance'],
    urgency:['Low'],
    eventDate: '2024-08-15',
  },
];

// API route to serve the events
app.get('/api/events', (req, res) => {
  res.json(events);
});

app.post('/api/events', (req, res) => {
  const newEvent = req.body;
  events.push(newEvent); // Add the new event to the hard-coded events array
  res.status(201).json(newEvent); // Respond with the newly added event
});


// Route to get event data (eventRoutes handles this)
//app.use('/api', eventRouter);  // Add your eventRoutes here

// Route to get volunteer history
app.use('/api', volunteerHistoryRouter);


// Route to handle user profile
app.use('/api', userProfileRouter);

// Route for authentication
app.use('/api/auth', authRoutes);

// Error handling
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

// Base endpoint for general information
app.get('*', (req, res) =>
  res.json({
    Name: 'COSC 4353 volunteer API - Group 6',
    Version: '1.0.0',
    Engine: 'Node',
    Status: 'Online',
  })
);

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
