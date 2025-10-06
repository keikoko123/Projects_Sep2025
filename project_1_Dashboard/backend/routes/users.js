// backend/routes/users.js

/**
 * User Profile Routes.
 *
 * Responsibilities:
 * - Define protected routes for user profile management.
 * - GET /api/users/me: Fetch the current user's profile.
 * - PUT /api/users/me: Update the current user's profile.
 * - POST /api/users/:id/follow: Follow another user.
 * - DELETE /api/users/:id/follow: Unfollow another user.
 * - Use a controller to handle the logic.
 * - Export the Express router.
 */

const express = require('express');
const { getUserProfile, updateUserProfile, followUser, unfollowUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/me').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id/follow').post(protect, followUser).delete(protect, unfollowUser);
router.route('/:id').get(getUserProfile); // Add route to get any user's profile

module.exports = router;
