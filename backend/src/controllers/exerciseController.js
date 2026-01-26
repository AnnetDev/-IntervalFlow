import Exercise from "../models/Exercise.js";

// @desc    Get all exercises with optional filters - difficulty, muscleGroup, equipment
// @route   GET /api/exercises - Retrieve exercises from the database with optional filtering based on query parameters
// @access  Public - No authentication required

export const getExercises = async (req, res) => {
    try {
        const {difficulty, muscleGroup, equipment} = req.query; // Extract query parameters for filtering

        const filter = {}; // Initialize an empty filter object
        if (difficulty) filter.difficulty = difficulty.toLowerCase(); // Add difficulty filter if provided
        if (muscleGroup) filter.muscleGroup = muscleGroup.toLowerCase(); // Add muscleGroup filter if provided
        if (equipment) filter.equipment = equipment.toLowerCase(); // Add equipment filter if provided
        
        const exercises = await Exercise.find(filter).sort({ createdAt: -1 }); // Query the database with the constructed filter & sort by creation date descending

        res.status(200).json({
            success: true,
            count: exercises.length,
            data: exercises
        }
        );
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to retrieve exercises',
            error: error.message
        });
    }
};

// @desc    Get single exercise by ID - Retrieve a specific exercise from the database using its unique identifier
// @route   GET /api/exercises/:id - Retrieve a specific exercise by its ID
// @access  Public - No authentication required

export const getExerciseById = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id); // Find exercise by ID from request parameters

        if(!exercise) {
            return res.status(404).json({
                success: false,
                message: 'Exercise not found'
            });
        }

        res.status(200).json({
            success: true,
            data: exercise
        });
    } catch (eror) {
        if (error.kind === 'ObjectId') { // Check if the error is due to an invalid ObjectId format
            return res.status(404).json({
                success: false,
                message: 'Exercise not found'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to retrieve exercise',
            error: error.message
        });
    }
}

// @desc    Create new exercise
// @route   POST /api/exercises - Create a new exercise in the database
// @access  Public (later can be changed to Private with authentication)

export const createExercise = async (req, res) => {
    try {
        const exercise = await Exercise.create(req.body); // Create a new exercise document using the request body

        res.status(201).json({
            success: true,
            data: exercise
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message); // Extract validation error messages
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: messages
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to create exercise',
            error: error.message
        });

    }
}


// @desc   Update exercise by ID
// @route   PUT /api/exercises/:id - Update an existing exercise by its ID
// @access  Public (later can be changed to Private with authentication)

export const updateExercise = async (req, res) => {
    try {
        
        const exercise = await Exercise.findByIdAndUpdate(
            req.params.id,
            req.body,
            { 
                new: true,           // return the modified document rather than the original
                runValidators: true  // run validation on the updated data
            }
        );

    
        if (!exercise) {
            return res.status(404).json({
                success: false,
                message: 'Exercise not found'
            });
        }

        res.status(200).json({
            success: true,
            data: exercise
        });

    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Exercise not found'
            });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: messages
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc  Delete exercise by ID
// @route   DELETE /api/exercises/:id - Delete an existing exercise by its ID
// @access  Public (later can be changed to Private with authentication)

export const deleteExercise = async (req, res) => {
    try {
        const exercise = await Exercise.findByIdAndDelete(req.params.id);

        if (!exercise) {
            return res.status(404).json({
                success: false,
                message: 'Exercise not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Exercise deleted successfully'
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Exercise not found'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};