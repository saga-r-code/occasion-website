2// http://localhost:3000/api/admin/category_management

import express from 'express';
import pool from '../../Database/db.js';
import multer from 'multer';
import sharp from 'sharp';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

//Get All Category by thire id for title
router.get('/api/admin/category_management/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM category_management WHERE id = ?', [id]);
        
        if (result.length === 0) {
            return res.status(404).send({ message: 'Item not found' });  // Item not found
        }
        
        res.json(result[0]);  // Send the found category as a JSON response
    } catch (error) {
        console.error('Error fetching category:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

//Get All Category
router.get('/api/admin/category_management', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM category_management');
        res.json(result);  // Send all categories as a JSON response
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

//Add data
router.post('/api/admin/category_management', upload.single('image'), async (req, res) => {
    let conn;
    try {
        const { category_name, title, location, old_price, new_price } = req.body;

        
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

        const result = await conn.query( `
            INSERT INTO category_management (category_name, title, location, old_price, new_price, image) 
            VALUES (?, ?, ?, ?, ?, ?)
        `,[category_name,title,location,old_price,new_price,imageBuffer,]
        );


        console.log("Admin Input:", result);
        if (imageBuffer) {
            console.log("Image Buffer Size:", imageBuffer.length);
            console.log("Image Buffer Preview:", imageBuffer.slice(0, 20)); // Log only the first 20 bytes
        }

        if(result.affectedRows === 1){
            res.status(200).json({
                message: 'Data inserted successfully',
                id : Number(result.insertId),
                category_name,
                title,
                location,
                old_price,
                new_price,
                image: req.file ? req.file.originalname : null
            });
        }
    } catch (error) {
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

//Delete data
router.delete('/api/admin/category_management/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const checkResult = await pool.query('SELECT * FROM category_management WHERE id = ?', [id]);

        // If the item does not exist, return a 404 error
        if (checkResult.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }           
        // Delete the item by id from the database
        const result = await pool.query('DELETE FROM category_management WHERE id = ?', [id]);

        // Check the result of the deletion
        if (result.affectedRows > 0) {
            res.status(200).json({ message: `Item with ID ${id} deleted successfully` });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'An error occurred while deleting the item' });
    }
});




export default router;
