const express = require('express');
const router = express.Router();
const jsonwebtoken = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const User = require('../models/User');
const decodeJWT = require('../middleware/DecodeJWT');

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existing = await User.findOne({ email });
        if (existing) {
            return res.json({ success: false, message: "This email already exists!" });
        }

        // Hash the password before saving
        const saltRounds = 10;  // You can adjust the cost factor
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user with hashed password
        const userData = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const data = {
            id: userData.id
        };

        // Create JWT token
        let authtoken = jsonwebtoken.sign({ data }, jwt_secret);
        res.json({ success: true, authtoken });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error while saving email.' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials!" });
        }

        // Compare entered password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials!" });
        }

        // Prepare payload for JWT
        const data = {
            id: user.id
        };

        // Sign JWT token
        const authtoken = jsonwebtoken.sign({ data }, jwt_secret);

        res.json({ success: true, authtoken });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during login.' });
    }
});

router.post("/user", decodeJWT, async (req, res) => {
    try {
        const _id = req.id;
        const user = await User.findOne({ _id });
        return res.json({ success: true, user });
    } catch (err) {
        console.log("Error while getting user: ", err)
    }
})

module.exports = router;