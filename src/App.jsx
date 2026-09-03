import { useEffect, useState, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroImg from './assets/logo.png'
import Navbar from './components/Navbar'
import Cubes from './components/Cubes/CubesGrid'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import About from './components/About'
import Domains from './components/Domains'
import Rules from './components/Rules'
import Timeline from './components/Timeline'
import Sponsors from './components/Sponsors'
import FAQ from './components/FAQ'
import Coordinators from './components/Coordinators'
import MapAddress from './components/MapAddress'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [loading, setLoading] = useState(true)
  const heroContentRef = useRef(null)
  const heroLogoRef = useRef(null)
  const heroTaglineRef = useRef(null)
  const heroButtonsRef = useRef(null)

  // Initialize Lenis Smooth Scroll connected to GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const updateLenis = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [])

  // Hero entrance animation when loading finishes
  useEffect(() => {
    if (loading) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      if (heroLogoRef.current) {
        tl.fromTo(
          heroLogoRef.current,
          { opacity: 0, scale: 0.85, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'back.out(1.4)' }
        )
      }

      if (heroTaglineRef.current) {
        tl.fromTo(
          heroTaglineRef.current,
          { opacity: 0, y: 18, letterSpacing: '0.35em' },
          { opacity: 1, y: 0, letterSpacing: '0.22em', duration: 0.75 },
          '-=0.5'
        )
      }

      if (heroButtonsRef.current) {
        tl.fromTo(
          heroButtonsRef.current.children,
          { opacity: 0, y: 22, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.6)' },
          '-=0.4'
        )
      }
    })

    return () => ctx.revert()
  }, [loading])

  return (
    <>
      {/* Interactive Global Voxel Cursor for desktop */}
      <CustomCursor />

      {/* Assembly Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <main className="relative min-h-screen bg-[#0a0a14] text-white overflow-x-hidden">
        {/* ── 1. NAVBAR & MENU ────── */}
        <Navbar />

        {/* ── 2. HERO SECTION ─────────────── */}
        <section
          id="home"
          className="relative flex flex-col items-center justify-center min-h-[100svh] min-h-screen w-full overflow-hidden pt-20 pb-12 sm:py-16 px-4 sm:px-6"
        >
          {/* Cubes interactive background layer */}
          <div className="absolute inset-0 z-0 w-full h-full min-h-screen flex items-center justify-center pointer-events-auto overflow-hidden">
            <Cubes
              gridSize={12}
              maxAngle={0}
              radius={4}
              cellGap={8}
              borderStyle="1.5px dashed rgba(0, 229, 255, 0.28)"
              faceColor="#08031a"
              rippleSpeed={1.5}
              rippleOnClick
            />
          </div>

          {/* Scattered particle atmosphere */}
          <span className="absolute top-[15%] left-[10%] h-1.5 w-1.5 rounded-full bg-orange-400/70 pointer-events-none" />
          <span className="absolute top-[30%] left-[5%] h-1 w-1 rounded-full bg-white/60 pointer-events-none" />
          <span className="absolute top-[60%] left-[8%] h-1 w-1 rounded-full bg-fuchsia-400/60 pointer-events-none" />
          <span className="absolute top-[20%] right-[10%] h-1 w-1 rounded-full bg-white/50 pointer-events-none" />
          <span className="absolute top-[45%] right-[6%] h-1.5 w-1.5 rounded-full bg-orange-400/70 pointer-events-none" />
          <span className="absolute bottom-[15%] right-[12%] h-1 w-1 rounded-full bg-cyan-300/60 pointer-events-none" />
          <span className="absolute bottom-[10%] left-[15%] h-1 w-1 rounded-full bg-white/50 pointer-events-none" />

          {/* Hero Content Container */}
          <div
            ref={heroContentRef}
            className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto px-2 sm:px-4 pointer-events-none w-full"
          >
            {/* Centered Logo */}
            <img
              ref={heroLogoRef}
              src={heroImg}
              alt="Hackatopia"
              className="hero-logo-enhanced w-full max-w-[280px] xs:max-w-[320px] sm:max-w-md md:max-w-xl lg:max-w-2xl object-contain select-none pointer-events-none"
            />

            {/* Subtitle / Tagline */}
            <p
              ref={heroTaglineRef}
              className="mt-3 sm:mt-4 text-white/85 text-[0.7rem] sm:text-xs md:text-sm font-medium tracking-[0.18em] sm:tracking-[0.22em] uppercase drop-shadow-md pointer-events-none"
            >
              October 8-9, 2026 • 24 Hours of Creation
            </p>

            {/* Retro 3D Arcade Action Buttons */}
            <div
              ref={heroButtonsRef}
              className="mt-6 sm:mt-7 flex items-center justify-center gap-3.5 sm:gap-5 flex-wrap pointer-events-auto w-full max-w-xs sm:max-w-none"
            >
              <a
                href="https://forms.gle/vso2h1azUy2k3MkPA"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-arcade btn-arcade-pink text-xs sm:text-sm px-6 sm:px-8 py-3.5 sm:py-4 w-full sm:w-auto text-center"
              >
                REGISTER NOW
              </a>
              <a
                href="#about"
                className="btn-arcade btn-arcade-cyan text-xs sm:text-sm px-6 sm:px-8 py-3.5 sm:py-4 w-full sm:w-auto text-center"
              >
                EXPLORE BROCHURE
              </a>
            </div>
          </div>
        </section>

        {/* ── 3. ABOUT ──────────────── */}
        <About />

        {/* ── 4. TRACKS ─────────────── */}
        <Domains />

        {/* ── 5. RULES ──────────────── */}
        <Rules />

        {/* ── 6. TIMELINE ───────────── */}
        <Timeline />

        {/* ── 7. SPONSORS ───────────── */}
        <Sponsors />

        {/* ── 8. FAQ ────────────────── */}
        <FAQ />
        {/* ── 9. COORDINATORS ───────── */}
        <Coordinators />


        {/* ── 10. MAP & ADDRESS ─────── */}
        <MapAddress />

        {/* ── 11. FOOTER ────────────── */}
        <Footer />
      </main>
    </>
  )
}

export default App