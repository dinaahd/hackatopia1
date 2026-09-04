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

      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center gap-8 px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <span className="font-pixel text-[0.65rem] sm:text-xs tracking-[0.25em] text-[#2ED3E8] uppercase px-3.5 py-1.5 rounded-sm bg-[#2ED3E8]/10 border border-[#2ED3E8]/30 shadow-[0_0_12px_rgba(46,211,232,0.25)]">
            PARTNERS & ALLIES
          </span>
          <h2 className="font-pixel text-2xl sm:text-4xl lg:text-5xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Our Sponsors
          </h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#2ED3E8] to-transparent shadow-[0_0_12px_#2ED3E8]" />
        </div>

        {/* Coming Soon Card */}
        <div
          ref={textRef}
          className="w-full max-w-xl p-8 sm:p-12 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden opacity-0 transition-all duration-300 hover:border-[#2ED3E8]"
          style={{
            background: 'linear-gradient(165deg, rgba(16, 12, 34, 0.9) 0%, rgba(8, 6, 20, 0.97) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1.5px dashed rgba(46, 211, 232, 0.3)',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Ambient Inner Glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(46, 211, 232, 0.12) 0%, transparent 70%)',
            }}
          />

          <p className="font-pixel text-sm sm:text-lg text-white/70 tracking-widest uppercase relative z-10 animate-pulse">
            Sponsors & Partners Coming Soon
          </p>
          <p className="text-white/40 text-xs sm:text-sm font-mono mt-3 relative z-10">
            Exciting prize tracks, bounties, and tech gear to be revealed.
          </p>
        </div>
      </div>
    </section>
  )
}
