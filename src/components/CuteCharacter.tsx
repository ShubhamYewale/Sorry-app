export function CuteCharacter({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="80" fill="#FBCFE8" />
      <circle cx="70" cy="85" r="10" fill="#4C1D95" />
      <circle cx="130" cy="85" r="10" fill="#4C1D95" />
      <path
        d="M65 115 Q100 145 135 115"
        stroke="#4C1D95"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle cx="55" cy="100" r="12" fill="#F472B6" opacity="0.6" />
      <circle cx="145" cy="100" r="12" fill="#F472B6" opacity="0.6" />
      <path
        d="M40 60 Q60 40 80 60"
        stroke="#8B5CF6"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M120 55 Q140 35 160 55"
        stroke="#8B5CF6"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M100 150 L100 170"
        stroke="#4C1D95"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M80 165 L120 165"
        stroke="#4C1D95"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
