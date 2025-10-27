async function obtenerValores() {
  try {
    const response = await fetch(
      "https://www.fasttools.store/api/currency_converter/latest?base=USD"
    );
    if (!response.ok) throw new Error("No se pudo obtener los datos");
    const json = await response.json();

    const datos = json.data.rates;

    if (!datos.find((item) => item.Code === "USD")) {
      datos.push({
        Code: "USD",
        Conversion: "1",
      });
    }
    return datos;
  } catch (error) {
    console.error("Error al obtener los valores:", error);
    return [];
  }
}

export async function formatoMoneda() {
  const valores = await fetch("./assets/data/currencies.json");
  const monedas = await valores.json();
  const select = document.createElement("select");
  select.classList.add("form-select");
  select.id = "moneda-select";
  const formato = monedas.forEach((moneda) => {
    const option = document.createElement("option");
    option.textContent = `${moneda.Nombre} - ${moneda.Code}`;
    option.value = moneda.Code;
    select.appendChild(option);
  });
  return select;
}
