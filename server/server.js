import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import volunteerHistoryRouter from './routes/volunteerHistoryRoute.js';
import userProfileRouter from './routes/userprofile.js';
import eventRouter from './routes/eventRoutes.js'; // Import your eventRoutes
import authRoutes from './routes/auth.js'; // Import authentication routes

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

// Route to get event data (eventRoutes handles this)
app.use('/api/event', eventRouter);  // Add your eventRoutes here

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
app.get('/error-route', (req, res, next) => {
  const error = new Error('Test error');
  error.status = 500; // Explicitly set status to 500
  next(error); // Pass the error to the error-handling middleware
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
