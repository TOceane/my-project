import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import type { Category } from '@/types'

const fallbackCategories = [
  {
    id: 1,
    name: 'Human Hair Wigs',
    name_en: 'Human Hair Wigs',
    description: '100% premium human hair, natural and realistic',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=800&fit=crop',
  },
  {
    id: 2,
    name: 'Synthetic Wigs',
    name_en: 'Synthetic Wigs',
    description: 'High-quality synthetic fibers, diverse styles',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=800&fit=crop',
  },
  {
    id: 3,
    name: 'Hair Extensions',
    name_en: 'Hair Extensions',
    description: 'Seamless extensions for instant length',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=800&fit=crop',
  },
]

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([])
  const { ref, isVisible } = useScrollAnimation(0.2)

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          setCategories(data.data)
        } else {
          setCategories(fallbackCategories as Category[])
        }
      })
      .catch(() => setCategories(fallbackCategories as Category[]))
  }, [])

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="section-padding">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-gold text-sm font-body font-medium tracking-[0.2em] uppercase">
            Our Collections
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-dark mt-3">
            Product Series
          </h2>
          <p className="font-body text-warm-gray mt-4 max-w-xl mx-auto">
            Discover our premium collections crafted with precision and care
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className={`group relative overflow-hidden rounded-2xl aspect-[3/4] transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <img
                src={category.image || fallbackCategories[index]?.image}
                alt={category.name_en}
                className="absolute inset-0 w-full h-full object-cover image-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-display text-2xl font-semibold text-white mb-2">
                  {category.name_en}
                </h3>
                <p className="font-body text-white/70 text-sm mb-4">
                  {category.description}
                </p>
                <span className="inline-flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all">
                  View Collection
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
