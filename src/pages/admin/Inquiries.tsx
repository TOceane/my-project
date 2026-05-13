import { useEffect, useState, useCallback } from 'react'
import { Mail, Check, Clock, Trash2 } from 'lucide-react'
import type { Inquiry } from '@/types'

export default function Inquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [filter, setFilter] = useState('')
  const token = localStorage.getItem('admin_token')

  const loadInquiries = useCallback(() => {
    let url = '/api/inquiries?limit=100'
    if (filter) url += `&status=${filter}`
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { if (data.success) setInquiries(data.data.data) })
  }, [filter, token])

  useEffect(() => {
    loadInquiries()
  }, [loadInquiries])

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/inquiries/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    })
    loadInquiries()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this inquiry?')) return
    await fetch(`/api/inquiries/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    loadInquiries()
  }

  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-50 text-yellow-600', icon: Clock },
    processing: { label: 'Processing', color: 'bg-blue-50 text-blue-600', icon: Mail },
    completed: { label: 'Completed', color: 'bg-green-50 text-green-600', icon: Check },
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="font-display text-2xl font-bold text-dark">Inquiries</h1>
        <div className="flex gap-2">
          {['', 'pending', 'processing', 'completed'].map(s => (
            <button
              key={s || 'all'}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === s ? 'bg-gold text-dark' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {inquiries.map(inquiry => {
          const config = statusConfig[inquiry.status] || statusConfig.pending
          const StatusIcon = config.icon
          return (
            <div key={inquiry.id} className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {config.label}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-medium text-dark mb-1">{inquiry.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">{inquiry.email} {inquiry.phone && `| ${inquiry.phone}`}</p>
                  {inquiry.company && <p className="text-sm text-gray-500 mb-2">{inquiry.company}</p>}
                  <p className="text-sm text-gray-700 mt-3 bg-gray-50 rounded-xl p-4">{inquiry.message}</p>
                  {inquiry.product_name_en && (
                    <p className="text-xs text-gold mt-2">Product: {inquiry.product_name_en}</p>
                  )}
                </div>

                <div className="flex lg:flex-col items-center lg:items-end gap-2">
                  {inquiry.status !== 'processing' && (
                    <button
                      onClick={() => updateStatus(inquiry.id, 'processing')}
                      className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 transition-colors"
                    >
                      Mark Processing
                    </button>
                  )}
                  {inquiry.status !== 'completed' && (
                    <button
                      onClick={() => updateStatus(inquiry.id, 'completed')}
                      className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-sm hover:bg-green-100 transition-colors"
                    >
                      Mark Completed
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(inquiry.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}

        {inquiries.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400">No inquiries found</p>
          </div>
        )}
      </div>
    </div>
  )
}
