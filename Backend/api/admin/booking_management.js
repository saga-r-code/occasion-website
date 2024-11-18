// http://localhost:3000/api/admin/booking_management 

import express from 'express';
import pool from '../../Database/db.js';
import multer from 'multer';

const router = express.Router();

const upload = multer()


//Get All Category with booking id
router.get('/api/admin/booking_management/:booking_id', async (req, res) => {
    let conn;
    const booking_id = req.params.booking_id;
    try {
        conn = await pool.getConnection()
        
        // fetch booking details
        const bookingResult = await conn.query('SELECT * FROM bookingform WHERE booking_id = ?', [booking_id]); 

        if (bookingResult.length === 0) {
            return res.status(404).send({ message: 'Booking not found' });
        }

        const booking = bookingResult[0];

        // fetch inclusions
        const inclusionsResult = await conn.query('SELECT * FROM inclusions WHERE booking_id = ?', [booking_id]);
        const customizationResult = await conn.query('SELECT * FROM customization_item WHERE booking_id = ?', [booking_id]);
        const multiImages = await conn.query('SELECT * FROM multi_images WHERE booking_id = ?', [booking_id]);

        const inclusions = inclusionsResult.map((inclusion) => ({
            inclusion_id: inclusion.inclusion_id,
            inclusion_desc: inclusion.inclusion_desc,
        }));

        const customizations = customizationResult.map((customization) => ({
            custom_id: customization.custom_id,
            custom_image: customization.custom_image,
            custom_title: customization.custom_title,
            custom_desc: customization.custom_desc,
            custom_price: customization.custom_price,
        }));

        const images = multiImages.map((image) => ({
            image_id: image.image_id,
            image_url: image.image_url,
        }));


        res.json({
            booking,
            inclusions,
            customizations,
            images
        });
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

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



//Add data
router.post('/api/admin/booking_management', upload.any(),  async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { title, description, price, discount } = req.body;

        
        // console.log("bookingform details: ", req.body);
        console.log("files", req.files)
        
        const result = await conn.query('INSERT INTO bookingform (title, description, price, discount) VALUES (?, ?, ?, ?)', [title, description, price, discount]);
       
        console.log(result);

        if (result.affectedRows === 1) {
            const insertID = Number(result.insertId); // Corrected property name
            console.log("bookingform id: ", insertID);
            return res.json({
                message: "bookingform added successfully",
                booking_id: insertID
            });
        } else {
            return res.status(400).json({
                message: "Failed to add bookingform"
            });
        }
    } catch (error) {
        console.error('Error inserting Bookingform:', error); // Log the entire error object
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    } finally {
        if (conn) {
            await conn.release();
        }
    }
});

// Delete data
router.delete('/api/admin/booking_management/:booking_id', async (req, res) => {
    const { booking_id } = req.params; // Get booking_id from params

    try {
        const checkResult = await pool.query('SELECT * FROM bookingform WHERE booking_id = ?', [booking_id]);

        // If no booking found, return 404
        if (checkResult.length === 0) {
            return res.status(404).json({ error: 'Booking id not found' });
        }

        const result = await pool.query('DELETE FROM bookingform WHERE booking_id = ?', [booking_id]);

        if (result.affectedRows === 1) {
            res.status(200).json({ message: `Booking with ID ${booking_id} deleted successfully` });
        } else {
            res.status(500).json({ error: 'An error occurred while deleting the booking id' });
        }

    } catch (error) {
        console.error('Error deleting Booking id:', error);
        res.status(500).json({ error: 'An error occurred while deleting the booking id' });
    }
});


export default router;
