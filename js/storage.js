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

/**
 * Guarda el id de la comisión y la cantidad solicitada
 * @param {String} id
 * @param {String} cant
 */
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
 * Guarda los valores de las monedas en el localStorage
 * @param {Object[]} valores
 */
export function saveValores(valores) {
  localStorage.setItem("valoresMonedas", JSON.stringify(valores));
}

/**
 * Carga los valores de las monedas desde el localStorage
 * @returns {Object[]}
 */
export function loadValores() {
  return JSON.parse(localStorage.getItem("valoresMonedas")) || [];
}

/**
 * Guarda la moneda seleccionada en el localStorage
 * @param {String} moneda
 */
export function saveMonedaSeleccionada(moneda) {
  localStorage.setItem("monedaSeleccionada", moneda);
}

/**
 * Carga la moneda seleccionada desde el localStorage
 * @returns {String}
 */
export function loadMonedaSeleccionada() {
  return localStorage.getItem("monedaSeleccionada");
}

/**
 * Limpia el localStorage
 */
export function clearStorage() {
  localStorage.clear();
}
