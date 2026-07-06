import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const RutaPrivada = ({ children }) => {
  const { usuario, esAdmin, loading } = useContext(AuthContext)

  if (loading) {
    return <div>Cargando validación de seguridad...</div>
  }

  if (!usuario || !esAdmin) {
    return <Navigate to="/acceso-restringido" replace />
  }

  return children
}

export default RutaPrivada