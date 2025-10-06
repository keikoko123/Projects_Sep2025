// backend/routes/auth.js

/**
 * Authentication Routes.
 *
 * Responsibilities:
 * - Define routes for user registration (`/register`) and login (`/login`).
 * - Use a controller to handle the business logic for each route.
 * - Export the Express router.
 */

const express = require('express');
const { registerUser, authUser } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);

module.exports = router;



