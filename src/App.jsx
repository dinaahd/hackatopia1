import { useEffect, useState, useRef, useCallback } from 'react'
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

/**
 * VideoBackground – renders a fixed video behind all post-Hero content.
 * Respects prefers-reduced-motion by pausing the video and showing a
 * static frame instead.
 */
function VideoBackground() {
  const videoRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handle = () => {
      if (!videoRef.current) return
      if (mq.matches) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch(() => {})
      }
    }
    handle()
    mq.addEventListener('change', handle)
    return () => mq.removeEventListener('change', handle)
  }, [])

  useEffect(() => {
    if (!wrapperRef.current) return

    // Initially hide video on Hero (1st page) so square animation is fully visible
    gsap.set(wrapperRef.current, { opacity: 0 })

    const st = ScrollTrigger.create({
      trigger: '#about',
      start: 'top 95%',
      end: 'top 40%',
      scrub: 0.3,
      onUpdate: (self) => {
        if (wrapperRef.current) {
          wrapperRef.current.style.opacity = String(self.progress)
        }
      },
    })

    return () => st.kill()
  }, [])

  return (
    <div ref={wrapperRef} className="video-bg-wrapper" aria-hidden="true" style={{ opacity: 0 }}>
      <video
        ref={videoRef}
        className="video-bg-element"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        tabIndex={-1}
      >
        <source src="/background.mov" type="video/quicktime" />
        <source src="/background.mov" type="video/mp4" />
        <source src="/desktop.mp4" type="video/mp4" />
      </video>
      {/* Minimal overlay for text readability */}
      <div className="video-bg-overlay" />
    </div>
  )
}

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

    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const updateLenis = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    const onLenisStop = () => {
      lenis.stop()
    }
    const onLenisStart = () => {
      lenis.start()
    }

    window.addEventListener('lenis:stop', onLenisStop)
    window.addEventListener('lenis:start', onLenisStart)

    return () => {
      window.removeEventListener('lenis:stop', onLenisStop)
      window.removeEventListener('lenis:start', onLenisStart)
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
      window.__lenis = null
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

      {/* ── VIDEO BACKGROUND (fixed viewport-filling, behind everything) ── */}
      <VideoBackground />

      {/* ── 1. NAVBAR & MENU (top-level fixed, z-[100]+ above all layers) ── */}
      <Navbar />

      <main className="relative min-h-screen bg-transparent text-white overflow-x-hidden" style={{ zIndex: 1 }}>
        {/* ── 2. HERO SECTION ─────────────── */}
        <section
          id="home"
          className="relative flex flex-col items-center justify-center min-h-[100svh] min-h-screen w-full overflow-hidden pt-20 sm:pt-24 pb-8 sm:pb-12 px-3 sm:px-6"
          style={{ background: '#080220', zIndex: 2 }}
        >
          {/* Cubes interactive background layer – starts from the very top of the page */}
          <div className="absolute inset-0 z-0 w-full h-full pointer-events-auto overflow-hidden">
            <Cubes
              gridCols={24}
              gridRows={14}
              cellGap={4}
              borderStyle="1px dashed rgba(0, 229, 255, 0.45)"
              faceColor="rgba(8, 3, 26, 0.85)"
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
              className="hero-logo-enhanced w-full max-w-[240px] sm:max-w-md md:max-w-xl lg:max-w-2xl object-contain select-none pointer-events-none"
            />

            {/* Subtitle / Tagline */}
            <p
              ref={heroTaglineRef}
              className="mt-2 sm:mt-4 text-white/85 text-[0.6rem] sm:text-xs md:text-sm font-medium tracking-[0.12em] sm:tracking-[0.22em] uppercase drop-shadow-md pointer-events-none"
            >
              October 8-9, 2026 • 24 Hours of Creation
            </p>

            {/* Retro 3D Arcade Action Buttons */}
            <div
              ref={heroButtonsRef}
              className="mt-4 sm:mt-7 flex items-center justify-center gap-2.5 sm:gap-5 flex-wrap pointer-events-auto w-full max-w-[280px] sm:max-w-none"
            >
              <a
                href="https://forms.gle/vso2h1azUy2k3MkPA"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-arcade btn-arcade-pink text-[0.65rem] sm:text-sm px-5 sm:px-8 py-3 sm:py-4 w-full sm:w-auto text-center"
              >
                REGISTER NOW
              </a>
              <a
                href="#about"
                className="btn-arcade btn-arcade-cyan text-[0.65rem] sm:text-sm px-5 sm:px-8 py-3 sm:py-4 w-full sm:w-auto text-center"
              >
                BROCHURE
              </a>
              <a
                href="#rules"
                className="btn-arcade btn-arcade-amber text-[0.65rem] sm:text-sm px-5 sm:px-8 py-3 sm:py-4 w-full sm:w-auto text-center"
              >
                RULE BOOK
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