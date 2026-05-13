import { useEffect, useRef } from 'react'

export default function HairStrandBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    interface Strand {
      x: number
      baseY: number
      amplitude: number
      frequency: number
      speed: number
      opacity: number
      width: number
    }

    const strands: Strand[] = []
    const strandCount = 25

    for (let i = 0; i < strandCount; i++) {
      strands.push({
        x: Math.random() * canvas.width,
        baseY: Math.random() * canvas.height,
        amplitude: 20 + Math.random() * 40,
        frequency: 0.002 + Math.random() * 0.003,
        speed: 0.3 + Math.random() * 0.5,
        opacity: 0.05 + Math.random() * 0.15,
        width: 0.5 + Math.random() * 1.5,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      strands.forEach((strand) => {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(212, 175, 55, ${strand.opacity})`
        ctx.lineWidth = strand.width
        ctx.lineCap = 'round'

        for (let y = 0; y < canvas.height; y += 2) {
          const x = strand.x + Math.sin((y + time * strand.speed) * strand.frequency) * strand.amplitude
          if (y === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.stroke()
      })

      time += 1
      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
