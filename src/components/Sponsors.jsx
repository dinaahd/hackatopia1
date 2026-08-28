import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Sponsors() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              once: true,
            },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="sponsors"
      ref={sectionRef}
      className="relative py-28 sm:py-36 w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a14 0%, #0c0824 50%, #0a0a14 100%)',
      }}
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(46, 211, 232, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(46, 211, 232, 0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center gap-6 px-6">
        {/* Section Header */}
        <h2 className="font-pixel text-2xl sm:text-4xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          Our Sponsors
        </h2>
        <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#2ED3E8] to-transparent shadow-[0_0_12px_#2ED3E8]" />

        {/* Coming Soon */}
        <p
          ref={textRef}
          className="opacity-0 font-pixel text-base sm:text-xl text-white/40 tracking-widest uppercase mt-6"
        >
          Coming Soon . . .
        </p>
      </div>
    </section>
  )
}
