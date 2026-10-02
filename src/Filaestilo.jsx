import { Imagen } from './Imagen.jsx'
import { RUTA } from './baseDatos.js'

export function FilaEstilo ({ id, nombre, tipo, emoji, equipado, alternar }) {
  return (
    <tr className={equipado ? 'fila fila-equipada' : 'fila'}>
      <td>
        <div className="jugador">
          <span className="ficha"><Imagen src={`${RUTA}iconos/${id}.png`} relleno={emoji} /></span>
          {equipado && <span className="online" title="Equipado" />}
          <span className="jugador-textos"><span className="nick">{nombre}</span></span>
        </div>
      </td>
      <td className="columna-tipo">{tipo}</td>
      <td className="num">
        <button type="button" className={equipado ? 'boton boton-equipar puesto' : 'boton boton-equipar'} onClick={alternar}>
          <span className="boton-texto">{equipado ? 'Equipado ✓' : 'Equipar'}</span>
          <span className="boton-quitar">Quitar</span>
        </button>
      </td>
    </tr>
  )
}