import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorDot = useRef(null)
  const cursorRing = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Check touch device or reduced motion
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsTouchDevice(true)
      return
    }

    const dot = cursorDot.current
    const ring = cursorRing.current
    if (!dot || !ring) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.08,
        ease: 'power2.out',
      })
      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.22,
        ease: 'power2.out',
      })
    }

    const onMouseDown = () => setIsClicking(true)
    const onMouseUp = () => setIsClicking(false)

    // Interactive elements detector
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, .domain-card, .mc-card, .voxel-card, .btn-arcade, .accordion-item, .sponsor-slot')
      if (target) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  if (isTouchDevice) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Center Pixel Dot */}
      <div
        ref={cursorDot}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-[1px] bg-[#2ED3E8] shadow-[0_0_8px_#2ED3E8] transition-transform duration-100 ease-out"
        style={{
          transform: isClicking ? 'translate(-50%, -50%) scale(0.6)' : 'translate(-50%, -50%) scale(1)',
          background: isHovered ? '#FF2E9A' : '#2ED3E8',
          boxShadow: isHovered ? '0 0 10px #FF2E9A' : '0 0 8px #2ED3E8',
        }}
      />

      {/* Trailing Aura Ring */}
      <div
        ref={cursorRing}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2ED3E8]/50 transition-all duration-200 ease-out pointer-events-none"
        style={{
          width: isHovered ? '48px' : isClicking ? '20px' : '32px',
          height: isHovered ? '48px' : isClicking ? '20px' : '32px',
          borderColor: isHovered ? '#FF2E9A' : 'rgba(46, 211, 232, 0.4)',
          backgroundColor: isHovered ? 'rgba(255, 46, 154, 0.08)' : 'transparent',
          boxShadow: isHovered ? '0 0 20px rgba(255, 46, 154, 0.3)' : 'none',
        }}
      />
    </div>
  )
}
