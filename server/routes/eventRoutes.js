import express from "express";
import { pool } from "../db.js";
const eventRouter = express.Router();
import { errorHandler } from "../utils.js";

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

// Additional routes
eventRouter.get("/volunteer-requests", (req, res) => {
  // Mock data for volunteer requests
  const volunteerRequests = [
    {
      request_id: 1,
      request_date: "2024-10-01",
      user_id: 101,
      user_name: "John Doe",
      user_email: "john@example.com",
      user_age: 29,
      user_skills: ["First Aid", "Coordination"],
      event_id: 201,
      title: "Charity Marathon",
      urgency: "Medium",
      category: "Fundraising",
      ageRestriction: 18,
      createdAt: "2024-09-10",
      location: "New York, NY",
    },
  ];

  res.json(volunteerRequests);
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


eventRouter.get("/slug/:slug", (req, res) => {
  const { slug } = req.params;
  const event = eventManage.pastEvents.find((e) => e.slug === slug);

  if (event) {
    res.json(event);
  } else {
    res.status(404).send({ message: "Event not found" });
  }
});


eventRouter.post("/volunteer-request", (req, res) => {
  const { thisUserId, thisEvent } = req.body;

  const newRequest = {
    user_id: thisUserId,
    event_id: thisEvent,
    request_id: Math.floor(Math.random() * 1000),
    request_date: new Date().toISOString(),
  };

  // Add the request to the mock data
  res.json({ message: "User Request successful", newRequest });
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