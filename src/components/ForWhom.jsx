import { motion } from 'framer-motion'
import { Building2, HeartHandshake, Users } from 'lucide-react'
import Reveal from './Reveal'

const AUDIENCES = [
  {
    icon: Building2,
    title: 'Directores de residencia',
    description:
      'Reduce incidentes graves, mejora los tiempos de respuesta y aporta datos objetivos para decisiones operativas.',
  },
  {
    icon: HeartHandshake,
    title: 'Personal auxiliar',
    description:
      'Menos rondas de vigilancia manual, más capacidad de reacción real cuando de verdad importa.',
  },
  {
    icon: Users,
    title: 'Familias de residentes',
    description:
      'Tranquilidad de saber que un ser querido está protegido las 24 horas, sin que su intimidad se vea comprometida.',
  },
]

export default function ForWhom() {
  return (
    <section id="para-quien" className="relative bg-white py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue">
            Para quién es
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Pensado para todo el equipo de cuidado
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {AUDIENCES.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-2xl border-l-4 border-accent bg-bg p-8 shadow-[0_1px_2px_rgba(13,42,92,0.06)] transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(13,42,92,0.12)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5">
                  <item.icon size={24} className="text-navy" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-navy/70">
                  {item.description}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
