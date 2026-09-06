import { m } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import RadarViz from './RadarViz'
import LogoMark from './LogoMark'

const HEADLINE = 'Protección inteligente para quienes más lo necesitan'.split(' ')

const wordVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.5 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero() {
  const headlineDuration = 0.5 + HEADLINE.length * 0.06 + 0.5

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      <div className="gradient-mesh pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 h-[70vh] -translate-x-1/2 -translate-y-1/2 text-navy/[0.06] sm:h-[85vh] lg:h-[95vh]"
      >
        <LogoMark className="h-full w-auto" />
      </m.div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:px-10">
        <div>
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-soft bg-white/70 px-4 py-1.5 text-sm font-medium text-blue shadow-sm backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Sistema activo · Alerta en &lt; 3 segundos
          </m.div>

          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-6xl">
            {HEADLINE.map((word, i) => (
              <m.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="mr-3 inline-block"
              >
                {word}
              </m.span>
            ))}
          </h1>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: headlineDuration, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-navy/70"
          >
            KEDEMON HEALTH detecta caídas en residencias de ancianos en tiempo real
            mediante IA, y avisa al auxiliar en segundos. Sin cámaras que
            graben. Sin sensores invasivos.
          </m.p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <m.a
              href="#contacto"
              data-cursor-hover
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: headlineDuration + 0.15 }}
              className="shimmer-sweep relative overflow-hidden rounded-full bg-navy px-7 py-3.5 text-center text-[0.95rem] font-semibold text-white shadow-[0_8px_24px_rgba(13,42,92,0.3)] transition-transform duration-200 active:scale-[0.98]"
            >
              Unirme al Plan Fundadores
            </m.a>
            <m.a
              href="#como-funciona"
              data-cursor-hover
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: headlineDuration + 0.25 }}
              className="rounded-full border border-navy/20 bg-white/60 px-7 py-3.5 text-center text-[0.95rem] font-semibold text-navy backdrop-blur transition-all duration-200 hover:border-navy/40 hover:bg-white active:scale-[0.98]"
            >
              Cómo funciona
            </m.a>
          </div>
        </div>

        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <RadarViz />
        </m.div>
      </div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-navy/40"
      >
        <span className="text-xs font-medium uppercase tracking-widest">Desliza</span>
        <ChevronDown className="animate-bounce-slow" size={20} />
      </m.div>
    </section>
  )
}
