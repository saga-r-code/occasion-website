// http://localhost:3000/api/admin/customization_table

import express from 'express';
import pool from '../../Database/db.js';
import multer from 'multer';
import sharp from 'sharp';

const storage = multer.memoryStorage();
const upload = multer({storage});

const router = express.Router();

// Add customization
router.post('/api/admin/customization_table', upload.single('custom_image'), async (req, res) => {
    let conn;
    try {
        console.log('Request body:', req.body);
        console.log('Uploaded files:', req.files);

        const { custom_title, custom_desc, custom_price, booking_id } = req.body;
        
        if (!custom_title || !custom_desc || !custom_price || !booking_id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        conn = await pool.getConnection();
        const bookingExist = await conn.query('SELECT * FROM bookingform WHERE booking_id = ?', [booking_id]);
        
        if (bookingExist.length === 0) {
            return res.status(404).json({ message: 'Invalid Booking Id' });
        }

        let imageBuffer = null;
        if (req.files && req.files.length > 0) {
            console.log('File uploaded:', req.files[0]);
            imageBuffer = await sharp(req.files[0].buffer)
                .resize(500)
                .jpeg({ quality: 80 })
                .toBuffer();
            console.log('Processed image buffer:', imageBuffer);
            console.log('Image buffer size:', imageBuffer.length);
        } else {
            console.log('No files uploaded');
        }

        if (!imageBuffer && req.files.length > 0) {
            return res.status(400).send({ message: 'Image upload failed' });
        }

        const result = await conn.query(`
            INSERT INTO customization_item (custom_image, custom_title, custom_desc, custom_price, booking_id) 
            VALUES (?, ?, ?, ?, ?)
        `, [
            imageBuffer || null,
            custom_title,
            custom_desc,
            custom_price,
            booking_id
        ]);

        if (result.affectedRows === 1) {
            return res.json({
                message: 'Customization added successfully',
                id: result.insertId,
                custom_title,
                custom_desc,
                custom_price,
                custom_image: imageBuffer ? 'Image uploaded successfully' : 'No image uploaded'
            });
        } else {
            return res.status(500).send({ message: 'Error adding customization' });
        }
    } catch (error) {
        console.error('Error inserting data:', error.message);
        res.status(500).send({ message: 'TEri maki chut bhadve solve hoja ab to' });
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

