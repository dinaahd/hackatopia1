import { useScrollReveal } from '../hooks/useScrollReveal'

const tiers = [
  {
    id: 'founder',
    label: 'Founder Tier',
    badge: '👑',
    desc: 'Premier Sponsor',
    tileCount: 2,
    tileSize: 'h-28 md:h-36',
    borderColor: 'rgba(255,176,32,0.5)',
    glowColor: 'rgba(255,176,32,0.15)',
    labelColor: '#ffb020',
    bgColor: 'rgba(255,176,32,0.04)',
  },
  {
    id: 'core',
    label: 'Core Tier',
    badge: '⚡',
    desc: 'Gold Sponsor',
    tileCount: 3,
    tileSize: 'h-20 md:h-28',
    borderColor: 'rgba(0,229,255,0.5)',
    glowColor: 'rgba(0,229,255,0.12)',
    labelColor: '#00e5ff',
    bgColor: 'rgba(0,229,255,0.03)',
  },
  {
    id: 'builder',
    label: 'Builder Tier',
    badge: '🔧',
    desc: 'Silver Sponsor',
    tileCount: 4,
    tileSize: 'h-16 md:h-20',
    borderColor: 'rgba(168,85,247,0.4)',
    glowColor: 'rgba(168,85,247,0.10)',
    labelColor: '#a855f7',
    bgColor: 'rgba(168,85,247,0.03)',
  },
  {
    id: 'community',
    label: 'Community Partner',
    badge: '🤝',
    desc: 'Community Supporter',
    tileCount: 5,
    tileSize: 'h-12 md:h-16',
    borderColor: 'rgba(255,46,166,0.35)',
    glowColor: 'rgba(255,46,166,0.08)',
    labelColor: '#ff2ea6',
    bgColor: 'rgba(255,46,166,0.02)',
  },
]

function SponsorTile({ tier, idx }) {
  return (
    <div
      className={`sponsor-tile ${tier.tileSize} flex-1 min-w-[140px]`}
      style={{
        borderColor: tier.borderColor,
        background: tier.bgColor,
      }}
    >
      <div className="text-center space-y-1 p-4">
        <p
          className="font-pixel text-[0.5rem] tracking-widest"
          style={{ color: tier.labelColor, opacity: 0.7 }}
        >
          Your Logo Here
        </p>
        <p className="text-white/20 text-[0.55rem]">Placeholder #{idx + 1}</p>
      </div>
    </div>
  )
}

export default function Sponsors() {
  const containerRef = useScrollReveal()

  return (
    <section
      id="sponsors"
      ref={containerRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #150a45 0%, #17094a 100%)' }}
    >
      {/* Background decoration */}
      <div className="orb w-96 h-96 bg-orange-500/6 top-0 left-1/2 -translate-x-1/2"
           style={{ animationDuration: '11s' }} />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="sr-hidden">
            <span className="section-label">🤝 Partners</span>
          </div>
          <h2 className="sr-hidden sr-delay-1 font-pixel text-2xl md:text-3xl
                         bg-gradient-to-r from-orange-400 via-yellow-400 to-cyan-400 bg-clip-text text-transparent">
            Our Sponsors
          </h2>
          <p className="sr-hidden sr-delay-2 text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            Hackatopia is made possible by our incredible partners and sponsors.
            Interested in powering the next generation of builders?
          </p>
        </div>

        {/* Tier rows */}
        <div className="space-y-10">
          {tiers.map((tier, i) => (
            <div key={tier.id} className={`sr-hidden sr-delay-${i + 1}`}>
              {/* Tier label */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl">{tier.badge}</span>
                <span
                  className="font-pixel text-[0.6rem] tracking-widest"
                  style={{ color: tier.labelColor }}
                >
                  {tier.label}
                </span>
                <span className="text-white/30 text-xs">— {tier.desc}</span>
                <div
                  className="flex-1 h-px"
                  style={{ background: `linear-gradient(90deg, ${tier.borderColor}, transparent)` }}
                />
              </div>

              {/* Sponsor tiles */}
              <div className="flex flex-wrap gap-4">
                {Array.from({ length: tier.tileCount }).map((_, idx) => (
                  <SponsorTile key={idx} tier={tier} idx={idx} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Become a sponsor CTA */}
        <div className="sr-hidden sr-delay-5 text-center mt-16 space-y-4">
          <p className="text-white/40 text-sm">
            Want to sponsor Hackatopia 2027? Get your brand in front of 500+ top engineering students.
          </p>
          <a
            href="mailto:sponsors@hackatopia.xyz"
            className="btn-cta"
          >
            💼 Become a Sponsor
          </a>
        </div>
      </div>
    </section>
  )
}
