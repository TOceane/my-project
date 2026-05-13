import { Router } from 'express'
import { db } from '../database.js'
import { authMiddleware } from '../middleware/auth.js'

interface SettingRow {
  key: string
  value: string
}

const router = Router()

router.get('/', (req, res) => {
  db.all('SELECT * FROM settings', (err, rows: SettingRow[]) => {
    if (err) {
      res.status(500).json({ success: false, error: 'Database error' })
      return
    }
    
    const settings: Record<string, string> = {}
    rows.forEach((row) => {
      settings[row.key] = row.value
    })
    
    res.json({ success: true, data: settings })
  })
})

router.put('/:key', authMiddleware, (req, res) => {
  const { key } = req.params
  const { value } = req.body
  
  db.run(
    'UPDATE settings SET value = ? WHERE key = ?',
    [value, key],
    function(err) {
      if (err) {
        res.status(500).json({ success: false, error: 'Database error' })
        return
      }
      res.json({ success: true, data: { key, value } })
    }
  )
})

export default router
