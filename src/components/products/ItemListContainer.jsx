import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ItemList from './ItemList'
import './ItemListContainer.css'

export default function ItemListContainer() {
  const { categoriaId } = useParams()
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/productos.json')
      .then(res => res.json())
      .then(data => {
        // El filtro se aplica sobre la respuesta del fetch,
        // simulando lo que haría un endpoint de backend con parámetro de categoría
        const resultado = categoriaId
          ? data.filter(p => p.categoria === categoriaId)
          : data
        setProductos(resultado)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error cargando productos:', err)
        setLoading(false)
      })
  }, [categoriaId]) // se re-ejecuta cada vez que cambia la categoría en la URL

  if (loading) {
    return (
      <div className="ilc__loading">
        <div className="ilc__spinner" />
        <p>Cargando colección...</p>
      </div>
    )
  }

  return (
    <ItemList
      productos={productos}
      categoriaActiva={categoriaId || 'Todos'}
    />
  )
}
