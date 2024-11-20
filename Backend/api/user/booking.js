// http://localhost:3000/api/user/booking
// http://localhost:3000/api/user/send-email

import express from 'express';
import pool from '../../Database/db.js';
import transporter from '../mail/gmail.js';

const router = express.Router();

router.post('/api/user/send-email', async (req, res) => {
  const {email, fullname} = req.body
  
  const mailOptions = {
    from: 'shah.sage2006@gmail.com', // Sender address
    to: email, // List of recipients
    subject: 'Booking Confirmation', // Subject line
    text: `Hello ${fullname},\n\nThank you for your booking!`, // Plain text body
    // html: '<b>Hello world?</b>' // You can also send HTML content
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).send({ message: 'Error sending email', error: error.message });
  }
});

// POST route to insert a new booking
router.post('/api/user/booking', async (req, res) => {
  let conn;
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

    await transporter.sendMail({
      from: 'shah.sage2006@gmail.com', // Sender address
      to: userInput.email, // List of recipients
      subject: 'Booking Confirmation', // Subject line
      text: `Hello ${userInput.fullname}, ` +
           `\n\nYour Confirm Contact Number: ${userInput.contact}` +
            `\n\nBooking details: ${userInput.message}\n` +
            `\n\nWe have received your booking request and will get back to you soon.` +
      `\n\nThank you for your booking!`, // Plain text body
      // html: '<b>Hello world?</b>' // You can also send HTML content
    });

    // Send email notification to the admin with all booking info
    const adminEmail = 'shah.sagar2006@gmail.com'; // Replace with your admin email
    await transporter.sendMail({
      from: userInput.email,
      to: adminEmail,
      subject: 'New Booking Notification',
      text: `New booking details:\n\n` +
            `Name: ${userInput.fullname}\n` +
            `Contact: ${userInput.contact}\n` +
            `Email: ${userInput.email}\n` +
            `Flat/Bldg: ${userInput.flat_bldg}\n` +
            `Street Name: ${userInput.street_name}\n` +
            `Landmark: ${userInput.landmark}\n` +
            `City: ${userInput.city}\n` +
            `State: ${userInput.state}\n` +
            `Pincode: ${userInput.pincode}\n` +
            `Message: ${userInput.message}\n`
    });



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

router.get('/api/user/booking', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM user_booking_system');
    res.json(results); // Send the list of bookings as a JSON response
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});


export default router;