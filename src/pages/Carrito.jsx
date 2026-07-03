import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Carrito.css'

const formatARS = (valor) =>
  valor.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  })

// Cupones válidos — en una app real vendrían de Firebase/backend
const CUPONES_VALIDOS = [
  { codigo: 'NOIR10', descuento: 10 },
  { codigo: 'MODA20', descuento: 20 },
]

export default function Carrito() {
  const { cartItems, removeFromCart, updateCantidad, totalPrecio, totalItems } = useCart()
  const [codigoCupon, setCodigoCupon] = useState('')
  const [cuponAplicado, setCuponAplicado] = useState(null)
  const [errorCupon, setErrorCupon] = useState('')

  const handleAplicarCupon = () => {
    setErrorCupon('')
    const encontrado = CUPONES_VALIDOS.find(
      c => c.codigo === codigoCupon.trim().toUpperCase()
    )
    if (encontrado) {
      setCuponAplicado(encontrado)
      setCodigoCupon('')
    } else {
      setErrorCupon('Cupón inválido o inexistente.')
      setCuponAplicado(null)
    }
  }

  const descuento = cuponAplicado
    ? (totalPrecio * cuponAplicado.descuento) / 100
    : 0
  const totalConDescuento = totalPrecio - descuento

  if (cartItems.length === 0) {
    return (
      <div className="carrito__empty">
        <div className="carrito__empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
        </div>
        <h2 className="carrito__empty-title">Tu carrito está vacío</h2>
        <p className="carrito__empty-sub">Descubre nuestra colección y añade tus piezas favoritas.</p>
        <Link to="/productos" className="carrito__empty-cta">Explorar Colección</Link>
      </div>
    )
  }

  return (
    <div className="carrito">
      <div className="carrito__header">
        <h1 className="carrito__title">Carrito de Compras</h1>
        <p className="carrito__count">{totalItems} {totalItems === 1 ? 'pieza' : 'piezas'}</p>
      </div>

      <div className="carrito__layout">
        <div className="carrito__items">
          {cartItems.map(item => (
            <div className="carrito__item" key={item.id}>
              <div className="carrito__item-img-wrap">
                <img src={item.imagen} alt={item.nombre} className="carrito__item-img" />
              </div>
              <div className="carrito__item-info">
                <p className="carrito__item-cat">{item.categoria}</p>
                <h3 className="carrito__item-name">{item.nombre}</h3>
                <p className="carrito__item-price">{formatARS(item.precio)}</p>
                <div className="carrito__item-qty">
                  <button className="qty-btn" onClick={() => updateCantidad(item.id, item.cantidad - 1)}>−</button>
                  <span className="qty-value">{item.cantidad}</span>
                  <button className="qty-btn" onClick={() => updateCantidad(item.id, item.cantidad + 1)}>+</button>
                </div>
              </div>
              <div className="carrito__item-right">
                <p className="carrito__item-subtotal">{formatARS(item.precio * item.cantidad)}</p>
                <button className="carrito__remove" onClick={() => removeFromCart(item.id)} aria-label="Eliminar">×</button>
              </div>
            </div>
          ))}
        </div>

        <div className="carrito__summary">
          <h2 className="carrito__summary-title">Resumen</h2>

          <div className="carrito__summary-rows">
            {cartItems.map(item => (
              <div className="carrito__summary-row" key={item.id}>
                <span>{item.nombre} ×{item.cantidad}</span>
                <span>{formatARS(item.precio * item.cantidad)}</span>
              </div>
            ))}
          </div>

          <div className="carrito__summary-divider" />

          <div className="carrito__cupon">
            <p className="carrito__cupon-label">¿Tenés un cupón?</p>
            {cuponAplicado ? (
              <div className="carrito__cupon-aplicado">
                <span>🏷 <strong>{cuponAplicado.codigo}</strong> — {cuponAplicado.descuento}% OFF aplicado</span>
                <button className="carrito__cupon-quitar" onClick={() => setCuponAplicado(null)}>Quitar</button>
              </div>
            ) : (
              <div className="carrito__cupon-form">
                <input
                  className="carrito__cupon-input"
                  type="text"
                  placeholder="Código de cupón"
                  value={codigoCupon}
                  onChange={e => setCodigoCupon(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAplicarCupon()}
                />
                <button className="carrito__cupon-btn" onClick={handleAplicarCupon}>
                  Aplicar
                </button>
              </div>
            )}
            {errorCupon && <p className="carrito__cupon-error">{errorCupon}</p>}
          </div>

          <div className="carrito__summary-divider" />

          {cuponAplicado && (
            <div className="carrito__summary-row carrito__descuento-row">
              <span>Descuento ({cuponAplicado.descuento}%)</span>
              <span>− {formatARS(descuento)}</span>
            </div>
          )}

          <div className="carrito__summary-total">
            <span>Total</span>
            <span>{formatARS(totalConDescuento)}</span>
          </div>

          <button className="carrito__checkout">Finalizar Compra</button>

          <Link to="/productos" className="carrito__continue">
            ← Continuar comprando
          </Link>
        </div>
      </div>
    </div>
  )
}
