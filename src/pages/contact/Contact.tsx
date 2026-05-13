import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, Check } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          setForm({ name: '', email: '', phone: '', company: '', message: '' })
        }, 3000)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-dark py-20">
        <div className="section-padding text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="font-body text-white/60 max-w-xl mx-auto">
            Get in touch for wholesale inquiries, custom orders, or any questions
          </p>
        </div>
      </div>

      <div className="section-padding py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-1">Email</h3>
              <p className="font-body text-warm-gray text-sm">info@luxehair.com</p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-1">Phone</h3>
              <p className="font-body text-warm-gray text-sm">+86-123-4567-8900</p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-1">Address</h3>
              <p className="font-body text-warm-gray text-sm">Guangzhou, China</p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-1">Business Hours</h3>
              <p className="font-body text-warm-gray text-sm">Mon - Sat: 9:00 - 18:00</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-gray-500">We will get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-semibold mb-6">Send Inquiry</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                      />
                      <input
                        type="email"
                        placeholder="Email *"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                      />
                    </div>
                    <textarea
                      placeholder="Your Message *"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none"
                    />
                    <button
                      type="submit"
                      className="btn-primary flex items-center justify-center gap-2 w-full md:w-auto"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
