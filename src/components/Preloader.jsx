import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const containerRef = useRef(null)
  const cityRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Simulate asset assembly progress
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 8
      if (currentProgress >= 100) {
        currentProgress = 100
        clearInterval(interval)
        setProgress(100)

        setTimeout(() => {
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              opacity: 0,
              scale: 1.04,
              duration: prefersReducedMotion ? 0.3 : 0.7,
              ease: 'power3.inOut',
              onComplete: () => {
                setLoaded(true)
                if (onComplete) onComplete()
              },
            })
          } else {
            setLoaded(true)
            if (onComplete) onComplete()
          }
        }, 300)
      } else {
        setProgress(currentProgress)
      }
    }, 80)

    // Stagger block drop animation in city preview
    if (!prefersReducedMotion && cityRef.current) {
      const blocks = cityRef.current.querySelectorAll('.voxel-drop-block')
      gsap.fromTo(
        blocks,
        {
          opacity: 0,
          y: () => gsap.utils.random(-80, -160),
          x: () => gsap.utils.random(-40, 40),
          scale: 0,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: 'bounce.out',
        }
      )
    }

    return () => clearInterval(interval)
  }, [onComplete])

  if (loaded) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a14] text-white select-none overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(46, 211, 232, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(46, 211, 232, 0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient background glow */}
      <div
        className="absolute w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #2ED3E8 0%, #FF2E9A 60%, transparent 80%)' }}
      />

      {/* Voxel City Assembly Simulation */}
      <div ref={cityRef} className="relative w-48 h-48 mb-8 flex items-center justify-center">
        {/* Isometric 3D Voxel Skyline Composition */}
        <div className="relative w-36 h-36 flex items-end justify-center gap-1.5 pb-4">
          {/* Building 1 */}
          <div className="voxel-drop-block w-6 h-20 bg-gradient-to-t from-[#0d1b2a] to-[#2ED3E8] border border-[#2ED3E8]/60 shadow-[0_0_15px_rgba(46,211,232,0.4)] rounded-t-sm" />
          {/* Building 2 - Main Center Spire */}
          <div className="voxel-drop-block w-8 h-28 bg-gradient-to-t from-[#1b0826] to-[#FF2E9A] border border-[#FF2E9A]/60 shadow-[0_0_20px_rgba(255,46,154,0.5)] rounded-t-sm relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-3 bg-[#FFC94D] shadow-[0_0_10px_#FFC94D]" />
          </div>
          {/* Building 3 */}
          <div className="voxel-drop-block w-6 h-16 bg-gradient-to-t from-[#0a192f] to-[#2ED3E8] border border-[#2ED3E8]/60 shadow-[0_0_15px_rgba(46,211,232,0.4)] rounded-t-sm" />
          {/* Building 4 */}
          <div className="voxel-drop-block w-5 h-24 bg-gradient-to-t from-[#1f0b2e] to-[#FF2E9A] border border-[#FF2E9A]/60 shadow-[0_0_15px_rgba(255,46,154,0.4)] rounded-t-sm" />
        </div>

        {/* Floating island base */}
        <div className="absolute bottom-2 w-44 h-3 bg-[#120824] border-t-2 border-[#2ED3E8] border-b border-[#FF2E9A] shadow-[0_8px_20px_rgba(0,0,0,0.8)]" />
      </div>

      {/* Progress Readout */}
      <div ref={textRef} className="flex flex-col items-center gap-3">
        <p className="font-pixel text-[0.65rem] md:text-xs tracking-[0.25em] text-[#2ED3E8] uppercase drop-shadow-[0_0_10px_rgba(46,211,232,0.8)]">
          INITIALIZING WORLD... {progress}%
        </p>

        {/* Chunky Voxel Progress Bar */}
        <div className="w-56 sm:w-72 h-3 bg-[#120824] border-2 border-black rounded-sm overflow-hidden p-0.5 shadow-[0_4px_0_#000,inset_0_1px_0_rgba(255,255,255,0.1)]">
          <div
            className="h-full bg-gradient-to-r from-[#2ED3E8] via-[#FF2E9A] to-[#FFC94D] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="font-pixel text-[0.45rem] tracking-widest text-white/30 uppercase mt-1">
          HACKATOPIA 2026 • OCTOBER 8-9 2026
        </span>
      </div>
    </div>
  )
}
