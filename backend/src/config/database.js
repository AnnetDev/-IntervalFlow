import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI); // Connect to MongoDB using the URI from environment variables

        console.log(`MongoDB Connected: ${conn.connection.host}`); // Log the host of the connected database
        console.log(`Database: ${conn.connection.name}`); // Log the name of the connected database
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`); // Log any connection errors
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;