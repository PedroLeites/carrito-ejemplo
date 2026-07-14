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