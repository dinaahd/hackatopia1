import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Users, Trophy, Clock } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Count-up hook
function useCountUp(target, triggered, delay = 0) {
  const ref = useRef(null)
  useEffect(() => {
    if (!triggered || !ref.current) return
    const obj = { val: 0 }
    gsap.to(obj, {
      val: target,
      duration: 2.2,
      ease: 'power3.out',
      delay,
      onUpdate: () => {
        if (ref.current) {
          const cur = Math.floor(obj.val)
          ref.current.textContent = target >= 10000
            ? cur.toLocaleString('en-IN')
            : cur.toString()
        }
      },
    })
  }, [triggered, target, delay])
  return ref
}

// 3D card tilt
function handleTilt(el, e) {
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  gsap.to(el, {
    rotateY: x * 12,
    rotateX: -y * 12,
    transformPerspective: 900,
    duration: 0.25,
    ease: 'power2.out',
  })
}

function handleResetTilt(el) {
  gsap.to(el, {
    rotateY: 0,
    rotateX: 0,
    duration: 0.5,
    ease: 'elastic.out(1, 0.8)',
  })
}

export default function About() {
  const [triggered, setTriggered] = useState(false)
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const bodyRef = useRef(null)
  const statsRef = useRef(null)

  // Stat numbers refs
  const partCountRef = useCountUp(500, triggered, 0)
  const prizeCountRef = useCountUp(75000, triggered, 0.15)
  const durationCountRef = useCountUp(24, triggered, 0.3)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          once: true,
          onEnter: () => setTriggered(true),
        },
      })

      if (prefersReducedMotion) {
        gsap.set([eyebrowRef.current, headlineRef.current, bodyRef.current, statsRef.current], {
          opacity: 1,
          y: 0,
        })
        return
      }

      // Eyebrow
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )

      // Split words in headline
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.split-word')
        tl.fromTo(
          words,
          { opacity: 0, y: 25, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.65,
            stagger: 0.08,
            ease: 'back.out(1.4)',
          },
          '-=0.2'
        )
      }

      // Narrative body
      tl.fromTo(
        bodyRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )

      // Stat cards rise & glow-pulse on arrival
      if (statsRef.current) {
        const cards = statsRef.current.querySelectorAll('.stat-voxel-card')
        tl.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'back.out(1.5)',
          },
          '-=0.3'
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 lg:px-12 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a14 0%, #0c0824 50%, #0a0a14 100%)',
      }}
    >
      {/* Background Animated Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(46, 211, 232, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(46, 211, 232, 0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Ambient Glow Orbs in Blue & Pink */}
      <div
        className="absolute top-1/4 -left-20 w-96 h-96 rounded-full opacity-15 pointer-events-none blur-[100px]"
        style={{ background: 'radial-gradient(circle, #2ED3E8 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full opacity-15 pointer-events-none blur-[100px]"
        style={{ background: 'radial-gradient(circle, #FF2E9A 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col gap-14 sm:gap-20">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-5">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="opacity-0">
            <span className="font-pixel text-[0.65rem] sm:text-xs tracking-[0.25em] text-[#2ED3E8] uppercase px-3 py-1.5 rounded-sm bg-[#2ED3E8]/10 border border-[#2ED3E8]/30 shadow-[0_0_12px_rgba(46,211,232,0.2)]">
              // THE WORLD
            </span>
          </div>

          {/* Headline (Split-word animation target) */}
          <h2
            ref={headlineRef}
            className="font-pixel text-2xl sm:text-4xl lg:text-5xl leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
          >
            <span className="split-word inline-block mr-3">One</span>
            <span className="split-word inline-block mr-3 bg-gradient-to-r from-[#2ED3E8] to-[#FF2E9A] bg-clip-text text-transparent">World.</span>
            <span className="split-word inline-block mr-3">24</span>
            <span className="split-word inline-block mr-3 text-[#FF2E9A]">Hours.</span>
            <span className="split-word inline-block mr-3">Infinite</span>
            <span className="split-word inline-block text-[#2ED3E8]">Builds.</span>
          </h2>

          {/* Body */}
          <p
            ref={bodyRef}
            className="opacity-0 text-white/75 text-sm sm:text-base lg:text-lg leading-relaxed font-medium max-w-2xl mx-auto"
          >
            Hackatopia brings together 500+ builders for a 24-hour sprint. Teams of 2–4 compete across 4 domains with a ₹75,000 total prize pool. No shortcuts — just raw creativity, collaboration, and code.
          </p>
        </div>

        {/* ── 3 Glass/Voxel Stat Cards Strip (Strict Blue & Pink Palette) ── */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full"
        >
          {/* Stat 1: Participants (Blue) */}
          <div
            className="stat-voxel-card voxel-panel group p-7 sm:p-8 flex flex-col justify-between cursor-default"
            style={{
              '--accent': '#2ED3E8',
              transformStyle: 'preserve-3d',
            }}
            onMouseMove={(e) => handleTilt(e.currentTarget, e)}
            onMouseLeave={(e) => handleResetTilt(e.currentTarget)}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-pixel text-[0.6rem] tracking-widest text-[#2ED3E8] uppercase flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  PARTICIPANTS
                </span>
                <span className="w-2.5 h-2.5 rounded-[1px] bg-[#2ED3E8] shadow-[0_0_8px_#2ED3E8]" />
              </div>
              <div className="flex items-baseline gap-1">
                <span
                  ref={partCountRef}
                  className="font-black text-5xl sm:text-6xl text-white tracking-tight leading-none"
                  style={{ textShadow: '0 0 25px rgba(46,211,232,0.6)' }}
                >
                  0
                </span>
                <span className="text-3xl font-black text-[#2ED3E8]">+</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-white/60 font-medium leading-relaxed pt-5 border-t border-white/10 mt-6">
              Builders, designers & engineers competing over 24 continuous hours.
            </p>
          </div>

          {/* Stat 2: Total Prize Pool (Pink Featured) */}
          <div
            className="stat-voxel-card voxel-panel voxel-panel-pink group p-7 sm:p-8 flex flex-col justify-between cursor-default relative"
            style={{
              '--accent': '#FF2E9A',
              transformStyle: 'preserve-3d',
            }}
            onMouseMove={(e) => handleTilt(e.currentTarget, e)}
            onMouseLeave={(e) => handleResetTilt(e.currentTarget)}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-pixel text-[0.6rem] tracking-widest text-[#FF2E9A] uppercase flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" />
                  TOTAL PRIZE POOL
                </span>
                <span className="w-2.5 h-2.5 rounded-[1px] bg-[#FF2E9A] shadow-[0_0_10px_#FF2E9A]" />
              </div>
              <div className="flex items-start gap-1">
                <span className="text-2xl sm:text-3xl font-black text-[#FF2E9A] mt-2">₹</span>
                <span
                  ref={prizeCountRef}
                  className="font-black text-5xl sm:text-6xl text-white tracking-tight leading-none"
                  style={{ textShadow: '0 0 30px rgba(255,46,154,0.75)' }}
                >
                  0
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-white/65 font-medium leading-relaxed pt-5 border-t border-[#FF2E9A]/30 mt-6">
              Cash prizes across all tracks, special bounties & internship opportunities.
            </p>
          </div>

          {/* Stat 3: Duration (Blue) */}
          <div
            className="stat-voxel-card voxel-panel group p-7 sm:p-8 flex flex-col justify-between cursor-default"
            style={{
              '--accent': '#2ED3E8',
              transformStyle: 'preserve-3d',
            }}
            onMouseMove={(e) => handleTilt(e.currentTarget, e)}
            onMouseLeave={(e) => handleResetTilt(e.currentTarget)}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-pixel text-[0.6rem] tracking-widest text-[#2ED3E8] uppercase flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  DURATION
                </span>
                <span className="w-2.5 h-2.5 rounded-[1px] bg-[#2ED3E8] shadow-[0_0_8px_#2ED3E8]" />
              </div>
              <div className="flex items-baseline gap-1">
                <span
                  ref={durationCountRef}
                  className="font-black text-5xl sm:text-6xl text-white tracking-tight leading-none"
                  style={{ textShadow: '0 0 25px rgba(46,211,232,0.6)' }}
                >
                  0
                </span>
                <span className="text-3xl font-black text-[#2ED3E8]">H</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-white/60 font-medium leading-relaxed pt-5 border-t border-white/10 mt-6">
              Non-stop sprint — code, pitch & innovate without pause.
            </p>
          </div>
        </div>
      </div>

      {/* Voxel Panel Styles */}
      <style>{`
        .voxel-panel {
          position: relative;
          background: linear-gradient(165deg, rgba(14, 14, 28, 0.85) 0%, rgba(8, 8, 18, 0.95) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 2.5px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          box-shadow:
            0 8px 0 rgba(0, 0, 0, 0.85),
            0 16px 32px rgba(0, 0, 0, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .voxel-panel:hover {
          border-color: var(--accent);
          box-shadow:
            0 12px 0 rgba(0, 0, 0, 0.85),
            0 24px 44px rgba(0, 0, 0, 0.7),
            0 0 35px color-mix(in srgb, var(--accent) 30%, transparent),
            inset 0 2px 0 rgba(255, 255, 255, 0.2);
          transform: translateY(-6px);
        }

        .voxel-panel-pink {
          background: linear-gradient(165deg, rgba(28, 10, 22, 0.85) 0%, rgba(14, 4, 10, 0.95) 100%);
          border-color: rgba(255, 46, 154, 0.35);
        }

        .voxel-panel::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--accent);
          opacity: 0.7;
          border-radius: 4px 4px 0 0;
        }
      `}</style>
    </section>
  )
}
