import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logoText from '../assets/logo_text.png'

gsap.registerPlugin(ScrollTrigger)

// ── Competition Domains ───────────────────────────────────────────────────
const tracks = [
  { name: 'Web3 & Blockchain', color: '#00e5ff', icon: '💎' },
  { name: 'Generative AI',     color: '#c084fc', icon: '🧠' },
  { name: 'FinTech',           color: '#ffd700', icon: '⚡' },
  { name: 'Healthcare Tech',   color: '#00ff88', icon: '🧪' },
]

// ── Count-up Hook ──────────────────────────────────────────────────────────
function useCountUp(target, triggered, delay = 0) {
  const ref = useRef(null)
  useEffect(() => {
    if (!triggered || !ref.current) return
    const obj = { val: 0 }
    gsap.to(obj, {
      val: target,
      duration: 2.4,
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

// ── 3D Tilt on Hover ───────────────────────────────────────────────────────
function tilt(el, e) {
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  gsap.to(el, {
    rotateY: x * 14,
    rotateX: -y * 14,
    transformPerspective: 1000,
    duration: 0.25,
    ease: 'power2.out'
  })
}

function resetTilt(el) {
  gsap.to(el, {
    rotateY: 0,
    rotateX: 0,
    duration: 0.6,
    ease: 'elastic.out(1, 0.75)'
  })
}

/* ═══════════════════════════════════════════════════════════════════════════
   MINECRAFT PIXEL CARD COMPONENT
   — Chunky 3D retro borders, pixel notches, scanlines, hover neon aura
═══════════════════════════════════════════════════════════════════════════ */
function MCCard({ children, accentColor, featured = false, className = '' }) {
  const ref = useRef(null)
  return (
    <div
      ref={ref}
      className={`mc-card group ${featured ? 'mc-card-featured' : ''} ${className}`}
      style={{
        '--accent': accentColor,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={e => tilt(ref.current, e)}
      onMouseLeave={() => resetTilt(ref.current)}
    >
      {/* Corner Pixel Blocks */}
      <span className="mc-corner mc-corner-tl" />
      <span className="mc-corner mc-corner-tr" />
      <span className="mc-corner mc-corner-bl" />
      <span className="mc-corner mc-corner-br" />

      {/* Pixelated scanline overlay */}
      <div className="mc-scanlines" />

      {/* Inner ambient glow on hover */}
      <div className="mc-inner-glow" />

      {/* Content wrapper with depth */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-7 lg:p-8">
        {children}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CARD 1: Participants (Blue / Diamond Ore)
═══════════════════════════════════════════════════════════════════════════ */
function CardParticipants({ triggered }) {
  const numRef = useCountUp(500, triggered, 0)
  return (
    <MCCard accentColor="#00e5ff">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="mc-pixel-icon" style={{ background: '#00e5ff', boxShadow: '0 0 10px #00e5ff' }} />
            <p className="mc-label text-cyan-400">PARTICIPANTS</p>
          </div>
          <span className="mc-badge text-cyan-300 border-cyan-500/40 bg-cyan-950/40">24H SPRINT</span>
        </div>

        <div className="flex items-baseline gap-1 my-3">
          <span
            ref={numRef}
            className="mc-big-number text-white"
            style={{ textShadow: '0 0 28px rgba(0,229,255,0.65), 0 0 60px rgba(0,229,255,0.3)' }}
          >
            0
          </span>
          <span className="text-3xl sm:text-4xl font-black text-cyan-400 mb-1">+</span>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 mt-auto">
        <p className="mc-description text-cyan-100/70">
          Builders, designers & engineers competing to craft the future of tech.
        </p>
        <div className="mc-xp-bar mt-3">
          <div className="mc-xp-fill" style={{ width: '85%', background: '#00e5ff', boxShadow: '0 0 8px #00e5ff' }} />
        </div>
      </div>
    </MCCard>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CARD 2: Total Prize Pool (Gold Block / Featured)
═══════════════════════════════════════════════════════════════════════════ */
function CardPrize({ triggered }) {
  const numRef = useCountUp(100000, triggered, 0.12)
  return (
    <MCCard accentColor="#ffd700" featured>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="mc-pixel-icon" style={{ background: '#ffd700', boxShadow: '0 0 12px #ffd700' }} />
            <p className="mc-label text-yellow-400">PRIZE POOL UP TO</p>
          </div>
          <span className="mc-badge text-yellow-300 border-yellow-500/50 bg-yellow-950/50">💰 BOUNTIES</span>
        </div>

        <div className="flex items-start gap-1 my-2">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-yellow-400 mt-2 sm:mt-3">₹</span>
          <span
            ref={numRef}
            className="mc-big-number mc-big-number-gold text-white"
            style={{ textShadow: '0 0 35px rgba(255,215,0,0.8), 0 0 80px rgba(255,215,0,0.35)' }}
          >
            0
          </span>
        </div>

        <p className="mc-subheading text-yellow-400/90 font-bold tracking-wider uppercase text-xs sm:text-sm">
          IN REWARDS & GRANTS
        </p>
      </div>

      <div className="pt-4 border-t border-yellow-500/20 mt-auto">
        <p className="mc-description text-yellow-100/75">
          Cash prizes across all tracks, grand winner rewards & internship offers.
        </p>
        <div className="mc-xp-bar mt-3">
          <div className="mc-xp-fill" style={{ width: '100%', background: '#ffd700', boxShadow: '0 0 10px #ffd700' }} />
        </div>
      </div>
    </MCCard>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CARD 3: Competition Tracks / Domains (Emerald Ore)
═══════════════════════════════════════════════════════════════════════════ */
function CardTracks() {
  return (
    <MCCard accentColor="#00ff88">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="mc-pixel-icon" style={{ background: '#00ff88', boxShadow: '0 0 10px #00ff88' }} />
            <p className="mc-label text-emerald-400">4 TRACKS</p>
          </div>
          <span className="mc-badge text-emerald-300 border-emerald-500/40 bg-emerald-950/40">DOMAINS</span>
        </div>

        <div className="flex flex-col gap-2.5 my-3">
          {tracks.map((track) => (
            <div
              key={track.name}
              className="flex items-center gap-3 p-2 rounded-sm transition-all duration-200 hover:translate-x-1"
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderLeft: `3px solid ${track.color}`,
              }}
            >
              <span className="text-xs">{track.icon}</span>
              <span className="text-xs sm:text-sm font-semibold text-white/90 tracking-wide">
                {track.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 mt-auto">
        <p className="mc-description text-emerald-100/70">
          Build game-changing solutions in multi-disciplinary innovation tracks.
        </p>
      </div>
    </MCCard>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CARD 4: Venue & Schedule (Amethyst / Purple)
═══════════════════════════════════════════════════════════════════════════ */
function CardVenue() {
  return (
    <MCCard accentColor="#c084fc">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="mc-pixel-icon" style={{ background: '#c084fc', boxShadow: '0 0 10px #c084fc' }} />
            <p className="mc-label text-purple-400">VENUE & TIME</p>
          </div>
          <span className="mc-badge text-purple-300 border-purple-500/40 bg-purple-950/40">ON-SITE</span>
        </div>

        <div className="my-2">
          <p className="text-base sm:text-lg lg:text-xl font-black text-white leading-tight">
            Yenepoya Institute of Technology
          </p>
          <p className="text-xs sm:text-sm font-medium text-purple-200/70 mt-1">
            📍 Moodbidri, Karnataka
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 p-2.5 rounded-sm bg-purple-950/20 border border-purple-500/20">
          <div>
            <p className="mc-micro-label text-purple-300/70">START</p>
            <p className="text-xs sm:text-sm font-black text-white">Oct 8, 2026</p>
            <p className="text-[0.65rem] text-white/50">09:00 AM</p>
          </div>
          <div className="border-l border-purple-500/20 pl-3">
            <p className="mc-micro-label text-purple-300/70">END</p>
            <p className="text-xs sm:text-sm font-black text-white">Oct 9, 2026</p>
            <p className="text-[0.65rem] text-white/50">09:00 AM</p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 mt-auto">
        <p className="mc-description text-purple-100/70">
          Food, accommodation, mentor pods & high-speed network provided.
        </p>
      </div>
    </MCCard>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN SUMMARY COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
export default function Summary() {
  const [triggered, setTriggered] = useState(false)
  const sectionRef  = useRef(null)
  const logoRef     = useRef(null)
  const subtitleRef = useRef(null)
  const cardsRef    = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
          onEnter: () => setTriggered(true),
        },
        defaults: { ease: 'power3.out' },
      })

      // Big Logo Entrance
      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: -30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      )

      // Subtitle Tagline Entrance
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      )

      // Cards staggered pop-in
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.mc-card')
        tl.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.88, rotationX: 8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
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
      id="summary"
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-[90vh] lg:min-h-screen px-4 sm:px-8 lg:px-12 py-16 sm:py-24 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #120630 0%, #080220 60%, #040112 100%)',
      }}
    >
      {/* Immersive Ambient Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.12]"
          style={{
            background: 'radial-gradient(circle, #00e5ff 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.10]"
          style={{
            background: 'radial-gradient(circle, #ff2ea6 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-[0.08]"
          style={{
            background: 'radial-gradient(circle, #ffd700 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Grid background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 229, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col items-center gap-8 sm:gap-12">

        {/* ── BIG HERO LOGO ── */}
        <div ref={logoRef} className="text-center opacity-0 flex flex-col items-center w-full">
          <img
            src={logoText}
            alt="HACKATOPIA"
            className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl object-contain pointer-events-none select-none"
            style={{
              filter:
                'drop-shadow(0 0 35px rgba(0,229,255,0.6)) drop-shadow(0 0 70px rgba(255,46,166,0.35)) drop-shadow(0 10px 20px rgba(0,0,0,0.8))',
            }}
            draggable={false}
          />
        </div>

        {/* ── SUBTITLE TAGLINE ── */}
        <div ref={subtitleRef} className="opacity-0 flex items-center gap-3 sm:gap-4 flex-wrap justify-center text-center">
          <span className="h-0.5 w-6 sm:w-12 bg-gradient-to-r from-transparent to-cyan-400" />
          <p className="font-pixel text-[0.55rem] sm:text-xs tracking-[0.25em] text-white/60 uppercase">
            24 Hours · Moodbidri, Karnataka · October 8–9, 2026
          </p>
          <span className="h-0.5 w-6 sm:w-12 bg-gradient-to-l from-transparent to-pink-400" />
        </div>

        {/* ── 3 LARGE CARDS IN A SINGLE ROW WITH HEALTHY GAPS ── */}
        <div ref={cardsRef} className="w-full mc-cards-grid">
          <CardPrize triggered={triggered} />
          <CardTracks />
          <CardVenue />
        </div>

      </div>

      {/* ── STYLES FOR MINECRAFT CARD SYSTEM ── */}
      <style>{`
        /* ── 4 Card Grid Layout ── */
        .mc-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          width: 100%;
        }

        /* ── Minecraft Card Base ── */
        .mc-card {
          position: relative;
          overflow: hidden;
          min-height: 320px;
          cursor: default;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;

          /* Pixelated chunky 3D borders */
          background: linear-gradient(165deg, rgba(16, 7, 38, 0.95) 0%, rgba(8, 3, 20, 0.98) 100%);
          border: 3px solid rgba(255, 255, 255, 0.12);
          border-radius: 6px;
          box-shadow:
            0 8px 0 rgba(0, 0, 0, 0.85),
            0 16px 32px rgba(0, 0, 0, 0.65),
            inset 0 2px 0 rgba(255, 255, 255, 0.1);
        }

        .mc-card:hover {
          border-color: var(--accent, rgba(255, 255, 255, 0.3));
          box-shadow:
            0 12px 0 rgba(0, 0, 0, 0.85),
            0 24px 44px rgba(0, 0, 0, 0.75),
            0 0 35px color-mix(in srgb, var(--accent) 35%, transparent),
            inset 0 2px 0 rgba(255, 255, 255, 0.2);
          transform: translateY(-6px);
        }

        /* Featured Gold Card */
        .mc-card-featured {
          background: linear-gradient(165deg, rgba(28, 18, 2, 0.95) 0%, rgba(14, 8, 0, 0.98) 100%);
          border-color: rgba(255, 215, 0, 0.35);
        }

        /* Pixel Notches / Corner Accents */
        .mc-corner {
          position: absolute;
          width: 6px;
          height: 6px;
          background: var(--accent, #fff);
          opacity: 0.7;
          z-index: 12;
        }
        .mc-corner-tl { top: 3px; left: 3px; }
        .mc-corner-tr { top: 3px; right: 3px; }
        .mc-corner-bl { bottom: 3px; left: 3px; }
        .mc-corner-br { bottom: 3px; right: 3px; }

        /* Top Pixelated Accent Strip */
        .mc-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: var(--accent);
          opacity: 0.75;
          z-index: 10;
          mask-image: repeating-linear-gradient(
            90deg,
            black 0px, black 6px,
            transparent 6px, transparent 8px
          );
          -webkit-mask-image: repeating-linear-gradient(
            90deg,
            black 0px, black 6px,
            transparent 6px, transparent 8px
          );
        }

        /* Scanlines Overlay */
        .mc-scanlines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 5;
          opacity: 0.05;
          background: repeating-linear-gradient(
            0deg,
            transparent, transparent 3px,
            rgba(255, 255, 255, 0.6) 3px,
            rgba(255, 255, 255, 0.6) 4px
          );
        }

        /* Hover Inner Glow */
        .mc-inner-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 4;
          opacity: 0;
          transition: opacity 0.35s ease;
          background: radial-gradient(
            ellipse at 50% 0%,
            color-mix(in srgb, var(--accent) 18%, transparent) 0%,
            transparent 75%
          );
        }
        .mc-card:hover .mc-inner-glow {
          opacity: 1;
        }

        /* ── Typography & Components ── */
        .mc-label {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .mc-micro-label {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.42rem;
          letter-spacing: 0.1em;
        }

        .mc-badge {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.42rem;
          letter-spacing: 0.08em;
          padding: 3px 6px;
          border-width: 1px;
          border-radius: 2px;
        }

        .mc-pixel-icon {
          width: 8px;
          height: 8px;
          border-radius: 1px;
          display: inline-block;
        }

        .mc-big-number {
          font-family: 'Inter', sans-serif;
          font-size: 3.8rem;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.04em;
        }

        .mc-big-number-gold {
          font-size: 4.2rem;
        }

        .mc-description {
          font-size: 0.75rem;
          line-height: 1.5;
          font-weight: 500;
        }

        /* XP Progress Bar */
        .mc-xp-bar {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 1px;
          overflow: hidden;
          padding: 1px;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .mc-xp-fill {
          height: 100%;
          border-radius: 1px;
        }

        /* ── Responsive Breakpoints ── */
        @media (max-width: 1100px) {
          .mc-cards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 20px;
          }
          .mc-big-number { font-size: 3.4rem; }
          .mc-big-number-gold { font-size: 3.6rem; }
        }

        @media (max-width: 640px) {
          .mc-cards-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .mc-card {
            min-height: 260px;
          }
          .mc-big-number { font-size: 3rem; }
          .mc-big-number-gold { font-size: 3.2rem; }
        }
      `}</style>
    </section>
  )
}
