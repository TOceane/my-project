import { Router } from 'express'
import { db } from '../database.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

router.get('/', (req, res) => {
  db.all('SELECT * FROM categories ORDER BY sort_order', (err, rows) => {
    if (err) {
      res.status(500).json({ success: false, error: 'Database error' })
      return
    }
    res.json({ success: true, data: rows })
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  db.get('SELECT * FROM categories WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ success: false, error: 'Database error' })
      return
    }
    if (!row) {
      res.status(404).json({ success: false, error: 'Category not found' })
      return
    }
    res.json({ success: true, data: row })
  })
})

router.post('/', authMiddleware, (req, res) => {
  const { name, name_en, description, image, sort_order } = req.body
  
  db.run(
    'INSERT INTO categories (name, name_en, description, image, sort_order) VALUES (?, ?, ?, ?, ?)',
    [name, name_en, description, image, sort_order || 0],
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
  const { name, name_en, description, image, sort_order, is_active } = req.body
  
  db.run(
    'UPDATE categories SET name = ?, name_en = ?, description = ?, image = ?, sort_order = ?, is_active = ? WHERE id = ?',
    [name, name_en, description, image, sort_order, is_active, id],
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
  
  db.run('DELETE FROM categories WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ success: false, error: 'Database error' })
      return
    }
    res.json({ success: true, data: { id: Number(id) } })
  })
})

export default router
