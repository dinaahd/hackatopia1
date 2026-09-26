import React, { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  BookOpen,
  List,
  ScrollText,
  FileText
} from 'lucide-react'

const TOTAL_PAGES = 17

const PAGE_DIRECTORY = [
  { page: 1, title: 'Official Cover', desc: 'Hackatopia 2026' },
  { page: 2, title: 'About Hackatopia', desc: 'Event Overview & Phases' },
  { page: 3, title: 'Team & Domains', desc: 'Eligibility & 4 Tracks' },
  { page: 4, title: 'Phase 1 - Ideathon', desc: 'PPT Submission Guide' },
  { page: 5, title: 'Phase 1 Evaluation', desc: 'Judging & Shortlisting' },
  { page: 6, title: 'Confirmation', desc: 'Shortlisted Team RSVP' },
  { page: 7, title: 'Phase 2 - Hackathon', desc: '24-Hour Final Round' },
  { page: 8, title: 'Development Rules', desc: 'Tech Stacks & Guidelines' },
  { page: 9, title: 'AI Tools Policy', desc: 'Permitted AI Usage' },
  { page: 10, title: 'Deliverables', desc: 'Submission Requirements' },
  { page: 11, title: 'Final Pitching', desc: 'Presentation Format' },
  { page: 12, title: 'Judging Criteria', desc: 'Scoring Breakdown' },
  { page: 13, title: 'Code of Conduct', desc: 'Respect & Fair Play' },
  { page: 14, title: 'Disqualification', desc: 'Violation Penalties' },
  { page: 15, title: 'Intellectual Property', desc: 'Originality & Rights' },
  { page: 16, title: 'Logistics & Safety', desc: 'Gear & Belongings' },
  { page: 17, title: 'Media & Closing', desc: 'Consent & Organizers' },
]

