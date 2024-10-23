import express from 'express';
import { pool } from '../db.js';
import { isAuth } from '../utils.js';  // Assuming you have an authentication middleware

const volunteerHistoryRouter = express.Router();

// Middleware to check if user is authenticated
volunteerHistoryRouter.use(isAuth);

volunteerHistoryRouter.get('/volunteerhistory', async (req, res) => {
  const userId = req.user._id;  // Assuming req.user is populated by isAuth middleware
  const isAdmin = req.user.isOrganizer;  // or req.user.isAdmin if you're using that
  
  try {
    let volunteerHistory;

    if (isAdmin) {
      // If the user is an admin, they can see all volunteer history
      volunteerHistory = await pool.query(`SELECT * FROM events WHERE status = "completed"`);
    } else {
      // If the user is not an admin, they can only see their own history
      volunteerHistory = await pool.query(`
        SELECT events.* 
        FROM events 
        JOIN volunteerConfirmation ON events._id = volunteerConfirmation.event_id 
        WHERE volunteerConfirmation.user_id = ? AND events.status = "completed"`, 
        [userId]
      );
    }

    res.send(volunteerHistory[0]);

  } catch (error) {
    console.error('Error fetching volunteer history:', error);
    res.status(500).send('Server error');
  }
});

export default volunteerHistoryRouter;