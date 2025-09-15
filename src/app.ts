import express from 'express'
import cors from 'cors'
import { config as dotenvConfig } from 'dotenv'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { existsSync } from 'node:fs'
import booksRouter from './routes/books.js'

// Load env from src/.env to align with repo guidelines
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
{
  const candidates = [
    join(__dirname, '.env'), // when running via ts-node (src) or mistakenly in dist
    join(__dirname, '../src/.env'), // when running compiled from dist
    join(process.cwd(), '.env') // fallback to project root
  ]
  for (const p of candidates) {
    if (existsSync(p)) {
      dotenvConfig({ path: p })
      break
    }
  }
}

export const app = express()

const corsOrigins = process.env.CORS_ORIGIN?.split(',').map((s) => s.trim()).filter(Boolean)
app.use(cors({ origin: corsOrigins && corsOrigins.length > 0 ? corsOrigins : true }))
app.use(express.json())
app.use('/books', booksRouter)



app.get('/', (_req, res) => {
  res.json({ ok: true, message: 'API up' })
})

const PORT = Number(process.env.PORT) || 3001

// Start the server only when this file is executed directly.
// Keeps `app` importable for tests and tools.
if (process.argv[1] === __filename) {
  app
    .listen(PORT, () => {
      console.log(`server running on port ${PORT}`)
    })
    .on('error', (err) => {
      console.error('Failed to start server:', err)
    })
}

export default app
