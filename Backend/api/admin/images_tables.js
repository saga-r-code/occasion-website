// http://localhost:3000/api/admin/images_table

import express from 'express';

import pool from '../../Database/db.js';
import multer from 'multer';
import sharp from 'sharp';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

//get all Images Route
router.get('/api/admin/images_table', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM multi_images');
        res.json(result);  // Send all Images as a JSON response
    } catch (error) {
        console.error('Error fetching Images:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

//get all Images as per the booking id
router.get('/api/admin/images_table/:booking_id', async (req, res) => {
    const { booking_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM multi_images WHERE booking_id = ?', [booking_id]);
        res.json(result);  // Send all Images as a JSON response
    } catch (error) {
        console.error('Error fetching Images:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});


//Add Images Route
router.post('/api/admin/images_table', upload.array('image', 12), async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();

        // Extract booking_id from the request body
        const { booking_id } = req.body;

        // Check if files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        // Validate booking_id exists
        const bookingExist = await conn.query('SELECT * FROM bookingform WHERE id = ?', [booking_id]);
        if (bookingExist.length === 0) {
            return res.status(404).json({ message: 'Invalid Booking Id' });
        }

        // Process each file in req.files array
        const imagePromises = req.files.map(async (file) => {
            let imageBuffer = null;
            try {
                // Compress and resize the image using sharp
                imageBuffer = await sharp(file.buffer)
                    .resize(500) // Resize to a width of 500 pixels (adjust as needed)
                    .jpeg({ quality: 80 }) // Convert to JPEG format with 80% quality
                    .toBuffer();

                // Insert the image buffer and booking_id into the database
                const result = await conn.query('INSERT INTO multi_images (image, booking_id) VALUES (?, ?)', [imageBuffer, booking_id]);

                // Log the image buffer size and preview
                console.log("Image Buffer Size:", imageBuffer.length);
                console.log("Image Buffer Preview:", imageBuffer.slice(0, 20));

                return result.insertId; 
            } catch (error) {
                console.error('Error processing image:', error.message);
                throw error; 
            }
        });

        // Wait for all image insertions to finish
        const addImageIds = await Promise.all(imagePromises);

        // Convert BigInt to Number to avoid JSON serialization error
        const addImageIdsNumbers = addImageIds.map(id => Number(id));

        // Send response with success message and image IDs
        res.json({
            message: 'Images added successfully',
            image_ids: addImageIdsNumbers, 
            image_names: req.files.map(file => file.originalname),
        });

    } catch (error) {
        console.error('Error inserting images:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    } finally {
        if (conn) {
            try {
                await conn.release();
            } catch (releaseError) {
                console.error('Error releasing database connection:', releaseError.message);
            }
        }
    }
});


// Delete images using booking_id
router.delete('/api/admin/images_table/:booking_id', async (req, res) => {
    const { booking_id } = req.params;

    try {
        const checkResult = await pool.query('SELECT * FROM multi_images WHERE booking_id = ?', [booking_id]);

        // If the images does not exist, return a 404 error
        if (checkResult.length === 0) {
            return res.status(404).json({ error: 'Images not found' });
        }

        // Delete the images by booking_id from the database
        const result = await pool.query('DELETE FROM multi_images WHERE booking_id = ?', [booking_id]);

        // Check the result of the deletion
        if (result.affectedRows > 0) {
            res.status(200).json({ message: `Images with booking_id ${booking_id} deleted successfully` });
        } else {
            res.status(404).json({ message: 'Images not found' });
        }
    } catch (error) {
        console.error('Error deleting images:', error);
        res.status(500).json({ error: 'An error occurred while deleting the images' });
    }
});
export default router;

