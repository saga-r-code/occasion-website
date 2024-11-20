// http://localhost:3000/api/admin/customization_table

import express from 'express';
import pool from '../../Database/db.js';
import multer from 'multer';
import sharp from 'sharp';

const storage = multer.memoryStorage();
const upload = multer({storage});

const router = express.Router();

//Get all Customizatio item with booking_id
router.get('/api/admin/customization_table/:booking_id', async (req, res) => {
    const { booking_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM customization_item WHERE booking_id = ?', [booking_id]);
        res.json(result);  // Send all categories as a JSON response
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
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

router.post(
    '/api/admin/customization_table',
    upload.array('custom_image'), // Accept multiple files under the field 'custom_image'
    async (req, res) => {
        let conn;
        try {
            const { booking_id, custom_title, custom_desc, custom_price } = req.body;

            console.log('Received body:', req.body);
            console.log('Uploaded files:', req.files); // Log uploaded files

            if (!booking_id) {
                return res.status(400).json({ message: 'Missing booking ID' });
            }

            conn = await pool.getConnection();

            // Validate the booking ID exists
            const bookingExists = await conn.query(
                'SELECT * FROM bookingform WHERE id = ?',
                [booking_id]
            );
            if (bookingExists.length === 0) {
                return res.status(404).json({ message: 'Invalid Booking Id' });
            }

            // Validate arrays length consistency
            if (
                !Array.isArray(custom_title) ||
                custom_title.length !== req.files.length ||
                custom_title.length !== custom_desc.length ||
                custom_title.length !== custom_price.length
            ) {
                return res.status(400).json({
                    message: 'Mismatched lengths between customization fields and uploaded files',
                });
            }

            const insertPromises = [];

            // Loop through each customization and process data
            for (let i = 0; i < custom_title.length; i++) {
                const imageBuffer = await sharp(req.files[i].buffer)
                    .resize(500)
                    .jpeg({ quality: 80 })
                    .toBuffer();

                insertPromises.push(
                    conn.query(
                        `
                        INSERT INTO customization_item (custom_image, custom_title, custom_desc, custom_price, booking_id) 
                        VALUES (?, ?, ?, ?, ?)`,
                        [
                            imageBuffer,
                            custom_title[i],
                            custom_desc[i],
                            custom_price[i],
                            booking_id,
                        ]
                    )
                );
            }

            // Execute all insert queries
            await Promise.all(insertPromises);

            res.status(200).json({ message: 'Customizations added successfully' });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        } finally {
            if (conn) conn.release();
        }
    }
);

//delete customization as per the bookind id
router.delete('/api/admin/customization_table/:booking_id', async (req, res) => {
    const { booking_id } = req.params;

    try {
        const checkResult = await pool.query('SELECT * FROM customization_item WHERE booking_id = ?', [booking_id]);

        // If the item does not exist, return a 404 error
        if (checkResult.length === 0) {
            return res.status(404).json({ error: 'customization item not found' });
        }

        // Delete the item by item_id from the database
        const result = await pool.query('DELETE FROM customization_item WHERE booking_id = ?', [booking_id]);

        // Check the result of the deletion
        if (result.affectedRows > 0) {
            res.status(200).json({ message: `Item with booking_id ${booking_id} deleted successfully` });
        } else {
            res.status(404).json({ message: 'customization item not found' });
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'An error occurred while deleting the item' });
    }
});


// // Delete Customization
// router.delete('/api/admin/customization_table/:custom_id', async (req, res) => {
//     const { custom_id } = req.params;

//     try {
//         const checkResult = await pool.query('SELECT * FROM customization_item WHERE custom_id = ?', [custom_id]);

//         // If the item does not exist, return a 404 error
//         if (checkResult.length === 0) {
//             return res.status(404).json({ error: 'customization item not found' });
//         }           
//         // Delete the item by item_id from the database
//         const result = await pool.query('DELETE FROM customization_item WHERE custom_id = ?', [custom_id]);

//         // Check the result of the deletion
//         if (result.affectedRows > 0) {
//             res.status(200).json({ message: `Item with ID ${custom_id} deleted successfully` });
//         } else {
//             res.status(404).json({ message: 'customization item not found' });
//         }
//     } catch (error) {
//         console.error('Error deleting item:', error);
//         res.status(500).json({ error: 'An error occurred while deleting the item' });
//     }
// });



export default router;

