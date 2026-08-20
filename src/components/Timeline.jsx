import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const schedule = [
  {
    id: 1,
    day: 'DAY 1: MARCH 14',
    session: 'Morning Session',
    time: '09:00 AM – 11:00 AM',
    title: 'Check-in & Opening Ceremony',
    description:
      'Team registration verification, welcome keynote, track briefing, and theme orientation.',
    color: '#2ED3E8', // Blue
  },
  {
    id: 2,
    day: 'DAY 1: MARCH 14',
    session: 'Hacking Kickoff',
    time: '11:00 AM',
    title: '24-Hour Hacking Begins',
    description:
      'The countdown starts. Teams begin coding, architecture setup, repository creation, and API integration.',
    color: '#FF2E9A', // Pink
  },
  {
    id: 3,
    day: 'DAY 1: MARCH 14',
    session: 'Afternoon & Mentorship',
    time: '03:30 PM – 06:00 PM',
    title: 'Mentor Evaluation Round 1',
    description:
      'Industry experts and faculty mentors visit team tables to review wireframes, architecture, and provide technical guidance.',
    color: '#2ED3E8', // Blue
  },
  {
    id: 4,
    day: 'DAY 1: MARCH 14',
    session: 'Midnight Hack',
    time: '12:00 AM (Midnight)',
    title: 'Midnight Checkpoint & Refreshments',
    description:
      'Midway progress check, gaming lounge breaks, snacks, and continuous hacking sprints through the night.',
    color: '#FF2E9A', // Pink
  },
  {
    id: 5,
    day: 'DAY 2: MARCH 15',
    session: 'Morning Code Freeze',
    time: '09:00 AM',
    title: 'Submission Deadline',
    description:
      'Hard code freeze. Teams submit repository links, presentation decks, and video demonstration links.',
    color: '#2ED3E8', // Blue
  },
  {
    id: 6,
    day: 'DAY 2: MARCH 15',
    session: 'Final Pitch & Valedictory',
    time: '10:00 AM – 01:00 PM',
    title: 'Judging & Closing Awards Ceremony',
    description:
      'Live 3-minute project demos in front of the jury panel, followed by winner announcements and prize distribution.',
    color: '#FF2E9A', // Pink
  },
]

export default function Timeline() {
  const sectionRef = useRef(null)
  const lineFillRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Smooth continuous timeline line fill tied naturally to page scroll (NO PINNING)
      if (lineFillRef.current) {
        gsap.fromTo(
          lineFillRef.current,
          { height: '0%' },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: 0.3,
            },
          }
        )
      }

      // Staggered reveal for each timeline card and node
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
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })

        // Reveal node with pop animation
        tl.fromTo(
          node,
          { scale: 0.4, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }
        )

        // Slide card in smoothly from respective side
        tl.fromTo(
          cardBox,
          {
            opacity: 0,
            x: isEven ? 40 : -40,
            scale: 0.95,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.55,
            ease: 'power3.out',
          },
          '-=0.25'
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 lg:px-12 w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a14 0%, #0d0824 50%, #0a0a14 100%)',
      }}
    >
      {/* Background Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(46, 211, 232, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(46, 211, 232, 0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient background glows in Blue & Pink */}
      <div
        className="absolute top-1/4 -left-24 w-96 h-96 rounded-full opacity-10 blur-[100px] pointer-events-none"
        style={{ background: '#2ED3E8' }}
      />
      <div
        className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full opacity-10 blur-[100px] pointer-events-none"
        style={{ background: '#FF2E9A' }}
      />

      <div className="max-w-5xl w-full mx-auto relative z-10 flex flex-col gap-14 sm:gap-20">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <h2 className="font-pixel text-2xl sm:text-4xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Event Schedule
          </h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#2ED3E8] to-transparent shadow-[0_0_12px_#2ED3E8]" />
          <p className="text-white/60 text-xs sm:text-sm font-medium tracking-wide max-w-md pt-1">
            24 continuous hours of creation, mentorship & innovation.
          </p>
        </div>

        {/* ── Seamless Central Track Timeline ── */}
        <div className="relative w-full">
          {/* Background vertical line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-[#1b1030] rounded-full" />

          {/* Glowing Animated Gradient Fill Line */}
          <div
            ref={lineFillRef}
            className="absolute left-6 md:left-1/2 top-4 w-1 -translate-x-1/2 bg-gradient-to-b from-[#2ED3E8] via-[#FF2E9A] to-[#2ED3E8] rounded-full shadow-[0_0_12px_rgba(46,211,232,0.8)]"
            style={{ height: '0%' }}
          />

          {/* Timeline Items */}
          <div className="flex flex-col gap-8 sm:gap-12 relative z-10">
            {schedule.map((item, index) => {
              const isEven = index % 2 === 0
              const isPink = item.color === '#FF2E9A'

              return (
                <div
                  key={item.id}
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
                      className="timeline-card-box group relative p-6 sm:p-7 rounded-xl transition-all duration-300 hover:-translate-y-1 cursor-default"
                      style={{
                        background:
                          'linear-gradient(165deg, rgba(16, 12, 32, 0.95) 0%, rgba(8, 6, 18, 0.98) 100%)',
                        border: '2px solid',
                        borderColor: isPink ? 'rgba(255,46,154,0.35)' : 'rgba(46,211,232,0.35)',
                        boxShadow: isPink
                          ? '0 8px 24px rgba(0,0,0,0.6), 0 0 20px rgba(255,46,154,0.12)'
                          : '0 8px 24px rgba(0,0,0,0.6), 0 0 20px rgba(46,211,232,0.12)',
                      }}
                    >
                      {/* Top Accent Strip */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
                        style={{
                          background: item.color,
                          boxShadow: `0 0 8px ${item.color}`,
                        }}
                      />

                      {/* Header tags */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span
                          className="font-pixel text-[0.6rem] tracking-wider uppercase font-bold"
                          style={{ color: item.color }}
                        >
                          {item.day}
                        </span>

                        <span
                          className="font-mono text-[0.65rem] px-2.5 py-0.5 rounded-full border"
                          style={{
                            color: item.color,
                            borderColor: `${item.color}40`,
                            background: `${item.color}15`,
                          }}
                        >
                          {item.time}
                        </span>
                      </div>

                      {/* Session Subtitle */}
                      <h4 className="text-white font-bold text-base sm:text-lg mb-1 leading-snug">
                        {item.title}
                      </h4>

                      <p
                        className="text-xs font-semibold tracking-wider uppercase mb-2"
                        style={{ color: isPink ? '#FF2E9A' : '#2ED3E8' }}
                      >
                        {item.session}
                      </p>

                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Numbered Center Milestone Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center">
                    <div
                      className="timeline-node-circle w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-pixel text-xs sm:text-sm font-bold text-white transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: '#0d061c',
                        border: `2.5px solid ${item.color}`,
                        boxShadow: `0 0 16px ${item.color}80, inset 0 0 8px ${item.color}40`,
                        color: item.color,
                      }}
                    >
                      {item.id}
                    </div>
                  </div>

                  {/* Empty Spacer Column for Desktop Alternate Grid */}
                  <div className="hidden md:block md:w-[46%]" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
