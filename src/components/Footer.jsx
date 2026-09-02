import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Domains', href: '#domains' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Coordinators', href: '#coordinators' },
  { label: 'Location', href: '#map' },
]

export default function Footer() {
  const footerRef = useRef(null)
  const logoStripRef = useRef(null)
  const columnsRef = useRef(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([logoStripRef.current, columnsRef.current], { opacity: 1, y: 0 })
        return
      }

      if (logoStripRef.current) {
        gsap.fromTo(
          logoStripRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: logoStripRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }

      if (columnsRef.current) {
        gsap.fromTo(
          columnsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: columnsRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }
    }, footer)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative pt-16 pb-12 px-6 lg:px-16 overflow-hidden bg-[#06060c] text-white"
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e5ff]/40 to-transparent" />

      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col gap-12 sm:gap-14">

        {/* ── 3 Big Organiser Logos (No Labels, Clean & Large) ── */}
        <div
          ref={logoStripRef}
          className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/[0.08] opacity-0"
        >
          <span className="font-pixel text-xs sm:text-sm tracking-[0.25em] text-white/50 uppercase">
            Organised by
          </span>

          <div className="flex items-center flex-wrap justify-center gap-10 sm:gap-16">
            {/* 1. Big YIT Logo */}
            <div className="group cursor-default transition-transform duration-300 hover:scale-105" title="Yenepoya Institute of Technology">
              <svg className="h-12 sm:h-14 w-auto drop-shadow-[0_0_15px_rgba(0,229,255,0.25)]" viewBox="0 0 160 50" fill="none">
                <rect x="2" y="2" width="46" height="46" rx="10" fill="rgba(0, 229, 255, 0.08)" stroke="#00e5ff" strokeWidth="2" />
                <text x="25" y="32" textAnchor="middle" fill="#00e5ff" style={{ fontFamily: 'monospace', fontSize: '20px', fontWeight: 900, letterSpacing: '-1px' }}>
                  YIT
                </text>
                <text x="60" y="24" fill="#ffffff" style={{ fontFamily: 'system-ui, sans-serif', fontSize: '15px', fontWeight: 800, letterSpacing: '1px' }}>
                  YENEPOYA
                </text>
                <text x="60" y="38" fill="rgba(255,255,255,0.55)" style={{ fontFamily: 'system-ui, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px' }}>
                  INSTITUTE OF TECH
                </text>
              </svg>
            </div>

            {/* 2. Big IEEE Logo */}
            <div className="group cursor-default transition-transform duration-300 hover:scale-105" title="IEEE Student Branch">
              <svg className="h-12 sm:h-14 w-auto drop-shadow-[0_0_15px_rgba(0,170,255,0.25)]" viewBox="0 0 150 50" fill="none">
                <path d="M25 4L45 25L25 46L5 25L25 4Z" fill="rgba(0, 170, 255, 0.08)" stroke="#00aaff" strokeWidth="2" />
                <circle cx="25" cy="25" r="5" fill="#00aaff" />
                <line x1="25" y1="12" x2="25" y2="38" stroke="#00aaff" strokeWidth="1.5" />
                <line x1="12" y1="25" x2="38" y2="25" stroke="#00aaff" strokeWidth="1.5" />
                <text x="56" y="34" fill="#00aaff" style={{ fontFamily: 'serif', fontSize: '26px', fontWeight: 900, letterSpacing: '2px' }}>
                  IEEE
                </text>
              </svg>
            </div>

            {/* 3. Big Cybernauts × YenCoders Logo */}
            <div className="group cursor-default transition-transform duration-300 hover:scale-105" title="Cybernauts × YenCoders">
              <svg className="h-12 sm:h-14 w-auto drop-shadow-[0_0_15px_rgba(255,46,166,0.25)]" viewBox="0 0 200 50" fill="none">
                <circle cx="24" cy="25" r="18" fill="rgba(255, 46, 166, 0.08)" stroke="#FF2E9A" strokeWidth="2" />
                <circle cx="24" cy="25" r="5" fill="#FF2E9A" />
                <path d="M24 7v6M24 37v6M6 25h6M36 25h6" stroke="#FF2E9A" strokeWidth="2" strokeLinecap="round" />
                <text x="52" y="24" fill="#FF2E9A" style={{ fontFamily: 'system-ui, sans-serif', fontSize: '14px', fontWeight: 900, letterSpacing: '1.5px' }}>
                  CYBERNAUTS
                </text>
                <text x="52" y="38" fill="#ffffff" style={{ fontFamily: 'monospace', fontSize: '10px', fontWeight: 700, letterSpacing: '2px' }}>
                  × YENCODERS
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* ── 3-Column Clean Spacious Layout ── */}
        <div ref={columnsRef} className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 items-start">

          {/* Col 1: Contact Information */}
          <div className="space-y-4 opacity-0">
            <h4 className="font-pixel text-sm sm:text-base text-[#00e5ff] tracking-wider">
              Contact
            </h4>

            <div className="space-y-3 text-sm font-mono">
              <div>
                <span className="text-white/40 text-xs uppercase tracking-wider block mb-0.5">Email</span>
                <a href="mailto:hackatopia@gmail.com" className="text-white/80 hover:text-[#00e5ff] transition-colors">
                  hackatopia@gmail.com
                </a>
              </div>

              <div>
                <span className="text-white/40 text-xs uppercase tracking-wider block mb-0.5">Venue</span>
                <span className="text-white/70 leading-relaxed block">
                  Yenepoya Institute of Technology,<br />
                  Moodbidri, Mangalore – 574 225
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4 opacity-0">
            <h4 className="font-pixel text-sm sm:text-base text-[#00e5ff] tracking-wider">
              Quick Links
            </h4>

            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/65 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]/40 group-hover:bg-[#00e5ff] transition-colors flex-shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Follow Us */}
          <div className="space-y-4 opacity-0">
            <h4 className="font-pixel text-sm sm:text-base text-[#00e5ff] tracking-wider">
              Follow Us
            </h4>

            <div className="pt-1">
              <a
                href="https://instagram.com/hackatopia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Follow Hackatopia on Instagram"
                className="group inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-[#FF2E9A] transition-all duration-300 shadow-[0_0_18px_rgba(255,46,154,0.15)] hover:shadow-[0_0_28px_rgba(255,46,154,0.45)]"
              >
                {/* Vivid Instagram Gradient */}
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200 shadow-md">
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <span className="text-sm font-bold text-white/90 group-hover:text-[#FF2E9A] transition-colors font-mono tracking-wide">
                  @hackatopia
                </span>
              </a>
            </div>

            {/* Tagline */}
            <p className="text-xs text-white/35 font-mono leading-relaxed pt-2">
              CODE · COLLABORATE · CREATE
            </p>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-6 border-t border-white/[0.08]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.65rem] text-white/35 font-mono">
            <p>© 2026 Yenepoya Institute of Technology · Cybernauts × YenCoders · IEEE YIT Student Branch</p>
            <p className="text-white/25">All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
