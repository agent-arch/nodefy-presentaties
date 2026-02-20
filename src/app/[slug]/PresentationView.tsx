'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'

interface Presentation {
  slug: string; title: string; client: string; date: string; type: string; status: string; content: string;
}

function mdToHtml(md: string): string {
  let html = md
    .replace(/^### (.*$)/gm, '<h3 class="text-base font-bold mt-5 mb-2" style="color:var(--text)">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-lg font-bold mt-7 mb-3" style="color:var(--text)">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-xl font-extrabold mt-7 mb-3" style="color:var(--text)">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold" style="color:var(--text)">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded text-sm" style="background:var(--tag-bg);color:var(--text-secondary)">$1</code>')
    .replace(/^- (.*$)/gm, '<li class="ml-4 list-disc" style="color:var(--text-secondary)">$1</li>')
    .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-4 list-decimal" style="color:var(--text-secondary)">$2</li>')
    .replace(/^> (.*$)/gm, '<blockquote class="border-l-3 pl-4 py-1 my-3 italic" style="border-color:var(--accent);color:var(--text-muted)">$1</blockquote>')
    .replace(/\n\n/g, '</p><p class="mb-3 text-[15px] leading-relaxed" style="color:var(--text-secondary)">')
    .replace(/^---$/gm, '<hr class="my-6" style="border-color:var(--border-light)" />')

  // Tables
  html = html.replace(/\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)+)/g, (match, header, body) => {
    const ths = header.split('|').filter((c: string) => c.trim()).map((c: string) =>
      `<th class="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider" style="color:var(--text-muted)">${c.trim()}</th>`
    ).join('')
    const rows = body.trim().split('\n').map((row: string) => {
      const tds = row.split('|').filter((c: string) => c.trim()).map((c: string) =>
        `<td class="px-3 py-2 text-sm" style="border-top:1px solid var(--border-light)">${c.trim()}</td>`
      ).join('')
      return `<tr>${tds}</tr>`
    }).join('')
    return `<div class="overflow-x-auto my-4 rounded-lg" style="border:1px solid var(--border-light)"><table class="w-full"><thead><tr style="background:var(--tag-bg)">${ths}</tr></thead><tbody>${rows}</tbody></table></div>`
  })

  return `<p class="mb-3 text-[15px] leading-relaxed" style="color:var(--text-secondary)">${html}</p>`
}

