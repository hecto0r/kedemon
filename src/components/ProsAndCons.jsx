import { Scale } from 'lucide-react'
import Reveal from './Reveal'

const PROS = [
  'Detecta caídas y las notifica en menos de 3 segundos',
  'No graba ni almacena ninguna imagen en ningún momento — cumple GDPR sin implicaciones legales para el centro',
  'Aprende los patrones de movimiento normales de cada residente de forma pasiva, sin pedirle que haga nada',
  'Instalación completa en menos de una semana, sin obras',
  'Precio transparente desde la primera llamada — sin procesos de propuesta comercial de semanas',
  'Convive con los sistemas de llamada de enfermería que ya tenga el centro',
  'Las alertas llegan directamente al móvil del personal, sin apps que instalar',
]

const CONS = [
  'No sustituye el criterio ni la presencia del personal — es una herramienta de apoyo, no un reemplazo de las rondas ni de la supervisión humana',
  'La precisión mejora con los primeros días de uso, mientras el sistema aprende los patrones de movimiento propios de cada residente',
  'La colocación de la cámara en la habitación influye en la precisión — se ajusta en la instalación inicial',
  'El análisis más avanzado con inteligencia artificial requiere conexión a internet estable',
  'No sustituye un pulsador de emergencia para residentes que puedan pedir ayuda activamente — es complementario, no un reemplazo',
]

function ItemList({ items, marker }) {
  return (
    <ul className="space-y-4">
      {items.map((text, i) => (
        <Reveal key={text} delay={i * 0.05} as="li" className="flex items-start gap-3">
          {marker}
          <span className="text-[0.95rem] leading-relaxed text-navy/70">{text}</span>
        </Reveal>
      ))}
    </ul>
  )
}

export default function ProsAndCons() {
  return (
    <section className="relative bg-white py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue">
            Honestidad
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Con qué cuentas, y con qué no
          </h2>
          <p className="mt-4 text-lg text-navy/70">
            Preferimos que lo sepas ahora a que lo descubras después.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-16">
          <div className="absolute -top-6 left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-navy shadow-[0_10px_30px_rgba(13,42,92,0.25)]">
            <Scale size={20} className="text-white" strokeWidth={1.75} />
          </div>

          <div className="grid grid-cols-1 divide-y divide-soft overflow-hidden rounded-3xl border border-soft bg-bg md:grid-cols-2 md:divide-x md:divide-y-0">
            <div className="p-8 pt-12 sm:p-10 sm:pt-14">
              <h3 className="text-lg font-bold text-navy">Con qué cuentas</h3>
              <div className="mt-6">
                <ItemList
                  items={PROS}
                  marker={<span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />}
                />
              </div>
            </div>

            <div className="p-8 pt-10 sm:p-10">
              <h3 className="text-lg font-bold text-navy">Con qué no</h3>
              <div className="mt-6">
                <ItemList
                  items={CONS}
                  marker={<span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full border border-navy/30" />}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
