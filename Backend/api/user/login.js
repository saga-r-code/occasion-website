// // http://localhost:3000/api/user/login

// import express from "express";
// import pool from '../../Database/db'

// const router = express.Router();

// // Login route
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Check if email and password are provided
//         if (!email || !password) {
//             return res.status(400).json({ message: 'Email and password are required' });
//         }

//         // Check if user exists
//         const userQuery = {
//             text: 'SELECT * FROM users WHERE email = $1',
//             values: [email]
//         };

//         const result = await pool.query(userQuery);

//         if (result.rows.length === 0) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         // Verify password (assuming passwords are stored in plain text)
//         const user = result.rows[0];
//         if (user.password !== password) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         // If login is successful, return a success message or user data
//         res.json({ message: 'Login successful', user: { id: user.id, email: user.email } });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// export default router;