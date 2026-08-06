import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import Reveal from './Reveal'
import { useInView } from '../hooks/useInView'

const CHECKS = [
  'Ninguna imagen se graba ni se almacena, nunca',
  'Solo se procesan patrones de movimiento anónimos',
  'Cumplimiento estricto del RGPD y la normativa sanitaria',
]

const GUARANTEES = [
  { label: 'Sin grabación de vídeo', value: '100%' },
  { label: 'Datos procesados en local', value: '100%' },
  { label: 'Consentimiento informado', value: 'Siempre' },
  { label: 'Auditoría externa RGPD', value: 'Anual' },
]

function CheckItem({ text, delay }) {
  const [ref, inView] = useInView({ threshold: 0.5 })
  return (
    <li ref={ref} className="flex items-start gap-4">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15">
        <svg viewBox="0 0 24 24" className="h-4 w-4">
          <motion.path
            d="M4 12.5l5 5L20 6"
            fill="none"
            stroke="#4a9eff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
          />
        </svg>
      </span>
      <span className="text-[1.05rem] leading-relaxed text-white/80">{text}</span>
    </li>
  )
}

export default function Privacy() {
  return (
    <section className="relative overflow-hidden bg-navy py-28">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="gradient-mesh absolute inset-0" />
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:gap-8 lg:px-10">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Privacidad
          </span>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            El paciente está protegido, no vigilado.
          </h2>
          <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-white/65">
            KEDEMON está diseñado desde el principio bajo el principio de
            privacidad por defecto. Nuestro sistema analiza patrones de
            movimiento con IA en el propio dispositivo: nunca genera,
            transmite ni almacena vídeo. Cumplimos íntegramente el RGPD y las
            normativas de protección de datos en el ámbito sociosanitario.
          </p>

          <ul className="mt-10 space-y-5">
            {CHECKS.map((text, i) => (
              <CheckItem key={text} text={text} delay={i * 0.15} />
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <div className="mb-6 flex items-center gap-3">
              <ShieldCheck size={22} className="text-accent" />
              <span className="text-sm font-semibold uppercase tracking-widest text-white/70">
                Garantías de privacidad
              </span>
            </div>
            <dl className="divide-y divide-white/10">
              {GUARANTEES.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-4">
                  <dt className="text-[0.95rem] text-white/70">{item.label}</dt>
                  <dd className="text-[0.95rem] font-bold text-white">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
