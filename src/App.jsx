import { useState } from 'react'
import { FichaComplemento } from './FichaComplemento.jsx'

const RUTA = import.meta.env.BASE_URL + 'img/'

const CHICAS = [
  { id: 'hippie', nombre: 'Hippie' },
  { id: 'choni', nombre: 'Choni' },
  { id: 'deportista', nombre: 'Deportista' }
]

// "chica" indica de quién es cada accesorio
const COMPLEMENTOS = [
  { id: 'hippie_ac1', icono: 'hilo', chica: 'hippie', nombre: 'Bordados', tipo: 'Ropa' },
  { id: 'hippie_ac2', icono: 'mariposa', chica: 'hippie', nombre: 'Mariposa azul', tipo: 'Adorno' },
  { id: 'hippie_ac3', icono: 'flor', chica: 'hippie', nombre: 'Luciérnagas', tipo: 'Adorno' },

  { id: 'choni_ac1', icono: 'estampado', chica: 'choni', nombre: 'Estampado de leopardo', tipo: 'Ropa' },
  { id: 'choni_ac2', icono: 'gafas', chica: 'choni', nombre: 'Gafas de sol', tipo: 'Gafas' },
  { id: 'choni_ac3', icono: 'bolso', chica: 'choni', nombre: 'Bolso', tipo: 'Bolso' },

  { id: 'deportista_ac1', icono: 'hulahop', chica: 'deportista', nombre: 'Hula hoop', tipo: 'Material deportivo' },
  { id: 'deportista_ac2', icono: 'mazas', chica: 'deportista', nombre: 'Mazas de gimnasia', tipo: 'Material deportivo' },
  { id: 'deportista_ac3', icono: 'tutu', chica: 'deportista', nombre: 'Tutu', tipo: 'Ropa' }
]

export function App () {
  const [numChica, setNumChica] = useState(0)
  // accesorios que lleva puestos cada chica (algunos ya equipados al empezar)
  const [equipados, setEquipados] = useState({
    hippie: ['hippie_ac1'],
    choni: [],
    deportista: []
  })

  const chica = CHICAS[numChica]
  const complementosChica = COMPLEMENTOS.filter(c => c.chica === chica.id)
  const idsPuestos = equipados[chica.id]
  const puestos = complementosChica.filter(c => idsPuestos.includes(c.id))

  const cambiarChica = (paso) => setNumChica((numChica + paso + CHICAS.length) % CHICAS.length)

  const alternarComplemento = (id) => {
    const nuevos = idsPuestos.includes(id) ? idsPuestos.filter(x => x !== id) : [...idsPuestos, id]
    setEquipados({ ...equipados, [chica.id]: nuevos })
  }

  return (
    <div className="pagina">
      <header className="cab">
        <div className="cab-logo">
          <div className="gif-slot gif-boton"><img src={`${RUTA}gifs/gato.gif`} alt="" /></div>
          <span>
            <span className="cab-nombre">Juegos de chicas.com</span>
            <span className="cab-lema">La página web de los mejores juegos para chicas</span>
          </span>
        </div>
        <div className="gif-slot gif-sticker"><img src={`${RUTA}gifs/chica.gif`} alt="" /></div>
      </header>

      <nav className="menu">
        <span>Inicio</span><span className="menu-activa">Juegos</span><span>Clasificación</span><span>Videos</span><span>Amigos</span>
      </nav>

      <div className="marquesina">
        <span>★ ¡Elige a tu chica favorita y ponle los accesorios más top!  ★  Nuevo juego disponible: Mi armario  ★</span>
      </div>

      <p className="ruta">Inicio &gt; Juegos &gt; Mi armario</p>

      <div className="cuerpo">
      <section className="ventana">
        <h1 className="ventana-barra">Mi armario</h1>
        <div className="ventana-cuerpo">
          <div className="pantalla">
            <button type="button" className="burbuja flecha" onClick={() => cambiarChica(-1)} aria-label="Chica anterior">◀</button>

            <div className="escenario">
              <div className="personaje-caja">
                <img className="personaje" src={`${RUTA}chicas/${chica.id}.png`} alt={`Chica ${chica.nombre}`} />
                {puestos.map(c => (
                  <img key={c.id} className="complemento-puesto" src={`${RUTA}complementos/${c.id}.png`} alt={c.nombre} />
                ))}
              </div>
              <div className="pedestal" />
            </div>

            <button type="button" className="burbuja flecha" onClick={() => cambiarChica(1)} aria-label="Chica siguiente">▶</button>

            <nav className="selector" aria-label="Accesorios">
              {complementosChica.map(c => (
                <button key={c.id} type="button" title={c.nombre} aria-pressed={idsPuestos.includes(c.id)}
                  className={idsPuestos.includes(c.id) ? 'burbuja burbuja-icono burbuja-activa' : 'burbuja burbuja-icono'}
                  onClick={() => alternarComplemento(c.id)}>
                  <img className="burbuja-imagen" src={`${RUTA}iconos/${c.icono}.png`} alt={c.nombre} />
                </button>
              ))}
            </nav>
          </div>

          <div className="chicas-mini">
            {CHICAS.map((c, i) => (
              <button key={c.id} type="button" onClick={() => setNumChica(i)}
                className={i === numChica ? 'chica-mini chica-mini-activa' : 'chica-mini'}>
                <span className="ficha"><img src={`${RUTA}chicas/${c.id}.png`} alt="" /></span>
                {c.nombre}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="ventana">
        <h1 className="ventana-barra">Inventario de {chica.nombre}</h1>
        <div className="ventana-cuerpo">
          <p className="subtitulo">Pulsa el botón para equipar o quitar cada accesorio.</p>
          <ul className="inventario">
            {complementosChica.map(c => (
              <FichaComplemento key={c.id} imagen={`${RUTA}iconos/${c.icono}.png`} tipo={c.tipo}
                equipado={idsPuestos.includes(c.id)} alternar={() => alternarComplemento(c.id)}>
                {c.nombre}
              </FichaComplemento>
            ))}
          </ul>
        </div>
      </section>
      </div>
    </div>
  )
}
