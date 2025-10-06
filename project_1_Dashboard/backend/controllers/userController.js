// backend/controllers/userController.js

/**
 * User Controller.
 *
 * Responsibilities:
 * - Handle the logic for fetching the current user's profile.
 * - Handle the logic for updating a user's profile.
 * - Handle the logic for following and unfollowing users.
 */

const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/me
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Follow a user
// @route   POST /api/users/:id/follow
// @access  Private
const followUser = asyncHandler(async (req, res) => {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow) {
        res.status(404);
        throw new Error('User to follow not found');
    }

    if (userToFollow._id.toString() === currentUser._id.toString()) {
        res.status(400);
        throw new Error('You cannot follow yourself');
    }

    // Assuming a 'followers' array in User model for simplicity
    // This would need to be added to the User model schema
    if (!currentUser.following.includes(userToFollow._id)) {
        currentUser.following.push(userToFollow._id);
        userToFollow.followers.push(currentUser._id); // Assuming 'followers' array in User model
        await currentUser.save();
        await userToFollow.save();
        res.json({ message: `You are now following ${userToFollow.username}` });
    } else {
        res.status(400);
        throw new Error('Already following this user');
    }
});

// @desc    Unfollow a user
// @route   DELETE /api/users/:id/follow
// @access  Private
const unfollowUser = asyncHandler(async (req, res) => {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToUnfollow) {
        res.status(404);
        throw new Error('User to unfollow not found');
    }

    if (userToUnfollow._id.toString() === currentUser._id.toString()) {
        res.status(400);
        throw new Error('You cannot unfollow yourself');
    }

    if (currentUser.following.includes(userToUnfollow._id)) {
        currentUser.following = currentUser.following.filter(
            (follow) => follow.toString() !== userToUnfollow._id.toString()
        );
        userToUnfollow.followers = userToUnfollow.followers.filter(
            (follower) => follower.toString() !== currentUser._id.toString()
        );
        await currentUser.save();
        await userToUnfollow.save();
        res.json({ message: `You have unfollowed ${userToUnfollow.username}` });
    } else {
        res.status(400);
        throw new Error('Not following this user');
    }
});


module.exports = { getUserProfile, updateUserProfile, followUser, unfollowUser };
