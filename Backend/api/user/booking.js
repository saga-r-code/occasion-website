// http://localhost:3000/api/user/booking

import express from 'express';
import pool from '../../Database/db.js';

const router = express.Router();


// Function to generate a random 6-digit number
// const generateRandom = () => {
//   return Math.floor(100000 + Math.random() * 900000); // Generates a number between 100000 and 999999
// };


// POST route to insert a new booking
let conn;
router.post('/api/user/booking', async (req, res) => {
  try {
    const userInput = req.body; //get data from user input and catch through request
    console.log('User  Booking data:', JSON.stringify(userInput, null, 2));

    conn = await pool.getConnection(); //connect to database
    const query = `INSERT INTO user_booking_system (fullname, contact, email, flat_bldg, street_name, landmark, city, state, pincode, message)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    console.log(query)

    //all data request through user input
    const result = await conn.query(query, [
      userInput.fullname,
      userInput.contact,
      userInput.email,
      userInput.flat_bldg,
      userInput.street_name,
      userInput.landmark,
      userInput.city,
      userInput.state,
      userInput.pincode,
      userInput.message,
    ]);

    res.status(201).send(`User added with ID: ${result.insertId}`);
    console.log(result)



  } catch (error) {
    console.error('Error inserting user:', error.message);
    res.status(500).send({ message: 'Internal Server Error', error: error.message });
  } finally {
    if (conn) {
      try {
        await conn.release();
      } catch (error) {
        console.error('Error releasing database connection:', error.message);
      }
    }
  }
});

export default router;