import { useEffect, useRef } from 'react'
import { MapPin, Navigation } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MapAddress() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const mapFrameRef = useRef(null)
  const venueCardRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([headerRef.current, mapFrameRef.current, venueCardRef.current], { opacity: 1, y: 0, x: 0 })
        return
      }

      // Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }

      // Map iframe entrance (slide in from left)
      if (mapFrameRef.current) {
        gsap.fromTo(
          mapFrameRef.current,
          { opacity: 0, x: -40, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: mapFrameRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }

      // Venue address card entrance (slide in from right)
      if (venueCardRef.current) {
        gsap.fromTo(
          venueCardRef.current,
          { opacity: 0, x: 40, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: venueCardRef.current,
              start: 'top 80%',
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
      id="map"
      ref={sectionRef}
      className="relative py-24 sm:py-28 px-6 lg:px-12 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a14 0%, #0d0620 50%, #0a0a14 100%)',
      }}
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 229, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient Glow */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00e5ff]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col gap-12 sm:gap-14">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center space-y-4 opacity-0">
          <span className="font-pixel text-[0.65rem] sm:text-xs tracking-[0.25em] text-[#00e5ff] uppercase px-3.5 py-1.5 rounded-sm bg-[#00e5ff]/10 border border-[#00e5ff]/30 shadow-[0_0_12px_rgba(0,229,255,0.25)]">
            VENUE & LOCATION
          </span>

          <h2 className="font-pixel text-2xl sm:text-4xl lg:text-5xl leading-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Location & Venue
          </h2>

          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent shadow-[0_0_12px_#00e5ff]" />
        </div>

        {/* 2-Column Grid: Left (Map) & Right (Venue Info) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Clean Map Frame (7 cols) */}
          <div
            ref={mapFrameRef}
            className="lg:col-span-7 rounded-2xl overflow-hidden relative min-h-[360px] sm:min-h-[400px] opacity-0 transition-all duration-300 hover:border-[#00e5ff]"
            style={{
              border: '1.5px solid rgba(0, 229, 255, 0.25)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(0, 229, 255, 0.1)',
            }}
          >
            <iframe
              title="Yenepoya Institute of Technology Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.855286667779!2d74.97553007585798!3d13.044881913265808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4aa7ba88df529%3A0x551812777ca20e10!2sYenepoya%20Institute%20Of%20Technology!5e0!3m2!1sen!2sin!4v1787187135513!5m2!1sen!2sin"
              className="w-full h-full min-h-[360px] sm:min-h-[400px] border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          {/* Clean Venue Address Card (5 cols) */}
          <div
            ref={venueCardRef}
            className="group relative lg:col-span-5 p-8 sm:p-10 rounded-2xl flex flex-col justify-between gap-8 opacity-0 overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
            style={{
              background: 'linear-gradient(165deg, rgba(16, 12, 34, 0.9) 0%, rgba(8, 6, 20, 0.97) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(0, 229, 255, 0.2)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#00e5ff'
              e.currentTarget.style.boxShadow = '0 18px 48px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 229, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.25)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.2)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.12)'
            }}
          >
            {/* Top Accent Line */}
            <div
              className="absolute top-0 left-10 right-10 h-[2px] opacity-80 group-hover:opacity-100 transition-opacity"
              style={{
                background: 'linear-gradient(90deg, transparent, #00e5ff, transparent)',
              }}
            />

            {/* Hover Inner Ambient Glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(0, 229, 255, 0.15) 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-2.5 text-[#00e5ff]">
                <div className="w-8 h-8 rounded-xl bg-[#00e5ff]/15 border border-[#00e5ff]/40 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(0,229,255,0.3)]">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="font-pixel text-xs tracking-wider uppercase font-bold">
                  Official Venue
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-white font-bold text-2xl sm:text-3xl leading-snug group-hover:text-[#00e5ff] transition-colors">
                  Yenepoya Institute of Technology
                </h3>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed font-medium">
                  NH-13, Thodar, Vidyanagar, Moodbidri, Mangaluru, Karnataka — 574225, India
                </p>
              </div>
            </div>

            {/* Clean Single Action CTA */}
            <div className="relative z-10">
              <a
                href="https://maps.google.com/?q=Yenepoya+Institute+Of+Technology+Moodbidri"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-arcade btn-arcade-cyan w-full text-xs py-4 flex items-center justify-center gap-2.5 text-center"
              >
                <Navigation className="w-4 h-4" />
                GET DIRECTIONS
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
