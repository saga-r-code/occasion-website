// http://localhost:3000/api/admin/inclusions_table

import express from 'express';
import pool from '../../Database/db.js';

const router = express.Router();

//Add inclusion
router.post('/api/admin/inclusion_table', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { inclusion_desc, booking_id } = req.body;

        console.log('Inclusion description:', req.body); 

        //validate booking_id exist
        const bookingExist = await conn.query('SELECT * FROM bookingform WHERE booking_id = ?', [booking_id]);
        console.log(bookingExist)
        if(bookingExist.length === 0){
            return res.status(404).json({ message: 'Invalid Booking Id' });
        }

        const result = await conn.query('INSERT INTO inclusions (inclusion_desc, booking_id) VALUES (?, ?)', [inclusion_desc, booking_id]);

        console.log(result)
        
        if (result.affectedRows === 1) {
            const insertID = Number(result.insertId); // Convert to a regular number
            console.log('Insert successful, ID:', insertID); 
            return res.json({ 
                message: 'Inclusion addedbooki successfully', 
                id: insertID, 
                inclusion_desc: inclusion_desc 
            });
        } else {
            res.status(500).send({ message: 'Error adding inclusion' });
        }
    } catch (error) {
        console.error('Error inserting inclusion:', error); // Log the entire error object
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    } finally {
        if (conn) {
            await conn.release();
        }
    }
});

//Delete inclusion
router.delete('/api/admin/inclusion_table/:inclusion_id', async (req, res) => {
    const { inclusion_id } = req.params;

    try {
        const checkResult = await pool.query('SELECT * FROM inclusions WHERE inclusion_id = ?', [inclusion_id]);

        // If the inclusion does not exist, return a 404 error
        if (checkResult.length === 0) {
            return res.status(404).json({ error: 'Inclusion not found' });
        }

        // Delete the inclusion by inclusion_id from the database
        const result = await pool.query('DELETE FROM inclusions WHERE inclusion_id = ?', [inclusion_id]);

        // Check the result of the deletion
        if (result.affectedRows === 1) {
            res.status(200).json({ message: `Inclusion with ID ${inclusion_id} deleted successfully` });
        } else {
            res.status(404).json({ message: 'Inclusion not found' });
        }
    } catch (error) {
        console.error('Error deleting inclusion:', error);
        res.status(500).json({ error: 'An error occurred while deleting the inclusion' });
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
export default router;
