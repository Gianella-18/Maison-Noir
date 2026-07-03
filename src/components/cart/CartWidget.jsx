import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartWidget.css';

export default function CartWidget() {
  const { totalItems } = useCart();

  return (
    <Link to="/carrito" className="cart-widget">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
      {totalItems > 0 && (
        <span className="cart-widget__count">{totalItems}</span>
      )}
    </Link>
  );
}