function parseSlides(content: string, title: string): { heading: string; subtitle?: string; body: string }[] {
  const sections = content.split(/^## /gm).filter(Boolean)

  if (sections.length <= 1) {
    const parts = content.split(/^---$/gm).filter(s => s.trim())
    if (parts.length <= 1) return [{ heading: title, body: mdToHtml(content) }]
    return parts.map((part, i) => {
      const lines = part.trim().split('\n')
      const firstLine = lines[0].replace(/^#+\s*/, '')
      return { heading: i === 0 ? title : firstLine, body: mdToHtml(part) }
    })
  }

  const firstPart = content.split(/^## /m)[0].trim()
  const slides: { heading: string; subtitle?: string; body: string }[] = []

  if (firstPart) slides.push({ heading: title, body: mdToHtml(firstPart) })

  sections.forEach((section, i) => {
    if (i === 0 && firstPart && !content.startsWith('## ')) return
    const lines = section.split('\n')
    const heading = lines[0].trim()
    const body = lines.slice(1).join('\n').trim()
    slides.push({ heading, body: mdToHtml(body) })
  })

  return slides
}

export default function PresentationView({ presentation }: { presentation: Presentation }) {
  const [mode, setMode] = useState<'slides' | 'doc'>('slides')
  const [current, setCurrent] = useState(0)
  const slides = parseSlides(presentation.content, presentation.title)
  const touchRef = useRef({ x: 0, t: 0 })

  const go = useCallback((dir: number) => {
    setCurrent(c => Math.max(0, Math.min(slides.length - 1, c + dir)))
  }, [slides.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (mode !== 'slides') return
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(1) }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
      if (e.key === 'Escape') setMode('doc')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [mode, go])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchRef.current = { x: e.touches[0].clientX, t: Date.now() }
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchRef.current.x
    const dt = Date.now() - touchRef.current.t
    if (Math.abs(dx) > 50 && dt < 500) go(dx < 0 ? 1 : -1)
  }

  // DOC MODE
  if (mode === 'doc') {
    return (
      <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <header className="px-6 py-4 sticky top-0 z-50 backdrop-blur" style={{ background: 'rgba(245,240,235,0.92)', borderBottom: '1px solid var(--border-light)' }}>
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-sm transition-colors" style={{ color: 'var(--text-muted)' }}>← Terug</Link>
              <span style={{ color: 'var(--border)' }}>|</span>
              <span className="font-semibold text-sm">{presentation.title}</span>
            </div>
            <button onClick={() => setMode('slides')} className="text-xs text-white px-3 py-1.5 rounded-lg font-semibold transition-colors" style={{ background: 'var(--accent)' }}>
              Slides →
            </button>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-6 py-8">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>{presentation.type}</span>
            <h1 className="text-3xl font-extrabold mt-2 tracking-tight">{presentation.title}</h1>
            <div className="flex items-center gap-3 mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              <span>{presentation.client}</span>
              {presentation.date && <><span>•</span><span>{presentation.date}</span></>}
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: mdToHtml(presentation.content) }} />
        </main>
      </div>
    )
  }

  // SLIDES MODE
  return (
    <div
      className="h-dvh w-screen overflow-hidden flex flex-col"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 z-50" style={{ borderBottom: '1px solid var(--border-light)' }}>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xs transition-colors" style={{ color: 'var(--text-muted)' }}>← Overzicht</Link>
          <button onClick={() => setMode('doc')} className="text-xs transition-colors" style={{ color: 'var(--text-muted)' }}>Docs</button>
        </div>
        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
          {current + 1} / {slides.length}
        </span>
      </div>

      {/* Slide content */}
      <div className="flex-1 overflow-hidden">
        <div
          className="flex transition-transform duration-400 ease-out h-full"
          style={{ transform: `translateX(-${current * 100}vw)`, transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="min-w-screen w-screen h-full overflow-y-auto px-6 py-8">
              <div className="max-w-xl mx-auto">
                {/* Slide type tag */}
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
                  {i === 0 ? presentation.type : `${String(i).padStart(2, '0')} ${slide.heading.split(' ').slice(0, 2).join(' ').toUpperCase()}`}
                </span>

                {/* Heading */}
                <h2 className="text-2xl font-extrabold tracking-tight mb-1">{slide.heading}</h2>

                {/* Subtitle for first slide */}
                {i === 0 && (
                  <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                    {presentation.client} — {presentation.date}
                  </p>
                )}

                {/* Content card */}
                <div
                  className="rounded-xl p-5 mt-4"
                  style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow)', border: '1px solid var(--border-light)' }}
                >
                  <div dangerouslySetInnerHTML={{ __html: slide.body }} />
                </div>

                {/* Info cards on first slide */}
                {i === 0 && (
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="rounded-lg p-3" style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow)', border: '1px solid var(--border-light)' }}>
                      <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Type</div>
                      <div className="text-sm font-semibold">{presentation.type}</div>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow)', border: '1px solid var(--border-light)' }}>
                      <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Datum</div>
                      <div className="text-sm font-semibold">{presentation.date || 'N/A'}</div>
                    </div>
                  </div>
                )}

                {/* Last slide: Nodefy branding */}
                {i === slides.length - 1 && (
                  <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'var(--accent)' }}>
                        <span className="text-white font-bold text-xs">N</span>
                      </div>
                      <span className="text-lg font-extrabold tracking-tight">NODEFY</span>
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>AI-Infused Digital Marketing</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom navigation */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{
          borderTop: '1px solid var(--border-light)',
          background: 'rgba(245,240,235,0.95)',
          backdropFilter: 'blur(8px)',
          paddingBottom: 'calc(12px + env(safe-area-inset-bottom))'
        }}
      >
        <button
          onClick={() => go(-1)}
          disabled={current === 0}
          className="text-sm font-semibold px-5 py-2 rounded-lg transition-colors min-w-[80px] disabled:opacity-30"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text)' }}
        >
          Vorige
        </button>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === current ? '24px' : '8px',
                background: i === current ? 'var(--accent)' : 'var(--border)',
              }}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          disabled={current === slides.length - 1}
          className="text-sm font-semibold text-white px-5 py-2 rounded-lg transition-colors min-w-[80px] disabled:opacity-30"
          style={{ background: 'var(--accent)' }}
        >
          Volgende
        </button>
      </div>
    </div>
  )
}
