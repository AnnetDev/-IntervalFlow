export default function TimerIcon() {
    return (
        <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient
                    id="timerGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="#ae57ba" stopOpacity="1" />
                    <stop offset="50%" stopColor="#5f69e1" stopOpacity="1" />
                    <stop offset="100%" stopColor="#3cb9af" stopOpacity="1" />
                </linearGradient>

                <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Timer icon from Lucide */}
            <g
                transform="translate(43, 33) scale(4.75)"
                stroke="url(#timerGradient)"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            >
                <line x1="10" x2="14" y1="2" y2="2" />
                <line x1="12" x2="15" y1="14" y2="11" />
                <circle cx="12" cy="14" r="8" />
            </g>

            {/* Circular arrow around */}
            <path
                d="M 110 33 A 68 68 0 1 1 90 33"
                stroke="url(#timerGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
            />
            <path
                d="M 90 33 L 79 42 M 90 33 L 77 28"
                stroke="url(#timerGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#glow)"
            />
        </svg>
    );
}
