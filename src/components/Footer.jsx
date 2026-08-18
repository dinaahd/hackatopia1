import logo from '../assets/logo.png'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Domains', href: '#domains' },
  { label: 'Rules', href: '#rules' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'FAQ', href: '#faq' },
]

const socials = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/hackatopia_xyz',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/hackatopia',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/hackatopia_xyz',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative pt-20 pb-10 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #20095f 0%, #080220 100%)' }}
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px
                      bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

      {/* Orbs */}
      <div className="orb w-96 h-96 bg-fuchsia-600/8 top-0 left-1/2 -translate-x-1/2"
           style={{ animationDuration: '12s' }} />

      <div className="max-w-6xl mx-auto">
        {/* Register CTA banner */}
        <div className="glass-panel glow-border-cyan p-8 md:p-12 text-center mb-16 space-y-5 relative overflow-hidden">
          <div className="scanlines absolute inset-0 rounded-2xl pointer-events-none" />
          <p className="font-pixel text-[0.6rem] text-cyan-400 tracking-widest">
            🚀 Registrations Open — March 2027
          </p>
          <h2 className="font-pixel text-xl md:text-3xl gradient-text leading-snug">
            Ready to Build<br/>Utopia?
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Join 500+ builders, dreamers, and creators. 24 hours. One theme. Infinite possibilities.
          </p>
          <a href="#register" className="btn-cta text-base px-10 py-4">
            ⚡ Register Now — It's Free
          </a>
        </div>

        {/* 3-column footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
          {/* Col 1 — Contact */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Hackatopia" className="h-8 w-8 object-contain" />
              <span className="font-pixel text-xs text-white/80">HACKATOPIA</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Organised by the <span className="text-cyan-400">Department of Computer Science &amp; Engineering</span> and
              the <span className="text-fuchsia-400">XYZ Tech Club</span> at
              XYZ Institute of Technology, Placeholder City.
            </p>
            <div className="space-y-2 text-sm text-white/50">
              <p className="flex items-center gap-2">
                <span>📧</span>
                <a href="mailto:hello@hackatopia.xyz" className="hover:text-cyan-400 transition-colors">
                  hello@hackatopia.xyz
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+910000000000" className="hover:text-cyan-400 transition-colors">
                  +91 00000 00000
                </a>
              </p>
              <p className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>XYZ Institute of Technology,<br/>Tech Park Road, Placeholder City — 600 XXX</span>
              </p>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="space-y-5">
            <h4 className="font-pixel text-[0.65rem] text-white/70 tracking-widest">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 text-sm hover:text-cyan-400
                               transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-white/20 group-hover:bg-cyan-400 group-hover:w-6 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Socials */}
          <div className="space-y-5">
            <h4 className="font-pixel text-[0.65rem] text-white/70 tracking-widest">Follow Us</h4>
            <div className="space-y-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/50 hover:text-white
                             transition-colors duration-200 group"
                >
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center
                               bg-white/5 border border-white/10
                               group-hover:border-cyan-400/40 group-hover:bg-cyan-400/10
                               transition-all duration-200"
                  >
                    {s.icon}
                  </span>
                  <span className="text-sm">{s.label}</span>
                </a>
              ))}
            </div>

            <div className="pt-4">
              <p className="font-pixel text-[0.55rem] text-orange-400/80 tracking-widest">
                #BuildUtopia2027
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center
                        justify-between gap-3 text-white/30 text-xs">
          <p>
            © 2027 Hackatopia — XYZ Institute of Technology. All rights reserved.
          </p>
          <p className="font-pixel text-[0.5rem] tracking-widest text-white/20">
            Designed with 💜 by XYZ Tech Club
          </p>
        </div>
      </div>
    </footer>
  )
}
