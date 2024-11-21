// http://localhost:3000/api/admin/booking_management 

import express from 'express';
import pool from '../../Database/db.js';
import multer from 'multer';

const router = express.Router();

const upload = multer()


//Get All Category with booking id
router.get('/api/admin/booking_management/:id', async (req, res) => {
    let conn;
    const id = req.params.id;
    try {
        conn = await pool.getConnection()

        // fetch booking details
        const bookingResult = await conn.query('SELECT * FROM bookingform WHERE id = ?', [id]);

        if (bookingResult.length === 0) {
            return res.status(404).send({ message: 'Booking not found' });
        }

        const booking = bookingResult[0];

        // fetch inclusions
        const inclusionsResult = await conn.query('SELECT * FROM inclusions WHERE booking_id = ?', [id]);
        const customizationResult = await conn.query('SELECT * FROM customization_item WHERE booking_id = ?', [id]);
        const multiImages = await conn.query('SELECT * FROM multi_images WHERE booking_id = ?', [id]);

        const inclusions = inclusionsResult.map((inclusion) => ({
            inclusion_id: inclusion.inclusion_id,
            inclusion_desc: inclusion.inclusion_desc,
        }));

        const customizations = customizationResult.map((customization) => ({
            custom_id: customization.custom_id,
            custom_image: customization.custom_image,
            custom_title: customization.custom_title,
            custom_desc: customization.custom_desc,
            custom_price: customization.custom_price,
        }));

        const images = multiImages.map((image) => ({
            image_id: image.image_id,
            image_url: image.image_url,
        }));


        res.json({
            booking,
            inclusions,
            customizations,
            images
        });
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});


// Get all details for a specific category_management ID and its related bookingform entries
router.get('/api/admin/booking_details/:id', async (req, res) => {
    const { id } = req.params; // Get the category ID from the request parameters
    let conn;

    try {
        conn = await pool.getConnection();

        // SQL query to fetch all details related to the category_management ID
        const categoryBookingDetails = await conn.query(`
            SELECT 
                cm.id AS category_id,
                cm.category_name,
                cm.title AS category_title,
                cm.location,
                cm.old_price,
                cm.new_price,
                bf.id AS booking_id,
                bf.title AS booking_title,
                bf.description AS booking_description,
                bf.price AS booking_price,
                bf.discount AS booking_discount,
                GROUP_CONCAT(DISTINCT JSON_OBJECT('inclusion_id' , inc.inclusion_id,'inclusion_desc',inc.inclusion_desc)) AS inclusions,
                GROUP_CONCAT(DISTINCT JSON_OBJECT('image_id', mi.image_id, 'image', mi.image)) AS multi_images,
                GROUP_CONCAT(DISTINCT JSON_OBJECT("custom_id", ci.custom_id, 'custom_title', ci.custom_title, 'custom_desc', ci.custom_desc, 'custom_price', ci.custom_price, 'custom_image', TO_BASE64(ci.custom_image))) AS customizations
            FROM 
                category_management cm
            LEFT JOIN 
                bookingform bf ON cm.id = bf.item_id
            LEFT JOIN 
                inclusions inc ON bf.id = inc.booking_id
            LEFT JOIN 
                multi_images mi ON bf.id = mi.booking_id
            LEFT JOIN 
                customization_item ci ON bf.id = ci.booking_id
            WHERE 
                cm.id = ?
            GROUP BY 
                bf.id;
        `, [id]);

        // Handle no data
        if (categoryBookingDetails.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this category' });
        }

        // Format the response
        const response = {
            category: {
                id: categoryBookingDetails[0].category_id,
                name: categoryBookingDetails[0].category_name,
                title: categoryBookingDetails[0].category_title,
                location: categoryBookingDetails[0].location,
                old_price: categoryBookingDetails[0].old_price,
                new_price: categoryBookingDetails[0].new_price,
            },
            bookings: categoryBookingDetails.map(detail => {

                // Handle inclusions
                let inclusionsArray = [];
                if (detail.inclusions) {
                    try {
                        const inclusions = JSON.parse(`[${detail.inclusions}]`);
                        inclusionsArray = inclusions.map(inclusion => ({
                            inclusion_id: inclusion.inclusion_id,
                            inclusion_desc: inclusion.inclusion_desc
                        }));
                    } catch (error) {
                        console.error('Error parsing inclusions:', error.message);
                    }
                }
                
                // Handle images
                let imagesArray = [];
                if (detail.multi_images) {
                    try {
                        const images = JSON.parse(`[${detail.multi_images}]`);
                        imagesArray = images.map(image => ({
                            image_id: image.image_id,
                            image: image.image
                                ? `data:image/*;base64,${Buffer.from(image.image).toString('base64')}`
                                : null
                        }));
                    } catch (error) {
                        console.error('Error parsing multi_images:', error.message);
                    }
                }

                // Handle customizations
                let customizationsArray = [];
                if (detail.customizations) {
                    try {
                        const customizations = JSON.parse(`[${detail.customizations}]`);
                        customizationsArray = customizations.map(customization => ({
                            custom_id: customization.custom_id,
                            title: customization.custom_title,
                            description: customization.custom_desc,
                            price: Number(customization.custom_price),
                            custom_image: customization.custom_image,
                        }));
                    } catch (error) {
                        console.error('Error parsing customizations:', error.message);
                    }
                }

                return {
                    booking_id: detail.booking_id,
                    title: detail.booking_title,
                    description: detail.booking_description,
                    price: detail.booking_price,
                    discount: detail.booking_discount,
                    inclusions:inclusionsArray,
                    images: imagesArray,
                    customizations: customizationsArray,
                };
            })
        };

        res.json(response);
    } catch (error) {
        console.error('Error fetching category and booking details:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        if (conn) {
            await conn.release();
        }
    }
});


// Delete all details for a specific category_management ID and its related bookingform entries
router.delete('/api/admin/booking_details/:id', async (req, res) => {
    const { id } = req.params; // Get the category_management ID from the request parameters
    let conn;

    try {
        conn = await pool.getConnection();

        // Check if the category exists
        const checkCategory = await conn.query('SELECT * FROM category_management WHERE id = ?', [id]);

        if (checkCategory.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Fetch all related booking IDs for the category
        const relatedBookings = await conn.query('SELECT id FROM bookingform WHERE item_id = ?', [id]);

        // Delete related inclusions, images, and customizations for each booking
        for (const booking of relatedBookings) {
            const bookingId = booking.id;

            // Delete inclusions
            await conn.query('DELETE FROM inclusions WHERE booking_id = ?', [bookingId]);
            // Delete multi_images
            await conn.query('DELETE FROM multi_images WHERE booking_id = ?', [bookingId]);
            // Delete customizations
            await conn.query('DELETE FROM customization_item WHERE booking_id = ?', [bookingId]);
        }

        // Delete the bookings associated with the category
        await conn.query('DELETE FROM bookingform WHERE item_id = ?', [id]);

        // Finally, delete the category
        await conn.query('DELETE FROM category_management WHERE id = ?', [id]);

        res.status(200).json({ message: `Category with ID ${id} and its associated bookings deleted successfully` });

    } catch (error) {
        console.error('Error deleting category and associated bookings:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        if (conn) {
            await conn.release();
        }
    }
});

//Get All Category
router.get('/api/admin/booking_management', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM bookingform');
        res.json(result);  // Send all categories as a JSON response
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});



//Add data
router.post('/api/admin/booking_management', upload.any(), async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { title, description, price, discount, item_id } = req.body;


        // console.log("bookingform details: ", req.body);
        console.log("files", req.files)

        const result = await conn.query('INSERT INTO bookingform (title, description, price, discount, item_id) VALUES (?, ?, ?, ?, ?)', [title, description, price, discount, item_id]);

        console.log(result);

        if (result.affectedRows === 1) {
            const insertID = Number(result.insertId); // Corrected property name
            console.log("bookingform id: ", insertID);
            return res.json({
                message: "bookingform added successfully",
                id: insertID,
                item_id: item_id
            });
        } else {
            return res.status(400).json({
                message: "Failed to add bookingform"
            });
        }
    } catch (error) {
        console.error('Error inserting Bookingform:', error); // Log the entire error object
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    } finally {
        if (conn) {
            await conn.release();
        }
    }
});

