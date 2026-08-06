import LogoMark from './LogoMark'

export default function Logo({ className = '', markClassName = '', light = false, animate = true }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark
        className={`h-7 w-7 shrink-0 ${animate ? 'animate-logo-pulse' : ''} ${
          light ? 'text-white' : 'text-navy'
        } ${markClassName}`}
      />
      <span
        className={`text-[1.15rem] font-bold tracking-tight ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        KEDEMON
      </span>
    </div>
  )
}
