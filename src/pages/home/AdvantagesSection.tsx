import { Factory, Award, Palette, Truck } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const advantages = [
  {
    icon: Factory,
    title: 'Factory Direct',
    description: 'Own manufacturing facility with 15+ years of experience, ensuring competitive pricing and quality control.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'ISO certified production process with strict quality inspection for every product batch.',
  },
  {
    icon: Palette,
    title: 'Custom Orders',
    description: 'OEM/ODM services available. Custom colors, lengths, and styles to meet your specific needs.',
  },
  {
    icon: Truck,
    title: 'Global Shipping',
    description: 'Fast and reliable shipping to USA, Europe, and worldwide with full tracking support.',
  },
]

export default function AdvantagesSection() {
  const { ref, isVisible } = useScrollAnimation(0.15)

  return (
    <section ref={ref} className="py-24 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gold rounded-full blur-[100px]" />
      </div>

      <div className="section-padding relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="text-gold text-sm font-body font-medium tracking-[0.2em] uppercase">
            Why Choose Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3">
            Our Advantages
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon
            return (
              <div
                key={advantage.title}
                className={`group text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-gold/30 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/20 transition-colors">
                  <Icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-3">
                  {advantage.title}
                </h3>
                <p className="font-body text-white/60 text-sm leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
