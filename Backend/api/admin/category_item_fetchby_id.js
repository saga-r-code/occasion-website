// http://localhost:3000/api/admin/category_fetch 


import express from 'express';
import pool from '../../Database/db.js';

const router = express.Router();

//Get All Category
router.get('/api/admin/category_fetch/:item_id', async (req, res) => {
    const { item_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM category_management WHERE item_id = ?', [item_id]);
        
        if (result.length === 0) {
            return res.status(404).send({ message: 'Item not found' });  // Item not found
        }
        
        res.json(result[0]);  // Send the found category as a JSON response
    } catch (error) {
        console.error('Error fetching category:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

export default router;
