import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const rules = [
  {
    id: 'team',
    icon: '👥',
    title: 'Team Size',
    content:
      'Each team must comprise 2 to 4 members. Solo participation is not permitted. Teams may include members from different colleges or departments — we encourage cross-disciplinary collaboration.',
  },
  {
    id: 'eligibility',
    icon: '🎓',
    title: 'Eligibility',
    content:
      'Open to all currently enrolled undergraduate students (B.E. / B.Tech / B.Sc / BCA / equivalent) from any recognised institution in India. No minimum CGPA requirement.',
  },
  {
    id: 'idea',
    icon: '💡',
    title: 'One Idea Per Team',
    content:
      'Each team may submit exactly one project. The idea, code, design, and presentation must be the original work of the registered team — created entirely during the 24-hour hacking window.',
  },
  {
    id: 'conduct',
    icon: '🤝',
    title: 'Code of Conduct',
    content:
      'All participants must treat fellow hackers, mentors, and organisers with respect. Discrimination, harassment, plagiarism, or violation of Hackatopia\'s Code of Conduct will result in immediate disqualification.',
  },
  {
    id: 'submission',
    icon: '📦',
    title: 'Submission Deadline',
    content:
      'All project submissions (code repository link + demo video + presentation deck) must be submitted before 15 March 2027, 12:00 PM IST. Late submissions will not be accepted under any circumstances.',
  },
  {
    id: 'judging',
    icon: '⚖️',
    title: 'Judging Criteria',
    content:
      'Projects will be evaluated across four dimensions: Innovation (25%) — originality and creativity of the idea; Feasibility (25%) — technical correctness and scalability; Execution (25%) — quality of implementation and code; Presentation (25%) — clarity, impact, and demo quality.',
  },
]

function RuleItem({ rule, idx }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`sr-hidden sr-delay-${Math.min(idx + 1, 6)} accordion-item`}
    >
      <button
        className="w-full flex items-center gap-4 py-5 px-1 text-left
                   hover:text-cyan-300 transition-colors duration-200 group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {/* Icon */}
        <span className="text-2xl flex-shrink-0">{rule.icon}</span>

        {/* Title */}
        <span className="flex-1 font-semibold text-sm md:text-base text-white/90 group-hover:text-white transition-colors">
          {rule.title}
        </span>

        {/* Toggle glyph */}
        <span
          className="font-pixel text-base transition-all duration-300 flex-shrink-0"
          style={{
            color: open ? '#00e5ff' : 'rgba(255,255,255,0.4)',
            textShadow: open ? '0 0 10px #00e5ff' : 'none',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          +
        </span>
      </button>

      {/* Content */}
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <p className="text-white/60 text-sm leading-relaxed pb-5 pl-10 pr-1">
          {rule.content}
        </p>
      </div>
    </div>
  )
}

const criteria = [
  { label: 'Innovation', pct: 25, color: '#00e5ff' },
  { label: 'Feasibility', pct: 25, color: '#ff2ea6' },
  { label: 'Execution', pct: 25, color: '#a855f7' },
  { label: 'Presentation', pct: 25, color: '#ffb020' },
]

export default function Rules() {
  const containerRef = useScrollReveal()

  return (
    <section
      id="rules"
      ref={containerRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #130840 0%, #150a45 100%)' }}
    >
      <div className="orb w-72 h-72 bg-cyan-600/8 bottom-10 left-10"
           style={{ animationDuration: '9s' }} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <div className="sr-hidden">
            <span className="section-label">📋 Rules & Regs</span>
          </div>
          <h2 className="sr-hidden sr-delay-1 font-pixel text-2xl md:text-3xl
                         bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Rules &amp; Regulations
          </h2>
        </div>

        {/* Two column layout on large screens */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Accordion — 2 cols */}
          <div className="md:col-span-2 glass-panel glow-border-cyan px-6 py-2">
            {rules.map((rule, idx) => (
              <RuleItem key={rule.id} rule={rule} idx={idx} />
            ))}
          </div>

          {/* Judging criteria visual — 1 col */}
          <div className="glass-panel glow-border-magenta p-6 flex flex-col gap-5 self-start sticky top-28">
            <h3 className="font-pixel text-xs text-fuchsia-400 tracking-wider">
              Judging Criteria
            </h3>
            {criteria.map((c, i) => (
              <div key={c.label} className={`sr-hidden sr-delay-${i + 2}`}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/70">{c.label}</span>
                  <span style={{ color: c.color }} className="font-semibold">{c.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${c.pct}%`,
                      background: `linear-gradient(90deg, ${c.color}80, ${c.color})`,
                      boxShadow: `0 0 8px ${c.color}`,
                    }}
                  />
                </div>
              </div>
            ))}

            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-white/40 text-xs leading-relaxed">
                Judging panel includes industry experts and faculty mentors. Scores are final and binding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
