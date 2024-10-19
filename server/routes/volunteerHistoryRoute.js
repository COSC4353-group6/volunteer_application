import express from 'express';
// import expressAsyncHandler from 'express-async-handler';

import { pool } from '../db.js';
// import { isAuth, isAdmin } from '../utils.js';

const volunteerHistoryRouter = express.Router();

const volunteerHistory = [
  {
    eventName: "Beach Cleanup",
    eventDescription: "Cleaning the beach for community service.",
    location: "Miami Beach, FL",
    eventDate: "2024-09-15",
    requiredSkills: ["Teamwork", "Physical Work"],
    urgency: "Low",
    status: "completed",
  },
  {
    eventName: "Food Drive",
    eventDescription: "Helping with organizing the food.",
    location: "Houston, TX",
    eventDate: "2024-10-05",
    requiredSkills: ["Organization", "Logistics"],
    urgency: "Low",
    status: "completed",
  },
];

volunteerHistoryRouter.get('/volunteerhistory', async (req, res) => {
    const completedEvents = volunteerHistory.filter(event => event.status === "completed");
    res.send(completedEvents);
});


  
  
export default volunteerHistoryRouter