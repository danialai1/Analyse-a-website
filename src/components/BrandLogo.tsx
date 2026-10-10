import React from "react";

export default function BrandLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradients for authentic 3D ribbon look */}
        <linearGradient id="blueRibbon" x1="20" y1="50" x2="180" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0B3C5D" />
          <stop offset="50%" stopColor="#1D5E8C" />
          <stop offset="100%" stopColor="#328CC1" />
        </linearGradient>

        <linearGradient id="orangeRibbon" x1="10" y1="120" x2="190" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F57C00" />
          <stop offset="50%" stopColor="#FF9800" />
          <stop offset="100%" stopColor="#FFC107" />
        </linearGradient>

        <linearGradient id="silverRibbon" x1="50" y1="10" x2="170" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9E9E9E" />
          <stop offset="50%" stopColor="#E0E0E0" />
          <stop offset="100%" stopColor="#F5F5F5" />
        </linearGradient>

        <linearGradient id="lightBlueRibbon" x1="30" y1="80" x2="150" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4A90E2" />
          <stop offset="100%" stopColor="#90CAF9" />
        </linearGradient>
      </defs>

      {/* Ribbon 1: Silver Top Swirl */}
      <path 
        d="M 140 30 C 100 15, 60 40, 90 60 C 120 75, 150 50, 130 80 C 110 100, 70 80, 85 50" 
        stroke="url(#silverRibbon)" 
        strokeWidth="12" 
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />

      {/* Ribbon 2: Dark Blue Middle Swirl (Dominant) */}
      <path 
        d="M 60 60 C 80 30, 160 50, 150 100 C 140 140, 80 120, 100 150" 
        stroke="url(#blueRibbon)" 
        strokeWidth="16" 
        strokeLinecap="round"
        fill="none"
      />

      {/* Ribbon 3: Light Blue Inner Swirl */}
      <path 
        d="M 80 80 C 100 65, 140 75, 135 105 C 130 130, 95 115, 110 135" 
        stroke="url(#lightBlueRibbon)" 
        strokeWidth="10" 
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* Ribbon 4: Orange Bottom Swirl (High contrast anchor) */}
      <path 
        d="M 40 110 C 45 150, 110 170, 140 145 C 160 130, 120 120, 100 130" 
        stroke="url(#orangeRibbon)" 
        strokeWidth="14" 
        strokeLinecap="round"
        fill="none"
      />

      {/* Outer subtle sphere wireframe glow for 3D sphere feel */}
      <circle 
        cx="100" 
        cy="100" 
        r="80" 
        stroke="#FFFFFF" 
        strokeWidth="1" 
        strokeDasharray="4 8" 
        opacity="0.15" 
      />
    </svg>
  );
}
