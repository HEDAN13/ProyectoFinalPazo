// Declaro un array para guardar las comisiones y el id para poder ir identificándolas
let comisiones = JSON.parse(localStorage.getItem("comisiones"));
let comisionId = parseInt(localStorage.getItem("comisionId"));

if (!comisionId) {
  comisionId = 1;
}

if (!comisiones) {
  comisiones = [];
}

/**
 *  Función principal:
 *  Primero reviso que haya un nombre guardado en el local storage, para que en caso de recargar la página, se vuelvan a cargar los datos.
 *  Al botón de identificarse, le agrego funcionalidad de activar el formulario de ingreso o salir en caso de que haya un usuario "registrado"
 */
function main() {
  const ingreso = document.getElementById("identificarse");
  const nombreGuardado = localStorage.getItem("nombreUsuario");

  if (nombreGuardado) {
    ingreso.textContent = "Salir";
    cambiarSaludo(nombreGuardado);
    cambiarPrimerParrafo(nombreGuardado);
    mostrarOpciones(nombreGuardado);
    mostrarSubtotal();
  } else {
    ingreso.textContent = "Ingresar";
    localStorage.clear();
    cambiarSaludo(null);
    cambiarPrimerParrafo(null);
    mostrarOpciones(null);
  }

  ingreso.addEventListener("click", () => {
    if (ingreso.textContent === "Ingresar") {
      userForm(ingreso);
    } else {
      localStorage.clear();
      ingreso.textContent = "Ingresar";
      cambiarSaludo(null);
      cambiarPrimerParrafo(null);
      mostrarOpciones(null);
      window.location.reload(true);
    }
  });
}

/**
 * Recibo un el elemento HTML del botón para que una vez registrado el nombre, pueda actualizar el contenido del botón y mostrar "Salir".
 * Muestro el formulario que solicita el nombre y luego cambio los elementos del DOM de acuerdo con el nombre recibido, el cual además es almacenado en el LocalStorage.
 *
 * @param {HTMLElement | null} ingreso
 */
function userForm(ingreso) {
  const ingresoDiv = document.getElementById("ingresoForm");

  ingresoDiv.innerHTML = `
    <form id="userForm" class="d-flex flex-column align-items-center">
      <label for="userName" class="form-label mb-2 p-2">Nombre:</label>
      <input type="text" name="name" id="userName" class="form-control-sm w-50 mb-2 p-2" />
      <input type="submit" class="btn btn-success w-auto mb-2 p-2" value="Registrarse" />
    </form>
    `;

  const form = document.getElementById("userForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("userName");
    localStorage.setItem("nombreUsuario", name.value);
    form.reset();
    ingresoDiv.innerHTML = ``;
    ingreso.textContent = "Salir";
    const nombreGuardado = localStorage.getItem("nombreUsuario");
    cambiarSaludo(nombreGuardado);
    cambiarPrimerParrafo(nombreGuardado);
    mostrarOpciones(nombreGuardado);
    window.scrollTo(0, 0);
  });
}

/**
 * Recibo un string o un null, para cambiar el mensaje de bienvenida al sitio.
 *
 * @param {String | null} nombreGuardado
 */

function cambiarSaludo(nombreGuardado) {
  const saludo = document.getElementById("saludo");
  if (nombreGuardado) {
    saludo.innerText = `${nombreGuardado} te damos la bienvenida!`;
  } else {
    saludo.innerText = `Visitante le damos la bienvenida!`;
  }
}

/**
 * Recibo el nombre almacenado en localStorage, para cambiar el mensaje del párrafo, de acuerdo a lo recibido.
 *
 * @param {String | null} nombreGuardado
 */

function cambiarPrimerParrafo(nombreGuardado) {
  const parrafo = document.getElementById("primerParrafo");
  if (nombreGuardado) {
    parrafo.innerText = `Por favor seleccione el tipo de comisión que desea encargar:`;
  } else {
    parrafo.innerText =
      "Por favor ingresa tu nombre para poder acceder a las opciones de comisiones.";
  }
}

/**
 * Recibo un nombre o un valor null, para indicar que el valor del nombre se encuentra en el localStorage y muestro las cards con las opciones para seleccionar el tipo de comisión.
 *
 * @param {String | null} nombre
 */
