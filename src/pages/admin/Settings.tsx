import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'

export default function Settings() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const token = localStorage.getItem('admin_token')

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => { if (data.success) setSettings(data.data) })
  }, [])

  const handleSave = async (key: string, value: string) => {
    setSaving(true)
    await fetch(`/api/settings/${key}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ value })
    })
    setSaving(false)
  }

  const fields = [
    { key: 'site_name', label: 'Site Name', placeholder: 'LuxeHair Wigs' },
    { key: 'site_description', label: 'Site Description', placeholder: 'Premium Wig Manufacturer' },
    { key: 'contact_email', label: 'Contact Email', placeholder: 'info@luxehair.com' },
    { key: 'contact_phone', label: 'Contact Phone', placeholder: '+86-123-4567-8900' },
  ]

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-dark mb-6">Settings</h1>

      <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-2xl">
        <div className="space-y-6">
          {fields.map(field => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={settings[field.key] || ''}
                  onChange={e => setSettings({ ...settings, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gold text-sm"
                />
                <button
                  onClick={() => handleSave(field.key, settings[field.key] || '')}
                  disabled={saving}
                  className="px-4 py-2.5 bg-gold text-dark rounded-xl text-sm font-medium hover:bg-gold-dark transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
