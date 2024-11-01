import express from "express";
import { pool } from "../db.js";
const eventRouter = express.Router();
//import { errorHandler } from "../utils.js";

// Define an API endpoint for fetching events data, replacing hardcoded current and past events with database data
eventRouter.get("/event-management", async (req, res, next) => {
  try {
    // Fetch the current event data from the database
    const [currentEvent] = await pool.query("SELECT * FROM currentEvent");

    // Fetch past events from the database
    const [pastEvents] = await pool.query("SELECT * FROM pastEvents");

    // Combine current and past events
    const eventManage = {
      currentEvent: currentEvent[0], // assuming there's only one current event
      pastEvents,
    };

    res.json(eventManage);
  } catch (error) {
    next(errorHandler(500, "Failed to retrieve events"));
  }
});

eventRouter.get("/error-route", (req, res, next) => {
  const error = new Error("Test error");
  error.status = 500;
  next(error);
});


eventRouter.get("/allevents", async (req, res, next) => {
  try {
    const allEvents = await pool.query(`SELECT * from events`);
    res.send(allEvents[0]);
  } catch (error) {
    next(errorHandler(500, "Failed to retrieve events")); // Pass the error to the errorHandler middleware
  }
});

// Additional routes
eventRouter.get("/volunteer-requests", async (req, res) => {
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
    res.send(allRequests[0]); // Send the result if successful
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .send({ message: "Error fetching volunteer requests", error }); // Send error response
  }
});


eventRouter.get("/volunteer-requests/:_id", async (req, res) => {
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
      return res.status(404).send({ message: "Request not found" }); // Handle no results found
    }

    res.send(allRequests[0]); // Send the result if successful
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .send({ message: "Error fetching volunteer requests", error }); // Send error response
  }
});


eventRouter.get("/states", async (req, res, next) => {
  try {
    const [states] = await pool.query("SELECT * FROM states");
    res.json(states);
  } catch (error) {
    next(errorHandler(500, "Failed to retrieve states"));
  }
});

//get states by code
eventRouter.get("/states/:code", async (req, res, next) => {
  const { code } = req.params;

  try {
    const [state] = await pool.query(`SELECT * FROM states WHERE state_code = ?`, [code.toUpperCase()]);

    if (state.length > 0) {
      res.json(state[0]);
    } else {
      res.status(404).json({ message: "State not found" });
    }
  } catch (error) {
    next(errorHandler(500, "Failed to retrieve state"));
  }
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





eventRouter.post("/volunteer-request", async (req, res) => {
  const query =
    "INSERT INTO volunteer_requests (user_id, event_id)VALUES(?, ?);";

  let user_id = req.body.thisUserId;
  let event_id = req.body.thisEvent;



  const newRequest = await pool.query(query, [user_id, event_id]);
  res.send({ message: "User Request successful", newRequest });
});





// Route for assigning a volunteer to an event and sending a notification
eventRouter.post("/assign", (req, res) => {
  const { user_id, event_id } = req.body;

  const event = eventManage.pastEvents.find((e) => e._id === event_id);

  if (!event) {
    return res.status(404).send({ success: false, message: "Event not found." });
  }

  const notification = `You have been assigned to the event: ${event.eventDescription}`;
  res.json({ success: true, message: "User assigned and notified.", notification });
});



export default eventRouter;