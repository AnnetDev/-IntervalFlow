export default function LogoLine() {
    return (
        <svg
            width="178"
            height="42"
            viewBox="-8 80 178 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient
                    id="flowGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop offset="0%" stopColor="#5f69e1" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#3cb9af" stopOpacity="1" />
                    <stop offset="100%" stopColor="#ae57ba" stopOpacity="0.3" />
                </linearGradient>

                <filter id="glowText">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <path
                d="M 5 110 Q 40 90, 90 110 T 160 99"
                stroke="url(#flowGradient)"
                strokeWidth="2.5"
                fill="none"
                filter="url(#glowText)"
            />
        </svg>
    );
}
