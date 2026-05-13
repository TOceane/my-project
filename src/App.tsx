import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Home from '@/pages/home/Home'
import ProductList from '@/pages/products/ProductList'
import ProductDetail from '@/pages/products/ProductDetail'
import About from '@/pages/about/About'
import Contact from '@/pages/contact/Contact'
import Login from '@/pages/admin/Login'
import AdminLayout from '@/pages/admin/AdminLayout'
import Dashboard from '@/pages/admin/Dashboard'
import Products from '@/pages/admin/Products'
import ProductForm from '@/pages/admin/ProductForm'
import Categories from '@/pages/admin/Categories'
import Inquiries from '@/pages/admin/Inquiries'
import Settings from '@/pages/admin/Settings'

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />
          <Route path="categories" element={<Categories />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </Router>
  )
}
