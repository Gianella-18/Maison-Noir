import { Link } from 'react-router-dom'
import Item from './Item'
import './ItemList.css'

const CATEGORIAS = ['Todos', 'Abrigos', 'Vestidos', 'Sacos', 'Pantalones', 'Tops', 'Faldas', 'Conjuntos']

export default function ItemList({ productos, categoriaActiva }) {
  return (
    <section className="ilc">
      <div className="ilc__hero">
        <p className="ilc__season">Otoño — Invierno 2026</p>
        <h1 className="ilc__title">La Colección</h1>
        <p className="ilc__subtitle">{productos.length} piezas. Una visión.</p>
      </div>

      <div className="ilc__filters">
        {CATEGORIAS.map(cat => (
          <Link
            key={cat}
            to={cat === 'Todos' ? '/productos' : `/productos/${cat}`}
            className={`ilc__filter ${categoriaActiva === cat ? 'active' : ''}`}
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className="ilc__grid">
        {productos.map(producto => (
          <Item key={producto.id} producto={producto} />
        ))}
      </div>
    </section>
  )
}
