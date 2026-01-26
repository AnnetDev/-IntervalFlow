import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    return jwt.sign( // Sign the JWT with the user ID as payload
        { id: userId }, // Payload containing the user ID
        process.env.JWT_SECRET, // Secret key for signing the token from environment variables
        { expiresIn: process.env.JWT_EXPIRE }
    );
};

export default generateToken;