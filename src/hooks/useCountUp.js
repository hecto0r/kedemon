import { useEffect, useRef, useState } from 'react'

export function useCountUp(target, { start = false, duration = 1600 } = {}) {
  const [value, setValue] = useState(0)
  const raf = useRef(null)

  useEffect(() => {
    if (!start) return
    const numericTarget = typeof target === 'number' ? target : parseFloat(target)
    if (Number.isNaN(numericTarget)) {
      setValue(target)
      return
    }

    const startTime = performance.now()
    const ease = (t) => 1 - Math.pow(1 - t, 3)

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      setValue(Math.round(numericTarget * ease(progress)))
      if (progress < 1) {
        raf.current = requestAnimationFrame(tick)
      }
    }

    raf.current = requestAnimationFrame(tick)
    return () => raf.current && cancelAnimationFrame(raf.current)
  }, [start, target, duration])

  return value
}
