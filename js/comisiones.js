import { mostrarSubtotal } from "./interfaceUsuario.js";
import { mostrarToastError } from "./notificaciones.js";
import {
  loadComisiones,
  saveComisiones,
  getComisionId,
  setComisionId,
  setCantidad,
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

async function obtenerListaComisiones() {
  const response = await fetch("./assets/data/productos.json");
  const data = await response.json();
  return data;
}

export async function mostrarCardsComisiones() {
  try {
    const div = document.getElementById("mostrarCards");
    const contenedor = document.createElement("div");
    contenedor.classList.add("row", "justify-content-evenly", "pb-3");
    const listaComisiones = await obtenerListaComisiones();

    listaComisiones.forEach((comision) => {
      // console.log("se ingresó a la lista de comisiones");
      contenedor.appendChild(crearTarjetaComision(comision));
      mostrarSubtotal();
    });
    div.appendChild(contenedor);
    mostrarSubtotal();
  } catch (error) {
    mostrarToastError(
      `A ocurrido un error en la creación de las tarjetas: ${error}`
    );
  }
}

function crearTarjetaComision(comision) {
  const coms = loadComisiones();
  const cantidad = coms.reduce(
    (acc, com) => {
      acc[com.type] = (acc[com.type] || 0) + 1;
      return acc;
    },
    {
      "Ilustración para perfil de redes sociales": 0,
      "Ilustración medio cuerpo": 0,
      "Ilustración de mascota": 0,
    }
  );

  const tarjeta = document.createElement("div");
  tarjeta.style.width = "18rem";
  tarjeta.classList.add("card");
  //console.log(tarjeta);

  tarjeta.innerHTML = `
    <img src="${comision.img}" class="card-img-top" alt="${comision.titulo}">
    <div class="card-body">
      <h5 class="card-title">${comision.titulo}</h5>
      <p class="card-text"><strong id="precio${comision.corto}">${
    comision.precio
  } ${comision.moneda}</strong> - ${comision.caracteristicas}</p>
      <button class="btn btn-warning" id="agrega${
        comision.corto
      }">Agregar</button>
      <p class="card-text" id="cantidad${comision.corto}">${
    cantidad[comision.titulo]
  }</p>
    </div>
  `;

  const botonAgregar = tarjeta.querySelector(`#agrega${comision.corto}`);
  botonAgregar.addEventListener("click", () => {
    const cantidadTipo = tarjeta.querySelector(`#cantidad${comision.corto}`);
    const com = {
      type: comision.titulo,
      price: comision.precio,
    };
    addComision(com);
    setCantidad(
      `cantidad${comision.corto}`,
      parseInt(cantidad[comision.titulo]) + 1
    );
    let cant = parseInt(cantidad[comision.titulo]);
    cant++;
    cantidadTipo.textContent = cant;
    mostrarSubtotal();
  });

  return tarjeta;
}
