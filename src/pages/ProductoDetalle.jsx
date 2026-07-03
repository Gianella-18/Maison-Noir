import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductoDetalle.css';

export default function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    fetch('/productos.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id === parseInt(id));
        setProducto(found || null);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(producto);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2500);
  };

  if (loading) {
    return (
      <div className="pd__loading">
        <div className="pd__spinner" />
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="pd__notfound">
        <p>Pieza no encontrada.</p>
        <button onClick={() => navigate('/productos')}>Volver a la colección</button>
      </div>
    );
  }

  const precioFormateado = producto.precio.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  });

  return (
    <div className="pd">
      <button className="pd__back" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="pd__layout">
        <div className="pd__image-col">
          <div className="pd__image-wrap">
            <img src={producto.imagen} alt={producto.nombre} className="pd__image" />
            <span className="pd__coleccion-badge">{producto.coleccion}</span>
          </div>
        </div>

        <div className="pd__info-col">
          <p className="pd__categoria">{producto.categoria}</p>
          <h1 className="pd__nombre">{producto.nombre}</h1>
          <p className="pd__precio">{precioFormateado}</p>

          <div className="pd__divider" />

          <p className="pd__descripcion">{producto.descripcion}</p>

          <div className="pd__divider" />

          <div className="pd__details">
            <div className="pd__detail">
              <span className="pd__detail-label">Colección</span>
              <span className="pd__detail-value">{producto.coleccion}</span>
            </div>
            <div className="pd__detail">
              <span className="pd__detail-label">Categoría</span>
              <span className="pd__detail-value">{producto.categoria}</span>
            </div>
            <div className="pd__detail">
              <span className="pd__detail-label">Disponibilidad</span>
              <span className="pd__detail-value">{producto.disponible ? 'En stock' : 'Agotado'}</span>
            </div>
          </div>

          <button
            className={`pd__add-btn ${agregado ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={!producto.disponible}
          >
            {agregado ? '✓ Agregado al carrito' : 'Agregar al carrito'}
          </button>

          <p className="pd__envio">Envío gratuito en compras superiores a $500.000 · Devolución en 30 días</p>
        </div>
      </div>
    </div>
  );
}
