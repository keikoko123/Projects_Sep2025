// backend/routes/posts.js

/**
 * Post Routes.
 *
 * Responsibilities:
 * - Define CRUD (Create, Read, Update, Delete) routes for posts.
 * - GET /api/posts: Fetch all posts.
 * - GET /api/posts/:id: Fetch a single post.
 * - POST /api/posts: Create a new post (protected).
 * - PUT /api/posts/:id: Update a post (protected, author only).
 * - DELETE /api/posts/:id: Delete a post (protected, author only).
 * - Define routes for likes and comments.
 * - Use a controller to handle the logic.
 * - Export the Express router.
 */

const express = require('express');
const { createPost, getPosts, getPostById, updatePost, deletePost, likePost, unlikePost, addComment, deleteComment } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, createPost).get(getPosts);
router.route('/:id')
    .get(getPostById)
    .put(protect, updatePost)
    .delete(protect, deletePost);

router.route('/:id/like').put(protect, likePost);
router.route('/:id/unlike').put(protect, unlikePost);
router.route('/:id/comments').post(protect, addComment);
router.route('/:id/comments/:comment_id').delete(protect, deleteComment);

module.exports = router;
