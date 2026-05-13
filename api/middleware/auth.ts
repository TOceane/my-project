import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const JWT_SECRET = process.env.JWT_SECRET || 'luxehair-secret-key-2024'

interface TokenPayload {
  id: number
  username: string
  name: string
  email: string
}

export interface AuthRequest extends Request {
  user?: TokenPayload
}

export const generateToken = (user: TokenPayload) => {
  return jwt.sign(
    { id: user.id, username: user.username, name: user.name, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET)
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'Unauthorized' })
    return
  }

  const token = authHeader.substring(7)
  
  try {
    const decoded = verifyToken(token) as TokenPayload
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ success: false, error: 'Invalid token' })
  }
}
