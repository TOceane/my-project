import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function CTASection() {
  const { ref, isVisible } = useScrollAnimation(0.2)

  return (
    <section ref={ref} className="py-24 bg-warm-light">
      <div className="section-padding">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="text-gold text-sm font-body font-medium tracking-[0.2em] uppercase">
            Start Your Business
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-dark mt-4 mb-6">
            Ready to Partner
            <span className="block text-gold italic">With Us?</span>
          </h2>
          <p className="font-body text-warm-gray text-lg max-w-2xl mx-auto mb-10">
            Join hundreds of satisfied wholesale partners across the USA and Europe. 
            Get competitive pricing, reliable quality, and dedicated support.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="btn-primary flex items-center gap-2 group"
            >
              <MessageCircle className="w-4 h-4" />
              Send Inquiry
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/products"
              className="btn-secondary"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
