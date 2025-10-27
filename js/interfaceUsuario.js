import { loadComisiones, setCantidad } from "./storage.js";
import {
  addComision,
  calcularPrecioComisiones,
  mostrarCardsComisiones,
} from "./comisiones.js";
import { getNombreUsuario, setNombreUsuario, clearStorage } from "./storage.js";
import { mostrarCarrito } from "./notificaciones.js";
import { agruparCarrito } from "./carrito.js";
import { formatoMoneda } from "./valores.js";

/**
 * Recibe una cadena y modifica el saludo inicial con el nombre de usuario.
 * En caso de recibir un valor nulo o indefinido, coloca el saludo por defecto.
 * @param {String || null} nombre
 */
export function cambiarSaludo(nombre) {
  const saludo = document.getElementById("saludo");
  saludo.innerText = nombre
    ? `${nombre} te damos la bienvenida!`
    : "Visitante le damos la bienvenida!";
}

/**
 * Recibe una cadena y modifica el primer párrafo indicando que se puede acceder a la selección de comisiones.
 * En caso de recibir un valor nulo o indefinido, coloca el mensaje por defecto.
 * @param {String || null} nombre
 */
export function cambiarPrimerParrafo(nombre) {
  const parrafo = document.getElementById("primerParrafo");
  parrafo.innerText = nombre
    ? "Por favor seleccione el tipo de comisión que desea encargar:"
    : "Por favor ingresa tu nombre para poder acceder a las opciones de comisiones.";
}

/**
 *  Función principal:
 *  Primero reviso que haya un nombre guardado en el local storage, para que en caso de recargar la página, se vuelvan a cargar los datos.
 *  Al botón de identificarse, le agrego funcionalidad de activar el formulario de ingreso o salir en caso de que haya un usuario "registrado"
 */
export function origen() {
  const ingreso = document.getElementById("identificarse");
  const nombreGuardado = getNombreUsuario();

  if (nombreGuardado) {
    ingreso.textContent = "Salir";
    cambiarSaludo(nombreGuardado);
    cambiarPrimerParrafo(nombreGuardado);
    mostrarOpciones(nombreGuardado);
    mostrarSubtotal();
  } else {
    ingreso.textContent = "Ingresar";
    clearStorage();
    cambiarSaludo(null);
    cambiarPrimerParrafo(null);
    mostrarOpciones(null);
  }

  ingreso.addEventListener("click", () => {
    if (ingreso.textContent === "Ingresar") {
      const ingresoDiv = document.getElementById("ingresoForm");
      ingresoDiv.innerHTML = `
        <form id="userForm" class="d-flex flex-column align-items-center">
          <label for="userName" class="form-label mb-2 p-2">Nombre:</label>
          <input type="text" placeholder="Por favor ingresa tu nombre" name="name" id="userName" class="form-control-sm w-50 mb-2 p-2" />
          <input type="submit" class="btn btn-success w-auto mb-2 p-2" value="Registrarse" />
        </form>
      `;
      const form = document.getElementById("userForm");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("userName").value;
        setNombreUsuario(name);
        form.reset();
        ingresoDiv.innerHTML = "";
        ingreso.textContent = "Salir";
        cambiarSaludo(name);
        cambiarPrimerParrafo(name);
        mostrarOpciones(name);
        window.scrollTo(0, 0);
      });
    } else {
      clearStorage();
      ingreso.textContent = "Ingresar";
      cambiarSaludo(null);
      cambiarPrimerParrafo(null);
      mostrarOpciones(null);
      window.location.reload(true);
    }
  });
}

/**
 * Se encarga de cargar las cards con las opciones de comisiones.
 * @param {String || null} nombre
 * @returns
 */
export async function mostrarOpciones(nombre) {
  const mostrarDiv = document.getElementById("mostrarCards");
  const selectorMoneda = document.getElementById("selector-moneda");
  if (!nombre) {
    mostrarDiv.innerHTML = "";
    selectorMoneda.innerHTML = "";
    return;
  }

  selectorMoneda.appendChild(await formatoMoneda());
  mostrarCardsComisiones();
}

/**
 * Calcula el subtotal y lo muestra debajo de las cards
 */
export function mostrarSubtotal() {
  const subtotal = calcularPrecioComisiones();
  const container = document.getElementById("subtotalContainer");

  container.innerHTML = `
    <div class="row justify-content-center">
      <div class="col-12 text-center">
        <h3>Subtotal → $${subtotal}</h3>
        <button class="btn btn-info mb-3">Ver carrito</button>
      </div>
    </div>
  `;

  const botonCarrito = container.querySelector(".btn-info");
  botonCarrito.addEventListener("click", () => {
    const carrito = agruparCarrito(loadComisiones());
    mostrarCarrito(carrito);
  });
}
