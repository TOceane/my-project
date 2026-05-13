import { create } from 'zustand'
import type { Admin } from '@/types'

interface AuthState {
  user: Admin | null
  token: string | null
  isAuthenticated: boolean
  login: (token: string, user: Admin) => void
  logout: () => void
  init: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  
  login: (token, user) => {
    localStorage.setItem('admin_token', token)
    set({ token, user, isAuthenticated: true })
  },
  
  logout: () => {
    localStorage.removeItem('admin_token')
    set({ token: null, user: null, isAuthenticated: false })
  },
  
  init: () => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            set({ token, user: data.data, isAuthenticated: true })
          } else {
            localStorage.removeItem('admin_token')
          }
        })
        .catch(() => {
          localStorage.removeItem('admin_token')
        })
    }
  }
}))
