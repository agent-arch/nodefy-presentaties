'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'

// ── Shared UI Components ──

function Tag({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--red)', marginBottom: 16 }}>{children}</div>
}

function H1({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, fontWeight: 400, lineHeight: 1.15, marginBottom: 20, color: 'var(--navy)', ...style }}>{children}</h1>
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, fontWeight: 400, lineHeight: 1.2, marginBottom: 16, color: 'var(--navy)' }}>{children}</h2>
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: 'var(--navy)' }}>{children}</h3>
}

function Subtitle({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 28, ...style }}>{children}</p>
}

export function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, marginBottom: 14, boxShadow: 'var(--card-shadow)', ...style }}>{children}</div>
}

export function CardLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{children}</div>
}

export function CardValue({ children, color = 'navy', size = 32 }: { children: React.ReactNode; color?: string; size?: number }) {
  const c = color === 'red' ? 'var(--red)' : color === 'green' ? 'var(--green)' : color === 'amber' ? 'var(--amber)' : 'var(--navy)'
  return <div style={{ fontSize: size, fontWeight: 800, color: c }}>{children}</div>
}

export function CardDetail({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.5, ...style }}>{children}</div>
}

export function Grid2({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>{children}</div>
}

export function Grid3({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 14 }}>{children}</div>
}

export function PlatformCard({ icon, name, detail, badge, badgeType = 'active' }: { icon: string; name: string; detail: string; badge: string; badgeType?: 'active' | 'inactive' | 'missing' }) {
  const badgeColors = {
    active: { background: '#dcfce7', color: '#16a34a' },
    inactive: { background: '#fef3c7', color: '#d97706' },
    missing: { background: '#fee2e2', color: '#dc2626' },
  }
  const bc = badgeColors[badgeType]
  return (
    <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 16, padding: 20, boxShadow: 'var(--card-shadow)', textAlign: 'center', opacity: badgeType === 'missing' ? 0.5 : 1 }}>
      <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>{name}</div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{detail}</div>
      <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, marginTop: 8, ...bc }}>{badge}</span>
    </div>
  )
}

export function StatusRow({ icon, color, label, value, valueColor }: { icon: string; color: 'red' | 'green' | 'amber'; label: string; value: string; valueColor?: string }) {
  const bgColors = { red: '#fee2e2', green: '#dcfce7', amber: '#fef3c7' }
  const vc = valueColor || (color === 'red' ? 'var(--red)' : color === 'amber' ? 'var(--amber)' : 'var(--green)')
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', borderBottom: '1px solid var(--border)', fontSize: 14 }}>
      <div style={{ width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0, background: bgColors[color] }}>{icon}</div>
      <span style={{ flex: 1, color: 'var(--text)', fontWeight: 500 }}>{label}</span>
      <span style={{ fontWeight: 600, fontSize: 13, color: vc }}>{value}</span>
    </div>
  )
}

export function TechRow({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)', fontSize: 14 }}>
      <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
      <span style={{ fontWeight: 600, color: valueColor || 'var(--navy)' }}>{value}</span>
    </div>
  )
}

export function Quote({ children }: { children: React.ReactNode }) {
  return <div style={{ borderLeft: '3px solid var(--red)', padding: '16px 20px', margin: '20px 0', background: 'white', borderRadius: '0 12px 12px 0', fontSize: 15, fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.6, boxShadow: 'var(--card-shadow)' }}>{children}</div>
}

export function CompBar({ label, score, color }: { label: string; score: number; color: 'red' | 'green' | 'amber' }) {
  const c = color === 'red' ? 'var(--red)' : color === 'green' ? 'var(--green)' : 'var(--amber)'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
      <span style={{ fontSize: 13, color: 'var(--text-secondary)', minWidth: 100 }}>{label}</span>
      <div style={{ flex: 1, height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 4, width: `${score}%`, background: c }} />
      </div>
      <span style={{ fontSize: 14, fontWeight: 700, minWidth: 32, textAlign: 'right', color: c }}>{score}</span>
    </div>
  )
}

export function StatBlock({ number, label }: { number: string; label: string }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 48, fontWeight: 900, color: 'var(--navy)', lineHeight: 1 }}>{number}</div>
      <div style={{ fontSize: 15, color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.4 }} dangerouslySetInnerHTML={{ __html: label }} />
    </div>
  )
}

export function NumBullet({ num, title, detail }: { num: number; title: string; detail: string }) {
  return (
    <li style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', fontSize: 14, lineHeight: 1.5, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: 'var(--red)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{num}</span>
      <span><strong>{title}</strong> — {detail}</span>
    </li>
  )
}

