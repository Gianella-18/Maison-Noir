import { createContext, useContext, useState } from "react";

// 1. Creamos el contexto
export const CartContext = createContext();

// 2. Creamos el Provider que envolverá nuestra aplicación
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Agrega un producto al carrito (si ya existe, suma la cantidad)
  const addToCart = (producto, cantidad = 1) => {
    setCartItems((prev) => {
      const itemIndex = prev.findIndex((item) => item.id === producto.id);

      if (itemIndex !== -1) {
        const nuevoCarrito = [...prev];
        nuevoCarrito[itemIndex] = {
          ...nuevoCarrito[itemIndex],
          cantidad: nuevoCarrito[itemIndex].cantidad + cantidad,
        };
        return nuevoCarrito;
      }

      return [...prev, { ...producto, cantidad }];
    });
  };

  // Elimina un producto del carrito por ID
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Actualiza la cantidad de un producto (mínimo 1, nunca menos)
  const updateCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return; // evita bajar de 1 con el botón "−"
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  // Vacía el carrito por completo
  const clearCart = () => {
    setCartItems([]);
  };

  // Totales calculados (se recalculan solos en cada render)
  const totalItems = cartItems.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = cartItems.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCantidad,
        clearCart,
        totalItems,
        totalPrecio,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);