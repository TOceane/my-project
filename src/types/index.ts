export interface Category {
  id: number
  name: string
  name_en: string
  description: string
  image: string
  sort_order: number
  is_active: number
  created_at: string
}

export interface Product {
  id: number
  name: string
  name_en: string
  description: string
  description_en: string
  price: number
  category_id: number
  category_name?: string
  category_name_en?: string
  images: string[]
  material: string
  length: string
  color: string
  style: string
  stock: number
  is_active: number
  created_at: string
  updated_at: string
}

export interface Inquiry {
  id: number
  name: string
  email: string
  phone: string
  company: string
  message: string
  product_id?: number
  product_name?: string
  product_name_en?: string
  status: 'pending' | 'processing' | 'completed'
  created_at: string
}

export interface Admin {
  id: number
  username: string
  name: string
  email: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  error?: string
}

export interface PaginatedData<T> {
  data: T[]
  total: number
  page: number
  limit: number
}
