import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const domains = [
  {
    id: 'strategist',
    name: 'The Strategist',
    tagline: 'Turns plans into impact.',
    track: 'FinTech & Social Systems — reshape economies and governance with data-driven strategy and policy-tech innovation.',
    emoji: '♟️',
    color: '#3b82f6',      // blue
    accentColor: '#eab308', // gold
    gradient: 'from-blue-600/20 to-yellow-500/10',
    borderColor: 'rgba(59,130,246,0.5)',
    glowColor: 'rgba(59,130,246,0.35)',
    glowHover: '0 0 40px rgba(59,130,246,0.5), 0 20px 60px rgba(59,130,246,0.15)',
    tag: 'TRACK 01',
    avatarBg: 'linear-gradient(135deg, #1d4ed8, #eab308)',
  },
  {
    id: 'builder',
    name: 'The Builder',
    tagline: 'Builds what matters.',
    track: 'Engineering & Sustainable Tech — architect infrastructure, tools, and systems that power a resilient tomorrow.',
    emoji: '⚙️',
    color: '#06b6d4',      // cyan
    accentColor: '#eab308', // gold
    gradient: 'from-cyan-600/20 to-yellow-500/10',
    borderColor: 'rgba(6,182,212,0.5)',
    glowColor: 'rgba(6,182,212,0.35)',
    glowHover: '0 0 40px rgba(6,182,212,0.5), 0 20px 60px rgba(6,182,212,0.15)',
    tag: 'TRACK 02',
    avatarBg: 'linear-gradient(135deg, #0e7490, #eab308)',
  },
  {
    id: 'visionary',
    name: 'The Visionary',
    tagline: 'Believes in what could be.',
    track: "AI, ML & Emerging Tech — harness intelligence, automation, and frontier science to reimagine what's possible.",
    emoji: '🔮',
    color: '#a855f7',      // purple
    accentColor: '#c084fc',
    gradient: 'from-purple-600/20 to-violet-500/10',
    borderColor: 'rgba(168,85,247,0.5)',
    glowColor: 'rgba(168,85,247,0.35)',
    glowHover: '0 0 40px rgba(168,85,247,0.5), 0 20px 60px rgba(168,85,247,0.15)',
    tag: 'TRACK 03',
    avatarBg: 'linear-gradient(135deg, #7c3aed, #c084fc)',
  },
  {
    id: 'connector',
    name: 'The Connector',
    tagline: 'Unites people. Creates change.',
    track: 'Social Good & HealthTech — build bridges across communities, access gaps, and human experiences that deserve better.',
    emoji: '🌸',
    color: '#ec4899',      // pink/magenta
    accentColor: '#f0abfc',
    gradient: 'from-pink-600/20 to-fuchsia-500/10',
    borderColor: 'rgba(236,72,153,0.5)',
    glowColor: 'rgba(236,72,153,0.35)',
    glowHover: '0 0 40px rgba(236,72,153,0.5), 0 20px 60px rgba(236,72,153,0.15)',
    tag: 'TRACK 04',
    avatarBg: 'linear-gradient(135deg, #be185d, #f0abfc)',
  },
]

function DomainCard({ domain, delay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`sr-hidden ${delay} domain-card flex flex-col items-center text-center`}
      style={{
        borderColor: hovered ? domain.borderColor : 'rgba(255,255,255,0.08)',
        boxShadow: hovered ? domain.glowHover : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Track tag */}
      <span
        className="font-pixel text-[0.5rem] tracking-widest mb-4 px-2 py-1 rounded"
        style={{
          color: domain.color,
          background: `${domain.color}18`,
          border: `1px solid ${domain.color}40`,
        }}
      >
        {domain.tag}
      </span>

      {/* Avatar frame — swap in <img> here later */}
      <div
        className="relative mb-5 flex items-center justify-center"
        style={{ width: 100, height: 100 }}
      >
        {/* Hexagon-ish glow ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: domain.avatarBg,
            opacity: hovered ? 0.9 : 0.6,
            transition: 'opacity 0.3s',
            boxShadow: hovered ? `0 0 30px ${domain.glowColor}` : 'none',
          }}
        />
        {/* Spinning ring */}
        <div
          className="absolute inset-0 rounded-full border-2 border-dashed"
          style={{
            borderColor: domain.color,
            animation: 'spinSlow 8s linear infinite',
            opacity: hovered ? 0.8 : 0.3,
          }}
        />
        {/* Character emoji / image placeholder */}
        <span className="relative text-4xl z-10 select-none">{domain.emoji}</span>
      </div>

      {/* Name */}
      <h3
        className="font-pixel text-sm md:text-base leading-tight mb-2"
        style={{ color: domain.color }}
      >
        {domain.name}
      </h3>

      {/* Tagline */}
      <p
        className="text-xs font-semibold tracking-wide mb-3 transition-all duration-300"
        style={{ color: hovered ? domain.accentColor : 'rgba(255,255,255,0.5)' }}
      >
        {domain.tagline}
      </p>

      {/* Separator */}
      <div
        className="w-12 h-px mb-3"
        style={{
          background: `linear-gradient(90deg, transparent, ${domain.color}, transparent)`,
          opacity: hovered ? 1 : 0.4,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Track description */}
      <p className="text-white/55 text-xs leading-relaxed">{domain.track}</p>

      {/* Hover CTA */}
      <div
        className="mt-4 text-xs font-pixel tracking-wider transition-all duration-300"
        style={{
          color: domain.color,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(8px)',
        }}
      >
        Pick This Path →
      </div>
    </div>
  )
}

export default function Domains() {
  const containerRef = useScrollReveal()

  return (
    <section
      id="domains"
      ref={containerRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #100630 0%, #130840 100%)' }}
    >
      {/* Ambient orbs */}
      <div className="orb w-[500px] h-[500px] bg-purple-600/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
           style={{ animationDuration: '10s' }} />
      <div className="orb w-64 h-64 bg-pink-600/10 top-10 right-20"
           style={{ animationDuration: '7s', animationDelay: '1s' }} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="sr-hidden">
            <span className="section-label">⚔️ Domains</span>
          </div>
          <h2 className="sr-hidden sr-delay-1 font-pixel text-2xl md:text-4xl gradient-text-cyan-pink leading-tight">
            Choose Your Path
          </h2>
          <p className="sr-hidden sr-delay-2 text-white/50 text-base md:text-lg tracking-wide">
            Which one are you?
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((d, i) => (
            <DomainCard key={d.id} domain={d} delay={`sr-delay-${i + 1}`} />
          ))}
        </div>

        {/* Bottom hint */}
        <p className="sr-hidden sr-delay-5 text-center text-white/30 text-xs mt-10 tracking-widest uppercase">
          Character artwork coming soon • Placeholders active
        </p>
      </div>
    </section>
  )
}
