import { useState } from 'react'

export function Imagen ({ src, alt = '', relleno, className = '', estiloRelleno }) {
  const [fallo, setFallo] = useState(false)
  if (fallo) return <span className={`${className} relleno`} style={estiloRelleno} role="img" aria-label={alt}>{relleno}</span>
  return <img className={className} src={src} alt={alt} onError={() => setFallo(true)} />
}
