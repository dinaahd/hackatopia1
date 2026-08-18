import { useScrollReveal } from '../hooks/useScrollReveal'

const pillars = [
  { icon: '🌐', label: 'Innovation' },
  { icon: '🔧', label: 'Engineering' },
  { icon: '🎨', label: 'Design' },
  { icon: '🤝', label: 'Impact' },
]

export default function About() {
  const containerRef = useScrollReveal()

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d052e 0%, #100630 100%)' }}
    >
      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,229,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Side glow orbs */}
      <div className="orb w-80 h-80 bg-fuchsia-600/10 top-20 -left-20"
           style={{ animationDuration: '9s' }} />
      <div className="orb w-60 h-60 bg-cyan-500/10 bottom-20 -right-10"
           style={{ animationDuration: '7s', animationDelay: '3s' }} />

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left — text */}
        <div className="space-y-6">

          <h2
            className="sr-hidden sr-delay-1 font-pixel text-2xl md:text-3xl leading-snug
                       bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent"
          >
            About<br/>Hackatopia
          </h2>

          <p className="sr-hidden sr-delay-2 text-white/70 leading-relaxed text-sm md:text-base">
            Hackatopia is the flagship national-level hackathon hosted by the Department of
            Computer Science & Engineering at <span className="text-cyan-400 font-semibold">XYZ Institute of Technology</span>.
            We bring together the sharpest minds from across the country to solve real-world
            problems through technology, creativity, and collaboration — all within 24 relentless hours.
          </p>

          <p className="sr-hidden sr-delay-3 text-white/70 leading-relaxed text-sm md:text-base">
            The theme <span className="text-fuchsia-400 font-semibold italic">"Utopia"</span> asks
            a bold question: what does the ideal future look like, and how do we build it today?
            Participants will explore domains spanning AI & ML, sustainable tech, FinTech, and social
            good — designing solutions that don't just work, but truly matter.
          </p>

          <p className="sr-hidden sr-delay-4 text-white/60 text-sm border-l-2 border-cyan-400 pl-4 italic">
            Open to all undergraduate students nationwide — no experience required, just the drive to build.
          </p>

          <div className="sr-hidden sr-delay-5">
            <a href="#domains" className="btn-arcade btn-arcade-cyan text-xs px-6 py-3">
              Explore Domains →
            </a>
          </div>
        </div>

        {/* Right — pillar cards */}
        <div className="grid grid-cols-2 gap-4">
          {pillars.map((p, i) => (
            <div
              key={p.label}
              className={`sr-hidden sr-delay-${i + 2} pixel-arcade-card
                          flex flex-col items-center gap-3 py-8 px-4 text-center
                          transition-all duration-300 group`}
            >
              <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                {p.icon}
              </span>
              <span className="text-white/80 font-semibold text-sm tracking-wide">
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
