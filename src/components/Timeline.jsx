import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Calendar,
  Clock,
  Sparkles,
  Users,
  Code2,
  FileText,
  CheckCircle2,
  Trophy,
  Flame,
  Terminal,
  Lightbulb,
  Moon,
  Award,
  AlertCircle,
  Compass,
  ArrowRight
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ── Phase 1: Online Qualification & Preparation Journey (Steps 01 – 07) ──
const journeySteps = [
  {
    id: 'j-01',
    stepNum: '01',
    phase: 'JOURNEY',
    category: 'REGISTRATION',
    title: 'Domain Selection & Registration',
    description: 'Choose your preferred domain and register your team.',
    badge: 'STEP 01',
    color: '#2ED3E8', // Cyan
    Icon: Sparkles,
  },
  {
    id: 'j-02',
    stepNum: '02',
    phase: 'JOURNEY',
    category: 'TEAM BUILDING',
    title: 'Team Formation',
    description: 'Build a team of 2–4 members and select your Team Leader.',
    badge: '2–4 MEMBERS',
    color: '#FF2E9A', // Pink
    Icon: Users,
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
    Icon: Code2,
  },
  {
    id: 'j-04',
    stepNum: '04',
    phase: 'JOURNEY',
    category: 'PPT SUBMISSION',
    title: 'Phase 1 PPT Submission',
    description: "The Team Leader submits the team's Phase 1 PPT.",
    badge: 'Deadline: Sept 20, 2026',
    isDeadline: true,
    color: '#FFB800', // Gold/Amber
    Icon: FileText,
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
    Icon: CheckCircle2,
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
    Icon: Trophy,
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
    Icon: Flame,
  },
]

// ── Phase 2: On-Site 24-Hour Hackathon Schedule ──
const eventSchedule = [
  {
    id: 's-01',
    stepNum: '01',
    phase: 'SCHEDULE',
    dayBadge: 'DAY 1 · OCT 8',
    category: 'CHECK-IN & KEYNOTE',
    time: '09:00 AM – 11:00 AM',
    title: 'Check-in & Opening Ceremony',
    description:
      'Team registration verification, welcome keynote, track briefing, and theme orientation.',
    color: '#2ED3E8', // Cyan
    Icon: Calendar,
  },
  {
    id: 's-02',
    stepNum: '02',
    phase: 'SCHEDULE',
    dayBadge: 'DAY 1 · OCT 8',
    category: 'HACKING KICKOFF',
    time: '11:00 AM',
    title: '24-Hour Hacking Begins',
    description:
      'The countdown starts. Teams begin coding, architecture setup, repository creation, and API integration.',
    color: '#FF2E9A', // Pink
    Icon: Terminal,
  },
  {
    id: 's-03',
    stepNum: '03',
    phase: 'SCHEDULE',
    dayBadge: 'DAY 1 · OCT 8',
    category: 'MENTORSHIP SPRINT',
    time: '03:30 PM – 06:00 PM',
    title: 'Mentor Evaluation Round 1',
    description:
      'Industry experts and faculty mentors visit team tables to review wireframes, architecture, and provide technical guidance.',
    color: '#2ED3E8', // Cyan
    Icon: Lightbulb,
  },
  {
    id: 's-04',
    stepNum: '04',
    phase: 'SCHEDULE',
    dayBadge: 'DAY 1 · OCT 8',
    category: 'MIDNIGHT SPRINT',
    time: '12:00 AM (Midnight)',
    title: 'Midnight Checkpoint & Refreshments',
    description:
      'Midway progress check, gaming lounge breaks, snacks, and continuous hacking sprints through the night.',
    color: '#FF2E9A', // Pink
    Icon: Moon,
  },
  {
    id: 's-05',
    stepNum: '05',
    phase: 'SCHEDULE',
    dayBadge: 'DAY 2 · OCT 9',
    category: 'SUBMISSION DEADLINE',
    time: '09:00 AM',
    title: 'Morning Code Freeze',
    description:
      'Hard code freeze. Teams submit repository links, presentation decks, and video demonstration links.',
    color: '#FFB800', // Gold/Amber
    isDeadline: true,
    Icon: Clock,
  },
  {
    id: 's-06',
    stepNum: '06',
    phase: 'SCHEDULE',
    dayBadge: 'DAY 2 · OCT 9',
    category: 'GRAND VALEDICTORY',
    time: '10:00 AM – 01:00 PM',
    title: 'Judging & Closing Awards Ceremony',
    description:
      'Live 3-minute project demos in front of the jury panel, followed by winner announcements and prize distribution.',
    color: '#FF2E9A', // Pink
    Icon: Award,
  },
]

