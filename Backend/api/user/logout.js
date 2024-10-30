import express from 'express';
import pool from '../../Database/db.js';

const router = express.Router();

// POST route to logout user
router.post('/api/user/logout', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if email is provided
        if (!email) {
            return res.status(400).send({ message: 'Email is required' });
        }

        // Delete user session from the database
        const result = await pool.query(`DELETE FROM user_login WHERE email = ?`, [email]);

        // Check if any rows were affected (i.e., user was logged in)
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'User  not found or already logged out' });
        }

        // Clear the JWT token by setting the cookie to expire immediately
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.status(200).send({ message: "Logout successful" });
    } catch (error) {
        console.error('Error during logout:', error.message);
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
});

export default router;