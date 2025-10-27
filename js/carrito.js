export function agruparCarrito(carrito) {
  const agrupado = {};

  carrito.forEach((item) => {
    if (!agrupado[item.type]) {
      agrupado[item.type] = { ...item, cantidad: 1 };
    } else {
      agrupado[item.type].cantidad++;
    }
  });

  return Object.values(agrupado);
}
