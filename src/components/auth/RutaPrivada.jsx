import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const RutaPrivada = ({ children }) => {
  const { usuario, esAdmin, loading } = useContext(AuthContext)

  // Mientras Firebase verifica si hay sesión, mostramos un mensaje o spinner
  if (loading) {
    return <div>Cargando validación de seguridad...</div>
  }

  // Si no hay usuario logueado, o está logueado pero no es el admin, afuera
  if (!usuario || !esAdmin) {
    return <Navigate to="/login" replace />
  }

  // Si está logueado y es admin, renderizamos el componente que intentaba ver
  return children
}

export default RutaPrivada