function mostrarOpciones(nombre) {
  const mostrarDiv = document.getElementById("mostrarCards");
  let cantidad = {};
  if (nombre) {
    const coms = JSON.parse(localStorage.getItem("comisiones"));
    if (coms) {
      cantidad = coms.reduce(
        (acumulador, com) => {
          acumulador[com.type] = (acumulador[com.type] || 0) + 1;
          return acumulador;
        },
        {
          "Ilustración para perfil de redes sociales": 0,
          "Ilustración medio cuerpo": 0,
          "Ilustración de mascota": 0,
        }
      );
    } else {
      cantidad = {
        "Ilustración para perfil de redes sociales": 0,
        "Ilustración medio cuerpo": 0,
        "Ilustración de mascota": 0,
      };
    }

    mostrarDiv.innerHTML = `
  <div class="row justify-content-evenly pb-3">
    <div class="card" style="width: 18rem;">
      <img src="./assets/imagenPerfil.jpg" class="card-img-top" alt="Ejemplo de imagen de perfil">
      <div class="card-body">
        <h5 class="card-title">Ilustración para perfil de redes sociales</h5>
        <p class="card-text"><strong id="precioPerfil">$25 usd</strong> - Digital / Color / 300 dpi y 75 dpi</p>
        <button class="btn btn-warning" id="agregaPerfil">Agregar</button>
        <p class="card-text" id="cantidadPerfil">${cantidad["Ilustración para perfil de redes sociales"]}</p>
      </div>
    </div>
    <div class="card" style="width: 18rem;">
      <img src="./assets/medioCuerpo.jpeg" class="card-img-top" alt="Ejemplo de imagen medio cuerpo">
      <div class="card-body">
        <h5 class="card-title">Ilustración medio cuerpo</h5>
        <p class="card-text"><strong id="precioMedio">$60 usd</strong> - Digital / Color / 300 dpi</p>
        <button class="btn btn-warning" id="agregaMedio">Agregar</button>
        <p class="card-text" id="cantidadMedio">${cantidad["Ilustración medio cuerpo"]}</p>
      </div>
    </div>
    <div class="card" style="width: 18rem;">
      <img src="./assets/mascota.jpeg" class="card-img-top" alt="Ejemplo de mascota">
      <div class="card-body">
        <h5 class="card-title">Ilustración de mascota</h5>
        <p class="card-text"><strong id="precioMascota">$30 usd</strong> - Digital / Color / 300 dpi</p>
        <button class="btn btn-warning" id="agregaMascota">Agregar</button>
        <p class="card-text" id="cantidadMascota">${cantidad["Ilustración de mascota"]}</p>
      </div>
    </div>
  </div>
  `;

    const botones = mostrarDiv.querySelectorAll("button");
    botones.forEach((btn) => {
      btn.addEventListener("click", () => {
        const cardBody = btn.closest(".card-body");
        const pCantidad = cardBody.querySelector("p.card-text:last-of-type");

        const comision = {
          id: comisionId++,
          type: cardBody.querySelector(".card-title").textContent,
          price: cardBody
            .querySelector("strong")
            .textContent.replace(/\D/g, ""),
        };

        comisiones.push(comision);
        localStorage.setItem("comisiones", JSON.stringify(comisiones));
        localStorage.setItem(pCantidad.id, parseInt(pCantidad.textContent));
        localStorage.setItem("comisionId", comisionId);
        let cantidad = parseInt(pCantidad.textContent);
        cantidad++;
        pCantidad.textContent = cantidad;
        mostrarSubtotal();
      });
    });
  } else {
    mostrarDiv.innerHTML = ` `;
  }
}

function mostrarSubtotal() {
  const subtotal = calcularPrecioComisiones();
  if (subtotal > 0) {
    const container = document.getElementById("mostrarCards");
    const subtotalDiv = document.getElementById("subtotal");
    if (!subtotalDiv) {
      const subtotalDiv = document.createElement("div");
      subtotalDiv.classList.add("row");
      subtotalDiv.setAttribute("id", "subtotal");
      subtotalDiv.innerHTML = `
          <div class="col-12">
            <h3>Subtotal &rarr; $${subtotal}</h3>
            <button class="btn btn-info" disabled>Ver selección</button>
          </div>
      `;
      container.appendChild(subtotalDiv);
    } else {
      subtotalDiv.innerHTML = `
          <div class="col-12">
            <h3>Subtotal &rarr; $${subtotal}</h3>
            <button class="btn btn-info" disabled>Ver selección</button>
          </div>
      `;
    }
  }
}

/**
 * Calcula el precio de las comisiones almacenadas en el LocalStorage, para poder mostrar un subtotal de lo seleccionado hasta el momento.
 *
 * @returns number
 */

function calcularPrecioComisiones() {
  const comisionesGuardadas = JSON.parse(localStorage.getItem("comisiones"));
  if (comisionesGuardadas) {
    let total = comisionesGuardadas.reduce(
      (acumulador, comision) => acumulador + parseInt(comision.price),
      0
    );
    return total;
  }
  return 0;
}

// Llamamos al main
main();
