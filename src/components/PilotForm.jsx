import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import Reveal from './Reveal'
import LogoMark from './LogoMark'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

const FIELDS = [
  { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Tu nombre completo' },
  { name: 'residencia', label: 'Residencia', type: 'text', placeholder: 'Nombre de la residencia' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'tu@residencia.com' },
  { name: 'telefono', label: 'Teléfono', type: 'tel', placeholder: '600 000 000' },
]

const STATUS_MESSAGE = {
  loading: 'Enviando solicitud…',
  merging: 'Solicitud enviada.',
  done: 'Solicitud enviada correctamente. Gracias.',
  error: 'No se ha podido enviar la solicitud.',
}

const CONSENT_INDEX = FIELDS.length
const BUTTON_INDEX = FIELDS.length + 1

export default function PilotForm() {
  const [status, setStatus] = useState('idle') // idle | loading | merging | done | error
  const [errorMessage, setErrorMessage] = useState('')
  const [values, setValues] = useState({ nombre: '', residencia: '', email: '', telefono: '' })
  const [consent, setConsent] = useState(false)
  const [mergeOffsets, setMergeOffsets] = useState([])

  const gridRef = useRef(null)
  const fieldRefs = useRef([])

  const handleChange = (name) => (e) =>
    setValues((v) => ({ ...v, [name]: e.target.value }))

  const triggerMerge = () => {
    const grid = gridRef.current
    if (!grid) {
      setStatus('done')
      return
    }
    const gridRect = grid.getBoundingClientRect()
    const cx = gridRect.left + gridRect.width / 2
    const cy = gridRect.top + gridRect.height / 2
    const offsets = fieldRefs.current.map((el) => {
      if (!el) return { dx: 0, dy: 0 }
      const r = el.getBoundingClientRect()
      return { dx: cx - (r.left + r.width / 2), dy: cy - (r.top + r.height / 2) }
    })
    setMergeOffsets(offsets)
    setStatus('merging')
    window.setTimeout(() => setStatus('done'), 800)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'loading' || status === 'merging') return

    if (!WEB3FORMS_KEY) {
      setErrorMessage(
        'El formulario aún no está conectado a un email (falta configurar la clave de envío).'
      )
      setStatus('error')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'Nueva solicitud de piloto · KEDEMON',
          from_name: 'Web KEDEMON',
          ...values,
          consentimiento_rgpd: 'Sí, aceptó la política de privacidad antes de enviar',
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || 'Envío rechazado')
      triggerMerge()
    } catch {
      setErrorMessage('No se pudo enviar la solicitud. Inténtalo de nuevo en unos segundos.')
      setStatus('error')
    }
  }

  const fieldAnimate = (i) =>
    status === 'merging'
      ? {
          x: mergeOffsets[i]?.dx ?? 0,
          y: mergeOffsets[i]?.dy ?? 0,
          scale: 0.15,
          opacity: 0,
          rotate: i % 2 === 0 ? -20 : 20,
        }
      : { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }

  return (
    <section id="contacto" className="relative bg-bg py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <Reveal className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue">
            Piloto gratuito
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            ¿Tu residencia quiere ser la primera?
          </h2>
          <p className="mt-4 text-lg text-navy/70">
            4 semanas. 1 habitación. 0€. Sin compromiso.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="relative mt-12">
          <div aria-live="polite" className="sr-only">
            {STATUS_MESSAGE[status] ?? ''}
          </div>

          {status === 'merging' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/40 blur-2xl"
            />
          )}

          {status === 'done' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center rounded-2xl border border-soft bg-white px-8 py-16 text-center shadow-sm"
            >
              <motion.div
                initial={{ scale: 0, rotate: -35, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-navy shadow-[0_10px_30px_rgba(13,42,92,0.3)]"
              >
                <LogoMark className="h-10 w-10 text-white" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 text-2xl font-extrabold text-navy"
              >
                ¡Muchas gracias!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-2 max-w-sm text-navy/70"
              >
                Hemos recibido tu solicitud. Nuestro equipo se pondrá en
                contacto contigo en menos de 48 horas para organizar el
                piloto.
              </motion.p>
            </motion.div>
          ) : (
            <form
              ref={gridRef}
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-5 rounded-2xl border border-soft bg-white p-8 shadow-sm sm:grid-cols-2 sm:p-10"
            >
              {FIELDS.map((field, i) => (
                <motion.div
                  key={field.name}
                  ref={(el) => (fieldRefs.current[i] = el)}
                  animate={fieldAnimate(i)}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.65, 0, 0.35, 1] }}
                  className="flex flex-col gap-2"
                >
                  <label htmlFor={field.name} className="text-sm font-semibold text-navy/70">
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    type={field.type}
                    required
                    disabled={status !== 'idle' && status !== 'error'}
                    placeholder={field.placeholder}
                    value={values[field.name]}
                    onChange={handleChange(field.name)}
                    className="rounded-xl border border-soft bg-bg px-4 py-3 text-navy outline-none transition-all duration-200 placeholder:text-navy/30 focus:border-accent focus:bg-white focus:shadow-[0_0_0_4px_rgba(74,158,255,0.15)] disabled:opacity-60"
                  />
                </motion.div>
              ))}

              <motion.label
                ref={(el) => (fieldRefs.current[CONSENT_INDEX] = el)}
                animate={fieldAnimate(CONSENT_INDEX)}
                transition={{ duration: 0.6, delay: CONSENT_INDEX * 0.05, ease: [0.65, 0, 0.35, 1] }}
                htmlFor="consent"
                className="col-span-full flex items-start gap-3 text-sm text-navy/70"
              >
                <input
                  id="consent"
                  type="checkbox"
                  required
                  disabled={status !== 'idle' && status !== 'error'}
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  style={{ accentColor: '#4a9eff' }}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-soft disabled:opacity-60"
                />
                <span>
                  He leído y acepto la{' '}
                  <a
                    href="./privacidad.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue underline underline-offset-2"
                  >
                    Política de Privacidad
                  </a>{' '}
                  para el tratamiento de mis datos.
                </span>
              </motion.label>

              <motion.button
                ref={(el) => (fieldRefs.current[BUTTON_INDEX] = el)}
                type="submit"
                data-cursor-hover
                disabled={status === 'loading' || status === 'merging'}
                animate={fieldAnimate(BUTTON_INDEX)}
                transition={{ duration: 0.6, delay: BUTTON_INDEX * 0.05, ease: [0.65, 0, 0.35, 1] }}
                className="shimmer-sweep relative col-span-full mt-2 flex items-center justify-center gap-2 overflow-hidden rounded-full bg-navy px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_8px_24px_rgba(13,42,92,0.3)] transition-transform duration-200 active:scale-[0.98] disabled:opacity-80"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Enviando...
                  </>
                ) : status === 'error' ? (
                  'Reintentar envío'
                ) : (
                  'Solicitar piloto gratuito'
                )}
              </motion.button>

              {status === 'error' && (
                <p role="alert" className="col-span-full text-sm font-medium text-red-600">
                  {errorMessage}
                </p>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
