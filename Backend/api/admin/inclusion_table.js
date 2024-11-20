// http://localhost:3000/api/admin/inclusion_table

import express from 'express';
import pool from '../../Database/db.js';
import multer from 'multer';

const upload = multer()

const router = express.Router();


//get all inclusion as per the booking id
router.get('/api/admin/inclusion_table/:booking_id', async (req, res) => {
    const { booking_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM inclusions WHERE booking_id = ?', [booking_id]);
        res.json(result);  // Send all Images as a JSON response
    } catch (error) {
        console.error('Error fetching inclusions:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

//Get all Inclusion
router.get('/api/admin/inclusion_table', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM inclusions');
        res.json(result);  // Send all Images as a JSON response
    } catch (error) {
        console.error('Error fetching inclusions:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Add data
router.post('/api/admin/inclusion_table', upload.any(), async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let { inclusion_desc, booking_id } = req.body;

        console.log('Inclusion description:', req.body);

        // Ensure inclusion_desc is correctly formatted
        if (typeof inclusion_desc === 'string') {
            try {
                inclusion_desc = JSON.parse(inclusion_desc); // Parse only if it's a JSON string
            } catch (e) {
                console.log('Failed to parse inclusion_desc, treating as plain string');
            }
        }

        // Check if inclusion_desc is an array
        const inclusion_desc_array = Array.isArray(inclusion_desc)
            ? inclusion_desc
            : [inclusion_desc];

        // Prepare to insert inclusions
        const insertPromises = inclusion_desc_array.map(async (desc) => {
            try {
                // Ensure each inclusion_desc is parsed correctly
                if (typeof desc === 'string') {
                    inclusion_desc = JSON.parse(desc);
                }
                const result = await conn.query(
                    'INSERT INTO inclusions (inclusion_desc, booking_id) VALUES (?, ?)',
                    [inclusion_desc, booking_id]
                );
                return result.insertId; // Return the inserted ID
            } catch (error) {
                console.error('Error inserting inclusion:', error);
                throw error; // Rethrow to handle later
            }
        });

        // Wait for all insertions to finish and collect IDs
        const insertedIds = await Promise.all(insertPromises);

        // Send response
        res.json({
            message: 'Inclusions added successfully',
            inclusion_desc_array,
        });
    } catch (error) {
        console.error('Error inserting inclusion:', error);
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    } finally {
        if (conn) {
            await conn.release();
        }
    }
});



//Delete inclusion
router.delete('/api/admin/inclusion_table/:booking_id', async (req, res) => {
    const { booking_id } = req.params;

    try {
        const checkResult = await pool.query('SELECT * FROM inclusions WHERE booking_id = ?', [booking_id]);

        // If the inclusion does not exist, return a 404 error
        if (checkResult.length === 0) {
            return res.status(404).json({ error: 'Inclusion not found' });
        }

        const result = await pool.query('DELETE FROM inclusions WHERE booking_id = ?', [booking_id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: `Inclusion with booking_id ${booking_id} deleted successfully` });
        } else {
            res.status(404).json({ message: 'Inclusion not found' });
        }
    } catch (error) {
        console.error('Error deleting inclusion:', error);
        res.status(500).json({ error: 'An error occurred while deleting the inclusion' });
    }
});

export default router;
