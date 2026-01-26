import express from 'express';

import {
    getExercises,
    getExerciseById,
    createExercise,
} from '../controllers/exerciseController.js';

const router = express.Router(); // Create a new router instance

// router - it is a mini express application. It doesn't bring in views or settings, 
// but provides us with routing APIs like .use, .get, .param, and route.

// GET /api/exercises - get a list of all exercises
// POST /api/exercises - create a new exercise

router.route('/')
    .get(getExercises)
    .post(createExercise); // Define routes for getting all exercises and creating a new exercise

// router.route('/') is a way to chain multiple HTTP methods for the same route path ('/').    

router.route('/:id')
    .get(getExerciseById); // Define route for getting a single exercise by ID

export default router; // Export the router to be used in other parts of the application