import { type Request, type Response } from 'express'
import {
  getBooksService,
  getBookByIdService,
  createBookService,
  updateBookService,
  deleteBookService
} from '../services/book.services.js'
import { handleHttp } from '../utils/error.handler.js'

export const getBooks = async (_req: Request, res: Response) => {
  try {
    const books = await getBooksService()
    res.json({ ok: true, data: books })
  } catch (err) {
    const details = err instanceof Error ? err.message : err
    handleHttp(res, 'Failed to fetch books', 500, details)
  }
}

export const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string }
    const book = await getBookByIdService(id)
    if (!book) {
      return handleHttp(res, 'Book not found', 404)
    }
    res.json({ ok: true, data: book })
  } catch (err) {
    const details = err instanceof Error ? err.message : err
    handleHttp(res, 'Failed to fetch book', 500, details)
  }
}

export const createBook = async (req: Request, res: Response) => {
  try {
    const { author, name, ouwner } = req.body ?? {}
    if (!author || !name || !ouwner) {
      return handleHttp(res, 'author, name, ouwner are required', 400)
    }
    const created = await createBookService({ author, name, ouwner })
    res.status(201).json({ ok: true, data: created })
  } catch (err) {
    const details = err instanceof Error ? err.message : err
    handleHttp(res, 'Failed to create book', 500, details)
  }
}

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string }
    const { author, name, ouwner } = req.body ?? {}
    const updated = await updateBookService(id, { author, name, ouwner })
    if (!updated) {
      return handleHttp(res, 'Book not found', 404)
    }
    res.json({ ok: true, data: updated })
  } catch (err) {
    const details = err instanceof Error ? err.message : err
    handleHttp(res, 'Failed to update book', 500, details)
  }
}

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string }
    const removed = await deleteBookService(id)
    if (!removed) {
      return handleHttp(res, 'Book not found', 404)
    }
    res.status(204).send()
  } catch (err) {
    const details = err instanceof Error ? err.message : err
    handleHttp(res, 'Failed to delete book', 500, details)
  }
}

export default { getBooks, getBookById, createBook, updateBook, deleteBook }

