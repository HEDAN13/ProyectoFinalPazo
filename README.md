# ProyectoFinalPazo

Este es el trabajo final para el curso de JS de CoderHouse, comision 80895.
Consiste de una pequeña SPA creada para la venta de comisiones.
Interacciones principales:

- Registro simple de usuario (localStorage).
- Selección y agregado de comisiones (persistidas en localStorage).
- Conversión de precios según moneda (fetch a API externa + archivo local).
- Subtotal y vista de carrito básicos.

## Requisitos

- Node.js / npm (opcional, para servidores locales tipo http-server)
- Opción alternativa: Live Server (extensión VS Code)

## Estructura principal

```
├───📂assets
│     ├───📂data
|     |     |--{}productos.json -> datos de las comisiones.
|     |     └--{}currencies.json -> mapeo de códigos → nombres
│     └───📂img/ ...-> imágenes.
├───📂js
|      |-- 📄app.js — entrypoint (inicia la UI).
|      |-- 📄interfaceUsuario.js — lógica de interacción con el usuario y render.
|      |-- 📄comisiones.js — creación de cards y manejo de comisiones.
|      |-- 📄valores.js — obtención y formato de monedas (API + local).
|      |-- 📄storage.js — funciones para leer/escribir en localStorage.
|      |-- 📄notificaciones.js — helper de toasts/SweetAlert.
|      └-- 📄carrito.js — lógica del carrito (si aplica).
└───📂styles
      └--- 📄style.css — estilos.
📄index.html -> plantilla principal.
📄README.md -> Documentación (este archivo)
```

## Cómo ejecutar

1. Clonar el repositorio

   ```
   https://github.com/HEDAN13/ProyectoFinalPazo.git
   ```

2. Servir el proyecto (recomendado — evita problemas con fetch desde file://):

   - Con Live Server (VS Code): Click derecho en `index.html` → "Open with Live Server".

   - Con http-server (npm):
     ```
     npm http-server . -p 5500
     ```
     Abrir: http://localhost:5500

## Uso rápido

- Al abrir en el navegador, presionar "Ingresar" para registrarse (se guarda el nombre en localStorage).
- Seleccionar moneda en el selector (se guarda en localStorage).
- Hacer click en "Agregar" en una card para añadir comisiones; las cantidades y subtotal se actualizan.
- El subtotal se muestra debajo de las cards y se recalcula según la moneda seleccionada.
- En mostrar carrito se abre el carrito como una notificación.

## Sugerencias de mejora

- Búsqueda y filtrado de productos.
- Soporte de cantidades y cálculo de totales.
- Validaciones y pruebas unitarias para la lógica del carrito.

## Licencia

- Código de ejemplo / educativo. Usar libremente en proyectos de aprendizaje.
