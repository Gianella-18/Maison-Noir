import { Link } from 'react-router-dom';
import './Item.css';

export default function Item({ producto }) {
  const { id, nombre, precio, categoria, imagen, coleccion } = producto;

  const precioFormateado = precio.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  });

  return (
    <Link to={`/producto/${id}`} className="item-card">
      <div className="item-card__image-wrap">
        <img src={imagen} alt={nombre} className="item-card__image" loading="lazy" />
        <div className="item-card__overlay">
          <span className="item-card__cta">Ver Detalle</span>
        </div>
        <span className="item-card__coleccion">{coleccion}</span>
      </div>
      <div className="item-card__info">
        <p className="item-card__categoria">{categoria}</p>
        <h3 className="item-card__nombre">{nombre}</h3>
        <p className="item-card__precio">{precioFormateado}</p>
      </div>
    </Link>
  );
}
