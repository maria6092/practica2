// Ruta base de las imágenes (funciona también si se publica en una subcarpeta, p. ej. GitHub Pages)
export const RUTA = import.meta.env.BASE_URL + 'img/'
 
// Elementos equipables: los 5 estilos de ropa.
// Iconos: img/iconos/<id>.png · Chicas: img/personajes/<1|2|3>/<id>.png (+ base.png = sin look)
export const ESTILOS = [
  { id: 'gotico',  nombre: 'Gótico',  tipo: 'Look oscuro',  emoji: '🦇' },
  { id: 'vintage', nombre: 'Vintage', tipo: 'Look retro',   emoji: '🎀' },
  { id: 'choni',   nombre: 'Choni',   tipo: 'Look 2000s',   emoji: '💅' },
  { id: 'pija',    nombre: 'Pija',    tipo: 'Look preppy',  emoji: '👛' },
  { id: 'hippie',  nombre: 'Hippie',  tipo: 'Look boho',    emoji: '🌸' }
]
 
export const PERSONAJES = ['Chica 1', 'Chica 2', 'Chica 3']
 