import { useState } from 'react'

// Muestra la imagen; si el archivo aún no existe, enseña el texto/emoji de relleno
export function Imagen ({ src, alt = '', relleno, className = '' }) {
  const [fallo, setFallo] = useState(false)
  if (fallo) return <span className={`${className} relleno`} role="img" aria-label={alt}>{relleno}</span>
  return <img className={className} src={src} alt={alt} onError={() => setFallo(true)} />
}