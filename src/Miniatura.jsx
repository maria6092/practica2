import { useEffect, useState } from 'react'

const cache = new Map()

function recortar (img) {
  const lienzo = document.createElement('canvas')
  lienzo.width = img.naturalWidth
  lienzo.height = img.naturalHeight
  const ctx = lienzo.getContext('2d')
  ctx.drawImage(img, 0, 0)
  const { data, width, height } = ctx.getImageData(0, 0, lienzo.width, lienzo.height)

  let x0 = width, y0 = height, x1 = -1, y1 = -1
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 10) {
        if (x < x0) x0 = x
        if (x > x1) x1 = x
        if (y < y0) y0 = y
        if (y > y1) y1 = y
      }
    }
  }
  if (x1 < 0) return img.src

  const margen = Math.round(Math.max(x1 - x0, y1 - y0) * 0.06)
  x0 = Math.max(0, x0 - margen); y0 = Math.max(0, y0 - margen)
  x1 = Math.min(width - 1, x1 + margen); y1 = Math.min(height - 1, y1 + margen)

  const salida = document.createElement('canvas')
  salida.width = x1 - x0 + 1
  salida.height = y1 - y0 + 1
  salida.getContext('2d').drawImage(img, x0, y0, salida.width, salida.height, 0, 0, salida.width, salida.height)
  return salida.toDataURL('image/png')
}

export function Miniatura ({ src, alt = '', relleno, className = '' }) {
  const [url, setUrl] = useState(cache.get(src) ?? null)
  const [fallo, setFallo] = useState(false)

  useEffect(() => {
    if (cache.has(src)) return
    let vivo = true
    const img = new window.Image()
    img.onload = () => {
      const recorte = recortar(img)
      cache.set(src, recorte)
      if (vivo) setUrl(recorte)
    }
    img.onerror = () => { if (vivo) setFallo(true) }
    img.src = src
    return () => { vivo = false }
  }, [src])

  if (fallo) return <span className={`${className} relleno`} role="img" aria-label={alt}>{relleno}</span>
  if (!url) return <span className={className} aria-hidden="true" />
  return <img className={className} src={url} alt={alt} />
}
