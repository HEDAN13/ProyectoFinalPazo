import { loadMonedaSeleccionada, loadValores } from "./storage.js";

/**
 * Genera un elemento <select> con las opciones de monedas disponibles.
 * @param {String} nombreProducto
 * @returns {Promise<Swal.Fire>}
 */
export function confirmarAgregarProducto(nombreProducto) {
  return Swal.fire({
    title: "¿Agregar al carrito?",
    text: `"¿Deseas agregar "${nombreProducto}" al carrito?`,
    icon: "question",
    showDenyButton: true,
    denyButtonText: "Cancelar",
    confirmButtonColor: "#3498db",
    denyButtonColor: "#95a5a6",
  });
}

/**
 * Muestra una notificación de éxito con un mensaje personalizado.
 * @param {String} mensaje
 */
export function mostrarToastExito(mensaje) {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: mensaje,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
}

/**
 * Muestra una notificación de error con un mensaje personalizado.
 * @param {String} mensaje
 */
export function mostrarToastError(mensaje) {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "error",
    title: mensaje,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
}

/**
 * Muestra el contenido del carrito en una ventana modal.
 * @param {Object[]} carrito
 */
export function mostrarCarrito(carrito) {
  const moneda = loadMonedaSeleccionada();
  const conversion = moneda
    ? Number(
        (loadValores().find((v) => v.Code === moneda) || { Conversion: 1 })
          .Conversion
      ) || 1
    : 1;
  const total = carrito.reduce(
    (acc, prod) => acc + parseFloat(prod.price) * conversion * prod.cantidad,
    0
  );

  const tabla = `
    <table style="width:100%; text-align:left; border-collapse:collapse;">
      <thead>
        <tr>
          <th style="border-bottom:1px solid #ccc; padding:4px;">Producto</th>
          <th style="border-bottom:1px solid #ccc; padding:4px;">Cantidad</th>
          <th style="border-bottom:1px solid #ccc; padding:4px;">Precio unitario</th>
          <th style="border-bottom:1px solid #ccc; padding:4px;">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${carrito
          .map(
            (prod) => `
          <tr>
            <td style="padding:6px;">${prod.type}</td>
            <td style="padding:6px; text-align:center;">${prod.cantidad}</td>
            <td style="padding:6px;">$${(prod.price * conversion).toFixed(
              2
            )}</td>
            <td style="padding:6px;">$${(
              parseFloat(prod.price) *
              conversion *
              prod.cantidad
            ).toFixed(2)}</td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>
    <hr>
    <h4 style="text-align:right;">Total: $${total.toFixed(2)}</h4>
  `;

  Swal.fire({
    title: "🛒 Detalle del carrito",
    html: tabla,
    position: "top-right",
    confirmButtonText: "Finalizar compra",
    showCancelButton: true,
    cancelButtonText: "Seguir comprando",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#aaa",
    width: "700px",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        "¡Gracias por tu compra!",
        "Tu pedido fue procesado con éxito.",
        "success"
      );
    }
  });
}
