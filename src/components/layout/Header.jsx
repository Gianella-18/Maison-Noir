import { useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import CartWidget from '../cart/CartWidget';
import './Header.css';

export default function Header() {
  const { usuario, esAdmin, loading, logoutUsuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUsuario();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header__top">
        <span className="header__tagline">Otoño — Invierno 2026</span>
        <Link to="/" className="header__logo">Maison Noir</Link>
        <CartWidget />
      </div>

      <nav className="header__nav">
        <NavLink to="/" end className="nav__link">Inicio</NavLink>
        <NavLink to="/productos" className="nav__link">Colección</NavLink>
        <NavLink to="/carrito" className="nav__link">Carrito</NavLink>

        {/* Mientras Firebase verifica la sesión, no mostramos nada de esto para evitar un parpadeo */}
        {!loading && (
          <>
            {!usuario && (
              <NavLink to="/login" className="nav__link">Iniciar Sesión</NavLink>
            )}

            {usuario && esAdmin && (
              <>
                <NavLink to="/admin/productos" className="nav__link">Productos</NavLink>
                <NavLink to="/admin/cupones" className="nav__link">Cupones</NavLink>
              </>
            )}

            {usuario && !esAdmin && (
              <span className="nav__link nav__link--usuario">
                {usuario.displayName || usuario.email}
              </span>
            )}

            {usuario && (
              <button className="nav__link nav__link--logout" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            )}
          </>
        )}
      </nav>
    </header>
  );
}