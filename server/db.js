import dotenv from 'dotenv';
import mysql from 'mysql2';
dotenv.config();

export const pool = mysql.createPool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,

  }).promise();
  

//   INSERT INTO events (image, description, status, timesHeld, category, location, urgency, createdAt) 
// VALUES ('event_image.jpg', 'Annual tech conference', 'upcoming', 3, 'Technology', 'New York', 'High', NOW());

