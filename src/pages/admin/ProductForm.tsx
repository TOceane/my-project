import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, X, Upload } from 'lucide-react'
import type { Category } from '@/types'

export default function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const token = localStorage.getItem('admin_token')

  const [categories, setCategories] = useState<Category[]>([])
  const [form, setForm] = useState({
    name: '', name_en: '', description: '', description_en: '',
    price: '', category_id: '', material: '', length: '', color: '', style: '', stock: '',
    images: [] as string[], is_active: 1
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(data => { if (data.success) setCategories(data.data) })

    if (isEdit) {
      fetch(`/api/products/${id}`)
        .then(r => r.json())
        .then(data => {
          if (data.success) {
            const p = data.data
            setForm({
              name: p.name, name_en: p.name_en, description: p.description || '',
              description_en: p.description_en || '', price: String(p.price),
              category_id: String(p.category_id), material: p.material || '',
              length: p.length || '', color: p.color || '', style: p.style || '',
              stock: String(p.stock), images: p.images || [], is_active: p.is_active
            })
          }
        })
    }
  }, [id, isEdit])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const payload = {
      ...form,
      price: Number(form.price),
      category_id: Number(form.category_id),
      stock: Number(form.stock),
      images: form.images
    }

    const url = isEdit ? `/api/products/${id}` : '/api/products'
    const method = isEdit ? 'PUT' : 'POST'

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })

    setSaving(false)
    navigate('/admin/products')
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const fd = new FormData()
    fd.append('image', file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: fd
    })
    const data = await res.json()
    if (data.success) {
      setForm(prev => ({ ...prev, images: [...prev.images, data.data.url] }))
    }
  }

  const removeImage = (idx: number) => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))
  }

  return (
    <div>
      <button
        onClick={() => navigate('/admin/products')}
        className="inline-flex items-center gap-2 text-gray-500 hover:text-dark transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </button>

      <h1 className="font-display text-2xl font-bold text-dark mb-6">
        {isEdit ? 'Edit Product' : 'New Product'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-8 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name (EN) *</label>
            <input
              required value={form.name_en}
              onChange={e => setForm({ ...form, name_en: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gold text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name (CN)</label>
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gold text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
            <input
              type="number" required value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gold text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              required value={form.category_id}
              onChange={e => setForm({ ...form, category_id: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gold text-sm"
            >
              <option value="">Select</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name_en}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
            <input
              type="number" value={form.stock}
              onChange={e => setForm({ ...form, stock: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gold text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
            <input
              value={form.material}
              onChange={e => setForm({ ...form, material: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gold text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Length</label>
            <input
              value={form.length}
              onChange={e => setForm({ ...form, length: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gold text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
            <input
              value={form.color}
              onChange={e => setForm({ ...form, color: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gold text-sm"
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description (EN)</label>
          <textarea
            rows={4} value={form.description_en}
            onChange={e => setForm({ ...form, description_en: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gold text-sm resize-none"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
          <div className="flex flex-wrap gap-3">
            {form.images.map((img, idx) => (
              <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <label className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-gold transition-colors">
              <Upload className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400 mt-1">Add</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary disabled:opacity-50"
          >
            {saving ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-dark transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
