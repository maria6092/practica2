import { useState } from 'react'
import { CHICAS, COMPLEMENTOS, RUTA } from './baseDatos.js'
import { Imagen } from './Imagen.jsx'
import { Miniatura } from './Miniatura.jsx'
import { FichaComplemento } from './FichaComplemento.jsx'

export function App () {
  const [numChica, setNumChica] = useState(0)
  const [equipados, setEquipados] = useState({
    hippie: ['hippie_ac1'],
    choni: [],
    deportista: []
  })

  const chica = CHICAS[numChica]
  const complementosChica = COMPLEMENTOS.filter(c => c.chica === chica.id)
  const idsPuestos = equipados[chica.id]
  const puestos = complementosChica.filter(c => idsPuestos.includes(c.id))
  const totalEquipadas = CHICAS.filter(c => equipados[c.id].length > 0).length
  const cambiarChica = (paso) => setNumChica((numChica + paso + CHICAS.length) % CHICAS.length)
  const alternarComplemento = (id) => {
    const nuevos = idsPuestos.includes(id) ? idsPuestos.filter(x => x !== id) : [...idsPuestos, id]
    setEquipados({ ...equipados, [chica.id]: nuevos })
  }

  return (
    <div className="pagina">
      <header className="cab">
        <div className="cab-logo">
          <div className="gif-slot gif-boton"><Imagen src={`${RUTA}gifs/gato.gif`} relleno="GIF" /></div>
          <span>
            <span className="cab-nombre">Juegos de chicas.com</span>
            <span className="cab-lema">La página web de los mejores juegos para chicas</span>
          </span>
        </div>
        <div className="gif-slot gif-sticker"><Imagen src={`${RUTA}gifs/chica.gif`} relleno="GIF" /></div>
      </header>

      <nav className="menu">
        <span>Inicio</span><span className="menu-activa">Juegos</span><span>Clasificación</span><span>Videos</span><span>Amigos</span>
      </nav>

      <div className="marquesina">
        <span>★ ¡Elige a tu chica favorita y ponle los accesorios más top!  ★  Nuevo disponible juego: Mi armario  ★</span>
      </div>

      <p className="ruta">Inicio &gt; Juegos &gt; Mi armario</p>

      <div className="cuerpo">
        <main className="principal">
          <section className="ventana">
            <div className="ventana-barra">
              <h1>Mi armario</h1>
              <span className="ventana-botones"><i>_</i><i>&#9633;</i><i>x</i></span>
            </div>
            <div className="ventana-cuerpo">
              <div className="pantalla">
                <button type="button" className="burbuja flecha" onClick={() => cambiarChica(-1)} aria-label="Chica anterior">◀</button>

                <div className="escenario">
                  <div className="personaje-caja">
                    <Imagen key={chica.id} className="personaje" src={`${RUTA}chicas/${chica.id}.png`} relleno={chica.emoji}
                      alt={`Chica ${chica.nombre}`} />
                    {puestos.map((c, i) => (
                      <Imagen key={c.id} className="complemento-puesto" src={`${RUTA}complementos/${c.id}.png`}
                        relleno={c.emoji} alt={c.nombre} estiloRelleno={{ top: `${4 + i * 13}%` }} />
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
                      <Miniatura className="burbuja-imagen" src={`${RUTA}complementos/${c.id}.png`} alt={c.nombre} relleno={c.emoji} />
                    </button>
                  ))}
                </nav>

                <p className="leyenda">{chica.nombre} · {puestos.length > 0 ? `lleva ${puestos.map(c => c.nombre).join(', ')}` : 'sin accesorios'}</p>
              </div>

              <div className="chicas-mini" aria-label="Elegir chica">
                {CHICAS.map((c, i) => (
                  <button key={c.id} type="button" onClick={() => setNumChica(i)}
                    className={i === numChica ? 'chica-mini chica-mini-activa' : 'chica-mini'}>
                    <span className="ficha"><Imagen src={`${RUTA}chicas/${c.id}.png`} relleno={c.emoji} /></span>
                    <span className="chica-mini-nombre">{c.nombre}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="ventana">
            <div className="ventana-barra">
              <h1>Inventario de {chica.nombre}</h1>
              <span className="ventana-botones"><i>_</i><i>&#9633;</i><i>x</i></span>
            </div>
            <div className="ventana-cuerpo">
              <p className="subtitulo">Pulsa el botón para equipar o quitar cada accesorio: ¡puedes ponerte todos a la vez! <span className="nuevo">¡NUEVO!</span></p>
              <ul className="inventario">
                {complementosChica.map(c => (
                  <FichaComplemento key={c.id} id={c.id} tipo={c.tipo} emoji={c.emoji}
                    equipado={idsPuestos.includes(c.id)} alternar={() => alternarComplemento(c.id)}>
                    {c.nombre}
                  </FichaComplemento>
                ))}
              </ul>
            </div>
          </section>
        </main>

        <aside className="lateral">
          <section className="caja">
            <h2 className="caja-titulo">Mis looks</h2>
            <div className="caja-cuerpo">
              <ul>
                {CHICAS.map(c => {
                  const nombres = COMPLEMENTOS.filter(x => equipados[c.id].includes(x.id)).map(x => x.nombre)
                  return <li key={c.id}><strong>{c.nombre}:</strong> {nombres.length > 0 ? nombres.join(', ') : 'sin accesorios'}</li>
                })}
              </ul>
              <p className="caja-fecha">{totalEquipadas} de {CHICAS.length} equipadas</p>
            </div>
          </section>
          <div className="gif-slot gif-cuadrado"><Imagen src={`${RUTA}gifs/ordenador.gif`} relleno="GIF" /></div>
        </aside>
      </div>

      <footer className="pie">
        <p>© 2026 Juegosdechicas.com </p>
      </footer>
    </div>
  )
}
