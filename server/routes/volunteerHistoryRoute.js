import express from "express";
import { pool } from "../db.js";
//import { isAuth } from '../utils.js';

const volunteerHistoryRouter = express.Router();

// Middleware to check if user is authenticated
//volunteerHistoryRouter.use(isAuth);

volunteerHistoryRouter.get('/volunteerHistory', async (req, res) => {
  const userId = req.user._id;  // Assuming req.user is populated by isAuth middleware
  const isAdmin = req.user.isOrganizer;  // or req.user.isAdmin if you're using that
  
  try {
    const volunteerHistory = await pool.query(
      `SELECT * FROM events WHERE status = "completed"`
    );
    res.send(volunteerHistory[0]);
  } catch (error) {
    console.error("Error fetching volunteer history:", error);
    res.status(500).send("Server error");
  }
});

export default volunteerHistoryRouter;
