// backend/models/Post.js

/**
 * Post Schema and Model.
 *
 * Responsibilities:
 * - Define the schema for the 'posts' collection.
 * - Include fields for the post content, the author (as a reference to the User model),
 *   likes, and comments.
 * - Use timestamps to automatically track creation and update times.
 * - Export the Mongoose model.
 */

const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        text: {
            type: String,
            required: true,
        },
        likes: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
            },
        ],
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                text: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;


