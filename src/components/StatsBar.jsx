import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'

const STATS = [
  { prefix: '<', target: 3, suffix: 's', label: 'Tiempo de alerta' },
  { prefix: '', target: 0, suffix: '', label: 'Imágenes almacenadas' },
  { prefix: '', target: 24, suffix: '/7', label: 'Monitorización activa' },
]

function Stat({ stat, inView }) {
  const value = useCountUp(stat.target, { start: inView, duration: 1400 })
  return (
    <div className="flex flex-col items-center px-8 py-6 sm:px-14">
      <span className="text-3xl font-extrabold tabular-nums text-navy sm:text-4xl">
        {stat.prefix}
        {value}
        {stat.suffix}
      </span>
      <span className="mt-1 text-sm font-medium text-navy/70">{stat.label}</span>
    </div>
  )
}

export default function StatsBar() {
  const [ref, inView] = useInView({ threshold: 0.4 })

  return (
    <section ref={ref} className="relative border-y border-soft bg-white">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center divide-x divide-soft">
        {STATS.map((stat) => (
          <Stat key={stat.label} stat={stat} inView={inView} />
        ))}
      </div>
    </section>
  )
}
