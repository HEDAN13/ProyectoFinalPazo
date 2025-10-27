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

export function confirmarEliminarProducto(nombreProducto) {
  return Swal.fire({
    title: "¿Eliminar del carrito?",
    text: `"¿Deseas eliminar "${nombreProducto}" del carrito?`,
    icon: "warning",
    showDenyButton: true,
    confirmButtonText: "Si, eliminar",
    denyButtonText: "Cancelar",
    confirmButtonColor: "#e74c3c",
    denyButtonColor: "#95a5a6",
  });
}

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

export function mostrarCarrito(carrito) {
  const total = carrito.reduce(
    (acc, prod) => acc + parseFloat(prod.price) * prod.cantidad,
    0
  );

  const tabla = `
    <table style="width:100%; text-align:left; border-collapse:collapse;">
      <thead>
        <tr>
          <th style="border-bottom:1px solid #ccc; padding:6px;">Producto</th>
          <th style="border-bottom:1px solid #ccc; padding:6px;">Cantidad</th>
          <th style="border-bottom:1px solid #ccc; padding:6px;">Precio unitario</th>
          <th style="border-bottom:1px solid #ccc; padding:6px;">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${carrito
          .map(
            (prod) => `
          <tr>
            <td style="padding:6px;">${prod.type}</td>
            <td style="padding:6px; text-align:center;">${prod.cantidad}</td>
            <td style="padding:6px;">$${prod.price}</td>
            <td style="padding:6px;">$${(
              parseFloat(prod.price) * prod.cantidad
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
