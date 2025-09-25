const ingreso = document.getElementById("identificarse");

ingreso.addEventListener("click", () => {
  if (ingreso.textContent === "Ingresar") {
    userForm();
    ingreso.textContent = "Salir";
  } else {
    ingreso.textContent = "Ingresar";
  }
  console.log(ingreso.textContent);
});

function userForm() {
  const ingresoDiv = document.getElementById("ingresoForm");

  ingresoDiv.innerHTML = `
        <form id="userForm">
            <label id="name">Nombre:</label>
            <input type="text" name="name" id="userName" />
            <input type="submit" value="Registrarse" />
        </form>
    `;
}
