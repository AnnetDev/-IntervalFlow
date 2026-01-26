import mongoose from "mongoose";

// enum - a special data type that enables a variable to be a set of predefined constants.

const exerciseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Exercise name is required'],
            trim: true, // Remove leading/trailing whitespace
            maxlength: [100, 'Name cannot exceed 100 characters']
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            maxlength: [500, 'Description cannot exceed 500 characters']
        },
        difficulty: {
            type: String,
            required: [true, 'Difficulty level is required'],
            enum: { 
                values: ['beginner', 'intermediate', 'advanced'],
                message: 'Difficulty must be beginner, intermediate, or advanced'
            },
            lowercase: true
        },
        muscleGroup: {
            type: String,
            required: [true, 'Muscle group is required'],
            enum: { 
                values: ['cardio', 'legs', 'core', 'upper-body', 'full-body'],
                message: 'Invalid muscle group'
            },
            lowercase: true
        },
        duration: {
            type: Number,
            default: 30,
            min: [10, 'Duration must be at least 10 seconds'],
            max: [300, 'Duration cannot exceed 300 seconds']
        },
        equipment: {
            type: String,
            enum: ['none', 'dumbbells', 'mat', 'resistance-band'],
            default: 'none',
            lowercase: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
        }
    },
    {
        timestamps: true // Automatically manage createdAt and updatedAt fields
    }
);
