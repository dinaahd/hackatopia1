import React, { useCallback } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ className = '', compact = false }) {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'

  const handleToggle = useCallback((e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    // Direct, atomic state toggle
    toggleTheme()

    // Non-blocking visual particle burst
    try {
      if (typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && e?.currentTarget) {
        const rect = e.currentTarget.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const particleColor = isLight ? '#0284c7' : '#ffb020'
        for (let i = 0; i < 6; i++) {
          const p = document.createElement('div')
          p.style.cssText = `position:fixed;width:5px;height:5px;background:${particleColor};pointer-events:none !important;user-select:none;-webkit-user-select:none;z-index:99999;left:${cx}px;top:${cy}px;border-radius:50%;box-shadow:0 0 8px ${particleColor};`
          document.body.appendChild(p)
          const angle = (Math.PI * 2 * i) / 6
          const dist = 22 + Math.random() * 10
          p.animate(
            [
              { transform: 'translate(0,0) scale(1)', opacity: 1 },
              { transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`, opacity: 0 },
            ],
            { duration: 280, easing: 'ease-out' }
          )
          setTimeout(() => {
            if (p && p.parentNode) p.remove()
          }, 300)
        }
      }
    } catch (err) {
      console.warn('Particle animation error', err)
    }
  }, [toggleTheme, isLight])

  return (
    <button
      onClick={handleToggle}
      className={`theme-toggle-btn group relative flex items-center justify-center gap-2 cursor-pointer select-none transition-all duration-300 pointer-events-auto ${
        compact
          ? 'w-10 h-10 sm:w-11 sm:h-11 rounded-xl p-0'
          : 'px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl'
      } ${className}`}
      title={isLight ? 'Switch to Dark Cyber Mode' : 'Switch to Radiant Light Mode'}
      aria-label={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      type="button"
    >
      {/* Icon Switch with Smooth Rotation */}
      <div className="relative w-5 h-5 flex items-center justify-center pointer-events-none">
        <Sun
          className={`w-5 h-5 text-amber-500 absolute transition-all duration-500 pointer-events-none ${
            isLight
              ? 'opacity-100 rotate-0 scale-100 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]'
              : 'opacity-0 -rotate-90 scale-50'
          }`}
        />
        <Moon
          className={`w-5 h-5 text-cyan-300 absolute transition-all duration-500 pointer-events-none ${
            isLight
              ? 'opacity-0 rotate-90 scale-50'
              : 'opacity-100 rotate-0 scale-100 drop-shadow-[0_0_8px_rgba(0,229,255,0.7)]'
          }`}
        />
      </div>

      {/* Optional Text Label for Header Bar */}
      {!compact && (
        <span className="font-pixel text-[0.6rem] sm:text-[0.65rem] tracking-wider uppercase font-bold hidden xs:inline-block pointer-events-none">
          {isLight ? 'LIGHT' : 'DARK'}
        </span>
      )}
    </button>
  )
}

