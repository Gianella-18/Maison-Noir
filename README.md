# Maison Noir - E-Commerce

Maison Noir es una plataforma de comercio electrónico de indumentaria urbana y minimalista. Desarrollada como una Single Page Application (SPA), ofrece una experiencia de usuario rápida, fluida y completamente responsiva.

El proyecto incluye un catálogo público con filtros en tiempo real, carrito de compras y un panel de administración privado protegido por autenticación para la gestión del inventario.

## 🚀 Tecnologías Utilizadas

El proyecto está construido con un stack moderno de desarrollo frontend y Backend-as-a-Service (BaaS):

*   **Core:** React.js (inicializado con Vite)
*   **Enrutamiento:** React Router DOM
*   **Base de Datos y Autenticación:** Firebase (Firestore & Firebase Auth)
*   **Estilos y UI:** React-Bootstrap y Styled-Components
*   **Íconos:** React Icons
*   **SEO:** React Helmet Async
*   **Gestión de Estado Global:** Context API (CartContext & AuthContext)

## ✨ Funcionalidades Principales

1.  **Catálogo Dinámico:** Visualización de productos con barra de búsqueda en tiempo real, filtrado por categorías y paginación para optimizar el rendimiento.
2.  **Gestión del Carrito:** Los usuarios pueden agregar, eliminar y modificar cantidades de productos antes de finalizar su compra.
3.  **Autenticación de Usuarios:** Sistema de Login conectado a Firebase para restringir el acceso a zonas administrativas.
4.  **Panel de Control (CRUD):** Ruta protegida (`/admin/productos`) exclusiva para administradores que permite Crear, Leer, Actualizar y Eliminar productos del catálogo. Los cambios se reflejan en tiempo real gracias a Firestore.

## 🛠️ Requisitos Previos

Para ejecutar este proyecto en tu entorno local, asegúrate de tener instalado:
*   [Node.js](https://nodejs.org/) (Versión 16.x o superior)
*   NPM (viene incluido con Node) o Yarn.

## ⚙️ Instalación y Puesta en Marcha

Sigue estos pasos para clonar y levantar el entorno de desarrollo:

**1. Clonar el repositorio:**
\`\`\`bash
git clone https://github.com/Gianella-Lup0/Maison-Noir.git
cd Maison-Noir
\`\`\`

**2. Instalar las dependencias:**
\`\`\`bash
npm install
\`\`\`

**3. Configurar Variables de Entorno:**
Crea un archivo llamado `.env` en la raíz del proyecto (al mismo nivel que `vite.config.js`) y agrega tus credenciales de Firebase. La estructura debe ser exactamente esta:

\`\`\`env
VITE_FIREBASE_API_KEY="tu_api_key"
VITE_FIREBASE_AUTH_DOMAIN="tu_auth_domain"
VITE_FIREBASE_PROJECT_ID="tu_project_id"
VITE_FIREBASE_STORAGE_BUCKET="tu_storage_bucket"
VITE_FIREBASE_MESSAGING_SENDER_ID="tu_sender_id"
VITE_FIREBASE_APP_ID="tu_app_id"
\`\`\`

**4. Iniciar el servidor de desarrollo:**
\`\`\`bash
npm run dev
\`\`\`
El proyecto se abrirá habitualmente en `http://localhost:5173`.

## 📦 Construcción para Producción (Build)

Para generar los archivos estáticos optimizados listos para ser desplegados en un servidor (como Netlify, Vercel o Firebase Hosting), ejecuta:
\`\`\`bash
npm run build
\`\`\`
Esto creará una carpeta `/dist` con los archivos minificados y listos para producción.

---
*Desarrollado para la gestión y venta de indumentaria premium.*