import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    q: 'Who is eligible to participate in Hackatopia?',
    a: 'Hackatopia is open to undergraduate & postgraduate students from all recognized universities and colleges. Cross-college and interdisciplinary teams are fully permitted.',
    color: '#2ED3E8',
  },
  {
    q: 'What is the team size limit?',
    a: 'Teams can have between 2 to 4 members. Solo participants are also welcome, but building in teams is strongly encouraged.',
    color: '#FF2E9A',
  },
  {
    q: 'Is there a registration fee?',
    a: 'Registration is free during the initial submission round. Shortlisted teams selected for the on-campus 24-hour finale will have a nominal registration fee of ₹1,000 per team, covering meals, workspace, mentorship, and delegate kit.',
    color: '#2ED3E8',
  },
  {
    q: 'What should I bring to the on-site hackathon?',
    a: 'Bring your laptop, chargers, valid college ID cards, any hardware components you plan to use, and personal essentials for the 24-hour overnight stay.',
    color: '#FF2E9A',
  },
  {
    q: 'Will accommodation and food be provided?',
    a: 'Yes! High-speed internet, dedicated workspace, all meals, midnight snacks, energy drinks, and rest areas will be provided at the venue.',
    color: '#2ED3E8',
  },
  {
    q: 'Can we use pre-built projects or codebases?',
    a: 'No. All code must be written during the 24-hour hackathon sprint. You can use open-source libraries, APIs, frameworks, and pre-existing design systems/wireframes.',
    color: '#FF2E9A',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const listRef = useRef(null)

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([headerRef.current, listRef.current], { opacity: 1, y: 0 })
        return
      }

      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )

      // FAQ items entrance
      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 82%',
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
      id="faq"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 lg:px-12 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a14 0%, #0c0824 50%, #0a0a14 100%)',
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

      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col gap-12 sm:gap-16">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center space-y-4">
          <span className="font-pixel text-[0.65rem] sm:text-xs tracking-[0.25em] text-[#2ED3E8] uppercase px-3 py-1.5 rounded-sm bg-[#2ED3E8]/10 border border-[#2ED3E8]/30 shadow-[0_0_12px_rgba(46,211,232,0.2)]">
            QUEST LOG
          </span>

          <h2 className="font-pixel text-2xl sm:text-4xl lg:text-5xl leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Questions? Answered.
          </h2>

          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Everything you need to know before entering the arena.
          </p>
        </div>

        {/* FAQ Accordion List in Blue & Pink */}
        <div ref={listRef} className="flex flex-col gap-4 w-full">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            const activeColor = faq.color

            return (
              <div
                key={idx}
                className="faq-item group rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: 'linear-gradient(165deg, rgba(16,12,34,0.9) 0%, rgba(8,6,20,0.97) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1.5px solid',
                  borderColor: isOpen ? activeColor : 'rgba(255,255,255,0.1)',
                  boxShadow: isOpen
                    ? `0 12px 32px rgba(0,0,0,0.7), 0 0 25px ${activeColor}35, inset 0 1px 0 rgba(255,255,255,0.15)`
                    : '0 8px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
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
                      className="font-pixel text-xs font-bold px-2 py-0.5 rounded-lg"
                      style={{
                        color: activeColor,
                        background: `${activeColor}18`,
                        border: `1px solid ${activeColor}40`,
                      }}
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

                  {/* Smooth Rotating Chevron */}
                  <div
                    className="w-8 h-8 flex-shrink-0 rounded-xl flex items-center justify-center border transition-all duration-300"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      background: isOpen ? `${activeColor}25` : 'rgba(255,255,255,0.05)',
                      color: isOpen ? activeColor : 'rgba(255,255,255,0.6)',
                      borderColor: isOpen ? activeColor : 'rgba(255,255,255,0.15)',
                      boxShadow: isOpen ? `0 0 12px ${activeColor}40` : 'none',
                    }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Smooth Expandable Body */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out px-5 sm:px-6 ${
                    isOpen ? 'max-h-60 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'
                  }`}
                >
                  <p
                    className="text-white/75 text-xs sm:text-sm leading-relaxed pl-6 border-l-2 font-medium"
                    style={{ borderColor: `${activeColor}70` }}
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
