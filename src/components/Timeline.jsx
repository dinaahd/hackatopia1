import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Phase 1: Online Qualification & Preparation Journey (Steps 01 – 07) ──
const journeySteps = [
  {
    id: 'j-01',
    stepNum: '01',
    phase: 'JOURNEY',
    category: 'REGISTER',
    title: 'Domain Selection & Registration',
    description: 'Choose your preferred domain and register your team.',
    badge: 'STEP 01',
    color: '#2ED3E8', // Cyan
    icon: '🚀',
  },
  {
    id: 'j-02',
    stepNum: '02',
    phase: 'JOURNEY',
    category: 'FORM YOUR TEAM',
    title: 'Team Formation',
    description: 'Build a team of 2–4 members and select your Team Leader.',
    badge: '2–4 MEMBERS',
    color: '#FF2E9A', // Pink
    icon: '👥',
  },
  {
    id: 'j-03',
    stepNum: '03',
    phase: 'JOURNEY',
    category: 'PHASE 1',
    title: 'Online Assessment',
    description: 'Complete the online assessment as instructed.',
    badge: 'ASSESSMENT',
    color: '#9D4EDD', // Purple
    icon: '💻',
  },
  {
    id: 'j-04',
    stepNum: '04',
    phase: 'JOURNEY',
    category: 'PPT SUBMISSION',
    title: 'Phase 1 PPT Submission',
    description: "The Team Leader submits the team's Phase 1 PPT.",
    badge: '📅 Deadline: September 20, 2026',
    isDeadline: true,
    color: '#FFB800', // Gold/Amber
    icon: '📊',
  },
  {
    id: 'j-05',
    stepNum: '05',
    phase: 'JOURNEY',
    category: 'EVALUATION',
    title: 'Committee Review',
    description: 'Submissions will be evaluated by the organizing committee.',
    badge: 'REVIEW PHASE',
    color: '#2ED3E8', // Cyan
    icon: '⚖️',
  },
  {
    id: 'j-06',
    stepNum: '06',
    phase: 'JOURNEY',
    category: 'SHORTLISTING',
    title: 'Finalists Announcement',
    description: 'Selected teams will be announced for the final round.',
    badge: 'SHORTLISTING',
    color: '#00F5D4', // Neon Teal
    icon: '🏆',
  },
  {
    id: 'j-07',
    stepNum: '07',
    phase: 'JOURNEY',
    category: 'HACKATOPIA',
    title: '24-Hour Grand Finale',
    description: 'Participate in the 24-hour national-level hackathon.',
    badge: 'LIVE EVENT',
    color: '#FF2E9A', // Pink
    icon: '⚡',
  },
]

// ── Phase 2: On-Site 24-Hour Hackathon Schedule ──
const eventSchedule = [
  {
    id: 's-01',
    stepNum: '08',
    phase: 'SCHEDULE',
    day: 'DAY 1: OCTOBER 8',
    session: 'Morning Session',
    time: '09:00 AM – 11:00 AM',
    title: 'Check-in & Opening Ceremony',
    description:
      'Team registration verification, welcome keynote, track briefing, and theme orientation.',
    color: '#2ED3E8', // Cyan
    icon: '🎪',
  },
  {
    id: 's-02',
    stepNum: '09',
    phase: 'SCHEDULE',
    day: 'DAY 1: OCTOBER 8',
    session: 'Hacking Kickoff',
    time: '11:00 AM',
    title: '24-Hour Hacking Begins',
    description:
      'The countdown starts. Teams begin coding, architecture setup, repository creation, and API integration.',
    color: '#FF2E9A', // Pink
    icon: '🚀',
  },
  {
    id: 's-03',
    stepNum: '10',
    phase: 'SCHEDULE',
    day: 'DAY 1: OCTOBER 8',
    session: 'Afternoon & Mentorship',
    time: '03:30 PM – 06:00 PM',
    title: 'Mentor Evaluation Round 1',
    description:
      'Industry experts and faculty mentors visit team tables to review wireframes, architecture, and provide technical guidance.',
    color: '#2ED3E8', // Cyan
    icon: '🧠',
  },
  {
    id: 's-04',
    stepNum: '11',
    phase: 'SCHEDULE',
    day: 'DAY 1: OCTOBER 8',
    session: 'Midnight Hack',
    time: '12:00 AM (Midnight)',
    title: 'Midnight Checkpoint & Refreshments',
    description:
      'Midway progress check, gaming lounge breaks, snacks, and continuous hacking sprints through the night.',
    color: '#FF2E9A', // Pink
    icon: '🌙',
  },
  {
    id: 's-05',
    stepNum: '12',
    phase: 'SCHEDULE',
    day: 'DAY 2: OCTOBER 9',
    session: 'Morning Code Freeze',
    time: '09:00 AM',
    title: 'Submission Deadline',
    description:
      'Hard code freeze. Teams submit repository links, presentation decks, and video demonstration links.',
    color: '#2ED3E8', // Cyan
    icon: '🏁',
  },
  {
    id: 's-06',
    stepNum: '13',
    phase: 'SCHEDULE',
    day: 'DAY 2: OCTOBER 9',
    session: 'Final Pitch & Valedictory',
    time: '10:00 AM – 01:00 PM',
    title: 'Judging & Closing Awards Ceremony',
    description:
      'Live 3-minute project demos in front of the jury panel, followed by winner announcements and prize distribution.',
    color: '#FF2E9A', // Pink
    icon: '🥇',
  },
]

