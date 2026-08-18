import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const faculty = [
  {
    name: 'Dr. A. Placeholder',
    role: 'Professor & HOD, Dept. of CSE',
    email: 'placeholder@xyzit.edu.in',
    phone: '+91 99XXX XXXXX',
    initial: 'A',
    gradient: 'from-cyan-600 to-blue-800',
  },
  {
    name: 'Prof. B. Placeholder',
    role: 'Associate Professor, Dept. of CSE',
    email: 'placeholder@xyzit.edu.in',
    phone: '+91 98XXX XXXXX',
    initial: 'B',
    gradient: 'from-fuchsia-600 to-purple-800',
  },
  {
    name: 'Dr. C. Placeholder',
    role: 'Asst. Professor & Event Faculty Advisor',
    email: 'placeholder@xyzit.edu.in',
    phone: '+91 97XXX XXXXX',
    initial: 'C',
    gradient: 'from-pink-600 to-red-800',
  },
]

const students = [
  {
    name: 'Placeholder Alpha',
    role: 'Lead Coordinator, 4th Year CSE',
    email: 'alpha.student@xyzit.edu.in',
    phone: '+91 96XXX XXXXX',
    initial: 'α',
    gradient: 'from-orange-500 to-yellow-700',
  },
  {
    name: 'Placeholder Beta',
    role: 'Technical Head, 3rd Year CSE',
    email: 'beta.student@xyzit.edu.in',
    phone: '+91 95XXX XXXXX',
    initial: 'β',
    gradient: 'from-cyan-500 to-teal-800',
  },
  {
    name: 'Placeholder Gamma',
    role: 'Design & Outreach Lead, 3rd Year CSE',
    email: 'gamma.student@xyzit.edu.in',
    phone: '+91 94XXX XXXXX',
    initial: 'γ',
    gradient: 'from-fuchsia-500 to-pink-800',
  },
]

function CoordCard({ person, delay }) {
  return (
    <div
      className={`sr-hidden ${delay} glass-panel glow-border-cyan
                  flex flex-col items-center text-center gap-4 p-6
                  hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]
                  transition-all duration-300`}
    >
      {/* Avatar */}
      <div
        className={`coord-avatar bg-gradient-to-br ${person.gradient} text-white font-bold text-2xl`}
      >
        {person.initial}
      </div>

      {/* Info */}
      <div className="space-y-1">
        <h4 className="text-white font-semibold text-sm">{person.name}</h4>
        <p className="text-white/50 text-xs leading-snug">{person.role}</p>
      </div>

      {/* Contact icons */}
      <div className="flex items-center gap-3 pt-2 border-t border-white/10 w-full justify-center">
        <a
          href={`mailto:${person.email}`}
          title={person.email}
          className="w-8 h-8 rounded-full flex items-center justify-center
                     bg-cyan-400/10 border border-cyan-400/20
                     hover:bg-cyan-400/20 hover:border-cyan-400/40
                     transition-all duration-200 text-sm"
        >
          ✉️
        </a>
        <a
          href={`tel:${person.phone}`}
          title={person.phone}
          className="w-8 h-8 rounded-full flex items-center justify-center
                     bg-fuchsia-400/10 border border-fuchsia-400/20
                     hover:bg-fuchsia-400/20 hover:border-fuchsia-400/40
                     transition-all duration-200 text-sm"
        >
          📞
        </a>
      </div>
    </div>
  )
}

export default function Coordinators() {
  const [activeTab, setActiveTab] = useState('faculty')
  const containerRef = useScrollReveal()

  const displayed = activeTab === 'faculty' ? faculty : students

  return (
    <section
      id="coordinators"
      ref={containerRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #17094a 0%, #1a0850 100%)' }}
    >
      <div className="orb w-80 h-80 bg-fuchsia-600/8 top-20 right-10"
           style={{ animationDuration: '8s' }} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="sr-hidden">
            <span className="section-label">👤 Team</span>
          </div>
          <h2 className="sr-hidden sr-delay-1 font-pixel text-2xl md:text-3xl
                         bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
            Co-ordinators
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="sr-hidden sr-delay-2 flex justify-center mb-10">
          <div className="flex gap-1 glass-panel glow-border-cyan p-1.5 rounded-full">
            {[
              { key: 'faculty', label: '🎓 Faculty' },
              { key: 'students', label: '👾 Students' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500 text-white shadow-[0_0_15px_rgba(217,70,239,0.5)]'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {displayed.map((person, i) => (
            <CoordCard
              key={person.name}
              person={person}
              delay={`sr-delay-${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
