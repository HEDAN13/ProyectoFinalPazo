import {
  mostrarSubtotal,
  actualizarPreciosPorMoneda,
} from "./interfaceUsuario.js";
import {
  confirmarAgregarProducto,
  mostrarToastError,
  mostrarToastExito,
} from "./notificaciones.js";
import {
  loadComisiones,
  saveComisiones,
  getComisionId,
  setComisionId,
  setCantidad,
  loadMonedaSeleccionada,
} from "./storage.js";

/**
 * Toma las comisiones guardadas y devuelve el precio total de la orden
 * @returns {Number}
 */
export function calcularPrecioComisiones() {
  const coms = loadComisiones();
  return coms.reduce((acc, c) => acc + parseInt(c.price || 0), 0);
}

/**
 * Recibe el tipo y precio de la comisión, el agrega el id correspondiente, actualiza el listado de comisiones del localStorage y devuelve la comisión con su id correspondiente.
 * @param {Object} param0
 * @returns {Object}
 */
export function addComision({ type, price }) {
  const coms = loadComisiones();
  const id = getComisionId();
  const com = { id, type, price: String(price) };
  coms.push(com);
  saveComisiones(coms);
  setComisionId(id + 1);
  return com;
}

/**
 * Obtiene la lista de comisiones desde el archivo JSON
 * @returns {Promise<Array>}
 */
async function obtenerListaComisiones() {
  const response = await fetch("./assets/data/productos.json");
  const data = await response.json();
  return data;
}

/**
 * Se encarga de crear y mostrar las cards con las opciones de comisiones.
 */
export async function mostrarCardsComisiones() {
  try {
    const div = document.getElementById("mostrarCards");
    const contenedor = document.createElement("div");
    contenedor.classList.add("row", "justify-content-evenly", "pb-3");
    const listaComisiones = await obtenerListaComisiones();

    listaComisiones.forEach((comision) => {
      contenedor.appendChild(crearTarjetaComision(comision));
    });
    div.appendChild(contenedor);
    actualizarPreciosPorMoneda(loadMonedaSeleccionada());
  } catch (error) {
    mostrarToastError(
      `A ocurrido un error en la creación de las tarjetas: ${error}`
    );
  }
}

/**
 * Crea una tarjeta de comisión
 * @param {Object} comision
 * @returns {HTMLElement}
 */
function crearTarjetaComision(comision) {
  const obtenerCantidadActual = (tipo) => {
    const coms = loadComisiones();
    return coms.filter((com) => com.type === tipo).length;
  };

  const tarjeta = document.createElement("div");
  tarjeta.style.width = "18rem";
  tarjeta.classList.add("card");

  const cantidadInicial = obtenerCantidadActual(comision.titulo);

  tarjeta.innerHTML = `
    <img src="${comision.img}" class="card-img-top" alt="${comision.titulo}">
    <div class="card-body">
      <h5 class="card-title">${comision.titulo}</h5>
      <p class="card-text"><strong id="precio${comision.corto}" data-usd="${comision.precio}">${comision.precio} ${comision.moneda}</strong> - ${comision.caracteristicas}</p>
      <button class="btn btn-warning" id="agrega${comision.corto}">Agregar</button>
      <p class="card-text" id="cantidad${comision.corto}">${cantidadInicial}</p>
    </div>
  `;

  const botonAgregar = tarjeta.querySelector(`#agrega${comision.corto}`);
  botonAgregar.addEventListener("click", async () => {
    const resultado = await confirmarAgregarProducto(comision.titulo);

    if (resultado.isDenied || resultado.isDismissed) {
      return;
    }
    mostrarToastExito(`Se ha agregado "${comision.titulo}" al carrito.`);

    const cantidadTipo = tarjeta.querySelector(`#cantidad${comision.corto}`);
    const com = {
      type: comision.titulo,
      price: comision.precio,
    };
    addComision(com);

    const nuevaCantidad = obtenerCantidadActual(comision.titulo);
    cantidadTipo.textContent = nuevaCantidad;
    setCantidad(comision.titulo, nuevaCantidad);

    mostrarSubtotal(loadMonedaSeleccionada());
  });

  return tarjeta;
}
