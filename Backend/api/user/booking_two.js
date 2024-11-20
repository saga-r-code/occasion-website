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
   
router.post('/api/user/user_booking', async (req, res) => {
    try {
        const { fullname, address, email, contact, date } = req.body;

        // Validate input
        if (!fullname || !address || !email || !contact || !date) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        // SQL query to insert the booking into the user_booking table
        const query = 'INSERT INTO user_booking (fullname, address,email, contact, date) VALUES (?, ?, ?, ?, ?)';
        
        // Execute the query
        const [result] = await pool.query(query, [fullname, address, email, contact, date]);

        // Send a success response with the newly created booking ID
        res.status(201).json({ message: 'Booking created successfully', id: result.insertId });
    } catch (error) {
        console.error('Error creating booking:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
  });

  router.get('/api/user/user_bookings', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM user_booking');
        res.json(results); // Send the list of bookings as a JSON response
    } catch (error) {
        console.error('Error fetching bookings:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

export default router;