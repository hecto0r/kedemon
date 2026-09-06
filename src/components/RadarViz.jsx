import { m } from 'framer-motion'
import LogoMark from './LogoMark'

const RINGS = [0, 0.6, 1.2, 1.8]

export default function RadarViz() {
  return (
    <div className="relative flex h-[320px] w-[320px] items-center justify-center sm:h-[420px] sm:w-[420px]">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="radarFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4a9eff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#4a9eff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="190" fill="url(#radarFade)" />
        {[70, 115, 160].map((r) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke="#1a4a8a"
            strokeOpacity="0.15"
            strokeWidth="1"
          />
        ))}
        <line x1="200" y1="10" x2="200" y2="390" stroke="#1a4a8a" strokeOpacity="0.08" />
        <line x1="10" y1="200" x2="390" y2="200" stroke="#1a4a8a" strokeOpacity="0.08" />
      </svg>

      {RINGS.map((delay, i) => (
        <span
          key={i}
          className="absolute h-24 w-24 rounded-full border-2 border-accent animate-pulse-ring"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}

      <m.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{
          scale: [1, 1.04, 1],
          opacity: 1,
        }}
        transition={{
          scale: { duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 1.1 },
          opacity: { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
        }}
        className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-navy shadow-[0_0_0_8px_rgba(74,158,255,0.12),0_20px_50px_rgba(13,42,92,0.35)]"
      >
        <span className="absolute inset-2 rounded-full bg-accent/25 blur-md" />
        <LogoMark className="relative h-11 w-11 text-white drop-shadow-[0_0_6px_rgba(74,158,255,0.6)]" />
      </m.div>

      {[
        { top: '12%', left: '18%', delay: 0 },
        { top: '68%', left: '76%', delay: 0.6 },
        { top: '78%', left: '20%', delay: 1.1 },
      ].map((dot, i) => (
        <m.span
          key={i}
          className="absolute h-2.5 w-2.5 rounded-full bg-blue"
          style={{ top: dot.top, left: dot.left }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.15, 0.8] }}
          transition={{ duration: 2.4, delay: dot.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
