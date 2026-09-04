import { useState, useEffect, useRef } from 'react'
import { Phone, GraduationCap, User, Copy, Check } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const facultyCoordinators = [
  {
    name: 'Mr. Manjunath Raikar',
    role: 'Faculty Coordinator',
    phone: '+91 9448922929',
    rawPhone: '+919448922929',
    color: '#00e5ff',
  },
  {
    name: 'Mr. Pandu Naik',
    role: 'Faculty Coordinator',
    phone: '+91 8197914952',
    rawPhone: '+918197914952',
    color: '#FF2E9A',
  },
]

const studentCoordinators = [
  {
    name: 'Noaman Nazeer Ahamed',
    role: 'Student Coordinator',
    phone: '+91 7829320282',
    rawPhone: '+917829320282',
    color: '#00e5ff',
  },
  {
    name: 'Soha Parveen',
    role: 'Student Coordinator',
    phone: '+91 8217086280',
    rawPhone: '+918217086280',
    color: '#FF2E9A',
  },
]

function CoordinatorCard({ person, isFaculty = false }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="coord-card group relative p-6 sm:p-7 rounded-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default"
      style={{
        background: 'linear-gradient(165deg, rgba(16, 12, 34, 0.9) 0%, rgba(8, 6, 20, 0.97) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1.5px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = person.color
        e.currentTarget.style.boxShadow = `0 18px 44px rgba(0, 0, 0, 0.8), 0 0 30px ${person.color}35, inset 0 1px 0 rgba(255, 255, 255, 0.25)`
        e.currentTarget.style.transform = 'translateY(-5px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.12)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Top Ambient Glow Line */}
      <div
        className="absolute top-0 left-8 right-8 h-[2px] opacity-80 group-hover:opacity-100 transition-opacity"
        style={{
          background: `linear-gradient(90deg, transparent, ${person.color}, transparent)`,
        }}
      />

      {/* Hover Ambient Inner Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, color-mix(in srgb, ${person.color} 20%, transparent) 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-3.5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm text-black flex-shrink-0 transition-transform duration-300 group-hover:scale-108"
            style={{
              background: person.color,
              boxShadow: `0 0 18px ${person.color}80, inset 0 1px 0 rgba(255,255,255,0.4)`,
            }}
          >
            {isFaculty ? (
              <GraduationCap className="w-6 h-6 text-black" />
            ) : (
              <User className="w-6 h-6 text-black" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-white font-bold text-base sm:text-lg tracking-tight group-hover:text-[#00e5ff] transition-colors truncate">
              {person.name}
            </h4>
            <p className="text-white/50 text-xs font-mono">{person.role}</p>
          </div>
        </div>

        {/* Phone contact bar */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <a
            href={`tel:${person.rawPhone}`}
            className="flex items-center gap-2.5 text-xs sm:text-sm text-white/85 hover:text-[#00e5ff] transition-colors font-mono font-medium group/link"
            title={`Call ${person.name}`}
          >
            <div className="w-6 h-6 rounded-lg bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center flex-shrink-0 group-hover/link:bg-[#00e5ff]/20">
              <Phone className="w-3.5 h-3.5 text-[#00e5ff]" />
            </div>
            <span>{person.phone}</span>
          </a>

          <button
            onClick={() => copyToClipboard(person.phone)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/50 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
            title="Copy Phone Number"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-[0.65rem]">Copied!</span>
              </>
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Coordinators() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const facultyRowRef = useRef(null)
  const studentRowRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([headerRef.current, facultyRowRef.current, studentRowRef.current], { opacity: 1, y: 0 })
        return
      }

      // Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }

      // Faculty Row entrance
      if (facultyRowRef.current) {
        const cards = facultyRowRef.current.querySelectorAll('.coord-card')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: facultyRowRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }

      // Student Row entrance
      if (studentRowRef.current) {
        const cards = studentRowRef.current.querySelectorAll('.coord-card')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: studentRowRef.current,
              start: 'top 80%',
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
      id="coordinators"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-6 lg:px-12 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a14 0%, #0c0824 50%, #0a0a14 100%)',
      }}
    >
      {/* Background Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 229, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col gap-14 sm:gap-16">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center space-y-4 opacity-0">
          <span className="font-pixel text-[0.65rem] sm:text-xs tracking-[0.25em] text-[#00e5ff] uppercase px-3.5 py-1.5 rounded-sm bg-[#00e5ff]/10 border border-[#00e5ff]/30 shadow-[0_0_12px_rgba(0,229,255,0.25)]">
            LEADERSHIP & ASSISTANCE
          </span>

          <h2 className="font-pixel text-2xl sm:text-4xl lg:text-5xl leading-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Event Coordinators
          </h2>

          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent shadow-[0_0_12px_#00e5ff]" />

          <p className="text-white/70 text-xs sm:text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
            Have questions regarding registrations, themes, or event rules? Reach out to our faculty & student coordinators.
          </p>
        </div>

        {/* 2-Section Grid (4 Faculty Coordinators & 4 Student Coordinators) */}
        <div className="space-y-12">
          {/* Row 1: Faculty Coordinators */}
          <div ref={facultyRowRef} className="space-y-5">
            <div className="flex items-center gap-3 pb-2 border-b border-white/10">
              <div className="w-2 h-2 rounded-[1px] bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
              <h3 className="font-pixel text-sm sm:text-base text-white tracking-wider">
                Faculty Coordinators
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {facultyCoordinators.map((person) => (
                <CoordinatorCard key={person.name} person={person} isFaculty={true} />
              ))}
            </div>
          </div>

          {/* Row 2: Student Coordinators */}
          <div ref={studentRowRef} className="space-y-5">
            <div className="flex items-center gap-3 pb-2 border-b border-white/10">
              <div className="w-2 h-2 rounded-[1px] bg-[#FF2E9A] shadow-[0_0_8px_#FF2E9A]" />
              <h3 className="font-pixel text-sm sm:text-base text-white tracking-wider">
                Student Coordinators
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {studentCoordinators.map((person) => (
                <CoordinatorCard key={person.name} person={person} isFaculty={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
