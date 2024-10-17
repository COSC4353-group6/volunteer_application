
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

// eventRouter.get('/volunteer-requests', async (req, res) => {
//   const allRequests = await pool.query(`SELECT * from volunteer_requests`);
  
//     res.send(allRequests[0]);
// });

eventRouter.get('/volunteer-requests', async (req, res) => {

  const query = `
    SELECT 
      vr.request_id, 
      vr.request_date, 
      u._id AS user_id, 
      u.name AS user_name, 
      u.email AS user_email, 
      u.age AS user_age,
      u.skills AS user_skills,
      e._id, 
      e.title, 
      e.urgency,
      e.category,
      e.ageRestriction,
      e.createdAt,
      e.location
    FROM 
      volunteer_requests vr
    JOIN 
      users u ON vr.user_id = u._id
    JOIN 
      events e ON vr.event_id = e._id; 
  `;

  try {
    const allRequests = await pool.query(query);
    res.send(allRequests[0]);  // Send the result if successful
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).send({ message: 'Error fetching volunteer requests', error });  // Send error response
  }
});

eventRouter.get('/volunteer-requests/:_id', async (req, res) => {
  const { _id } = req.params; // Use _id from the URL parameters

  const query = `
    SELECT 
      vr.request_id, 
      vr.request_date, 
      u._id AS user_id, 
      u.name AS user_name, 
      u.email AS user_email, 
      u.age AS user_age,
      u.skills AS user_skills,
      e._id AS event_id, 
      e.title, 
      e.urgency,
      e.category,
      e.ageRestriction,
      e.createdAt,
      e.location
    FROM 
      volunteer_requests vr
    JOIN 
      users u ON vr.user_id = u._id
    JOIN 
      events e ON vr.event_id = e._id
    WHERE 
      vr.request_id = ?;  -- Filter by request_id
  `;

  try {
    // Pass the _id as the parameter to the query
    const [allRequests] = await pool.query(query, [_id]);
    
    if (allRequests.length === 0) {
      return res.status(404).send({ message: 'Request not found' }); // Handle no results found
    }

    res.send(allRequests[0]);  // Send the result if successful
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).send({ message: 'Error fetching volunteer requests', error });  // Send error response
  }
});
eventRouter.get('/slug/:slug', async (req, res) => {
  const { slug } = req.params;

  console.log(slug)
  const query = 'SELECT * FROM events WHERE slug= ?';
  const event = await pool.query(query, [slug]);

  if (event) {
    res.send(event[0][0]);
  } else {
    res.status(404).send({ message: 'Event Not Found' });
  }
});

eventRouter.post('/volunteer-request', async(req, res) => {
  const query = 'INSERT INTO volunteer_requests (user_id, event_id)VALUES(?, ?);'

  let user_id = req.body.thisUserId
  let event_id = req.body.thisEvent

  const newRequest = await pool.query(query, [
    user_id,
    event_id
  ]);
  res.send({message: 'User Request successful', newRequest})
})




export default eventRouter
