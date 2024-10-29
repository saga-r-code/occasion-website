// http://localhost:3000/api/user/logout

import express from 'express';
import pool from '../../Database/db.js';

const router = express.Router();

// POST route to logout user
router.post('/api/user/logout', async (req, res) => {
    try {
        const { email } = req.body;

        await pool.query(`DELETE FROM user_login WHERE email = ?`, [email]);

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
