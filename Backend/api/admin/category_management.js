import express from 'express';
import pool from '../../Database/db.js';
import multer from 'multer';
import sharp from 'sharp'

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post('/api/admin/category_management', upload.single('image'), async (req, res) => {
    let conn;
    try {
        const adminInput = req.body;

        // Compress and resize the image using sharp
        let imageBuffer;
        if (req.file) {
            imageBuffer = await sharp(req.file.buffer)
                .resize(500) // Resize to a width of 500 pixels (adjust as needed)
                .jpeg({ quality: 80 }) // Convert to JPEG format with 80% quality
                .toBuffer();
        } else {
            imageBuffer = null;
        }

        // Connect to the database
        conn = await pool.getConnection();

        const query = `
            INSERT INTO category_management (category_name, title, location, rating, old_price, new_price, image) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const result = await conn.query(query, [
            adminInput.category_name,
            adminInput.title,
            adminInput.location,
            adminInput.rating,
            adminInput.old_price,
            adminInput.new_price,
            imageBuffer,
        ]);


        console.log("Admin Input:", {
            category_name: adminInput.category_name,
            title: adminInput.title,
            location: adminInput.location,
            rating: adminInput.rating,
            old_price: adminInput.old_price,
            new_price: adminInput.new_price
        });
        if (imageBuffer) {
            console.log("Image Buffer Size:", imageBuffer.length);
            console.log("Image Buffer Preview:", imageBuffer.slice(0, 20)); // Log only the first 20 bytes
        }



        res.status(201).send({
            message: `Admin added successfully`,
            data: {
                category_name: adminInput.category_name,
                title: adminInput.title,
                location: adminInput.location,
                rating: adminInput.rating,
                old_price: adminInput.old_price,
                new_price: adminInput.new_price,
                image: req.file ? req.file.originalname : null
            }
        });
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

export default router;
