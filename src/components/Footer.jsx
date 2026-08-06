import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-navy py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center lg:px-10">
        <Logo light animate={false} />
        <p className="max-w-md text-sm leading-relaxed text-white/60">
          Protección inteligente para residencias de ancianos. Detección de
          caídas por IA, sin cámaras que graben.
        </p>
        <div className="mt-4 h-px w-full max-w-xs bg-white/10" />
        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} KEDEMON. Todos los derechos reservados.
        </p>
        <p className="text-sm font-medium text-white/60">
          Héctor Velasco · 619 539 992
        </p>
      </div>
    </footer>
  )
}
