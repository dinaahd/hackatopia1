import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Activity, ShieldCheck, TrendingUp, Lightbulb } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const biomes = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    subtitle: 'DOMAIN 01',
    description: 'Smart health diagnostics, telemetry, accessibility tools, and life-saving tech.',
    icon: Activity,
    color: '#2ED3E8', // Blue
    tag: 'HEALTH_TECH',
  },
  {
    id: 'blockchain-cyber',
    name: 'Blockchain / Cyber Security',
    subtitle: 'DOMAIN 02',
    description: 'Smart contracts, zero-trust architectures, cryptography, and secure decentralised systems.',
    icon: ShieldCheck,
    color: '#FF2E9A', // Pink
    tag: 'SECURE_CHAIN',
  },
  {
    id: 'fintech',
    name: 'FinTech',
    subtitle: 'DOMAIN 03',
    description: 'Modern payments, algorithmic finance, credit solutions, and open banking infrastructure.',
    icon: TrendingUp,
    color: '#2ED3E8', // Blue
    tag: 'FINANCIAL_SYS',
  },
  {
    id: 'open-innovations',
    name: 'Open Innovations',
    subtitle: 'DOMAIN 04',
    description: 'Wildcard inventions, AI/ML breakthroughs, IoT hardware, sustainability, and creative engineering.',
    icon: Lightbulb,
    color: '#FF2E9A', // Pink
    tag: 'OPEN_TRACK',
  },
]

function handleTilt(el, e) {
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  gsap.to(el, {
    rotateY: x * 15,
    rotateX: -y * 15,
    transformPerspective: 900,
    duration: 0.25,
    ease: 'power2.out',
  })
}

function handleResetTilt(el) {
  gsap.to(el, {
    rotateY: 0,
    rotateX: 0,
    duration: 0.6,
    ease: 'elastic.out(1, 0.75)',
  })
}

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

      // Voxel card block-drop motion (fall + settle + bounce)
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.biome-card')
        tl.fromTo(
          cards,
          {
            opacity: 0,
            y: -60,
            scale: 0.88,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'bounce.out',
          },
          '-=0.3'
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="domains"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 lg:px-12 overflow-hidden"
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2ED3E8 0%, #FF2E9A 60%, transparent 80%)' }}
      />

      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col gap-14 sm:gap-16">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4 opacity-0">
          <span className="font-pixel text-[0.65rem] sm:text-xs tracking-[0.25em] text-[#2ED3E8] uppercase px-3 py-1.5 rounded-sm bg-[#2ED3E8]/10 border border-[#2ED3E8]/30 shadow-[0_0_12px_rgba(46,211,232,0.2)]">
            // CHOOSE YOUR BIOME
          </span>

          <h2 className="font-pixel text-2xl sm:text-4xl lg:text-5xl leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            4 Domains. Pick Where You Build.
          </h2>

          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto font-medium leading-relaxed">
            Every track is its own biome — different terrain, different rules, same goal: build something that matters.
          </p>
        </div>

        {/* 2x2 Voxel Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full"
        >
          {biomes.map((biome) => (
            <div
              key={biome.id}
              className="biome-card group relative p-7 sm:p-9 flex flex-col justify-between cursor-default overflow-hidden rounded-md"
              style={{
                '--accent': biome.color,
                background: `linear-gradient(165deg, rgba(14,14,28,0.92) 0%, rgba(8,8,18,0.98) 100%)`,
                border: '2.5px solid rgba(255, 255, 255, 0.1)',
                boxShadow:
                  '0 8px 0 rgba(0,0,0,0.85), 0 16px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
                transformStyle: 'preserve-3d',
              }}
              onMouseMove={(e) => handleTilt(e.currentTarget, e)}
              onMouseLeave={(e) => handleResetTilt(e.currentTarget)}
            >
              {/* Scanlines */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.8) 2px, rgba(255,255,255,0.8) 3px)',
                }}
              />

              {/* Hover Ambient Inner Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, color-mix(in srgb, ${biome.color} 20%, transparent) 0%, transparent 75%)`,
                }}
              />

              {/* Top Voxel Line */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: biome.color, opacity: 0.8 }}
              />

              {/* Card Header Info */}
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className="font-pixel text-[0.55rem] tracking-widest px-2.5 py-1 rounded-[2px]"
                    style={{
                      color: biome.color,
                      background: `${biome.color}15`,
                      border: `1px solid ${biome.color}40`,
                    }}
                  >
                    {biome.subtitle}
                  </span>

                  <div
                    className="p-2.5 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${biome.color}15`,
                      border: `1.5px solid ${biome.color}50`,
                      boxShadow: `0 0 15px ${biome.color}30`,
                    }}
                  >
                    <biome.icon className="w-6 h-6" style={{ color: biome.color }} />
                  </div>
                </div>

                <h3
                  className="font-pixel text-lg sm:text-xl lg:text-2xl text-white group-hover:text-[var(--accent)] transition-colors duration-200"
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
                >
                  {biome.name}
                </h3>

                <p className="text-white/70 text-xs sm:text-sm lg:text-base leading-relaxed font-medium">
                  {biome.description}
                </p>
              </div>

              {/* Card Footer Tag */}
              <div className="relative z-10 pt-5 mt-6 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs text-white/40 tracking-wider">
                  [{biome.tag}]
                </span>
                <span
                  className="font-pixel text-[0.55rem] tracking-widest flex items-center gap-1.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                  style={{ color: biome.color }}
                >
                  SELECT BIOME →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hover & Tilt Behavior Styles */}
      <style>{`
        .biome-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .biome-card:hover {
          border-color: var(--accent) !important;
          box-shadow:
            0 12px 0 rgba(0, 0, 0, 0.85),
            0 24px 44px rgba(0, 0, 0, 0.7),
            0 0 35px color-mix(in srgb, var(--accent) 30%, transparent),
            inset 0 2px 0 rgba(255, 255, 255, 0.2) !important;
          transform: translateY(-6px);
        }
      `}</style>
    </section>
  )
}
