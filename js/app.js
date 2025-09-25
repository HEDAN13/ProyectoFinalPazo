function main() {
  const ingreso = document.getElementById("identificarse");
  const nombreGuardado = localStorage.getItem("nombreUsuario");

  if (nombreGuardado) {
    ingreso.textContent = "Salir";
    cambiarSaludo(nombreGuardado);
    cambiarPrimerParrafo(nombreGuardado);
  } else {
    ingreso.textContent = "Ingresar";
    cambiarSaludo(null);
    cambiarPrimerParrafo(null);
  }

  ingreso.addEventListener("click", () => {
    if (ingreso.textContent === "Ingresar") {
      userForm(ingreso);
    } else {
      localStorage.removeItem("nombreUsuario");
      ingreso.textContent = "Ingresar";
      cambiarSaludo(null);
      cambiarPrimerParrafo(null);
    }
  });
}

function userForm(ingreso) {
  const ingresoDiv = document.getElementById("ingresoForm");

  ingresoDiv.innerHTML = `
    <form id="userForm">
    <label id="name">Nombre:</label>
    <input type="text" name="name" id="userName" />
    <input type="submit" value="Registrarse" />
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
