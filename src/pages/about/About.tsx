import { Award, Users, Globe, TrendingUp } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const stats = [
  { icon: Award, value: '15+', label: 'Years Experience' },
  { icon: Users, value: '500+', label: 'Global Partners' },
  { icon: Globe, value: '30+', label: 'Countries Served' },
  { icon: TrendingUp, value: '100K+', label: 'Products Sold' },
]

export default function About() {
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation(0.2)
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation(0.15)

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-dark py-20">
        <div className="section-padding text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            About LuxeHair
          </h1>
          <p className="font-body text-white/60 max-w-xl mx-auto">
            Your trusted partner in premium wig manufacturing and export
          </p>
        </div>
      </div>

      <div ref={statsRef} className="section-padding py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className={`text-center transition-all duration-700 ${
                  statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-gold" />
                </div>
                <p className="font-display text-3xl font-bold text-dark">{stat.value}</p>
                <p className="font-body text-warm-gray text-sm mt-1">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div ref={contentRef} className="section-padding pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-700 ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <span className="text-gold text-sm font-body font-medium tracking-[0.2em] uppercase">
              Our Story
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-dark mt-3 mb-6">
              Crafting Beauty Since 2009
            </h2>
            <div className="space-y-4 font-body text-warm-gray leading-relaxed">
              <p>
                LuxeHair Wigs has been at the forefront of the hair industry for over 15 years. 
                What started as a small family workshop in Guangzhou has grown into a leading 
                manufacturer and exporter of premium wigs and hair extensions.
              </p>
              <p>
                Our commitment to quality, innovation, and customer satisfaction has earned us 
                the trust of hundreds of wholesale partners across the USA, Europe, and beyond. 
                We combine traditional craftsmanship with modern technology to create products 
                that exceed expectations.
              </p>
              <p>
                Every wig that leaves our factory undergoes rigorous quality control, ensuring 
                that our partners receive only the finest products for their customers.
              </p>
            </div>
          </div>

          <div className={`transition-all duration-700 delay-200 ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=500&fit=crop"
                alt="Factory"
                className="rounded-2xl w-full h-64 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=500&fit=crop"
                alt="Products"
                className="rounded-2xl w-full h-64 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
