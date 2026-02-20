import { getAllPresentations } from '@/lib/presentations'
import Link from 'next/link'

const statusColors: Record<string, string> = {
  draft: 'bg-yellow-500/20 text-yellow-400',
  ready: 'bg-green-500/20 text-green-400',
  sent: 'bg-blue-500/20 text-blue-400',
  archived: 'bg-zinc-500/20 text-zinc-400',
}

const typeIcons: Record<string, string> = {
  'Quick Scan': '🔍',
  'Audit': '📊',
  'Voorstel': '📋',
  'Presentatie': '📽️',
}

export const dynamic = 'force-dynamic'

export default function Home() {
  const presentations = getAllPresentations()

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e8e8ed]">
      {/* Header */}
      <header className="border-b border-[#1e1e2e] px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Nodefy Presentaties</h1>
            <p className="text-sm text-[#8b8b93] mt-1">Klant presentaties, quick scans & audits</p>
          </div>
          <span className="text-xs text-[#5a5a63] bg-[#12121a] border border-[#1e1e2e] px-3 py-1.5 rounded-lg">{presentations.length} presentaties</span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {presentations.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">📂</p>
            <h2 className="text-lg font-semibold mb-2">Nog geen presentaties</h2>
            <p className="text-sm text-[#8b8b93] max-w-md mx-auto">
              Voeg een <code className="bg-[#1e1e2e] px-1.5 py-0.5 rounded text-xs">.md</code> bestand toe aan de <code className="bg-[#1e1e2e] px-1.5 py-0.5 rounded text-xs">presentaties/</code> map om te beginnen.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {presentations.map(p => (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                className="group flex items-center gap-4 bg-[#12121a] border border-[#1e1e2e] rounded-xl px-5 py-4 hover:border-[#3b82f6]/40 hover:bg-[#151520] transition-all"
              >
                <span className="text-2xl">{typeIcons[p.type] || '📄'}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-[15px] truncate group-hover:text-[#3b82f6] transition-colors">{p.title}</h2>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[p.status] || statusColors.draft}`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-[#8b8b93]">{p.client}</span>
                    <span className="text-xs text-[#5a5a63]">•</span>
                    <span className="text-xs text-[#5a5a63]">{p.type}</span>
                    {p.date && <>
                      <span className="text-xs text-[#5a5a63]">•</span>
                      <span className="text-xs text-[#5a5a63]">{p.date}</span>
                    </>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs text-[#5a5a63] bg-[#1e1e2e] px-2.5 py-1 rounded-lg group-hover:bg-[#252530] transition-colors">MD</span>
                  <span className="text-xs text-[#3b82f6] bg-[#3b82f6]/10 px-2.5 py-1 rounded-lg">Slides</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
