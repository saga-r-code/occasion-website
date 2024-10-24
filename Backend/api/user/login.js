// http://localhost:3000/api/user/login

import express from 'express';
import pool from '../../Database/db.js';

const router = express.Router();

// POST route to login user
router.post('/api/user/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).send({ message: "Email and password are required" });
        }

        // Check if the user exists and password matches
        const userResult = await pool.query(`SELECT * FROM user_signup WHERE email = ?`, [email]);

        if (userResult.length === 0) {
            console.log("please check details")
            return res.status(401).send({ message: "Invalid email please fill properly " });
        }

        const user = userResult[0];


        if (user.password !== password) {
            console.log("please check details")
            return res.status(401).send({ message: "Invalid Credtional" });
        }

        // Check if user already exists in user_login table
        const existingUser = await pool.query(`SELECT * FROM user_login WHERE email = ?`, [email]);

        if (existingUser) {
            console.log("User already Login")
            return res.status(200).send({ message: "User Login " });
        }

        // Insert into user_login table
        const loginQuery = `INSERT INTO user_login (email, password) VALUES (?, ?)`;
        await pool.query(loginQuery, [email, password]);
        console.log("User Successfully Login")
        res.status(200).send({ message: "Login successful" });

    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
});

export default router;