import { createContext, useContext, useState } from "react";

// 1. Creamos el contexto
export const CartContext = createContext();

// 2. Creamos el Provider que envolverá nuestra aplicación
export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Función para agregar productos
  const agregarProducto = (producto, cantidad) => {
    const itemIndex = carrito.findIndex((item) => item.id === producto.id);
    
    if (itemIndex !== -1) {
      // Si ya existe, sumamos la cantidad
      const nuevoCarrito = [...carrito];
      nuevoCarrito[itemIndex].cantidad += cantidad;
      setCarrito(nuevoCarrito);
    } else {
      // Si no existe, lo agregamos como nuevo
      setCarrito([...carrito, { ...producto, cantidad }]);
    }
  };

  // Función para eliminar un producto por ID
  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    setCarrito(nuevoCarrito);
  };

  // Función para vaciar el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CartContext.Provider value={{ carrito, agregarProducto, eliminarProducto, vaciarCarrito }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);