'use client'
import { useEffect } from 'react'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { mapNotFound } from '@/frontend/map'
import { Icon } from '@/components/Icon'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''

// Full-page paint-drip background: red noise lines that drip down the screen.
function usePaintDripBackground() {
  useEffect(() => {
    let instance: any
    let cancelled = false

    const sketch = (p: any) => {
      let points: number[][] = []
      const stepsPerFrame = 5

      const resetPoints = () => {
        points = []
        for (let i = 0; i < p.windowWidth; i++) points.push([i, 0])
      }
      const reset = () => {
        p.background(251, 248, 255)
        resetPoints()
      }
      const drawLine = () => {
        p.beginShape()
        let onScreen = false
        points.forEach((pt) => {
          p.vertex(pt[0], pt[1])
          pt[1] += p.noise(p.frameCount / 100 + pt[0] / 25)
          if (pt[1] < p.windowHeight * 1.1) onScreen = true
        })
        p.endShape()
        if (!onScreen) reset()
      }

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight)
        canvas.elt.style.position = 'fixed'
        canvas.elt.style.top = '0'
        canvas.elt.style.left = '0'
        canvas.elt.style.zIndex = '0'
        canvas.elt.style.pointerEvents = 'none'
        p.noFill()
        p.strokeWeight(2)
        reset()
      }
      p.draw = () => {
        for (let i = 0; i < stepsPerFrame; i++) {
          p.stroke(255, 0, 0, 160 - (i * 160) / stepsPerFrame)
          drawLine()
        }
      }
      p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight)
    }

    const start = (P5: any) => {
      if (!cancelled) instance = new P5(sketch, document.body)
    }

    if ((window as any).p5) {
      start((window as any).p5)
    } else {
      const existing = document.getElementById('p5-cdn') as HTMLScriptElement | null
      const onLoad = () => start((window as any).p5)
      if (existing) {
        existing.addEventListener('load', onLoad)
      } else {
        const script = document.createElement('script')
        script.id = 'p5-cdn'
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js'
        script.onload = onLoad
        document.body.appendChild(script)
      }
    }

    return () => {
      cancelled = true
      if (instance) instance.remove()
    }
  }, [])
}

export function NotFoundView({ initial }: { initial: any }) {
  const { data } = useLivePreview<any>({ initialData: initial, serverURL, depth: 0 })
  const nf = mapNotFound(data)
  usePaintDripBackground()

  return (
    <>
      <style>{`
        .drip-404 {
          font-family: 'Manrope', sans-serif;
          font-size: clamp(8rem, 22vw, 18rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.04em;
          color: transparent;
          -webkit-text-stroke: 3px #ff0000;
          position: relative;
          user-select: none;
        }
        .drip-404::before {
          content: '404';
          position: absolute;
          inset: 0;
          color: #ff0000;
          clip-path: polygon(0 60%, 100% 55%, 100% 100%, 0 100%);
          opacity: 0.12;
        }
      `}</style>

      <main className="relative z-10 flex-grow flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-2xl mx-auto text-center bg-white/80 backdrop-blur-sm rounded-2xl px-10 py-12 shadow-xl">
          {/* 404 */}
          <div className="relative inline-block mb-2">
            <span className="drip-404">404</span>
          </div>

          <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-primary mt-10 mb-4">{nf.heading}</h1>
          <p className="font-body text-on-surface-variant text-lg leading-relaxed mb-10">{nf.body}</p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-secondary text-on-secondary font-label font-semibold px-7 py-3.5 rounded-md hover:opacity-90 transition-opacity"
            >
              <Icon name="home" className="text-base" /> {nf.linkHome}
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-on-secondary font-label font-semibold px-7 py-3.5 rounded-md hover:opacity-90 transition-opacity"
            >
              {nf.linkContact}
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
