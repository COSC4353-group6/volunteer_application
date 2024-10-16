
import express from 'express';
const eventRouter = express.Router();
// const pool = require('../dbConnection'); // Assuming you're using a database connection pool

/*
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
eventRouter.get('/api/events', (req, res) => {
  res.json(events);
});

eventRouter.post('/api/events', (req, res) => {
  const newEvent = req.body;
  events.push(newEvent); // Add the new event to the hard-coded events array
  res.status(201).json(newEvent); // Respond with the newly added event
});

// Route to POST event data
eventRouter.post('/events', async (req, res) => {
  const { eventName, eventDescription, location, requiredSkills, urgency, eventDate, availability } = req.body;

  try {
    const query = 'INSERT INTO events (eventName, eventDescription, location, requiredSkills, urgency, eventDate, availability) VALUES (?, ?, ?, ?, ?, ?, ?)';
    await pool.query(query, [eventName, eventDescription, location, requiredSkills.join(','), urgency, eventDate, availability.join(',')]);

    res.status(201).send({ message: 'Event created successfully' });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).send({ message: 'Failed to create event' });
  }
});

// Route to GET all events (assuming this is the '/allevents' endpoint)
eventRouter.get('/allevents', async (req, res) => {
  try {
    const [events] = await pool.query('SELECT * FROM events');
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send({ message: 'Failed to fetch events' });
  }
});
*/
