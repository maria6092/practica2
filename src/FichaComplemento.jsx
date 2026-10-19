import { Miniatura } from './Miniatura.jsx'
import { RUTA } from './baseDatos.js'

export function FichaComplemento ({ children, id, tipo = 'Accesorio', emoji, equipado, alternar }) {
  const claseFicha = equipado ? 'ficha-comp ficha-comp-puesta' : 'ficha-comp'
  const claseBoton = equipado ? 'boton boton-equipar puesto' : 'boton boton-equipar'

  return (
    <li className={claseFicha}>
      {equipado && <span className="cinta">¡Puesto!</span>}
      <div className="ficha-comp-imagen">
        <Miniatura src={`${RUTA}complementos/${id}.png`} alt={String(children)} relleno={emoji} />
      </div>
      <strong className="ficha-comp-nombre">{children}</strong>
      <span className="ficha-comp-tipo">Tipo: {tipo}</span>
      <button type="button" className={claseBoton} onClick={alternar}>
        <span className="boton-texto">{equipado ? 'Equipado ✓' : 'Equipar'}</span>
        <span className="boton-quitar">Quitar</span>
      </button>
    </li>
  )
}
