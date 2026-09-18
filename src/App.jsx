import { useEffect, useState, useRef, Suspense, lazy } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroImg from './assets/logo.webp'
import Navbar from './components/Navbar'
import Cubes from './components/Cubes/CubesGrid'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'

// Code-split all below-the-fold sections for instant initial paint & minimal bundle
const About = lazy(() => import('./components/About'))
const Domains = lazy(() => import('./components/Domains'))
const Rules = lazy(() => import('./components/Rules'))
const Timeline = lazy(() => import('./components/Timeline'))
const Sponsors = lazy(() => import('./components/Sponsors'))
const FAQ = lazy(() => import('./components/FAQ'))
const Coordinators = lazy(() => import('./components/Coordinators'))
const MapAddress = lazy(() => import('./components/MapAddress'))
const Footer = lazy(() => import('./components/Footer'))

gsap.registerPlugin(ScrollTrigger)


/**
 * VideoBackground – lightweight video behind post-Hero content.
 * Defers rendering the <video> element completely until scrolled near #about,
 * saving multiple megabytes of bandwidth on initial page load.
 */
function VideoBackground() {
  const videoRef = useRef(null)
  const wrapperRef = useRef(null)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)

  useEffect(() => {
    if (!wrapperRef.current) return

    gsap.set(wrapperRef.current, { opacity: 0 })

    const st = ScrollTrigger.create({
      trigger: '#home',
      start: 'bottom 95%',
      end: 'bottom 40%',
      scrub: 0.3,
      onEnter: () => {
        setShouldLoadVideo(true)
      },
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
      {shouldLoadVideo && (
        <video
          ref={videoRef}
          className="video-bg-element"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          tabIndex={-1}
        >
          <source src="/desktop.mp4" type="video/mp4" />
        </video>
      )}
      <div className="video-bg-overlay" />
    </div>
  )
}

function App() {
  // On mobile screens, disable full-screen blocking preloader so Hero paints on frame 1
  const [loading, setLoading] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth >= 768 && !window.matchMedia('(pointer: coarse)').matches
  })

  const heroContentRef = useRef(null)
  const heroLogoRef = useRef(null)
  const heroTaglineRef = useRef(null)
  const heroButtonsRef = useRef(null)

  // Initialize Lenis Smooth Scroll connected to GSAP ScrollTrigger for Desktop
  // Initialize Lenis Smooth Scroll connected to GSAP ScrollTrigger for Desktop only
  // On mobile touch devices, native momentum scroll is faster, GPU-accelerated, and eliminates 33s of main-thread ticker work
  useEffect(() => {
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isMobile || prefersReducedMotion) return

    let lenis = null
    let updateLenis = null
    let destroyed = false

    import('lenis').then(({ default: LenisModule }) => {
      if (destroyed) return
      lenis = new LenisModule({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.8,
      })

      window.__lenis = lenis
      lenis.on('scroll', ScrollTrigger.update)

      updateLenis = (time) => {
        lenis.raf(time * 1000)
      }

      gsap.ticker.add(updateLenis)
      // Smooth out lag spikes when switching tabs (e.g. viewing PDF in another tab)
      gsap.ticker.lagSmoothing(500, 33)
    })

    const onLenisStop = () => {
      if (lenis) lenis.stop()
    }
    const onLenisStart = () => {
      if (lenis) lenis.start()
    }
    const onVisibilityChange = () => {
      if (document.hidden) {
        if (lenis) lenis.stop()
      } else {
        if (lenis) lenis.start()
      }
    }

    window.addEventListener('lenis:stop', onLenisStop)
    window.addEventListener('lenis:start', onLenisStart)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      destroyed = true
      window.removeEventListener('lenis:stop', onLenisStop)
      window.removeEventListener('lenis:start', onLenisStart)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      if (updateLenis) gsap.ticker.remove(updateLenis)
      if (lenis) {
        lenis.destroy()
        window.__lenis = null
      }
    }
  }, [])

  // Hero entrance animation (non-blocking, logo visible on frame 1)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      if (heroLogoRef.current) {
        tl.from(heroLogoRef.current, { scale: 0.95, y: 15, duration: 0.8, ease: 'back.out(1.4)' })
      }

      if (heroTaglineRef.current) {
        tl.from(heroTaglineRef.current, { opacity: 0.5, y: 10, duration: 0.6 }, '-=0.4')
      }

      if (heroButtonsRef.current) {
        tl.from(heroButtonsRef.current.children, { opacity: 0.5, y: 15, duration: 0.5, stagger: 0.08 }, '-=0.3')
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Interactive Global Voxel Cursor for desktop */}
      <CustomCursor />

      {/* Assembly Preloader for desktop */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* ── VIDEO BACKGROUND (deferred rendering, behind everything; skipped on mobile) ── */}
      {!(typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches)) && (
        <VideoBackground />
      )}

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
            {/* Centered Logo with explicit dimensions & high priority for LCP */}
            <img
              ref={heroLogoRef}
              src={heroImg}
              alt="Hackatopia 2026"
              width="672"
              height="250"
              fetchPriority="high"
              decoding="async"
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
                href="/rulebook.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-arcade btn-arcade-amber text-[0.65rem] sm:text-sm px-5 sm:px-8 py-3 sm:py-4 w-full sm:w-auto text-center"
              >
                RULE BOOK
              </a>
            </div>
          </div>
        </section>

        {/* ── BELOW-THE-FOLD SECTIONS (Lazy loaded with smooth fallback) ──── */}
        <Suspense fallback={<div className="min-h-[160px] flex items-center justify-center text-[#00e5ff]/40 font-pixel text-xs">LOADING REALM...</div>}>
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
        </Suspense>
      </main>
    </>
  )
}

export default App