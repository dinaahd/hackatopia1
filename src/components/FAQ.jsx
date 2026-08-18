import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const faqs = [
  {
    q: 'Who is eligible to participate in Hackatopia 2027?',
    a: 'Any undergraduate student (B.E. / B.Tech / B.Sc / BCA or equivalent) from any recognised college or university in India is eligible. There\'s no minimum CGPA, no experience filter — just curiosity and the drive to build.',
  },
  {
    q: 'How do I form a team?',
    a: 'Teams of 2–4 members are required. You can either register with your pre-formed team or use our Team Formation Portal (available after registration opens) to find like-minded teammates. Members can be from different colleges.',
  },
  {
    q: 'Is there a registration fee?',
    a: 'No. Hackatopia 2027 is completely free to participate in. We believe great ideas shouldn\'t be gated by fees. Food, Wi-Fi, and workspace are provided for all registered participants throughout the event.',
  },
  {
    q: 'Will accommodation be provided?',
    a: 'Yes! Registered participants coming from outstation will be provided with on-campus accommodation (hostel dorms) free of charge. Please mark your requirement during registration. Limited spots available — first-come, first-served.',
  },
  {
    q: 'What do I need to bring on the day?',
    a: 'Bring your college ID (mandatory for entry), your laptop + charger, any hardware/prototyping equipment your project needs, and your passion. Power strips, monitors, and high-speed internet are available on-venue.',
  },
  {
    q: 'How does the judging process work?',
    a: 'After the 24-hour hacking window closes, teams submit their project (GitHub repo + demo video + slide deck). A panel of industry judges evaluates on 4 equal criteria: Innovation, Feasibility, Execution, and Presentation. Shortlisted teams do a live demo and Q&A. Results are announced at the Closing Ceremony.',
  },
]

function FAQItem({ faq, idx }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`sr-hidden sr-delay-${Math.min(idx + 1, 6)} accordion-item group`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-4 py-5 px-1 text-left"
        aria-expanded={open}
      >
        {/* Question number */}
        <span
          className="font-pixel text-[0.55rem] mt-1 flex-shrink-0 w-6"
          style={{ color: open ? '#00e5ff' : 'rgba(255,255,255,0.25)' }}
        >
          {String(idx + 1).padStart(2, '0')}
        </span>

        {/* Question text */}
        <span
          className="flex-1 text-sm md:text-base font-medium leading-snug transition-colors duration-200"
          style={{ color: open ? '#fff' : 'rgba(255,255,255,0.75)' }}
        >
          {faq.q}
        </span>

        {/* Toggle glyph */}
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs
                     border transition-all duration-300"
          style={{
            borderColor: open ? '#00e5ff' : 'rgba(255,255,255,0.15)',
            background: open ? 'rgba(0,229,255,0.12)' : 'transparent',
            color: open ? '#00e5ff' : 'rgba(255,255,255,0.4)',
            textShadow: open ? '0 0 10px #00e5ff' : 'none',
            transform: open ? 'rotate(45deg)' : 'none',
            boxShadow: open ? '0 0 12px rgba(0,229,255,0.3)' : 'none',
          }}
        >
          +
        </span>
      </button>

      {/* Answer */}
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <p className="text-white/55 text-sm leading-relaxed pb-5 pl-10 pr-1">
          {faq.a}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const containerRef = useScrollReveal()

  return (
    <section
      id="faq"
      ref={containerRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1e095a 0%, #20095f 100%)' }}
    >
      <div className="orb w-80 h-80 bg-purple-600/8 top-10 right-10"
           style={{ animationDuration: '9s', animationDelay: '2s' }} />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <div className="sr-hidden">
            <span className="section-label">❓ FAQ</span>
          </div>
          <h2 className="sr-hidden sr-delay-1 font-pixel text-2xl md:text-3xl
                         bg-gradient-to-r from-fuchsia-400 to-orange-400 bg-clip-text text-transparent">
            Frequently Asked
          </h2>
          <p className="sr-hidden sr-delay-2 text-white/40 text-sm">
            Can't find your answer? Reach out at{' '}
            <a href="mailto:hello@hackatopia.xyz" className="text-cyan-400 hover:underline">
              hello@hackatopia.xyz
            </a>
          </p>
        </div>

        {/* Accordion list */}
        <div className="glass-panel glow-border-cyan px-6 py-2">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} faq={faq} idx={idx} />
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="sr-hidden sr-delay-6 text-center mt-10">
          <a href="#contact" className="btn-cta">
            💬 Still have questions? Contact us
          </a>
        </div>
      </div>
    </section>
  )
}
