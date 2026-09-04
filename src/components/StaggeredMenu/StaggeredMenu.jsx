import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import logo from "../../assets/logo.png";
import logoText from "../../assets/logo_text.png";

export const StaggeredMenu = ({
  position = "right",
  colors = ["#00e5ff", "#ff2ea6", "#0c0422"],
  items = [
    { label: "Home", ariaLabel: "Go to home page", link: "#home" },
    { label: "About", ariaLabel: "About Hackatopia", link: "#about" },
    { label: "Tracks", ariaLabel: "Explore Hackathon Tracks", link: "#domains" },
    { label: "Rules", ariaLabel: "View Hackathon Rules", link: "#rules" },
    { label: "Timeline", ariaLabel: "Hackathon Schedule", link: "#timeline" },
    { label: "Sponsors", ariaLabel: "View our sponsors", link: "#sponsors" },
    { label: "FAQ", ariaLabel: "Frequently asked questions", link: "#faq" },
    { label: "Contact", ariaLabel: "Get in touch with organizers", link: "#contact" },
  ],
  socialItems = [
    { label: "Discord", link: "https://discord.gg" },
    { label: "GitHub", link: "https://github.com" },
    { label: "Instagram", link: "https://instagram.com" },
    { label: "Devfolio", link: "https://devfolio.co" },
  ],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = logo,
  menuButtonColor = "#ffffff",
  openMenuButtonColor = "#00e5ff",
  changeMenuColorOnOpen = true,
  isFixed = true,
  accentColor = "#00e5ff",
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);
  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);
  const textInnerRef = useRef(null);
  const textWrapRef = useRef(null);
  const [textLines, setTextLines] = useState(["MENU", "CLOSE"]);
  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
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
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;
    openTlRef.current?.kill();
    if (closeTweenRef.current) { closeTweenRef.current.kill(); closeTweenRef.current = null; }
    itemEntranceTweenRef.current?.kill();
    const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
    const numberEls = Array.from(panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"));
    const socialTitle = panel.querySelector(".sm-socials-title");
    const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link"));
    const registerCta = panel.querySelector(".sm-register-cta");
    const offscreen = position === "left" ? -100 : 100;
    const layerStates = layers.map(el => ({ el, start: offscreen }));
    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { ["--sm-num-opacity"]: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0, y: 15 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 20, opacity: 0 });
    if (registerCta) gsap.set(registerCta, { y: 25, opacity: 0, scale: 0.95 });
    const tl = gsap.timeline({ paused: true });
    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.45, ease: "power4.out" }, i * 0.06);
    });
    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.06 : 0;
    const panelInsert = lastTime + (layerStates.length ? 0.07 : 0);
    const panelDuration = 0.6;
    tl.fromTo(panel, { xPercent: offscreen }, { xPercent: 0, duration: panelDuration, ease: "power4.out" }, panelInsert);
    if (itemEls.length) {
      const itemsStart = panelInsert + panelDuration * 0.15;
      tl.to(itemEls, { yPercent: 0, rotate: 0, duration: 0.8, ease: "power4.out", stagger: { each: 0.06 } }, itemsStart);
      if (numberEls.length)
        tl.to(numberEls, { duration: 0.5, ease: "power2.out", ["--sm-num-opacity"]: 1, stagger: { each: 0.05 } }, itemsStart + 0.08);
    }
    const socialsStart = panelInsert + panelDuration * 0.35;
    if (registerCta) tl.to(registerCta, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.5)" }, socialsStart);
    if (socialTitle) tl.to(socialTitle, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, socialsStart + 0.05);
    if (socialLinks.length) tl.to(socialLinks, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out", stagger: { each: 0.06 }, onComplete: () => gsap.set(socialLinks, { clearProps: "opacity" }) }, socialsStart + 0.08);
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
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;
    closeTweenRef.current?.kill();
    const offscreen = position === "left" ? -100 : 100;
    closeTweenRef.current = gsap.to([...layers, panel], {
      xPercent: offscreen, duration: 0.3, ease: "power3.in", overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
        const numberEls = Array.from(panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"));
        const socialTitle = panel.querySelector(".sm-socials-title");
        const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link"));
        const registerCta = panel.querySelector(".sm-register-cta");
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        if (numberEls.length) gsap.set(numberEls, { ["--sm-num-opacity"]: 0 });
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 20, opacity: 0 });
        if (registerCta) gsap.set(registerCta, { opacity: 0 });
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
        .to(h, { rotate: 45, duration: 0.4 }, 0)
        .to(v, { rotate: -45, duration: 0.4 }, 0);
    } else {
      spinTweenRef.current = gsap.timeline({ defaults: { ease: "power3.inOut" } })
        .to(h, { rotate: 0, duration: 0.3 }, 0)
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
    const targetLabel = opening ? "CLOSE" : "MENU";
    const cycles = 2;
    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) { last = last === "MENU" ? "CLOSE" : "MENU"; seq.push(last); }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);
    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });
    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;
    textCycleAnimRef.current = gsap.to(inner, { yPercent: -finalShift, duration: 0.4 + lineCount * 0.05, ease: "power4.out" });
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

  React.useEffect(() => {
    if (open) {
      window.dispatchEvent(new CustomEvent('lenis:stop'));
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      window.dispatchEvent(new CustomEvent('lenis:start'));
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      window.dispatchEvent(new CustomEvent('lenis:start'));
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const craftBurst = (e, color) => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
    for (let i = 0; i < 8; i++) {
      const p = document.createElement("div");
      p.style.cssText = "position:fixed;width:5px;height:5px;background:" + color + ";pointer-events:none;z-index:9999;left:" + cx + "px;top:" + cy + "px;border-radius:1px;";
      document.body.appendChild(p);
      const angle = (Math.PI * 2 * i) / 8;
      const dist = 26 + Math.random() * 14;
      p.animate(
        [{ transform: "translate(0,0)", opacity: 1 }, { transform: "translate(" + (Math.cos(angle) * dist) + "px," + (Math.sin(angle) * dist) + "px)", opacity: 0 }],
        { duration: 320, easing: "ease-out" }
      );
      setTimeout(() => p.remove(), 340);
    }
  };

  const navThemes = [
    // Cyan family (0-3)
    { baseColor: "#00e5ff", hoverBg: "linear-gradient(90deg, #00e5ff 0%, #00bfff 100%)", hoverShadow: "0 0 30px rgba(0, 229, 255, 0.7)", hoverText: "#030e26", hoverTagBg: "rgba(3, 14, 38, 0.9)", hoverTagText: "#00e5ff", hoverBorder: "#80f0ff" },
    { baseColor: "#00d4ff", hoverBg: "linear-gradient(90deg, #00d4ff 0%, #00a8ee 100%)", hoverShadow: "0 0 30px rgba(0, 212, 255, 0.7)", hoverText: "#030e26", hoverTagBg: "rgba(3, 14, 38, 0.9)", hoverTagText: "#00d4ff", hoverBorder: "#80e5ff" },
    { baseColor: "#00b8ee", hoverBg: "linear-gradient(90deg, #00b8ee 0%, #0090d8 100%)", hoverShadow: "0 0 30px rgba(0, 184, 238, 0.7)", hoverText: "#030e26", hoverTagBg: "rgba(3, 14, 38, 0.9)", hoverTagText: "#00b8ee", hoverBorder: "#80d8ff" },
    { baseColor: "#009edd", hoverBg: "linear-gradient(90deg, #009edd 0%, #0077c2 100%)", hoverShadow: "0 0 30px rgba(0, 158, 221, 0.7)", hoverText: "#030e26", hoverTagBg: "rgba(3, 14, 38, 0.9)", hoverTagText: "#009edd", hoverBorder: "#80c8ff" },
    // Pink family (4-7)
    { baseColor: "#ff2ea6", hoverBg: "linear-gradient(90deg, #ff2ea6 0%, #ff007f 100%)", hoverShadow: "0 0 30px rgba(255, 46, 166, 0.75)", hoverText: "#030e26", hoverTagBg: "rgba(3, 14, 38, 0.9)", hoverTagText: "#00f0ff", hoverBorder: "#ff80cc" },
    { baseColor: "#f01da5", hoverBg: "linear-gradient(90deg, #f01da5 0%, #d8006e 100%)", hoverShadow: "0 0 30px rgba(240, 29, 165, 0.75)", hoverText: "#030e26", hoverTagBg: "rgba(3, 14, 38, 0.9)", hoverTagText: "#00f0ff", hoverBorder: "#ff80cc" },
    { baseColor: "#db0f9c", hoverBg: "linear-gradient(90deg, #db0f9c 0%, #c00060 100%)", hoverShadow: "0 0 32px rgba(219, 15, 156, 0.75)", hoverText: "#030e26", hoverTagBg: "rgba(3, 14, 38, 0.9)", hoverTagText: "#00f0ff", hoverBorder: "#ff80cc" },
    { baseColor: "#c2008e", hoverBg: "linear-gradient(90deg, #c2008e 0%, #a40050 100%)", hoverShadow: "0 0 32px rgba(194, 0, 142, 0.75)", hoverText: "#030e26", hoverTagBg: "rgba(3, 14, 38, 0.9)", hoverTagText: "#00f0ff", hoverBorder: "#ff80cc" },
  ];
  const buildings = [42, 65, 54, 82, 46, 70, 58, 92, 48, 68, 62, 88, 52, 78, 38, 74, 56, 68];

  return (
    <div className={"sm-scope " + (isFixed ? "fixed top-0 left-0 w-full z-50 pointer-events-none" : "relative w-full h-full")}>
      <div
        className={(className ? className + " " : "") + "staggered-menu-wrapper relative w-full h-full"}
        style={accentColor ? { ["--sm-accent"]: accentColor } : undefined}
        data-position={position}
        data-open={open || undefined}
      >
        {/* Prelayers */}
        <div ref={preLayersRef} className="sm-prelayers fixed top-0 right-0 bottom-0 pointer-events-none z-[55]" aria-hidden="true">
          {(colors && colors.length ? colors.slice(0, 4) : ["#00e5ff", "#ff2ea6", "#0c0422"]).map((c, i) => (
            <div key={i} className="sm-prelayer absolute top-0 right-0 h-full w-full shadow-2xl" style={{ background: c }} />
          ))}
        </div>

        {/* NAVBAR */}
        <header className="staggered-menu-header w-full flex items-center justify-between px-6 sm:px-10 py-4 sm:py-5 pointer-events-none z-[60]" aria-label="Main navigation header">
          <a href="#home" className="sm-logo pointer-events-auto select-none group flex items-center" aria-label="Go to home">
            <div className="sm-logo-circle relative w-13 h-13 sm:w-22 sm:h-22 rounded-full p-2 flex items-center justify-center transition-all duration-300">
              <img src={logoUrl} alt="Hackatopia Logo" className="w-full h-full object-contain rounded-full" draggable={false} />
            </div>
          </a>

          <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
            <button
              ref={toggleBtnRef}
              className="sm-toggle craft-pixel-btn craft-stone pointer-events-auto"
              data-open={open}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="staggered-menu-panel"
              onClick={e => { toggleMenu(); craftBurst(e, open ? "#4fd3e8" : "#8a8f9c"); }}
              type="button"
            >
              <span ref={textWrapRef} className="sm-toggle-textWrap relative inline-block h-[1.2em] overflow-hidden whitespace-nowrap" aria-hidden="true">
                <span ref={textInnerRef} className="sm-toggle-textInner flex flex-col leading-none">
                  {textLines.map((l, i) => <span className="sm-toggle-line block h-[1.2em] leading-none" key={i}>{l}</span>)}
                </span>
              </span>
              <span ref={iconRef} className="sm-icon relative w-4 h-4 shrink-0 inline-flex items-center justify-center" aria-hidden="true">
                <span ref={plusHRef} className="sm-icon-line absolute left-1/2 top-1/2 w-full h-[2.5px] bg-current rounded-[1px] -translate-x-1/2 -translate-y-1/2" />
                <span ref={plusVRef} className="sm-icon-line sm-icon-line-v absolute left-1/2 top-1/2 w-full h-[2.5px] bg-current rounded-[1px] -translate-x-1/2 -translate-y-1/2" />
              </span>
            </button>
          </div>
        </header>

        {/* SLIDING PANEL */}
        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          className="sm-panel fixed top-0 right-0 h-screen flex flex-col overflow-y-auto z-[58] pointer-events-auto"
          aria-hidden={!open}
          onWheel={e => e.stopPropagation()}
          onTouchMove={e => e.stopPropagation()}
        >
          {/* Pixel City Skyline */}
          <div className="sm-skyline-strip" aria-hidden="true">
            {buildings.map((h, i) => (
              <div key={i} className="sm-sky-building" style={{ height: h + "px", animationDelay: (i * 0.1) + "s" }}>
                <div className="sm-sky-window" style={{ animationDelay: (i * 0.28 + 0.4) + "s" }} />
              </div>
            ))}
          </div>

          {/* Panel content */}
          <div className="sm-panel-content flex-1 flex flex-col justify-between p-6 sm:p-8 pt-2 relative z-10 min-h-min" data-lenis-prevent="true">

            {/* Top section: Header row + divider */}
            <div className="flex flex-col gap-3">
              {/* Header row: CLOSE button */}
              <div className="flex items-center justify-end pt-0.5">
                <button
                  className="craft-pixel-btn craft-close"
                  onClick={e => { closeMenu(); craftBurst(e, "#ef4444"); }}
                  aria-label="Close menu"
                  type="button"
                >
                  <span className="craft-close-icon">X</span>
                </button>
              </div>

              {/* Question-block divider */}
              <div className="sm-q-divider">
                <div className="sm-q-line" />
                <div className="sm-q-block">?</div>
                <div className="sm-q-line" />
              </div>
            </div>

            {/* Nav links */}
            <div className="my-auto py-2">
              <ul className="sm-panel-list list-none m-0 p-0 flex flex-col gap-1.5 sm:gap-2" role="list">
                {items.map((it, idx) => {
                  const theme = navThemes[idx] || navThemes[0];
                  return (
                    <li className="sm-panel-itemWrap relative overflow-hidden" key={it.label + idx}>
                      <a
                        className="sm-nav-link group relative flex items-center justify-between w-full px-4 py-2.5 sm:py-3 rounded-xl border no-underline cursor-pointer select-none"
                        href={it.link}
                        aria-label={it.ariaLabel}
                        data-index={idx + 1}
                        onClick={closeMenu}
                        style={{
                          "--item-base-color": theme.baseColor,
                          "--item-hover-bg": theme.hoverBg,
                          "--item-hover-shadow": theme.hoverShadow,
                          "--item-hover-text": theme.hoverText,
                          "--item-hover-border": theme.hoverBorder,
                          "--item-hover-tag-bg": theme.hoverTagBg,
                          "--item-hover-tag-text": theme.hoverTagText,
                        }}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          {/* Slide-in arrow indicator */}
                          <span className="sm-arrow font-pixel text-xs">
                            ▶
                          </span>

                          {/* Nav Label */}
                          <span className="sm-panel-itemLabel font-black text-2xl sm:text-3xl md:text-[2.1rem] leading-none uppercase tracking-wide">
                            {it.label}
                          </span>
                        </div>

                        {/* Number Tag */}
                        {displayItemNumbering && (
                          <span className="sm-num-tag font-pixel text-[0.65rem] px-2.5 py-1 rounded-md select-none">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Bottom section: REGISTER NOW button */}
            <div className="pt-5 pb-2 border-t border-white/10 flex flex-col gap-3 active:scale-90">
              <div className="sm-register-cta px-4 sm:px-6">
                <a
                  href="https://forms.gle/vso2h1azUy2k3MkPA"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => { closeMenu(); craftBurst(e, "#ffcc4d"); }}
                  className="sm-reg-btn group relative w-full flex items-center justify-center py-3.5 sm:py-4 px-6 rounded-xl text-sm sm:text-[0.95rem] font-black uppercase tracking-[0.16em] text-[#1a0a00] transition-all duration-300 no-underline overflow-hidden select-none"
                >
                  {/* Shimmer sweep effect */}
                  <span className="sm-btn-shimmer absolute inset-0 w-full h-full pointer-events-none" />
                  <span className="relative z-10">
                    REGISTER NOW
                  </span>
                </a>
              </div>
            </div>

          </div>
        </aside>
      </div>

      <style>{`
        .sm-scope .sm-panel {
          width: clamp(320px, 36vw, 480px);
          background: radial-gradient(circle at 100% 0%, #160733 0%, #060112 70%);
          border-left: 2px solid rgba(0,212,255,0.22);
          box-shadow: -25px 0 90px rgba(0,0,0,0.95), inset 1px 0 0 rgba(255,255,255,0.06);
          overflow-y: auto !important;
          overscroll-behavior: contain !important;
          overscroll-behavior-y: contain !important;
          touch-action: pan-y !important;
          -webkit-overflow-scrolling: touch;
        }
        .sm-scope .sm-panel::-webkit-scrollbar {
          width: 5px;
        }
        .sm-scope .sm-panel::-webkit-scrollbar-track {
          background: rgba(8, 2, 28, 0.6);
        }
        .sm-scope .sm-panel::-webkit-scrollbar-thumb {
          background: rgba(0, 229, 255, 0.4);
          border-radius: 4px;
        }
        .sm-scope .sm-panel::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 229, 255, 0.8);
        }
        .sm-scope [data-position='left'] .sm-panel { right: auto; left: 0; border-left: none; border-right: 2px solid rgba(0,212,255,0.22); }
        .sm-scope .sm-prelayers { width: clamp(320px, 36vw, 480px); }
        .sm-scope [data-position='left'] .sm-prelayers { right: auto; left: 0; }
        @media (max-width: 640px) {
          .sm-scope .sm-panel, .sm-scope .sm-prelayers { width: 100vw; }
        }
        .sm-scope .staggered-menu-header {
          background: transparent !important;
          border-bottom: none !important;
          box-shadow: none !important;
        }
        .sm-scope .sm-skyline-strip {
          display: flex; align-items: flex-end; gap: 2px; padding: 0 14px; height: 108px;
          flex-shrink: 0; background: linear-gradient(180deg, #08021a 0%, #0e0330 100%);
          border-bottom: 2px solid rgba(0,212,255,0.1); overflow: hidden; position: relative;
        }
        .sm-scope .sm-skyline-strip::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 10px;
          background: linear-gradient(90deg, rgba(0,212,255,0.12), rgba(255,46,166,0.12), rgba(0,212,255,0.12));
        }
        .sm-scope .sm-sky-building {
          flex: 1; min-width: 9px; border-radius: 2px 2px 0 0;
          background: linear-gradient(180deg, #180440 0%, #0c0224 100%);
          border: 1px solid rgba(255,255,255,0.05); border-bottom: none; position: relative;
          animation: smRise 0.5s ease both;
        }
        .sm-scope .sm-sky-building:nth-child(even)  { background: linear-gradient(180deg, #1c0848 0%, #100230 100%); }
        .sm-scope .sm-sky-building:nth-child(3n)    { background: linear-gradient(180deg, #200a50 0%, #140338 100%); }
        .sm-scope .sm-sky-window {
          position: absolute; top: 7px; left: 50%; transform: translateX(-50%);
          width: 4px; height: 4px; border-radius: 1px;
          background: #00e5ff; box-shadow: 0 0 6px #00e5ff;
          animation: smBlink 2.5s infinite ease-in-out;
        }
        .sm-scope .sm-sky-building:nth-child(even) .sm-sky-window { background: #ff2ea6; box-shadow: 0 0 6px #ff2ea6; }
        .sm-scope .sm-sky-building:nth-child(3n)   .sm-sky-window { background: #ffcc4d; box-shadow: 0 0 6px #ffcc4d; }
        @keyframes smRise  { from { transform: scaleY(0); transform-origin: bottom; } to { transform: scaleY(1); transform-origin: bottom; } }
        @keyframes smBlink { 0%,100% { opacity: 1; } 50% { opacity: 0.15; } }
        
        .sm-scope .sm-q-divider { display: flex; align-items: center; gap: 10px; }
        .sm-scope .sm-q-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(0,212,255,0.35), transparent); }
        .sm-scope .sm-q-block {
          font-family: 'Press Start 2P', monospace; font-size: 0.6rem; color: #1a0a00;
          background: #ffcc4d; border: 2px solid #b8860f;
          box-shadow: 0 3px 0 #b8860f, inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -2px 0 rgba(0,0,0,0.3);
          width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border-radius: 4px;
        }

        /* Nav link high-contrast interactive motion styling */
        .sm-scope .sm-nav-link {
          background: transparent;
          border-color: rgba(255, 255, 255, 0.04);
          transition: background 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sm-scope .sm-nav-link .sm-panel-itemLabel {
          color: var(--item-base-color);
          text-shadow: none !important;
          transition: color 0.24s ease, transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sm-scope .sm-nav-link .sm-arrow {
          color: var(--item-hover-text);
          opacity: 0;
          transform: translateX(-12px) scale(0.7);
          transition: opacity 0.24s ease, transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), color 0.24s ease;
        }

        .sm-scope .sm-nav-link .sm-num-tag {
          color: rgba(255, 255, 255, 0.35);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: color 0.24s ease, background 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease, transform 0.28s ease;
        }

        /* Hover Active State */
        .sm-scope .sm-nav-link:hover {
          background: var(--item-hover-bg) !important;
          border-color: var(--item-hover-border) !important;
          box-shadow: var(--item-hover-shadow), 0 10px 30px rgba(0, 0, 0, 0.6) !important;
          transform: translateX(6px) scale(1.02);
        }

        .sm-scope .sm-nav-link:hover .sm-panel-itemLabel {
          color: var(--item-hover-text) !important;
          text-shadow: none !important;
          transform: translateX(4px);
        }

        .sm-scope .sm-nav-link:hover .sm-arrow {
          opacity: 1;
          transform: translateX(0) scale(1);
          color: var(--item-hover-text) !important;
        }

        .sm-scope .sm-nav-link:hover .sm-num-tag {
          color: var(--item-hover-tag-text) !important;
          background: var(--item-hover-tag-bg) !important;
          border-color: rgba(255, 255, 255, 0.25) !important;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5) !important;
          transform: scale(1.05);
        }

        /* Button styles */
        .sm-scope .craft-pixel-btn {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-weight: 800;
          font-size: 0.88rem;
          letter-spacing: 0.12em;
          text-decoration: none !important;
          border: none;
          min-height: 50px;
          padding: 16px 28px;
          cursor: pointer;
          clip-path: polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px);
          transform: translate(0, 0);
          transition: transform 0.12s ease, box-shadow 0.18s ease, background 0.22s ease;
          user-select: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          position: relative;
        }
        .sm-scope .craft-pixel-btn * {
          text-decoration: none !important;
          border-bottom: none !important;
          box-shadow: none !important;
        }
        .sm-scope .sm-toggle-textWrap,
        .sm-scope .sm-toggle-textInner,
        .sm-scope .sm-toggle-line {
          text-decoration: none !important;
          border-bottom: none !important;
          line-height: 1 !important;
        }
        .sm-scope .craft-pixel-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          clip-path: inherit;
          box-shadow: inset 0 2px 0 rgba(255,255,255,0.65), inset 0 -4px 0 rgba(0,0,0,0.25) !important;
          pointer-events: none;
        }
        .sm-scope .craft-pixel-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 0 #008fa8, 0 14px 32px rgba(0, 240, 255, 0.65) !important;
        }
        .sm-scope .craft-pixel-btn:active {
          transform: translate(3px, 3px);
          box-shadow: 0 1px 0 #008fa8 !important;
        }
        .sm-scope .craft-pixel-btn:active::after {
          box-shadow: inset 0 2px 0 rgba(0,0,0,0.3) !important;
        }
        
        /* High Contrast Luminous Cyber Button (Blue with Black text) */
        .sm-scope .craft-stone {
          background: linear-gradient(135deg, #00f0ff 0%, #00c4e6 100%);
          border: 1.5px solid #a8f5ff;
          box-shadow: 0 4px 0 #008fa8, 0 8px 25px rgba(0, 240, 255, 0.45);
          color: #040e24 !important;
        }
        .sm-scope .craft-stone:hover {
          background: linear-gradient(135deg, #38f6ff 0%, #00dcff 100%);
          color: #040e24 !important;
          box-shadow: 0 6px 0 #008fa8, 0 12px 35px rgba(0, 240, 255, 0.7) !important;
          transform: translateY(-2px);
        }
        .sm-scope .craft-stone[data-open="true"] {
          background: linear-gradient(135deg, #ff2ea6 0%, #ff007f 100%);
          border: 1.5px solid #ffb3e0;
          box-shadow: 0 4px 0 #9e0050, 0 8px 25px rgba(255, 46, 166, 0.5);
          color: #ffffff !important;
        }
        .sm-scope .craft-stone[data-open="true"]:hover {
          background: linear-gradient(135deg, #ff54b8 0%, #ff1a8c 100%);
          box-shadow: 0 6px 0 #9e0050, 0 12px 35px rgba(255, 46, 166, 0.75) !important;
          transform: translateY(-2px);
        }
        
        .sm-scope .craft-close {
          background: #ef4444; box-shadow: 4px 4px 0 #991b1b; color: #fff;
          min-height: auto !important;
          width: 32px !important;
          height: 32px !important;
          padding: 0 !important;
          font-size: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          clip-path: polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px);
          transition: all 0.2s ease;
        }
        .sm-scope .craft-close:hover {
          background: #f87171;
          box-shadow: 0 0 16px rgba(239, 68, 68, 0.6), 4px 4px 0 #991b1b;
          transform: scale(1.05);
        }
        .sm-scope .craft-close-icon { font-family: 'Inter', sans-serif; font-size: 0.85rem; font-weight: 900; line-height: 1; color: #fff; display: block; }
        
        /* Register Now CTA */
        .sm-scope .sm-reg-btn {
          font-family: 'Inter', system-ui, sans-serif;
          background: linear-gradient(135deg, #ffcc00 0%, #ff9e00 50%, #ff7300 100%);
          box-shadow: 0 5px 0 #a34e00, 0 10px 25px rgba(255, 154, 0, 0.35), inset 0 2px 0 rgba(255,255,255,0.7), inset 0 -2px 0 rgba(0,0,0,0.15);
          border: 1.5px solid #ffe680;
        }
        .sm-scope .sm-reg-btn:hover {
          background: linear-gradient(135deg, #ffe066 0%, #ffaa00 50%, #ff8500 100%);
          box-shadow: 0 7px 0 #a34e00, 0 14px 30px rgba(255, 170, 0, 0.5), inset 0 2px 0 rgba(255,255,255,0.85);
          transform: translateY(-2px);
        }
        .sm-scope .sm-reg-btn:active {
          transform: translateY(3px);
          box-shadow: 0 2px 0 #a34e00, 0 6px 15px rgba(255, 154, 0, 0.25);
        }
        
        .sm-scope .sm-btn-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: translateX(-100%) skewX(-20deg);
          animation: smShimmer 3.5s infinite;
        }
        @keyframes smShimmer {
          0%, 60% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