// Delete data
router.delete('/api/admin/booking_management/:id', async (req, res) => {
    const { id } = req.params; // Get id from params

    try {
        const checkResult = await pool.query('SELECT * FROM bookingform WHERE id = ?', [id]);

        // If no booking found, return 404
        if (checkResult.length === 0) {
            return res.status(404).json({ error: 'Booking id not found' });
        }

        const result = await pool.query('DELETE FROM bookingform WHERE id = ?', [id]);

        if (result.affectedRows === 1) {
            res.status(200).json({ message: `Booking with ID ${id} deleted successfully` });
        } else {
            res.status(500).json({ error: 'An error occurred while deleting the booking id' });
        }

    } catch (error) {
        console.error('Error deleting Booking id:', error);
        res.status(500).json({ error: 'An error occurred while deleting the booking id' });
    }
});




// const categoryBookingDetails = await conn.query(`
//     SELECT cm.id AS category_id,
//            cm.category_name,
//            cm.title AS category_title,
//            cm.location,
//            cm.old_price,
//            cm.new_price,
//            bf.id AS booking_id,
//            bf.title AS booking_title,
//            bf.description AS booking_description,
//            bf.price AS booking_price,
//            bf.discount AS booking_discount,
//            inc.inclusion_desc,
//            mi.image AS multi_image,
//            ci.custom_title, ci.custom_desc, ci.custom_price
//     FROM category_management cm
//     LEFT JOIN bookingform bf ON cm.id = bf.item_id
//     LEFT JOIN inclusions inc ON bf.id = inc.booking_id
//     LEFT JOIN multi_images mi ON bf.id = mi.booking_id
//     LEFT JOIN customization_item ci ON bf.id = ci.booking_id
//     WHERE cm.id = ?
// `, [id]);

// if (categoryBookingDetails.length === 0) {
//     return res.status(404).json({ message: 'No bookings found for this category' });
// }

// // Format the response
// const response = {
//     category: {
//         id: categoryBookingDetails[0].category_id,
//         name: categoryBookingDetails[0].category_name,
//         title: categoryBookingDetails[0].category_title,
//         location: categoryBookingDetails[0].location,
//         old_price: categoryBookingDetails[0].old_price,
//         new_price: categoryBookingDetails[0].new_price,
//     },
//     bookings: categoryBookingDetails.map(detail => ({
//         booking_id: detail.booking_id,
//         title: detail.booking_title,
//         description: detail.booking_description,
//         price: detail.booking_price,
//         discount: detail.booking_discount,
//         inclusions: detail.inclusion_desc ? [detail.inclusion_desc] : [],
//         images: detail.multi_image ? [detail.multi_image] : [],
//         customizations: detail.custom_title ? [{
//             title: detail.custom_title,
//             description: detail.custom_desc,
//             price: detail.custom_price
//         }] : []
//     })).filter(booking => booking.booking_id) // Filter out any bookings that do not exist
// };



export default router;
