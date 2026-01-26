const exercises = [
    // Cardio exercises
    {
        name: "Jumping Jacks",
        description:
            "Stand with feet together, jump while spreading legs and raising arms overhead, then return to starting position",
        difficulty: "beginner",
        muscleGroup: "cardio",
        duration: 30,
        equipment: "none",
    },
    {
        name: "High Knees",
        description:
            "Run in place while lifting knees as high as possible towards chest",
        difficulty: "beginner",
        muscleGroup: "cardio",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Burpees",
        description:
            "From standing, drop to plank, do a push-up, jump feet to hands, then jump up with arms overhead",
        difficulty: "advanced",
        muscleGroup: "full-body",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Mountain Climbers",
        description:
            "In plank position, alternate bringing knees toward chest in a running motion",
        difficulty: "intermediate",
        muscleGroup: "full-body",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Jump Rope",
        description: "Jump continuously while rotating rope under feet",
        difficulty: "beginner",
        muscleGroup: "cardio",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Skaters",
        description:
            "Jump side to side landing on one leg, swinging the other leg behind for balance",
        difficulty: "intermediate",
        muscleGroup: "cardio",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Butt Kicks",
        description:
            "Jog in place while kicking heels up toward glutes as quickly as possible",
        difficulty: "beginner",
        muscleGroup: "cardio",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Fast Feet",
        description:
            "Run in place with quick, short steps while staying light on your feet",
        difficulty: "intermediate",
        muscleGroup: "cardio",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Step Jacks (Low Impact)",
        description:
            "Step one leg out to the side while raising arms overhead, then step back; alternate sides",
        difficulty: "beginner",
        muscleGroup: "cardio",
        duration: 30,
        equipment: "none",
    },
    {
        name: "March in Place (Low Impact)",
        description:
            "March in place lifting knees moderately and swinging arms with control",
        difficulty: "beginner",
        muscleGroup: "cardio",
        duration: 30,
        equipment: "none",
    },

    // Legs exercises
    {
        name: "Squats",
        description:
            "Stand with feet shoulder-width apart, lower body by bending knees until thighs are parallel to floor",
        difficulty: "beginner",
        muscleGroup: "legs",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Lunges",
        description:
            "Step forward with one leg, lower hips until both knees are bent at 90 degrees, alternate legs",
        difficulty: "beginner",
        muscleGroup: "legs",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Jump Squats",
        description: "Perform a squat, then explosively jump up, land softly and repeat",
        difficulty: "intermediate",
        muscleGroup: "legs",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Wall Sit",
        description: "Lean against wall with knees bent at 90 degrees, hold position",
        difficulty: "beginner",
        muscleGroup: "legs",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Bulgarian Split Squat",
        description:
            "Rear foot elevated on bench, lower into lunge position on front leg",
        difficulty: "advanced",
        muscleGroup: "legs",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Reverse Lunges",
        description:
            "Step one leg back into a lunge, keep chest tall; alternate legs",
        difficulty: "beginner",
        muscleGroup: "legs",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Side Lunges",
        description:
            "Step wide to one side, sit hips back while keeping other leg straight; alternate sides",
        difficulty: "intermediate",
        muscleGroup: "legs",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Calf Raises",
        description:
            "Stand tall and lift heels to rise on toes, lower slowly with control",
        difficulty: "beginner",
        muscleGroup: "legs",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Glute Bridge",
        description:
            "Lie on back with knees bent, lift hips by squeezing glutes, lower with control",
        difficulty: "beginner",
        muscleGroup: "glutes",
        duration: 30,
        equipment: "mat",
    },
    {
        name: "Single-Leg Glute Bridge",
        description:
            "Glute bridge with one leg extended; lift hips using the planted leg, switch sides halfway if needed",
        difficulty: "intermediate",
        muscleGroup: "glutes",
        duration: 30,
        equipment: "mat",
    },
    {
        name: "Sumo Squats",
        description:
            "Take a wide stance with toes turned out, squat down keeping knees tracking over toes",
        difficulty: "intermediate",
        muscleGroup: "glutes",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Step-Ups",
        description:
            "Step onto a stable chair/bench with one foot, drive through heel to stand, step down; alternate legs",
        difficulty: "intermediate",
        muscleGroup: "legs",
        duration: 30,
        equipment: "chair",
    },

    // Core exercises
    {
        name: "Plank",
        description:
            "Hold body in straight line from head to heels, supported on forearms and toes",
        difficulty: "beginner",
        muscleGroup: "core",
        duration: 30,
        equipment: "mat",
    },
    {
        name: "Bicycle Crunches",
        description:
            "Lying on back, alternate bringing opposite elbow to knee in a pedaling motion",
        difficulty: "intermediate",
        muscleGroup: "core",
        duration: 30,
        equipment: "mat",
    },
    {
        name: "Russian Twists",
        description:
            "Sit with knees bent, lean back slightly, rotate torso side to side",
        difficulty: "intermediate",
        muscleGroup: "core",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Leg Raises",
        description:
            "Lying on back, lift straight legs up to 90 degrees, lower slowly without touching floor",
        difficulty: "intermediate",
        muscleGroup: "core",
        duration: 30,
        equipment: "mat",
    },
    {
        name: "Dead Bug",
        description:
            "On back, extend opposite arm and leg while keeping lower back pressed to floor, alternate",
        difficulty: "beginner",
        muscleGroup: "core",
        duration: 30,
        equipment: "mat",
    },
    {
        name: "Side Plank",
        description:
            "Support body on one forearm and the side of one foot, keep body in a straight line",
        difficulty: "intermediate",
        muscleGroup: "core",
        duration: 30,
        equipment: "mat",
    },
    {
        name: "Plank Shoulder Taps",
        description:
            "In high plank, tap opposite shoulder with hand while keeping hips stable",
        difficulty: "intermediate",
        muscleGroup: "core",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Hollow Hold",
        description:
            "Lie on back, lift shoulders and legs off the floor, keep lower back pressed down",
        difficulty: "advanced",
        muscleGroup: "core",
        duration: 30,
        equipment: "mat",
    },
    {
        name: "Flutter Kicks",
        description:
            "Lie on back, keep legs straight and alternate small kicks while core stays engaged",
        difficulty: "intermediate",
        muscleGroup: "core",
        duration: 30,
        equipment: "mat",
    },
    {
        name: "Toe Touches",
        description:
            "Lie on back with legs up, reach hands toward toes by lifting shoulders off the mat",
        difficulty: "beginner",
        muscleGroup: "core",
        duration: 30,
        equipment: "mat",
    },

    // Upper body exercises
    {
        name: "Push-ups",
        description:
            "In plank position, lower body until chest nearly touches floor, push back up",
        difficulty: "intermediate",
        muscleGroup: "upper-body",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Tricep Dips",
        description:
            "Using chair or bench, lower body by bending elbows, push back up",
        difficulty: "intermediate",
        muscleGroup: "upper-body",
        duration: 30,
        equipment: "chair",
    },
    {
        name: "Pike Push-ups",
        description:
            "In downward dog position, bend elbows to lower head toward floor, push back up",
        difficulty: "advanced",
        muscleGroup: "upper-body",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Arm Circles",
        description:
            "Extend arms to sides, make small circles forward then backward",
        difficulty: "beginner",
        muscleGroup: "upper-body",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Diamond Push-ups",
        description:
            "Push-ups with hands close together forming diamond shape under chest",
        difficulty: "advanced",
        muscleGroup: "upper-body",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Incline Push-ups",
        description:
            "Push-ups with hands on a stable elevated surface to reduce difficulty",
        difficulty: "beginner",
        muscleGroup: "upper-body",
        duration: 30,
        equipment: "chair",
    },
    {
        name: "Wide Push-ups",
        description:
            "Push-ups with hands wider than shoulder-width to emphasize chest",
        difficulty: "intermediate",
        muscleGroup: "upper-body",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Plank Up-Downs",
        description:
            "Move from forearm plank to high plank and back, alternating leading arm",
        difficulty: "intermediate",
        muscleGroup: "upper-body",
        duration: 30,
        equipment: "mat",
    },
    {
        name: "Superman Pull",
        description:
            "Lie face down, lift chest and legs, then pull elbows down toward ribs as if doing a lat pull",
        difficulty: "intermediate",
        muscleGroup: "back",
        duration: 30,
        equipment: "mat",
    },
    {
        name: "Y-T-W Raises",
        description:
            "Lie face down and lift arms into Y, then T, then W positions to work upper back and shoulders",
        difficulty: "beginner",
        muscleGroup: "back",
        duration: 30,
        equipment: "mat",
    },

    // Full body exercises
    {
        name: "Inchworms",
        description:
            "Bend forward, walk hands out to plank, walk feet toward hands, stand up",
        difficulty: "beginner",
        muscleGroup: "full-body",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Bear Crawl",
        description:
            "On hands and feet with knees hovering, crawl forward alternating opposite limbs",
        difficulty: "intermediate",
        muscleGroup: "full-body",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Star Jumps",
        description:
            "Jump up spreading arms and legs into star shape, land softly",
        difficulty: "beginner",
        muscleGroup: "full-body",
        duration: 30,
        equipment: "none",
    },
    {
        name: "Plank to Down Dog",
        description:
            "From plank position, push hips up into downward dog, return to plank",
        difficulty: "intermediate",
        muscleGroup: "full-body",
        duration: 30,
        equipment: "mat",
    },
    {
        name: "Turkish Get-up",
        description:
            "From lying position, stand up while keeping one arm extended overhead",
        difficulty: "advanced",
        muscleGroup: "full-body",
        duration: 30,
        equipment: "dumbbells",
    },
    {
        name: "Thrusters",
        description:
            "Squat down then stand up and press weights overhead in one continuous movement",
        difficulty: "advanced",
        muscleGroup: "full-body",
        duration: 30,
        equipment: "dumbbells",
    },
    {
        name: "Kettlebell Swings",
        description:
            "Hinge at hips and swing weight to chest height using hip drive, not arms",
        difficulty: "intermediate",
        muscleGroup: "full-body",
        duration: 30,
        equipment: "kettlebell",
    },
    {
        name: "Dumbbell Rows",
        description:
            "Hinge forward with flat back and pull weights toward hips, squeeze shoulder blades",
        difficulty: "intermediate",
        muscleGroup: "back",
        duration: 30,
        equipment: "dumbbells",
    },
    {
        name: "Renegade Rows",
        description:
            "In plank holding dumbbells, row one arm at a time while keeping hips stable",
        difficulty: "advanced",
        muscleGroup: "full-body",
        duration: 30,
        equipment: "dumbbells",
    },
    {
        name: "Alternating Reverse Lunge + Knee Drive",
        description:
            "Step back into reverse lunge, then drive knee forward/up as you stand; alternate sides",
        difficulty: "intermediate",
        muscleGroup: "full-body",
        duration: 30,
        equipment: "none",
    },

    // Mobility / Low impact / Balance (optional categories but using muscleGroup strings)
    {
        name: "Hip Hinge Good Mornings",
        description:
            "Hands on hips, hinge forward with a flat back, then return to standing",
        difficulty: "beginner",
        muscleGroup: "mobility",
        duration: 30,
        equipment: "none",
    },
    {
        name: "World’s Greatest Stretch",
        description:
            "From lunge position, rotate torso toward front leg, then switch sides",
        difficulty: "beginner",
        muscleGroup: "mobility",
        duration: 30,
        equipment: "mat",
    },
    {
        name: "Cat-Cow",
        description:
            "On hands and knees, alternate arching and rounding spine slowly",
        difficulty: "beginner",
        muscleGroup: "mobility",
        duration: 30,
        equipment: "mat",
    },
    {
        name: "Bird Dog",
        description:
            "On hands and knees, extend opposite arm and leg, keep core stable, alternate",
        difficulty: "beginner",
        muscleGroup: "core",
        duration: 30,
        equipment: "mat",
    },
    {
        name: "Single-Leg Balance Reach",
        description:
            "Balance on one leg and reach forward/side/back with the other foot, switch sides",
        difficulty: "intermediate",
        muscleGroup: "balance",
        duration: 30,
        equipment: "none",
    },
];

export default exercises;
