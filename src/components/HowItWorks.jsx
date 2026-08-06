import { motion } from 'framer-motion'
import { Camera, BrainCircuit, BellRing, Zap } from 'lucide-react'
import Reveal from './Reveal'
import { useInView } from '../hooks/useInView'

const STEPS = [
  {
    icon: Camera,
    title: 'Cámara discreta',
    description:
      'Analiza el movimiento en tiempo real. Nunca graba ni almacena imágenes: solo detecta patrones de caída.',
  },
  {
    icon: BrainCircuit,
    title: 'IA que confirma',
    description:
      'Una segunda capa de inteligencia artificial valida la alerta antes de notificar, evitando falsas alarmas.',
  },
  {
    icon: BellRing,
    title: 'Alerta inmediata',
    description:
      'El auxiliar de guardia recibe una notificación en su móvil en cuestión de segundos, con la ubicación exacta.',
  },
]

export default function HowItWorks() {
  const [lineRef, lineInView] = useInView({ threshold: 0.3 })

  return (
    <section id="como-funciona" className="relative bg-bg py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue">
            Cómo funciona
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            De la detección a la alerta, en tres pasos
          </h2>
        </Reveal>

        <div ref={lineRef} className="relative mt-20">
          <div className="pointer-events-none absolute left-[16.6%] right-[16.6%] top-10 hidden h-0.5 md:block">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={lineInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{ transformOrigin: 'left' }}
              className="h-full w-full bg-[repeating-linear-gradient(90deg,#4a9eff_0,#4a9eff_8px,transparent_8px,transparent_16px)]"
            />
          </div>

          <div className="relative grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.15} className="flex flex-col items-center text-center">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
                  className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-navy shadow-[0_10px_30px_rgba(13,42,92,0.25)]"
                >
                  <step.icon size={30} className="text-white" strokeWidth={1.75} />
                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </motion.div>
                <h3 className="mt-6 text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-2 max-w-xs text-[0.95rem] leading-relaxed text-navy/70">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.3} className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-soft px-5 py-2.5 text-sm font-semibold text-blue">
            <Zap size={16} className="text-blue" />
            De la caída a la alerta: menos de 3 segundos
          </div>
        </Reveal>
      </div>
    </section>
  )
}
