import React from 'react'

interface NairaIconProps {
  className?: string
}

export const NairaIcon: React.FC<NairaIconProps> = ({ className = 'w-4 h-4' }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Naira symbol (₦) */}
      <path d="M6 4v16" />
      <path d="M18 4v16" />
      <path d="M6 4l12 16" />
      <path d="M4 9h16" />
      <path d="M4 15h16" />
    </svg>
  )
}
