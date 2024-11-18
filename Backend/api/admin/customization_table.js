// http://localhost:3000/api/admin/customization_table

import express from 'express';
import pool from '../../Database/db.js';
import multer from 'multer';
import sharp from 'sharp';

const storage = multer.memoryStorage();
const upload = multer({storage});

const router = express.Router();

//Add Customization

router.post('/api/admin/customization_table', upload.single('custom_image'), async (req, res) => {
    let conn;
    try {
        const { custom_title, custom_desc, custom_price, booking_id } = req.body;

        console.log('Received body:', req.body);
        console.log('Uploaded file:', req.file); // Use req.file instead of req.files

        // Validate required fields
        if (!custom_title || !custom_desc || !custom_price || !booking_id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if the image was uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'Custom image is required!' });
        }

        // Resize and convert the image to JPEG format
        let imageBuffer = await sharp(req.file.buffer)
            .resize(500) // Resize to a width of 500 pixels (adjust as needed)
            .jpeg({ quality: 80 }) // Convert to JPEG format with 80% quality
            .toBuffer();

        // Assign the image buffer to a variable
        const custom_image = imageBuffer;

        // Connect to the database
        conn = await pool.getConnection();

        // Check if the booking ID exists
        const bookingExist = await conn.query('SELECT * FROM bookingform WHERE booking_id = ?', [booking_id]);
        console.log('Booking existence check result:', bookingExist);

        if (bookingExist.length === 0) {
            return res.status(404).json({ message: 'Invalid Booking Id' });
        }

        // Insert the customization into the database
        const result = await conn.query(`
            INSERT INTO customization_item (custom_image, custom_title, custom_desc, custom_price, booking_id) 
            VALUES (?, ?, ?, ?, ?)`,
            [custom_image, custom_title, custom_desc, custom_price, booking_id]
        );

        console.log('Insert result:', result); // Log the result of the insert query

        if (result.affectedRows === 1) {
            res.json({
                message: 'Customization added successfully',
                id: Number(result.insertId),
                custom_title,
                custom_desc,
                custom_price,
                custom_image: req.file.originalname // Return the original file name
            });
        } else {
            throw new Error('Error adding customization');
        }
    } catch (error) {
        console.error('Error inserting data:', error); // Log the full error object
        res.status(500).json({ message: 'An error occurred', error: error.message });
    } finally {
        if (conn) {
            try {
                await conn.release();
            } catch (error) {
                console.error('Error releasing connection:', error.message);
            }
        }
    }
});




// Delete Customization
router.delete('/api/admin/customization_table/:custom_id', async (req, res) => {
    const { custom_id } = req.params;

    try {
        const checkResult = await pool.query('SELECT * FROM customization_item WHERE custom_id = ?', [custom_id]);

        // If the item does not exist, return a 404 error
        if (checkResult.length === 0) {
            return res.status(404).json({ error: 'customization item not found' });
        }           
        // Delete the item by item_id from the database
        const result = await pool.query('DELETE FROM customization_item WHERE custom_id = ?', [custom_id]);

        // Check the result of the deletion
        if (result.affectedRows > 0) {
            res.status(200).json({ message: `Item with ID ${custom_id} deleted successfully` });
        } else {
            res.status(404).json({ message: 'customization item not found' });
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'An error occurred while deleting the item' });
    }
});

//Get All Customization item
router.get('/api/admin/customization_table', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM customization_item');
        res.json(result);  // Send all categories as a JSON response
    } catch (error) {
        console.error('Error fetching Customization item:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});


export default router;