export function NumCard({ num, title, detail, borderColor = 'var(--red)' }: { num: number; title: string; detail: string; borderColor?: string }) {
  return (
    <Card style={{ borderLeft: `3px solid ${borderColor}` }}>
      <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--red)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 600, marginBottom: 20 }}>{num}</div>
      <H3>{title}</H3>
      <CardDetail>{detail}</CardDetail>
    </Card>
  )
}

// ── Slide Engine ──

export interface SlideProps {
  tag: string
  children: React.ReactNode
  centered?: boolean
}

export function Slide({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

interface SlideEngineProps {
  title: string
  client: string
  date: string
  type: string
  slides: React.ReactNode[]
}

export default function SlideEngine({ title, client, date, type, slides }: SlideEngineProps) {
  const [mode, setMode] = useState<'slides' | 'doc'>('slides')
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(new Set([0]))
  const touchRef = useRef({ x: 0, t: 0 })

  const go = useCallback((dir: number) => {
    setCurrent(c => {
      const next = Math.max(0, Math.min(slides.length - 1, c + dir))
      setVisible(v => new Set([...v, next]))
      return next
    })
  }, [slides.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (mode !== 'slides') return
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(1) }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [mode, go])

  const onTouchStart = (e: React.TouchEvent) => { touchRef.current = { x: e.touches[0].clientX, t: Date.now() } }
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchRef.current.x
    if (Math.abs(dx) > 50 && Date.now() - touchRef.current.t < 500) go(dx < 0 ? 1 : -1)
  }

  // Slides mode
  return (
    <div style={{ height: '100dvh', width: '100vw', background: 'var(--bg)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {/* Counter */}
      <div style={{ position: 'fixed', top: 18, right: 24, fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, zIndex: 100, background: 'rgba(255,255,255,0.8)', padding: '4px 12px', borderRadius: 20, backdropFilter: 'blur(10px)' }}>
        {current + 1} / {slides.length}
      </div>

      {/* Back */}
      <div style={{ position: 'fixed', top: 18, left: 24, zIndex: 100, display: 'flex', gap: 8 }}>
        <Link href="/" style={{ fontSize: 12, color: 'var(--text-muted)', background: 'rgba(255,255,255,0.8)', padding: '4px 12px', borderRadius: 20, backdropFilter: 'blur(10px)', textDecoration: 'none' }}>← Overzicht</Link>
      </div>

      {/* Slides */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{
          display: 'flex',
          transition: 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: `translateX(-${current * 100}vw)`,
          willChange: 'transform',
        }}>
          {slides.map((slide, i) => (
            <div key={i} style={{ minWidth: '100vw', height: 'calc(100dvh - 72px)', padding: '32px 24px 16px', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <div style={{ maxWidth: 680, margin: '0 auto' }}>
                <div style={{
                  opacity: visible.has(i) ? 1 : 0,
                  transform: visible.has(i) ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'all 0.5s ease',
                }}>
                  {slide}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nav */}
      <div style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border)',
        padding: '14px 24px',
        paddingBottom: 'calc(14px + env(safe-area-inset-bottom))',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button onClick={() => go(-1)} disabled={current === 0} style={{
          background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--text)',
          padding: '10px 22px', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer',
          minWidth: 90, textAlign: 'center', fontFamily: 'inherit', opacity: current === 0 ? 0.3 : 1,
        }}>Vorige</button>

        <div style={{ display: 'flex', gap: 6, flex: 1, justifyContent: 'center' }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => { setCurrent(i); setVisible(v => new Set([...v, i])) }} style={{
              width: i === current ? 24 : 8, height: 8, borderRadius: i === current ? 4 : '50%',
              background: i === current ? 'var(--red)' : 'var(--border)',
              transition: 'all 0.3s', cursor: 'pointer',
            }} />
          ))}
        </div>

        <button onClick={() => go(1)} disabled={current === slides.length - 1} style={{
          background: 'var(--red)', border: '1px solid var(--red)', color: 'white',
          padding: '10px 22px', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer',
          minWidth: 90, textAlign: 'center', fontFamily: 'inherit',
          opacity: current === slides.length - 1 ? 0.3 : 1,
        }}>{current === slides.length - 1 ? 'Klaar' : 'Volgende'}</button>
      </div>
    </div>
  )
}

export { Tag, H1, H2, H3, Subtitle }
