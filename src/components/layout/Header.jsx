import { Link, useLocation } from 'react-router-dom'
import CartWidget from '../cart/CartWidget'
import './Header.css'

export default function Header() {
  const location = useLocation()

  return (
    <header className="header">
      <div className="header__top">
        <span className="header__tagline">Otoño — Invierno 2026</span>
        <Link to="/" className="header__logo">
          MAISON NOIR
        </Link>
        <CartWidget />
      </div>
      <nav className="header__nav">
        <Link to="/" className={`nav__link ${location.pathname === '/' ? 'active' : ''}`}>Inicio</Link>
        <Link to="/productos" className={`nav__link ${location.pathname.startsWith('/producto') ? 'active' : ''}`}>Colección</Link>
        <Link to="/carrito" className={`nav__link ${location.pathname === '/carrito' ? 'active' : ''}`}>Carrito</Link>
        <Link to="/admin/cupones" className={`nav__link nav__link--admin ${location.pathname.startsWith('/admin') ? 'active' : ''}`}>Admin</Link>
      </nav>
    </header>
  )
}
