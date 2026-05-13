import { Router } from 'express'
import { db } from '../database.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

router.get('/', authMiddleware, (req, res) => {
  const { page = 1, limit = 20, status } = req.query
  const offset = (Number(page) - 1) * Number(limit)
  
  let whereClause = 'WHERE 1=1'
  const params: (string | number)[] = []
  
  if (status) {
    whereClause += ' AND i.status = ?'
    params.push(String(status))
  }
  
  const countParams = [...params]
  
  db.get(`SELECT COUNT(*) as total FROM inquiries i ${whereClause}`, countParams, (err, countRow: { total: number }) => {
    if (err) {
      res.status(500).json({ success: false, error: 'Database error' })
      return
    }
    
    const queryParams = [...params, Number(limit), offset]
    
    db.all(
      `SELECT i.*, p.name as product_name, p.name_en as product_name_en 
       FROM inquiries i 
       LEFT JOIN products p ON i.product_id = p.id 
       ${whereClause} 
       ORDER BY i.created_at DESC 
       LIMIT ? OFFSET ?`,
      queryParams,
      (err, rows) => {
        if (err) {
          res.status(500).json({ success: false, error: 'Database error' })
          return
        }
        
        res.json({
          success: true,
          data: {
            data: rows,
            total: countRow.total,
            page: Number(page),
            limit: Number(limit)
          }
        })
      }
    )
  })
})

router.post('/', (req, res) => {
  const { name, email, phone, company, message, product_id } = req.body
  
  if (!name || !email || !message) {
    res.status(400).json({ success: false, error: 'Name, email and message are required' })
    return
  }
  
  db.run(
    'INSERT INTO inquiries (name, email, phone, company, message, product_id) VALUES (?, ?, ?, ?, ?, ?)',
    [name, email, phone, company, message, product_id || null],
    function(err) {
      if (err) {
        res.status(500).json({ success: false, error: 'Database error' })
        return
      }
      res.json({ success: true, data: { id: this.lastID } })
    }
  )
})

router.put('/:id', authMiddleware, (req, res) => {
  const { id } = req.params
  const { status } = req.body
  
  db.run(
    'UPDATE inquiries SET status = ? WHERE id = ?',
    [status, id],
    function(err) {
      if (err) {
        res.status(500).json({ success: false, error: 'Database error' })
        return
      }
      res.json({ success: true, data: { id: Number(id) } })
    }
  )
})

router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params
  
  db.run('DELETE FROM inquiries WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ success: false, error: 'Database error' })
      return
    }
    res.json({ success: true, data: { id: Number(id) } })
  })
})

export default router
