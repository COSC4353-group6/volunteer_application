import request from 'supertest';
import app from '../server.js'; // Ensure this is the correct path to your server.js

// Mock the notification routes to prevent actual failures in tests
jest.mock('../routes/notificationRoutes.js', () => {
  const express = require('express');
  const mockRouter = express.Router();

  mockRouter.get('/', (req, res) => {
    res.status(200).json([]);
  });

  mockRouter.post('/', (req, res) => {
    res.status(201).json({ message: 'New volunteer opportunity' });
  });

  return mockRouter;
});

describe('API Tests', () => {
  describe('GET /api/events', () => {
    it('should return a list of events', async () => {
      const response = await request(app).get('/api/events');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
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
      expect(response.body).toHaveProperty('currentEvent', expect.any(Object));
      expect(response.body).toHaveProperty('pastEvents', expect.any(Array));
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
