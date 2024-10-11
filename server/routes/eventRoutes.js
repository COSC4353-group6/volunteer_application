
import express from "express";
import { pool } from '../db.js';
const eventRouter = express.Router();

// Hardcoded event data
const eventsData = {
  currentEvent: {
    eventName: "Charity Marathon",
    eventDescription: "A charity marathon to raise funds for local shelters.",
    location: "Central Park, New York",
    requiredSkills: ["Coordination", "First Aid", "Photography"],
    urgency: "medium",
    eventDate: "2024-12-15",
    availability: ["2024-12-10", "2024-12-11"],
  },
  pastEvents: [
    {
      eventName: "Beach Cleanup",
      eventDescription: 'Cleaning the beach for community service.',
      location: "Miami Beach, FL",
      eventDate: "2024-09-15",
      requiredSkills: ["Teamwork", "Physical Work"],
    },
    {
      eventName: "Food Drive",
      eventDescription: "Helping with organizing the food",
      location: "Houston, TX",
      eventDate: "2024-10-05",
      requiredSkills: ["Organization", "Logistics"],
    },
    {
      eventName: "Blood Donation",
      eventDescription: "Helping with taking blood from the patients",
      location: "Dallas, TX",
      eventDate: "2024-08-15",
      requiredSkills: ["Nursing", "Medical Assistance"],
    }
  ]
};

// Define an API endpoint for fetching events data
eventRouter.get('/event-management', (req, res) => {
  res.json(eventsData); // Send the hardcoded events data as a JSON response
});


eventRouter.get('/allevents', async (req, res) => {
  const allEvents = await pool.query(`SELECT * from events`);
    res.send(allEvents[0]);
});

eventRouter.get('/slug/:slug', async (req, res) => {
  const { slug } = req.params;
  const query = 'SELECT * FROM events WHERE slug= ?';
  const event = await pool.query(query, [slug]);

  if (event) {
    res.send(event[0][0]);
  } else {
    res.status(404).send({ message: 'Event Not Found' });
  }
});




export default eventRouter
