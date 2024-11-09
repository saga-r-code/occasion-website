// http://localhost:3000/api/admin/customization_table

import express from 'express';
import pool from '../../Database/db.js';
import multer from 'multer';
import sharp from 'sharp';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

// Add customization
router.post('/api/admin/customization_table', upload.single('custom_image'), async (req, res) => {
    let conn;
    try {
        const { custom_title, custom_desc, custom_price } = req.body;

        // Compress and resize the image using sharp
        let imageBuffer = null;
        if (req.file) {
            imageBuffer = await sharp(req.file.buffer)
                .resize(500) // Resize to a width of 500 pixels (adjust as needed)
                .jpeg({ quality: 80 }) // Convert to JPEG format with 80% quality
                .toBuffer();
        }

        // Connect to the database
        conn = await pool.getConnection();

        // SQL query with placeholders
        const result = await conn.query(`
            INSERT INTO customization_item (custom_image, custom_title, custom_desc, custom_price) 
            VALUES (?, ?, ?, ?)
        `, [
            imageBuffer, // Image buffer first
            custom_title,
            custom_desc, 
            custom_price
        ]);

        // Get the insertId to return the custom_id
        const custom_id = Number(result.insertId);

        console.log("Added Data:", {
            custom_id, custom_title, custom_desc, custom_price
        });
        if (imageBuffer) {
            console.log("Image Buffer Size:", imageBuffer.length);
            console.log("Image Buffer Preview:", imageBuffer.slice(0, 20)); // Log only the first 20 bytes
        }

        res.status(201).send({
            data: {
                custom_id, // Return the inserted ID
                custom_title,
                custom_desc, 
                custom_price,
                image: req.file ? req.file.originalname : null
            }
        });
    }
    catch (error) {
        console.error('Error inserting data:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
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

