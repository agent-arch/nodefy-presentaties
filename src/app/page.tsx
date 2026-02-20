import { getAllPresentations } from '@/lib/presentations'
import Link from 'next/link'

const statusColors: Record<string, string> = {
  draft: 'bg-amber-100 text-amber-700',
  ready: 'bg-emerald-100 text-emerald-700',
  sent: 'bg-blue-100 text-blue-700',
  archived: 'bg-gray-100 text-gray-500',
}

const typeIcons: Record<string, string> = {
  'Quick Scan': '🔍',
  'Audit': '📊',
  'Voorstel': '📋',
  'Presentatie': '📽️',
}

export default function Home() {
  const presentations = getAllPresentations()

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Header */}
      <header className="px-6 pt-12 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#c8102e] flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Nodefy</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-4">Presentaties</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Quick scans, audits & klantpresentaties
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 pb-12">
        {presentations.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">📂</p>
            <h2 className="text-lg font-semibold mb-2">Nog geen presentaties</h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Voeg een <code className="px-1.5 py-0.5 rounded text-xs" style={{ background: 'var(--tag-bg)' }}>.md</code> bestand toe aan de <code className="px-1.5 py-0.5 rounded text-xs" style={{ background: 'var(--tag-bg)' }}>presentaties/</code> map.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {presentations.map(p => (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                className="group flex items-center gap-4 rounded-xl px-5 py-4 transition-all hover:shadow-lg"
                style={{
                  background: 'var(--bg-card)',
                  boxShadow: 'var(--shadow)',
                  border: '1px solid var(--border-light)',
                }}
              >
                <span className="text-2xl">{typeIcons[p.type] || '📄'}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-[15px] truncate">{p.title}</h2>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[p.status] || statusColors.draft}`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{p.client}</span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>•</span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{p.type}</span>
                    {p.date && <>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>•</span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{p.date}</span>
                    </>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-lg" style={{ color: 'var(--text-muted)', background: 'var(--tag-bg)' }}>Docs</span>
                  <span className="text-xs px-2.5 py-1 rounded-lg font-medium" style={{ color: 'var(--accent)', background: 'var(--accent-light)' }}>Slides</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
