export default function RunnerIcon() {
  return (
    <svg width="180" height="191" viewBox="0 0 173 191" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="figureGradient" x1="0" y1="0" x2="173" y2="191" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ae57ba" />
          <stop offset="50%" stopColor="#5f69e1" />
          <stop offset="100%" stopColor="#3cb9af" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path d="M76.5 9H96.83" stroke="url(#figureGradient)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />

      <path d="M86.5 188C132.892 188 170.5 150.392 170.5 104C170.5 57.6081 132.892 20 86.5 20C40.1081 20 2.5 57.6081 2.5 104C2.5 150.392 40.1081 188 86.5 188Z"
        stroke="url(#figureGradient)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
        filter="url(#glow)" />

      <path d="M121.5 64L109.575 79.0784C108.998 79.807 107.996 80.0429 107.156 79.6481L87.7378 70.5288M87.7378 70.5288L74.3322 104.106M87.7378 70.5288H65.8013C65.2274 70.5288 64.6811 70.7754 64.3014 71.2058L50.5 86.851M74.3322 104.106L105.416 95.6433C106.863 95.2493 108.213 96.5293 107.896 97.9953L101.64 126.957M74.3322 104.106L81.0968 132.698C81.2164 133.203 81.1346 133.735 80.8689 134.181L64.8986 161"
        stroke="url(#figureGradient)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />

      <circle cx="92" cy="57.5" r="9" fill="url(#figureGradient)" />
    </svg>
  )
}
