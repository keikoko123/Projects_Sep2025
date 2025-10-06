// backend/config/db.js

/**
 * Database configuration and connection utility.
 *
 * Responsibilities:
 * - Read database connection details from environment variables.
 * - Establish a connection to the MongoDB database using Mongoose.
 * - Handle connection events (e.g., success, error).
 * - Export the connection logic to be used in the main server file.
 */

const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
