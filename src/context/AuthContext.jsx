import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Único admin habilitado. No hay registro de usuarios en esta app.
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginUsuario = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logoutUsuario = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const desuscribir = onAuthStateChanged(auth, (userCurrentUser) => {
      setUsuario(userCurrentUser);
      setLoading(false);
    });

    return () => desuscribir();
  }, []);

  const esAdmin =
    !!usuario &&
    !!ADMIN_EMAIL &&
    usuario.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  return (
    <AuthContext.Provider
      value={{ usuario, loading, esAdmin, loginUsuario, logoutUsuario }}
    >
      {children}
    </AuthContext.Provider>
  );
};