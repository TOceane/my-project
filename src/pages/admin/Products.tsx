import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Pencil, Trash2, Eye } from 'lucide-react'
import type { Product } from '@/types'

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('admin_token')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = () => {
    fetch('/api/products?limit=100')
      .then(r => r.json())
      .then(data => {
        if (data.success) setProducts(data.data.data)
        setLoading(false)
      })
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return
    await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    loadProducts()
  }

  const filtered = products.filter(p =>
    p.name_en?.toLowerCase().includes(search.toLowerCase()) ||
    p.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="font-display text-2xl font-bold text-dark">Products</h1>
        <Link
          to="/admin/products/new"
          className="btn-primary inline-flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full sm:w-80 pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-gold text-sm"
        />
      </div>

      {loading ? (
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-16 bg-gray-100 rounded-xl" />)}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="text-right px-6 py-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(product => (
                  <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images?.[0] || '/placeholder.jpg'}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                        />
                        <div>
                          <p className="font-medium text-sm text-dark">{product.name_en}</p>
                          <p className="text-xs text-gray-400">{product.material}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.category_name_en}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gold">${product.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.stock}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        product.is_active
                          ? 'bg-green-50 text-green-600'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {product.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/products/${product.id}`}
                          target="_blank"
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4 text-gray-400" />
                        </Link>
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4 text-gray-400" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-sm">No products found</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
