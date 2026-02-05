export const openApiSpec = {
    openapi: '3.0.0',
    info: {
        title: 'IntervalFlow API',
        version: '1.0.0',
        description: 'RESTful API for managing Tabata/HIIT interval training workouts',
        contact: {
            name: 'Anna Baidikova',
            email: 'annabaidikova92@gmail.com'
        },
        license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT'
        }
    },
    servers: [
        {
            url: 'http://localhost:3000/api',
            description: 'Development server'
        }
    ],
    tags: [
        {
            name: 'Health',
            description: 'API health check'
        },
        {
            name: 'Authentication',
            description: 'User registration and login'
        },
        {
            name: 'Exercises',
            description: 'Exercise management endpoints'
        }
    ],
    paths: {
        '/health': {
            get: {
                tags: ['Health'],
                summary: 'Check API health',
                description: 'Returns API status and timestamp',
                responses: {
                    '200': {
                        description: 'API is running',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: true },
                                        message: { type: 'string', example: 'IntervalFlow API is running! 🏃‍♂️' },
                                        timestamp: { type: 'string', format: 'date-time' }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/auth/register': {
            post: {
                tags: ['Authentication'],
                summary: 'Register new user',
                description: 'Create a new user account',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['username', 'email', 'password'],
                                properties: {
                                    username: {
                                        type: 'string',
                                        minLength: 3,
                                        maxLength: 30,
                                        example: 'johndoe'
                                    },
                                    email: {
                                        type: 'string',
                                        format: 'email',
                                        example: 'john@example.com'
                                    },
                                    password: {
                                        type: 'string',
                                        minLength: 6,
                                        example: 'securepass123'
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'User created successfully',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/AuthResponse' }
                            }
                        }
                    },
                    '400': {
                        description: 'Validation error or user already exists',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' }
                            }
                        }
                    }
                }
            }
        },
        '/auth/login': {
            post: {
                tags: ['Authentication'],
                summary: 'Login user',
                description: 'Authenticate user and receive JWT token',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['email', 'password'],
                                properties: {
                                    email: {
                                        type: 'string',
                                        format: 'email',
                                        example: 'john@example.com'
                                    },
                                    password: {
                                        type: 'string',
                                        example: 'securepass123'
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Login successful',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/AuthResponse' }
                            }
                        }
                    },
                    '401': {
                        description: 'Invalid credentials',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' }
                            }
                        }
                    }
                }
            }
        },
        '/exercises': {
            get: {
                tags: ['Exercises'],
                summary: 'Get all exercises',
                description: 'Retrieve all exercises with optional filtering',
                parameters: [
                    {
                        name: 'difficulty',
                        in: 'query',
                        schema: {
                            type: 'string',
                            enum: ['beginner', 'intermediate', 'advanced']
                        },
                        description: 'Filter by difficulty level'
                    },
                    {
                        name: 'muscleGroup',
                        in: 'query',
                        schema: {
                            type: 'string',
                            enum: ['cardio', 'legs', 'glutes', 'core', 'upper-body', 'back', 'full-body', 'mobility', 'balance']
                        },
                        description: 'Filter by muscle group'
                    },
                    {
                        name: 'equipment',
                        in: 'query',
                        schema: {
                            type: 'string',
                            enum: ['none', 'dumbbells', 'mat', 'kettlebell', 'chair', 'resistance-band']
                        },
                        description: 'Filter by required equipment'
                    }
                ],
                responses: {
                    '200': {
                        description: 'Exercises retrieved successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: true },
                                        count: { type: 'integer', example: 60 },
                                        data: {
                                            type: 'array',
                                            items: { $ref: '#/components/schemas/Exercise' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Exercises'],
                summary: 'Create exercise',
                description: 'Create a new custom exercise (requires authentication)',
                security: [{ BearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ExerciseInput' }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Exercise created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: true },
                                        data: { $ref: '#/components/schemas/Exercise' }
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Validation error',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' }
                            }
                        }
                    },
                    '401': {
                        description: 'Unauthorized',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' }
                            }
                        }
                    }
                }
            }
        },
        '/exercises/{id}': {
            get: {
                tags: ['Exercises'],
                summary: 'Get exercise by ID',
                description: 'Retrieve a specific exercise',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                        description: 'Exercise ID'
                    }
                ],
                responses: {
                    '200': {
                        description: 'Exercise retrieved successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: true },
                                        data: { $ref: '#/components/schemas/Exercise' }
                                    }
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Exercise not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' }
                            }
                        }
                    }
                }
            },
            put: {
                tags: ['Exercises'],
                summary: 'Update exercise',
                description: 'Update an existing exercise (requires authentication)',
                security: [{ BearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                        description: 'Exercise ID'
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ExerciseInput' }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Exercise updated successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: true },
                                        data: { $ref: '#/components/schemas/Exercise' }
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Validation error',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' }
                            }
                        }
                    },
                    '401': {
                        description: 'Unauthorized',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' }
                            }
                        }
                    },
                    '404': {
                        description: 'Exercise not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ['Exercises'],
                summary: 'Delete exercise',
                description: 'Delete an exercise (requires authentication)',
                security: [{ BearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                        description: 'Exercise ID'
                    }
                ],
                responses: {
                    '200': {
                        description: 'Exercise deleted successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: true },
                                        message: { type: 'string', example: 'Exercise deleted successfully' }
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        description: 'Unauthorized',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' }
                            }
                        }
                    },
                    '404': {
                        description: 'Exercise not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' }
                            }
                        }
                    }
                }
            }
        }
    },
    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Enter your JWT token in the format: Bearer <token>'
            }
        },
        schemas: {
            Exercise: {
                type: 'object',
                properties: {
                    _id: { type: 'string', example: '679a1b2c3d4e5f6g7h8i9j0k' },
                    name: { type: 'string', example: 'Jumping Jacks' },
                    description: {
                        type: 'string',
                        example: 'Stand with feet together, jump while spreading legs and raising arms overhead'
                    },
                    difficulty: {
                        type: 'string',
                        enum: ['beginner', 'intermediate', 'advanced'],
                        example: 'beginner'
                    },
                    muscleGroup: {
                        type: 'string',
                        enum: ['cardio', 'legs', 'glutes', 'core', 'upper-body', 'back', 'full-body', 'mobility', 'balance'],
                        example: 'cardio'
                    },
                    duration: { type: 'integer', example: 30 },
                    equipment: {
                        type: 'string',
                        enum: ['none', 'dumbbells', 'mat', 'kettlebell', 'chair', 'resistance-band'],
                        example: 'none'
                    },
                    createdBy: {
                        type: 'string',
                        nullable: true,
                        example: null
                    },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' }
                }
            },
            ExerciseInput: {
                type: 'object',
                required: ['name', 'description', 'difficulty', 'muscleGroup'],
                properties: {
                    name: { type: 'string', example: 'Push-ups' },
                    description: {
                        type: 'string',
                        example: 'In plank position, lower body until chest nearly touches floor, push back up'
                    },
                    difficulty: {
                        type: 'string',
                        enum: ['beginner', 'intermediate', 'advanced'],
                        example: 'intermediate'
                    },
                    muscleGroup: {
                        type: 'string',
                        enum: ['cardio', 'legs', 'glutes', 'core', 'upper-body', 'back', 'full-body', 'mobility', 'balance'],
                        example: 'upper-body'
                    },
                    duration: { type: 'integer', minimum: 10, maximum: 300, example: 30 },
                    equipment: {
                        type: 'string',
                        enum: ['none', 'dumbbells', 'mat', 'kettlebell', 'chair', 'resistance-band'],
                        example: 'none'
                    }
                }
            },
            AuthResponse: {
                type: 'object',
                properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: '679a1b2c3d4e5f6g7h8i9j0k' },
                            username: { type: 'string', example: 'johndoe' },
                            email: { type: 'string', example: 'john@example.com' },
                            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
                        }
                    }
                }
            },
            Error: {
                type: 'object',
                properties: {
                    success: { type: 'boolean', example: false },
                    message: { type: 'string', example: 'Error message' },
                    errors: {
                        type: 'array',
                        items: { type: 'string' },
                        example: ['Validation error 1', 'Validation error 2']
                    }
                }
            }
        }
    }
};