import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc   Authenticate user and get token - Validate user credentials and provide a JWT for authenticated access
// @route  POST /api/auth/register - Register a new user
// @access Public

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        const usernameExist = await User.findOne({ username });
        if (usernameExist) {
            return res.status(400).json({
                success: false,
                message: 'Username is already taken'
            });
        }

        const user = await User.create({
            username,
            email,
            password
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                token
            }
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: messages
            });
        }

        if (error.code === 11000) { // Duplicate key error code in MongoDB 
            const field = Object.keys(error.keyPattern)[0]; // keyPattern contains the fields that caused the duplicate key error
            return res.status(400).json({
                success: false,
                message: `Duplicate field value: ${field} already exists`
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to register user',
            error: error.message
        });
    }
}


// @desc   Authenticate user and get token - Validate user credentials and provide a JWT for authenticated access
// @route  POST /api/auth/login - Login an existing user
// @access Public

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both email and password'
            });
        }

        const user = await User.findOne({ email }).select('+password'); // .secelect('+password') is used to include the password field which is excluded by default in the User model
        if (!user || (await user.comparePassword(password)) === false) { // comparePassword method compares the entered password with the hashed password
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const token = generateToken(user._id);
        res.status(200).json({
            success: true,
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                token
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};