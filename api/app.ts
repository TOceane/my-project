import express, { Request, Response } from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'
import categoryRoutes from './routes/categories.js'
import inquiryRoutes from './routes/inquiries.js'
import uploadRoutes from './routes/upload.js'
import settingsRoutes from './routes/settings.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app: express.Application = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')))

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/inquiries', inquiryRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/settings', settingsRoutes)

app.use('/api/health', (req: Request, res: Response): void => {
  res.status(200).json({ success: true, message: 'ok' })
})

app.use((error: Error, _req: Request, res: Response) => {
  console.error(error)
  res.status(500).json({ success: false, error: 'Server internal error' })
})

app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, error: 'API not found' })
})

export default app
