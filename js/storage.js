/**
 * Carga las comisiones desde el localStorage
 * @returns {Array.<object> || []}
 */
export function loadComisiones() {
  return JSON.parse(localStorage.getItem("comisiones")) || [];
}
/**
 * Guarda las comisiones en el localStorage
 * @param {Array.<object>} coms
 */
export function saveComisiones(coms) {
  localStorage.setItem("comisiones", JSON.stringify(coms));
}
/**
 * Devuelve el id de la comisión almacenada en el localStorage
 * @returns {Number}
 */
export function getComisionId() {
  return parseInt(localStorage.getItem("proximoId")) || 1;
}
/**
 * Guarda el id de la comisión en el localStorage
 * @param {number} id
 */
export function setComisionId(id) {
  localStorage.setItem("proximoId", JSON.stringify(id));
}

export function setCantidad(id, cant) {
  localStorage.setItem(id, cant);
}
/**
 * Obtiene el nombre de usuario almacenado en el localStorage
 * @returns {String}
 */
export function getNombreUsuario() {
  return localStorage.getItem("nombreUsuario");
}
/**
 * Guarda el nombre de usuario en el localStorage
 * @param {String} name
 */
export function setNombreUsuario(name) {
  localStorage.setItem("nombreUsuario", name);
}
/**
 * Limpia el localStorage
 */
export function clearStorage() {
  localStorage.clear();
}
