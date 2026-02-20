import Link from 'next/link'

const presentations = [
  { slug: 'code-zero-quickscan', title: 'CODE-ZERO Quick Scan', client: 'CODE-ZERO B.V.', type: 'Quick Scan', date: '2026-02-20', status: 'ready' },
]

const statusColors: Record<string, string> = {
  draft: 'bg-amber-100 text-amber-700',
  ready: 'bg-emerald-100 text-emerald-700',
  sent: 'bg-blue-100 text-blue-700',
}

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <header style={{ padding: '48px 24px 32px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>N</span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--text-muted)' }}>Nodefy</span>
          </div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, fontWeight: 400, marginTop: 16, color: 'var(--navy)' }}>Presentaties</h1>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginTop: 4 }}>Quick scans, audits & klantpresentaties</p>
        </div>
      </header>

      <main style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px 48px' }}>
        {presentations.map(p => (
          <Link key={p.slug} href={`/${p.slug}`} style={{
            display: 'flex', alignItems: 'center', gap: 16,
            background: 'var(--white)', border: '1px solid var(--border)',
            borderRadius: 16, padding: '20px 24px', marginBottom: 12,
            boxShadow: 'var(--card-shadow)', textDecoration: 'none', color: 'var(--text)',
            transition: 'box-shadow 0.2s, border-color 0.2s',
          }}>
            <span style={{ fontSize: 28 }}>🔍</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{p.title}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[p.status]}`}>{p.status}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, display: 'flex', gap: 8 }}>
                <span>{p.client}</span><span>•</span><span>{p.type}</span><span>•</span><span>{p.date}</span>
              </div>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--red)', background: '#C41E1E15', padding: '6px 14px', borderRadius: 8 }}>Open →</span>
          </Link>
        ))}
      </main>
    </div>
  )
}
