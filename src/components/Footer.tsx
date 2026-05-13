import { Link } from 'react-router-dom'
import { Crown, Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-gold" />
              <span className="font-display text-xl font-semibold">LuxeHair</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Premium wig manufacturer and exporter, dedicated to providing high-quality hair products for global markets.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { path: '/', label: 'Home' },
                { path: '/products', label: 'Products' },
                { path: '/about', label: 'About Us' },
                { path: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              {[
                'Human Hair Wigs',
                'Synthetic Wigs',
                'Hair Extensions',
                'Custom Orders',
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/products"
                    className="text-white/60 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-sm">info@luxehair.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-sm">+86-123-4567-8900</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-sm">Guangzhou, China</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} LuxeHair Wigs. All rights reserved.
          </p>
          <Link
            to="/admin/login"
            className="text-white/30 hover:text-white/60 transition-colors text-sm"
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  )
}
