import { useRef } from 'react'

const sponsorsList = [
  {
    name: 'VITHSURA',
    renderLogo: () => (
      <div className="flex items-center gap-3.5">
        <svg viewBox="0 0 64 48" className="w-12 h-10 flex-shrink-0 fill-[#2563eb]">
          <path d="M48 20c-1.1-6.7-6.8-12-14-12-5.4 0-10.1 3-12.4 7.5C20.6 15.2 19.3 15 18 15c-6.6 0-12 5.4-12 12 0 6.6 5.4 12 12 12h30c5.5 0 10-4.5 10-10 0-4.8-3.4-8.8-8-9.8z" opacity="0.9" />
          <circle cx="38" cy="24" r="3.5" fill="#fff" />
          <circle cx="48" cy="18" r="2.5" fill="#fff" />
          <circle cx="48" cy="30" r="2.5" fill="#fff" />
          <path d="M38 24 L48 18 M38 24 L48 30" stroke="#fff" strokeWidth="2" />
        </svg>
        <div className="text-left">
          <span className="font-black tracking-wider text-base sm:text-lg text-[#1e3a8a] block leading-none font-sans">
            VITHSURA
          </span>
          <span className="text-[0.6rem] text-slate-500 font-bold tracking-widest uppercase">Technologies</span>
        </div>
      </div>
    ),
  },
  {
    name: 'KARMIC DESIGN',
    renderLogo: () => (
      <div className="flex items-center gap-3.5">
        <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-[#dc2626] to-[#ea580c] text-white font-black text-sm shadow-md flex-shrink-0">
          <span className="text-xs font-black">25<sup className="text-[0.45rem]">YRS</sup></span>
        </div>
        <div className="text-left">
          <span className="font-black text-base sm:text-lg text-[#1e293b] block leading-none tracking-tight font-sans">
            KARMIC
          </span>
          <span className="text-[0.55rem] text-[#dc2626] font-bold tracking-widest uppercase block mt-0.5">
            DESIGN PVT LTD
          </span>
        </div>
      </div>
    ),
  },
  {
    name: 'Invi-Hub',
    renderLogo: () => (
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center bg-slate-100 flex-shrink-0">
          <span className="font-serif italic font-black text-sm text-slate-900">Invi</span>
        </div>
        <div className="text-left">
          <span className="font-bold text-base sm:text-lg text-slate-900 block leading-tight tracking-tight font-serif italic">
            Invi-Hub
          </span>
          <span className="text-[0.55rem] text-slate-500 font-semibold tracking-tight uppercase block">
            Technosolutions Pvt Ltd
          </span>
        </div>
      </div>
    ),
  },
  {
    name: 'Genesis',
    renderLogo: () => (
      <div className="flex items-center gap-3.5">
        <svg viewBox="0 0 40 40" className="w-11 h-11 flex-shrink-0 fill-[#eab308]">
          <path d="M20 4 C14 12, 12 18, 14 26 C16 22, 19 20, 20 20 C21 20, 24 22, 26 26 C28 18, 26 12, 20 4 Z" />
          <path d="M8 20 C14 22, 17 25, 18 29 C14 30, 10 28, 8 20 Z" />
          <path d="M32 20 C26 22, 23 25, 22 29 C26 30, 30 28, 32 20 Z" />
        </svg>
        <div className="text-left">
          <span className="font-bold text-base sm:text-lg text-[#78350f] block leading-none font-sans tracking-wide">
            Genesis
          </span>
          <span className="text-[0.6rem] text-amber-700/70 font-semibold tracking-widest uppercase mt-0.5 block">Incubation</span>
        </div>
      </div>
    ),
  },
  {
    name: 'Devfolio',
    renderLogo: () => (
      <div className="flex items-center gap-3.5">
        <div className="w-9 h-9 rounded-[6px] bg-[#2762eb] flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-sm">
          ⬡
        </div>
        <span className="font-black text-base sm:text-lg text-slate-900 tracking-tight font-sans">
          DEVFOLIO
        </span>
      </div>
    ),
  },
  {
    name: 'GitHub',
    renderLogo: () => (
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 24 24" className="w-8 h-8 flex-shrink-0 fill-slate-900">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
        <span className="font-black text-base sm:text-lg text-slate-900 tracking-tight font-sans">
          GitHub
        </span>
      </div>
    ),
  },
]

export default function Sponsors() {
  const containerRef = useRef(null)

  // Duplicate for seamless infinite loop
  const marqueeItems = [...sponsorsList, ...sponsorsList]

  return (
    <section
      id="sponsors"
      ref={containerRef}
      className="relative py-28 sm:py-36 w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a14 0%, #0c0824 50%, #0a0a14 100%)',
      }}
    >
      {/* Subtle Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(46, 211, 232, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(46, 211, 232, 0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="w-full relative z-10 flex flex-col gap-12 sm:gap-16">
        {/* Clean Headline with Cyan Glow Accent */}
        <div className="flex flex-col items-center text-center space-y-3 px-6">
          <h2 className="font-pixel text-2xl sm:text-4xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Our Sponsors
          </h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#2ED3E8] to-transparent shadow-[0_0_12px_#2ED3E8]" />
        </div>

        {/* ── Full-Width Edge-to-Edge Capsule Marquee ── */}
        <div className="relative w-full overflow-hidden marquee-mask py-6">
          <div className="flex gap-7 sm:gap-10 w-max animate-marquee hover:[animation-play-state:paused] px-6">
            {marqueeItems.map((s, idx) => (
              <div
                key={`${s.name}-${idx}`}
                className="sponsor-capsule group relative flex items-center justify-center px-10 sm:px-12 py-5 rounded-full bg-white shadow-[0_12px_32px_rgba(0,0,0,0.5)] border-2 border-white/80 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(46,211,232,0.6)] cursor-default min-w-[280px] sm:min-w-[320px] h-[105px] sm:h-[115px]"
              >
                {/* Sponsor Logo Content */}
                <div className="relative z-10 flex items-center justify-center">
                  {s.renderLogo()}
                </div>

                {/* Neon Cyan Border on Hover */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#2ED3E8] transition-colors duration-200 pointer-events-none shadow-[inset_0_2px_4px_rgba(255,255,255,0.8)]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* Smooth Infinite Marquee Animation */
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marqueeScroll 26s linear infinite;
        }

        /* Edge Gradient Masks for Smooth Full-Width In/Out Fade */
        .marquee-mask {
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
        }

        .sponsor-capsule {
          background: #ffffff;
        }
      `}</style>
    </section>
  )
}
