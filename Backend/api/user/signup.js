// http://localhost:3000/api/user/signup

import express from 'express';
import pool from '../../Database/db.js';

const router = express.Router();

// POST route to signup user
let conn;
router.post('/api/user/signup', async (req, res) => {
    try {
        const userInput = req.body;

        
        console.log('User  signup data:', JSON.stringify(userInput, null, 2));
        
        conn = await pool.getConnection();

        const query = `INSERT INTO user_signup (username, email, password)
        VALUES (?, ?, ?)`;

        console.log(query)

        //all data request through user input
        const result = await conn.query(query, [
            userInput.username,
            userInput.email,
            userInput.password,

        ]);

        

        res.status(201).send("Account Create Successfully:");
        


    } catch (error) {
        console.error('Error inserting user:', error.message);
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
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