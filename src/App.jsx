import heroImg from './assets/logo.png'
import Navbar from './components/Navbar'
import Cubes from './components/Cubes/CubesGrid'
import Summary from './components/Summary'
import About from './components/About'
import Domains from './components/Domains'
import Rules from './components/Rules'
import Sponsors from './components/Sponsors'
import Coordinators from './components/Coordinators'
import Timeline from './components/Timeline'
import MapAddress from './components/MapAddress'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

function App() {
  return (
    <>
      {/* SEO meta handled via index.html; page described by semantic sections below */}
      <main className="relative min-h-screen bg-[#080220] text-white overflow-x-hidden">
        <Navbar />

        {/* ── 2. Hero ─────────────────────────────────── */}
        <section
          id="home"
          className="relative flex flex-col items-center justify-center min-h-screen w-full h-screen overflow-hidden pt-16 px-6"
        >
          {/* Cubes background layer — covers whole 100vw and 100vh window */}
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

          {/* Scattered star/particle decoration */}
          <span className="absolute top-[15%] left-[10%] h-1.5 w-1.5 rounded-full bg-orange-400/70" />
          <span className="absolute top-[30%] left-[5%] h-1 w-1 rounded-full bg-white/60" />
          <span className="absolute top-[60%] left-[8%] h-1 w-1 rounded-full bg-fuchsia-400/60" />
          <span className="absolute top-[20%] right-[10%] h-1 w-1 rounded-full bg-white/50" />
          <span className="absolute top-[45%] right-[6%] h-1.5 w-1.5 rounded-full bg-orange-400/70" />
          <span className="absolute bottom-[15%] right-[12%] h-1 w-1 rounded-full bg-cyan-300/60" />
          <span className="absolute bottom-[10%] left-[15%] h-1 w-1 rounded-full bg-white/50" />

          {/* Hero Content Container — pointer-events-none allows clicks on logo & backdrop to trigger cubes behind */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto px-4 pointer-events-none">
            {/* Centered Logo */}
            <img
              src={heroImg}
              alt="Hackatopia"
              className="hero-logo-enhanced w-full max-w-md md:max-w-xl lg:max-w-2xl object-contain select-none pointer-events-none"
            />

            {/* Subtitle / Tagline */}
            <p className="mt-4 text-white/85 text-xs md:text-sm font-medium tracking-[0.22em] uppercase drop-shadow-md pointer-events-none">
              March 14–15, 2027 • 24 Hours of Creation
            </p>

            {/* Retro 3D Arcade Action Buttons */}
            <div className="mt-6 flex items-center justify-center gap-4 flex-wrap pointer-events-auto">
              <a
                href="#register"
                className="btn-arcade btn-arcade-pink text-xs md:text-sm px-7 py-3.5"
              >
                🚀 Register Now
              </a>
              <a
                href="#about"
                className="btn-arcade btn-arcade-cyan text-xs md:text-sm px-7 py-3.5"
              >
                Explore Utopia →
              </a>
            </div>
          </div>

          {/* Hero scroll hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none">
            <span className="font-pixel text-[0.5rem] text-white/40 tracking-widest">SCROLL</span>
            <div className="w-px h-6 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
          </div>
        </section>

        {/* ── 4. Summary ──────────────────────────────── */}
        <Summary />

        {/* ── 5. About ────────────────────────────────── */}
        <About />

        {/* ── 6. Domains ──────────────────────────────── */}
        <Domains />

        {/* ── 7. Rules ────────────────────────────────── */}
        <Rules />

        {/* ── 8. Sponsors ─────────────────────────────── */}
        <Sponsors />

        {/* ── 9. Coordinators ─────────────────────────── */}
        <Coordinators />

        {/* ── 10. Timeline ────────────────────────────── */}
        <Timeline />

        {/* ── 11. Map & Address ───────────────────────── */}
        <MapAddress />

        {/* ── 12. FAQ ─────────────────────────────────── */}
        <FAQ />

        {/* ── 13. Footer / Contact ────────────────────── */}
        <Footer />
      </main>
    </>
  )
}

export default App