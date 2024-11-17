// http://localhost:3000/api/user/login
import express from 'express';
import pool from '../../Database/db.js';
import jwt from 'jsonwebtoken';

const jwt_key = process.env.JWT_SAFE_KEY || 'occasion_sagee'

const router = express.Router();

const logoutMiddleware = (req, res, next) => {
   const token = req.cookies.token;

   if (!token) {
       return res.status(401).send({ message: 'Unauthorized' });
   }
   else{
        jwt.verify(token, jwt_key, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: 'Unauthorized' });
            }
            req.body.email = decoded.email;
            next();
        })
   }
}

// POST route to logout user
router.post('/api/admin/logout', logoutMiddleware, async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).send({ message: 'Email is required' });
        }

        // Delete user session from the database
        const result = await pool.query(`DELETE FROM admin_login WHERE email = ?`, [email]);

        if (result.affectedRows === 0) {
            console.log('User session already deleted or not found.');
        }

        // Clear JWT token cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return res.status(200).send({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error.message);
        return res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
});

export default router;