
<h1 align="center">🔴 Gym Management System 🔴</h1>
<p align="center">
Sistema completo para la administración integral de gimnasios, desarrollado para <strong>Spartan Gym</strong>: gestión de socios, rutinas, membresías, stock, ventas, publicaciones internas y panel exclusivo para socios donde pueden consultar sus datos y registrar entrenamientos.
</p>

<p align="center">
📌 <strong>Estado del proyecto:</strong> Implementado y en uso real por Spartan Gym
</p>

## 📋 Índice

* [Descripción](#descripcion)
* [Capturas](#capturas)
* [Funcionalidades](#funcionalidades)
* [Instalación](#instalacion)
* [Tecnologías](#tecnologias)
* [Demo](#demo)
* [Contacto](#contacto)

<h2 id="descripcion">📖 Descripción</h2>

Es un sistema completo de administración de gimnasios, desarrollado específicamente para **Spartan Gym**.

Incluye herramientas clave para la gestión diaria:

- Administración de usuarios
- Rutinas y ejercicios
- Publicaciones y anuncios internos
- Membresías y pagos
- Registro de ventas de productos y control de stock

Además, cuenta con un **panel exclusivo para los clientes**, donde pueden:

- Revisar sus datos personales
- Consultar su membresía
- Ver su rutina asignada
- Realizar un entrenamiento registrando pesos, repeticiones y ejercicios completados.
- Llevar su progreso directamente desde la app

Todo integrado en una plataforma real usada día a día en Spartan Gym.

<h2 id="capturas">📸 Capturas</h2>


<div align="center">
  <img src="https://res.cloudinary.com/db2upqpdq/image/upload/v1765416749/capturas_desktop-admin_kbo16d.png" width="96%"/>
  <br/><br/>

  <div style="display: flex; justify-content: center; align-items: center;">
    <img src="https://res.cloudinary.com/db2upqpdq/image/upload/v1765416749/capturas_mobile_user_iwjtib.png" height="350px" />
    <img src="https://res.cloudinary.com/db2upqpdq/image/upload/v1765416749/captura_dekstop_user_rtobr7.png" height="350px" />
  </div>
</div>


<h2 id="funcionalidades">⚙️ Funcionalidades</h2>

### 🛠 Funcionalidades para Administradores
- **Gestión de usuarios**  
  Crear, editar, eliminar y visualizar socios. Asignación de rutinas y membresías.
  
- **Rutinas y ejercicios**  
  Crear rutinas personalizadas, administrarlas y asignarlas a usuarios. Manejo de ejercicios con series, repeticiones y peso recomendado.

- **Membresías**  
  Activación, renovación, historial de pagos y alertas de vencimiento.

- **Control de stock**  
  Gestión de productos, actualización de inventario y registro de movimientos.

- **Registro de ventas**  
  Ventas internas con historial por producto.

- **Publicaciones y anuncios**  
  Avisos internos para mantener informados a los socios.

---

### 💪 Funcionalidades para Usuarios / Socios
- **Perfil personal**  
  Consulta de datos, membresía activa y estado de cuenta.

- **Rutina asignada**  
  Acceso a la rutina del día con detalle de ejercicios.

- **Registrar entrenamiento en tiempo real**  
  Registro de peso, repeticiones y ejercicios completados para seguimiento del progreso.

- **Historial de entrenamiento**  
  Evolución y rutinas pasadas.

- **Notificaciones y anuncios**  
  Visualización de comunicados publicados por administradores.

---

### 📱 Otras funcionalidades generales
- **Autenticación con JWT y persistencia de sesión**  
- **Interfaz responsive y moderna**  
- **Sistema de roles (Administrador / Cliente)**  
- **Validaciones en frontend y backend**  
- **API REST completa desarrollada en Node.js**

<h2 id="instalacion">⚙️ Instalación</h2>

🔹 Backend

```bash
# 1️⃣ Clona el repositorio
git clone https://github.com/francocasafus22/gym-management-system.git

# 2️⃣ Accede al directorio del Backend
cd backend

# 3️⃣ Instala dependencias
npm install

# 4️⃣ Configura variables de entorno
# Crea un archivo .env con:
# PORT = 3000
# MONGO_URI = cadena_de_conexion_mongo
# JWT_SECRET = tullavesecreta
# FRONTEND = http://localhost:5173
# NODE_ENV = dev

# 5️⃣ Ejecuta en modo desarrollo
npm run dev
```

🔹 Frontend

```bash
# 1️⃣ Accede al directorio del Frontend
cd frontend

# 2️⃣ Instala dependencias
npm install

# 3️⃣ Configura variables de entorno
# Crea un archivo .env con:
VITE_API_URL = http://localhost:3000/api

# 4️⃣ Ejecuta en modo desarrollo
npm run dev
```

<h2 id="tecnologias">🛠 Tecnologías</h2>

### 🔹 Backend

* ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white) **Node.js**
* ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge\&logo=express\&logoColor=white) **Express.js**
* ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white) **MongoDB Atlas**
* ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge\&logo=JSONWebTokens\&logoColor=white) **JSON Web Tokens**
* ![Bcrypt](https://img.shields.io/badge/Bcrypt-FF5722?style=for-the-badge) **Bcrypt**

### 🔹 Frontend

* ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge\&logo=react\&logoColor=black) **React**
* ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white) **Vite**
* ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge\&logo=tailwind-css\&logoColor=white) **Tailwind CSS**
* ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge\&logo=axios\&logoColor=white) **Axios**

<h2 id="demo">🌐 Demo</h2>

🚀 Puedes probar la aplicación aquí:
👉 [Spartan Gym - Demo en línea](https://spartanapp.vercel.app)

<h2 id="contacto">📬 Contacto</h2>

<p align="center">
  <a href="https://github.com/francocasafus22">
    <img src="https://img.shields.io/badge/GitHub-francocasafus22-181717?style=for-the-badge&logo=github" alt="GitHub"/>
  </a>
  <a href="https://www.linkedin.com/in/franco-casafus-17ba47230/">
    <img src="https://img.shields.io/badge/LinkedIn-FrancoCasafus-0077B5?style=for-the-badge&logo=linkedin" alt="LinkedIn"/>
  </a>
  <a href="mailto:francocasafus55@gmail.com">
    <img src="https://img.shields.io/badge/Email-francocasafus55@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"/>
  </a>
</p>
