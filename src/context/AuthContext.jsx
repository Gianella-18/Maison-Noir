import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config"; // Asegúrate de apuntar correctamente a tu config de firebase
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Función para registrar nuevos usuarios
  const registrarUsuario = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 2. Función para iniciar sesión
  const loginUsuario = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 3. Función para cerrar sesión
  const logoutUsuario = () => {
    return signOut(auth);
  };

  // 4. Observador de Firebase para saber si el usuario cambia de estado (logueado/deslogueado)
  useEffect(() => {
    const desuscribir = onAuthStateChanged(auth, (userCurrentUser) => {
      setUsuario(userCurrentUser);
      setLoading(false); // Una vez que Firebase responde, dejamos de cargar
    });

    return () => desuscribir();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, loading, registrarUsuario, loginUsuario, logoutUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};