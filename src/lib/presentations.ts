import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const presentationsDir = path.join(process.cwd(), 'presentaties')

export interface Presentation {
  slug: string
  title: string
  client: string
  date: string
  type: string
  status: string
  content: string
  htmlContent?: string
}

export function getAllPresentations(): Presentation[] {
  if (!fs.existsSync(presentationsDir)) return []
  const files = fs.readdirSync(presentationsDir).filter(f => f.endsWith('.md'))
  
  return files.map(file => {
    const raw = fs.readFileSync(path.join(presentationsDir, file), 'utf-8')
    const { data, content } = matter(raw)
    return {
      slug: file.replace('.md', ''),
      title: data.title || file.replace('.md', '').replace(/-/g, ' '),
      client: data.client || 'Onbekend',
      date: data.date || '',
      type: data.type || 'Quick Scan',
      status: data.status || 'draft',
      content,
    }
  }).sort((a, b) => (b.date || '').localeCompare(a.date || ''))
}

export function getPresentation(slug: string): Presentation | null {
  const filePath = path.join(presentationsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title || slug.replace(/-/g, ' '),
    client: data.client || 'Onbekend',
    date: data.date || '',
    type: data.type || 'Quick Scan',
    status: data.status || 'draft',
    content,
  }
}
