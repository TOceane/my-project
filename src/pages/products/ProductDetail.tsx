import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Mail, MessageCircle, Check, Package, Ruler, Palette } from 'lucide-react'
import type { Product } from '@/types'

const fallbackProduct = {
  id: 1,
  name_en: 'Brazilian Body Wave Wig',
  description_en: 'Premium quality Brazilian body wave wig made with 100% human hair. Features natural luster, soft texture, and can be styled with heat tools. Perfect for daily wear or special occasions.',
  price: 189,
  images: [
    'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=800&fit=crop',
  ],
  category_name_en: 'Human Hair Wigs',
  material: '100% Human Hair',
  length: '20 inch',
  color: 'Natural Black',
  style: 'Body Wave',
  stock: 50,
}

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showInquiryForm, setShowInquiryForm] = useState(false)
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', phone: '', company: '', message: '' })
  const [inquirySubmitted, setInquirySubmitted] = useState(false)

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProduct(data.data)
        } else {
          setProduct(fallbackProduct as Product)
        }
      })
      .catch(() => setProduct(fallbackProduct as Product))
  }, [id])

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...inquiryForm, product_id: id })
      })
      const data = await res.json()
      if (data.success) {
        setInquirySubmitted(true)
        setTimeout(() => {
          setShowInquiryForm(false)
          setInquirySubmitted(false)
          setInquiryForm({ name: '', email: '', phone: '', company: '', message: '' })
        }, 3000)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const currentProduct = product || fallbackProduct
  const images = currentProduct.images?.length > 0 ? currentProduct.images : fallbackProduct.images

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="section-padding py-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-dark/60 hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={images[selectedImage]}
                alt={currentProduct.name_en}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedImage === idx ? 'border-gold' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-gold text-sm font-medium">{currentProduct.category_name_en}</span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-dark mt-2">
                {currentProduct.name_en}
              </h1>
              <p className="font-display text-3xl font-bold text-gold mt-4">
                ${currentProduct.price}
              </p>
            </div>

            <p className="font-body text-warm-gray leading-relaxed">
              {currentProduct.description_en}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Package className="w-5 h-5 text-gold" />
                <div>
                  <p className="text-xs text-gray-500">Material</p>
                  <p className="font-medium text-sm">{currentProduct.material}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Ruler className="w-5 h-5 text-gold" />
                <div>
                  <p className="text-xs text-gray-500">Length</p>
                  <p className="font-medium text-sm">{currentProduct.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Palette className="w-5 h-5 text-gold" />
                <div>
                  <p className="text-xs text-gray-500">Color</p>
                  <p className="font-medium text-sm">{currentProduct.color}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Check className="w-5 h-5 text-gold" />
                <div>
                  <p className="text-xs text-gray-500">Stock</p>
                  <p className="font-medium text-sm">{currentProduct.stock} units</p>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button
                onClick={() => setShowInquiryForm(true)}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Send Inquiry
              </button>
              <a
                href={`mailto:info@luxehair.com?subject=Inquiry about ${currentProduct.name_en}`}
                className="w-full btn-secondary flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {showInquiryForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-semibold">Send Inquiry</h3>
              <button
                onClick={() => setShowInquiryForm(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                <span className="text-lg">&times;</span>
              </button>
            </div>

            {inquirySubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-display text-lg font-semibold mb-2">Inquiry Sent!</h4>
                <p className="text-gray-500 text-sm">We will contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  value={inquiryForm.name}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gold"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={inquiryForm.email}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gold"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={inquiryForm.phone}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gold"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={inquiryForm.company}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, company: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gold"
                />
                <textarea
                  placeholder="Your Message *"
                  required
                  rows={4}
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gold resize-none"
                />
                <button type="submit" className="w-full btn-primary">
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
