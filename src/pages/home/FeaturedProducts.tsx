import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import type { Product } from '@/types'

const fallbackProducts = [
  {
    id: 1,
    name_en: 'Brazilian Body Wave Wig',
    price: 189,
    images: ['https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=500&fit=crop'],
    category_name_en: 'Human Hair Wigs',
  },
  {
    id: 2,
    name_en: 'Silk Top Lace Front Wig',
    price: 259,
    images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=500&fit=crop'],
    category_name_en: 'Human Hair Wigs',
  },
  {
    id: 3,
    name_en: 'Curly Synthetic Wig',
    price: 89,
    images: ['https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=500&fit=crop'],
    category_name_en: 'Synthetic Wigs',
  },
  {
    id: 4,
    name_en: 'Straight Hair Extensions',
    price: 129,
    images: ['https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=500&fit=crop'],
    category_name_en: 'Hair Extensions',
  },
]

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const { ref, isVisible } = useScrollAnimation(0.15)

  useEffect(() => {
    fetch('/api/products?limit=8')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.data.length > 0) {
          setProducts(data.data.data)
        } else {
          setProducts(fallbackProducts as Product[])
        }
      })
      .catch(() => setProducts(fallbackProducts as Product[]))
  }, [])

  const displayProducts = products.length > 0 ? products : fallbackProducts

  return (
    <section ref={ref} className="py-24 bg-warm-light">
      <div className="section-padding">
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div>
            <span className="text-gold text-sm font-body font-medium tracking-[0.2em] uppercase">
              Best Sellers
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-dark mt-3">
              Featured Products
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-dark font-medium mt-4 md:mt-0 hover:text-gold transition-colors group"
          >
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className={`group bg-white rounded-2xl overflow-hidden card-hover transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={product.images?.[0] || fallbackProducts[index % fallbackProducts.length].images[0]}
                  alt={product.name_en}
                  className="w-full h-full object-cover image-zoom"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gold/90 text-dark text-xs font-medium px-3 py-1 rounded-full">
                    {product.category_name_en || 'Wig'}
                  </span>
                </div>
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors duration-300" />
              </div>
              
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-dark group-hover:text-gold transition-colors">
                  {product.name_en}
                </h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-gold font-display text-xl font-bold">
                    ${product.price}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold group-hover:text-dark transition-colors">
                    <ShoppingBag className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
