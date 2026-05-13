import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import HairStrandBg from '@/components/HairStrandBg'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-light to-dark opacity-90" />
      
      <HairStrandBg />
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-dark rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 text-center section-padding max-w-5xl mx-auto">
        <div className="animate-fade-in-up">
          <span className="inline-block text-gold text-sm font-body font-medium tracking-[0.3em] uppercase mb-6">
            Premium Wig Manufacturer
          </span>
        </div>
        
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6 animate-fade-in-up animate-delay-200">
          Elevate Your
          <span className="block text-gradient-gold italic">Natural Beauty</span>
        </h1>
        
        <p className="font-body text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animate-delay-300">
          Crafting premium quality wigs and hair extensions for over 15 years. 
          Trusted by wholesalers and retailers across the USA and Europe.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-400">
          <Link
            to="/products"
            className="btn-primary flex items-center gap-2 group"
          >
            Explore Products
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/contact"
            className="btn-secondary"
          >
            Get In Touch
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/50" />
      </div>
    </section>
  )
}
