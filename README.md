# carrito-ejemplo

Mini proyecto de ejemplo para la asignatura **Programación Full Stack** (3er año, BT Informática, DGETP). 
Muestra cómo mantener el contenido de un carrito de compras aunque el usuario recargue la página o cierre el navegador, combinando **JSON** y **LocalStorage**.

## ¿Qué hace este proyecto?

- Muestra un catálogo de productos (`index.html`).
- Permite agregar productos a un carrito de compras.
- El carrito persiste entre recargas de página, gracias a `localStorage` + `JSON.stringify()` / `JSON.parse()`.
- Permite ver el carrito (`carrito.html`), sumar/restar cantidades, eliminar productos y vaciar el carrito.

## Estructura del proyecto

carrito-ejemplo/

├── index.html          → Página del catálogo

├── carrito.html        → Página del carrito

├── css/

│   └── estilos.css     → Estilos compartidos por ambas páginas

└── js/

├── storage.js         → Funciones de persistencia (JSON + LocalStorage)

├── catalogo.js        → Datos de productos y lógica del catálogo

└── carrito.js         → Lógica de visualización y edición del carrito

## Cómo probarlo

1. Abrir `index.html` en el navegador (doble click alcanza, no requiere servidor).
2. Agregar uno o más productos al carrito.
3. Ir a la pestaña "Carrito" y comprobar que los productos aparecen.
4. Recargar la página (F5) y verificar que el carrito **no se vacía**.
5. Verificar el LocalStorage en la pestaña **Application** de *DevTools* (F12 o Click derecho-Inspeccionar)

## Archivos JavaScript

| Archivo | Responsabilidad |
|---|---|
| `storage.js` | Único archivo que accede directamente a `localStorage`. Define `cargarCarrito()`, `guardarCarrito()` y `actualizarContadorCarrito()`. |
| `catalogo.js` | Contiene el arreglo `productos` y la lógica para dibujar el catálogo y agregar productos al carrito. |
| `carrito.js` | Dibuja el contenido del carrito y maneja sumar, restar, eliminar y vaciar. |

**Orden de carga obligatorio en el HTML:** `storage.js` siempre debe ir antes que `catalogo.js` o `carrito.js`, porque estos últimos usan funciones definidas en `storage.js`.

```html
<script src="js/storage.js"></script>
<script src="js/catalogo.js"></script>
```

## Conceptos que ilustra

- `JSON.stringify()` y `JSON.parse()` como puente entre objetos de JavaScript y texto.
- `localStorage.setItem()` / `getItem()` para persistir datos en el navegador.
- Manipulación dinámica del DOM (`createElement`, `appendChild`, `addEventListener`).
- Separación de responsabilidades entre archivos JavaScript (acceso a datos / lógica visual).

## Próximos pasos (fuera del alcance de este ejemplo)

- Reemplazar el arreglo `productos` por datos reales obtenidos con `fetch()` desde un servidor PHP.
- Persistir el carrito en una base de datos (MySQL) asociada a una sesión de usuario, en lugar de solo LocalStorage.
