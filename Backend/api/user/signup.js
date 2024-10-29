// http://localhost:3000/api/user/signup

import express from 'express';
import pool from '../../Database/db.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const jwt_key = process.env.JWT_SAFE_KEY || 'occasion_sagee'

// POST route to signup user
router.post('/api/user/signup', [

    // Validate and sanitize input
    body('username').notEmpty().withMessage('Username is required.'),
    body('email').isEmail().withMessage('Please enter a valid email address.'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.'),
    
    // Confirm password validation
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match.');
        }
        return true;
    })
], async (req, res) => {
    let conn;
    try {
        const userInput = req.body;

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if email already exists
        const existingEmail = await pool.query(`SELECT * FROM user_signup WHERE email = ?`, [userInput.email]);
        if (existingEmail.length > 0) {
            console.log("Email already exists");
            return res.status(409).send({ message: "Email already exists" });
        }

        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userInput.password, salt);

        conn = await pool.getConnection();

        const query = `INSERT INTO user_signup (username, email, password) VALUES (?, ?, ?)`;
        await conn.query(query, [
            userInput.username,
            userInput.email,
            hashedPassword, // Store the hashed password
        ]);

        console.log("Successfully Created");

        // Generate Token
        const token = jwt.sign({ email: userInput.email }, jwt_key);

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true, // Prevents client-side access to the cookie
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            sameSite: 'strict' // Restrict cookie to same-site requests
        });

        res.status(201).send({ message: "Account Created Successfully:", token: token });

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