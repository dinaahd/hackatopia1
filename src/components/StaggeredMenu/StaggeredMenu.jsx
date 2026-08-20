import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { X, ArrowRight } from "lucide-react";
import logo from "../../assets/logo.png";

export const StaggeredMenu = ({
  position = "right",
  colors = ["#00e5ff", "#ff2ea6", "#0c0422"],
  items = [
    { label: "About",        ariaLabel: "About Hackatopia",             link: "#about"        },
    { label: "Tracks",       ariaLabel: "Explore Hackathon Tracks",     link: "#domains"      },
    { label: "Timeline",     ariaLabel: "Hackathon Schedule",           link: "#timeline"     },
    { label: "Coordinators", ariaLabel: "Central coordinators",         link: "#coordinators" },
    { label: "Location",     ariaLabel: "Venue and Location Map",       link: "#map"          },
  ],
  displaySocials = true,
  className,
  logoUrl = logo,
  menuButtonColor = "#ffffff",
  changeMenuColorOnOpen = true,
  isFixed = true,
  accentColor = "#00e5ff",
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const headerRef      = useRef(null);
  const panelRef       = useRef(null);
  const preLayersRef   = useRef(null);
  const preLayerElsRef = useRef([]);
  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef  = useRef(null);
  const textInnerRef = useRef(null);
  const textWrapRef  = useRef(null);
  const [textLines, setTextLines] = useState(["MENU", "CLOSE"]);
  const openTlRef        = useRef(null);
  const closeTweenRef    = useRef(null);
  const spinTweenRef     = useRef(null);
  const textCycleAnimRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const busyRef      = useRef(false);
  const itemEntranceTweenRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon  = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner) return;
      let preLayers = [];
      if (preContainer) preLayers = Array.from(preContainer.querySelectorAll(".sm-prelayer"));
      preLayerElsRef.current = preLayers;
      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
      gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
      gsap.set(icon,  { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel  = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;
    openTlRef.current?.kill();
    if (closeTweenRef.current) { closeTweenRef.current.kill(); closeTweenRef.current = null; }
    itemEntranceTweenRef.current?.kill();
    
    const itemEls     = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
    const bottomCta   = panel.querySelector(".sm-bottom-cta");
    const offscreen   = position === "left" ? -100 : 100;
    const layerStates = layers.map(el => ({ el, start: offscreen }));
    
    if (itemEls.length) gsap.set(itemEls, { yPercent: 120, opacity: 0 });
    if (bottomCta)      gsap.set(bottomCta, { y: 20, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.4, ease: "power4.out" }, i * 0.05);
    });
    const lastTime      = layerStates.length ? (layerStates.length - 1) * 0.05 : 0;
    const panelInsert   = lastTime + (layerStates.length ? 0.06 : 0);
    const panelDuration = 0.55;
    tl.fromTo(panel, { xPercent: offscreen }, { xPercent: 0, duration: panelDuration, ease: "power4.out" }, panelInsert);
    
    if (itemEls.length) {
      const itemsStart = panelInsert + panelDuration * 0.15;
      tl.to(itemEls, { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: { each: 0.06 } }, itemsStart);
    }
    const socialsStart = panelInsert + panelDuration * 0.35;
    if (bottomCta) {
      tl.to(bottomCta, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" }, socialsStart);
    }
    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) { tl.eventCallback("onComplete", () => { busyRef.current = false; }); tl.play(0); }
    else busyRef.current = false;
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill(); openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();
    const panel  = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;
    closeTweenRef.current?.kill();
    const offscreen = position === "left" ? -100 : 100;
    closeTweenRef.current = gsap.to([...layers, panel], {
      xPercent: offscreen, duration: 0.3, ease: "power3.in", overwrite: "auto",
      onComplete: () => {
        const itemEls   = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
        const bottomCta = panel.querySelector(".sm-bottom-cta");
        if (itemEls.length) gsap.set(itemEls, { yPercent: 120, opacity: 0 });
        if (bottomCta)      gsap.set(bottomCta, { opacity: 0 });
        busyRef.current = false;
      }
    });
  }, [position]);

  const animateIcon = useCallback(opening => {
    const icon = iconRef.current, h = plusHRef.current, v = plusVRef.current;
    if (!icon || !h || !v) return;
    spinTweenRef.current?.kill();
    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      spinTweenRef.current = gsap.timeline({ defaults: { ease: "power4.out" } })
        .to(h, { rotate: 45,  duration: 0.35 }, 0)
        .to(v, { rotate: -45, duration: 0.35 }, 0);
    } else {
      spinTweenRef.current = gsap.timeline({ defaults: { ease: "power3.inOut" } })
        .to(h, { rotate: 0,  duration: 0.3 }, 0)
        .to(v, { rotate: 90, duration: 0.3 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateColor = useCallback(opening => {
    const btn = toggleBtnRef.current;
    if (!btn) return;
    if (changeMenuColorOnOpen)
      gsap.to(btn, { color: opening ? "#ffffff" : "#040e24", duration: 0.25, ease: "power2.out" });
  }, [changeMenuColorOnOpen]);

  const animateText = useCallback(opening => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();
    const currentLabel = opening ? "MENU" : "CLOSE";
    const targetLabel  = opening ? "CLOSE" : "MENU";
    const seq = [currentLabel, targetLabel];
    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });
    textCycleAnimRef.current = gsap.to(inner, { yPercent: -50, duration: 0.35, ease: "power4.out" });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target; setOpen(target);
    if (target) { onMenuOpen?.(); playOpen(); } else { onMenuClose?.(); playClose(); }
    animateIcon(target); animateColor(target); animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false; setOpen(false);
      onMenuClose?.(); playClose(); animateIcon(false); animateColor(false); animateText(false);
    }
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;
    const handleClickOutside = event => {
      if (panelRef.current && !panelRef.current.contains(event.target) &&
          toggleBtnRef.current && !toggleBtnRef.current.contains(event.target))
        closeMenu();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeOnClickAway, open, closeMenu]);

  // Hide header on scroll down, show on scroll up
  React.useEffect(() => {
    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    let isHidden = false;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;

      if (openRef.current || currentScrollY < 60) {
        if (isHidden) {
          isHidden = false;
          if (headerRef.current) {
            gsap.to(headerRef.current, { yPercent: 0, duration: 0.35, ease: "power2.out", overwrite: "auto" });
          }
        }
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY + 10 && !isHidden) {
        isHidden = true;
        if (headerRef.current) {
          gsap.to(headerRef.current, { yPercent: -150, duration: 0.35, ease: "power2.inOut", overwrite: "auto" });
        }
      } else if (currentScrollY < lastScrollY - 10 && isHidden) {
        isHidden = false;
        if (headerRef.current) {
          gsap.to(headerRef.current, { yPercent: 0, duration: 0.35, ease: "power2.out", overwrite: "auto" });
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navColors = [
    { color: "#00e5ff", tag: "ABOUT", desc: "Overview & Prize Pool" },
    { color: "#ff2ea6", tag: "DOMAINS", desc: "4 Core Innovation Tracks" },
    { color: "#00e5ff", tag: "SCHEDULE", desc: "24-Hour Event Timeline" },
    { color: "#ff2ea6", tag: "CONTACT", desc: "Faculty & Student Leads" },
    { color: "#00e5ff", tag: "MAP", desc: "Campus Venue & Directions" },
  ];

  return (
    <div className={"sm-scope " + (isFixed ? "fixed top-0 left-0 w-full z-50 pointer-events-none" : "relative w-full h-full")}>
      <div
        className={(className ? className + " " : "") + "staggered-menu-wrapper relative w-full h-full"}
        style={accentColor ? { ["--sm-accent"]: accentColor } : undefined}
        data-position={position}
        data-open={open || undefined}
      >
        {/* Layer Transitions */}
        <div ref={preLayersRef} className="sm-prelayers fixed top-0 right-0 bottom-0 pointer-events-none z-[55]" aria-hidden="true">
          {(colors && colors.length ? colors.slice(0, 3) : ["#00e5ff", "#ff2ea6", "#0c0422"]).map((c, i) => (
            <div key={i} className="sm-prelayer absolute top-0 right-0 h-full w-full shadow-2xl" style={{ background: c }} />
          ))}
        </div>

        {/* TOP NAVBAR HEADER */}
        <header
          ref={headerRef}
          className="staggered-menu-header w-full flex items-center justify-between px-4 sm:px-8 lg:px-12 py-3 sm:py-5 pointer-events-none z-[60]"
          aria-label="Main navigation header"
        >
          <a
            href="#home"
            className="sm-logo pointer-events-auto select-none group flex items-center gap-3"
            aria-label="Go to home"
          >
            <img
              src={logoUrl}
              alt="Hackatopia Logo"
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-full transition-transform duration-300 ease-out group-hover:scale-105 group-active:scale-95 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
              draggable={false}
            />
          </a>

          <button
            ref={toggleBtnRef}
            className="sm-toggle craft-pixel-btn craft-stone pointer-events-auto"
            data-open={open}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            <span ref={textWrapRef} className="sm-toggle-textWrap relative inline-block h-[1.2em] overflow-hidden whitespace-nowrap" aria-hidden="true">
              <span ref={textInnerRef} className="sm-toggle-textInner flex flex-col leading-none">
                {textLines.map((l, i) => (
                  <span className="sm-toggle-line block h-[1.2em] leading-none" key={i}>{l}</span>
                ))}
              </span>
            </span>
            <span ref={iconRef} className="sm-icon relative w-4 h-4 shrink-0 inline-flex items-center justify-center" aria-hidden="true">
              <span ref={plusHRef} className="sm-icon-line absolute left-1/2 top-1/2 w-full h-[2.5px] bg-current rounded-[1px] -translate-x-1/2 -translate-y-1/2" />
              <span ref={plusVRef} className="sm-icon-line sm-icon-line-v absolute left-1/2 top-1/2 w-full h-[2.5px] bg-current rounded-[1px] -translate-x-1/2 -translate-y-1/2" />
            </span>
          </button>
        </header>

        {/* SLIDING CLEAN MODERN DRAWER PANEL */}
        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="sm-panel fixed top-0 right-0 h-[100dvh] flex flex-col justify-between overflow-y-auto z-[58] pointer-events-auto"
          aria-hidden={!open}
        >
          {/* Top Panel Header */}
          <div className="flex items-center justify-between px-6 sm:px-8 pt-6 pb-4 border-b border-white/[0.08] flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
              <span className="font-pixel text-[0.7rem] sm:text-xs text-white tracking-widest uppercase">
                Navigation
              </span>
            </div>

            <button
              onClick={closeMenu}
              className="w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90"
              aria-label="Close menu"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Curated Navigation Links */}
          <div className="px-5 sm:px-8 py-4 my-auto overflow-y-auto">
            <ul className="flex flex-col gap-2 list-none m-0 p-0" role="list">
              {items.map((it, idx) => {
                const meta = navColors[idx] || navColors[0];
                return (
                  <li key={it.label} className="overflow-hidden">
                    <a
                      href={it.link}
                      onClick={closeMenu}
                      className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-white/[0.06] hover:border-[#00e5ff]/50 bg-white/[0.02] hover:bg-white/[0.07] transition-all duration-200 no-underline cursor-pointer"
                    >
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span
                          className="sm-panel-itemLabel text-lg sm:text-xl font-black tracking-wide text-white group-hover:text-[#00e5ff] transition-colors"
                        >
                          {it.label}
                        </span>
                        <span className="text-[0.7rem] text-white/40 font-mono tracking-wider truncate">
                          {meta.desc}
                        </span>
                      </div>

                      <div className="w-7 h-7 rounded-lg bg-white/[0.04] group-hover:bg-[#00e5ff]/20 text-white/30 group-hover:text-[#00e5ff] flex items-center justify-center transition-all duration-200 flex-shrink-0">
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Bottom Action Section */}
          <div className="sm-bottom-cta p-5 sm:p-8 pt-4 border-t border-white/[0.08] flex-shrink-0 flex flex-col gap-3.5">
            {/* Primary Action Button */}
            <a
              href="#register"
              onClick={closeMenu}
              className="btn-arcade btn-arcade-pink w-full text-xs sm:text-sm py-3.5 sm:py-4 flex items-center justify-center gap-2 text-center text-white"
            >
              REGISTER NOW
            </a>

            {/* Social Link Badge */}
            {displaySocials && (
              <div className="flex items-center justify-between pt-1 text-xs text-white/50 font-mono">
                <span>Connect with us:</span>
                <a
                  href="https://instagram.com/hackatopia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/80 hover:text-[#FF2E9A] transition-colors"
                >
                  <svg className="w-4 h-4 fill-[#FF2E9A]" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span>@hackatopia</span>
                </a>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
        .sm-scope .sm-panel {
          width: clamp(300px, 85vw, 420px);
          background: linear-gradient(175deg, #0d0624 0%, #060214 60%, #03010a 100%);
          border-left: 1.5px solid rgba(0, 229, 255, 0.2);
          box-shadow: -20px 0 60px rgba(0, 0, 0, 0.9), inset 1px 0 0 rgba(255, 255, 255, 0.05);
        }
        .sm-scope [data-position='left'] .sm-panel {
          right: auto;
          left: 0;
          border-left: none;
          border-right: 1.5px solid rgba(0, 229, 255, 0.2);
        }
        .sm-scope .sm-prelayers {
          width: clamp(300px, 85vw, 420px);
        }
        .sm-scope [data-position='left'] .sm-prelayers {
          right: auto;
          left: 0;
        }
        @media (max-width: 480px) {
          .sm-scope .sm-panel, .sm-scope .sm-prelayers {
            width: 100vw;
          }
        }
        .sm-scope .staggered-menu-header {
          background: transparent !important;
          border-bottom: none !important;
          box-shadow: none !important;
        }

        /* Toggle Button styles */
        .sm-scope .craft-pixel-btn {
          font-family: 'Inter', system-ui, sans-serif;
          font-weight: 800;
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          text-decoration: none !important;
          border: none;
          padding: 10px 18px;
          cursor: pointer;
          border-radius: 9999px;
          transform: translate(0, 0);
          transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.25s ease;
          user-select: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          position: relative;
        }
        @media (min-width: 640px) {
          .sm-scope .craft-pixel-btn {
            font-size: 0.85rem;
            padding: 12px 22px;
          }
        }
        .sm-scope .craft-pixel-btn * {
          text-decoration: none !important;
        }
        .sm-scope .craft-pixel-btn:active {
          transform: scale(0.95);
        }

        /* High Contrast Luminous Cyber Button */
        .sm-scope .craft-stone {
          background: linear-gradient(135deg, #00f0ff 0%, #00b8e6 100%);
          border: 1.5px solid #a8f5ff;
          box-shadow: 0 4px 18px rgba(0, 240, 255, 0.45);
          color: #040e24;
        }
        .sm-scope .craft-stone:hover {
          background: linear-gradient(135deg, #38f6ff 0%, #00dcff 100%);
          color: #040e24 !important;
          box-shadow: 0 6px 25px rgba(0, 240, 255, 0.7) !important;
          transform: translateY(-2px);
        }
        .sm-scope .craft-stone[data-open="true"] {
          background: linear-gradient(135deg, #ff2ea6 0%, #e60073 100%);
          border: 1.5px solid #ffb3e0;
          box-shadow: 0 4px 18px rgba(255, 46, 166, 0.5);
          color: #ffffff !important;
        }
        .sm-scope .craft-stone[data-open="true"]:hover {
          background: linear-gradient(135deg, #ff54b8 0%, #ff1a8c 100%);
          box-shadow: 0 6px 25px rgba(255, 46, 166, 0.75) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
