import { Router } from 'express'
import bcrypt from 'bcryptjs'
import type { AuthRequest } from '../middleware/auth.js'
import { db } from '../database.js'
import { generateToken, authMiddleware } from '../middleware/auth.js'

interface AdminRow {
  id: number
  username: string
  password: string
  name: string
  email: string
}

const router = Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body
  
  if (!username || !password) {
    res.status(400).json({ success: false, error: 'Username and password are required' })
    return
  }

  db.get('SELECT * FROM admins WHERE username = ?', [username], (err, user: AdminRow) => {
    if (err) {
      res.status(500).json({ success: false, error: 'Database error' })
      return
    }
    
    if (!user) {
      res.status(401).json({ success: false, error: 'Invalid credentials' })
      return
    }

    const isValid = bcrypt.compareSync(password, user.password)
    
    if (!isValid) {
      res.status(401).json({ success: false, error: 'Invalid credentials' })
      return
    }

    const token = generateToken(user)
    
    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email
        }
      }
    })
  })
})

router.get('/me', authMiddleware, (req, res) => {
  const authReq = req as AuthRequest
  res.json({
    success: true,
    data: authReq.user
  })
})

export default router
