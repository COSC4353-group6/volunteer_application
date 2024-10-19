import request from 'supertest';
import express from 'express';
import volunteerHistoryRouter from '../routes/volunteerHistoryRoute.js';
import userProfileRouter from '../routes/userprofile.js';
import notificationRouter from '../routes/notificationRoutes.js'; // Import notification routes
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
app.use('/api/notifications', notificationRouter);
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
    const response = await request(app).get('/api/event/error-route');  
    expect(response.status).toBe(500);  
    expect(response.body).toHaveProperty('message', 'Test error'); 
    expect(response.body).toHaveProperty('status', 500);  
  });
});



describe('GET /api/events - Validate events array', () => {
  it('should return an array of events', async () => {
    const response = await request(app).get('/api/events');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0); 
  });
});


// Testing event management route
describe('GET /api/event/event-management', () => {
  it('should return event management data', async () => {
    const response = await request(app).get('/api/event/event-management');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('currentEvent');
    expect(response.body).toHaveProperty('pastEvents');
  });
});

// Testing volunteer requests route
describe('GET /api/event/volunteer-requests', () => {
  it('should return a list of volunteer requests', async () => {
    const response = await request(app).get('/api/event/volunteer-requests');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

// Testing volunteer request by ID route
describe('GET /api/event/volunteer-requests/:_id', () => {
  it('should return a single volunteer request by ID', async () => {
    const _id = 1; // Example ID, replace with actual ID
    const response = await request(app).get(`/api/event/volunteer-requests/${_id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('request_id', _id);
  });
});

// Testing create volunteer request route
describe('POST /api/event/volunteer-request', () => {
  it('should create a new volunteer request', async () => {
    const newRequest = {
      user_id: 1, // Example user ID
      event_id: 2, // Example event ID
    };
    const response = await request(app)
      .post('/api/event/volunteer-request')
      .send(newRequest);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'User Request successful');
  });
});

// Testing notifications route
describe('GET /api/notifications', () => {
  it('should return a list of notifications', async () => {
    const response = await request(app).get('/api/notifications');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

// Testing create notification route
describe('POST /api/notifications', () => {
  it('should create a new notification', async () => {
    const newNotification = {
      message: 'New event created',
      type: 'event',
    };
    const response = await request(app)
      .post('/api/notifications')
      .send(newNotification);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'New event created');
  });
});

// Testing event addition
describe('POST /api/events - Verify event addition', () => {
  it('should add a new event and verify it in the events list', async () => {
    const newEvent = {
      eventName: 'Community Gardening',
      eventDescription: 'Join us for a day of gardening in the community.',
      location: 'Dallas, TX',
      requiredSkills: ['Gardening'],
      urgency: ['High'],
      eventDate: '2024-11-15',
    };
    await request(app)
      .post('/api/events')
      .send(newEvent);
    const response = await request(app).get('/api/events');
    expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining(newEvent)]));
  });
});
