import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import domain1Img from '../assets/domain1.png'
import domain2Img from '../assets/domain2.png'
import domain3Img from '../assets/domain3.png'
import domain4Img from '../assets/domain4.png'

gsap.registerPlugin(ScrollTrigger)

const domainItems = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    code: '01',
    category: 'HEALTH TECH',
    img: domain1Img,
    alt: 'Healthcare Track - Hackatopia',
    glowColor: 'rgba(0, 229, 255, 0.9)',
    secGlow: 'rgba(46, 211, 232, 0.5)',
    accent: '#2ED3E8',
    columnOffset: '',
  },
  {
    id: 'blockchain-cyber',
    name: 'Blockchain / Cyber Security',
    code: '02',
    category: 'SECURE CHAIN',
    img: domain2Img,
    alt: 'Blockchain and Cyber Security Track - Hackatopia',
    glowColor: 'rgba(255, 46, 166, 0.9)',
    secGlow: 'rgba(255, 46, 154, 0.5)',
    accent: '#FF2E9A',
    columnOffset: 'md:translate-y-12 lg:translate-y-14',
  },
  {
    id: 'fintech',
    name: 'FinTech',
    code: '03',
    category: 'FINANCIAL SYS',
    img: domain3Img,
    alt: 'FinTech Track - Hackatopia',
    glowColor: 'rgba(0, 229, 255, 0.9)',
    secGlow: 'rgba(46, 211, 232, 0.5)',
    accent: '#2ED3E8',
    columnOffset: '',
  },
  {
    id: 'open-innovations',
    name: 'Open Innovations',
    code: '04',
    category: 'OPEN TRACK',
    img: domain4Img,
    alt: 'Open Innovations Track - Hackatopia',
    glowColor: 'rgba(255, 46, 166, 0.9)',
    secGlow: 'rgba(255, 46, 154, 0.5)',
    accent: '#FF2E9A',
    columnOffset: 'md:translate-y-12 lg:translate-y-14',
  },
]

export default function Domains() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      })

      if (prefersReducedMotion) {
        gsap.set([headerRef.current, gridRef.current], { opacity: 1, y: 0 })
        return
      }

      // Header entrance
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      )

      // Domain cards smooth staggered block-drop entrance
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.domain-card-container')
        tl.fromTo(
          cards,
          {
            opacity: 0,
            y: 45,
            scale: 0.92,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.4)',
          },
          '-=0.3'
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  const handleTilt = (e, container) => {
    const rect = container.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    const img = container.querySelector('.domain-4k-image')
    if (img) {
      gsap.to(img, {
        rotateY: x * 10,
        rotateX: -y * 10,
        transformPerspective: 900,
        duration: 0.25,
        ease: 'power2.out',
      })
    }
  }

  const handleResetTilt = (container) => {
    const img = container.querySelector('.domain-4k-image')
    if (img) {
      gsap.to(img, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.75)',
      })
    }
  }

  return (
    <section
      id="domains"
      ref={sectionRef}
      className="relative py-28 sm:py-36 pb-36 sm:pb-48 px-6 lg:px-12 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a14 0%, #0d0824 50%, #0a0a14 100%)',
      }}
    >
      {/* Background Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(46, 211, 232, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(46, 211, 232, 0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient glow in Blue & Pink */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-15 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2ED3E8 0%, #FF2E9A 60%, transparent 80%)' }}
      />

      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col gap-14 sm:gap-18">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4 opacity-0">
          <span className="font-pixel text-[0.65rem] sm:text-xs tracking-[0.25em] text-[#2ED3E8] uppercase px-3 py-1.5 rounded-sm bg-[#2ED3E8]/10 border border-[#2ED3E8]/30 shadow-[0_0_12px_rgba(46,211,232,0.2)]">
            CHOOSE YOUR BIOME
          </span>

          <h2 className="font-pixel text-2xl sm:text-4xl lg:text-5xl leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            4 Domains. Pick Where You Build.
          </h2>

          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto font-medium leading-relaxed">
            Every track is its own biome — different terrain, different rules, same goal: build something that matters.
          </p>
        </div>

        {/* Dynamic Staggered Formation Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 w-full items-start justify-items-center max-w-5xl mx-auto"
        >
          {domainItems.map((domain) => (
            <div
              key={domain.id}
              className={`domain-card-container relative w-full flex flex-col items-center justify-center ${domain.columnOffset}`}
              onMouseMove={(e) => handleTilt(e, e.currentTarget)}
              onMouseLeave={(e) => handleResetTilt(e.currentTarget)}
            >
              <div
                className="domain-card group relative w-full flex flex-col items-center justify-center p-3 sm:p-5 cursor-pointer select-none"
                style={{
                  '--glow-color': domain.glowColor,
                  '--sec-glow': domain.secGlow,
                  '--accent-color': domain.accent,
                }}
              >
                {/* Subtle back illumination glow */}
                <div
                  className="absolute inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${domain.glowColor} 0%, ${domain.secGlow} 50%, transparent 75%)`,
                  }}
                />

                {/* 4K Domain Image */}
                <div className="relative z-10 w-full flex items-center justify-center">
                  <img
                    src={domain.img}
                    alt={domain.alt}
                    className="domain-4k-image w-full max-w-[460px] h-auto object-contain select-none"
                    draggable={false}
                    loading="eager"
                    decoding="async"
                  />
                </div>

                {/* Holographic Projection Platform Base */}
                <div className="holo-pad-base absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 w-4/5 max-w-[340px] h-10 pointer-events-none z-0">
                  {/* Concentric luminous reflection oval */}
                  <div
                    className="w-full h-full rounded-[100%] opacity-25 group-hover:opacity-90 group-hover:scale-115 transition-all duration-500 blur-[2px]"
                    style={{
                      background: `radial-gradient(ellipse at center, ${domain.glowColor} 0%, ${domain.secGlow} 45%, transparent 75%)`,
                    }}
                  />
                  {/* Cyan / Magenta energy horizon beam */}
                  <div
                    className="absolute inset-x-6 top-1/2 -translate-y-1/2 h-[1.5px] opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${domain.accent}, transparent)`,
                      boxShadow: `0 0 10px ${domain.accent}`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4K Image Rendering & Hover Float Animation Styles */}
      <style>{`
        @keyframes floatDomainCard {
          0%, 100% {
            transform: translateY(0px) scale(1.02);
            filter: drop-shadow(0 0 25px var(--glow-color)) drop-shadow(0 0 60px var(--sec-glow)) drop-shadow(0 15px 35px rgba(0, 0, 0, 0.9));
          }
          50% {
            transform: translateY(-14px) scale(1.045);
            filter: drop-shadow(0 0 45px var(--glow-color)) drop-shadow(0 0 90px var(--sec-glow)) drop-shadow(0 25px 48px rgba(0, 0, 0, 0.95));
          }
        }

        .domain-4k-image {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: high-quality;
          transform: translateY(0) scale(1);
          filter: drop-shadow(0 12px 28px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 16px rgba(0, 229, 255, 0.18));
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
          will-change: transform, filter;
        }

        .domain-card:hover .domain-4k-image {
          animation: floatDomainCard 4.2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}


