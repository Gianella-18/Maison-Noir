import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext' // Asegúrate de que la ruta sea correcta

const RutaPrivada = ({ children }) => {
  const { usuario, loading } = useContext(AuthContext)

  // Mientras Firebase verifica si hay sesión, mostramos un mensaje o spinner
  if (loading) {
    return <div>Cargando validación de seguridad...</div> 
  }

  // Si no hay usuario, lo redirigimos a la página de login
  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  // Si está logueado, renderizamos el componente que intentaba ver
  return children
}

export default RutaPrivada