import express from 'express';
import dotenv from 'dotenv'; // Load environment variables
import cors from 'cors'; // Middleware for enabling CORS (CORS - Cross-Origin Resource Sharing - allows controlled access to resources located outside of a given domain)
import connectDB from './config/database.js'; // Import the database connection function

dotenv.config(); // Load environment variables from .env file

connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable calls from frontend 
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

import exerciseRoutes from './routes/exerciseRoutes.js'; // Import exercise routes


// endpoints

app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is healthy',
        timestamp: new Date().toISOString() // Include the current timestamp
    })
})

app.use('/api/exercises', exerciseRoutes); // Use exercise routes for /api/exercises endpoint

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});// Handle undefined routes

const PORT = process.env.PORT || 3000; // Use the port from environment variables or default to 5000
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🌐 API URL: http://localhost:${PORT}`);
    console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
}); // Start the server and listen on the specified port