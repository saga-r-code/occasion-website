// http://localhost:3000/api/admin/category 


import express from 'express';
import pool from '../../Database/db.js';

const router = express.Router();

router.get('/api/admin/category', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM category');
        
        const rows = Array.isArray(result[0]) ? result[0] : result;  // Adjust for array of arrays
        console.log('Categories:', rows);
        
        res.json(rows);  // Send all categories as a JSON response
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

export default router;

