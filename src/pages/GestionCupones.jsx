import { useState } from 'react'
import './GestionCupones.css'

export default function GestionCupones() {
  const [cupones, setCupones] = useState([
    { id: 1, codigo: 'NOIR10', descuento: 10 },
    { id: 2, codigo: 'MODA20', descuento: 20 },
  ])
  const [codigo, setCodigo] = useState('')
  const [descuento, setDescuento] = useState('')
  const [error, setError] = useState('')
  const [exito, setExito] = useState('')

  // CREATE — equivalente a addDoc en Firebase
  const handleCrear = (e) => {
    e.preventDefault()
    setError('')
    setExito('')

    if (!codigo.trim()) {
      setError('El código no puede estar vacío.')
      return
    }
    if (!descuento || descuento <= 0 || descuento > 100) {
      setError('El descuento debe ser un número entre 1 y 100.')
      return
    }
    const yaExiste = cupones.find(
      c => c.codigo.toLowerCase() === codigo.trim().toLowerCase()
    )
    if (yaExiste) {
      setError('Ya existe un cupón con ese código.')
      return
    }

    const nuevoCupon = {
      id: Date.now(),
      codigo: codigo.trim().toUpperCase(),
      descuento: Number(descuento),
    }

    // Simulación de addDoc: agrega al estado local
    setCupones(prev => [...prev, nuevoCupon])
    setCodigo('')
    setDescuento('')
    setExito(`Cupón "${nuevoCupon.codigo}" creado correctamente.`)
  }

  // DELETE — equivalente a deleteDoc en Firebase
  const handleEliminar = (id, codigoCupon) => {
    const confirmacion = window.confirm(
      `¿Estás segura de eliminar el cupón "${codigoCupon}"?`
    )
    if (confirmacion) {
      setCupones(prev => prev.filter(c => c.id !== id))
      setExito(`Cupón "${codigoCupon}" eliminado.`)
    }
  }

  return (
    <div className="gc">
      <div className="gc__header">
        <p className="gc__label">Panel de Administración</p>
        <h1 className="gc__title">Gestión de Cupones</h1>
        <p className="gc__sub">Creá y eliminá cupones de descuento para tus clientas.</p>
      </div>

      <div className="gc__layout">
        {/* Formulario — CREATE */}
        <div className="gc__form-wrap">
          <h2 className="gc__section-title">Nuevo Cupón</h2>
          <form className="gc__form" onSubmit={handleCrear}>
            <div className="gc__field">
              <label className="gc__field-label">Código del cupón</label>
              <input
                className="gc__input"
                type="text"
                placeholder="Ej: NOIR15"
                value={codigo}
                onChange={e => setCodigo(e.target.value)}
                maxLength={20}
              />
            </div>
            <div className="gc__field">
              <label className="gc__field-label">Porcentaje de descuento (%)</label>
              <input
                className="gc__input"
                type="number"
                placeholder="Ej: 15"
                value={descuento}
                onChange={e => setDescuento(e.target.value)}
                min={1}
                max={100}
              />
            </div>

            {error && <p className="gc__msg gc__msg--error">{error}</p>}
            {exito && <p className="gc__msg gc__msg--exito">{exito}</p>}

            <button className="gc__btn-crear" type="submit">
              + Crear Cupón
            </button>
          </form>
        </div>

        {/* Lista de cupones — READ + DELETE */}
        <div className="gc__list-wrap">
          <h2 className="gc__section-title">
            Cupones activos
            <span className="gc__count">{cupones.length}</span>
          </h2>

          {cupones.length === 0 ? (
            <p className="gc__empty">No hay cupones activos.</p>
          ) : (
            <ul className="gc__list">
              {cupones.map(cupon => (
                <li className="gc__cupon" key={cupon.id}>
                  <div className="gc__cupon-info">
                    <span className="gc__cupon-codigo">{cupon.codigo}</span>
                    <span className="gc__cupon-descuento">{cupon.descuento}% OFF</span>
                  </div>
                  <button
                    className="gc__btn-eliminar"
                    onClick={() => handleEliminar(cupon.id, cupon.codigo)}
                    aria-label={`Eliminar cupón ${cupon.codigo}`}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
