import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { authMiddleware } from '../middleware/auth.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '..', 'public', 'uploads'))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  }
})

const router = Router()

router.post('/', authMiddleware, upload.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ success: false, error: 'No file uploaded' })
    return
  }
  
  const fileUrl = `/uploads/${req.file.filename}`
  res.json({ success: true, data: { url: fileUrl } })
})

export default router
