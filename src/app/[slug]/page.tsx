import { getPresentation, getAllPresentations } from '@/lib/presentations'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PresentationView from './PresentationView'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return getAllPresentations().map(p => ({ slug: p.slug }))
}

export default async function PresentationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const presentation = getPresentation(slug)
  if (!presentation) notFound()

  return <PresentationView presentation={presentation} />
}
