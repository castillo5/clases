import { Router, type Request, type Response } from 'express'
import { getBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/book.js'

const router = Router()

router.get('/', getBooks)
router.get('/:id', getBookById)
router.post('/', createBook)
router.put('/:id', updateBook)
router.delete('/:id', deleteBook)

export default router