export default function RulebookModal({ isOpen, onClose, initialPage = 1 }) {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [viewMode, setViewMode] = useState('scroll') // 'scroll' (continuous) or 'single'
  const [zoom, setZoom] = useState(1)
  const [showToc, setShowToc] = useState(false)
  const [loadedPages, setLoadedPages] = useState({})
  const scrollContainerRef = useRef(null)
  const touchStartRef = useRef(null)

  // Sync initial page when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(initialPage)
      setZoom(1)
      setShowToc(false)
      // Stop Lenis background scrolling
      window.dispatchEvent(new CustomEvent('lenis:stop'))
      document.body.style.overflow = 'hidden'
    } else {
      window.dispatchEvent(new CustomEvent('lenis:start'))
      document.body.style.overflow = ''
    }

    return () => {
      window.dispatchEvent(new CustomEvent('lenis:start'))
      document.body.style.overflow = ''
    }
  }, [isOpen, initialPage])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (viewMode === 'single') {
          setCurrentPage((prev) => Math.min(prev + 1, TOTAL_PAGES))
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (viewMode === 'single') {
          setCurrentPage((prev) => Math.max(prev - 1, 1))
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, viewMode, onClose])

  // Touch swipe support for single page mode
  const handleTouchStart = (e) => {
    if (viewMode !== 'single' || e.touches.length !== 1) return
    touchStartRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (viewMode !== 'single' || touchStartRef.current === null) return
    const diff = touchStartRef.current - e.changedTouches[0].clientX
    touchStartRef.current = null
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left -> Next page
        setCurrentPage((prev) => Math.min(prev + 1, TOTAL_PAGES))
      } else {
        // Swiped right -> Prev page
        setCurrentPage((prev) => Math.max(prev - 1, 1))
      }
    }
  }

  const scrollToPage = useCallback((pageNum) => {
    setCurrentPage(pageNum)
    setShowToc(false)
    if (viewMode === 'scroll') {
      const el = document.getElementById(`rulebook-page-${pageNum}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [viewMode])

  const handlePageLoaded = (page) => {
    setLoadedPages((prev) => ({ ...prev, [page]: true }))
  }

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isOpen || !mounted || typeof document === 'undefined') return null

  return createPortal(
    <div
      id="rulebook-modal"
      className="fixed inset-0 z-[99999] flex flex-col bg-[#060312]/95 backdrop-blur-xl select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Hackatopia Official Rulebook"
    >
      {/* ── TOP HEADER / TOOLBAR ── */}
      <header className="flex-shrink-0 flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3.5 bg-[#0e0824]/90 border-b border-[#00e5ff]/25 shadow-[0_4px_20px_rgba(0,0,0,0.8)] z-20">
        {/* Left: Title & Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00e5ff]/15 border border-[#00e5ff]/40 flex items-center justify-center text-[#00e5ff] shadow-[0_0_10px_rgba(0,229,255,0.3)]">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-xs sm:text-sm text-white tracking-wider">
                RULEBOOK
              </span>
              <span className="hidden sm:inline-block font-mono text-[0.65rem] px-2 py-0.5 rounded bg-[#ff2ea6]/20 border border-[#ff2ea6]/40 text-[#ff2ea6]">
                HACKATOPIA 2026
              </span>
            </div>
            <p className="hidden md:block text-[0.7rem] text-white/50 font-mono">
              Official Guidelines & Judging Criteria
            </p>
          </div>
        </div>

        {/* Center: Controls for Pages / Mode */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Table of contents toggle */}
          <button
            onClick={() => setShowToc((v) => !v)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 border ${
              showToc
                ? 'bg-[#00e5ff]/20 text-[#00e5ff] border-[#00e5ff]'
                : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
            title="Index / Table of Contents"
          >
            <List className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">INDEX</span>
          </button>

          {/* Mode Switcher: Continuous Scroll vs Single Page */}
          <div className="hidden sm:flex items-center bg-black/40 rounded-lg p-0.5 border border-white/10 text-xs font-mono">
            <button
              onClick={() => setViewMode('scroll')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                viewMode === 'scroll'
                  ? 'bg-[#00e5ff] text-black font-bold shadow-[0_0_8px_rgba(0,229,255,0.5)]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Scroll All
            </button>
            <button
              onClick={() => setViewMode('single')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                viewMode === 'single'
                  ? 'bg-[#ff2ea6] text-white font-bold shadow-[0_0_8px_rgba(255,46,166,0.5)]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Page-by-Page
            </button>
          </div>

          {/* Single Page Prev/Next controls */}
          {viewMode === 'single' && (
            <div className="flex items-center gap-1 bg-black/40 px-1 py-0.5 rounded-lg border border-white/10">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
                title="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs text-[#00e5ff] px-1 font-semibold">
                {currentPage}/{TOTAL_PAGES}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
                disabled={currentPage >= TOTAL_PAGES}
                className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
                title="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Zoom Controls (hidden on small phones to save space) */}
          <div className="hidden lg:flex items-center gap-1 bg-black/40 px-1.5 py-1 rounded-lg border border-white/10">
            <button
              onClick={() => setZoom((z) => Math.max(0.7, z - 0.15))}
              className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[0.7rem] text-white/70 px-1 w-10 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(1.8, z + 0.15))}
              className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            {zoom !== 1 && (
              <button
                onClick={() => setZoom(1)}
                className="p-1 rounded text-[#00e5ff] hover:bg-[#00e5ff]/20"
                title="Reset zoom"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Download, Open Original & Close */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Download Original PDF Button */}
          <a
            href="/rulebook.pdf"
            download="Hackatopia_Official_Rulebook.pdf"
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-[#2ED3E8]/10 hover:bg-[#2ED3E8]/25 border border-[#2ED3E8]/40 text-[#2ED3E8] text-xs font-mono transition-all duration-200"
            title="Download PDF to device"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-bold">PDF</span>
          </a>

          {/* Open original PDF in new tab */}
          <a
            href="/rulebook.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white text-xs font-mono transition-all duration-200"
            title="Open raw PDF file in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/25 border border-red-500/30 text-red-400 hover:text-red-300 flex items-center justify-center transition-all duration-200 shadow-[0_0_10px_rgba(239,68,68,0.2)] ml-1"
            title="Close rulebook (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* Table of Contents / Index Drawer */}
        {showToc && (
          <aside className="absolute left-0 top-0 bottom-0 z-30 w-72 sm:w-80 bg-[#090518]/98 border-r border-[#00e5ff]/30 shadow-[4px_0_30px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col p-4 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <span className="font-pixel text-xs text-[#00e5ff] tracking-wider">
                TABLE OF CONTENTS
              </span>
              <button
                onClick={() => setShowToc(false)}
                className="p-1 rounded text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 text-xs font-mono">
              {PAGE_DIRECTORY.map((item) => (
                <button
                  key={item.page}
                  onClick={() => scrollToPage(item.page)}
                  className={`w-full text-left p-2.5 rounded-lg flex items-start gap-2.5 transition-all ${
                    currentPage === item.page
                      ? 'bg-[#00e5ff]/15 border border-[#00e5ff]/50 text-white'
                      : 'hover:bg-white/5 text-white/70 hover:text-white border border-transparent'
                  }`}
                >
                  <span
                    className={`px-1.5 py-0.5 rounded text-[0.65rem] font-bold ${
                      currentPage === item.page
                        ? 'bg-[#00e5ff] text-black'
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {String(item.page).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate text-white">
                      {item.title}
                    </div>
                    <div className="text-[0.65rem] text-white/50 truncate">
                      {item.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Quick Switch to Scroll / Page Mode */}
            <div className="pt-3 border-t border-white/10 mt-2 flex gap-2">
              <button
                onClick={() => {
                  setViewMode(viewMode === 'scroll' ? 'single' : 'scroll')
                  setShowToc(false)
                }}
                className="w-full py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white text-xs font-mono flex items-center justify-center gap-2"
              >
                <ScrollText className="w-3.5 h-3.5" />
                <span>Switch to {viewMode === 'scroll' ? 'Page-by-Page' : 'Continuous Scroll'}</span>
              </button>
            </div>
          </aside>
        )}

        {/* Document Viewer Container */}
        <main
          ref={scrollContainerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-6 lg:p-8 flex flex-col items-center custom-scrollbar"
          style={{
            background: 'radial-gradient(ellipse at center top, rgba(20, 10, 48, 0.6) 0%, rgba(6, 3, 18, 0.98) 100%)',
          }}
        >
          {/* Continuous Scroll View: All pages stacked vertically */}
          {viewMode === 'scroll' && (
            <div
              className="flex flex-col items-center gap-6 sm:gap-10 w-full max-w-3xl transition-transform duration-200"
              style={{
                transform: zoom !== 1 ? `scale(${zoom})` : 'none',
                transformOrigin: 'top center',
              }}
            >
              {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((pageNum) => (
                <div
                  key={pageNum}
                  id={`rulebook-page-${pageNum}`}
                  className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.85)] border border-white/10 group transition-all duration-300 hover:border-[#00e5ff]/40 bg-[#0d0720]"
                >
                  {/* Top Bar for each page */}
                  <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-black/60 backdrop-blur-md border-b border-white/5 text-[0.65rem] sm:text-xs font-mono text-white/60">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00e5ff] inline-block animate-pulse" />
                      PAGE {pageNum} OF {TOTAL_PAGES}
                    </span>
                    <span className="text-white/40 truncate max-w-[200px]">
                      {PAGE_DIRECTORY[pageNum - 1]?.title}
                    </span>
                  </div>

                  {/* High-res WebP Page Image */}
                  <div className="relative min-h-[400px] flex items-center justify-center bg-[#0d0720]">
                    {!loadedPages[pageNum] && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0d0720]">
                        <div className="w-8 h-8 border-2 border-[#00e5ff] border-t-transparent rounded-full animate-spin" />
                        <span className="font-pixel text-[0.65rem] text-[#00e5ff]/70 tracking-widest">
                          LOADING PAGE {pageNum}...
                        </span>
                      </div>
                    )}
                    <img
                      src={`/rulebook_pages/page_${pageNum}.webp`}
                      alt={`Hackatopia Official Rulebook Page ${pageNum}`}
                      loading={pageNum <= 3 ? 'eager' : 'lazy'}
                      decoding="async"
                      onLoad={() => handlePageLoaded(pageNum)}
                      className={`w-full h-auto object-contain transition-opacity duration-300 ${
                        loadedPages[pageNum] ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Single Page View: Clean Page by Page with touch-swipe */}
          {viewMode === 'single' && (
            <div
              className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl py-2 transition-transform duration-200"
              style={{
                transform: zoom !== 1 ? `scale(${zoom})` : 'none',
                transformOrigin: 'top center',
              }}
            >
              <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.9)] border border-[#00e5ff]/30 bg-[#0d0720]">
                {/* Header info */}
                <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 bg-black/70 backdrop-blur-md border-b border-white/10 text-xs font-mono text-white/80">
                  <span className="flex items-center gap-2 font-bold text-[#00e5ff]">
                    PAGE {currentPage} OF {TOTAL_PAGES}
                  </span>
                  <span className="text-white/60">
                    {PAGE_DIRECTORY[currentPage - 1]?.title}
                  </span>
                </div>

                {/* Page Image */}
                <div className="relative min-h-[480px] sm:min-h-[600px] flex items-center justify-center bg-[#0d0720]">
                  {!loadedPages[currentPage] && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0d0720]">
                      <div className="w-10 h-10 border-2 border-[#ff2ea6] border-t-transparent rounded-full animate-spin" />
                      <span className="font-pixel text-xs text-[#ff2ea6] tracking-widest">
                        LOADING PAGE {currentPage}...
                      </span>
                    </div>
                  )}
                  <img
                    src={`/rulebook_pages/page_${currentPage}.webp`}
                    alt={`Hackatopia Official Rulebook Page ${currentPage}`}
                    key={currentPage}
                    decoding="async"
                    onLoad={() => handlePageLoaded(currentPage)}
                    className={`w-full h-auto object-contain transition-opacity duration-200 ${
                      loadedPages[currentPage] ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
              </div>

              {/* Bottom Quick Page Bar for Single View */}
              <div className="flex items-center justify-between w-full mt-4 px-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white font-mono text-xs disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>PREVIOUS</span>
                </button>

                <span className="font-pixel text-[0.65rem] sm:text-xs text-white/50 tracking-wider">
                  SWIPE OR ARROWS TO TURN
                </span>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
                  disabled={currentPage >= TOTAL_PAGES}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00e5ff]/15 hover:bg-[#00e5ff]/30 border border-[#00e5ff]/40 text-[#00e5ff] font-mono text-xs disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <span>NEXT</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── MOBILE QUICK ACTION FOOTER BAR ── */}
      <footer className="sm:hidden flex-shrink-0 flex items-center justify-between px-4 py-2.5 bg-[#0a051d] border-t border-white/10 z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'scroll' ? 'single' : 'scroll')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-mono"
          >
            <ScrollText className="w-3.5 h-3.5 text-[#00e5ff]" />
            <span>{viewMode === 'scroll' ? 'Scroll Mode' : 'Page Mode'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/rulebook.pdf"
            download="Hackatopia_Official_Rulebook.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2ED3E8]/20 border border-[#2ED3E8]/40 text-[#2ED3E8] text-xs font-mono font-bold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOWNLOAD</span>
          </a>
        </div>
      </footer>
    </div>,
    document.body
  )
}
