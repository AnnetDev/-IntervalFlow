import mongoose from "mongoose";
import dotenv from "dotenv";
import Exercise from "../models/Exercise.js";
import exercisesData from "./exercisesSeed.js";

dotenv.config(); // Load environment variables from .env file

const seedExercises = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // Connect to MongoDB using the URI from environment variables

        console.log("MongoDB Connected");

        // // Clear existing exercises
        // await Exercise.deleteMany({});
        // console.log("Existing exercises cleared");

        // Insert seed data
        const createdExercises = await Exercise.insertMany(exercisesData);
        console.log(`${createdExercises.length} exercises inserted`);

        // disconnect from database
        await mongoose.disconnect();
        console.log("MongoDB Disconnected");
        process.exit(0); // Exit the process with success

    } catch (error) { 
        console.error('Error seeding exercises:', error);
        process.exit(1); // Exit the process with failure
    }
}

seedExercises();