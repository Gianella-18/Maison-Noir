import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config"; // Asegúrate de apuntar correctamente a tu config de firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

// El email que definas acá (vía .env) es el único que va a ver el panel de Admin.
// Cualquier otro usuario que se registre es tratado como cliente normal.
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Función para registrar nuevos usuarios (clientes)
  const registrarUsuario = async (email, password, nombre) => {
    const credenciales = await createUserWithEmailAndPassword(auth, email, password);

    if (nombre) {
      await updateProfile(credenciales.user, { displayName: nombre });
      // Forzamos actualizar el estado local para que el nombre se vea al instante
      setUsuario({ ...credenciales.user, displayName: nombre });
    }

    return credenciales;
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

  // ¿El usuario logueado es el admin?
  const esAdmin =
    !!usuario &&
    !!ADMIN_EMAIL &&
    usuario.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  return (
    <AuthContext.Provider
      value={{ usuario, loading, esAdmin, registrarUsuario, loginUsuario, logoutUsuario }}
    >
      {children}
    </AuthContext.Provider>
  );
};