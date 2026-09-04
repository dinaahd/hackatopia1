import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookOpen, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const rulesList = [
  {
    id: 1,
    title: 'Team Formation',
    rule: 'Teams of up to 4 — solo builders welcome too. Cross-college teams are fully permitted.',
    accent: '#2ED3E8', // Blue
  },
  {
    id: 2,
    title: 'Fresh Code Only',
    rule: 'All code must be written during the 24-hour window. No pre-built codebases allowed.',
    accent: '#FF2E9A', // Pink
  },
  {
    id: 3,
    title: 'Assets & Designs',
    rule: 'Pre-existing designs, wireframes, open-source libraries, and APIs are allowed.',
    accent: '#2ED3E8', // Blue
  },
  {
    id: 4,
    title: 'Bounty Qualification',
    rule: 'You must integrate at least one sponsor API/tool/platform to qualify for bounty prize tracks.',
    accent: '#FF2E9A', // Pink
  },
  {
    id: 5,
    title: 'Submission & Pitch',
    rule: 'Final submission (repo + deck + demo video) plus a live 3-minute pitch required to be judged.',
    accent: '#2ED3E8', // Blue
  },
  {
    id: 6,
    title: 'Code of Conduct',
    rule: 'Respect fellow builders, mentors, and staff. Zero tolerance for harassment or plagiarism.',
    accent: '#FF2E9A', // Pink
  },
]

export default function Rules() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const rulesContainerRef = useRef(null)
  const buttonRef = useRef(null)

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
        gsap.set([headerRef.current, rulesContainerRef.current, buttonRef.current], { opacity: 1, y: 0 })
        return
      }

      // Header entrance
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      )

      // Alternating slide-in for rule rows
      if (rulesContainerRef.current) {
        const rows = rulesContainerRef.current.querySelectorAll('.rule-row')
        rows.forEach((row, i) => {
          const fromLeft = i % 2 === 0
          gsap.fromTo(
            row,
            {
              opacity: 0,
              x: fromLeft ? -40 : 40,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.65,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 85%',
                once: true,
              },
            }
          )
        })
      }

      // Button entrance
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { opacity: 0, y: 25, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: buttonRef.current,
              start: 'top 90%',
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
      id="rules"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 lg:px-12 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a14 0%, #0c0824 50%, #0a0a14 100%)',
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

      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col gap-10 sm:gap-14">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center space-y-4 opacity-0">
          <span className="font-pixel text-[0.65rem] sm:text-xs tracking-[0.25em] text-[#2ED3E8] uppercase px-3 py-1.5 rounded-sm bg-[#2ED3E8]/10 border border-[#2ED3E8]/30 shadow-[0_0_12px_rgba(46,211,232,0.2)]">
            THE RULEBOOK
          </span>

          <h2 className="font-pixel text-2xl sm:text-4xl lg:text-5xl leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Build Fair. Build Fast. Build Real.
          </h2>

          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Clear guidelines for all hackers. Play by the rules, build with honor, and create something extraordinary.
          </p>
        </div>

        {/* 6 Rules List with Voxel Cube Markers in Blue & Pink */}
        <div ref={rulesContainerRef} className="flex flex-col gap-4 sm:gap-5 w-full">
          {rulesList.map((r) => {
            const isPink = r.accent === '#FF2E9A'
            return (
              <div
                key={r.id}
                className="rule-row group relative p-5 sm:p-6 rounded-2xl flex items-start gap-4 sm:gap-6 cursor-default transition-all duration-300"
                style={{
                  background: 'linear-gradient(165deg, rgba(16,12,34,0.9) 0%, rgba(8,6,20,0.97) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1.5px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                {/* Glowing Number Marker in Blue / Pink */}
                <div
                  className="w-11 h-11 sm:w-13 sm:h-13 flex-shrink-0 flex items-center justify-center rounded-xl text-black font-pixel text-sm sm:text-base font-bold transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background: r.accent,
                    boxShadow: `0 0 20px ${r.accent}80, inset 0 1px 0 rgba(255,255,255,0.5)`,
                  }}
                >
                  0{r.id}
                </div>

                {/* Rule Details */}
                <div className="flex-1 space-y-1.5">
                  <h3
                    className="font-pixel text-xs sm:text-sm text-white group-hover:text-[var(--accent)] transition-colors"
                    style={{ '--accent': r.accent }}
                  >
                    {r.title}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-medium">
                    {r.rule}
                  </p>
                </div>

                {/* Status Indicator */}
                <span
                  className="hidden sm:inline-block font-mono text-[0.65rem] tracking-widest uppercase mt-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10"
                  style={{ color: r.accent }}
                >
                  RULE 0{r.id}
                </span>
              </div>
            )
          })}
        </div>

        {/* Hover Button for Rulebook */}
        <div ref={buttonRef} className="flex flex-col items-center justify-center pt-2 sm:pt-4 opacity-0">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-arcade btn-arcade-cyan group text-xs sm:text-sm px-8 sm:px-10 py-4 flex items-center justify-center gap-3 w-full sm:w-auto text-center"
          >
            <BookOpen className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
            <span>RULEBOOK</span>
            <ArrowUpRight className="w-4 h-4 opacity-80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      <style>{`
        .rule-row:hover {
          border-color: rgba(46, 211, 232, 0.4) !important;
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(0,0,0,0.8), 0 0 30px rgba(46,211,232,0.18), inset 0 1px 0 rgba(255,255,255,0.2) !important;
        }
      `}</style>
    </section>
  )
}
