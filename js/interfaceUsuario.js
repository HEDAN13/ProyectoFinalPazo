import { loadComisiones, setCantidad } from "./storage.js";
import { addComision, calcularPrecioComisiones } from "./comisiones.js";
import { getNombreUsuario, setNombreUsuario, clearStorage } from "./storage.js";

export function cambiarSaludo(nombre) {
  const saludo = document.getElementById("saludo");
  saludo.innerText = nombre
    ? `${nombre} te damos la bienvenida!`
    : "Visitante le damos la bienvenida!";
}

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
          <input type="text" name="name" id="userName" class="form-control-sm w-50 mb-2 p-2" />
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

export function mostrarOpciones(nombre) {
  const mostrarDiv = document.getElementById("mostrarCards");
  if (!nombre) {
    mostrarDiv.innerHTML = "";
    return;
  }

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
        type: cardBody.querySelector(".card-title").textContent,
        price: cardBody.querySelector("strong").textContent.replace(/\D/g, ""),
      };

      const com = addComision(comision);

      setCantidad(pCantidad.id, parseInt(pCantidad.textContent) + 1);
      let cantidad = parseInt(pCantidad.textContent);
      cantidad++;
      pCantidad.textContent = cantidad;
      mostrarSubtotal();
    });
  });
}

export function mostrarSubtotal() {
  const subtotal = calcularPrecioComisiones();
  const container = document.getElementById("mostrarCards");
  let subtotalDiv = document.getElementById("subtotal");
  const html = `
    <div class="col-12">
      <h3>Subtotal → $${subtotal}</h3>
      <button class="btn btn-info" disabled>Ver selección</button>
    </div>
  `;
  if (!subtotalDiv) {
    subtotalDiv = document.createElement("div");
    subtotalDiv.classList.add("row");
    subtotalDiv.id = "subtotal";
    subtotalDiv.innerHTML = html;
    container.appendChild(subtotalDiv);
  } else {
    subtotalDiv.innerHTML = html;
  }
}
