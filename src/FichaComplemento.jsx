import { Miniatura } from './Miniatura.jsx'

export function FichaComplemento ({ children, imagen, tipo = 'Accesorio', equipado, alternar }) {
  return (
    <li className={equipado ? 'ficha-comp ficha-comp-puesta' : 'ficha-comp'}>
      <div className="ficha-comp-imagen">
        <Miniatura src={imagen} alt={String(children)} />
      </div>
      <strong>{children}</strong>
      <span className="ficha-comp-tipo">Tipo: {tipo}</span>
      <button type="button" className={equipado ? 'boton boton-equipar puesto' : 'boton boton-equipar'} onClick={alternar}>
        <span className="boton-texto">{equipado ? 'Equipado ✓' : 'Equipar'}</span>
        <span className="boton-quitar">Quitar</span>
      </button>
    </li>
  )
}
