import { useEffect } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  Tags,
  MessageSquare,
  Settings,
  LogOut,
  Crown,
  Menu
} from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useState } from 'react'

const navItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/products', icon: Package, label: 'Products' },
  { path: '/admin/categories', icon: Tags, label: 'Categories' },
  { path: '/admin/inquiries', icon: MessageSquare, label: 'Inquiries' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
]

export default function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout, init } = useAuthStore()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    init()
  }, [init])

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/admin/login') {
      navigate('/admin/login')
    }
  }, [isAuthenticated, location.pathname, navigate])

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-dark transform transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-white/10">
            <Link to="/" className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-gold" />
              <span className="font-display text-lg font-semibold text-white">LuxeHair</span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-gold/10 text-gold'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-body text-sm font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-4 py-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-gold text-sm font-medium">{user?.name?.[0] || 'A'}</span>
              </div>
              <div>
                <p className="text-white text-sm font-medium">{user?.name || 'Admin'}</p>
                <p className="text-white/40 text-xs">{user?.email || ''}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-body text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between lg:justify-end">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-gray-500 hover:text-gold transition-colors">
              View Website
            </Link>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
