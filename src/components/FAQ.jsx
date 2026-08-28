import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    q: 'Who is eligible to participate in Hackatopia 2026?',
    a: 'Any currently enrolled undergraduate student (B.E., B.Tech, B.Sc, BCA, or equivalent) from any recognised college or university across the country is eligible. No prior hackathon experience required.',
    color: '#2ED3E8', // Blue
  },
  {
    q: 'What is the team size limit?',
    a: 'Teams can have up to 4 members. Solo builders are also welcome. Cross-college and cross-department teams are fully encouraged.',
    color: '#FF2E9A', // Pink
  },
  {
    q: 'Is there any registration fee?',
    a: 'Registration is free during the initial submission round. Shortlisted teams selected for the on-campus 24-hour finale will have a nominal registration fee of ₹1,000 per team, covering meals, workspace, mentorship, and delegate kit.',
    color: '#2ED3E8', // Blue
  },
  {
    q: 'What should I bring to the on-site hackathon?',
    a: 'Bring your student ID card (mandatory), laptop with charger, extension cord, hardware/microcontrollers if needed for your track, and your energy.',
    color: '#FF2E9A', // Pink
  },
  {
    q: 'How does the evaluation and judging work?',
    a: 'Projects will be evaluated by an expert jury across Innovation (25%), Technical Feasibility (25%), Execution & UI/UX (25%), and Presentation (25%). Shortlisted teams will give a 3-minute live pitch.',
    color: '#2ED3E8', // Blue
  },
  {
    q: 'Will accommodation and travel assistance be provided?',
    a: 'On-campus rest areas and accommodation are provided for outstation teams at Yenepoya Institute of Technology. Please indicate accommodation needs during registration.',
    color: '#FF2E9A', // Pink
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const listRef = useRef(null)

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

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
        gsap.set([headerRef.current, listRef.current], { opacity: 1, y: 0 })
        return
      }

      // Header entrance
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      )

      // FAQ items entrance
      if (listRef.current) {
        const items = listRef.current.querySelectorAll('.faq-item')
        tl.fromTo(
          items,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
          },
          '-=0.3'
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 lg:px-12 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a14 0%, #0c0824 50%, #0a0a14 100%)',
      }}
    >
      {/* Grid line background */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(46, 211, 232, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(46, 211, 232, 0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col gap-12 sm:gap-16">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center space-y-4 opacity-0">
          <span className="font-pixel text-[0.65rem] sm:text-xs tracking-[0.25em] text-[#2ED3E8] uppercase px-3 py-1.5 rounded-sm bg-[#2ED3E8]/10 border border-[#2ED3E8]/30 shadow-[0_0_12px_rgba(46,211,232,0.2)]">
            // QUEST LOG
          </span>

          <h2 className="font-pixel text-2xl sm:text-4xl lg:text-5xl leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Questions? Answered.
          </h2>

          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Everything you need to know before entering the arena.
          </p>
        </div>

        {/* Voxel Accordion List in Blue & Pink */}
        <div ref={listRef} className="flex flex-col gap-4 w-full">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            const activeColor = faq.color

            return (
              <div
                key={idx}
                className="faq-item group rounded-md overflow-hidden transition-all duration-200"
                style={{
                  background: 'linear-gradient(165deg, rgba(14,14,28,0.92) 0%, rgba(8,8,18,0.98) 100%)',
                  border: '2px solid',
                  borderColor: isOpen ? activeColor : 'rgba(255,255,255,0.08)',
                  boxShadow: isOpen
                    ? `0 6px 0 #000, 0 0 20px ${activeColor}30`
                    : '0 4px 0 #000',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className="font-pixel text-xs font-bold"
                      style={{ color: activeColor }}
                    >
                      0{idx + 1}
                    </span>
                    <span
                      className="font-pixel text-xs sm:text-sm text-white transition-colors leading-snug"
                      style={{
                        color: isOpen ? activeColor : '#fff',
                      }}
                    >
                      {faq.q}
                    </span>
                  </div>

                  {/* Voxel Rotating Chevron */}
                  <div
                    className="w-7 h-7 flex-shrink-0 rounded-[2px] flex items-center justify-center border transition-transform duration-300 font-pixel text-xs"
                    style={{
                      transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                      background: isOpen ? activeColor : 'rgba(255,255,255,0.05)',
                      color: isOpen ? '#000' : '#fff',
                      borderColor: isOpen ? activeColor : 'rgba(255,255,255,0.2)',
                    }}
                  >
                    ▶
                  </div>
                </button>

                {/* Smooth Expandable Body */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out px-5 sm:px-6 ${
                    isOpen ? 'max-h-60 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'
                  }`}
                >
                  <p
                    className="text-white/70 text-xs sm:text-sm leading-relaxed pl-7 border-l-2 font-medium"
                    style={{ borderColor: `${activeColor}60` }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
