import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

const LINKS = [
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#para-quien', label: 'Para quién es' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 lg:px-10 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-full transition-all duration-500 ${
            scrolled
              ? 'bg-white/70 shadow-[0_1px_0_rgba(13,42,92,0.08)] backdrop-blur-xl'
              : 'bg-transparent'
          }`}
        />

        <a
          href="#top"
          onClick={(e) => handleNavClick(e, '#top')}
          className="relative z-10"
          data-cursor-hover
        >
          <Logo />
        </a>

        <nav className="relative z-10 hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              data-cursor-hover
              className="group relative text-[0.925rem] font-medium text-navy/80 transition-colors duration-300 hover:text-navy"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          onClick={(e) => handleNavClick(e, '#contacto')}
          data-cursor-hover
          className="shimmer-sweep relative z-10 hidden overflow-hidden rounded-full bg-navy px-5 py-2.5 text-[0.9rem] font-semibold text-white shadow-[0_4px_16px_rgba(13,42,92,0.25)] transition-transform duration-200 active:scale-[0.98] md:inline-block"
        >
          Solicitar piloto
        </a>

        <button
          className="relative z-10 text-navy md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menú"
          data-cursor-hover
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 pb-6 pt-2">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-navy/80 transition-colors hover:bg-soft/60 hover:text-navy"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={(e) => handleNavClick(e, '#contacto')}
                className="mt-2 rounded-full bg-navy px-5 py-3 text-center text-base font-semibold text-white active:scale-[0.98]"
              >
                Solicitar piloto
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
