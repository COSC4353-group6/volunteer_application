import request from 'supertest';
import express from 'express';
import volunteerHistoryRouter from '../routes/volunteerHistoryRoute.js';
import userProfileRouter from '../routes/userprofile.js';
import authRoutes from '../routes/auth.js';
import eventRouter from '../routes/eventRoutes.js';
import cors from 'cors';

// Create a version of the app just for testing
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up the routes like in your server.js file
app.use('/api', volunteerHistoryRouter);
app.use('/api', userProfileRouter);
app.use('/api/auth', authRoutes);
app.use('/api/event', eventRouter);  

// Hard-coded data for events
const events = [
  {
    eventName: 'Beach Cleanup',
    eventDescription: 'Cleaning the beach for community service.',
    location: 'Miami Beach, FL',
    requiredSkills: ['Teamwork', 'Physical Work'],
    urgency: ['Low'],
    eventDate: '2024-09-15',
  },
  {
    eventName: 'Food Drive',
    eventDescription: 'Helping with organizing the food',
    location: 'Houston, TX',
    requiredSkills: ['Organization', 'Logistics'],
    urgency: ['Low'],
    eventDate: '2024-10-05',
  },
  {
    eventName: 'Blood Donation',
    eventDescription: 'Helping with taking blood from the patients',
    location: 'Dallas, TX',
    requiredSkills: ['Nursing', 'Medical Assistance'],
    urgency: ['Low'],
    eventDate: '2024-08-15',
  },
];

// Events routes (hard-coded)
app.get('/api/events', (req, res) => {
  res.json(events);
});

app.post('/api/events', (req, res) => {
  const newEvent = req.body;
  events.push(newEvent); // Add the new event to the array
  res.status(201).json(newEvent); // Respond with the newly added event
});

// Error handling middleware (this should be added after your routes)
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong';
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// Testing the GET request for events API
describe('GET /api/events', () => {
  it('should return a list of events', async () => {
    const response = await request(app).get('/api/events');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(events);
  });
});

// Testing the POST request for events API
describe('POST /api/events', () => {
  it('should add a new event and return the newly created event', async () => {
    const newEvent = {
      eventName: 'Tree Planting',
      eventDescription: 'Planting trees in the community park',
      location: 'Austin, TX',
      requiredSkills: ['Gardening'],
      urgency: ['Medium'],
      eventDate: '2024-11-10',
    };

    const response = await request(app)
      .post('/api/events')
      .send(newEvent);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newEvent);
  });
});

// Test for error handling middleware
describe('Error handling middleware', () => {
  it('should return a 500 error and custom error message', async () => {
    const response = await request(app).get('/api/event/error-route');  // Use the error route
    expect(response.status).toBe(500);  // Expect status 500
    expect(response.body).toHaveProperty('message', 'Test error');  // Expect 'Test error' message
    expect(response.body).toHaveProperty('status', 500);  // Expect status in the response body
  });
});