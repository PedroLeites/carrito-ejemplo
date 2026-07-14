const productos = [
  { id: 1, nombre: "Mouse inalámbrico",     precio: 1200, stock: 15, categoria: "Accesorios",  imagen: "🖱️" },
  { id: 2, nombre: "Teclado mecánico",      precio: 3500, stock: 8,  categoria: "Accesorios",  imagen: "⌨️" },
  { id: 3, nombre: "Monitor 24\" Full HD",  precio: 21000, stock: 4, categoria: "Monitores",   imagen: "🖥️" },
  { id: 4, nombre: "Auriculares Bluetooth", precio: 4200, stock: 12, categoria: "Audio",       imagen: "🎧" },
  { id: 5, nombre: "Webcam HD",             precio: 2800, stock: 0,  categoria: "Accesorios",  imagen: "📷" },
  { id: 6, nombre: "Notebook Lenovo",       precio: 145000, stock: 3, categoria: "Notebooks",  imagen: "💻" }
];

// Dibuja todos los productos del catálogo dentro de #catalogo-container
function mostrarProductos() {
  const contenedor = document.getElementById("catalogo-container");
  contenedor.innerHTML = ""; // Limpiamos antes de volver a dibujar

  productos.forEach(producto => {
    // 1) Crear el elemento
    const card = document.createElement("div");
    card.classList.add("producto-card");

    // 2) Configurarlo (contenido, clases)
    const sinStock = producto.stock === 0;

    card.innerHTML = `
      <div class="producto-imagen">${producto.imagen}</div>
      <span class="producto-categoria">${producto.categoria}</span>
      <h3 class="producto-nombre">${producto.nombre}</h3>
      <p class="producto-precio">$${producto.precio.toLocaleString("es-UY")}</p>
      <p class="producto-stock ${sinStock ? "producto-stock-agotado" : ""}">
        ${sinStock ? "Sin stock" : "Stock: " + producto.stock}
      </p>
      <button class="btn btn-primario btn-agregar" ${sinStock ? "disabled" : ""}>
        Agregar al carrito
      </button>
    `;

    // El botón de esta card llama a agregarAlCarrito() con ESTE producto
    const boton = card.querySelector(".btn-agregar");
    if (!sinStock) {
      boton.addEventListener("click", () => agregarAlCarrito(producto));
    }

    // 3) Agregarlo a la página
    contenedor.appendChild(card);
  });
}

// Agrega un producto al carrito (o le suma 1 a la cantidad si ya estaba)
function agregarAlCarrito(producto) {
  const carrito = cargarCarrito();

  // Buscamos si el producto ya está en el carrito por su id
  const existente = carrito.find(item => item.id === producto.id);

  if (existente) {
    existente.cantidad++;
  } else {
    // Guardamos solo los datos que el carrito necesita
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
  mostrarMensaje(`${producto.nombre} agregado al carrito`);
}

// Muestra un mensaje flotante breve (feedback visual para el usuario)
function mostrarMensaje(texto) {
  const mensaje = document.getElementById("mensaje-flotante");
  mensaje.textContent = texto;
  mensaje.classList.add("mensaje-flotante-visible");

  // Lo ocultamos automáticamente después de 1.5 segundos
  setTimeout(() => {
    mensaje.classList.remove("mensaje-flotante-visible");
  }, 1500);
}

// Todo arranca cuando el HTML terminó de cargar
document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();
});