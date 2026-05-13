import { Router } from 'express'
import { db } from '../database.js'
import { authMiddleware } from '../middleware/auth.js'

interface ProductRow {
  [key: string]: unknown
  images: string
}

const router = Router()

router.get('/', (req, res) => {
  const { page = 1, limit = 12, categoryId, search, material, color } = req.query
  const offset = (Number(page) - 1) * Number(limit)
  
  let whereClause = 'WHERE 1=1'
  const params: (string | number)[] = []
  
  if (categoryId) {
    whereClause += ' AND p.category_id = ?'
    params.push(Number(categoryId))
  }
  
  if (search) {
    whereClause += ' AND (p.name LIKE ? OR p.name_en LIKE ?)'
    params.push(`%${search}%`, `%${search}%`)
  }
  
  if (material) {
    whereClause += ' AND p.material = ?'
    params.push(String(material))
  }
  
  if (color) {
    whereClause += ' AND p.color = ?'
    params.push(String(color))
  }
  
  const countParams = [...params]
  
  db.get(`SELECT COUNT(*) as total FROM products p ${whereClause}`, countParams, (err, countRow: { total: number }) => {
    if (err) {
      res.status(500).json({ success: false, error: 'Database error' })
      return
    }
    
    const queryParams = [...params, Number(limit), offset]
    
    db.all(
      `SELECT p.*, c.name as category_name, c.name_en as category_name_en 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       ${whereClause} 
       ORDER BY p.created_at DESC 
       LIMIT ? OFFSET ?`,
      queryParams,
      (err, rows) => {
        if (err) {
          res.status(500).json({ success: false, error: 'Database error' })
          return
        }
        
        const products = rows.map((row: ProductRow) => ({
          ...row,
          images: row.images ? JSON.parse(row.images) : []
        }))
        
        res.json({
          success: true,
          data: {
            data: products,
            total: countRow.total,
            page: Number(page),
            limit: Number(limit)
          }
        })
      }
    )
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  
  db.get(
    `SELECT p.*, c.name as category_name, c.name_en as category_name_en 
     FROM products p 
     LEFT JOIN categories c ON p.category_id = c.id 
     WHERE p.id = ?`,
    [id],
    (err, row: ProductRow) => {
      if (err) {
        res.status(500).json({ success: false, error: 'Database error' })
        return
      }
      if (!row) {
        res.status(404).json({ success: false, error: 'Product not found' })
        return
      }
      
      const product = {
        ...row,
        images: row.images ? JSON.parse(row.images) : []
      }
      
      res.json({ success: true, data: product })
    }
  )
})

router.post('/', authMiddleware, (req, res) => {
  const {
    name, name_en, description, description_en, price,
    category_id, images, material, length, color, style, stock
  } = req.body
  
  db.run(
    `INSERT INTO products (name, name_en, description, description_en, price, category_id, images, material, length, color, style, stock) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, name_en, description, description_en, price, category_id, JSON.stringify(images || []), material, length, color, style, stock || 0],
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
  const {
    name, name_en, description, description_en, price,
    category_id, images, material, length, color, style, stock, is_active
  } = req.body
  
  db.run(
    `UPDATE products SET 
      name = ?, name_en = ?, description = ?, description_en = ?, price = ?,
      category_id = ?, images = ?, material = ?, length = ?, color = ?, style = ?, stock = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [name, name_en, description, description_en, price, category_id, JSON.stringify(images || []), material, length, color, style, stock, is_active, id],
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
  
  db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ success: false, error: 'Database error' })
      return
    }
    res.json({ success: true, data: { id: Number(id) } })
  })
})

export default router
