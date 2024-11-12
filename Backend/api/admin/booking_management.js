// http://localhost:3000/api/admin/booking_management 

import express from 'express';
import pool from '../../Database/db.js';

const router = express.Router();


//Get All Category
router.get('/api/admin/booking_management', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM bookingform');
        res.json(result);  // Send all categories as a JSON response
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

//Post request


export default router;
