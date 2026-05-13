import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Crown, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const login = useAuthStore(state => state.login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()

      if (data.success) {
        login(data.data.token, data.data.user)
        navigate('/admin/dashboard')
      } else {
        setError(data.error || 'Login failed')
      }
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-gold" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Admin Portal</h1>
          <p className="font-body text-white/50 text-sm mt-1">LuxeHair Wigs Management</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white/70 text-sm mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors pr-12"
                  placeholder="password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-white/40 hover:text-white/70 text-sm transition-colors">
              Back to Website
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
