let comisiones = [];
let comisionId = 1;

function main() {
  const ingreso = document.getElementById("identificarse");
  const nombreGuardado = localStorage.getItem("nombreUsuario");

  if (nombreGuardado) {
    ingreso.textContent = "Salir";
    cambiarSaludo(nombreGuardado);
    cambiarPrimerParrafo(nombreGuardado);
    mostrarOpciones(nombreGuardado);
  } else {
    ingreso.textContent = "Ingresar";
    cambiarSaludo(null);
    cambiarPrimerParrafo(null);
    mostrarOpciones(null);
  }

  ingreso.addEventListener("click", () => {
    if (ingreso.textContent === "Ingresar") {
      userForm(ingreso);
    } else {
      localStorage.removeItem("nombreUsuario");
      ingreso.textContent = "Ingresar";
      cambiarSaludo(null);
      cambiarPrimerParrafo(null);
      mostrarOpciones(null);
    }
  });
}

function mostrarOpciones(nombre) {
  const mostrarDiv = document.getElementById("mostrarCards");

  if (nombre) {
    mostrarDiv.innerHTML = `
  <div class="card" style="width: 18rem;">
    <img src="./assets/imagenPerfil.jpg" class="card-img-top" alt="Ejemplo de imagen de perfil">
    <div class="card-body">
      <h5 class="card-title">Imagen de perfil</h5>
      <p class="card-text"><strong id="precioPerfil">$25 usd</strong> - Digital / Color / 300 dpi y 75 dpi</p>
      <button class="btn btn-warning" id="agregaPerfil">Agregar</button>
      <p class="card-text" id="cantidadPerfil">0</p>
    </div>
  </div>
  <div class="card" style="width: 18rem;">
    <img src="./assets/medioCuerpo.jpeg" class="card-img-top" alt="Ejemplo de imagen medio cuerpo">
    <div class="card-body">
      <h5 class="card-title">Imagen medio cuerpo</h5>
      <p class="card-text"><strong id="precioMedio">$60 usd</strong> - Digital / Color / 300 dpi</p>
      <button class="btn btn-warning" id="agregaMedio">Agregar</button>
      <p class="card-text" id="cantidadMedio">0</p>
    </div>
  </div>
  <div class="card" style="width: 18rem;">
    <img src="./assets/mascota.jpeg" class="card-img-top" alt="Ejemplo de mascota">
    <div class="card-body">
      <h5 class="card-title">Imagen mascota</h5>
      <p class="card-text"><strong id="precioMascota">$30 usd</strong> - Digital / Color / 300 dpi</p>
      <button class="btn btn-warning" id="agregaMascota">Agregar</button>
      <p class="card-text" id="cantidadMascota">0</p>
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
        let cantidad = parseInt(pCantidad.textContent);
        cantidad++;
        pCantidad.textContent = cantidad;
      });
    });
  } else {
    mostrarDiv.innerHTML = ` `;
  }
}

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
  });
}

function cambiarSaludo(nombreGuardado) {
  const saludo = document.getElementById("saludo");
  if (nombreGuardado) {
    saludo.innerText = `${nombreGuardado} te damos la bienvenida!`;
  } else {
    saludo.innerText = `Visitante le damos la bienvenida!`;
  }
}

function cambiarPrimerParrafo(nombreGuardado) {
  const parrafo = document.getElementById("primerParrafo");
  if (nombreGuardado) {
    parrafo.innerText = `Por favor seleccione el tipo de comisión que desea encargar:`;
  } else {
    parrafo.innerText =
      "Por favor ingresa tu nombre para poder acceder a las opciones de comisiones.";
  }
}

main();