export default function Timeline() {
  const [activeFilter, setActiveFilter] = useState('ALL') // 'ALL' | 'JOURNEY' | 'SCHEDULE'
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const lineFillRef = useRef(null)
  const beaconRef = useRef(null)

  const itemsToDisplay =
    activeFilter === 'JOURNEY'
      ? journeySteps
      : activeFilter === 'SCHEDULE'
        ? eventSchedule
        : [...journeySteps, ...eventSchedule]

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // 1:1 Instant scroll-synchronized vertical line fill (zero lag, zero delay)
      if (lineFillRef.current) {
        gsap.fromTo(
          lineFillRef.current,
          { height: '0%' },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: track,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        )
      }

      // Cyber Beacon strictly follows scroll in real-time
      if (beaconRef.current) {
        gsap.fromTo(
          beaconRef.current,
          { top: '0%' },
          {
            top: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: track,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        )
      }

      // Smooth reveal for timeline items on scroll down and up
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
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        })

        // Reveal node with pop animation
        if (node) {
          tl.fromTo(
            node,
            { scale: 0.3, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }
          )
        }

        // Slide card in smoothly from respective side
        if (cardBox) {
          tl.fromTo(
            cardBox,
            {
              opacity: 0,
              x: isEven ? 30 : -30,
              scale: 0.95,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.45,
              ease: 'power3.out',
            },
            '-=0.2'
          )
        }
      })
    }, section)

    // Refresh ScrollTrigger when filter tab changes
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      clearTimeout(timer)
      ctx.revert()
    }
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
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-1 shadow-[0_0_15px_rgba(46,211,232,0.2)]">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>ROADMAP & EVENT SCHEDULE</span>
          </div>

          <h2 className="font-pixel text-2xl sm:text-4xl lg:text-5xl leading-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Your Hackatopia Journey
          </h2>

          <div className="h-0.5 w-28 bg-gradient-to-r from-transparent via-[#2ED3E8] to-transparent shadow-[0_0_12px_#2ED3E8]" />

          <p className="text-white/70 text-xs sm:text-sm font-medium tracking-wide max-w-lg pt-1">
            From team registration & Phase 1 online submissions to the 24-hour live hackathon arena.
          </p>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center justify-center gap-2 mt-4 p-1.5 rounded-xl bg-[#0e0a24]/80 border border-white/10 backdrop-blur-md flex-wrap">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-4 sm:px-6 py-2.5 rounded-lg font-mono text-[0.7rem] sm:text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                activeFilter === 'ALL'
                  ? 'bg-gradient-to-r from-[#2ED3E8] to-[#FF2E9A] text-white shadow-[0_0_18px_rgba(46,211,232,0.45)]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              FULL ROADMAP
            </button>
            <button
              onClick={() => setActiveFilter('JOURNEY')}
              className={`px-4 sm:px-6 py-2.5 rounded-lg font-mono text-[0.7rem] sm:text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                activeFilter === 'JOURNEY'
                  ? 'bg-[#2ED3E8] text-black shadow-[0_0_18px_rgba(46,211,232,0.45)] font-extrabold'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              PHASE 1: ONLINE QUALIFICATION
            </button>
            <button
              onClick={() => setActiveFilter('SCHEDULE')}
              className={`px-4 sm:px-6 py-2.5 rounded-lg font-mono text-[0.7rem] sm:text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                activeFilter === 'SCHEDULE'
                  ? 'bg-[#FF2E9A] text-white shadow-[0_0_18px_rgba(255,46,154,0.45)] font-extrabold'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              PHASE 2: ON-SITE GRAND FINALE
            </button>
          </div>
        </div>

        {/* ── Seamless Central Track Timeline ── */}
        <div ref={trackRef} className="relative w-full">
          {/* Background vertical line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-[#1b1030] rounded-full" />

          {/* Glowing Animated Gradient Fill Line */}
          <div
            ref={lineFillRef}
            className="absolute left-6 md:left-1/2 top-4 w-1 -translate-x-1/2 bg-gradient-to-b from-[#2ED3E8] via-[#9D4EDD] via-[#FFB800] to-[#FF2E9A] rounded-full shadow-[0_0_16px_rgba(46,211,232,0.85)]"
            style={{ height: '0%' }}
          />

          {/* Glowing Cyber Beacon following scroll */}
          <div
            ref={beaconRef}
            className="absolute left-6 md:left-1/2 z-30 pointer-events-none"
            style={{ top: '0%', transform: 'translateX(-50%)' }}
          >
            {/* Trail gradient behind beacon */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full w-1.5 h-12 rounded-full"
              style={{
                background: 'linear-gradient(to bottom, rgba(46,211,232,0.9), transparent)',
                filter: 'blur(3px)',
              }}
            />
            {/* Illuminated core orb */}
            <div
              className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full"
              style={{
                background: 'radial-gradient(circle, #00f0ff 20%, #0d0824 85%)',
                border: '2px solid #ffffff',
                boxShadow: '0 0 20px #00f0ff, 0 0 35px rgba(0,240,255,0.6), inset 0 0 8px #ffffff',
              }}
            >
              <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
            </div>
          </div>

          {/* Timeline Items */}
          <div className="flex flex-col gap-8 sm:gap-12 relative z-10">
            {itemsToDisplay.map((item, index) => {
              const isEven = index % 2 === 0
              const isJourney = item.phase === 'JOURNEY'
              const isDeadline = item.isDeadline
              const ItemIcon = item.Icon

              // Header divider indicator before Day 1 if showing ALL
              const showPhaseDivider =
                activeFilter === 'ALL' && index === journeySteps.length

              return (
                <div key={item.id} className="flex flex-col gap-8">
                  {/* Phase 2 Transition Banner */}
                  {showPhaseDivider && (
                    <div className="relative flex items-center justify-center my-8 z-20 w-full">
                      {/* Left glowing rule */}
                      <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#FF2E9A]/50 to-[#FF2E9A]" />

                      {/* Central Glowing Capsule Banner */}
                      <div
                        className="mx-3 sm:mx-6 px-6 sm:px-8 py-3.5 rounded-2xl flex items-center gap-3.5 text-center backdrop-blur-xl border transition-all duration-300 hover:scale-102 cursor-default"
                        style={{
                          background: 'linear-gradient(135deg, rgba(28, 10, 36, 0.95) 0%, rgba(14, 6, 26, 0.98) 100%)',
                          borderColor: '#FF2E9A',
                          boxShadow: '0 0 35px rgba(255,46,154,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                        }}
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF2E9A] shadow-[0_0_10px_#FF2E9A] animate-pulse flex-shrink-0" />
                        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                          <p className="font-pixel text-xs sm:text-sm text-[#FF2E9A] tracking-wider uppercase font-bold">
                            PHASE 02: ON-SITE GRAND FINALE
                          </p>
                          <p className="font-mono text-[0.7rem] sm:text-xs text-white/80 font-medium tracking-wide">
                            24-Hour Live Hackathon Arena · October 8–9, 2026
                          </p>
                        </div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#2ED3E8] shadow-[0_0_10px_#2ED3E8] animate-pulse flex-shrink-0" />
                      </div>

                      {/* Right glowing rule */}
                      <div className="flex-1 h-[2px] bg-gradient-to-r from-[#2ED3E8] via-[#2ED3E8]/50 to-transparent" />
                    </div>
                  )}

                  <div
                    className={`timeline-item relative flex items-start md:items-center ${
                      isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                    }`}
                  >
                    {/* Card Content Container */}
                    <div
                      className={`w-full md:w-[46%] pl-14 md:pl-0 ${
                        isEven ? 'md:pl-8 text-left' : 'md:pr-8 md:text-left'
                      }`}
                    >
                      <div
                        className={`timeline-card-box group relative p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 cursor-default overflow-hidden ${
                          isDeadline ? 'ring-2 ring-[#FFB800]/80' : ''
                        }`}
                        style={{
                          background: isDeadline
                            ? 'linear-gradient(165deg, rgba(28, 20, 6, 0.94) 0%, rgba(14, 10, 2, 0.98) 100%)'
                            : 'linear-gradient(165deg, rgba(16, 12, 34, 0.92) 0%, rgba(8, 6, 20, 0.97) 100%)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: '1.5px solid',
                          borderColor: isDeadline ? 'rgba(255, 184, 0, 0.6)' : `${item.color}50`,
                          boxShadow: `0 12px 36px rgba(0,0,0,0.65), 0 0 25px ${item.color}15, inset 0 1px 0 rgba(255,255,255,0.12)`,
                        }}
                      >
                        {/* Top Glowing Accent Strip */}
                        <div
                          className="absolute top-0 left-0 right-0 h-1.5"
                          style={{
                            background: item.color,
                            boxShadow: `0 0 16px ${item.color}`,
                          }}
                        />

                        {/* Hover Ambient Inner Glow */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{
                            background: `radial-gradient(ellipse at 50% 0%, color-mix(in srgb, ${item.color} 20%, transparent) 0%, transparent 70%)`,
                          }}
                        />

                        {/* Top Badges & Time/Category */}
                        <div className="relative z-10 flex items-center justify-between gap-2 mb-3.5 flex-wrap">
                          <span
                            className="font-pixel text-[0.6rem] tracking-wider uppercase font-bold px-3 py-1.5 rounded-full border flex items-center gap-1.5"
                            style={{
                              color: item.color,
                              borderColor: `${item.color}50`,
                              background: `${item.color}15`,
                            }}
                          >
                            {isJourney
                              ? `STEP ${item.stepNum} · ${item.category}`
                              : `${item.dayBadge} · ${item.category}`}
                          </span>

                          <span
                            className={`font-mono text-[0.68rem] px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 ${
                              isDeadline
                                ? 'bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/50 animate-pulse'
                                : 'text-white/85 bg-white/10'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5 opacity-80" />
                            <span>{item.badge || item.time}</span>
                          </span>
                        </div>

                        {/* Title with Lucide Icon */}
                        <h4 className="relative z-10 text-white font-black text-base sm:text-xl mb-2 leading-snug flex items-center gap-2.5">
                          {ItemIcon && (
                            <div
                              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                              style={{
                                background: `${item.color}20`,
                                border: `1.5px solid ${item.color}50`,
                                boxShadow: `0 0 12px ${item.color}30`,
                              }}
                            >
                              <ItemIcon className="w-4 h-4" style={{ color: item.color }} />
                            </div>
                          )}
                          <span>{item.title}</span>
                        </h4>

                        {/* Description */}
                        <p className="relative z-10 text-white/75 text-xs sm:text-sm leading-relaxed font-medium">
                          {item.description}
                        </p>

                        {/* Deadline Special Callout */}
                        {isDeadline && (
                          <div className="relative z-10 mt-4 p-3.5 rounded-xl bg-[#FFB800]/15 border border-[#FFB800]/40 flex items-center gap-2.5">
                            <AlertCircle className="w-4 h-4 text-[#FFB800] flex-shrink-0" />
                            <p className="text-xs font-bold text-[#FFB800] tracking-wide">
                              HARD CODE FREEZE · OCTOBER 9, 09:00 AM
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Central Milestone Node (No numbers) */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center">
                      <div
                        className="timeline-node-circle w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-125 cursor-default"
                        style={{
                          background: '#0c071b',
                          border: `2.5px solid ${item.color}`,
                          boxShadow: `0 0 16px ${item.color}90, inset 0 0 8px ${item.color}40`,
                        }}
                      >
                        <div
                          className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                          style={{
                            background: item.color,
                            boxShadow: `0 0 10px ${item.color}`,
                          }}
                        />
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
