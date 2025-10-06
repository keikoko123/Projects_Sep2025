// backend/utils/generateToken.js

/**
 * Utility function to generate a JSON Web Token (JWT).
 *
 * Responsibilities:
 * - Sign a new JWT with the user's ID and a secret from environment variables.
 * - Set an expiration time for the token.
 * - Return the generated token.
 */

const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

module.exports = generateToken;
