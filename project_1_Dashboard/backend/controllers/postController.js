// backend/controllers/postController.js

/**
 * Post Controller.
 *
 * Responsibilities:
 * - Handle the logic for creating, retrieving, updating, and deleting posts.
 * - Ensure that only the author of a post can modify or delete it.
 * * - Handle the logic for liking, unliking, and commenting on posts.
 */

const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');
const User = require('../models/User');

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
    const { text } = req.body;

    if (!text) {
        res.status(400);
        throw new Error('Post text is required');
    }

    const post = await Post.create({
        user: req.user._id,
        text,
    });

    res.status(201).json(post);
});

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({})
        .populate('user', 'username')
        .sort({ createdAt: -1 }); // Sort by newest first
    res.json(posts);
});

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id).populate('user', 'username');

    if (post) {
        res.json(post);
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
    const { text } = req.body;

    const post = await Post.findById(req.params.id);

    if (post) {
        // Check for user
        if (!req.user) {
            res.status(401);
            throw new Error('User not found');
        }

        // Make sure the logged in user matches the post user
        if (post.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('User not authorized');
        }

        post.text = text || post.text;

        const updatedPost = await post.save();
        res.json(updatedPost);
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
        // Check for user
        if (!req.user) {
            res.status(401);
            throw new Error('User not found');
        }

        // Make sure the logged in user matches the post user
        if (post.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('User not authorized');
        }

        await Post.deleteOne({ _id: req.params.id });
        res.json({ message: 'Post removed' });
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
});

// @desc    Like a post
// @route   PUT /api/posts/:id/like
// @access  Private
const likePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
        // Check if the post has already been liked by this user
        if (post.likes.some((like) => like.user.toString() === req.user._id.toString())) {
            res.status(400);
            throw new Error('Post already liked');
        }

        post.likes.unshift({ user: req.user._id });
        await post.save();
        res.json(post.likes);
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
});

// @desc    Unlike a post
// @route   PUT /api/posts/:id/unlike
// @access  Private
const unlikePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
        // Check if the post has not yet been liked by this user
        if (!post.likes.some((like) => like.user.toString() === req.user._id.toString())) {
            res.status(400);
            throw new Error('Post has not yet been liked');
        }

        // Remove the like
        post.likes = post.likes.filter(
            ({ user }) => user.toString() !== req.user._id.toString()
        );

        await post.save();
        res.json(post.likes);
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
});

// @desc    Add a comment to a post
// @route   POST /api/posts/:id/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
    const { text } = req.body;

    if (!text) {
        res.status(400);
        throw new Error('Comment text is required');
    }

    const post = await Post.findById(req.params.id);

    if (post) {
        const newComment = {
            user: req.user._id,
            text,
        };

        post.comments.unshift(newComment);
        await post.save();
        res.status(201).json(post.comments);
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
});

// @desc    Delete a comment from a post
// @route   DELETE /api/posts/:id/comments/:comment_id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
        // Pull out comment
        const comment = post.comments.find(
            (comment) => comment._id.toString() === req.params.comment_id
        );

        // Make sure comment exists
        if (!comment) {
            res.status(404);
            throw new Error('Comment does not exist');
        }

        // Check user
        if (comment.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('User not authorized');
        }

        // Remove the comment
        post.comments = post.comments.filter(
            ({ _id }) => _id.toString() !== req.params.comment_id
        );

        await post.save();
        res.json({ message: 'Comment removed' });
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
});


module.exports = { createPost, getPosts, getPostById, updatePost, deletePost, likePost, unlikePost, addComment, deleteComment };
