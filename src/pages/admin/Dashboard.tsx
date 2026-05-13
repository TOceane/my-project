import { useEffect, useState } from 'react'
import { Package, Tags, MessageSquare, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0, inquiries: 0 })

  useEffect(() => {
    Promise.all([
      fetch('/api/products?limit=1').then(r => r.json()),
      fetch('/api/categories').then(r => r.json()),
      fetch('/api/inquiries?limit=1').then(r => r.json()),
    ]).then(([products, categories, inquiries]) => {
      setStats({
        products: products.success ? products.data.total : 0,
        categories: categories.success ? categories.data.length : 0,
        inquiries: inquiries.success ? inquiries.data.total : 0,
      })
    })
  }, [])

  const statCards = [
    { icon: Package, label: 'Products', value: stats.products, color: 'bg-blue-50 text-blue-600' },
    { icon: Tags, label: 'Categories', value: stats.categories, color: 'bg-purple-50 text-purple-600' },
    { icon: MessageSquare, label: 'Inquiries', value: stats.inquiries, color: 'bg-green-50 text-green-600' },
    { icon: TrendingUp, label: 'Growth', value: '+12%', color: 'bg-gold/10 text-gold' },
  ]

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-dark mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="font-display text-3xl font-bold text-dark">{card.value}</p>
              <p className="font-body text-gray-500 text-sm mt-1">{card.label}</p>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h2 className="font-display text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a href="#/admin/products/new" className="p-4 bg-gray-50 rounded-xl hover:bg-gold/5 transition-colors group">
            <Package className="w-6 h-6 text-gold mb-2" />
            <p className="font-medium text-sm">Add New Product</p>
            <p className="text-gray-400 text-xs mt-1">Create a new product listing</p>
          </a>
          <a href="#/admin/inquiries" className="p-4 bg-gray-50 rounded-xl hover:bg-gold/5 transition-colors group">
            <MessageSquare className="w-6 h-6 text-gold mb-2" />
            <p className="font-medium text-sm">View Inquiries</p>
            <p className="text-gray-400 text-xs mt-1">Check customer messages</p>
          </a>
          <a href="#/admin/settings" className="p-4 bg-gray-50 rounded-xl hover:bg-gold/5 transition-colors group">
            <TrendingUp className="w-6 h-6 text-gold mb-2" />
            <p className="font-medium text-sm">Site Settings</p>
            <p className="text-gray-400 text-xs mt-1">Update website info</p>
          </a>
        </div>
      </div>
    </div>
  )
}
