import {
  loadComisiones,
  saveComisiones,
  getComisionId,
  setComisionId,
} from "./storage.js";

export function calcularPrecioComisiones() {
  const coms = loadComisiones();
  return coms.reduce((acc, c) => acc + parseInt(c.price || 0), 0);
}

export function addComision({ type, price }) {
  const coms = loadComisiones();
  const id = getComisionId();
  const com = { id, type, price: String(price) };
  coms.push(com);
  saveComisiones(coms);
  setComisionId(id + 1);
  return com;
}
