import { useState } from 'react'
import { ESTILOS, PERSONAJES, RUTA } from './baseDatos.js'
import { Imagen } from './Imagen.jsx'
import { FilaEstilo } from './FilaEstilo.jsx'

export function App () {
  const [personaje, setPersonaje] = useState(0)
  // Estilos equipados de cada chica (algunos ya puestos al empezar)
  const [equipados, setEquipados] = useState([['choni'], ['pija'], ['gotico', 'vintage']])

  const lista = equipados[personaje]
  const idActual = lista[lista.length - 1] ?? 'base' // el último equipado es el que se ve puesto
  const estiloActual = ESTILOS.find(e => e.id === idActual)
  const rutaPersonaje = `${RUTA}personajes/${personaje + 1}/${idActual}.png`

  const cambiarPersonaje = (paso) => setPersonaje((personaje + paso + PERSONAJES.length) % PERSONAJES.length)
  const alternarEstilo = (id) => setEquipados(equipados.map((estilos, i) =>
    i !== personaje ? estilos : estilos.includes(id) ? estilos.filter(x => x !== id) : [...estilos, id]))

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
      </header>


      <div className="cuerpo">
        <main className="principal">
          <section className="ventana">
            <div className="ventana-barra">
              <h1>Mi armario</h1>
              <span className="ventana-botones"><i>_</i><i>&#9633;</i><i>x</i></span>
            </div>
            <div className="ventana-cuerpo">
              <div className="pantalla">
                <button type="button" className="burbuja flecha" onClick={() => cambiarPersonaje(-1)} aria-label="Chica anterior">◀</button>

                <div className="escenario">
                  <Imagen key={rutaPersonaje} className="personaje" src={rutaPersonaje} relleno="💃"
                    alt={`${PERSONAJES[personaje]} con look ${estiloActual?.nombre ?? 'base'}`} />
                  <div className="pedestal" />
                </div>

                <button type="button" className="burbuja flecha" onClick={() => cambiarPersonaje(1)} aria-label="Chica siguiente">▶</button>

                <nav className="selector" aria-label="Estilos">
                  {ESTILOS.map(e => (
                    <button key={e.id} type="button" title={e.nombre} aria-pressed={lista.includes(e.id)}
                      className={lista.includes(e.id) ? 'burbuja burbuja-icono burbuja-activa' : 'burbuja burbuja-icono'}
                      onClick={() => alternarEstilo(e.id)}>
                      <Imagen className="burbuja-imagen" src={`${RUTA}iconos/${e.id}.png`} alt={e.nombre} relleno={e.emoji} />
                    </button>
                  ))}
                </nav>

                <p className="leyenda">{PERSONAJES[personaje]} · {estiloActual ? `look ${estiloActual.nombre}` : 'sin look'}</p>
              </div>
            </div>
          </section>

          <section className="ventana">
            <div className="ventana-barra">
              <h1>Inventario</h1>
              <span className="ventana-botones"><i>_</i><i>&#9633;</i><i>x</i></span>
            </div>
            <div className="ventana-cuerpo">
              <p className="subtitulo">Pulsa el botón para equipar o quitar cada estilo. <span className="nuevo">¡NUEVO!</span></p>
              <div className="tabla-envoltorio">
                <table className="tabla">
                  <thead>
                    <tr><th>Estilo</th><th className="columna-tipo">Tipo</th><th className="num">Acción</th></tr>
                  </thead>
                  <tbody>
                    {ESTILOS.map(e => (
                      <FilaEstilo key={e.id} {...e} equipado={lista.includes(e.id)} alternar={() => alternarEstilo(e.id)} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>

      <footer className="pie">
        <p>© 2026 Juegosdechicas.com · Práctica 2 · Aplicaciones para la Web</p>
      </footer>
    </div>
  )
}