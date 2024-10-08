import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import volunteerHistoryRouter from './routes/volunteerHistoryRoute.js';
import userProfileRouter from './routes/userprofile.js'; // Adjust the path as needed
import eventRouter from './eventRoutes.js';


dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dummy data for User Profile (to replace DB for now)

// Dummy data for Volunteer History (to replace DB for now)
// const volunteerHistory = [
//   {
//     volunteerId: '0001',
//     eventName: 'Beach Cleanup',
//     eventDescription: 'Cleaning the beach for community service.',
//     location: 'Miami Beach, FL',
//     requiredSkills: ['Teamwork', 'Physical Work'],
//     urgency: 'High',
//     eventDate: '2024-09-15',
//     status: 'Completed',
//   },
//   {
//     volunteerId: '0002',
//     eventName: 'Tree Planting',
//     eventDescription: 'Planting trees in the local park.',
//     location: 'Central Park, NY',
//     requiredSkills: ['Gardening', 'Environment Care'],
//     urgency: 'Low',
//     eventDate: '2024-10-01',
//     status: 'Pending',
//   },
//   {
//     volunteerId: '0003',
//     eventName: 'Animal Shelter',
//     eventDescription: 'Assisting with animal care and shelter maintenance',
//     location: 'Chatsworth, CA',
//     requiredSkills: ['Animal Care', 'Cleaning', 'Compassion'],
//     urgency: 'Medium',
//     eventDate: '2024-11-07',
//     status: 'Pending',
//   },
// ];


// Endpoint to get event data
app.get('/api/event-data', (req, res) => {
  res.json(eventData);
});

// Endpoint to get past events
app.get('/api/past-events', (req, res) => {
  res.json(pastEvents);
});


// Route to get volunteer history

app.use('/db', volunteerHistoryRouter)

//route for userprofile
app.use('/api', userProfileRouter); // Prefix your routes with /api

//route for events
// Use the event routes
//app.use('/api', eventRouter);

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

app.get(
  '*',
  (req, res) =>
    res.json(
        {
            Name:"COSC 4353 volunteer API - Group 6 ",
            Version: "1.0.0",
            Engine: "Node",
            Status: "Online"

        }
    )

);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
