// http://localhost:3000/api/user/signup

import express from 'express';
import pool from '../../Database/db.js';

const router = express.Router();

// POST route to signup user
let conn;
router.post('/api/user/signup', async (req, res) => {
    try {
        const userInput = req.body;


        // console.log('User  signup data:', JSON.stringify(userInput, null, 2));

        //check password length
        if (!userInput.password || userInput.password.length < 8) {
            console.log("Password must be  at least 8 characters long");
            return res.status(400).send({ message: "Password must be  at least 8 characters long" });
        }

        //check if email is already exists
        const existingEmail = await pool.query(`SELECT * FROM user_signup WHERE email = ?`, [
            userInput.email
        ]);
        if (existingEmail.length > 0) {
            console.log("Email is already exist")
            return res.status(409).send({ message: "Email already exists" });
        }


        conn = await pool.getConnection();

        const query = `INSERT INTO user_signup (username, email, password)
        VALUES (?, ?, ?)`;

        console.log("Successfully Created")

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