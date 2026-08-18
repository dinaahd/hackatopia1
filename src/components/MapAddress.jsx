import { useScrollReveal } from '../hooks/useScrollReveal'

export default function MapAddress() {
  const containerRef = useScrollReveal()

  return (
    <section
      id="map"
      ref={containerRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1c0855 0%, #1e095a 100%)' }}
    >
      <div className="orb w-96 h-96 bg-cyan-500/6 bottom-0 left-0"
           style={{ animationDuration: '12s' }} />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <div className="sr-hidden">
            <span className="section-label">📍 Location</span>
          </div>
          <h2 className="sr-hidden sr-delay-1 font-pixel text-xl md:text-3xl
                         bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent leading-snug">
            Coordinates to<br/>the City
          </h2>
        </div>

        {/* Map + Address grid */}
        <div className="grid md:grid-cols-5 gap-8 items-stretch">
          {/* Map embed — 3 cols */}
          <div className="sr-hidden sr-delay-1 md:col-span-3 map-frame overflow-hidden">
            <iframe
              title="Hackatopia Venue Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62207.90682042266!2d80.2099!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267f2afe5a42f%3A0x6f5a0e9a4e4d3c1c!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1690000000000"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Address block — 2 cols */}
          <div className="sr-hidden sr-delay-2 md:col-span-2 glass-panel glow-border-cyan p-8 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              <div className="space-y-1">
                <p className="font-pixel text-[0.6rem] text-cyan-400 tracking-widest mb-3">
                  📍 Venue
                </p>
                <h3 className="text-white font-bold text-lg leading-snug">
                  XYZ Institute of Technology
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Main Auditorium & Innovation Hub,<br/>
                  XYZ IT Campus, Tech Park Road,<br/>
                  Placeholder City — 600 XXX<br/>
                  Tamil Nadu, India
                </p>
              </div>

              {/* Info pills */}
              <div className="space-y-2">
                {[
                  { icon: '📅', text: 'March 14–15, 2027' },
                  { icon: '🕘', text: 'Reporting from 09:00 AM, Mar 14' },
                  { icon: '🚇', text: 'Nearest Metro: Placeholder Station (2 km)' },
                  { icon: '🚌', text: 'Institute shuttles from City Bus Stand' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3 text-sm text-white/60">
                    <span className="flex-shrink-0 mt-0.5">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://maps.google.com/?q=Chennai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta w-full justify-center"
            >
              🗺️ Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
