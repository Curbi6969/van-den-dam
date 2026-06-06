import { Icon } from '@/components/Icon'
import { getNotFound } from '@/frontend/queries'

export default async function NotFound() {
  const nf = await getNotFound('nl')

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

      <main className="flex-grow flex items-center justify-center px-6 pt-32 pb-20">
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
