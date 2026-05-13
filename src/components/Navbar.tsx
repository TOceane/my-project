import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Crown } from 'lucide-react'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Products' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="section-padding">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <Crown className={`w-7 h-7 transition-colors duration-300 ${
              isScrolled ? 'text-gold' : 'text-gold'
            }`} />
            <span className={`font-display text-xl font-semibold tracking-wide transition-colors duration-300 ${
              isScrolled ? 'text-dark' : 'text-white'
            }`}>
              LuxeHair
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-body text-sm font-medium tracking-wide transition-colors duration-300 relative group ${
                  location.pathname === link.path
                    ? isScrolled ? 'text-gold' : 'text-gold'
                    : isScrolled ? 'text-dark/70 hover:text-dark' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${
                  location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/admin/login"
              className={`text-sm font-medium transition-colors duration-300 ${
                isScrolled ? 'text-dark/60 hover:text-dark' : 'text-white/60 hover:text-white'
              }`}
            >
              Admin
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-300 ${
              isScrolled ? 'text-dark' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100">
          <div className="section-padding py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-3 px-4 rounded-lg font-body text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-gold/10 text-gold'
                    : 'text-dark/70 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className="block py-3 px-4 rounded-lg font-body text-sm font-medium text-dark/50 hover:bg-gray-50"
            >
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
