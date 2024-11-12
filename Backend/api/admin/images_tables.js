// http://localhost:3000/api/admin/images_table

import express from 'express';

import pool from '../../Database/db.js';
import multer from 'multer';
import sharp from 'sharp';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

//Add Images Route
router.post('/api/admin/images_table', upload.array('image', 12), async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        // Loop through each file in req.files array and process them
        const imagePromises = req.files.map(async (file) => {
            let imageBuffer = null;
            try {
                // Compress and resize the image using sharp
                imageBuffer = await sharp(file.buffer)
                    .resize(500) // Resize to a width of 500 pixels (adjust as needed)
                    .jpeg({ quality: 80 }) // Convert to JPEG format with 80% quality
                    .toBuffer();

                // Insert the image buffer into the database
                const result = await conn.query('INSERT INTO multi_images (image) VALUES (?)', [imageBuffer]);

                // Log the image buffer size
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
            await conn.release();
        }
    }
});

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
export default router;