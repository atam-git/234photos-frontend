'use client'

import { useEffect } from 'react'

interface ModalBackdropProps {
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export function ModalBackdrop({ onClose, children, className = '' }: ModalBackdropProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    // Prevent layout shift by compensating for scrollbar width
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [onClose])

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center ${className}`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
      <div onClick={(e) => e.stopPropagation()} className="relative z-10 w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
