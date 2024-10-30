import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import volunteerHistoryRouter from './routes/volunteerHistoryRoute.js';
import userProfileRouter from './routes/userprofile.js';
import eventRouter from './routes/eventRoutes.js'; // Import your eventRoutes
import authRoutes from './routes/auth.js'; // Import authentication routes
import { errorHandler } from './utils.js';
import notificationRouter from './routes/notificationRoutes.js'; // Import notification routes

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/event', eventRouter);  // Add your eventRoutes here
app.use('/api', volunteerHistoryRouter); // Make sure this is after eventRouter
app.use('/api', userProfileRouter); // Move this up if it needs to access the same middleware
app.use('/api/auth', authRoutes); // Keep authentication routes here
app.use('/api/notifications', notificationRouter); // Route to handle notifications

// Error handling middleware
app.use(errorHandler); // Move the error handler to the end of the routes

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
