import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import logoText from '../assets/logo_text.png'

/* ─── Count-up hook ─── */
function useCountUp(target, duration = 1800, inView = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setValue(target); clearInterval(timer) }
      else setValue(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, inView])
  return value
}

const stats = [
  { label: 'Participants', value: 500, suffix: '+', icon: '👾' },
  { label: 'Prize Pool', value: 100000, suffix: '+', prefix: '₹', icon: '🏆' },
  { label: 'Tracks', value: 4, suffix: '', icon: '🛤️' },
  { label: 'Hours', value: 24, suffix: '', icon: '⏱️' },
]

function StatCard({ stat, inView, delay }) {
  const raw = useCountUp(stat.value, 1600, inView)
  const display = stat.value >= 10000
    ? raw.toLocaleString('en-IN')
    : raw.toString()

  return (
    <div
      className={`sr-hidden ${delay} pixel-arcade-card relative overflow-hidden
                  flex flex-col items-center gap-3 p-6 text-center group
                  transition-all duration-300`}
    >
      {/* Scanlines */}
      <div className="scanlines absolute inset-0 rounded-2xl pointer-events-none" />

      <span className="text-3xl">{stat.icon}</span>
      <div className="stat-number text-2xl md:text-3xl text-cyan-400 leading-none">
        {stat.prefix}{display}{stat.suffix}
      </div>
      <p className="text-white/60 text-xs tracking-widest uppercase font-medium">
        {stat.label}
      </p>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px
                      bg-gradient-to-r from-transparent via-cyan-400 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
}

export default function Summary() {
  const containerRef = useScrollReveal()
  const [inView, setInView] = useState(false)
  const triggerRef = useRef(null)

  useEffect(() => {
    const el = triggerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="summary"
      ref={containerRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080220 0%, #0d052e 100%)' }}
    >
      {/* Background orbs */}
      <div className="orb w-96 h-96 bg-cyan-500/10 top-0 right-10 -translate-y-1/2"
           style={{ animationDuration: '8s' }} />
      <div className="orb w-64 h-64 bg-fuchsia-500/10 bottom-0 left-10"
           style={{ animationDuration: '6s', animationDelay: '2s' }} />

      <div className="max-w-5xl mx-auto">
        {/* Heading with logo image */}
        <div className="text-center mb-16 space-y-5">
          <div className="sr-hidden sr-delay-1 flex justify-center">
            <img
              src={logoText}
              alt="Hackatopia"
              className="w-full max-w-sm md:max-w-md lg:max-w-lg object-contain
                         drop-shadow-[0_0_30px_rgba(0,229,255,0.4)]
                         drop-shadow-[0_0_60px_rgba(255,46,166,0.3)]"
            />
          </div>
        </div>

        {/* Stat cards */}
        <div ref={triggerRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <StatCard
              key={s.label}
              stat={s}
              inView={inView}
              delay={`sr-delay-${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
