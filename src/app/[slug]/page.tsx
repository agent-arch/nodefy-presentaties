import { getPresentation, getAllPresentations } from '@/lib/presentations'
import { notFound } from 'next/navigation'
import PresentationView from './PresentationView'

export function generateStaticParams() {
  return getAllPresentations().map(p => ({ slug: p.slug }))
}

export default async function PresentationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const presentation = getPresentation(slug)
  if (!presentation) notFound()

  return <PresentationView presentation={presentation} />
}
