import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import type { Category } from '@/types'

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [form, setForm] = useState({ name: '', name_en: '', description: '', sort_order: '0' })
  const token = localStorage.getItem('admin_token')

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(data => { if (data.success) setCategories(data.data) })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = editing ? `/api/categories/${editing.id}` : '/api/categories'
    const method = editing ? 'PUT' : 'POST'

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...form,
        sort_order: Number(form.sort_order),
        is_active: 1
      })
    })

    setShowForm(false)
    setEditing(null)
    setForm({ name: '', name_en: '', description: '', sort_order: '0' })
    loadCategories()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this category?')) return
    await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    loadCategories()
  }

  const startEdit = (cat: Category) => {
    setEditing(cat)
    setForm({
      name: cat.name,
      name_en: cat.name_en,
      description: cat.description || '',
      sort_order: String(cat.sort_order)
    })
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="font-display text-2xl font-bold text-dark">Categories</h1>
        <button
          onClick={() => { setShowForm(true); setEditing(null); setForm({ name: '', name_en: '', description: '', sort_order: '0' }) }}
          className="btn-primary inline-flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h3 className="font-display text-lg font-semibold mb-4">
            {editing ? 'Edit Category' : 'New Category'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              placeholder="Name (EN) *" required
              value={form.name_en}
              onChange={e => setForm({ ...form, name_en: e.target.value })}
              className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gold text-sm"
            />
            <input
              placeholder="Name (CN)"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gold text-sm"
            />
            <input
              placeholder="Description"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gold text-sm"
            />
            <div className="flex gap-2">
              <input
                type="number" placeholder="Sort"
                value={form.sort_order}
                onChange={e => setForm({ ...form, sort_order: e.target.value })}
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gold text-sm w-20"
              />
              <button type="submit" className="btn-primary px-4">Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 text-gray-500 hover:text-dark">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Sort</th>
              <th className="text-right px-6 py-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-6 py-4">
                  <p className="font-medium text-sm">{cat.name_en}</p>
                  <p className="text-xs text-gray-400">{cat.name}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{cat.description}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{cat.sort_order}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => startEdit(cat)} className="p-2 hover:bg-gray-100 rounded-lg">
                      <Pencil className="w-4 h-4 text-gray-400" />
                    </button>
                    <button onClick={() => handleDelete(cat.id)} className="p-2 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
