const CLAVE_CARRITO = "carrito";

// Recupera el carrito guardado en LocalStorage.
// Si todavía no hay nada guardado, devuelve un arreglo vacío.
function cargarCarrito() {
  const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);

  if (carritoGuardado) {
    return JSON.parse(carritoGuardado);
  } else {
    return [];
  }
}

// Recibe el arreglo del carrito y lo guarda en LocalStorage
// convertido a texto con JSON.stringify().
function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

// Suma las cantidades de todos los productos del carrito.
// Se usa para mostrar el numerito en el ícono del carrito.
function contarItemsCarrito(carrito) {
  return carrito.reduce((total, item) => total + item.cantidad, 0);
}

// Actualiza el contador del carrito en el header.
// Se llama en las DOS páginas (index.html y carrito.html),
// por eso vive en storage.js y no en catalogo.js o carrito.js.
function actualizarContadorCarrito() {
  const carrito = cargarCarrito();
  const contador = document.getElementById("contador-carrito");

  if (contador) {
    contador.textContent = contarItemsCarrito(carrito);
  }
}