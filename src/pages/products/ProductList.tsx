import { useEffect, useState, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, Filter, X, ChevronDown, ShoppingBag } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import type { Product, Category } from '@/types'

const fallbackProducts = [
  { id: 1, name_en: 'Brazilian Body Wave Wig', price: 189, images: ['https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=500&fit=crop'], category_name_en: 'Human Hair Wigs', material: 'Human Hair', length: '20 inch', color: 'Natural Black' },
  { id: 2, name_en: 'Silk Top Lace Front Wig', price: 259, images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=500&fit=crop'], category_name_en: 'Human Hair Wigs', material: 'Human Hair', length: '22 inch', color: 'Dark Brown' },
  { id: 3, name_en: 'Curly Synthetic Wig', price: 89, images: ['https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=500&fit=crop'], category_name_en: 'Synthetic Wigs', material: 'Synthetic', length: '18 inch', color: 'Burgundy' },
  { id: 4, name_en: 'Straight Hair Extensions', price: 129, images: ['https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=500&fit=crop'], category_name_en: 'Hair Extensions', material: 'Human Hair', length: '24 inch', color: 'Jet Black' },
  { id: 5, name_en: 'Blonde Bob Wig', price: 149, images: ['https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&h=500&fit=crop'], category_name_en: 'Synthetic Wigs', material: 'Synthetic', length: '12 inch', color: 'Platinum Blonde' },
  { id: 6, name_en: 'Deep Wave Full Lace Wig', price: 299, images: ['https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=500&fit=crop'], category_name_en: 'Human Hair Wigs', material: 'Human Hair', length: '26 inch', color: 'Natural Black' },
]

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const { ref, isVisible } = useScrollAnimation(0.1)

  const categoryParam = searchParams.get('category')

  const loadProducts = useCallback(() => {
    setLoading(true)
    let url = '/api/products?limit=50'
    if (categoryParam) url += `&categoryId=${categoryParam}`
    if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`
    if (selectedCategory && !categoryParam) url += `&categoryId=${selectedCategory}`

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.data.length > 0) {
          setProducts(data.data.data)
        } else {
          setProducts(fallbackProducts as Product[])
        }
        setLoading(false)
      })
      .catch(() => {
        setProducts(fallbackProducts as Product[])
        setLoading(false)
      })
  }, [categoryParam, searchQuery, selectedCategory])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success) setCategories(data.data)
      })
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    loadProducts()
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSearchParams({})
    loadProducts()
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-dark py-16">
        <div className="section-padding text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Our Products
          </h1>
          <p className="font-body text-white/60 max-w-xl mx-auto">
            Browse our premium collection of wigs and hair extensions
          </p>
        </div>
      </div>

      <div className="section-padding py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:hidden">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-dark"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <aside className={`${isFilterOpen ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
            <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-gold hover:text-gold-dark transition-colors"
                >
                  Clear All
                </button>
              </div>

              <div>
                <h4 className="font-body font-medium text-sm mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        value={cat.id}
                        checked={selectedCategory === String(cat.id) || categoryParam === String(cat.id)}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value)
                          setSearchParams({ category: e.target.value })
                        }}
                        className="w-4 h-4 accent-gold"
                      />
                      <span className="text-sm text-dark/70 group-hover:text-dark transition-colors">
                        {cat.name_en}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(''); loadProducts() }}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
            </form>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-100 rounded-2xl animate-pulse aspect-[3/4]" />
                ))}
              </div>
            ) : (
              <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={product.images?.[0] || fallbackProducts[index % fallbackProducts.length]?.images[0]}
                        alt={product.name_en}
                        className="w-full h-full object-cover image-zoom"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-dark text-xs font-medium px-3 py-1 rounded-full">
                          {product.category_name_en || 'Wig'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="font-display text-lg font-semibold text-dark group-hover:text-gold transition-colors line-clamp-1">
                        {product.name_en}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                        <span>{product.material}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span>{product.length}</span>
                      </div>
                      <div className="flex items-center justify-between mt-4">
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
            )}

            {!loading && products.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 font-body">No products found</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-gold hover:text-gold-dark transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
