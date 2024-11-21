import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import volunteerHistoryRouter from './routes/volunteerHistoryRoute.js';
import userProfileRouter from './routes/userprofile.js';
import eventRouter from './routes/eventRoutes.js'; // Import your eventRoutes
import authrouter from './routes/authrouter.js';//import { errorHandler } from './utils.js';
import notificationRouter from './routes/notificationRoutes.js'; // Import notification routes
//import ProtectedRoute from './routes/ProtectedRoute.js';
//import { pool } from './db.js'; // Assuming db.js is in the same directory
import ReportPRouter from  './routes/ReportPages.js';

//dotenv.config();



dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.json());

// Routes

// Route to get event data (eventRoutes handles this)
app.use('/api/event', eventRouter);  // Add your eventRoutes here

//Route for report page
app.use ('/api', ReportPRouter);
// Route to get volunteer history
app.use('/api', volunteerHistoryRouter);

//app.use(errorHandler);

// Route to handle user profile
app.use('/api', userProfileRouter);

// Route for authentication
app.use('/api', authrouter);
// app.get('/api/events/error-route'); 

//app.use('/api', ProtectedRoute);

// Route to handle notifications
app.use('/api/notifications', notificationRouter);

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

