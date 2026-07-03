import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async' 
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext' 
import RutaPrivada from './components/auth/RutaPrivada' 

import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Productos from './pages/Productos'
import ProductoDetalle from './pages/ProductoDetalle'
import Carrito from './pages/Carrito'
import GestionCupones from './pages/GestionCupones'
import Login from './pages/Login' 
import AdminProductos from './pages/AdminProductos' 

export default function App() {
  return (
    <HelmetProvider> {/* <-- ENVOLVEMOS AQUÍ */}
      <BrowserRouter>
        <AuthProvider> 
          <CartProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/productos/:categoriaId" element={<Productos />} />
                <Route path="/producto/:id" element={<ProductoDetalle />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/login" element={<Login />} />

                <Route 
                  path="/admin/cupones" 
                  element={
                    <RutaPrivada>
                      <GestionCupones />
                    </RutaPrivada>
                  } 
                />
                <Route 
                  path="/admin/productos" 
                  element={
                    <RutaPrivada>
                      <AdminProductos />
                    </RutaPrivada>
                  } 
                />
              </Routes>
            </Layout>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}