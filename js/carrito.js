/*
  carrito.js
  -------------------------------------------------------
  Lógica exclusiva de carrito.html:
    1) Dibujar los productos que están en el carrito
    2) Sumar / restar cantidad de cada producto
    3) Eliminar un producto
    4) Vaciar el carrito completo
    5) "Finalizar compra" (simulado)

  Todas estas acciones, después de modificar el arreglo del
  carrito, llaman a guardarCarrito() (definida en storage.js)
  para que el cambio quede persistido, y a mostrarCarrito()
  para volver a dibujar la pantalla actualizada.
*/

// Dibuja el contenido actual del carrito en #carrito-container
function mostrarCarrito() {
  const carrito = cargarCarrito();
  const contenedor = document.getElementById("carrito-container");
  const totalCarrito = document.getElementById("total-carrito");
  const vacio = document.getElementById("carrito-vacio");
  const resumen = document.querySelector(".carrito-resumen");

  contenedor.innerHTML = "";

  // Carrito vacío: mostramos el mensaje y ocultamos el resumen
  if (carrito.length === 0) {
    vacio.style.display = "block";
    resumen.style.display = "none";
    return;
  }

  vacio.style.display = "none";
  resumen.style.display = "flex";

  let total = 0;

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    // 1) Crear el elemento
    const div = document.createElement("div");
    div.classList.add("item-carrito");

    // 2) Configurarlo
    div.innerHTML = `
      <div class="item-info">
        <span class="item-nombre">${item.nombre}</span>
        <span class="item-precio-unitario">$${item.precio.toLocaleString("es-UY")} c/u</span>
      </div>

      <div class="item-cantidad">
        <button class="btn-cantidad btn-restar">−</button>
        <span class="item-cantidad-numero">${item.cantidad}</span>
        <button class="btn-cantidad btn-sumar">+</button>
      </div>

      <span class="item-subtotal">$${subtotal.toLocaleString("es-UY")}</span>

      <button class="btn-eliminar">✕</button>
    `;

    // Cada botón queda conectado al producto de ESTE item (por id)
    div.querySelector(".btn-sumar").addEventListener("click", () => cambiarCantidad(item.id, 1));
    div.querySelector(".btn-restar").addEventListener("click", () => cambiarCantidad(item.id, -1));
    div.querySelector(".btn-eliminar").addEventListener("click", () => eliminarDelCarrito(item.id));

    // 3) Agregarlo a la página
    contenedor.appendChild(div);
  });

  totalCarrito.textContent = `Total: $${total.toLocaleString("es-UY")}`;
}

// Suma o resta 1 a la cantidad de un producto (delta = 1 o -1)
function cambiarCantidad(id, delta) {
  let carrito = cargarCarrito();
  const item = carrito.find(p => p.id === id);

  if (!item) return;

  item.cantidad += delta;

  // Si la cantidad llega a 0, directamente sacamos el producto del carrito
  if (item.cantidad <= 0) {
    carrito = carrito.filter(p => p.id !== id);
  }

  guardarCarrito(carrito);
  actualizarContadorCarrito();
  mostrarCarrito();
}

// Elimina un producto del carrito, sin importar su cantidad
function eliminarDelCarrito(id) {
  const carrito = cargarCarrito().filter(p => p.id !== id);
  guardarCarrito(carrito);
  actualizarContadorCarrito();
  mostrarCarrito();
}

// Vacía el carrito completo
function vaciarCarrito() {
  guardarCarrito([]);
  mostrarCarrito();
  actualizarContadorCarrito();
}

// Simula una compra: en el proyecto real, acá se haría un fetch()
// al servidor para registrar el pedido. Por ahora solo confirmamos
// y vaciamos el carrito.
function finalizarCompra() {
  const carrito = cargarCarrito();

  if (carrito.length === 0) return;

  alert("¡Gracias por tu compra! (simulado)");
  vaciarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
  mostrarCarrito();

  document.getElementById("btn-vaciar").addEventListener("click", vaciarCarrito);
  document.getElementById("btn-finalizar").addEventListener("click", finalizarCompra);
});