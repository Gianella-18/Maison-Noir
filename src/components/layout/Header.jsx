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

        {/* El comprador nunca ve nada de login: sus rutas son públicas.
            Estos links solo aparecen si ya hay una sesión de admin activa
            (a la que solo se llega por la URL oculta /acceso-restringido). */}
        {!loading && usuario && esAdmin && (
          <>
            <NavLink to="/gestion/productos" className="nav__link">Productos</NavLink>
            <NavLink to="/gestion/cupones" className="nav__link">Cupones</NavLink>
            <button className="nav__link nav__link--logout" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </>
        )}
      </nav>
    </header>
  );
}