export default function Timeline() {
  const [activeFilter, setActiveFilter] = useState('ALL') // 'ALL' | 'JOURNEY' | 'SCHEDULE'
  const sectionRef = useRef(null)
  const lineFillRef = useRef(null)
  const rocketRef = useRef(null)

  const itemsToDisplay =
    activeFilter === 'JOURNEY'
      ? journeySteps
      : activeFilter === 'SCHEDULE'
        ? eventSchedule
        : [...journeySteps, ...eventSchedule]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Smooth timeline vertical line fill animation
      if (lineFillRef.current) {
        gsap.fromTo(
          lineFillRef.current,
          { height: '0%' },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 55%',
              end: 'bottom 80%',
              scrub: 0.3,
            },
          }
        )
      }

      // Rocket follows the line fill
      if (rocketRef.current) {
        gsap.fromTo(
          rocketRef.current,
          { top: '0%' },
          {
            top: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 55%',
              end: 'bottom 80%',
              scrub: 0.3,
            },
          }
        )
      }

      // Staggered reveal for timeline items
      const cards = section.querySelectorAll('.timeline-item')
      cards.forEach((item, index) => {
        const isEven = index % 2 === 0
        const cardBox = item.querySelector('.timeline-card-box')
        const node = item.querySelector('.timeline-node-circle')

        if (prefersReducedMotion) {
          gsap.set([cardBox, node], { opacity: 1, x: 0 })
          return
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        })

        // Reveal node with pop animation
        if (node) {
          tl.fromTo(
            node,
            { scale: 0.3, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2.2)' }
          )
        }

        // Slide card in smoothly from respective side
        if (cardBox) {
          tl.fromTo(
            cardBox,
            {
              opacity: 0,
              x: isEven ? 35 : -35,
              scale: 0.94,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.5,
              ease: 'power3.out',
            },
            '-=0.25'
          )
        }
      })
    }, section)

    // Refresh ScrollTrigger when filter tab changes
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => ctx.revert()
  }, [activeFilter])

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-12 w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #070514 0%, #0d0824 50%, #070514 100%)',
      }}
    >
      {/* Background Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(46, 211, 232, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(46, 211, 232, 0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient background glows */}
      <div
        className="absolute top-1/4 -left-28 w-96 h-96 rounded-full opacity-15 blur-[120px] pointer-events-none"
        style={{ background: '#2ED3E8' }}
      />
      <div
        className="absolute top-2/3 -right-28 w-96 h-96 rounded-full opacity-15 blur-[120px] pointer-events-none"
        style={{ background: '#FF2E9A' }}
      />
      <div
        className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full opacity-10 blur-[100px] pointer-events-none"
        style={{ background: '#FFB800' }}
      />

      <div className="max-w-5xl w-full mx-auto relative z-10 flex flex-col gap-12 sm:gap-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-1 shadow-[0_0_15px_rgba(46,211,232,0.2)]">
            <span>🚀</span> ROADMAP & EVENT SCHEDULE
          </div>
          <h2 className="font-pixel text-2xl sm:text-4xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            YOUR HACKATOPIA JOURNEY
          </h2>
          <div className="h-0.5 w-28 bg-gradient-to-r from-transparent via-[#2ED3E8] to-transparent shadow-[0_0_12px_#2ED3E8]" />
          <p className="text-white/70 text-xs sm:text-sm font-medium tracking-wide max-w-lg pt-1">
            From team registration & Phase 1 submissions to the 24-hour live hackathon arena.
          </p>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center justify-center gap-2 mt-4 p-1.5 rounded-xl bg-[#0e0a24]/80 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-3.5 sm:px-5 py-2 rounded-lg font-mono text-[0.7rem] sm:text-xs font-bold tracking-wider transition-all duration-200 ${activeFilter === 'ALL'
                ? 'bg-gradient-to-r from-[#2ED3E8] to-[#FF2E9A] text-white shadow-[0_0_15px_rgba(46,211,232,0.4)]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
            >
              FULL ROADMAP
            </button>
            <button
              onClick={() => setActiveFilter('JOURNEY')}
              className={`px-3.5 sm:px-5 py-2 rounded-lg font-mono text-[0.7rem] sm:text-xs font-bold tracking-wider transition-all duration-200 ${activeFilter === 'JOURNEY'
                ? 'bg-[#2ED3E8] text-black shadow-[0_0_15px_rgba(46,211,232,0.4)] font-extrabold'
                : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
            >
              🚀 QUALIFICATION (01-07)
            </button>
            <button
              onClick={() => setActiveFilter('SCHEDULE')}
              className={`px-3.5 sm:px-5 py-2 rounded-lg font-mono text-[0.7rem] sm:text-xs font-bold tracking-wider transition-all duration-200 ${activeFilter === 'SCHEDULE'
                ? 'bg-[#FF2E9A] text-white shadow-[0_0_15px_rgba(255,46,154,0.4)] font-extrabold'
                : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
            >
              ⚡ LIVE EVENT (OCT 8-9)
            </button>
          </div>
        </div>

        {/* ── Seamless Central Track Timeline ── */}
        <div className="relative w-full">
          {/* Background vertical line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-[#1b1030] rounded-full" />

          {/* Glowing Animated Gradient Fill Line */}
          <div
            ref={lineFillRef}
            className="absolute left-6 md:left-1/2 top-4 w-1 -translate-x-1/2 bg-gradient-to-b from-[#2ED3E8] via-[#9D4EDD] via-[#FFB800] to-[#FF2E9A] rounded-full shadow-[0_0_14px_rgba(46,211,232,0.8)]"
            style={{ height: '0%' }}
          />

          {/* Rocket following the scroll */}
          <div
            ref={rocketRef}
            className="absolute left-6 md:left-1/2 z-30 pointer-events-none"
            style={{ top: '0%', transform: 'translateX(-50%)' }}
          >
            {/* Glow trail behind rocket */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full w-1.5 h-10 rounded-full"
              style={{
                background: 'linear-gradient(to bottom, rgba(46,211,232,0.8), transparent)',
                filter: 'blur(3px)',
              }}
            />
            {/* Rocket body */}
            <div
              className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full"
              style={{
                background: 'radial-gradient(circle, #0d0824 40%, rgba(46,211,232,0.25) 100%)',
                border: '2px solid #2ED3E8',
                boxShadow: '0 0 20px rgba(46,211,232,0.7), 0 0 40px rgba(46,211,232,0.3), inset 0 0 10px rgba(46,211,232,0.3)',
              }}
            >
              <span className="text-base sm:text-lg" style={{ lineHeight: 1 }}>🚀</span>
            </div>
          </div>

          {/* Timeline Items */}
          <div className="flex flex-col gap-8 sm:gap-12 relative z-10">
            {itemsToDisplay.map((item, index) => {
              const isEven = index % 2 === 0
              const isJourney = item.phase === 'JOURNEY'
              const isDeadline = item.isDeadline

              // Header divider indicator before Day 1 if showing ALL
              const showPhaseDivider =
                activeFilter === 'ALL' && index === journeySteps.length

              return (
                <div key={item.id} className="flex flex-col gap-8">
                  {/* Phase 2 Transition Banner */}
                  {showPhaseDivider && (
                    <div className="relative flex items-center justify-center my-6 z-20">
                      <div className="px-6 py-3 rounded-xl bg-[#140b33] border-2 border-[#FF2E9A] shadow-[0_0_25px_rgba(255,46,154,0.35)] flex items-center gap-3 text-center">
                        <span className="text-xl">🔥</span>
                        <div>
                          <p className="font-pixel text-xs text-[#FF2E9A] tracking-wider uppercase font-bold">
                            PHASE 2: ON-SITE GRAND FINALE
                          </p>
                          <p className="font-mono text-[0.7rem] text-white/80">
                            24-HOUR LIVE HACKATHON ARENA SCHEDULE
                          </p>
                        </div>
                        <span className="text-xl">⚡</span>
                      </div>
                    </div>
                  )}

                  <div
                    className={`timeline-item relative flex items-start md:items-center ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                      }`}
                  >
                    {/* Card Content Container */}
                    <div
                      className={`w-full md:w-[46%] pl-14 md:pl-0 ${isEven ? 'md:pl-8 text-left' : 'md:pr-8 md:text-left'
                        }`}
                    >
                      <div
                        className={`timeline-card-box group relative p-5 sm:p-7 rounded-xl transition-all duration-300 hover:-translate-y-1.5 cursor-default ${isDeadline ? 'ring-2 ring-[#FFB800]/60' : ''
                          }`}
                        style={{
                          background: isDeadline
                            ? 'linear-gradient(165deg, rgba(28, 20, 4, 0.96) 0%, rgba(14, 10, 2, 0.98) 100%)'
                            : 'linear-gradient(165deg, rgba(16, 12, 32, 0.95) 0%, rgba(8, 6, 18, 0.98) 100%)',
                          border: '2px solid',
                          borderColor: `${item.color}50`,
                          boxShadow: `0 8px 26px rgba(0,0,0,0.6), 0 0 20px ${item.color}18`,
                        }}
                      >
                        {/* Top Glowing Accent Strip */}
                        <div
                          className="absolute top-0 left-0 right-0 h-1.5 rounded-t-xl"
                          style={{
                            background: item.color,
                            boxShadow: `0 0 10px ${item.color}`,
                          }}
                        />

                        {/* Top Badges & Time/Category */}
                        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                          <span
                            className="font-pixel text-[0.6rem] tracking-wider uppercase font-bold px-2 py-0.5 rounded border"
                            style={{
                              color: item.color,
                              borderColor: `${item.color}40`,
                              background: `${item.color}15`,
                            }}
                          >
                            {isJourney ? `0${index + 1} — ${item.category}` : item.day}
                          </span>

                          <span
                            className={`font-mono text-[0.68rem] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 ${isDeadline
                              ? 'bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/50 animate-pulse'
                              : 'text-white/80 bg-white/10'
                              }`}
                          >
                            {item.badge || item.time}
                          </span>
                        </div>

                        {/* Card Subtitle / Session */}
                        {!isJourney && item.session && (
                          <p
                            className="text-[0.68rem] font-mono font-bold tracking-wider uppercase mb-1"
                            style={{ color: item.color }}
                          >
                            {item.session} • {item.time}
                          </p>
                        )}

                        {/* Title */}
                        <h4 className="text-white font-black text-base sm:text-xl mb-1.5 leading-snug flex items-center gap-2">
                          <span>{item.icon}</span>
                          <span>{item.title}</span>
                        </h4>

                        {/* Description */}
                        <p className="text-white/75 text-xs sm:text-sm leading-relaxed font-medium">
                          {item.description}
                        </p>

                        {/* Deadline Special Callout */}
                        {isDeadline && (
                          <div className="mt-3 p-2.5 rounded-lg bg-[#FFB800]/15 border border-[#FFB800]/40 flex items-center gap-2">
                            <span className="text-base">⏰</span>
                            <p className="text-xs font-bold text-[#FFB800] tracking-wide">
                              SUBMISSION DEADLINE: SEPTEMBER 20, 2026
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Numbered / Icon Central Milestone Node */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center">
                      <div
                        className="timeline-node-circle w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-pixel text-xs sm:text-sm font-bold transition-transform duration-300 group-hover:scale-115"
                        style={{
                          background: '#0c071b',
                          border: `2.5px solid ${item.color}`,
                          boxShadow: `0 0 18px ${item.color}80, inset 0 0 10px ${item.color}40`,
                          color: item.color,
                        }}
                      >
                        {isJourney ? item.stepNum : item.nodeLabel || item.stepNum}
                      </div>
                    </div>

                    {/* Empty Spacer Column for Desktop Alternate Layout */}
                    <div className="hidden md:block md:w-[46%]" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
