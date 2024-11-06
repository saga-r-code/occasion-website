// http://localhost:3000/api/admin/category 


import express from 'express';
import pool from '../../Database/db.js';

const router = express.Router();

//Display The Category
router.get('/api/admin/category', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM category');
        res.json(result);  // Send all categories as a JSON response
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

//Add Category
router.post('/api/admin/category', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { category_name } = req.body; // Use category_name from the request body

        // Check if the category already exists
        const existingCategory = await conn.query('SELECT * FROM category WHERE category_name = ?', [category_name]);

        if (existingCategory.length > 0) {
            return res.status(400).json({
                message: 'Category already exists'
            });
        }

        // Insert the category name into the database
        const result = await conn.query('INSERT INTO category (category_name) VALUES (?)', [category_name]);

        // The result will include insertId if the insertion is successful
        res.json({
            message: 'Category added successfully',
            category_id: result.insertId // This is the auto-incremented ID
        });
    } catch (error) {
        console.error('Error inserting category:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    } finally {
        if (conn) {
            await conn.release();
        }
    }
});
export default router;
