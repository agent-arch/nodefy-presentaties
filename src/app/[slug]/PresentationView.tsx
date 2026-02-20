'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'

interface Presentation {
  slug: string; title: string; client: string; date: string; type: string; status: string; content: string;
}

// Parse markdown to HTML (simple but effective)
function mdToHtml(md: string): string {
  let html = md
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-6 mb-3">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-extrabold mt-8 mb-4">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-[#1e1e2e] px-1.5 py-0.5 rounded text-sm">$1</code>')
    .replace(/^- (.*$)/gm, '<li class="ml-4 list-disc text-[#c8c8d0]">$1</li>')
    .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-4 list-decimal text-[#c8c8d0]">$2</li>')
    .replace(/^> (.*$)/gm, '<blockquote class="border-l-3 border-[#3b82f6] pl-4 py-1 my-3 text-[#8b8b93] italic">$1</blockquote>')
    .replace(/\n\n/g, '</p><p class="mb-3 text-[15px] leading-relaxed text-[#c8c8d0]">')
    .replace(/^---$/gm, '<hr class="border-[#1e1e2e] my-6" />')

  // Tables
  html = html.replace(/\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)+)/g, (match, header, body) => {
    const ths = header.split('|').filter((c: string) => c.trim()).map((c: string) => `<th class="px-3 py-2 text-left text-xs font-semibold text-[#8b8b93] uppercase tracking-wider">${c.trim()}</th>`).join('')
    const rows = body.trim().split('\n').map((row: string) => {
      const tds = row.split('|').filter((c: string) => c.trim()).map((c: string) => `<td class="px-3 py-2 text-sm border-t border-[#1e1e2e]">${c.trim()}</td>`).join('')
      return `<tr>${tds}</tr>`
    }).join('')
    return `<div class="overflow-x-auto my-4"><table class="w-full"><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table></div>`
  })

  return `<p class="mb-3 text-[15px] leading-relaxed text-[#c8c8d0]">${html}</p>`
}

// Parse markdown into slide sections (split on ## headings)
function parseSlides(content: string, title: string): { heading: string; body: string }[] {
  const sections = content.split(/^## /gm).filter(Boolean)
  
  if (sections.length <= 1) {
    // No ## headings, split on --- instead
    const parts = content.split(/^---$/gm).filter(s => s.trim())
    if (parts.length <= 1) {
      return [{ heading: title, body: mdToHtml(content) }]
    }
    return parts.map((part, i) => {
      const lines = part.trim().split('\n')
      const firstLine = lines[0].replace(/^#+\s*/, '')
      return { heading: i === 0 ? title : firstLine, body: mdToHtml(part) }
    })
  }

  // First section before any ## is intro
  const firstPart = content.split(/^## /m)[0].trim()
  const slides: { heading: string; body: string }[] = []
  
  if (firstPart) {
    slides.push({ heading: title, body: mdToHtml(firstPart) })
  }

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

  if (mode === 'doc') {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-[#e8e8ed]">
        <header className="border-b border-[#1e1e2e] px-6 py-4 sticky top-0 bg-[#0a0a0f]/95 backdrop-blur z-50">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-[#5a5a63] hover:text-[#8b8b93] transition-colors text-sm">← Terug</Link>
              <span className="text-[#1e1e2e]">|</span>
              <span className="font-semibold text-sm">{presentation.title}</span>
            </div>
            <button onClick={() => setMode('slides')} className="text-xs bg-[#3b82f6] text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-[#2563eb] transition-colors">
              Slides →
            </button>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-6 py-8">
          <div className="mb-6">
            <span className="text-xs text-[#3b82f6] font-semibold uppercase tracking-wider">{presentation.type}</span>
            <h1 className="text-3xl font-extrabold mt-2 tracking-tight">{presentation.title}</h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-[#8b8b93]">
              <span>{presentation.client}</span>
              {presentation.date && <><span className="text-[#5a5a63]">•</span><span>{presentation.date}</span></>}
            </div>
          </div>
          <div className="prose-dark" dangerouslySetInnerHTML={{ __html: mdToHtml(presentation.content) }} />
        </main>
      </div>
    )
  }

  // Slides mode
  return (
    <div className="h-dvh w-screen bg-[#0a0a0f] text-[#e8e8ed] overflow-hidden flex flex-col" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {/* Slide counter */}
      <div className="fixed top-4 right-5 z-50 text-xs text-[#5a5a63] bg-[#12121a]/80 backdrop-blur px-2.5 py-1 rounded-full">
        {current + 1} / {slides.length}
      </div>

      {/* Back button */}
      <div className="fixed top-4 left-5 z-50 flex gap-2">
        <Link href="/" className="text-xs text-[#5a5a63] bg-[#12121a]/80 backdrop-blur px-2.5 py-1 rounded-full hover:text-[#8b8b93]">← Overzicht</Link>
        <button onClick={() => setMode('doc')} className="text-xs text-[#5a5a63] bg-[#12121a]/80 backdrop-blur px-2.5 py-1 rounded-full hover:text-[#8b8b93]">Docs</button>
      </div>

      {/* Slide content */}
      <div className="flex-1 overflow-hidden">
        <div className="flex transition-transform duration-400 ease-out" style={{ transform: `translateX(-${current * 100}vw)`, transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
          {slides.map((slide, i) => (
            <div key={i} className="min-w-screen w-screen h-[calc(100dvh-72px)] overflow-y-auto px-6 pt-14 pb-8">
              <div className="max-w-xl mx-auto">
                {i === 0 && (
                  <span className="inline-block text-xs font-bold text-[#3b82f6] uppercase tracking-widest mb-3">{presentation.type}</span>
                )}
                <h2 className="text-2xl font-extrabold tracking-tight mb-6">{slide.heading}</h2>
                <div dangerouslySetInnerHTML={{ __html: slide.body }} />
                {i === 0 && (
                  <div className="mt-8 flex gap-4 text-sm text-[#5a5a63]">
                    <span>{presentation.client}</span>
                    {presentation.date && <span>{presentation.date}</span>}
                  </div>
                )}
                {i === slides.length - 1 && (
                  <div className="mt-12 text-center">
                    <div className="text-[#5a5a63] text-xs mb-2">Uitgevoerd door</div>
                    <div className="text-lg font-extrabold tracking-tight">NODEFY</div>
                    <div className="text-xs text-[#5a5a63]">AI-Infused Digital Marketing</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-[#1e1e2e] bg-[#12121a]/95 backdrop-blur px-5 py-3 flex items-center justify-between" style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom))' }}>
        <button onClick={() => go(-1)} disabled={current === 0} className="text-sm font-semibold bg-[#12121a] border border-[#1e1e2e] px-5 py-2 rounded-lg disabled:opacity-30 hover:bg-[#1e1e2e] transition-colors min-w-[80px]">Vorige</button>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-[#3b82f6]' : 'w-2 bg-[#5a5a63]'}`} />
          ))}
        </div>
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="text-sm font-semibold bg-[#3b82f6] px-5 py-2 rounded-lg disabled:opacity-30 hover:bg-[#2563eb] transition-colors min-w-[80px]">Volgende</button>
      </div>
    </div>
  )
}
