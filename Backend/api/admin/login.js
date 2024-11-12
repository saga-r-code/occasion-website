// http://localhost:3000/api/admin/login 

import express from 'express';
import pool from '../../Database/db.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const jwt_key = process.env.JWT_SAFE_KEY || 'occasion_sagee'


// POST route to login user
router.post('/api/admin/login', [
    // Validate and sanitize input
    body('email').isEmail().toLowerCase().withMessage('Please enter a valid email address.'),
    body('password').notEmpty().withMessage('Password is required.')
], async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Check if the user exists
        const adminResult = await pool.query(`SELECT * FROM admin_signup WHERE email = ?`, [email]);

        if (adminResult.length === 0) {
            console.log("please check details")
            return res.status(401).send({ message: "Invalid email please fill properly " });
        }

        const admin = adminResult[0];

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            console.log("please check details")
            return res.status(401).send({ message: "Invalid Credential" });
        }

        //Genrate Token
        const token = jwt.sign({ email: email }, jwt_key);


        // Set token in cookie
        res.cookie('admin_token', token, {
            httpOnly: true, // Prevents client-side access to the cookie
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            sameSite: 'strict' // Restrict cookie to same-site requests
        });

        // Check if user already exists in user_login table
        const existingUser  = await pool.query(`SELECT * FROM admin_login WHERE email = ?`, [email]);

        // if (existingUser .length > 0) {
        //     console.log("admin Login")
        //     return res.status(200).send({ message: "admin Login " , token: token});
        // }

        // // Insert into user_login table
        // const loginQuery = `INSERT INTO user_login (email, password) VALUES (?, ?)`;
        // await pool.query(loginQuery, [email, admin.password]); // Store hashed password or just email
        console.log("admin Successfully Login")
        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
});

export default router;