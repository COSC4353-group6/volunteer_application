import express from 'express';
// import expressAsyncHandler from 'express-async-handler';

import { pool } from '../db.js';
// import { isAuth, isAdmin } from '../utils.js';

const volunteerHistoryRouter = express.Router();


  volunteerHistoryRouter.get('/volunteerhistory', async (req, res) => {
    const volunteerHistory = await pool.query(`SELECT * from events WHERE status = "completed"`);
      res.send(volunteerHistory[0]);
  });
  


  
  
export default volunteerHistoryRouter