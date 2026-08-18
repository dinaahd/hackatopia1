import { useScrollReveal } from '../hooks/useScrollReveal'

const milestones = [
  {
    id: 1,
    label: 'Registrations Open',
    date: 'Jan 20, 2027',
    desc: 'The portal opens. Find your team, pick your domain, and begin your journey.',
    nodeColor: '#00e5ff',
    icon: '🚀',
  },
  {
    id: 2,
    label: 'Registrations Close',
    date: 'Mar 05, 2027',
    desc: 'Last call — deadline to lock in your team and complete profile submission.',
    nodeColor: '#ff2ea6',
    icon: '🔒',
  },
  {
    id: 3,
    label: 'Opening Ceremony',
    date: 'Mar 14, 2027 · 09:00 AM',
    desc: 'Welcome to Utopia. Keynote speakers, theme reveal, and team check-in.',
    nodeColor: '#ffb020',
    icon: '🎤',
  },
  {
    id: 4,
    label: 'Hacking Begins',
    date: 'Mar 14, 2027 · 11:00 AM',
    desc: 'The 24-hour clock starts. May your caffeine levels and commit counts be high.',
    nodeColor: '#00e5ff',
    icon: '⚡',
  },
  {
    id: 5,
    label: 'Mentorship Check-ins',
    date: 'Mar 14–15, 2027',
    desc: 'Industry mentors rotate through to guide, advise, and provide feedback.',
    nodeColor: '#a855f7',
    icon: '🧭',
  },
  {
    id: 6,
    label: 'Submission Deadline',
    date: 'Mar 15, 2027 · 11:00 AM',
    desc: 'Code freeze. All repos, decks, and demo videos must be submitted.',
    nodeColor: '#ff2ea6',
    icon: '📦',
  },
  {
    id: 7,
    label: 'Judging',
    date: 'Mar 15, 2027 · 12:00 PM',
    desc: 'Expert panel evaluates all projects. Demos, pitches, and Q&A rounds.',
    nodeColor: '#ffb020',
    icon: '⚖️',
  },
  {
    id: 8,
    label: 'Closing Ceremony & Results',
    date: 'Mar 15, 2027 · 06:00 PM',
    desc: 'Winners announced, prizes awarded, and Utopia celebrated. See you there.',
    nodeColor: '#00e5ff',
    icon: '🏆',
  },
]

export default function Timeline() {
  const containerRef = useScrollReveal()

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1a0850 0%, #1c0855 100%)' }}
    >
      {/* Side orbs */}
      <div className="orb w-64 h-64 bg-cyan-500/8 top-20 left-0"
           style={{ animationDuration: '10s' }} />
      <div className="orb w-48 h-48 bg-fuchsia-600/8 bottom-20 right-0"
           style={{ animationDuration: '7s', animationDelay: '3s' }} />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="sr-hidden">
            <span className="section-label">📡 Mission Log</span>
          </div>
          <h2 className="sr-hidden sr-delay-1 font-pixel text-2xl md:text-3xl
                         bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">
            Timeline
          </h2>
          <p className="sr-hidden sr-delay-2 text-white/40 text-sm">
            Your 24-hour mission brief — bookmark this page.
          </p>
        </div>

        {/* Milestones */}
        <div className="relative">
          {/* Vertical connector line — behind cards */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, rgba(0,229,255,0.4), rgba(255,46,166,0.4))' }}
          />

          <div className="space-y-0">
            {milestones.map((m, i) => {
              const isRight = i % 2 === 0
              return (
                <div
                  key={m.id}
                  className={`sr-hidden sr-delay-${Math.min(i + 1, 6)}
                               relative flex items-start gap-0
                               md:grid md:grid-cols-2 md:gap-0 py-6`}
                >
                  {/* Desktop: alternate left/right */}
                  {/* Left content (even items on desktop) */}
                  <div
                    className={`hidden md:flex ${isRight ? 'justify-end pr-10' : 'justify-start pl-10 order-3'}`}
                  >
                    {isRight && (
                      <MilestoneCard milestone={m} align="right" />
                    )}
                  </div>

                  {/* Node */}
                  <div className="hidden md:flex items-center justify-center relative z-10 order-2">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg
                                 border-2 border-opacity-60"
                      style={{
                        background: `${m.nodeColor}20`,
                        borderColor: m.nodeColor,
                        boxShadow: `0 0 0 4px ${m.nodeColor}15, 0 0 20px ${m.nodeColor}40`,
                        animation: `nodePulse 2.5s ease-in-out ${i * 0.3}s infinite`,
                      }}
                    >
                      {m.icon}
                    </div>
                  </div>

                  <div
                    className={`hidden md:flex ${!isRight ? 'justify-start pl-10' : 'justify-end pr-10 order-3'}`}
                  >
                    {!isRight && (
                      <MilestoneCard milestone={m} align="left" />
                    )}
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden flex items-start gap-5 pl-2">
                    <div className="flex flex-col items-center gap-0 mt-1">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 relative z-10"
                        style={{
                          background: `${m.nodeColor}20`,
                          border: `2px solid ${m.nodeColor}`,
                          boxShadow: `0 0 15px ${m.nodeColor}40`,
                        }}
                      >
                        {m.icon}
                      </div>
                    </div>
                    <MilestoneCard milestone={m} align="left" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function MilestoneCard({ milestone: m, align }) {
  return (
    <div
      className={`glass-panel max-w-xs w-full p-4 group
                  hover:-translate-y-1
                  hover:shadow-[0_0_30px_rgba(0,229,255,0.12)]
                  transition-all duration-300`}
      style={{
        borderColor: `${m.nodeColor}35`,
        boxShadow: `0 0 0 1px ${m.nodeColor}20`,
      }}
    >
      <p
        className="font-pixel text-[0.55rem] mb-1 tracking-widest"
        style={{ color: m.nodeColor }}
      >
        {m.date}
      </p>
      <h4 className="text-white text-sm font-semibold mb-1">{m.label}</h4>
      <p className="text-white/45 text-xs leading-relaxed">{m.desc}</p>
    </div>
  )
}
