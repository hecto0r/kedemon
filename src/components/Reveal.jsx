import { m } from 'framer-motion'
import { useInView } from '../hooks/useInView'

export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 28,
  duration = 0.7,
  as = 'div',
}) {
  const [ref, inView] = useInView()
  const Component = m[as] ?? m.div

  return (
    <Component
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  )
}
