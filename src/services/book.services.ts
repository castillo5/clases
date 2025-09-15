import { promises as fs, existsSync } from 'fs'
import type { IBook } from '../interfaces/book.interface.js'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const candidates = [
  join(__dirname, '../models/books.json'), // dist/services -> dist/models (if assets are copied)
  join(process.cwd(), 'src/models/books.json') // fallback to source in dev/build
]
let filePath: string
{
  const found = candidates.find((p) => existsSync(p))
  filePath = found ? found : join(process.cwd(), 'src/models/books.json')
}

export const getBooksService = async (): Promise<IBook[]> => {
  const data = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(data) as IBook[]
}

export const getBookByIdService = async (id: string): Promise<IBook | undefined> => {
  const books = await getBooksService()
  return books.find((b) => b.id === id)
}

export const createBookService = async (payload: Omit<IBook, 'id'>): Promise<IBook> => {
  const books = await getBooksService()
  const nextId = String(
    books
      .map((b) => Number(b.id))
      .filter((n) => Number.isFinite(n))
      .reduce((max, n) => Math.max(max, n), 0) + 1
  )
  const newBook: IBook = { id: nextId, ...payload }
  const updated = [...books, newBook]
  await fs.writeFile(filePath, JSON.stringify(updated, null, 2), 'utf-8')
  return newBook
}

export const updateBookService = async (
  id: string,
  payload: Partial<Omit<IBook, 'id'>>
): Promise<IBook | undefined> => {
  const books = await getBooksService()
  const idx = books.findIndex((b) => b.id === id)
  if (idx === -1) return undefined
  const existing = books[idx] as IBook
  const updated: IBook = {
    id,
    author: payload.author ?? existing.author,
    name: payload.name ?? existing.name,
    ouwner: payload.ouwner ?? existing.ouwner
  }
  const next = [...books]
  next[idx] = updated
  await fs.writeFile(filePath, JSON.stringify(next, null, 2), 'utf-8')
  return updated
}

export const deleteBookService = async (id: string): Promise<boolean> => {
  const books = await getBooksService()
  const next = books.filter((b) => b.id !== id)
  if (next.length === books.length) return false
  await fs.writeFile(filePath, JSON.stringify(next, null, 2), 'utf-8')
  return true
}
