import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.join(__dirname, '..', 'data', 'database.sqlite')

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection error:', err)
  } else {
    console.log('Connected to SQLite database')
    initDatabase()
  }
})

function initDatabase() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        name_en TEXT NOT NULL,
        description TEXT,
        image TEXT,
        sort_order INTEGER DEFAULT 0,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        name_en TEXT NOT NULL,
        description TEXT,
        description_en TEXT,
        price REAL,
        category_id INTEGER,
        images TEXT,
        material TEXT,
        length TEXT,
        color TEXT,
        style TEXT,
        stock INTEGER DEFAULT 0,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      )
    `)

    db.run(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        message TEXT NOT NULL,
        product_id INTEGER,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id)
      )
    `)

    db.run(`
      CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT,
        email TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    db.run(`
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT UNIQUE NOT NULL,
        value TEXT,
        description TEXT
      )
    `)

    db.get("SELECT COUNT(*) as count FROM categories", (err, row: { count: number }) => {
      if (err) return
      if (row.count === 0) {
        const stmt = db.prepare("INSERT INTO categories (name, name_en, description, sort_order) VALUES (?, ?, ?, ?)")
        stmt.run('真人发假发', 'Human Hair Wigs', '100%真人发丝，自然逼真', 1)
        stmt.run('化纤假发', 'Synthetic Wigs', '高品质化纤丝，款式多样', 2)
        stmt.run('发片接发', 'Hair Extensions', '无痕接发，瞬间变长', 3)
        stmt.finalize()
      }
    })

    db.get("SELECT COUNT(*) as count FROM admins", (err, row: { count: number }) => {
      if (err) return
      if (row.count === 0) {
        db.run(
          "INSERT INTO admins (username, password, name, email) VALUES (?, ?, ?, ?)",
          ['admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '管理员', 'admin@luxehair.com']
        )
      }
    })

    db.get("SELECT COUNT(*) as count FROM settings", (err, row: { count: number }) => {
      if (err) return
      if (row.count === 0) {
        const stmt = db.prepare("INSERT INTO settings (key, value, description) VALUES (?, ?, ?)")
        stmt.run('site_name', 'LuxeHair Wigs', '网站名称')
        stmt.run('site_description', 'Premium Wig Manufacturer & Exporter', '网站描述')
        stmt.run('contact_email', 'info@luxehair.com', '联系邮箱')
        stmt.run('contact_phone', '+86-123-4567-8900', '联系电话')
        stmt.finalize()
      }
    })
  })
}

export default db
