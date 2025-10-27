export function confirmarAgregarProducto(nombreProducto) {
  return Swal.fire({
    title: "¿Agregar al carrito?",
    text: `"¿Deseas agregar "${nombreProducto}" al carrito?`,
    icon: "question",
    showdenyButton: true,
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
