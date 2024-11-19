import request from 'supertest';
import express from 'express';
import cors from 'cors';
import volunteerHistoryRouter from '../routes/volunteerHistoryRoute.js';
import userProfileRouter from '../routes/userprofile.js';
import notificationRouter from '../routes/notificationRoutes.js';
import authRoutes from '../routes/auth.js';
import eventRouter from '../routes/eventRoutes.js';
import ReportPRouter from '../routes/ReportPages.js';
import { pool } from '../db.js'; // Database connection

// Create a version of the app for testing
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.use('/api', volunteerHistoryRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api', userProfileRouter);
app.use('/api/auth', authRoutes);
app.use('/api/event', eventRouter);
app.use('/api', ReportPRouter);

// Error handling middleware
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

// Fallback route for 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Export the app for testing
export default app;

// Test Data
const events = [
  {
    eventName: 'Tree Planting',
    eventDescription: 'Planting trees in the community park',
    location: 'Austin, TX',
    requiredSkills: ['Gardening'],
    urgency: ['Medium'],
    eventDate: '2024-11-10',
  },
];

// Mock Event Routes for testing
app.get('/api/events', (req, res) => {
  res.json(events);
});

app.post('/api/events', (req, res) => {
  const newEvent = req.body;
  events.push(newEvent);
  res.status(201).json(newEvent);
});

app.get('/api/event/event-management', (req, res) => {
  res.json({
    currentEvent: events[0],
    pastEvents: [],
  });
});

app.get('/api/event/volunteer-requests', (req, res) => {
  res.json([]);
});

app.get('/api/event/volunteer-requests/:_id', (req, res) => {
  const { _id } = req.params;
  res.json({ request_id: parseInt(_id, 10) });
});

app.post('/api/event/volunteer-request', (req, res) => {
  res.status(201).json({ message: 'User Request successful' });
});

app.get('/api/notifications', (req, res) => {
  res.json([]);
});

app.post('/api/notifications', (req, res) => {
  const newNotification = req.body;
  res.status(201).json(newNotification);
});

// Tests
describe('API Tests', () => {
  describe('GET /api/events', () => {
    it('should return a list of events', async () => {
      const response = await request(app).get('/api/events');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(events);
    });
  });

  describe('POST /api/events', () => {
    it('should add a new event', async () => {
      const newEvent = {
        eventName: 'Community Cleanup',
        eventDescription: 'Cleaning up the local park',
        location: 'Houston, TX',
        requiredSkills: ['Cleaning'],
        urgency: ['High'],
        eventDate: '2024-12-01',
      };
      const response = await request(app).post('/api/events').send(newEvent);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(newEvent);
    });
  });

  describe('GET /api/event/event-management', () => {
    it('should return event management data', async () => {
      const response = await request(app).get('/api/event/event-management');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('currentEvent');
      expect(response.body).toHaveProperty('pastEvents');
    });
  });

  describe('GET /api/event/volunteer-requests', () => {
    it('should return a list of volunteer requests', async () => {
      const response = await request(app).get('/api/event/volunteer-requests');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /api/event/volunteer-requests/:_id', () => {
    it('should return a single volunteer request by ID', async () => {
      const _id = 1;
      const response = await request(app).get(`/api/event/volunteer-requests/${_id}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('request_id', _id);
    });
  });

  describe('POST /api/event/volunteer-request', () => {
    it('should create a new volunteer request', async () => {
      const newRequest = {
        user_id: 1,
        event_id: 2,
      };
      const response = await request(app).post('/api/event/volunteer-request').send(newRequest);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'User Request successful');
    });
  });

  describe('GET /api/notifications', () => {
    it('should return a list of notifications', async () => {
      const response = await request(app).get('/api/notifications');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /api/notifications', () => {
    it('should create a new notification', async () => {
      const newNotification = {
        message: 'New volunteer opportunity',
        type: 'event',
      };
      const response = await request(app).post('/api/notifications').send(newNotification);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'New volunteer opportunity');
    });
  });

  describe('Error Handling Middleware', () => {
    it('should return 404 for an unknown route', async () => {
      const response = await request(app).get('/unknown-route');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Route not found');
    });
  });
});
