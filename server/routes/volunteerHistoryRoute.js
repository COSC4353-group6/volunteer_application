import express from 'express';
// import expressAsyncHandler from 'express-async-handler';

// import { pool } from '../db.js';
// import { isAuth, isAdmin } from '../utils.js';

const volunteerHistoryRouter = express.Router();


const volunteerHistory = [
    {
      volunteerId: '0001',
      eventName: 'Beach Cleanup',
      eventDescription: 'Cleaning the beach for community service.',
      location: 'Miami Beach, FL',
      requiredSkills: ['Teamwork', 'Physical Work'],
      urgency: 'High',
      eventDate: '2024-09-15',
      status: 'Completed',
    },
    {
      volunteerId: '0002',
      eventName: 'Tree Planting',
      eventDescription: 'Planting trees in the local park.',
      location: 'Central Park, NY',
      requiredSkills: ['Gardening', 'Environment Care'],
      urgency: 'Low',
      eventDate: '2024-10-01',
      status: 'Pending',
    },
    {
      volunteerId: '0003',
      eventName: 'Animal Shelter',
      eventDescription: 'Assisting with animal care and shelter maintenance',
      location: 'Chatsworth, CA',
      requiredSkills: ['Animal Care', 'Cleaning', 'Compassion'],
      urgency: 'Medium',
      eventDate: '2024-11-07',
      status: 'Pending',
    },
  ];
  


volunteerHistoryRouter.get('/volunteer-history', (req, res) => {
    res.json(volunteerHistory);
  });
  

  
//   productRouter.get('/', async (req, res) => {
//     const products = await pool.query(`SELECT * from products`);
//     res.send(products[0]);
//   });
  
  
export default volunteerHistoryRouter