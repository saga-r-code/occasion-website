// http://localhost:3000/api/admin/category_delete 


import express from 'express';
import pool from '../../Database/db.js';

const router = express.Router();

router.delete('/api/admin/category_delete/:item_id', async (req, res) => {
    const { item_id } = req.params;

    try {
        const checkResult = await pool.query('SELECT * FROM category_management WHERE item_id = ?', [item_id]);

        // If the item does not exist, return a 404 error
        if (checkResult.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        // Delete the item by item_id from the database
        const result = await pool.query('DELETE FROM category_management WHERE item_id = ?', [item_id]);

        // Check the result of the deletion
        if (result.rowCount > 0) {
            res.status(200).json({ message: `Item with ID ${item_id} deleted successfully` });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'An error occurred while deleting the item' });
    }
});

export default router;
