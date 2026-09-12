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
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/60">
          <a href="./privacidad.html" className="hover:text-white">
            Política de Privacidad
          </a>
          <a href="./cookies.html" className="hover:text-white">
            Política de Cookies
          </a>
          <a href="./aviso-legal.html" className="hover:text-white">
            Aviso Legal
          </a>
        </nav>
        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} KEDEMON HEALTH. Todos los derechos reservados.
        </p>
        <p className="text-sm font-medium text-white/60">
          Héctor Velasco · 619 539 992
        </p>
      </div>
    </footer>
  )
}
