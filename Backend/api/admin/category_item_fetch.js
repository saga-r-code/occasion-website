// http://localhost:3000/api/admin/category_item_fetch 


import express from 'express';
import pool from '../../Database/db.js';

const router = express.Router();

router.get('/api/admin/category_item', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM category_management');
        res.json(result);  // Send all categories as a JSON response
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

export default router;
